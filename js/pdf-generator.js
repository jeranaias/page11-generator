/**
 * PDF Generator for NAVMC 118(11) - Administrative Remarks
 * Generates properly formatted Page 11 entries matching official form layout
 * Based on MCO P1070.12K (IRAM) and actual NAVMC 118(11) (REV. 05-2014)
 */

const PDFGenerator = {
  // Page dimensions (Letter size: 8.5" x 11" = 612pt x 792pt)
  // Matches actual NAVMC 118(11) (REV. 05-2014) layout
  PAGE: {
    WIDTH: 612,           // 8.5"
    HEIGHT: 792,          // 11"
    MARGIN: 36            // 0.5" margins
  },

  // Typography - matches official form
  FONTS: {
    BODY: 'times',
    HEADER: 'helvetica'
  },

  /**
   * Generate PDF with the Page 11 entry
   * Layout matches actual NAVMC 118(11) exactly
   */
  generate(options, returnBlob = false) {
    if (!window.jspdf) {
      console.error('jsPDF not loaded');
      return null;
    }

    const { jsPDF } = window.jspdf;
    const P = this.PAGE;
    const contentWidth = P.WIDTH - (P.MARGIN * 2); // 540pt = 7.5"

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter'
    });

    let y = P.MARGIN;
    let pageNum = 1;

    // ========================================
    // DRAW PAGE HEADER
    // ========================================
    const drawHeader = () => {
      // "G" code box - top right corner (0.65" x 0.65", 2pt border)
      const gBoxSize = 47; // ~0.65"
      const gBoxX = P.WIDTH - P.MARGIN - gBoxSize;
      const gBoxY = 29; // 0.4" from top

      pdf.setDrawColor(0);
      pdf.setLineWidth(2);
      pdf.rect(gBoxX, gBoxY, gBoxSize, gBoxSize);

      pdf.setFont(this.FONTS.HEADER, 'bold');
      pdf.setFontSize(36);
      pdf.text('G', gBoxX + gBoxSize / 2, gBoxY + 35, { align: 'center' });

      // Title: "ADMINISTRATIVE REMARKS (1070)" at ~1.1" from top
      const titleY = 79; // ~1.1"
      pdf.setFont(this.FONTS.HEADER, 'bold');
      pdf.setFontSize(12);
      const titleText = 'ADMINISTRATIVE REMARKS (1070)';
      const titleWidth = pdf.getTextWidth(titleText);
      const titleX = P.WIDTH / 2;

      pdf.text(titleText, titleX, titleY, { align: 'center' });

      // Underline below title (extends slightly beyond text)
      pdf.setLineWidth(1);
      pdf.line(titleX - titleWidth / 2 - 8, titleY + 4, titleX + titleWidth / 2 + 8, titleY + 4);

      // Horizontal line below header at ~1.4" from top
      const lineY = 101; // ~1.4"
      pdf.setLineWidth(0.75);
      pdf.line(P.MARGIN, lineY, P.WIDTH - P.MARGIN, lineY);

      return 108; // Content starts at ~1.5" from top
    };

    // ========================================
    // DRAW PAGE FOOTER
    // ========================================
    const drawFooter = (pageNumber) => {
      // Footer area starts at ~9.6" from top (bottom - 1.4")
      const footerTop = P.HEIGHT - 101; // 691pt

      // Horizontal line above footer
      pdf.setLineWidth(0.75);
      pdf.setDrawColor(0);
      pdf.line(P.MARGIN, footerTop, P.WIDTH - P.MARGIN, footerTop);

      // NAME and EDIPI boxes (0.4" tall = ~29pt)
      const boxHeight = 29;
      const nameBoxWidth = contentWidth * 0.78;
      const edipiBoxWidth = contentWidth * 0.22;

      // Draw box borders
      pdf.setLineWidth(0.75);
      // NAME box - left, bottom, right sides (top is the footer line)
      pdf.line(P.MARGIN, footerTop, P.MARGIN, footerTop + boxHeight); // left
      pdf.line(P.MARGIN, footerTop + boxHeight, P.MARGIN + nameBoxWidth, footerTop + boxHeight); // bottom
      pdf.line(P.MARGIN + nameBoxWidth, footerTop, P.MARGIN + nameBoxWidth, footerTop + boxHeight); // right

      // EDIPI box
      pdf.line(P.MARGIN + nameBoxWidth, footerTop + boxHeight, P.WIDTH - P.MARGIN, footerTop + boxHeight); // bottom
      pdf.line(P.WIDTH - P.MARGIN, footerTop, P.WIDTH - P.MARGIN, footerTop + boxHeight); // right

      // Box labels (centered at bottom)
      pdf.setFont(this.FONTS.HEADER, 'normal');
      pdf.setFontSize(8);
      pdf.text('NAME (last, first, middle)', P.MARGIN + nameBoxWidth / 2, footerTop + boxHeight - 3, { align: 'center' });
      pdf.text('EDIPI', P.MARGIN + nameBoxWidth + edipiBoxWidth / 2, footerTop + boxHeight - 3, { align: 'center' });

      // Fill in NAME and EDIPI values
      if (options.marineName) {
        pdf.setFont(this.FONTS.BODY, 'normal');
        pdf.setFontSize(10);
        pdf.text(options.marineName.toUpperCase(), P.MARGIN + 4, footerTop + 12);
      }
      if (options.marineEDIPI) {
        pdf.setFont(this.FONTS.BODY, 'normal');
        pdf.setFontSize(10);
        pdf.text(options.marineEDIPI, P.MARGIN + nameBoxWidth + 4, footerTop + 12);
      }

      // Bottom row (below boxes)
      const bottomRowY = footerTop + boxHeight + 12;

      // Form number - bottom left
      pdf.setFont(this.FONTS.HEADER, 'bold');
      pdf.setFontSize(8);
      pdf.text('NAVMC 118(11) (REV. 05-2014) (EF)', P.MARGIN, bottomRowY);

      // "PREVIOUS EDITIONS ARE OBSOLETE" below form number
      pdf.setFont(this.FONTS.HEADER, 'normal');
      pdf.setFontSize(7);
      pdf.text('PREVIOUS EDITIONS ARE OBSOLETE', P.MARGIN, bottomRowY + 9);

      // Page number - center "11. ___"
      pdf.setFont(this.FONTS.HEADER, 'normal');
      pdf.setFontSize(10);
      pdf.text('11.', P.WIDTH / 2 - 12, bottomRowY);
      // Page number line
      pdf.setLineWidth(0.75);
      pdf.line(P.WIDTH / 2 + 2, bottomRowY, P.WIDTH / 2 + 38, bottomRowY);

      // FOUO notice - centered at very bottom
      pdf.setFont(this.FONTS.HEADER, 'bold');
      pdf.setFontSize(8);
      pdf.text('FOUO - Privacy sensitive when filled in', P.WIDTH / 2, P.HEIGHT - 25, { align: 'center' });
    };

    // ========================================
    // PAGE BREAK HANDLER
    // ========================================
    const checkPageBreak = (needed) => {
      const maxY = P.HEIGHT - 110; // Stop before footer area
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
      const lineHeight = 13; // ~10pt font with spacing
      const entryX = P.MARGIN;
      const maxWidth = contentWidth - 5;

      // Split entry text into lines
      const entryLines = options.entryText.split('\n');

      pdf.setFont(this.FONTS.BODY, 'normal');
      pdf.setFontSize(10);

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
            pdf.text(wrapLine, P.WIDTH - P.MARGIN - 10, y, { align: 'right' });
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
   * Generate preview HTML that matches PDF layout EXACTLY
   * All elements absolutely positioned to match PDF coordinates:
   * - Page: 612pt x 792pt
   * - G-box: top-right at 36pt from edges, 45pt square
   * - Title: y=96pt centered, underlined
   * - Header line: y=111pt
   * - Content: starts y=126pt
   * - Footer line: y=697pt
   * - NAME/EDIPI boxes: y=702pt, 35pt tall
   * - Bottom row: y=752pt
   * - FOUO: y=772pt
   */
  generatePreviewHTML(options) {
    const escapedName = this.escapeHtml(options.marineName || '').toUpperCase();
    const escapedEDIPI = this.escapeHtml(options.marineEDIPI || options.marineSSN || '');
    const escapedEntry = this.escapeHtml(options.entryText || '').replace(/\n/g, '<br>');

    return `
      <div class="page11-preview">
        <!-- G code box - top right -->
        <div class="g-code-box">G</div>

        <!-- Title - centered with underline -->
        <div class="page11-title">ADMINISTRATIVE REMARKS (1070)</div>

        <!-- Header line -->
        <div class="page11-header-line"></div>

        <!-- Entry content -->
        <div class="page11-content">
          <div class="entry-text">${escapedEntry}</div>
        </div>

        <!-- Footer -->
        <div class="page11-footer">
          <div class="footer-boxes">
            <div class="name-box">
              <div class="box-value">${escapedName}</div>
              <div class="box-label">NAME (last, first, middle)</div>
            </div>
            <div class="edipi-box">
              <div class="box-value">${escapedEDIPI}</div>
              <div class="box-label">EDIPI</div>
            </div>
          </div>
          <div class="footer-bottom">
            <div class="form-info">
              <strong>NAVMC 118(11) (REV. 05-2014) (EF)</strong>
              <span>PREVIOUS EDITIONS ARE OBSOLETE</span>
            </div>
            <div class="page-number">11.<span class="page-line"></span></div>
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
