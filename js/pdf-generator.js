/**
 * PDF Generator for NAVMC 118(11) - Administrative Remarks
 * Generates properly formatted Page 11 entries on the official form layout
 */

const PDFGenerator = {
  // Form dimensions (Letter size: 8.5" x 11" at 72 DPI)
  PAGE_WIDTH: 612,
  PAGE_HEIGHT: 792,
  MARGIN_LEFT: 54,      // 0.75 inch
  MARGIN_RIGHT: 54,
  MARGIN_TOP: 54,
  MARGIN_BOTTOM: 54,

  // Content area
  get CONTENT_WIDTH() {
    return this.PAGE_WIDTH - this.MARGIN_LEFT - this.MARGIN_RIGHT;
  },

  /**
   * Generate a PDF with the Page 11 entry
   * @param {object} options - Generation options
   */
  generate(options) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter'
    });

    // Set default font
    doc.setFont('helvetica');

    // Draw the form
    this.drawFormHeader(doc, options);
    this.drawIdentificationBlock(doc, options);
    this.drawRemarksHeader(doc);
    const finalY = this.drawEntryContent(doc, options.entryText);
    this.drawFormFooter(doc);

    // Generate filename and save
    const filename = this.generateFilename(options.templateName);
    doc.save(filename);
  },

  /**
   * Draw the official form header
   */
  drawFormHeader(doc, options) {
    const centerX = this.PAGE_WIDTH / 2;
    let y = this.MARGIN_TOP;

    // Form number and revision - top left
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('NAVMC 118(11) (REV. 12-2024)', this.MARGIN_LEFT, y);

    // Privacy Act Statement reference - top right
    doc.setFontSize(7);
    doc.text('PRIVACY ACT STATEMENT: See SECNAVINST 5211.5',
             this.PAGE_WIDTH - this.MARGIN_RIGHT, y, { align: 'right' });

    y += 20;

    // Marine Corps Eagle, Globe, and Anchor would go here (using text placeholder)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('UNITED STATES MARINE CORPS', centerX, y, { align: 'center' });

    y += 18;

    // Form title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('ADMINISTRATIVE REMARKS', centerX, y, { align: 'center' });

    y += 8;

    // Subtitle
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('(Page 11 of the Service Record)', centerX, y, { align: 'center' });

    return y + 15;
  },

  /**
   * Draw the identification block with boxes
   */
  drawIdentificationBlock(doc, options) {
    const y = 115;
    const boxHeight = 32;
    const col1Width = 250;
    const col2Width = 120;
    const col3Width = this.CONTENT_WIDTH - col1Width - col2Width;

    // Draw boxes
    doc.setLineWidth(0.5);
    doc.setDrawColor(0);

    // Name box
    doc.rect(this.MARGIN_LEFT, y, col1Width, boxHeight);
    // Grade box
    doc.rect(this.MARGIN_LEFT + col1Width, y, col2Width, boxHeight);
    // SSN box
    doc.rect(this.MARGIN_LEFT + col1Width + col2Width, y, col3Width, boxHeight);

    // Labels (small, inside top of box)
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text('1. NAME (Last, First, Middle Initial)', this.MARGIN_LEFT + 3, y + 9);
    doc.text('2. GRADE', this.MARGIN_LEFT + col1Width + 3, y + 9);
    doc.text('3. SSN (Last 4)', this.MARGIN_LEFT + col1Width + col2Width + 3, y + 9);

    // Values (larger, in center of box)
    doc.setFontSize(11);
    doc.setFont('courier', 'bold');

    if (options.marineName) {
      doc.text(options.marineName, this.MARGIN_LEFT + 5, y + 24);
    }
    if (options.marineGrade) {
      doc.text(options.marineGrade, this.MARGIN_LEFT + col1Width + 5, y + 24);
    }
    if (options.marineSSN) {
      doc.text('XXX-XX-' + options.marineSSN, this.MARGIN_LEFT + col1Width + col2Width + 5, y + 24);
    }

    return y + boxHeight;
  },

  /**
   * Draw the remarks section header
   */
  drawRemarksHeader(doc) {
    const y = 155;

    // Section header
    doc.setLineWidth(1);
    doc.line(this.MARGIN_LEFT, y, this.PAGE_WIDTH - this.MARGIN_RIGHT, y);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('4. CHRONOLOGICAL RECORD OF ADMINISTRATIVE REMARKS',
             this.PAGE_WIDTH / 2, y + 12, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.line(this.MARGIN_LEFT, y + 18, this.PAGE_WIDTH - this.MARGIN_RIGHT, y + 18);

    return y + 25;
  },

  /**
   * Draw the entry content with proper formatting
   */
  drawEntryContent(doc, entryText) {
    const startY = 185;
    const maxWidth = this.CONTENT_WIDTH - 10;
    const lineHeight = 13;
    const pageBottom = this.PAGE_HEIGHT - this.MARGIN_BOTTOM - 40;

    // Use Courier for the actual entry (standard for government forms)
    doc.setFontSize(10);
    doc.setFont('courier', 'normal');

    // Split entry text into lines
    const lines = entryText.split('\n');
    let currentY = startY;
    let pageNum = 1;

    lines.forEach((line, index) => {
      if (line.trim().length > 0) {
        // Check if this is a centered signature line
        const isCentered = line.includes('_______') ||
                          line.includes('[Marine') ||
                          line.includes('[Counselor') ||
                          line.includes('[Witness') ||
                          line.includes('[Commanding');

        // Wrap long lines
        const wrappedLines = doc.splitTextToSize(line.trim(), maxWidth);

        wrappedLines.forEach(wrappedLine => {
          // Check if we need a new page
          if (currentY > pageBottom) {
            doc.addPage();
            pageNum++;
            this.drawContinuationHeader(doc, pageNum);
            currentY = 100;
          }

          // Draw the line
          if (isCentered) {
            // Right-align signature lines
            doc.text(wrappedLine, this.PAGE_WIDTH - this.MARGIN_RIGHT - 20, currentY, { align: 'right' });
          } else {
            doc.text(wrappedLine, this.MARGIN_LEFT + 5, currentY);
          }
          currentY += lineHeight;
        });
      } else {
        // Empty line - add smaller spacing
        currentY += lineHeight * 0.6;
      }
    });

    return currentY;
  },

  /**
   * Draw continuation page header
   */
  drawContinuationHeader(doc, pageNum) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('NAVMC 118(11) (CONTINUATION)', this.MARGIN_LEFT, this.MARGIN_TOP);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('ADMINISTRATIVE REMARKS (CONTINUED)',
             this.PAGE_WIDTH / 2, this.MARGIN_TOP + 20, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.line(this.MARGIN_LEFT, this.MARGIN_TOP + 30,
             this.PAGE_WIDTH - this.MARGIN_RIGHT, this.MARGIN_TOP + 30);
  },

  /**
   * Draw form footer on all pages
   */
  drawFormFooter(doc) {
    const pageCount = doc.internal.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);

      const footerY = this.PAGE_HEIGHT - 30;

      // Bottom line
      doc.setLineWidth(0.5);
      doc.line(this.MARGIN_LEFT, footerY - 15,
               this.PAGE_WIDTH - this.MARGIN_RIGHT, footerY - 15);

      // Page info
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');

      // Left: Form info
      doc.text('NAVMC 118(11)', this.MARGIN_LEFT, footerY);

      // Center: Page number
      doc.text(`Page ${i} of ${pageCount}`,
               this.PAGE_WIDTH / 2, footerY, { align: 'center' });

      // Right: Date generated
      const today = new Date();
      const dateStr = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      });
      doc.text(`Generated: ${dateStr}`,
               this.PAGE_WIDTH - this.MARGIN_RIGHT, footerY, { align: 'right' });
    }
  },

  /**
   * Generate a clean filename
   */
  generateFilename(templateName) {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const timeStr = date.toTimeString().slice(0, 5).replace(':', '');
    const safeName = (templateName || 'entry')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 30);
    return `NAVMC-118-11_${safeName}_${dateStr}_${timeStr}.pdf`;
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PDFGenerator;
}
