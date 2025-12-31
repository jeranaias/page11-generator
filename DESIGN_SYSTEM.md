# USMC Tools - Shared Design System

## Overview

This document defines the shared styling, components, and patterns for all USMC admin tools. Every tool MUST use this design system to ensure visual consistency across the suite.

---

## Color Palette

### Light Mode (Default)

```css
:root {
  /* Primary Colors - Marine Corps inspired */
  --primary: #8B0000;           /* Marine Corps Scarlet */
  --primary-dark: #6B0000;      /* Darker scarlet for hover */
  --primary-light: #A52A2A;     /* Lighter scarlet */
  
  /* Secondary Colors */
  --secondary: #003366;         /* Navy blue */
  --secondary-dark: #002244;    /* Darker navy */
  --secondary-light: #004488;   /* Lighter navy */
  
  /* Gold Accent */
  --gold: #FFC300;              /* Marine Corps Gold */
  --gold-dark: #D4A000;
  
  /* Neutrals */
  --white: #FFFFFF;
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;
  --black: #000000;
  
  /* Semantic Colors */
  --success: #10B981;
  --success-light: #D1FAE5;
  --warning: #F59E0B;
  --warning-light: #FEF3C7;
  --error: #EF4444;
  --error-light: #FEE2E2;
  --info: #3B82F6;
  --info-light: #DBEAFE;
  
  /* Background & Surface */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F9FAFB;
  --bg-tertiary: #F3F4F6;
  --surface: #FFFFFF;
  --surface-hover: #F9FAFB;
  
  /* Text */
  --text-primary: #111827;
  --text-secondary: #4B5563;
  --text-tertiary: #6B7280;
  --text-inverse: #FFFFFF;
  
  /* Borders */
  --border-light: #E5E7EB;
  --border-medium: #D1D5DB;
  --border-dark: #9CA3AF;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
```

### Dark Mode

```css
[data-theme="dark"] {
  --primary: #DC2626;
  --primary-dark: #B91C1C;
  --primary-light: #EF4444;
  
  --secondary: #3B82F6;
  --secondary-dark: #2563EB;
  --secondary-light: #60A5FA;
  
  --bg-primary: #111827;
  --bg-secondary: #1F2937;
  --bg-tertiary: #374151;
  --surface: #1F2937;
  --surface-hover: #374151;
  
  --text-primary: #F9FAFB;
  --text-secondary: #D1D5DB;
  --text-tertiary: #9CA3AF;
  
  --border-light: #374151;
  --border-medium: #4B5563;
  --border-dark: #6B7280;
}
```

### Night Mode (Tactical - Red on Black)

```css
[data-theme="night"] {
  --primary: #FF0000;
  --primary-dark: #CC0000;
  --primary-light: #FF3333;
  
  --secondary: #FF0000;
  --gold: #FF0000;
  
  --bg-primary: #000000;
  --bg-secondary: #0A0A0A;
  --bg-tertiary: #141414;
  --surface: #0A0A0A;
  --surface-hover: #1A1A1A;
  
  --text-primary: #FF0000;
  --text-secondary: #CC0000;
  --text-tertiary: #990000;
  
  --border-light: #330000;
  --border-medium: #660000;
  --border-dark: #990000;
  
  --success: #FF0000;
  --warning: #FF0000;
  --error: #FF0000;
  --info: #FF0000;
}
```

---

## Typography

```css
:root {
  /* Font Families */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
}
```

---

## Spacing

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
}
```

---

## Border Radius

```css
:root {
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.375rem;  /* 6px */
  --radius-lg: 0.5rem;    /* 8px */
  --radius-xl: 0.75rem;   /* 12px */
  --radius-2xl: 1rem;     /* 16px */
  --radius-full: 9999px;
}
```

---

## Base Styles

```css
/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--text-primary);
  background-color: var(--bg-primary);
  min-height: 100vh;
}

/* Focus States - Accessibility */
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Selection */
::selection {
  background-color: var(--primary);
  color: var(--white);
}
```

---

## Component Styles

### Container

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 640px) {
  .container {
    padding: 0 var(--space-6);
  }
}
```

### Header

```css
.header {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: var(--white);
  padding: var(--space-6) 0;
  text-align: center;
  box-shadow: var(--shadow-md);
}

.header__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-2);
}

.header__subtitle {
  font-size: var(--text-sm);
  opacity: 0.9;
}

@media (min-width: 640px) {
  .header__title {
    font-size: var(--text-3xl);
  }
}
```

### Cards

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}

.card--elevated {
  box-shadow: var(--shadow-md);
}

.card__header {
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-light);
}

.card__title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.card__subtitle {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-top: var(--space-1);
}
```

### Buttons

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  line-height: 1;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.15s ease;
  text-decoration: none;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Primary Button */
.btn--primary {
  background: var(--primary);
  color: var(--white);
}

.btn--primary:hover:not(:disabled) {
  background: var(--primary-dark);
}

/* Secondary Button */
.btn--secondary {
  background: var(--secondary);
  color: var(--white);
}

.btn--secondary:hover:not(:disabled) {
  background: var(--secondary-dark);
}

/* Outline Button */
.btn--outline {
  background: transparent;
  border: 1px solid var(--border-medium);
  color: var(--text-primary);
}

.btn--outline:hover:not(:disabled) {
  background: var(--bg-secondary);
}

/* Ghost Button */
.btn--ghost {
  background: transparent;
  color: var(--text-secondary);
}

.btn--ghost:hover:not(:disabled) {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

/* Success Button */
.btn--success {
  background: var(--success);
  color: var(--white);
}

/* Danger Button */
.btn--danger {
  background: var(--error);
  color: var(--white);
}

/* Button Sizes */
.btn--sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-xs);
}

.btn--lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-base);
}

/* Full Width */
.btn--full {
  width: 100%;
}
```

### Form Elements

```css
/* Form Group */
.form-group {
  margin-bottom: var(--space-4);
}

/* Labels */
.label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.label--required::after {
  content: ' *';
  color: var(--error);
}

/* Input Base */
.input {
  width: 100%;
  padding: var(--space-3);
  font-size: var(--text-base);
  font-family: var(--font-sans);
  color: var(--text-primary);
  background: var(--bg-primary);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-md);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(139, 0, 0, 0.1);
}

.input::placeholder {
  color: var(--text-tertiary);
}

.input:disabled {
  background: var(--bg-secondary);
  cursor: not-allowed;
}

/* Input States */
.input--error {
  border-color: var(--error);
}

.input--error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.input--success {
  border-color: var(--success);
}

/* Textarea */
.textarea {
  min-height: 120px;
  resize: vertical;
}

/* Select */
.select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6,9 12,15 18,9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-3) center;
  padding-right: var(--space-10);
}

/* Checkbox & Radio */
.checkbox-group,
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.checkbox-label,
.radio-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  font-size: var(--text-sm);
}

.checkbox,
.radio {
  width: 18px;
  height: 18px;
  accent-color: var(--primary);
}

/* Help Text */
.help-text {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  margin-top: var(--space-1);
}

.help-text--error {
  color: var(--error);
}

/* Character Counter */
.char-counter {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  text-align: right;
  margin-top: var(--space-1);
}

.char-counter--warning {
  color: var(--warning);
}

.char-counter--error {
  color: var(--error);
}
```

### Tables

```css
.table-container {
  overflow-x: auto;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.table th,
.table td {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  border-bottom: 1px solid var(--border-light);
}

.table th {
  background: var(--bg-secondary);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.table tr:last-child td {
  border-bottom: none;
}

.table tr:hover td {
  background: var(--surface-hover);
}

/* Striped */
.table--striped tbody tr:nth-child(even) td {
  background: var(--bg-secondary);
}
```

### Alerts / Notices

```css
.alert {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.alert--info {
  background: var(--info-light);
  color: var(--info);
  border: 1px solid var(--info);
}

.alert--success {
  background: var(--success-light);
  color: var(--success);
  border: 1px solid var(--success);
}

.alert--warning {
  background: var(--warning-light);
  color: var(--warning);
  border: 1px solid var(--warning);
}

.alert--error {
  background: var(--error-light);
  color: var(--error);
  border: 1px solid var(--error);
}
```

### Tabs

```css
.tabs {
  border-bottom: 1px solid var(--border-light);
  display: flex;
  gap: var(--space-1);
  overflow-x: auto;
}

.tab {
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.tab:hover {
  color: var(--text-primary);
}

.tab--active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}

.tab-panel {
  display: none;
  padding: var(--space-6) 0;
}

.tab-panel--active {
  display: block;
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  border-radius: var(--radius-full);
}

.badge--primary {
  background: var(--primary);
  color: var(--white);
}

.badge--secondary {
  background: var(--gray-200);
  color: var(--gray-700);
}

.badge--success {
  background: var(--success-light);
  color: var(--success);
}

.badge--warning {
  background: var(--warning-light);
  color: var(--warning);
}

.badge--error {
  background: var(--error-light);
  color: var(--error);
}
```

### Modal

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
}

.modal-overlay--active {
  opacity: 1;
  visibility: visible;
}

.modal {
  background: var(--surface);
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
}

.modal__header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--border-light);
}

.modal__title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
}

.modal__body {
  padding: var(--space-6);
}

.modal__footer {
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--border-light);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}
```

---

## Layout Utilities

```css
/* Flexbox */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-end { justify-content: flex-end; }
.gap-1 { gap: var(--space-1); }
.gap-2 { gap: var(--space-2); }
.gap-3 { gap: var(--space-3); }
.gap-4 { gap: var(--space-4); }
.gap-6 { gap: var(--space-6); }

/* Grid */
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

@media (min-width: 640px) {
  .sm\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .sm\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 768px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .md\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .md\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
}

/* Spacing */
.m-0 { margin: 0; }
.mt-4 { margin-top: var(--space-4); }
.mb-4 { margin-bottom: var(--space-4); }
.my-4 { margin-top: var(--space-4); margin-bottom: var(--space-4); }
.p-4 { padding: var(--space-4); }
.px-4 { padding-left: var(--space-4); padding-right: var(--space-4); }
.py-4 { padding-top: var(--space-4); padding-bottom: var(--space-4); }

/* Text */
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-sm { font-size: var(--text-sm); }
.text-lg { font-size: var(--text-lg); }
.font-bold { font-weight: var(--font-bold); }
.text-secondary { color: var(--text-secondary); }
.text-success { color: var(--success); }
.text-error { color: var(--error); }

/* Display */
.hidden { display: none; }
.block { display: block; }

/* Width */
.w-full { width: 100%; }
```

---

## Print Styles

```css
@media print {
  body {
    background: white;
    color: black;
    font-size: 12pt;
  }
  
  .no-print {
    display: none !important;
  }
  
  .card {
    box-shadow: none;
    border: 1px solid #ccc;
  }
  
  .btn {
    display: none;
  }
  
  a {
    text-decoration: none;
    color: black;
  }
}
```

---

## Theme Toggle JavaScript

```javascript
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
    const current = document.documentElement.getAttribute('data-theme');
    const themes = ['light', 'dark', 'night'];
    const nextIndex = (themes.indexOf(current) + 1) % themes.length;
    this.setTheme(themes[nextIndex]);
  },
  
  getCurrent() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
```

---

## PWA / Service Worker Template

### manifest.json
```json
{
  "name": "[Tool Name]",
  "short_name": "[Short Name]",
  "description": "[Description]",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#8B0000",
  "theme_color": "#8B0000",
  "icons": [
    {
      "src": "assets/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### service-worker.js
```javascript
const CACHE_NAME = '[tool-name]-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/app.js',
  '/assets/icon-192.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

---

## Standard HTML Template

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[Tool Description]">
  <title>[Tool Name] - USMC Tools</title>
  
  <!-- PWA -->
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#8B0000">
  <link rel="apple-touch-icon" href="assets/icon-192.png">
  
  <!-- Styles -->
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- Skip Link - Accessibility -->
  <a href="#main" class="skip-link">Skip to main content</a>
  
  <!-- Header -->
  <header class="header no-print">
    <div class="container">
      <h1 class="header__title">[Tool Name]</h1>
      <p class="header__subtitle">[Brief description]</p>
    </div>
  </header>
  
  <!-- Main Content -->
  <main id="main" class="container">
    <!-- Tool content goes here -->
  </main>
  
  <!-- Footer -->
  <footer class="footer no-print">
    <div class="container">
      <p class="text-sm text-secondary text-center">
        Free and open source. <a href="https://github.com/jeranaias/[repo]">View on GitHub</a>
      </p>
      <p class="text-sm text-secondary text-center mt-4">
        Part of the <a href="https://jeranaias.github.io/usmc-tools/">USMC Tools</a> suite.
      </p>
    </div>
  </footer>
  
  <!-- Scripts -->
  <script src="js/app.js"></script>
  
  <!-- Service Worker Registration -->
  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js');
    }
  </script>
</body>
</html>
```

---

## Footer Styles

```css
.footer {
  margin-top: var(--space-12);
  padding: var(--space-8) 0;
  border-top: 1px solid var(--border-light);
  background: var(--bg-secondary);
}
```

---

## Skip Link (Accessibility)

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary);
  color: var(--white);
  padding: var(--space-2) var(--space-4);
  z-index: 100;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}
```

---

## File Structure

Every tool repo should follow this structure:

```
[tool-name]/
├── index.html
├── manifest.json
├── service-worker.js
├── css/
│   └── styles.css          # Import shared + tool-specific
├── js/
│   ├── app.js              # Main application logic
│   └── lib/
│       ├── theme.js        # Theme management
│       ├── storage.js      # LocalStorage helpers
│       └── pdf.js          # PDF generation (if needed)
├── assets/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── [other assets]
├── README.md
├── LICENSE
└── CHANGELOG.md
```

---

## Shared JavaScript Utilities

### storage.js
```javascript
const Storage = {
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Storage save error:', e);
      return false;
    }
  },
  
  load(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('Storage load error:', e);
      return defaultValue;
    }
  },
  
  remove(key) {
    localStorage.removeItem(key);
  },
  
  clear(prefix) {
    if (prefix) {
      Object.keys(localStorage)
        .filter(k => k.startsWith(prefix))
        .forEach(k => localStorage.removeItem(k));
    } else {
      localStorage.clear();
    }
  }
};
```

### date-utils.js
```javascript
const DateUtils = {
  // Format: DD Mon YYYY (military style)
  formatMilitary(date) {
    const d = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = String(d.getDate()).padStart(2, '0');
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  },
  
  // Format: YYYYMMDD
  formatNumeric(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  },
  
  // Calculate age from DOB
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
```

---

## Git Commit Guidelines (ALL REPOS)

**IMPORTANT:** Do NOT include any Claude, Anthropic, or AI attribution in commit messages. Keep commits professional and human-authored in tone.

```bash
# GOOD commit messages:
git commit -m "Initial project setup with PWA support"
git commit -m "Add responsive navigation component"
git commit -m "Fix mobile viewport issues"
git commit -m "Implement dark mode toggle"

# BAD commit messages (do not use):
git commit -m "Generated by Claude..."
git commit -m "AI-assisted implementation of..."
git commit -m "Created with Anthropic..."
```

This applies to ALL repositories in the USMC Admin Tools suite.

---

## Community Attribution

These tools exist because Marines took the time to share their pain points on r/USMC and Discord. Every tool spec includes attribution to the community members who inspired it.

Contributors from the original Reddit thread and Discord DMs:
- **jj26meu** - Awards, 6105 counselings, Page 11 entries, collaboration offer
- **BigEarn86** - PFT/CFT proctor app, AAR generator
- **peternemr** - Pros/Cons generator
- **Alarming-Weekend-999** - OSMEAC generator with detailed specs
- **CheckFlop** - Screening package builders
- **quickdraw_** - Restriction tracker
- **k1dblast** - AA&E screening package (pending)
- **Tkis01gl** - Veteran dev wisdom on avoiding enterprise pitfalls
- **soft-diddy** - Validation and encouragement
- **rmp5s** - "Automate the Boring Stuff award" endorsement

*Thank you for making this possible.*

---

*Design System v1.0*
*Created December 2025*
*For use across all USMC Admin Tools*
