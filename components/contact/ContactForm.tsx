"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useRef, useState, type FormEvent, type InputHTMLAttributes } from "react";
import { billingChallenges, billingMethods, contactMethods, serviceOptions } from "@/lib/content";
import { site } from "@/lib/site";
import { EASE } from "../motion/Reveal";
import { Icon } from "../ui/Icon";
import { useLenis } from "../providers/SmoothScroll";

type Mode = "quick" | "full";

function Field({ label, id, ...props }: { label: string; id: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-semibold text-body">
        {label}
        {props.required && <span className="text-coral"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        {...props}
        className="min-h-[52px] w-full rounded-[14px] border-[1.5px] border-line-2 bg-white px-4 text-base text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[#9AA7B8] focus:border-ink focus:shadow-[0_0_0_4px_rgba(55,211,193,.45)]"
      />
    </div>
  );
}

function Chips({
  label,
  options,
  selected,
  onToggle,
  hint,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  hint?: string;
}) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-[13px] font-semibold text-body">
        {label} {hint && <span className="font-normal text-subtle">— {hint}</span>}
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
              animate={{
                backgroundColor: on ? "#0B1F3A" : "#FFFFFF",
                color: on ? "#37D3C1" : "#243244",
                borderColor: on ? "#0B1F3A" : "#D2DCE7",
              }}
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

export function ContactForm() {
  const cardRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const [mode, setMode] = useState<Mode>("full");
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [services, setServices] = useState<string[]>([]);
  const [method, setMethod] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<string | null>(null);
  const [contact, setContact] = useState<string | null>(null);

  const toggleMulti = (v: string) => setServices((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));
  const single = (cur: string | null, set: (v: string | null) => void) => (v: string) => set(cur === v ? null : v);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const data = {
      formType: mode,
      ...Object.fromEntries(new FormData(e.currentTarget).entries()),
      services,
      ...(mode === "full" ? { billingMethod: method, mainChallenge: challenge, preferredContact: contact } : {}),
      page: window.location.href,
    };

    setStatus("sending");
    try {
      if (!site.formEndpoint) throw new Error("Form endpoint is not configured");
      // text/plain keeps this a "simple" request, so the browser skips the CORS preflight Apps Script can't answer.
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
      });
      const out = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !out?.ok) throw new Error("Submission was not accepted");
    } catch (err) {
      console.error(err);
      setStatus("error");
      return;
    }

    setStatus("idle");
    setSent(true);
    // Bring the confirmation into view, since the card gets much shorter.
    requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { offset: -120 });
      else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
    });
  }

  const isQuick = mode === "quick";

  return (
    <div ref={cardRef} className="relative w-full min-w-0 rounded-[32px] border border-line bg-white p-[clamp(22px,3.4vw,48px)] shadow-[0_40px_80px_-40px_rgba(11,31,58,.25)]">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            className="flex flex-col items-start gap-[22px] py-10"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
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
            <h2 className="h-section text-[clamp(34px,4vw,52px)]">Request received.</h2>
            <p className="max-w-[560px] text-lg leading-relaxed text-muted">
              Thanks for telling us about your practice. Our billing team will reach out using your preferred contact
              method. Need us sooner? Call {site.phone}.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setServices([]);
                setMethod(null);
                setChallenge(null);
                setContact(null);
              }}
              className="inline-flex min-h-[52px] items-center rounded-full bg-ink px-6 text-[15px] font-semibold text-paper transition-colors hover:bg-ink-hover"
            >
              Send another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            className="flex flex-col gap-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Honeypot: hidden from people, often filled in by spam bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div role="tablist" aria-label="Form type" className="flex gap-1.5 rounded-full bg-paper p-1.5">
              {(
                [
                  ["quick", "Quick question"],
                  ["full", "Full billing consultation"],
                ] as const
              ).map(([m, label]) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => setMode(m)}
                  className={`relative min-h-[52px] min-w-0 flex-1 rounded-full px-3 py-2 text-[15px] font-semibold leading-tight transition-colors duration-300 ${
                    mode === m ? "text-teal" : "text-muted hover:text-ink"
                  }`}
                >
                  {mode === m && (
                    <motion.span
                      layoutId="form-tab"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex flex-col gap-2"
              >
                <h2 className="font-display text-[clamp(28px,2.8vw,38px)] font-bold leading-[1.05] tracking-[-0.02em]">
                  {isQuick ? "Talk to our medical billing team" : "Request my billing consultation"}
                </h2>
                <p className="text-[15.5px] leading-normal text-muted">
                  {isQuick
                    ? "A few details and we'll get back to you."
                    : "Every practice has different billing needs. Tell us about your current process and where you need support."}
                </p>
              </motion.div>
            </AnimatePresence>

            <LayoutGroup>
              <AnimatePresence mode="wait" initial={false}>
                {isQuick ? (
                  <motion.div
                    key="quick"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[18px] p-1">
                      <Field id="firstName" label="First name" autoComplete="given-name" required />
                      <Field id="lastName" label="Last name" autoComplete="family-name" required />
                      <Field id="practiceName" label="Practice name" />
                      <Field id="email" label="Work email" type="email" autoComplete="email" required />
                      <Field id="phone" label="Phone number" type="tel" autoComplete="tel" />
                      <Field id="specialty" label="Practice specialty" />
                      <Field id="providers" label="Number of providers" type="number" min={1} inputMode="numeric" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="full"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-7 p-1">
                      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[18px]">
                        <Field id="contactName" label="Contact name" autoComplete="name" required />
                        <Field id="email" label="Business email" type="email" autoComplete="email" required />
                        <Field id="phone" label="Phone number" type="tel" autoComplete="tel" />
                        <Field id="practiceName" label="Practice name" required />
                        <Field id="website" label="Practice website" type="url" placeholder="https://" />
                        <Field id="specialty" label="Practice specialty" />
                        <Field id="location" label="Practice location" />
                        <Field id="providers" label="Number of providers" type="number" min={1} inputMode="numeric" />
                        <Field id="claimVolume" label="Approx. monthly claim volume" />
                        <Field id="ehr" label="Current EHR or PM system" />
                      </div>
                      <Chips label="Current billing method" options={billingMethods} selected={method ? [method] : []} onToggle={single(method, setMethod)} />
                      <Chips label="Main billing challenge" options={billingChallenges} selected={challenge ? [challenge] : []} onToggle={single(challenge, setChallenge)} />
                      <Chips label="Preferred contact method" options={contactMethods} selected={contact ? [contact] : []} onToggle={single(contact, setContact)} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div layout transition={{ duration: 0.5, ease: EASE }} className="flex flex-col gap-7">
                <Chips
                  label="Services you're interested in"
                  hint="select all that apply"
                  options={serviceOptions}
                  selected={services}
                  onToggle={toggleMulti}
                />
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[13px] font-semibold text-body">
                    {isQuick ? "Tell us about your current billing situation" : "Additional information"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Claim volume, payers, what's getting stuck — no patient details, please."
                    className="w-full resize-y rounded-[14px] border-[1.5px] border-line-2 bg-white px-4 py-3.5 text-base leading-normal text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[#9AA7B8] focus:border-ink focus:shadow-[0_0_0_4px_rgba(55,211,193,.45)]"
                  />
                </div>
                <div className="flex flex-col gap-4 border-t border-line pt-6">
                  <AnimatePresence initial={false}>
                    {status === "error" && (
                      <motion.p
                        role="alert"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="rounded-[14px] border border-coral/40 bg-coral/10 px-4 py-3 text-[14.5px] leading-normal text-ink"
                      >
                        Sorry, your request didn&apos;t go through. Please try again, or call us at{" "}
                        <a href={site.phoneHref} className="font-semibold underline">
                          {site.phone}
                        </a>
                        .
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <div className="flex flex-wrap items-center justify-between gap-5">
                    <p className="max-w-[460px] text-[13px] leading-normal text-subtle">
                      Submitting this form does not establish a contractual client relationship. Please do not include
                      patient-specific protected health information.
                    </p>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      aria-busy={status === "sending"}
                      className="group inline-flex min-h-[58px] items-center justify-center gap-2.5 rounded-full bg-teal px-[30px] py-2.5 text-center text-base font-semibold leading-tight text-ink transition-[background-color,transform,opacity] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-teal-2 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {status === "sending" ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        <>
                          {isQuick ? "Request a Consultation" : "Request My Billing Consultation"}
                          <Icon name="arrow" size={18} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </LayoutGroup>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
