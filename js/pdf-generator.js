/**
 * PDF Generator for NAVMC 118(11) - Administrative Remarks
 * Generates properly formatted Page 11 entries matching official form layout
 * Based on MCO P1070.12K (IRAM) and actual NAVMC 118(11) (REV. 05-2014)
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
    // FORM HEADER - Matching actual NAVMC 118(11)
    // ========================================

    // Form number - top left (actual revision)
    pdf.setFont(FONT_HEADER, 'normal');
    pdf.setFontSize(8);
    pdf.text('NAVMC 118(11) (REV. 05-2014) (EF)', ML, y - 15);

    // Form identifier - top right
    pdf.setFontSize(6);
    pdf.text('SN: 0109-LF-062-8400  U/I: SH', PW - MR, y - 15, { align: 'right' });

    // Title block
    pdf.setFont(FONT_HEADER, 'bold');
    pdf.setFontSize(14);
    pdf.text('ADMINISTRATIVE REMARKS', PW / 2, y + 5, { align: 'center' });
    y += 25;

    // ========================================
    // IDENTIFICATION BLOCK - Actual form layout
    // NAME and SSN only (no GRADE on real form)
    // ========================================

    const boxY = y;
    const boxH = 32;
    const nameW = CW * 0.7;  // Name takes ~70%
    const ssnW = CW - nameW; // SSN takes remainder

    pdf.setLineWidth(0.75);
    pdf.setDrawColor(0);

    // Draw boxes
    pdf.rect(ML, boxY, nameW, boxH);
    pdf.rect(ML + nameW, boxY, ssnW, boxH);

    // Box labels (matching actual form)
    pdf.setFont(FONT_HEADER, 'normal');
    pdf.setFontSize(7);
    pdf.text('NAME (last, first, middle)', ML + 3, boxY + 10);
    pdf.text('SSN', ML + nameW + 3, boxY + 10);

    // Box values
    pdf.setFont(FONT_BODY, 'normal');
    pdf.setFontSize(11);

    if (options.marineName) {
      pdf.text(options.marineName.toUpperCase(), ML + 5, boxY + 24);
    }
    if (options.marineSSN) {
      // Show full SSN format with last 4
      pdf.text('XXX-XX-' + options.marineSSN, ML + nameW + 5, boxY + 24);
    }

    y = boxY + boxH + 5;

    // ========================================
    // REMARKS SECTION - Simple header line
    // ========================================

    pdf.setLineWidth(1);
    pdf.line(ML, y, PW - MR, y);
    y += 18;

    // ========================================
    // ENTRY CONTENT
    // ========================================

    pdf.setFont(FONT_BODY, 'normal');
    pdf.setFontSize(FONT_SIZE);

    const entryLines = options.entryText.split('\n');

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
      if (totalPages > 1) {
        pdf.text(`Page ${i} of ${totalPages}`, PW / 2, footerY, { align: 'center' });
      }

      // Edition note - right
      pdf.text('REV. 05-2014', PW - MR, footerY, { align: 'right' });
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
