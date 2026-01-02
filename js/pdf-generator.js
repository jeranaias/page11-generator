/**
 * PDF Generator for NAVMC 118(11) - Administrative Remarks
 * Generates properly formatted Page 11 entries matching official form layout
 * Based on MCO P1070.12K (IRAM) and actual NAVMC 118(11) (REV. 05-2014)
 */

const PDFGenerator = {
  // Page dimensions (Letter size in points: 612 x 792)
  PAGE: {
    WIDTH: 612,
    HEIGHT: 792,
    MARGIN_LEFT: 36,      // 0.5"
    MARGIN_RIGHT: 36,     // 0.5"
    MARGIN_TOP: 36,       // 0.5"
    MARGIN_BOTTOM: 100    // Space for footer with NAME/EDIPI
  },

  // Typography
  FONTS: {
    BODY: 'times',
    HEADER: 'helvetica',
    MONO: 'courier'
  },

  /**
   * Generate PDF with the Page 11 entry
   */
  generate(options, returnBlob = false) {
    if (!window.jspdf) {
      console.error('jsPDF not loaded');
      return null;
    }

    const { jsPDF } = window.jspdf;
    const P = this.PAGE;
    const contentWidth = P.WIDTH - P.MARGIN_LEFT - P.MARGIN_RIGHT;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter'
    });

    let y = P.MARGIN_TOP;
    let pageNum = 1;

    // ========================================
    // DRAW PAGE HEADER
    // ========================================
    const drawHeader = () => {
      // "G" code box - top right corner
      const gBoxSize = 45;
      const gBoxX = P.WIDTH - P.MARGIN_RIGHT - gBoxSize;
      const gBoxY = P.MARGIN_TOP;

      pdf.setDrawColor(0);
      pdf.setLineWidth(1.5);
      pdf.rect(gBoxX, gBoxY, gBoxSize, gBoxSize);

      pdf.setFont(this.FONTS.HEADER, 'bold');
      pdf.setFontSize(32);
      pdf.text('G', gBoxX + gBoxSize / 2, gBoxY + 33, { align: 'center' });

      // Title: "ADMINISTRATIVE REMARKS (1070)"
      const titleY = P.MARGIN_TOP + 60;
      pdf.setFont(this.FONTS.HEADER, 'bold');
      pdf.setFontSize(12);
      const titleText = 'ADMINISTRATIVE REMARKS (1070)';
      const titleWidth = pdf.getTextWidth(titleText);
      const titleX = P.WIDTH / 2;

      pdf.text(titleText, titleX, titleY, { align: 'center' });

      // Underline the title
      pdf.setLineWidth(0.75);
      pdf.line(titleX - titleWidth / 2 - 5, titleY + 3, titleX + titleWidth / 2 + 5, titleY + 3);

      // Horizontal line below header
      const lineY = titleY + 15;
      pdf.setLineWidth(0.5);
      pdf.line(P.MARGIN_LEFT, lineY, P.WIDTH - P.MARGIN_RIGHT, lineY);

      return lineY + 15; // Return Y position after header
    };

    // ========================================
    // DRAW PAGE FOOTER
    // ========================================
    const drawFooter = (pageNumber) => {
      const footerTopY = P.HEIGHT - 95;

      // Horizontal line above footer
      pdf.setLineWidth(0.5);
      pdf.setDrawColor(0);
      pdf.line(P.MARGIN_LEFT, footerTopY, P.WIDTH - P.MARGIN_RIGHT, footerTopY);

      // NAME and EDIPI boxes
      const boxY = footerTopY + 5;
      const boxHeight = 35;
      const nameBoxWidth = contentWidth * 0.75;
      const edipiBoxWidth = contentWidth * 0.25;

      // NAME box
      pdf.setLineWidth(0.75);
      pdf.rect(P.MARGIN_LEFT, boxY, nameBoxWidth, boxHeight);

      // EDIPI box
      pdf.rect(P.MARGIN_LEFT + nameBoxWidth, boxY, edipiBoxWidth, boxHeight);

      // Box labels (centered at bottom of boxes)
      pdf.setFont(this.FONTS.HEADER, 'normal');
      pdf.setFontSize(8);
      pdf.text('NAME (last, first, middle)', P.MARGIN_LEFT + nameBoxWidth / 2, boxY + boxHeight - 5, { align: 'center' });
      pdf.text('EDIPI', P.MARGIN_LEFT + nameBoxWidth + edipiBoxWidth / 2, boxY + boxHeight - 5, { align: 'center' });

      // Fill in NAME and EDIPI values if provided
      if (options.marineName) {
        pdf.setFont(this.FONTS.BODY, 'normal');
        pdf.setFontSize(11);
        pdf.text(options.marineName.toUpperCase(), P.MARGIN_LEFT + 5, boxY + 15);
      }
      if (options.marineEDIPI) {
        pdf.setFont(this.FONTS.BODY, 'normal');
        pdf.setFontSize(11);
        pdf.text(options.marineEDIPI, P.MARGIN_LEFT + nameBoxWidth + 5, boxY + 15);
      }

      // Bottom row
      const bottomRowY = boxY + boxHeight + 15;

      // Form number - bottom left
      pdf.setFont(this.FONTS.HEADER, 'bold');
      pdf.setFontSize(8);
      pdf.text('NAVMC 118(11) (REV. 05-2014) (EF)', P.MARGIN_LEFT, bottomRowY);

      // "PREVIOUS EDITIONS ARE OBSOLETE" below form number
      pdf.setFont(this.FONTS.HEADER, 'normal');
      pdf.setFontSize(7);
      pdf.text('PREVIOUS EDITIONS ARE OBSOLETE', P.MARGIN_LEFT, bottomRowY + 10);

      // Page number - center "11. ___"
      pdf.setFont(this.FONTS.HEADER, 'normal');
      pdf.setFontSize(10);
      const pageNumText = `11.`;
      pdf.text(pageNumText, P.WIDTH / 2 - 10, bottomRowY + 5);
      // Page number line
      pdf.setLineWidth(0.5);
      pdf.line(P.WIDTH / 2 + 5, bottomRowY + 5, P.WIDTH / 2 + 40, bottomRowY + 5);
      // Actual page number above line if multi-page
      if (pageNumber > 0) {
        pdf.setFontSize(9);
        pdf.text(String(pageNumber), P.WIDTH / 2 + 20, bottomRowY + 3);
      }

      // FOUO notice - bottom center
      pdf.setFont(this.FONTS.HEADER, 'bold');
      pdf.setFontSize(8);
      pdf.text('FOUO - Privacy sensitive when filled in', P.WIDTH / 2, P.HEIGHT - 20, { align: 'center' });
    };

    // ========================================
    // PAGE BREAK HANDLER
    // ========================================
    const checkPageBreak = (needed) => {
      const maxY = P.HEIGHT - P.MARGIN_BOTTOM - 10;
      if (y + needed > maxY) {
        // Draw footer on current page
        drawFooter(pageNum);

        // Add new page
        pdf.addPage();
        pageNum++;

        // Draw header on new page
        y = drawHeader();

        return true;
      }
      return false;
    };

    // ========================================
    // DRAW ENTRY CONTENT
    // ========================================
    const drawEntry = () => {
      const lineHeight = 14;
      const entryX = P.MARGIN_LEFT;
      const maxWidth = contentWidth - 10;

      // Split entry text into lines
      const entryLines = options.entryText.split('\n');

      pdf.setFont(this.FONTS.BODY, 'normal');
      pdf.setFontSize(11);

      for (let i = 0; i < entryLines.length; i++) {
        const line = entryLines[i];

        // Handle empty lines
        if (line.trim() === '') {
          y += lineHeight * 0.7;
          continue;
        }

        // Check if this is a signature line
        const isSignatureLine = line.includes('(Signature)') ||
                                line.includes('_______') ||
                                line.trim().startsWith('(') && line.trim().endsWith(')');

        // Check if this is a header/title line (all caps, short)
        const isHeaderLine = line === line.toUpperCase() &&
                             line.length < 60 &&
                             !line.includes('_') &&
                             line.trim().length > 0;

        // Check if this is a DATE line
        const isDateLine = line.trim().toUpperCase().startsWith('DATE') ||
                           /^\d{1,2}\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i.test(line.trim()) ||
                           /^\d{1,2}\/\d{1,2}\/\d{2,4}/.test(line.trim()) ||
                           /^[A-Z]{3,9}\s+\d{1,2},?\s+\d{4}/i.test(line.trim());

        // Set font based on line type
        if (isHeaderLine && i < 5) {
          pdf.setFont(this.FONTS.BODY, 'bold');
        } else {
          pdf.setFont(this.FONTS.BODY, 'normal');
        }

        // Wrap text
        const wrappedLines = pdf.splitTextToSize(line, maxWidth);

        for (const wrapLine of wrappedLines) {
          checkPageBreak(lineHeight);

          if (isSignatureLine) {
            // Right-align signature lines
            pdf.text(wrapLine, P.WIDTH - P.MARGIN_RIGHT - 10, y, { align: 'right' });
          } else {
            pdf.text(wrapLine, entryX, y);
          }

          y += lineHeight;
        }
      }
    };

    // ========================================
    // MAIN GENERATION FLOW
    // ========================================

    // Draw first page header
    y = drawHeader();

    // Draw entry content
    drawEntry();

    // Draw footer on last page
    drawFooter(pageNum);

    // If multiple pages, go back and add footers
    const totalPages = pdf.internal.getNumberOfPages();
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        // Footer already drawn, but update page numbers if needed
      }
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
  },

  /**
   * Generate preview HTML that matches PDF layout
   */
  generatePreviewHTML(options) {
    const escapedName = this.escapeHtml(options.marineName || '');
    const escapedEDIPI = this.escapeHtml(options.marineEDIPI || options.marineSSN || '');
    const escapedEntry = this.escapeHtml(options.entryText || '').replace(/\n/g, '<br>');

    return `
      <div class="page11-preview">
        <div class="page11-header">
          <div class="g-code-box">G</div>
          <h2 class="page11-title">ADMINISTRATIVE REMARKS (1070)</h2>
        </div>
        <div class="page11-content">
          <div class="entry-text">${escapedEntry}</div>
        </div>
        <div class="page11-footer">
          <div class="footer-boxes">
            <div class="name-box">
              <span class="box-value">${escapedName}</span>
              <span class="box-label">NAME (last, first, middle)</span>
            </div>
            <div class="edipi-box">
              <span class="box-value">${escapedEDIPI}</span>
              <span class="box-label">EDIPI</span>
            </div>
          </div>
          <div class="footer-bottom">
            <div class="form-info">
              <strong>NAVMC 118(11) (REV. 05-2014) (EF)</strong><br>
              <span>PREVIOUS EDITIONS ARE OBSOLETE</span>
            </div>
            <div class="page-number">11. <span class="page-line">____</span></div>
          </div>
          <div class="fouo-notice">FOUO - Privacy sensitive when filled in</div>
        </div>
      </div>
    `;
  },

  /**
   * Escape HTML characters
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PDFGenerator;
}
