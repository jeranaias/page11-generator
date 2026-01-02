# Page 11 Entry Generator

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://jeranaias.github.io/page11-generator/)
[![PWA Ready](https://img.shields.io/badge/PWA-ready-blue)](https://jeranaias.github.io/page11-generator/)
[![Offline Capable](https://img.shields.io/badge/offline-capable-green)](https://jeranaias.github.io/page11-generator/)

**Free, offline-capable NAVMC 118(11) entry builder for USMC admin personnel.**

Generate properly formatted Page 11 administrative remarks with pre-built templates, live PDF preview, and IRAM-compliant formatting. Works completely offline once installed.

[**Try it now**](https://jeranaias.github.io/page11-generator/)

---

## Features

### Complete Template Library
All major entry types with guided prompts:

| Category | Entry Types |
|----------|-------------|
| **Training & Quals** | Rifle/Pistol qualification, PFT/CFT, PME, Formal schools, MOS qualification |
| **Counseling** | Initial counseling, Mid-marking period, Career counseling, Transfer counseling |
| **6105 Counseling** | Adverse counseling with UCMJ article dropdown per IRAM Para 4005.8 |
| **Adverse Action** | NJP notification, Page 11 warning, Performance deficiency |
| **Admin Entries** | BAH certification, SGLI election, Motorcycle/Tattoo acknowledgment, BCP |
| **Recognition** | Letters of appreciation, Meritorious mast, Award recommendation |
| **Custom Entry** | Build your own entry with optional signature lines |

### Live PDF Preview
See your complete NAVMC 118(11) form update in real-time as you type. Preview pane shows the actual PDF layout ready for download.

### Three Theme Modes
- **Dark Mode** - Default for low-light office environments
- **Light Mode** - Standard daytime use
- **Night Mode** - Tactical red-on-black for field operations

### 100% Offline Capable
Install as a Progressive Web App (PWA) and use without internet connection. Perfect for NMCI computers with restricted access.

### Save & Export
- Download completed NAVMC 118(11) PDF
- Save drafts locally
- Copy text to clipboard
- Print formatted entries

---

## Quick Start

1. **Visit** [jeranaias.github.io/page11-generator](https://jeranaias.github.io/page11-generator/)
2. **Select** a category (Training, Counseling, 6105, etc.)
3. **Choose** the specific entry type
4. **Fill in** the template fields with guided prompts
5. **Preview** your PDF with the Live Preview button
6. **Download** the completed NAVMC 118(11) form

### Install for Offline Use

**Desktop (Chrome/Edge):** Click the install icon in the address bar

**iPhone/iPad:** Tap Share → "Add to Home Screen"

**Android:** Tap menu (⋮) → "Add to Home Screen"

---

## Entry Format Reference

### Standard Page 11 Structure
```
[DATE]

[ENTRY BODY - Multiple paragraphs as needed]

                                    _______________________
                                    [Marine's Signature]

                                    _______________________
                                    [Counselor's Signature]
```

### 6105 Counseling Requirements (IRAM Para 4005.8)
- Specific description of deficiency or violation
- Reference to UCMJ article or policy violated
- Statement that further deficiencies may result in administrative or disciplinary action
- Marine's acknowledgment signature
- Witness signature (if Marine refuses to sign)

---

## Self-Hosting

```bash
git clone https://github.com/jeranaias/page11-generator.git
cd page11-generator
npx serve .
```

Or deploy to any static hosting service (GitHub Pages, Netlify, Vercel).

---

## References

- MCO P1070.12K (Individual Records Administration Manual - IRAM) - Chapter 4
- NAVMC 118(11) - Administrative Remarks form
- MILPERSMAN 1070-320 (Navy Page 13 guidance)

---

## Community Attribution

Built based on feedback from the r/USMC community:

| Contributor | Contribution |
|-------------|--------------|
| **jj26meu** | Requested Page 11/6105 generator, suggested UCMJ article dropdown, confirmed IRAM requirements |

*This tool exists because Marines took the time to share their needs. Thank you.*

---

## Part of USMC Tools

This generator is part of the [USMC Tools](https://jeranaias.github.io/usmc-tools/) suite - free, offline-capable web tools for Marine Corps administrative tasks.

Other tools in the suite:
- [OSMEAC Generator](https://jeranaias.github.io/osmeac-generator/) - 5-paragraph order builder
- [Naval Letter Format](https://jeranaias.github.io/navalletterformat/) - Standard naval correspondence
- [Award Write-Up Generator](https://jeranaias.github.io/award-writeup-generator/) - Award citations
- [Pros/Cons Generator](https://jeranaias.github.io/pros-cons-generator/) - Evaluation bullets

---

## License

MIT License - Free to use, modify, and distribute.

---

*Semper Fidelis*
