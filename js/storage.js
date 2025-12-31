/**
 * LocalStorage Utilities for Draft Saving
 */

const Storage = {
  DRAFTS_KEY: 'page11-drafts',

  /**
   * Save data to localStorage
   * @param {string} key - Storage key
   * @param {*} data - Data to save
   * @returns {boolean} Success status
   */
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Storage save error:', e);
      return false;
    }
  },

  /**
   * Load data from localStorage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if not found
   * @returns {*} Retrieved data or default
   */
  load(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('Storage load error:', e);
      return defaultValue;
    }
  },

  /**
   * Remove data from localStorage
   * @param {string} key - Storage key
   */
  remove(key) {
    localStorage.removeItem(key);
  },

  /**
   * Clear storage by prefix
   * @param {string} prefix - Key prefix to match
   */
  clear(prefix) {
    if (prefix) {
      Object.keys(localStorage)
        .filter(k => k.startsWith(prefix))
        .forEach(k => localStorage.removeItem(k));
    } else {
      localStorage.clear();
    }
  },

  /**
   * Save a draft entry
   * @param {object} draft - Draft object with template, values, date
   * @returns {string} Draft ID
   */
  saveDraft(draft) {
    const drafts = this.load(this.DRAFTS_KEY, []);
    const id = 'draft_' + Date.now();
    const draftWithMeta = {
      id,
      ...draft,
      savedAt: new Date().toISOString()
    };
    drafts.unshift(draftWithMeta);
    // Keep only last 20 drafts
    if (drafts.length > 20) {
      drafts.pop();
    }
    this.save(this.DRAFTS_KEY, drafts);
    return id;
  },

  /**
   * Get all saved drafts
   * @returns {array} Array of draft objects
   */
  getDrafts() {
    return this.load(this.DRAFTS_KEY, []);
  },

  /**
   * Get a specific draft by ID
   * @param {string} id - Draft ID
   * @returns {object|null} Draft object or null
   */
  getDraft(id) {
    const drafts = this.getDrafts();
    return drafts.find(d => d.id === id) || null;
  },

  /**
   * Delete a draft by ID
   * @param {string} id - Draft ID
   * @returns {boolean} Success status
   */
  deleteDraft(id) {
    const drafts = this.getDrafts();
    const filtered = drafts.filter(d => d.id !== id);
    return this.save(this.DRAFTS_KEY, filtered);
  }
};

// Theme management
const ThemeManager = {
  STORAGE_KEY: 'usmc-tools-theme',

  init() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      this.setTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setTheme('dark');
    }
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const themes = ['light', 'dark', 'night'];
    const nextIndex = (themes.indexOf(current) + 1) % themes.length;
    this.setTheme(themes[nextIndex]);
  },

  getCurrent() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Storage, ThemeManager };
}
