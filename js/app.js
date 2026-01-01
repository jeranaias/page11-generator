/**
 * Page 11 Entry Generator - Main Application
 */

(function() {
  'use strict';

  // State
  let currentCategory = null;
  let currentTemplate = null;
  let currentValues = {};
  let generatedEntry = '';

  // PDF Preview State
  let pdfPreviewEnabled = false;
  let pdfPreviewDebounceTimer = null;
  const PDF_PREVIEW_DEBOUNCE_MS = 750;

  // DOM Elements
  const elements = {
    // Sections
    stepSelect: document.getElementById('step-select'),
    stepFill: document.getElementById('step-fill'),
    stepPreview: document.getElementById('step-preview'),
    draftsSection: document.getElementById('drafts-section'),

    // Category selection
    categorySelect: document.getElementById('categorySelect'),
    templateSelectGroup: document.getElementById('templateSelectGroup'),
    templateSelect: document.getElementById('templateSelect'),
    entryDate: document.getElementById('entryDate'),
    formattedDate: document.getElementById('formattedDate'),
    nextBtn: document.getElementById('nextBtn'),

    // Marine info (for PDF) - matches actual NAVMC 118(11) form
    marineName: document.getElementById('marineName'),
    marineSSN: document.getElementById('marineSSN'),

    // Template fill
    templateTitle: document.getElementById('templateTitle'),
    templateFields: document.getElementById('templateFields'),
    backBtn: document.getElementById('backBtn'),
    generateBtn: document.getElementById('generateBtn'),

    // Live Preview
    livePreviewContent: document.getElementById('livePreviewContent'),

    // Preview
    previewBox: document.getElementById('previewBox'),
    previewContent: document.getElementById('previewContent'),
    downloadPdfBtn: document.getElementById('downloadPdfBtn'),
    copyBtn: document.getElementById('copyBtn'),
    printBtn: document.getElementById('printBtn'),
    saveDraftBtn: document.getElementById('saveDraftBtn'),
    newEntryBtn: document.getElementById('newEntryBtn'),

    // Other
    draftsList: document.getElementById('draftsList'),
    toast: document.getElementById('toast'),
    themeToggle: document.getElementById('themeToggle'),
    printContent: document.getElementById('printContent'),

    // PDF Preview Pane
    previewToggle: document.getElementById('previewToggle'),
    previewClose: document.getElementById('previewClose'),
    livePreviewPane: document.getElementById('livePreviewPane'),
    previewFrame: document.getElementById('previewFrame'),
    previewLoading: document.getElementById('previewLoading')
  };

  // Initialize
  function init() {
    // Set today's date
    elements.entryDate.value = DateUtils.getTodayInputFormat();
    updateFormattedDate();

    // Initialize theme
    ThemeManager.init();

    // Load drafts
    loadDrafts();

    // Event listeners
    bindEvents();
  }

  function bindEvents() {
    // Category selection
    elements.categorySelect.addEventListener('change', handleCategoryChange);
    elements.templateSelect.addEventListener('change', handleTemplateChange);
    elements.entryDate.addEventListener('change', updateFormattedDate);
    elements.nextBtn.addEventListener('click', goToFillStep);

    // Template fill
    elements.backBtn.addEventListener('click', goToSelectStep);
    elements.generateBtn.addEventListener('click', generateEntry);

    // Preview actions
    elements.downloadPdfBtn.addEventListener('click', downloadPdf);
    elements.copyBtn.addEventListener('click', copyToClipboard);
    elements.printBtn.addEventListener('click', printEntry);
    elements.saveDraftBtn.addEventListener('click', saveDraft);
    elements.newEntryBtn.addEventListener('click', startNewEntry);

    // Theme toggle
    elements.themeToggle.addEventListener('click', () => ThemeManager.toggle());

    // PDF Preview toggle
    if (elements.previewToggle) {
      elements.previewToggle.addEventListener('click', togglePdfPreview);
    }
    if (elements.previewClose) {
      elements.previewClose.addEventListener('click', togglePdfPreview);
    }

    // Restore PDF preview preference
    if (localStorage.getItem('pdfPreviewEnabled') === 'true') {
      // Will be enabled when user goes to fill step
    }
  }

  // Category and Template Selection
  function handleCategoryChange() {
    const category = elements.categorySelect.value;
    currentCategory = category;
    currentTemplate = null;

    if (!category) {
      elements.templateSelectGroup.style.display = 'none';
      elements.nextBtn.disabled = true;
      return;
    }

    // Populate template options
    const categoryData = CATEGORIES[category];
    elements.templateSelect.innerHTML = '<option value="">Select entry type...</option>';

    categoryData.templates.forEach(templateId => {
      const template = TEMPLATES[templateId];
      if (template) {
        const option = document.createElement('option');
        option.value = templateId;
        option.textContent = template.name;
        elements.templateSelect.appendChild(option);
      }
    });

    elements.templateSelectGroup.style.display = 'block';
    elements.nextBtn.disabled = true;
  }

  function handleTemplateChange() {
    const templateId = elements.templateSelect.value;
    if (templateId) {
      currentTemplate = TEMPLATES[templateId];
      elements.nextBtn.disabled = false;
    } else {
      currentTemplate = null;
      elements.nextBtn.disabled = true;
    }
  }

  function updateFormattedDate() {
    const dateValue = elements.entryDate.value;
    if (dateValue) {
      elements.formattedDate.textContent = 'Military format: ' + DateUtils.inputToMilitary(dateValue);
    } else {
      elements.formattedDate.textContent = '';
    }
  }

  // Navigation
  function goToSelectStep() {
    elements.stepFill.style.display = 'none';
    elements.stepPreview.style.display = 'none';
    elements.stepSelect.style.display = 'block';

    // Close PDF preview if open
    if (pdfPreviewEnabled) {
      togglePdfPreview();
    }
  }

  function goToFillStep() {
    if (!currentTemplate) return;

    elements.stepSelect.style.display = 'none';
    elements.stepPreview.style.display = 'none';
    elements.stepFill.style.display = 'block';

    // Update title
    elements.templateTitle.textContent = currentTemplate.name;

    // Generate form fields
    generateFormFields();
  }

  function goToPreviewStep() {
    elements.stepSelect.style.display = 'none';
    elements.stepFill.style.display = 'none';
    elements.stepPreview.style.display = 'block';

    // Close PDF preview if open
    if (pdfPreviewEnabled) {
      togglePdfPreview();
    }
  }

  // Form Field Generation
  function generateFormFields() {
    elements.templateFields.innerHTML = '';
    currentValues = {};

    currentTemplate.fields.forEach(field => {
      const fieldContainer = createFormField(field);
      elements.templateFields.appendChild(fieldContainer);
    });

    // Initial live preview
    updateLivePreview();
  }

  function createFormField(field) {
    const container = document.createElement('div');
    container.className = 'form-group';
    container.id = `field-group-${field.id}`;

    // Check conditional display
    if (field.conditional) {
      container.style.display = 'none';
      container.dataset.conditionalField = field.conditional.field;
      container.dataset.conditionalValue = field.conditional.value;
    }

    const label = document.createElement('label');
    label.className = 'label' + (field.required ? ' label--required' : '');
    label.htmlFor = `field-${field.id}`;
    label.textContent = field.label;
    container.appendChild(label);

    let input;

    switch (field.type) {
      case 'select':
        input = document.createElement('select');
        input.className = 'input select';
        input.id = `field-${field.id}`;
        input.innerHTML = '<option value="">Select...</option>';
        field.options.forEach(opt => {
          const option = document.createElement('option');
          option.value = opt;
          option.textContent = opt;
          input.appendChild(option);
        });
        break;

      case 'textarea':
        input = document.createElement('textarea');
        input.className = 'input textarea';
        input.id = `field-${field.id}`;
        input.rows = 4;
        if (field.placeholder) input.placeholder = field.placeholder;
        break;

      case 'radio':
        const radioGroup = document.createElement('div');
        radioGroup.className = 'radio-group radio-group--horizontal';
        radioGroup.id = `field-${field.id}`;
        field.options.forEach((opt, idx) => {
          const radioLabel = document.createElement('label');
          radioLabel.className = 'radio-label';

          const radio = document.createElement('input');
          radio.type = 'radio';
          radio.className = 'radio';
          radio.name = `field-${field.id}`;
          radio.value = opt;
          radio.id = `field-${field.id}-${idx}`;
          radio.addEventListener('change', () => handleRadioChange(field.id, opt));

          radioLabel.appendChild(radio);
          radioLabel.appendChild(document.createTextNode(opt));
          radioGroup.appendChild(radioLabel);
        });
        input = radioGroup;
        break;

      case 'ucmj_select':
        input = document.createElement('select');
        input.className = 'input select';
        input.id = `field-${field.id}`;
        input.innerHTML = '<option value="">Select UCMJ Article...</option>';
        UCMJ_ARTICLES.forEach(article => {
          const option = document.createElement('option');
          option.value = article.article === 'none' ? article.title : `Article ${article.article}, UCMJ (${article.title})`;
          option.textContent = article.article === 'none' ? article.title : `Article ${article.article} - ${article.title}`;
          input.appendChild(option);
        });
        break;

      case 'date':
        input = document.createElement('input');
        input.type = 'date';
        input.className = 'input';
        input.id = `field-${field.id}`;
        break;

      case 'number':
        input = document.createElement('input');
        input.type = 'number';
        input.className = 'input';
        input.id = `field-${field.id}`;
        if (field.min !== undefined) input.min = field.min;
        if (field.max !== undefined) input.max = field.max;
        if (field.value !== undefined) input.value = field.value;
        break;

      default: // text
        input = document.createElement('input');
        input.type = 'text';
        input.className = 'input';
        input.id = `field-${field.id}`;
        if (field.placeholder) input.placeholder = field.placeholder;
        break;
    }

    // Add input event listener for live preview
    if (field.type !== 'radio') {
      input.addEventListener('input', updateLivePreview);
      input.addEventListener('change', updateLivePreview);
      container.appendChild(input);
    } else {
      container.appendChild(input);
    }

    return container;
  }

  function handleRadioChange(fieldId, value) {
    // Show/hide conditional fields
    const allFieldGroups = elements.templateFields.querySelectorAll('[data-conditional-field]');
    allFieldGroups.forEach(group => {
      if (group.dataset.conditionalField === fieldId) {
        if (group.dataset.conditionalValue === value) {
          group.style.display = 'block';
        } else {
          group.style.display = 'none';
        }
      }
    });
    // Update live preview
    updateLivePreview();
  }

  // Live Preview Update
  function updateLivePreview() {
    if (!currentTemplate) return;

    // Collect current values from all fields
    const values = {};
    currentTemplate.fields.forEach(field => {
      if (field.type === 'radio') {
        const selected = document.querySelector(`input[name="field-${field.id}"]:checked`);
        values[field.id] = selected ? selected.value : `[${field.label}]`;
      } else {
        const input = document.getElementById(`field-${field.id}`);
        values[field.id] = input && input.value ? input.value : `[${field.label}]`;
      }
    });

    // Get entry date
    const entryDate = elements.entryDate.value
      ? DateUtils.inputToMilitary(elements.entryDate.value)
      : '[DATE]';

    // Fill template
    let output = currentTemplate.template;
    output = output.replace('[DATE]', entryDate);

    // Replace field placeholders
    Object.keys(values).forEach(key => {
      let value = values[key];

      // Convert dates to military format if value is a date input
      const field = currentTemplate.fields.find(f => f.id === key);
      if (field && field.type === 'date' && value && !value.startsWith('[')) {
        value = DateUtils.inputToMilitary(value);
      }

      output = output.replace(new RegExp(`\\[${key}\\]`, 'g'), value);
    });

    // Handle 6105 violation reference
    if (currentTemplate.id === '6105_counseling') {
      const violationType = values.violation_type;
      let violationRef = '[Violation Reference]';
      if (violationType === 'UCMJ Article' && values.ucmj_article && !values.ucmj_article.startsWith('[')) {
        violationRef = values.ucmj_article;
      } else if (violationType === 'Policy/Regulation Violation' && values.policy_reference && !values.policy_reference.startsWith('[')) {
        violationRef = values.policy_reference;
      }
      output = output.replace('[violation_reference]', violationRef);
    }

    // Handle custom entry signature lines
    if (currentTemplate.id === 'custom') {
      let sigLines = '';
      if (values.include_marine_sig === 'Yes') {
        sigLines += `\n                                    _______________________\n                                    [Marine's Signature]`;
      }
      if (values.include_counselor_sig === 'Yes') {
        sigLines += `\n\n                                    _______________________\n                                    [Counselor's Signature]`;
      }
      if (values.include_witness_sig === 'Yes') {
        sigLines += `\n\n                                    _______________________\n                                    [Witness Signature]`;
      }
      output = output.replace('[signature_lines]', sigLines);
    }

    // Update live preview
    elements.livePreviewContent.textContent = output;

    // Schedule PDF preview update (debounced)
    schedulePdfPreviewUpdate();
  }

  // Entry Generation
  function generateEntry() {
    // Collect values
    currentValues = {};
    let hasErrors = false;

    currentTemplate.fields.forEach(field => {
      const fieldGroup = document.getElementById(`field-group-${field.id}`);
      const isVisible = fieldGroup.style.display !== 'none';

      if (field.type === 'radio') {
        const selected = document.querySelector(`input[name="field-${field.id}"]:checked`);
        currentValues[field.id] = selected ? selected.value : '';
      } else {
        const input = document.getElementById(`field-${field.id}`);
        currentValues[field.id] = input ? input.value : '';
      }

      // Validate required fields (only if visible)
      if (field.required && isVisible && !currentValues[field.id]) {
        const input = document.getElementById(`field-${field.id}`);
        if (input && input.classList) {
          input.classList.add('input--error');
        }
        hasErrors = true;
      } else {
        const input = document.getElementById(`field-${field.id}`);
        if (input && input.classList) {
          input.classList.remove('input--error');
        }
      }
    });

    if (hasErrors) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    // Get entry date
    const entryDate = DateUtils.inputToMilitary(elements.entryDate.value);

    // Fill template
    let output = currentTemplate.template;
    output = output.replace('[DATE]', entryDate);

    // Replace field placeholders
    Object.keys(currentValues).forEach(key => {
      let value = currentValues[key];

      // Convert dates to military format
      if (currentTemplate.fields.find(f => f.id === key && f.type === 'date')) {
        value = DateUtils.inputToMilitary(value);
      }

      // Handle empty optional fields - remove placeholder entirely or leave blank
      if (!value) {
        value = '';
      }

      output = output.replace(new RegExp(`\\[${key}\\]`, 'g'), value);
    });

    // Handle 6105 violation reference
    if (currentTemplate.id === '6105_counseling') {
      const violationType = currentValues.violation_type;
      let violationRef = '';
      if (violationType === 'UCMJ Article') {
        violationRef = currentValues.ucmj_article || '';
      } else {
        violationRef = currentValues.policy_reference || '';
      }
      output = output.replace('[violation_reference]', violationRef);
    }

    // Handle custom entry signature lines
    if (currentTemplate.id === 'custom') {
      let sigLines = '';
      if (currentValues.include_marine_sig === 'Yes') {
        sigLines += `
                                    _______________________
                                    [Marine's Signature]`;
      }
      if (currentValues.include_counselor_sig === 'Yes') {
        sigLines += `

                                    _______________________
                                    [Counselor's Signature]`;
      }
      if (currentValues.include_witness_sig === 'Yes') {
        sigLines += `

                                    _______________________
                                    [Witness Signature]`;
      }
      output = output.replace('[signature_lines]', sigLines);
    }

    // Clean up any remaining empty placeholders
    output = output.replace(/\s*\[\w+\]\s*/g, ' ').replace(/\s+/g, ' ').replace(/ \./g, '.');

    // Fix double spaces and clean up
    output = output.split('\n').map(line => line.trimEnd()).join('\n');

    generatedEntry = output;

    // Display preview
    elements.previewContent.textContent = output;
    goToPreviewStep();
  }

  // Actions
  function downloadPdf() {
    try {
      PDFGenerator.generate({
        entryText: generatedEntry,
        marineName: elements.marineName.value || '',
        marineSSN: elements.marineSSN.value || '',
        templateName: currentTemplate ? currentTemplate.name : 'Page 11 Entry'
      });
      showToast('PDF downloaded!', 'success');
    } catch (err) {
      console.error('PDF generation error:', err);
      showToast('Error generating PDF. Please try again.', 'error');
    }
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(generatedEntry);
      showToast('Copied to clipboard!', 'success');
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = generatedEntry;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('Copied to clipboard!', 'success');
    }
  }

  function printEntry() {
    // Set print content
    elements.printContent.innerHTML = `<pre style="font-family: 'Courier New', monospace; white-space: pre-wrap; font-size: 12pt;">${escapeHtml(generatedEntry)}</pre>`;
    window.print();
  }

  function saveDraft() {
    const draftId = Storage.saveDraft({
      templateId: currentTemplate.id,
      templateName: currentTemplate.name,
      entryDate: elements.entryDate.value,
      values: currentValues,
      generatedEntry: generatedEntry
    });

    showToast('Draft saved!', 'success');
    loadDrafts();
  }

  function loadDrafts() {
    const drafts = Storage.getDrafts();

    if (drafts.length === 0) {
      elements.draftsSection.style.display = 'none';
      return;
    }

    elements.draftsSection.style.display = 'block';
    elements.draftsList.innerHTML = '';

    drafts.forEach(draft => {
      const item = document.createElement('div');
      item.className = 'draft-item';
      item.innerHTML = `
        <div class="draft-info">
          <div class="draft-title">${escapeHtml(draft.templateName)}</div>
          <div class="draft-date">${new Date(draft.savedAt).toLocaleDateString()}</div>
        </div>
        <div class="draft-actions">
          <button class="btn btn--sm btn--outline" data-action="load" data-id="${draft.id}">Load</button>
          <button class="btn btn--sm btn--danger" data-action="delete" data-id="${draft.id}">Delete</button>
        </div>
      `;
      elements.draftsList.appendChild(item);
    });

    // Bind draft actions
    elements.draftsList.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        const id = e.target.dataset.id;
        if (action === 'load') {
          loadDraft(id);
        } else if (action === 'delete') {
          deleteDraft(id);
        }
      });
    });
  }

  function loadDraft(id) {
    const draft = Storage.getDraft(id);
    if (!draft) {
      showToast('Draft not found', 'error');
      return;
    }

    // Set category and template
    const template = TEMPLATES[draft.templateId];
    if (!template) {
      showToast('Template not found', 'error');
      return;
    }

    // Set selections
    elements.categorySelect.value = template.category;
    handleCategoryChange();
    elements.templateSelect.value = draft.templateId;
    handleTemplateChange();
    elements.entryDate.value = draft.entryDate;
    updateFormattedDate();

    // Go to fill step
    goToFillStep();

    // Fill in values (after a short delay to ensure fields are rendered)
    setTimeout(() => {
      Object.keys(draft.values).forEach(key => {
        const field = template.fields.find(f => f.id === key);
        if (field && field.type === 'radio') {
          const radio = document.querySelector(`input[name="field-${key}"][value="${draft.values[key]}"]`);
          if (radio) {
            radio.checked = true;
            handleRadioChange(key, draft.values[key]);
          }
        } else {
          const input = document.getElementById(`field-${key}`);
          if (input) {
            input.value = draft.values[key];
          }
        }
      });
    }, 100);

    showToast('Draft loaded', 'success');
  }

  function deleteDraft(id) {
    if (confirm('Delete this draft?')) {
      Storage.deleteDraft(id);
      loadDrafts();
      showToast('Draft deleted', 'success');
    }
  }

  function startNewEntry() {
    // Reset state
    currentCategory = null;
    currentTemplate = null;
    currentValues = {};
    generatedEntry = '';

    // Reset form
    elements.categorySelect.value = '';
    elements.templateSelect.innerHTML = '<option value="">Select entry type...</option>';
    elements.templateSelectGroup.style.display = 'none';
    elements.entryDate.value = DateUtils.getTodayInputFormat();
    updateFormattedDate();
    elements.nextBtn.disabled = true;
    elements.templateFields.innerHTML = '';

    // Go to select step
    goToSelectStep();
  }

  // Utilities
  function showToast(message, type = 'info') {
    elements.toast.textContent = message;
    elements.toast.className = 'toast toast--visible';
    if (type) {
      elements.toast.classList.add(`toast--${type}`);
    }

    setTimeout(() => {
      elements.toast.className = 'toast';
    }, 3000);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ========================================
  // PDF Preview Manager
  // ========================================

  /**
   * Check if device is mobile (narrow screen)
   */
  function isMobileDevice() {
    return window.innerWidth <= 1024;
  }

  /**
   * Toggle the live PDF preview pane
   */
  function togglePdfPreview() {
    pdfPreviewEnabled = !pdfPreviewEnabled;

    if (pdfPreviewEnabled) {
      document.body.classList.add('preview-active');
      elements.livePreviewPane.classList.add('show');
      elements.previewToggle.textContent = 'Hide Preview';
      elements.previewToggle.classList.add('active');
      updatePdfPreview();
    } else {
      document.body.classList.remove('preview-active');
      elements.livePreviewPane.classList.remove('show');
      elements.previewToggle.textContent = 'Live Preview';
      elements.previewToggle.classList.remove('active');
      // Clean up blob URL
      if (elements.previewFrame && elements.previewFrame.dataset.blobUrl) {
        URL.revokeObjectURL(elements.previewFrame.dataset.blobUrl);
        elements.previewFrame.removeAttribute('src');
        delete elements.previewFrame.dataset.blobUrl;
      }
    }

    localStorage.setItem('pdfPreviewEnabled', pdfPreviewEnabled);
  }

  /**
   * Schedule a preview update (debounced)
   */
  function schedulePdfPreviewUpdate() {
    if (!pdfPreviewEnabled) return;

    if (pdfPreviewDebounceTimer) {
      clearTimeout(pdfPreviewDebounceTimer);
    }

    pdfPreviewDebounceTimer = setTimeout(updatePdfPreview, PDF_PREVIEW_DEBOUNCE_MS);
  }

  /**
   * Update the live PDF preview
   */
  function updatePdfPreview() {
    if (!pdfPreviewEnabled || !currentTemplate) return;

    const previewFrame = elements.previewFrame;
    const previewLoading = elements.previewLoading;

    if (!previewFrame) return;

    try {
      // Show loading indicator
      if (previewLoading) {
        previewLoading.style.display = 'flex';
      }

      // Get current entry text from live preview
      const entryText = elements.livePreviewContent.textContent;

      // Generate PDF blob
      const pdfBlob = PDFGenerator.generateBlob({
        entryText: entryText,
        marineName: elements.marineName.value || '',
        marineSSN: elements.marineSSN.value || '',
        templateName: currentTemplate ? currentTemplate.name : 'Page 11 Entry'
      });

      if (pdfBlob) {
        // Create blob URL
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Revoke old blob URL to prevent memory leaks
        if (previewFrame.dataset.blobUrl) {
          URL.revokeObjectURL(previewFrame.dataset.blobUrl);
        }

        previewFrame.src = blobUrl;
        previewFrame.dataset.blobUrl = blobUrl;
      }
    } catch (error) {
      console.error('PDF preview generation error:', error);
    } finally {
      // Hide loading indicator after a short delay
      setTimeout(() => {
        if (previewLoading) {
          previewLoading.style.display = 'none';
        }
      }, 300);
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
