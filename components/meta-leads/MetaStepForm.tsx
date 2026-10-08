"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { billingChallenges, billingMethods, contactMethods, serviceOptions } from "@/lib/content";
import { site } from "@/lib/site";
import { trackPixel } from "@/components/analytics/MetaPixel";
import { EASE } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";

// ── Chip ─────────────────────────────────────────────────────────────────────

function Chip({ label, selected, onToggle }: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      whileTap={{ scale: 0.93 }}
      animate={{
        backgroundColor: selected ? "#0B1F3A" : "#FFFFFF",
        color: selected ? "#37D3C1" : "#243244",
        borderColor: selected ? "#0B1F3A" : "#D2DCE7",
      }}
      transition={{ duration: 0.2 }}
      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-[1.5px] px-4 text-[14px] font-medium"
    >
      <AnimatePresence initial={false}>
        {selected && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 14, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex overflow-hidden"
          >
            <Icon name="check" size={14} strokeWidth={3} />
          </motion.span>
        )}
      </AnimatePresence>
      {label}
    </motion.button>
  );
}

// ── Validation helpers ────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE   = /^https?:\/\/.+/i;

function validate(type: string, value: string, required?: boolean): string {
  if (required && value.trim() === "") return "This field is required.";
  if (!value) return "";
  if (type === "email" && !EMAIL_RE.test(value)) return "Enter a valid email address.";
  if (type === "url"   && !URL_RE.test(value))   return "URL must start with https://";
  if (type === "number" && !/^\d+$/.test(value)) return "Numbers only.";
  if (type === "tel"   && /[a-zA-Z]/.test(value)) return "Phone numbers cannot contain letters.";
  return "";
}

// ── Input field ───────────────────────────────────────────────────────────────

function InputField({
  label, id, type = "text", placeholder, autoComplete, value, onChange, required,
}: {
  label: React.ReactNode; id: string; type?: string; placeholder?: string;
  autoComplete?: string; value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [touched, setTouched] = useState(false);
  const error = touched ? validate(type, value, required) : "";
  const hasError = Boolean(error);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // Block Enter (no accidental submit)
    if (e.key === "Enter") { e.preventDefault(); return; }
    // Block alphabets on numeric/tel fields
    if (type === "number" && /[a-zA-Z]/.test(e.key) && !e.ctrlKey && !e.metaKey) { e.preventDefault(); return; }
    if (type === "tel" && /[a-zA-Z]/.test(e.key) && !e.ctrlKey && !e.metaKey) { e.preventDefault(); }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let v = e.target.value;
    // Strip non-numeric chars on number fields
    if (type === "number") v = v.replace(/[^\d]/g, "");
    // Strip letters on tel fields
    if (type === "tel")    v = v.replace(/[a-zA-Z]/g, "");
    onChange(v);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-semibold text-body">
        {label}{required && <span className="text-coral"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type === "number" ? "text" : type}
        inputMode={type === "number" ? "numeric" : type === "tel" ? "tel" : undefined}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        required={required}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        className={`min-h-[52px] w-full rounded-[14px] border-[1.5px] bg-white px-4 text-base text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[#9AA7B8] focus:shadow-[0_0_0_4px_rgba(55,211,193,.45)] ${
          hasError
            ? "border-coral focus:border-coral focus:shadow-[0_0_0_4px_rgba(255,138,102,.25)]"
            : "border-line-2 focus:border-ink"
        }`}
      />
      <AnimatePresence initial={false}>
        {hasError && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[12px] font-medium text-coral"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Slide variants ────────────────────────────────────────────────────────────

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
};

const TOTAL_STEPS = 5;

// ── Main component ────────────────────────────────────────────────────────────

export function MetaStepForm({
  formRef,
  extra,
  defaultClaimVolume,
  leadName = "meta-leads-audit-request",
  contactOnly = false,
}: {
  formRef?: React.RefObject<HTMLDivElement | null>;
  /** Extra fields sent with every submission (e.g. the revenue calculator's numbers). */
  extra?: Record<string, unknown>;
  /** Pre-fills "Monthly claim volume" until the visitor types their own. */
  defaultClaimVolume?: string;
  /** Meta Pixel Lead event content_name. */
  leadName?: string;
  /** Show only the first step (name, email, phone, specialty) and submit from there. */
  contactOnly?: boolean;
}) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  // Step 1
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [specialty, setSpecialty] = useState("");

  // Step 3
  const [billingMethod, setBillingMethod] = useState<string | null>(null);

  // Step 4
  const [challenge, setChallenge] = useState<string | null>(null);

  // Step 5
  const [services, setServices] = useState<string[]>([]);

  // Step 6
  const [claimVolumeInput, setClaimVolume] = useState<string | null>(null);
  const claimVolume = claimVolumeInput ?? defaultClaimVolume ?? "";
  const [ehr, setEhr] = useState("");
  const [contactMethod, setContactMethod] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const toggleSingle = (cur: string | null, set: (v: string | null) => void) => (v: string) =>
    set(cur === v ? null : v);
  const toggleMulti = (v: string) =>
    setServices((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  function scrollCenter() {
    formRef?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function submitPartial() {
    if (!site.formEndpoint || !email || !firstName) return;
    const data = {
      formType: "meta-lead",
      isPartial: true,
      firstName, lastName, email, phone, specialty,
      billingMethod, mainChallenge: challenge, services,
      claimVolume, ehr, preferredContact: contactMethod, message,
      page: typeof window !== "undefined" ? window.location.href : "",
      ...extra,
    };
    fetch(site.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    }).catch(() => {});
  }

  function go(next: number) {
    if (next > step) submitPartial();
    setDir(next > step ? 1 : -1);
    setStep(next);
    setTimeout(scrollCenter, 80);
  }

  async function submit() {
    if (status === "sending") return;

    const data = {
      formType: "meta-lead",
      isPartial: false,
      firstName, lastName, email, phone, specialty,
      billingMethod,
      mainChallenge: challenge,
      services,
      claimVolume, ehr, preferredContact: contactMethod, message,
      page: typeof window !== "undefined" ? window.location.href : "",
      ...extra,
    };

    setStatus("sending");
    try {
      if (!site.formEndpoint) throw new Error("No endpoint");
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
      });
      const out = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !out?.ok) throw new Error("Not accepted");
    } catch (err) {
      console.error(err);
      setStatus("error");
      return;
    }

    setStatus("idle");
    setSent(true);
    trackPixel("Lead", { content_name: leadName });
    setTimeout(scrollCenter, 80);
  }

  // ── Steps ─────────────────────────────────────────────────────────────────

  const steps = [
    {
      heading: "Let's start with your name.",
      sub: "We'll personalise your free billing audit.",
      canContinue: firstName.trim() !== "" && EMAIL_RE.test(email),
      content: (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <InputField id="firstName" label="First name" required value={firstName} onChange={setFirstName} autoComplete="given-name" />
            <InputField id="lastName" label="Last name" value={lastName} onChange={setLastName} autoComplete="family-name" />
          </div>
          <InputField id="email" label="Work email" type="email" required value={email} onChange={setEmail} autoComplete="email" placeholder="you@practice.com" />
          <div className="grid grid-cols-2 gap-3">
            <InputField id="phone" label="Phone number" type="tel" value={phone} onChange={setPhone} autoComplete="tel" placeholder="+1 (702) 000-0000" />
            <InputField id="specialty" label="Specialty" value={specialty} onChange={setSpecialty} placeholder="e.g. Ob/Gyn" />
          </div>
        </div>
      ),
    },
    {
      heading: "How are you currently billing?",
      sub: "Pick the option that best describes your setup.",
      canContinue: true,
      content: (
        <div className="flex flex-wrap gap-2.5">
          {billingMethods.map((o) => (
            <Chip key={o} label={o} selected={billingMethod === o} onToggle={() => toggleSingle(billingMethod, setBillingMethod)(o)} />
          ))}
        </div>
      ),
    },
    {
      heading: "What's your biggest billing challenge?",
      sub: "We'll focus your free audit on this area first.",
      canContinue: true,
      content: (
        <div className="flex flex-wrap gap-2.5">
          {billingChallenges.map((o) => (
            <Chip key={o} label={o} selected={challenge === o} onToggle={() => toggleSingle(challenge, setChallenge)(o)} />
          ))}
        </div>
      ),
    },
    {
      heading: "Which services interest you?",
      sub: "Select all that apply.",
      canContinue: true,
      content: (
        <div className="flex flex-wrap gap-2.5">
          {serviceOptions.map((o) => (
            <Chip key={o} label={o} selected={services.includes(o)} onToggle={() => toggleMulti(o)} />
          ))}
        </div>
      ),
    },
    {
      heading: "Almost done — a few last details.",
      sub: "Then we'll send your free audit request.",
      canContinue: true,
      isLast: true,
      content: (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <InputField id="claimVolume" label="Monthly claim volume" type="number" value={claimVolume} onChange={setClaimVolume} placeholder="e.g. 200" autoComplete="off" />
            <InputField id="ehr" label="Current EHR / PM system" value={ehr} onChange={setEhr} placeholder="e.g. Epic, Athena" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-semibold text-body">Preferred contact method</p>
            <div className="flex flex-wrap gap-2">
              {contactMethods.map((o) => (
                <Chip key={o} label={o} selected={contactMethod === o} onToggle={() => toggleSingle(contactMethod, setContactMethod)(o)} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-[13px] font-semibold text-body">Additional notes <span className="font-normal text-subtle">(optional)</span></label>
            <textarea
              id="message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Claim volume, payers, what's getting stuck — no patient details."
              className="w-full resize-none rounded-[14px] border-[1.5px] border-line-2 bg-white px-4 py-3 text-base leading-normal text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[#9AA7B8] focus:border-ink focus:shadow-[0_0_0_4px_rgba(55,211,193,.45)]"
            />
          </div>
        </div>
      ),
    },
  ];

  const visibleSteps = contactOnly ? [{ ...steps[0], isLast: true }] : steps;
  const totalSteps = contactOnly ? 1 : TOTAL_STEPS;
  const current = visibleSteps[Math.min(step, visibleSteps.length - 1)];
  const progress = ((step + 1) / totalSteps) * 100;

  // ── Success ───────────────────────────────────────────────────────────────

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex flex-col items-center gap-5 py-6 text-center"
      >
        <motion.span
          className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-teal"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <motion.path d="M20 6L9 17l-5-5" stroke="#0B1F3A" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.35, ease: EASE }} />
          </svg>
        </motion.span>
        <div>
          <h2 className="font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.03em] text-ink">
            Audit request received!
          </h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
            Our billing team will reach out via your preferred method. Need us sooner?{" "}
            <a href={site.phoneHref} className="font-semibold text-ink underline underline-offset-2">{site.phone}</a>
          </p>
        </div>
        <button
          type="button"
          onClick={() => { setSent(false); setStep(0); setDir(1); }}
          className="rounded-full border border-line px-6 py-2.5 text-[14px] font-semibold text-muted transition-colors hover:border-ink hover:text-ink"
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  // ── Wizard ────────────────────────────────────────────────────────────────

  return (
    // Use a div, NOT a form — prevents any accidental Enter-to-submit behaviour
    <div className="flex flex-col gap-5">
      {/* Honeypot hidden off-screen */}
      <input name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden opacity-0" />

      {/* Progress bar (not needed when there's only one step) */}
      <div className={contactOnly ? "hidden" : "flex flex-col gap-2"}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-[0.14em] text-subtle">
            STEP {step + 1} / {totalSteps}
          </span>
          {step > 0 && (
            <button type="button" onClick={() => go(step - 1)}
              className="font-mono text-[11px] tracking-[0.14em] text-subtle transition-colors hover:text-ink">
              ← BACK
            </button>
          )}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
          <motion.div className="h-full rounded-full bg-teal"
            animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: EASE }} />
        </div>
      </div>

      {/* Animated step content */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div key={step} custom={dir} variants={slide}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.32, ease: EASE }}
            className="flex flex-col gap-5"
          >
            <div>
              <h2 className="font-display text-[clamp(20px,2.2vw,26px)] font-bold leading-tight tracking-[-0.025em] text-ink">
                {current.heading}
              </h2>
              <p className="mt-1 text-[13.5px] text-muted">{current.sub}</p>
            </div>
            {current.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Error banner */}
      <AnimatePresence initial={false}>
        {status === "error" && (
          <motion.p role="alert"
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="rounded-[14px] border border-coral/40 bg-coral/10 px-4 py-3 text-[13.5px] leading-normal text-ink"
          >
            Submission failed. Please try again or call{" "}
            <a href={site.phoneHref} className="font-semibold underline">{site.phone}</a>.
          </motion.p>
        )}
      </AnimatePresence>

      {/* CTA — clearly separated from chip content by top border */}
      <div className="border-t border-line pt-4 flex flex-col gap-3">
        {(current as { isLast?: boolean }).isLast ? (
          <button
            type="button"
            onClick={submit}
            disabled={status === "sending" || !current.canContinue}
            aria-busy={status === "sending"}
            className={`group inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-full bg-teal px-8 text-base font-semibold text-ink transition-[background-color,transform,opacity] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-teal-2 ${status === "sending" ? "cursor-wait opacity-70" : "disabled:pointer-events-none disabled:opacity-40"}`}
          >
            {status === "sending" ? (
              <><span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" aria-hidden="true" />Sending…</>
            ) : (
              <>Request My Free Audit <Icon name="arrow" size={18} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" /></>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => go(step + 1)}
            disabled={!current.canContinue}
            className="group inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-full bg-ink px-8 text-base font-semibold text-paper transition-[background-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-ink-hover disabled:pointer-events-none disabled:opacity-40"
          >
            Continue <Icon name="arrow" size={18} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        )}

        <p className="text-center text-[12px] leading-relaxed text-subtle">
          No patient data. No hidden fees. No spam — ever.
        </p>
      </div>
    </div>
  );
}
