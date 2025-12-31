# Page 11 Entry Generator - Build Specification

## Overview

**Repo Name:** `page11-generator`
**Purpose:** Generate properly formatted NAVPERS 1070/613 (Page 11/Administrative Remarks) entries for common situations. Templates for routine entries, counselings, and documentation.
**Target Users:** NCOs, SNCOs, and Officers documenting Marines; Admin personnel

---

## Design System

**CRITICAL:** Use the shared design system from `DESIGN_SYSTEM.md`. All colors, typography, spacing, and components must match exactly for suite consistency.

---

## References

- MCO P1070.12K (Individual Records Administration Manual - IRAM) - Chapter 4
- MILPERSMAN 1070-320 (Navy Page 13 guidance)
- NAVPERS 1070/613 form

---

## Background: Page 11 Entries

### What is a Page 11?
- Administrative remarks page in service record
- Documents significant events (positive or negative)
- Becomes part of permanent record
- Can be "permanent" or "temporary"

### Common Entry Types
1. **Routine Documentation** - Training completions, qualifications, acknowledgments
2. **Counselings** - Performance/conduct issues
3. **6105 Counselings** - Formal adverse documentation (warning for potential separation)
4. **Recognition** - Commendations, achievements
5. **Administrative Actions** - BAH changes, duty status, etc.

### Entry Format
```
[DATE (DD Mon YYYY)]

[SUBJECT LINE IN ALL CAPS]

[Body text - varies by entry type. Usually starts with "Counseled this date concerning..." or "Acknowledged this date..." or "Completed..."]

                                    _______________________
                                    [Marine's Signature]

                                    _______________________
                                    [Witness Signature/Date]
```

---

## Features Required

### 1. Entry Type Selector
- Dropdown of common entry types
- Each type loads appropriate template
- Category organization

### 2. Template Library
- Pre-written templates for common situations
- Fill-in-the-blank format
- Proper verbiage per IRAM

### 3. Date Formatter
- Auto-format to military style (DD Mon YYYY)
- Today's date default

### 4. Output Options
- Preview formatted entry
- Copy to clipboard
- Print-friendly format
- Save as draft

---

## Entry Categories & Templates

### Category 1: Training & Qualifications

#### Rifle Qualification
```
[DATE]

RIFLE QUALIFICATION

Qualified with the M16A4/M4 service rifle on [DATE] at [LOCATION], firing a score of [SCORE], [CLASSIFICATION (Expert/Sharpshooter/Marksman)].

                                    _______________________
                                    [Marine's Signature]
```

#### Pistol Qualification
```
[DATE]

PISTOL QUALIFICATION

Qualified with the M9/M18 service pistol on [DATE] at [LOCATION], firing a score of [SCORE], [CLASSIFICATION].

                                    _______________________
                                    [Marine's Signature]
```

#### PFT Completion
```
[DATE]

PHYSICAL FITNESS TEST COMPLETION

Completed the Physical Fitness Test on [DATE] with a score of [SCORE] ([CLASS - 1st/2nd/3rd]).
Pull-ups/Push-ups: [REPS]
Plank: [TIME]
3-Mile Run: [TIME]

                                    _______________________
                                    [Marine's Signature]
```

#### CFT Completion
```
[DATE]

COMBAT FITNESS TEST COMPLETION

Completed the Combat Fitness Test on [DATE] with a score of [SCORE] ([CLASS - 1st/2nd/3rd]).
Movement to Contact: [TIME]
Ammunition Lift: [REPS]
Maneuver Under Fire: [TIME]

                                    _______________________
                                    [Marine's Signature]
```

#### PME Completion
```
[DATE]

PROFESSIONAL MILITARY EDUCATION COMPLETION

Completed [COURSE NAME] on [DATE] at [LOCATION/via MarineNet]. [ADDITIONAL DETAILS IF APPLICABLE].

                                    _______________________
                                    [Marine's Signature]
```

#### Formal School Graduation
```
[DATE]

FORMAL SCHOOL COMPLETION

Graduated from [SCHOOL NAME] on [DATE] at [LOCATION]. Course [NUMBER/IDENTIFIER]. Class standing: [X of Y]. [HONORS IF APPLICABLE].

                                    _______________________
                                    [Marine's Signature]
```

### Category 2: Counselings (Non-Adverse)

#### Initial Counseling - New Join
```
[DATE]

INITIAL COUNSELING

Counseled this date upon joining [UNIT NAME]. Discussed unit policies, expectations, duty hours, liberty policy, chain of command, and emergency contact procedures. I understand my responsibilities as a member of this command.

                                    _______________________
                                    [Marine's Signature]

                                    _______________________
                                    [Counselor's Signature]
```

#### Mid-Marking Period Counseling
```
[DATE]

MID-MARKING PERIOD COUNSELING

Counseled this date regarding performance and conduct during the current marking period ([START DATE] to present). Current recommended marks are Proficiency [X.X] and Conduct [X.X]. 

Strengths: [AREAS OF STRONG PERFORMANCE]

Areas for improvement: [AREAS NEEDING WORK]

Goals for remainder of period: [SPECIFIC OBJECTIVES]

                                    _______________________
                                    [Marine's Signature]

                                    _______________________
                                    [Counselor's Signature]
```

#### Career Counseling
```
[DATE]

CAREER COUNSELING

Counseled this date regarding career options and opportunities. Discussed [reenlistment eligibility/promotion requirements/special duty assignments/education benefits/separation timeline]. Marine expressed interest in [CAREER GOALS].

                                    _______________________
                                    [Marine's Signature]

                                    _______________________
                                    [Counselor's Signature]
```

### Category 3: Adverse Counselings

#### Performance Deficiency
```
[DATE]

COUNSELING - PERFORMANCE DEFICIENCY

Counseled this date concerning deficient performance of duties. Specifically, [DESCRIBE DEFICIENCY IN DETAIL]. This performance does not meet the standards expected of a [RANK] in the United States Marine Corps.

You are advised to take the following corrective action: [SPECIFIC STEPS REQUIRED].

Failure to improve may result in adverse administrative action including but not limited to: adverse proficiency marks, non-recommendation for promotion, and/or processing for administrative separation.

I acknowledge receipt of this counseling and understand its contents.

                                    _______________________
                                    [Marine's Signature]

                                    _______________________
                                    [Counselor's Signature]

                                    _______________________
                                    [Witness Signature]
```

#### Conduct Deficiency
```
[DATE]

COUNSELING - CONDUCT DEFICIENCY

Counseled this date concerning [DESCRIBE CONDUCT ISSUE]. On [DATE OF INCIDENT], you [DESCRIBE WHAT HAPPENED]. This conduct does not meet the standards expected of a Marine.

You are advised that repetition of this or similar conduct may result in adverse administrative action including adverse conduct marks, non-judicial punishment, and/or administrative separation.

I acknowledge receipt of this counseling and understand its contents.

                                    _______________________
                                    [Marine's Signature]

                                    _______________________
                                    [Counselor's Signature]

                                    _______________________
                                    [Witness Signature]
```

### Category 4: 6105 Counseling (Adverse)

#### UCMJ Article Dropdown (for 6105 and formal counselings)

Per community feedback, 6105 counselings should include UCMJ article selection:

```javascript
const ucmjArticles = [
  { article: "86", title: "Absence Without Leave (UA)" },
  { article: "91", title: "Insubordinate Conduct Toward WO/NCO/PO" },
  { article: "92", title: "Failure to Obey Order or Regulation" },
  { article: "107", title: "False Official Statements" },
  { article: "108", title: "Loss/Damage/Destruction of Government Property" },
  { article: "111", title: "DUI/DWI" },
  { article: "112a", title: "Wrongful Use/Possession of Controlled Substances" },
  { article: "117", title: "Provoking Speeches or Gestures" },
  { article: "121", title: "Larceny/Wrongful Appropriation" },
  { article: "128", title: "Assault" },
  { article: "134", title: "General Article (specify offense)" },
  { article: "none", title: "Non-UCMJ (Policy/Standard Violation)" }
];
```

**UI for 6105:**
```
┌─────────────────────────────────────────────────────┐
│ Violation Type:                                      │
│ ○ UCMJ Article  ○ Policy/Regulation Violation       │
│                                                      │
│ [If UCMJ selected]                                  │
│ Article: [Article 92 - Failure to Obey_______▼]    │
│                                                      │
│ [If Policy selected]                                │
│ Reference: [MCO ___________]                        │
│                                                      │
│ Specific Offense/Violation:                         │
│ [_______________________________________]           │
└─────────────────────────────────────────────────────┘
```

Auto-generates violation line: "This conduct is in violation of Article 92, UCMJ (Failure to Obey Order or Regulation) and falls below..."

#### 6105 Template (Para 4005.8 IRAM)
```
[DATE]

6105 COUNSELING - [REASON]

Counseled this date concerning [SPECIFIC DEFICIENCY/MISCONDUCT]. 

On [DATE(S)], you [DETAILED DESCRIPTION OF INCIDENT(S)/PATTERN OF BEHAVIOR].

This [conduct/performance] is in violation of [AUTO-POPULATED FROM DROPDOWN] and falls below the standards required of a Marine.

You are advised that:
1. This counseling constitutes a permanent entry in your Official Military Personnel File (OMPF).
2. This documentation may be used as a basis for administrative separation.
3. Repetition of this or similar [conduct/performance] will result in further adverse action.

Specific corrective action required:
[LIST SPECIFIC REQUIREMENTS]

You have the right to submit a written rebuttal statement within [30] days of this counseling. Any rebuttal will be attached to this entry.

I acknowledge receipt of this counseling and understand its contents.

                                    _______________________
                                    [Marine's Signature/Date]
                                    (Signature does not indicate agreement)

                                    _______________________
                                    [Commanding Officer Signature/Date]

                                    _______________________
                                    [Witness Signature/Date]
```

### Category 5: Administrative Entries

#### BAH Certification
```
[DATE]

BASIC ALLOWANCE FOR HOUSING CERTIFICATION

I certify that my dependents reside at [ADDRESS]. I understand that I am required to notify the Personnel Officer immediately of any change in dependency status (marriage, divorce, separation, death, or birth) or change of address. I understand that failure to do so may result in recoupment of funds and/or disciplinary action.

                                    _______________________
                                    [Marine's Signature]
```

#### Motorcycle Policy Acknowledgment
```
[DATE]

MOTORCYCLE/ATV SAFETY ACKNOWLEDGMENT

Acknowledged this date the requirements of the Motorcycle Safety Program per MCO 5100.19F. I understand that I must:
1. Complete an approved motorcycle safety course
2. Register my motorcycle with the Provost Marshal
3. Wear proper protective equipment
4. Maintain valid license and insurance

I currently [own/do not own] a motorcycle/ATV.

                                    _______________________
                                    [Marine's Signature]
```

#### Tattoo Policy Acknowledgment
```
[DATE]

TATTOO POLICY ACKNOWLEDGMENT

Acknowledged this date the Marine Corps tattoo policy per MCO 1020.34H. I understand the locations and types of tattoos that are prohibited. I currently have tattoos in the following locations: [LIST OR "NONE"]. All tattoos are in compliance with current policy.

                                    _______________________
                                    [Marine's Signature]
```

#### BCP Assignment
```
[DATE]

BODY COMPOSITION PROGRAM ASSIGNMENT

Counseled this date concerning assignment to the Marine Corps Body Composition Program (BCP) effective [DATE]. Current height: [X] inches. Current weight: [X] pounds. Maximum allowable weight: [X] pounds. Current body fat: [X]%.

You are advised that failure to meet established weight/body composition standards may result in processing for administrative separation per MCO 6110.3A.

Monthly weigh-in dates: [SCHEDULE]

                                    _______________________
                                    [Marine's Signature]

                                    _______________________
                                    [Counselor's Signature]
```

### Category 6: Recognition Entries

#### Letter of Appreciation
```
[DATE]

LETTER OF APPRECIATION

Received a Letter of Appreciation from [ORIGINATOR/COMMAND] on [DATE] for [REASON/ACHIEVEMENT]. [ADDITIONAL DETAILS IF APPLICABLE].

                                    _______________________
                                    [Marine's Signature]
```

#### Award Received
```
[DATE]

AWARD DOCUMENTATION

Awarded the [AWARD NAME] on [DATE] for [REASON - MERITORIOUS SERVICE/ACHIEVEMENT DATES]. Award approved by [APPROVING AUTHORITY].

                                    _______________________
                                    [Marine's Signature]
```

---

## UI Structure

### Main Screen
```
┌─────────────────────────────────────┐
│      PAGE 11 ENTRY GENERATOR        │
├─────────────────────────────────────┤
│ Entry Type:                         │
│ [Select Category...            ▼]   │
│                                     │
│ ○ Rifle Qualification               │
│ ○ PFT Completion                    │
│ ○ PME Completion                    │
│ ○ Initial Counseling                │
│ ○ Performance Counseling            │
│ ○ 6105 Counseling                   │
│ ○ BCP Assignment                    │
│ ○ Custom Entry                      │
├─────────────────────────────────────┤
│ Entry Date: [31 Dec 2025]           │
├─────────────────────────────────────┤
│ [Next: Fill Template]               │
└─────────────────────────────────────┘
```

### Template Fill Screen
```
┌─────────────────────────────────────┐
│      RIFLE QUALIFICATION            │
│      Page 11 Entry                  │
├─────────────────────────────────────┤
│ Entry Date: [31 Dec 2025]           │
├─────────────────────────────────────┤
│ Fill in the blanks:                 │
│                                     │
│ Qualification Date: [__________]    │
│ Location: [__________________]      │
│ Weapon: [M16A4 ▼]                   │
│ Score: [___]                        │
│ Classification: [Expert ▼]          │
├─────────────────────────────────────┤
│ Preview:                            │
│ ┌─────────────────────────────────┐ │
│ │ 31 Dec 2025                     │ │
│ │                                 │ │
│ │ RIFLE QUALIFICATION             │ │
│ │                                 │ │
│ │ Qualified with the M16A4       │ │
│ │ service rifle on 15 Dec 2025   │ │
│ │ at MCB Camp Pendleton, firing  │ │
│ │ a score of 325, Expert.        │ │
│ │                                 │ │
│ │            ___________________  │ │
│ │            [Marine's Signature] │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ [Copy to Clipboard]     [Print]     │
│ [Save Draft]           [New Entry]  │
└─────────────────────────────────────┘
```

---

## Technical Implementation

### Files
```
page11-generator/
├── index.html
├── manifest.json
├── service-worker.js
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── templates.js        # All entry templates
│   ├── date-utils.js       # Military date formatting
│   └── storage.js          # Draft saving
├── assets/
│   ├── icon-192.png
│   └── icon-512.png
├── README.md
└── LICENSE
```

### Key Functions

```javascript
// Format military date
function formatMilitaryDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// Get template by type
function getTemplate(entryType) {
  return templates[entryType];
}

// Fill template with values
function fillTemplate(template, values) {
  let filled = template;
  for (const [key, value] of Object.entries(values)) {
    filled = filled.replace(new RegExp(`\\[${key}\\]`, 'g'), value);
  }
  return filled;
}

// Generate entry
function generateEntry(entryType, date, values) {
  const template = getTemplate(entryType);
  return fillTemplate(template, { DATE: formatMilitaryDate(date), ...values });
}
```

---

## Data Structure for Templates

```javascript
const templates = {
  rifle_qual: {
    name: "Rifle Qualification",
    category: "Training",
    fields: [
      { id: "qual_date", label: "Qualification Date", type: "date" },
      { id: "location", label: "Location", type: "text" },
      { id: "weapon", label: "Weapon", type: "select", options: ["M16A4", "M4", "M27 IAR"] },
      { id: "score", label: "Score", type: "number" },
      { id: "class", label: "Classification", type: "select", options: ["Expert", "Sharpshooter", "Marksman"] }
    ],
    template: `[DATE]

RIFLE QUALIFICATION

Qualified with the [weapon] service rifle on [qual_date] at [location], firing a score of [score], [class].

                                    _______________________
                                    [Marine's Signature]`
  },
  // ... more templates
};
```

---

## Testing Checklist

- [ ] All template categories load correctly
- [ ] Date formatter produces correct military format
- [ ] Template fields populate correctly
- [ ] Preview updates in real-time
- [ ] Copy to clipboard works
- [ ] Print formatting is correct
- [ ] Drafts save and load
- [ ] Mobile responsive
- [ ] Night mode works
- [ ] Offline capable

---

## Community Attribution

This tool was inspired by feedback from the r/USMC community:

| Contributor | Platform | Contribution |
|-------------|----------|--------------|
| **jj26meu** | r/USMC & Discord | Requested Page 11/6105 entries, provided UCMJ article dropdown idea, confirmed IRAM requirements |

*This tool exists because Marines took the time to share their pain points. Thank you.*

---

## Deployment

1. Push to GitHub repo `jeranaias/page11-generator`
2. Enable GitHub Pages from main branch
3. Test at `https://jeranaias.github.io/page11-generator/`

---

## Git Commit Guidelines

**IMPORTANT:** Do NOT include any Claude, Anthropic, or AI attribution in commit messages. Keep commits professional and human-authored in tone:

```
# GOOD commit messages:
git commit -m "Add 6105 counseling template with UCMJ dropdown"
git commit -m "Implement rifle qualification entry template"
git commit -m "Fix date formatting for military style"

# BAD commit messages (do not use):
git commit -m "Generated by Claude..."
git commit -m "AI-assisted implementation of..."
```

---

*Spec Version 1.0 - December 2025*
