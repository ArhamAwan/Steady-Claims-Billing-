"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { billingChallenges, billingMethods, contactMethods, serviceOptions, specialties } from "@/lib/content";
import { money, type CalcInputs, type CalcResult } from "@/lib/calculator";
import { site } from "@/lib/site";
import { trackPixel } from "../analytics/MetaPixel";
import { EASE } from "../motion/Reveal";
import { Icon } from "../ui/Icon";

const STEPS = 5;

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
  practiceName: string;
  website: string;
  location: string;
  providers: string;
  claimVolume: string;
  ehr: string;
  message: string;
};

const EMPTY: Fields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  specialty: "",
  practiceName: "",
  website: "",
  location: "",
  providers: "",
  claimVolume: "",
  ehr: "",
  message: "",
};

const inputClass =
  "min-h-[54px] w-full rounded-[14px] border-[1.5px] border-line-2 bg-white px-4 text-base text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[#9AA7B8] focus:border-ink focus:shadow-[0_0_0_4px_rgba(55,211,193,.4)]";

function Field({
  id,
  label,
  required,
  value,
  onValue,
  className = "",
  ...rest
}: { id: string; label: string; value: string; onValue: (v: string) => void; className?: string } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "id"
>) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-[13.5px] font-semibold text-body">
        {label}
        {required && <span className="text-[#C2410C]"> *</span>}
      </label>
      <input id={id} name={id} value={value} onChange={(e) => onValue(e.target.value)} required={required} className={inputClass} {...rest} />
    </div>
  );
}

function Chips({
  legend,
  hint,
  options,
  selected,
  onToggle,
}: {
  legend: string;
  hint?: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-[13.5px] font-semibold text-body">
        {legend} {hint && <span className="font-normal text-subtle">— {hint}</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = selected.includes(o);
          return (
            <motion.button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(o)}
              whileTap={{ scale: 0.94 }}
              animate={{ backgroundColor: on ? "#0B1F3A" : "#FFFFFF", color: on ? "#37D3C1" : "#243244", borderColor: on ? "#0B1F3A" : "#D2DCE7" }}
              transition={{ duration: 0.25 }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] px-4 text-[14.5px] hover:!border-ink"
            >
              <AnimatePresence initial={false}>
                {on && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 14, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="flex overflow-hidden"
                  >
                    <Icon name="check" size={14} strokeWidth={3} />
                  </motion.span>
                )}
              </AnimatePresence>
              {o}
            </motion.button>
          );
        })}
      </div>
    </fieldset>
  );
}

function StepHead({ title, sub, id }: { title: string; sub: string; id?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 id={id} className="font-display text-[clamp(28px,2.8vw,40px)] font-bold leading-[1.05] tracking-[-0.02em]">
        {title}
      </h2>
      <p className="text-[15.5px] text-muted">{sub}</p>
    </div>
  );
}

const grid = "grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-[18px]";

export function AuditForm({ inputs, result, estimateText }: { inputs: CalcInputs; result: CalcResult; estimateText: string }) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [f, setF] = useState<Fields>(EMPTY);
  const [volTouched, setVolTouched] = useState(false);
  const [method, setMethod] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<string | null>(null);
  const [contact, setContact] = useState<string | null>(null);
  const [services, setServices] = useState<string[]>([]);
  const [err, setErr] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "sent">("idle");

  // Claim volume follows the calculator until the visitor edits it.
  const claimVolume = volTouched ? f.claimVolume : String(Math.round(inputs.claims));

  const set = (k: keyof Fields) => (v: string) => {
    setErr("");
    if (k === "claimVolume") setVolTouched(true);
    setF((p) => ({ ...p, [k]: v }));
  };
  const single = (cur: string | null, setter: (v: string | null) => void) => (v: string) => setter(cur === v ? null : v);

  function validate(): string {
    if (step === 1) {
      if (!f.firstName.trim()) return "Please add your first name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) return "Please add a valid work email.";
    }
    if (step === 2 && !f.practiceName.trim()) return "Please add your practice name.";
    return "";
  }

  function scrollToCard() {
    const el = cardRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.4) {
      window.scrollTo({ top: top + window.scrollY - 110, behavior: reduce ? "auto" : "smooth" });
    }
  }

  function go(n: number) {
    setDir(n > step ? 1 : -1);
    setStep(n);
    setErr("");
    requestAnimationFrame(scrollToCard);
  }

  async function submit() {
    setStatus("sending");
    const data = {
      formType: "full",
      source: "Revenue calculator lander",
      contactName: `${f.firstName.trim()} ${f.lastName.trim()}`.trim(),
      ...f,
      claimVolume,
      billingMethod: method,
      mainChallenge: challenge,
      preferredContact: contact,
      services,
      calcCollections: money(inputs.collections),
      calcClaims: Math.round(inputs.claims),
      calcDenialRate: `${inputs.denialRate}%`,
      calcBillingCost: money(inputs.billingCost),
      calcEstimate: estimateText,
      calcFee: `${money(result.feeLow)} – ${money(result.feeHigh)} per month`,
      page: window.location.href,
      company: (document.getElementById("audit-company") as HTMLInputElement | null)?.value ?? "",
    };
    try {
      if (!site.formEndpoint) throw new Error("Form endpoint is not configured");
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
      });
      const out = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !out?.ok) throw new Error("Submission was not accepted");
    } catch (e) {
      console.error(e);
      setStatus("error");
      return;
    }
    setStatus("sent");
    trackPixel("Lead", { content_name: "Revenue calculator audit" });
    requestAnimationFrame(scrollToCard);
  }

  function next() {
    const e = validate();
    if (e) {
      setErr(e);
      return;
    }
    if (step < STEPS) go(step + 1);
    else void submit();
  }

  function restart() {
    setF(EMPTY);
    setVolTouched(false);
    setMethod(null);
    setChallenge(null);
    setContact(null);
    setServices([]);
    setStatus("idle");
    setStep(1);
  }

  useEffect(() => {
    if (status === "error") setStatus("idle");
    // Clear a failed-send message as soon as the visitor changes anything.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [f, method, challenge, contact, services]);

  const steps: Record<number, ReactNode> = {
    1: (
      <>
        <StepHead id="audit-title" title="Let's start with your name." sub="We'll personalise your free billing audit." />
        <div className={grid}>
          <Field id="firstName" label="First name" required autoComplete="given-name" value={f.firstName} onValue={set("firstName")} />
          <Field id="lastName" label="Last name" autoComplete="family-name" value={f.lastName} onValue={set("lastName")} />
          <Field id="email" label="Work email" required type="email" autoComplete="email" value={f.email} onValue={set("email")} />
          <Field id="phone" label="Phone number" type="tel" autoComplete="tel" value={f.phone} onValue={set("phone")} />
          <div className="relative col-span-full flex flex-col gap-2">
            <label htmlFor="specialty" className="text-[13.5px] font-semibold text-body">
              Specialty
            </label>
            <select
              id="specialty"
              name="specialty"
              value={f.specialty}
              onChange={(e) => set("specialty")(e.target.value)}
              className={`${inputClass} cursor-pointer appearance-none pr-11`}
            >
              <option value="">Select your specialty</option>
              {specialties.map((s) => (
                <option key={s.name}>{s.name}</option>
              ))}
              <option>Other</option>
            </select>
            <Icon name="chevron" size={14} className="pointer-events-none absolute bottom-5 right-4 text-ink" />
          </div>
        </div>
      </>
    ),
    2: (
      <>
        <StepHead title="Tell us about your practice." sub="So we can compare you with practices like yours." />
        <div className={grid}>
          <Field id="practiceName" label="Practice name" required autoComplete="organization" value={f.practiceName} onValue={set("practiceName")} />
          <Field id="website" label="Practice website" type="url" placeholder="https://" value={f.website} onValue={set("website")} />
          <Field id="location" label="Practice location" placeholder="City, State" value={f.location} onValue={set("location")} />
          <Field id="providers" label="Number of providers" type="number" min={1} inputMode="numeric" value={f.providers} onValue={set("providers")} />
        </div>
      </>
    ),
    3: (
      <>
        <StepHead title="How is billing handled today?" sub="We've filled in your claim volume from the calculator." />
        <div className={grid}>
          <Field id="claimVolume" label="Approx. monthly claim volume" value={claimVolume} onValue={set("claimVolume")} />
          <Field id="ehr" label="Current EHR or PM system" placeholder="e.g. athenahealth, eClinicalWorks" value={f.ehr} onValue={set("ehr")} />
        </div>
        <Chips legend="Current billing method" options={billingMethods} selected={method ? [method] : []} onToggle={single(method, setMethod)} />
      </>
    ),
    4: (
      <>
        <StepHead title="Where do you need the most help?" sub="Pick your biggest challenge, and any services you're interested in." />
        <Chips legend="Main billing challenge" options={billingChallenges} selected={challenge ? [challenge] : []} onToggle={single(challenge, setChallenge)} />
        <Chips
          legend="Services you're interested in"
          hint="select all that apply"
          options={serviceOptions}
          selected={services}
          onToggle={(v) => setServices((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]))}
        />
      </>
    ),
    5: (
      <>
        <StepHead title="Almost done. How should we reach you?" sub="Your calculator estimate is attached to this request." />
        <Chips legend="Preferred contact method" options={contactMethods} selected={contact ? [contact] : []} onToggle={single(contact, setContact)} />
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-[13.5px] font-semibold text-body">
            Anything else we should know?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={f.message}
            onChange={(e) => set("message")(e.target.value)}
            placeholder="Payers, what's getting stuck, deadlines. No patient details, please."
            className={`${inputClass} resize-y py-3.5 leading-normal`}
          />
        </div>
        <p className="text-[13px] leading-normal text-subtle">
          Submitting this form does not establish a contractual client relationship. Please do not include
          patient-specific protected health information.
        </p>
      </>
    ),
  };

  const contactWord = contact === "Phone" ? "phone" : contact === "Email" ? "email" : "phone or email";

  return (
    <div
      ref={cardRef}
      className="relative min-w-0 flex-[999_1_560px] rounded-[32px] border border-[#DDE5EE] bg-white p-[clamp(22px,3.4vw,46px)] shadow-[0_40px_80px_-40px_rgba(11,31,58,.25)]"
    >
      {/* Honeypot: hidden from people, often filled in by spam bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="audit-company">Company</label>
        <input id="audit-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            className="flex flex-col items-start gap-[22px] py-8"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <motion.span
              className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-teal"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <motion.path
                  d="M20 6L9 17l-5-5"
                  stroke="#0B1F3A"
                  strokeWidth={2.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
                />
              </svg>
            </motion.span>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-bold leading-none tracking-[-0.03em]">
              Request received{f.firstName.trim() ? `, ${f.firstName.trim()}` : ""}.
            </h2>
            <p className="max-w-[560px] text-lg leading-relaxed text-muted">
              Our billing team will review your numbers and get back to you by {contactWord}. Need us sooner? Call{" "}
              <a href={site.phoneHref} className="font-semibold text-blue">
                {site.phone}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-[52px] items-center rounded-full bg-ink px-6 text-[15px] font-semibold text-paper transition-colors hover:bg-ink-hover"
            >
              Start a new request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              next();
            }}
            className="flex flex-col gap-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[12.5px] tracking-[0.16em] text-blue">FREE BILLING AUDIT</span>
                <span className="font-mono text-[12.5px] tracking-[0.12em] text-muted" aria-live="polite">
                  STEP {step} / {STEPS}
                </span>
              </div>
              <div className="flex gap-1.5" aria-hidden="true">
                {Array.from({ length: STEPS }, (_, i) => (
                  <span key={i} className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[#E3EAF2]">
                    <motion.span
                      className={`absolute inset-y-0 left-0 rounded-full ${i + 1 === step ? "bg-ink" : "bg-teal"}`}
                      initial={false}
                      animate={{ width: i + 1 <= step ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className="overflow-hidden p-1">
              <AnimatePresence mode="wait" initial={false} custom={dir}>
                <motion.div
                  key={step}
                  custom={dir}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 36 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -36 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex flex-col gap-6"
                >
                  {steps[step]}
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence initial={false}>
              {(err || status === "error") && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="rounded-xl border border-[#FFC9B8] bg-[#FFF1EC] px-3.5 py-2.5 text-sm text-[#9A3412]"
                >
                  {err || (
                    <>
                      Sorry, your request didn&apos;t go through. Please try again, or call us at{" "}
                      <a href={site.phoneHref} className="font-semibold underline">
                        {site.phone}
                      </a>
                      .
                    </>
                  )}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E3EAF2] pt-[22px]">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => go(step - 1)}
                  className="group inline-flex min-h-[54px] items-center gap-2 rounded-full border-[1.5px] border-[#C9D5E2] px-6 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
                >
                  <Icon name="arrow" size={18} className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
                  Back
                </button>
              ) : (
                <span className="text-[13.5px] text-subtle">Takes about 2 minutes.</span>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                aria-busy={status === "sending"}
                className="group inline-flex min-h-[58px] items-center justify-center gap-2.5 rounded-full bg-teal px-[30px] text-base font-semibold text-ink transition-[background-color,transform,opacity] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-teal-2 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {status === "sending" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    {step < STEPS ? "Continue" : "Get my free billing audit"}
                    <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
