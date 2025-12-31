/**
 * Date Utilities for Military Date Formatting
 */

const DateUtils = {
  /**
   * Format date to military style: DD Mon YYYY
   * @param {Date|string} date - Date to format
   * @returns {string} Formatted date string
   */
  formatMilitary(date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return '';
    }
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = String(d.getDate()).padStart(2, '0');
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  },

  /**
   * Format date to numeric: YYYYMMDD
   * @param {Date|string} date - Date to format
   * @returns {string} Formatted date string
   */
  formatNumeric(date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return '';
    }
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  },

  /**
   * Get today's date as YYYY-MM-DD for input[type="date"]
   * @returns {string} Today's date in input format
   */
  getTodayInputFormat() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  /**
   * Convert input[type="date"] value to military format
   * @param {string} inputValue - Date from input element (YYYY-MM-DD)
   * @returns {string} Military formatted date
   */
  inputToMilitary(inputValue) {
    if (!inputValue) return '';
    // Input value is YYYY-MM-DD, need to parse correctly
    const [year, month, day] = inputValue.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    return this.formatMilitary(d);
  },

  /**
   * Calculate age from date of birth
   * @param {Date|string} dob - Date of birth
   * @returns {number} Age in years
   */
  calculateAge(dob) {
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DateUtils;
}
