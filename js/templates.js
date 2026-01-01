/**
 * Page 11 Entry Templates
 * Based on MCO P1070.12K (IRAM) Chapter 4
 */

const UCMJ_ARTICLES = [
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

const CATEGORIES = {
  training: {
    name: "Training & Qualifications",
    templates: ["rifle_qual", "pistol_qual", "pft", "cft", "pme", "formal_school"]
  },
  counseling: {
    name: "Counselings (Non-Adverse)",
    templates: ["initial_counseling", "mid_marking", "career_counseling"]
  },
  adverse: {
    name: "Adverse Counselings",
    templates: ["performance_deficiency", "conduct_deficiency"]
  },
  "6105": {
    name: "6105 Counseling",
    templates: ["6105_counseling"]
  },
  admin: {
    name: "Administrative Entries",
    templates: ["bah_cert", "motorcycle_ack", "tattoo_ack", "bcp_assignment"]
  },
  recognition: {
    name: "Recognition",
    templates: ["letter_appreciation", "award_received"]
  },
  custom: {
    name: "Custom Entry",
    templates: ["custom"]
  }
};

const TEMPLATES = {
  // ============================================
  // TRAINING & QUALIFICATIONS
  // ============================================
  rifle_qual: {
    id: "rifle_qual",
    name: "Rifle Qualification",
    category: "training",
    fields: [
      { id: "qual_date", label: "Qualification Date", type: "date", required: true },
      { id: "location", label: "Location", type: "text", required: true, placeholder: "e.g., MCB Camp Pendleton" },
      { id: "weapon", label: "Weapon", type: "select", required: true, options: ["M16A4", "M4", "M27 IAR"] },
      { id: "score", label: "Score", type: "number", required: true, min: 0, max: 350 },
      { id: "classification", label: "Classification", type: "select", required: true, options: ["Expert", "Sharpshooter", "Marksman"] }
    ],
    template: `[DATE]

RIFLE QUALIFICATION

Qualified with the [weapon] service rifle on [qual_date] at [location], firing a score of [score], [classification].

                                    _______________________
                                    [Marine's Signature]`
  },

  pistol_qual: {
    id: "pistol_qual",
    name: "Pistol Qualification",
    category: "training",
    fields: [
      { id: "qual_date", label: "Qualification Date", type: "date", required: true },
      { id: "location", label: "Location", type: "text", required: true, placeholder: "e.g., MCB Camp Pendleton" },
      { id: "weapon", label: "Weapon", type: "select", required: true, options: ["M9", "M18"] },
      { id: "score", label: "Score", type: "number", required: true, min: 0, max: 300 },
      { id: "classification", label: "Classification", type: "select", required: true, options: ["Expert", "Sharpshooter", "Marksman"] }
    ],
    template: `[DATE]

PISTOL QUALIFICATION

Qualified with the [weapon] service pistol on [qual_date] at [location], firing a score of [score], [classification].

                                    _______________________
                                    [Marine's Signature]`
  },

  pft: {
    id: "pft",
    name: "PFT Completion",
    category: "training",
    fields: [
      { id: "pft_date", label: "PFT Date", type: "date", required: true },
      { id: "score", label: "Total Score", type: "number", required: true, min: 0, max: 300 },
      { id: "pft_class", label: "Class", type: "select", required: true, options: ["1st Class", "2nd Class", "3rd Class"] },
      { id: "pullups", label: "Pull-ups/Push-ups", type: "text", required: true, placeholder: "e.g., 23 pull-ups" },
      { id: "plank", label: "Plank Time", type: "text", required: true, placeholder: "e.g., 4:20" },
      { id: "run_time", label: "3-Mile Run Time", type: "text", required: true, placeholder: "e.g., 21:30" }
    ],
    template: `[DATE]

PHYSICAL FITNESS TEST COMPLETION

Completed the Physical Fitness Test on [pft_date] with a score of [score] ([pft_class]).
Pull-ups/Push-ups: [pullups]
Plank: [plank]
3-Mile Run: [run_time]

                                    _______________________
                                    [Marine's Signature]`
  },

  cft: {
    id: "cft",
    name: "CFT Completion",
    category: "training",
    fields: [
      { id: "cft_date", label: "CFT Date", type: "date", required: true },
      { id: "score", label: "Total Score", type: "number", required: true, min: 0, max: 300 },
      { id: "cft_class", label: "Class", type: "select", required: true, options: ["1st Class", "2nd Class", "3rd Class"] },
      { id: "mtc", label: "Movement to Contact", type: "text", required: true, placeholder: "e.g., 2:45" },
      { id: "ammo_lift", label: "Ammunition Lift", type: "text", required: true, placeholder: "e.g., 106 reps" },
      { id: "muf", label: "Maneuver Under Fire", type: "text", required: true, placeholder: "e.g., 2:30" }
    ],
    template: `[DATE]

COMBAT FITNESS TEST COMPLETION

Completed the Combat Fitness Test on [cft_date] with a score of [score] ([cft_class]).
Movement to Contact: [mtc]
Ammunition Lift: [ammo_lift]
Maneuver Under Fire: [muf]

                                    _______________________
                                    [Marine's Signature]`
  },

  pme: {
    id: "pme",
    name: "PME Completion",
    category: "training",
    fields: [
      { id: "course_name", label: "Course Name", type: "text", required: true, placeholder: "e.g., Corporals Course" },
      { id: "completion_date", label: "Completion Date", type: "date", required: true },
      { id: "location", label: "Location/Method", type: "text", required: true, placeholder: "e.g., Camp Johnson / via MarineNet" },
      { id: "additional_details", label: "Additional Details (optional)", type: "textarea", required: false }
    ],
    template: `[DATE]

PROFESSIONAL MILITARY EDUCATION COMPLETION

Completed [course_name] on [completion_date] at [location]. [additional_details]

                                    _______________________
                                    [Marine's Signature]`
  },

  formal_school: {
    id: "formal_school",
    name: "Formal School Graduation",
    category: "training",
    fields: [
      { id: "school_name", label: "School Name", type: "text", required: true },
      { id: "graduation_date", label: "Graduation Date", type: "date", required: true },
      { id: "location", label: "Location", type: "text", required: true },
      { id: "course_number", label: "Course Number/Identifier", type: "text", required: false },
      { id: "class_standing", label: "Class Standing (e.g., 5 of 30)", type: "text", required: false },
      { id: "honors", label: "Honors (optional)", type: "text", required: false, placeholder: "e.g., Distinguished Honor Graduate" }
    ],
    template: `[DATE]

FORMAL SCHOOL COMPLETION

Graduated from [school_name] on [graduation_date] at [location]. Course [course_number]. Class standing: [class_standing]. [honors]

                                    _______________________
                                    [Marine's Signature]`
  },

  // ============================================
  // COUNSELINGS (NON-ADVERSE)
  // ============================================
  initial_counseling: {
    id: "initial_counseling",
    name: "Initial Counseling - New Join",
    category: "counseling",
    fields: [
      { id: "unit_name", label: "Unit Name", type: "text", required: true, placeholder: "e.g., 1st Battalion, 5th Marines" }
    ],
    template: `[DATE]

INITIAL COUNSELING

Counseled this date upon joining [unit_name]. Discussed unit policies, expectations, duty hours, liberty policy, chain of command, and emergency contact procedures. I understand my responsibilities as a member of this command.

                                    _______________________
                                    [Marine's Signature]

                                    _______________________
                                    [Counselor's Signature]`
  },

  mid_marking: {
    id: "mid_marking",
    name: "Mid-Marking Period Counseling",
    category: "counseling",
    fields: [
      { id: "period_start", label: "Marking Period Start", type: "date", required: true },
      { id: "proficiency", label: "Current Proficiency Mark", type: "text", required: true, placeholder: "e.g., 4.3" },
      { id: "conduct", label: "Current Conduct Mark", type: "text", required: true, placeholder: "e.g., 4.4" },
      { id: "strengths", label: "Strengths", type: "textarea", required: true },
      { id: "improvements", label: "Areas for Improvement", type: "textarea", required: true },
      { id: "goals", label: "Goals for Remainder of Period", type: "textarea", required: true }
    ],
    template: `[DATE]

MID-MARKING PERIOD COUNSELING

Counseled this date regarding performance and conduct during the current marking period ([period_start] to present). Current recommended marks are Proficiency [proficiency] and Conduct [conduct].

Strengths: [strengths]

Areas for improvement: [improvements]

Goals for remainder of period: [goals]

                                    _______________________
                                    [Marine's Signature]

                                    _______________________
                                    [Counselor's Signature]`
  },

  career_counseling: {
    id: "career_counseling",
    name: "Career Counseling",
    category: "counseling",
    fields: [
      { id: "topics", label: "Topics Discussed", type: "textarea", required: true, placeholder: "e.g., reenlistment eligibility, promotion requirements, special duty assignments" },
      { id: "career_goals", label: "Marine's Career Goals", type: "textarea", required: true }
    ],
    template: `[DATE]

CAREER COUNSELING

Counseled this date regarding career options and opportunities. Discussed [topics]. Marine expressed interest in [career_goals].

                                    _______________________
                                    [Marine's Signature]

                                    _______________________
                                    [Counselor's Signature]`
  },

  // ============================================
  // ADVERSE COUNSELINGS
  // ============================================
  performance_deficiency: {
    id: "performance_deficiency",
    name: "Performance Deficiency",
    category: "adverse",
    fields: [
      { id: "deficiency", label: "Describe Deficiency in Detail", type: "textarea", required: true },
      { id: "rank", label: "Marine's Rank", type: "text", required: true, placeholder: "e.g., Lance Corporal" },
      { id: "corrective_action", label: "Required Corrective Action", type: "textarea", required: true }
    ],
    template: `[DATE]

COUNSELING - PERFORMANCE DEFICIENCY

Counseled this date concerning deficient performance of duties. Specifically, [deficiency]. This performance does not meet the standards expected of a [rank] in the United States Marine Corps.

You are advised to take the following corrective action: [corrective_action].

Failure to improve may result in adverse administrative action including but not limited to: adverse proficiency marks, non-recommendation for promotion, and/or processing for administrative separation.

I acknowledge receipt of this counseling and understand its contents.

                                    _______________________
                                    [Marine's Signature]

                                    _______________________
                                    [Counselor's Signature]

                                    _______________________
                                    [Witness Signature]`
  },

  conduct_deficiency: {
    id: "conduct_deficiency",
    name: "Conduct Deficiency",
    category: "adverse",
    fields: [
      { id: "conduct_issue", label: "Describe Conduct Issue", type: "textarea", required: true },
      { id: "incident_date", label: "Date of Incident", type: "date", required: true },
      { id: "incident_description", label: "What Happened", type: "textarea", required: true, placeholder: "failed to report for duty on time (don't start with 'you')" }
    ],
    template: `[DATE]

COUNSELING - CONDUCT DEFICIENCY

Counseled this date concerning [conduct_issue]. On [incident_date], you [incident_description]. This conduct does not meet the standards expected of a Marine.

You are advised that repetition of this or similar conduct may result in adverse administrative action including adverse conduct marks, non-judicial punishment, and/or administrative separation.

I acknowledge receipt of this counseling and understand its contents.

                                    _______________________
                                    [Marine's Signature]

                                    _______________________
                                    [Counselor's Signature]

                                    _______________________
                                    [Witness Signature]`
  },

  // ============================================
  // 6105 COUNSELING
  // ============================================
  "6105_counseling": {
    id: "6105_counseling",
    name: "6105 Counseling",
    category: "6105",
    fields: [
      { id: "reason", label: "Reason (for subject line)", type: "text", required: true, placeholder: "e.g., UNAUTHORIZED ABSENCE" },
      { id: "deficiency", label: "Specific Deficiency/Misconduct", type: "textarea", required: true },
      { id: "incident_dates", label: "Date(s) of Incident", type: "text", required: true },
      { id: "incident_description", label: "Detailed Description of Incident/Pattern", type: "textarea", required: true, placeholder: "failed to maintain proper uniform standards (don't start with 'you')" },
      { id: "violation_type", label: "Violation Type", type: "radio", required: true, options: ["UCMJ Article", "Policy/Regulation Violation"] },
      { id: "ucmj_article", label: "UCMJ Article", type: "ucmj_select", required: false, conditional: { field: "violation_type", value: "UCMJ Article" } },
      { id: "policy_reference", label: "Policy/Regulation Reference", type: "text", required: false, placeholder: "e.g., MCO 1020.34H", conditional: { field: "violation_type", value: "Policy/Regulation Violation" } },
      { id: "conduct_or_performance", label: "Type", type: "select", required: true, options: ["conduct", "performance"] },
      { id: "corrective_action", label: "Specific Corrective Action Required", type: "textarea", required: true },
      { id: "rebuttal_days", label: "Days to Submit Rebuttal", type: "number", required: true, value: 30 }
    ],
    template: `[DATE]

6105 COUNSELING - [reason]

Counseled this date concerning [deficiency].

On [incident_dates], you [incident_description].

This [conduct_or_performance] is in violation of [violation_reference] and falls below the standards required of a Marine.

You are advised that:
1. This counseling constitutes a permanent entry in your Official Military Personnel File (OMPF).
2. This documentation may be used as a basis for administrative separation.
3. Repetition of this or similar [conduct_or_performance] will result in further adverse action.

Specific corrective action required:
[corrective_action]

You have the right to submit a written rebuttal statement within [rebuttal_days] days of this counseling. Any rebuttal will be attached to this entry.

I acknowledge receipt of this counseling and understand its contents.

                                    _______________________
                                    [Marine's Signature/Date]
                                    (Signature does not indicate agreement)

                                    _______________________
                                    [Commanding Officer Signature/Date]

                                    _______________________
                                    [Witness Signature/Date]`
  },

  // ============================================
  // ADMINISTRATIVE ENTRIES
  // ============================================
  bah_cert: {
    id: "bah_cert",
    name: "BAH Certification",
    category: "admin",
    fields: [
      { id: "address", label: "Dependent Address", type: "textarea", required: true }
    ],
    template: `[DATE]

BASIC ALLOWANCE FOR HOUSING CERTIFICATION

I certify that my dependents reside at [address]. I understand that I am required to notify the Personnel Officer immediately of any change in dependency status (marriage, divorce, separation, death, or birth) or change of address. I understand that failure to do so may result in recoupment of funds and/or disciplinary action.

                                    _______________________
                                    [Marine's Signature]`
  },

  motorcycle_ack: {
    id: "motorcycle_ack",
    name: "Motorcycle Policy Acknowledgment",
    category: "admin",
    fields: [
      { id: "owns_motorcycle", label: "Currently Own Motorcycle/ATV?", type: "select", required: true, options: ["own", "do not own"] }
    ],
    template: `[DATE]

MOTORCYCLE/ATV SAFETY ACKNOWLEDGMENT

Acknowledged this date the requirements of the Motorcycle Safety Program per MCO 5100.19F. I understand that I must:
1. Complete an approved motorcycle safety course
2. Register my motorcycle with the Provost Marshal
3. Wear proper protective equipment
4. Maintain valid license and insurance

I currently [owns_motorcycle] a motorcycle/ATV.

                                    _______________________
                                    [Marine's Signature]`
  },

  tattoo_ack: {
    id: "tattoo_ack",
    name: "Tattoo Policy Acknowledgment",
    category: "admin",
    fields: [
      { id: "tattoo_locations", label: "Current Tattoo Locations", type: "textarea", required: true, placeholder: 'List locations or enter "NONE"' }
    ],
    template: `[DATE]

TATTOO POLICY ACKNOWLEDGMENT

Acknowledged this date the Marine Corps tattoo policy per MCO 1020.34H. I understand the locations and types of tattoos that are prohibited. I currently have tattoos in the following locations: [tattoo_locations]. All tattoos are in compliance with current policy.

                                    _______________________
                                    [Marine's Signature]`
  },

  bcp_assignment: {
    id: "bcp_assignment",
    name: "BCP Assignment",
    category: "admin",
    fields: [
      { id: "effective_date", label: "Effective Date", type: "date", required: true },
      { id: "height", label: "Current Height (inches)", type: "number", required: true },
      { id: "weight", label: "Current Weight (lbs)", type: "number", required: true },
      { id: "max_weight", label: "Maximum Allowable Weight (lbs)", type: "number", required: true },
      { id: "body_fat", label: "Current Body Fat (%)", type: "number", required: true },
      { id: "weigh_in_schedule", label: "Monthly Weigh-in Dates", type: "text", required: true, placeholder: "e.g., 1st and 15th of each month" }
    ],
    template: `[DATE]

BODY COMPOSITION PROGRAM ASSIGNMENT

Counseled this date concerning assignment to the Marine Corps Body Composition Program (BCP) effective [effective_date]. Current height: [height] inches. Current weight: [weight] pounds. Maximum allowable weight: [max_weight] pounds. Current body fat: [body_fat]%.

You are advised that failure to meet established weight/body composition standards may result in processing for administrative separation per MCO 6110.3A.

Monthly weigh-in dates: [weigh_in_schedule]

                                    _______________________
                                    [Marine's Signature]

                                    _______________________
                                    [Counselor's Signature]`
  },

  // ============================================
  // RECOGNITION
  // ============================================
  letter_appreciation: {
    id: "letter_appreciation",
    name: "Letter of Appreciation",
    category: "recognition",
    fields: [
      { id: "originator", label: "Originator/Command", type: "text", required: true },
      { id: "received_date", label: "Date Received", type: "date", required: true },
      { id: "reason", label: "Reason/Achievement", type: "textarea", required: true },
      { id: "additional_details", label: "Additional Details (optional)", type: "textarea", required: false }
    ],
    template: `[DATE]

LETTER OF APPRECIATION

Received a Letter of Appreciation from [originator] on [received_date] for [reason]. [additional_details]

                                    _______________________
                                    [Marine's Signature]`
  },

  award_received: {
    id: "award_received",
    name: "Award Received",
    category: "recognition",
    fields: [
      { id: "award_name", label: "Award Name", type: "text", required: true, placeholder: "e.g., Navy and Marine Corps Achievement Medal" },
      { id: "award_date", label: "Date Awarded", type: "date", required: true },
      { id: "reason", label: "Reason (Meritorious Service/Achievement)", type: "textarea", required: true },
      { id: "approving_authority", label: "Approving Authority", type: "text", required: true }
    ],
    template: `[DATE]

AWARD DOCUMENTATION

Awarded the [award_name] on [award_date] for [reason]. Award approved by [approving_authority].

                                    _______________________
                                    [Marine's Signature]`
  },

  // ============================================
  // CUSTOM
  // ============================================
  custom: {
    id: "custom",
    name: "Custom Entry",
    category: "custom",
    fields: [
      { id: "subject", label: "Subject Line", type: "text", required: true },
      { id: "body", label: "Entry Body", type: "textarea", required: true },
      { id: "include_marine_sig", label: "Include Marine Signature Line?", type: "select", required: true, options: ["Yes", "No"] },
      { id: "include_counselor_sig", label: "Include Counselor Signature Line?", type: "select", required: true, options: ["Yes", "No"] },
      { id: "include_witness_sig", label: "Include Witness Signature Line?", type: "select", required: true, options: ["Yes", "No"] }
    ],
    template: `[DATE]

[subject]

[body]

[signature_lines]`
  }
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TEMPLATES, CATEGORIES, UCMJ_ARTICLES };
}
