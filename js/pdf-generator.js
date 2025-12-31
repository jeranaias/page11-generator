/**
 * PDF Generator for NAVMC 118(11) - Administrative Remarks
 * Generates properly formatted Page 11 entries matching official form layout
 * Based on MCO P1070.12K (IRAM) Chapter 4
 */

const PDFGenerator = {
  /**
   * Generate PDF with the Page 11 entry
   * @param {object} options - Generation options
   * @returns {Blob|null} PDF blob or null if download mode
   */
  generate(options, returnBlob = false) {
    if (!window.jspdf) {
      console.error('jsPDF not loaded');
      return null;
    }

    const { jsPDF } = window.jspdf;

    // Page dimensions (Letter size in points)
    const PW = 612;       // Page width
    const PH = 792;       // Page height
    const ML = 54;        // Margin left (0.75")
    const MR = 54;        // Margin right
    const MT = 54;        // Margin top
    const MB = 72;        // Margin bottom (1")
    const CW = PW - ML - MR;  // Content width

    // Typography
    const FONT_SIZE = 11;
    const LH = 14;        // Line height
    const FONT_BODY = 'courier';
    const FONT_HEADER = 'helvetica';

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter'
    });

    let y = MT;
    let pageNum = 1;

    /**
     * Check if page break is needed, add new page if so
     */
    function pageBreak(need) {
      if (y + need > PH - MB) {
        pdf.addPage();
        pageNum++;
        y = MT;
        drawContinuationHeader();
      }
    }

    /**
     * Draw header for continuation pages
     */
    function drawContinuationHeader() {
      pdf.setFont(FONT_HEADER, 'normal');
      pdf.setFontSize(8);
      pdf.text('NAVMC 118(11) (CONTINUATION)', ML, MT - 20);

      pdf.setFont(FONT_HEADER, 'bold');
      pdf.setFontSize(10);
      pdf.text('ADMINISTRATIVE REMARKS (CONTINUED)', PW / 2, MT - 5, { align: 'center' });

      pdf.setLineWidth(0.5);
      pdf.line(ML, MT + 5, PW - MR, MT + 5);

      y = MT + 20;
    }

    // ========================================
    // FORM HEADER
    // ========================================

    // Form number - top left
    pdf.setFont(FONT_HEADER, 'normal');
    pdf.setFontSize(8);
    pdf.text('NAVMC 118(11) (REV. 12-2024)', ML, y - 15);

    // Privacy Act Statement - top right
    pdf.setFontSize(6);
    pdf.text('PRIVACY ACT STATEMENT: Authority 5 U.S.C. 301', PW - MR, y - 15, { align: 'right' });

    // Title block
    pdf.setFont(FONT_HEADER, 'bold');
    pdf.setFontSize(10);
    pdf.text('UNITED STATES MARINE CORPS', PW / 2, y, { align: 'center' });
    y += 16;

    pdf.setFontSize(14);
    pdf.text('ADMINISTRATIVE REMARKS', PW / 2, y, { align: 'center' });
    y += 10;

    pdf.setFont(FONT_HEADER, 'normal');
    pdf.setFontSize(8);
    pdf.text('(Page 11 of the Service Record)', PW / 2, y, { align: 'center' });
    y += 15;

    // ========================================
    // IDENTIFICATION BLOCK
    // ========================================

    const boxY = y;
    const boxH = 30;
    const col1W = 260;
    const col2W = 100;
    const col3W = CW - col1W - col2W;

    pdf.setLineWidth(0.75);
    pdf.setDrawColor(0);

    // Draw boxes
    pdf.rect(ML, boxY, col1W, boxH);
    pdf.rect(ML + col1W, boxY, col2W, boxH);
    pdf.rect(ML + col1W + col2W, boxY, col3W, boxH);

    // Box labels
    pdf.setFont(FONT_HEADER, 'normal');
    pdf.setFontSize(6);
    pdf.text('1. NAME (Last, First, Middle Initial)', ML + 2, boxY + 8);
    pdf.text('2. GRADE', ML + col1W + 2, boxY + 8);
    pdf.text('3. SSN (Last 4)', ML + col1W + col2W + 2, boxY + 8);

    // Box values
    pdf.setFont(FONT_BODY, 'bold');
    pdf.setFontSize(11);

    if (options.marineName) {
      pdf.text(options.marineName, ML + 4, boxY + 22);
    }
    if (options.marineGrade) {
      pdf.text(options.marineGrade, ML + col1W + 4, boxY + 22);
    }
    if (options.marineSSN) {
      pdf.text('XXX-XX-' + options.marineSSN, ML + col1W + col2W + 4, boxY + 22);
    }

    y = boxY + boxH + 8;

    // ========================================
    // REMARKS SECTION HEADER
    // ========================================

    pdf.setLineWidth(1);
    pdf.line(ML, y, PW - MR, y);
    y += 12;

    pdf.setFont(FONT_HEADER, 'bold');
    pdf.setFontSize(9);
    pdf.text('4. CHRONOLOGICAL RECORD OF ADMINISTRATIVE REMARKS', PW / 2, y, { align: 'center' });
    y += 8;

    pdf.setLineWidth(0.5);
    pdf.line(ML, y, PW - MR, y);
    y += 15;

    // ========================================
    // ENTRY CONTENT
    // ========================================

    pdf.setFont(FONT_BODY, 'normal');
    pdf.setFontSize(FONT_SIZE);

    const entryLines = options.entryText.split('\n');
    const contentStartY = y;

    entryLines.forEach((line, idx) => {
      if (line.trim().length === 0) {
        // Empty line - smaller spacing
        y += LH * 0.6;
        return;
      }

      // Check if this is a signature line (right-aligned)
      const isSignatureLine = line.includes('_______') ||
                              line.includes('[Marine') ||
                              line.includes('[Counselor') ||
                              line.includes('[Witness') ||
                              line.includes('[Commanding') ||
                              line.includes('(Signature');

      // Wrap text
      const maxWidth = CW - 10;
      const wrappedLines = pdf.splitTextToSize(line.trim(), maxWidth);

      wrappedLines.forEach(wrapLine => {
        pageBreak(LH);

        if (isSignatureLine) {
          // Right-align signature lines with proper spacing
          pdf.text(wrapLine, PW - MR - 10, y, { align: 'right' });
        } else {
          pdf.text(wrapLine, ML + 5, y);
        }
        y += LH;
      });
    });

    // ========================================
    // FOOTER ON ALL PAGES
    // ========================================

    const totalPages = pdf.internal.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);

      const footerY = PH - 40;

      // Bottom line
      pdf.setLineWidth(0.5);
      pdf.line(ML, footerY - 10, PW - MR, footerY - 10);

      pdf.setFont(FONT_HEADER, 'normal');
      pdf.setFontSize(8);

      // Form number - left
      pdf.text('NAVMC 118(11)', ML, footerY);

      // Page number - center
      pdf.text(`Page ${i} of ${totalPages}`, PW / 2, footerY, { align: 'center' });

      // Date - right
      const today = new Date();
      const dateStr = today.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      pdf.text(`Generated: ${dateStr}`, PW - MR, footerY, { align: 'right' });
    }

    // ========================================
    // OUTPUT
    // ========================================

    if (returnBlob) {
      return pdf.output('blob');
    }

    const filename = this.generateFilename(options.templateName);
    pdf.save(filename);
    return null;
  },

  /**
   * Generate PDF blob for preview
   */
  generateBlob(options) {
    return this.generate(options, true);
  },

  /**
   * Open PDF in new tab for preview
   */
  preview(options) {
    const blob = this.generateBlob(options);
    if (blob) {
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      // Cleanup after a delay
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    }
  },

  /**
   * Generate clean filename
   */
  generateFilename(templateName) {
    const now = new Date();
    const date = now.toISOString().slice(0, 10).replace(/-/g, '');
    const time = now.toTimeString().slice(0, 5).replace(':', '');
    const name = (templateName || 'entry')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 25);
    return `NAVMC-118-11_${name}_${date}.pdf`;
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PDFGenerator;
}
