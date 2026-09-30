import type { IconName } from "@/components/ui/Icon";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  icon: IconName;
};

export const homeServices: Service[] = [
  { slug: "billing", icon: "document", title: "Medical Billing", summary: "Claim preparation, claim submission, payer follow-up, payment posting, and outstanding balance review." },
  { slug: "rcm", icon: "cycle", title: "Revenue Cycle Management", summary: "From insurance verification and claim submission through payer processing, payment posting, and AR follow-up." },
  { slug: "denials", icon: "shield-x", title: "Denial Management", summary: "Denied claims shouldn't sit unresolved. We identify reasons, investigate, correct, and support resubmission or appeal." },
  { slug: "verification", icon: "card-check", title: "Insurance Verification", summary: "Verify coverage and eligibility before services whenever possible, so coverage issues surface earlier." },
  { slug: "ar", icon: "clock", title: "Accounts Receivable Follow-Up", summary: "We review aging claims and follow up with payers to find out why payment is outstanding and what's required." },
  { slug: "billing", icon: "wallet", title: "Payment Posting", summary: "Insurance and patient payments posted accurately, with discrepancies flagged for further review." },
  { slug: "coding", icon: "code", title: "Medical Coding Support", summary: "Coding workflows based on provider documentation and applicable billing requirements." },
  { slug: "credentialing", icon: "badge", title: "Credentialing Support", summary: "Payer enrollment, applications, documentation collection, application tracking, and payer follow-up." },
];

export const painPoints = [
  "Unpaid claims",
  "Denials",
  "Eligibility issues",
  "Missing information",
  "Aging accounts receivable",
  "Repeated payer follow-ups",
];

export const revenueCycleSteps = [
  "Patient Registration",
  "Insurance Verification",
  "Patient Encounter",
  "Clinical Documentation",
  "Medical Coding",
  "Charge Entry",
  "Claim Creation",
  "Claim Submission",
  "Payer Processing",
  "Payment or Denial",
  "Payment Posting",
  "Accounts Receivable Follow-Up",
  "Patient Balance Management",
];

export const processSteps = [
  { title: "Understand your practice", text: "We learn your specialty, current billing workflow, payer mix, software, provider count, claim volume, and billing challenges." },
  { title: "Build the right workflow", text: "We establish a process for claims, documentation, eligibility, payments, denials, and follow-ups based on your needs." },
  { title: "Manage the billing process", text: "Our team supports the billing responsibilities in your service agreement, helping claims move through the reimbursement cycle." },
  { title: "Keep you informed", text: "When documentation, insurance information, or provider action is required, clear communication prevents unnecessary delays." },
];

export const reasons = [
  { title: "Consistent follow-up", text: "Outstanding claims need ongoing attention. We keep claims that need follow-up visible and actionable." },
  { title: "Clear communication", text: "Your team always knows when additional information or action is required." },
  { title: "Organized workflows", text: "A structured process makes it easier to see where claims are delayed and what happens next." },
  { title: "Practice-focused support", text: "Workflows that reflect your specialty, provider structure, payer mix, and operational needs." },
  { title: "Revenue cycle visibility", text: "Know what's happening with submitted, pending, denied, and unpaid claims." },
  { title: "Flexible support", text: "Full-service medical billing or targeted help with specific parts of your revenue cycle." },
];

export const specialtyPills = [
  "Primary Care",
  "Family Medicine",
  "Internal Medicine",
  "Behavioral Health",
  "Mental Health",
  "Psychiatry",
  "Psychology",
  "Therapy Practices",
  "Physical Therapy",
  "Chiropractic",
  "Urgent Care",
  "Outpatient Clinics",
  "Specialty Practices",
  "Independent Physicians",
  "Multi-Provider Practices",
];

export const selfCheckQuestions = [
  "Are claims sitting unpaid for longer than expected?",
  "Is your staff spending too much time calling insurance companies?",
  "Are denied claims not being reviewed consistently?",
  "Are eligibility issues creating avoidable billing problems?",
  "Is your accounts receivable continuing to age?",
  "Are billing responsibilities taking your staff away from patients?",
  "Do you have limited visibility into the status of outstanding claims?",
];

/* ---------------- Services page ---------------- */

export const billingServices = [
  { title: "Patient Information Review", text: "We review available demographics and insurance information to identify missing or inconsistent data that may affect billing." },
  { title: "Insurance Verification", text: "We help verify available eligibility and benefit information before services whenever possible." },
  { title: "Charge Entry", text: "Charges are entered based on information provided by the practice and the agreed billing workflow." },
  { title: "Claim Preparation", text: "Claims are prepared using available patient, provider, coding, and insurance information." },
  { title: "Claim Submission", text: "Claims are submitted to the appropriate payer according to the established billing process." },
  { title: "Claim Status Monitoring", text: "We track whether claims are accepted, processed, paid, rejected, denied, or need additional action." },
  { title: "Rejection Management", text: "Claims rejected before adjudication may need corrections before they can be successfully resubmitted." },
  { title: "Denial Management", text: "Denied claims are reviewed to decide whether correction, resubmission, documentation, or an appeal is appropriate." },
  { title: "Payment Posting", text: "Insurance and patient payments are posted to maintain accurate account balances." },
  { title: "Accounts Receivable Follow-Up", text: "Outstanding claims are followed up based on status, payer response, age, and required action." },
  { title: "Reporting & Communication", text: "Clear communication on unresolved billing issues and items needing provider or staff attention." },
];

export const rcmSteps = [
  { title: "Patient Registration", text: "Accurate demographic and insurance information creates the foundation for billing." },
  { title: "Insurance Verification", text: "Eligibility and available benefit information reviewed whenever possible before services." },
  { title: "Documentation", text: "Provider documentation supports accurate coding and billing." },
  { title: "Medical Coding", text: "Services represented using the appropriate billing codes based on available documentation." },
  { title: "Charge Entry", text: "Charges entered into the billing system for claim preparation." },
  { title: "Claim Submission", text: "Claims sent to the appropriate insurance payer." },
  { title: "Payer Processing", text: "Payers review claims against eligibility, coverage, coding, contracts, documentation, and policy." },
  { title: "Denial Management", text: "Denied claims reviewed and corrected, supplemented, resubmitted, or appealed.", alert: true },
  { title: "Payment Posting", text: "Payments and adjustments recorded against the patient's account." },
  { title: "Accounts Receivable Follow-Up", text: "Unpaid and partially paid claims get ongoing review." },
  { title: "Patient Balances", text: "Remaining patient responsibility communicated and managed when applicable." },
  { title: "Reporting", text: "Reports that show claim activity, outstanding balances, denials, and payment trends." },
];

export const denialSteps = [
  { title: "Identify", text: "Review the payer response and denial reason." },
  { title: "Categorize", text: "Organize by payer, provider, service, denial type, or other factors." },
  { title: "Investigate", text: "Determine what information, documentation, correction, or payer requirement is involved." },
  { title: "Correct", text: "Make appropriate corrections supported by documentation and billing information." },
  { title: "Resubmit or Appeal", text: "Use the appropriate payer process when available and appropriate." },
  { title: "Track", text: "Monitor until resolution, or until no further action is appropriate." },
];

export const denialReasons = [
  "Inactive insurance coverage",
  "Eligibility issues",
  "Missing authorization",
  "Referral requirements",
  "Coding issues",
  "Missing modifiers",
  "Missing information",
  "Duplicate claims",
  "Provider enrollment issues",
  "Timely filing",
  "Medical necessity",
  "Documentation requirements",
  "Coverage limitations",
  "Coordination of benefits",
];

export const verificationItems = [
  "Active coverage",
  "Plan information",
  "Coverage effective dates",
  "Copay",
  "Coinsurance",
  "Deductible information",
  "Remaining deductible",
  "Referral requirements",
  "Authorization requirements",
  "Network information",
  "Available benefit information",
  "Coverage limitations",
];

export const arServices = [
  "Aging report review",
  "Claim status checks",
  "Insurance follow-up",
  "Payer communication",
  "Denial follow-up",
  "Rejection review",
  "Missing information identification",
  "Corrected claim submission",
  "Documentation requests",
  "Underpayment review where applicable",
  "Appeals where appropriate",
  "Escalation of unresolved claims",
  "Account notes and status updates",
];

export const arBuckets = [
  { range: "0–30", height: 30, bg: "#37D3C1", fg: "#0B1F3A", text: "Recently billed claims that may still be within the normal payer processing period." },
  { range: "31–60", height: 45, bg: "#22AFC0", fg: "#0B1F3A", text: "Claims that may require additional review or payer follow-up." },
  { range: "61–90", height: 62, bg: "#1C86B0", fg: "#0B1F3A", text: "Outstanding claims should be investigated to determine the reason for delay." },
  { range: "91–120", height: 80, bg: "#1B5C8C", fg: "#F2F6FA", text: "Older claims may require more aggressive follow-up and careful review of payer deadlines." },
  { range: "120+", height: 100, bg: "#FF8A66", fg: "#0B1F3A", text: "Long-standing claims may face additional challenges, including filing limits, appeal deadlines, missing documentation, or unresolved payer issues." },
];

export const credentialingItems = [
  "Provider information collection",
  "Payer application coordination",
  "CAQH profile support",
  "Commercial payer enrollment",
  "Medicare enrollment support",
  "Medicaid enrollment where applicable",
  "Document collection",
  "Application tracking",
  "Re-attestation reminders",
  "Provider demographic updates",
  "Payer follow-up",
  "Credentialing status tracking",
];

/* ---------------- Specialties ---------------- */

export const specialties = [
  { name: "Primary Care", text: "Primary care practices often manage a wide range of services, insurance plans, preventive care requirements, chronic care visits, and follow-up services. Organized billing and eligibility verification can help reduce avoidable administrative issues.", tags: ["Preventive care", "Chronic care visits", "Eligibility"] },
  { name: "Family Medicine", text: "Family medicine providers may treat patients across multiple age groups and service categories. Consistent claim preparation, coding support, insurance follow-up, and AR management are important to maintaining an organized revenue cycle.", tags: ["Claim preparation", "Coding support", "AR management"] },
  { name: "Internal Medicine", text: "Internal medicine practices may manage complex patient care involving chronic conditions, recurring visits, diagnostic services, and multiple payer requirements.", tags: ["Recurring visits", "Diagnostic services", "Multiple payers"] },
  { name: "Behavioral Health", text: "Behavioral health billing can involve authorization requirements, visit limitations, provider credentialing, payer-specific rules, and detailed documentation requirements.", tags: ["Authorizations", "Credentialing", "Documentation"] },
  { name: "Mental Health", text: "Mental health practices may experience challenges involving eligibility, network participation, session limits, authorization, and payer policies.", tags: ["Network participation", "Session limits", "Authorization"] },
  { name: "Psychiatry", text: "Psychiatric billing may involve evaluation and management services, psychotherapy services, medication management, and payer-specific billing requirements.", tags: ["E/M services", "Psychotherapy", "Medication management"] },
  { name: "Psychology", text: "Psychology practices often need reliable eligibility verification, claim submission, denial management, and payer follow-up.", tags: ["Eligibility", "Denial management", "Payer follow-up"] },
  { name: "Therapy Practices", text: "Therapy practices may manage recurring patient visits and frequent claim submissions, making consistent billing workflows particularly important.", tags: ["Recurring visits", "Frequent claims", "Consistency"] },
  { name: "Physical Therapy", text: "Physical therapy billing may involve authorization requirements, plan-of-care documentation, visit limitations, modifiers, and recurring treatment claims.", tags: ["Plan of care", "Modifiers", "Visit limits"] },
  { name: "Chiropractic", text: "Chiropractic practices may face payer-specific coverage rules, visit limitations, documentation requirements, and medical necessity reviews.", tags: ["Coverage rules", "Medical necessity", "Documentation"] },
  { name: "Urgent Care", text: "Urgent care centers often manage high patient volume, varying insurance plans, rapid registration, and a large number of individual claims.", tags: ["High volume", "Rapid registration", "Varied plans"] },
  { name: "Outpatient Clinics", text: "Outpatient clinics may require structured workflows across multiple providers, services, and payer types.", tags: ["Multi-provider", "Structured workflows", "Payer types"] },
  { name: "Specialty Practices", text: "Specialty practices often have unique coding, documentation, authorization, and payer requirements.", tags: ["Unique coding", "Authorization", "Payer rules"] },
];

/* ---------------- About ---------------- */

export const principles = [
  { title: "Consistency", text: "Medical billing requires ongoing attention. Claims should be reviewed, monitored, and followed through the appropriate process.", tone: "ink" as const },
  { title: "Communication", text: "Billing problems are easier to resolve when everyone knows what information or action is required.", tone: "teal" as const },
  { title: "Organization", text: "Structured workflows help practices identify bottlenecks and outstanding issues.", tone: "white" as const },
  { title: "Accountability", text: "Every unresolved claim should have a clear status and next action whenever possible.", tone: "blue" as const },
];

/* ---------------- FAQ ---------------- */

export type FaqCategory = "general" | "services" | "guarantees" | "start";

export const faqCategories: { id: FaqCategory | "all"; label: string }[] = [
  { id: "all", label: "All questions" },
  { id: "general", label: "General" },
  { id: "services", label: "Services" },
  { id: "guarantees", label: "Guarantees" },
  { id: "start", label: "Getting started" },
];

export const faqs: { c: FaqCategory; q: string; a: string[] }[] = [
  { c: "general", q: "What does a medical billing company do?", a: ["A medical billing company helps healthcare providers manage the administrative process involved in submitting claims and collecting payment for medical services.", "Services may include insurance verification, claim preparation, claim submission, denial management, payment posting, payer follow-up, and accounts receivable management."] },
  { c: "services", q: "Can Steady Claims Billing handle our entire billing process?", a: ["Depending on your practice requirements, we can discuss full-service medical billing as well as support for individual parts of the revenue cycle.", "The exact responsibilities are defined during onboarding and documented in the service agreement."] },
  { c: "start", q: "Can you work with our existing EHR or practice management software?", a: ["System compatibility depends on the software used by your practice and the level of access available.", "We can discuss your existing systems during the consultation process."] },
  { c: "general", q: "Do you work with small medical practices?", a: ["Yes. We can discuss billing support for independent providers, small practices, and growing healthcare organizations."] },
  { c: "general", q: "What specialties do you support?", a: ["We can discuss billing needs across a range of specialties including primary care, family medicine, behavioral health, mental health, physical therapy, chiropractic, urgent care, and other outpatient medical practices.", "Contact our team to confirm whether our services are a fit for your specialty."] },
  { c: "services", q: "Can you work old accounts receivable?", a: ["AR follow-up may be available for older claims.", "The ability to resolve older balances depends on factors such as claim age, payer filing deadlines, appeal deadlines, available documentation, previous billing activity, and payer requirements."] },
  { c: "guarantees", q: "Can you guarantee that an insurance company will pay a claim?", a: ["No. Insurance companies make reimbursement decisions based on eligibility, coverage, medical necessity, documentation, coding, authorization, contracts, timely filing requirements, and payer policies.", "No medical billing company can guarantee payment on every claim."] },
  { c: "guarantees", q: "Can you guarantee that a denied claim will be paid?", a: ["No. Some denials can be corrected or appealed, while others may not be recoverable.", "Our role is to help identify the reason for denial and determine what action may be appropriate."] },
  { c: "services", q: "Do you provide insurance verification?", a: ["Yes, insurance verification can be included in the billing workflow depending on the services selected."] },
  { c: "guarantees", q: "Does insurance verification guarantee payment?", a: ["No. Verification reflects the information available from the payer at the time of verification and does not guarantee final reimbursement."] },
  { c: "services", q: "Do you provide medical coding support?", a: ["Coding support may be available based on the needs of the practice and the agreed scope of services.", "Coding must always be supported by the provider's documentation."] },
  { c: "services", q: "Do you offer provider credentialing?", a: ["Yes. Credentialing support may include application coordination, document collection, CAQH support, payer follow-up, application tracking, and enrollment assistance."] },
  { c: "services", q: "How long does credentialing take?", a: ["Credentialing timelines vary significantly by insurance payer. Some applications may be completed relatively quickly while others may take several months.", "Approval timelines are controlled by the payer."] },
  { c: "start", q: "Can you take over billing from another company?", a: ["Yes, depending on the circumstances.", "A billing transition may involve reviewing outstanding accounts receivable, claim history, payer information, system access, existing workflows, and unresolved billing issues."] },
  { c: "start", q: "How do we get started?", a: ["The process generally begins with a consultation.", "We learn about your practice, identify the billing services you need, review your existing process, determine system access requirements, complete onboarding, and establish the agreed billing workflow."] },
  { c: "general", q: "Where is Steady Claims Billing located?", a: ["Steady Claims Billing is located at 4905 Sunfalls Dr, Katy, Texas 77493."] },
  { c: "general", q: "How can I contact Steady Claims Billing?", a: ["Call us at +1 (702) 415-1750, or send a consultation request through our contact page."] },
];

/* ---------------- Contact ---------------- */

export const serviceOptions = [
  "Full-Service Medical Billing",
  "Revenue Cycle Management",
  "Denial Management",
  "Accounts Receivable Follow-Up",
  "Insurance Verification",
  "Medical Coding Support",
  "Credentialing",
  "Other",
];

export const billingMethods = ["In-House Billing", "Another Billing Company", "Hybrid", "New Practice", "Other"];

export const billingChallenges = [
  "Too Many Denials",
  "Slow Insurance Payments",
  "Aging Accounts Receivable",
  "Staff Workload",
  "Billing Accuracy",
  "Eligibility Problems",
  "Credentialing",
  "Starting a New Practice",
  "Need Full Billing Outsourcing",
  "Other",
];

export const contactMethods = ["Phone", "Email", "Either"];

/* ---------------- Home: key numbers (supplied by Steady Claims Billing) ---------------- */

export type Stat = {
  /** Numbers to count up to; two values render as a range (e.g. 2.5–5). */
  values: number[];
  /** Decimal places per value (defaults to 0). */
  decimals?: number[];
  prefix?: string;
  suffix: string;
  title: string;
  text: string;
};

export const homeStats: Stat[] = [
  { values: [2.5, 5], decimals: [1, 0], suffix: "%", title: "Pricing · as low as", text: "Pay as low as 2.50% to 5.00% of the collected amount." },
  { values: [24], suffix: "hrs", title: "Submission speed", text: "All claims submitted within 24 hours." },
  { values: [98], suffix: "%", title: "Acceptance", text: "98% claims acceptance rate." },
  { values: [100], suffix: "%", title: "Follow-up", text: "100% claims follow-up for the fastest receivables." },
];
