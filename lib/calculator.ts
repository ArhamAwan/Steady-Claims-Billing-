/**
 * Revenue calculator used on the /revenue-calculator lander.
 * Uses only Steady Claims Billing's own stated figures: a 98% claims acceptance rate
 * and a fee of 2.50%–5.00% of the collected amount. Everything else comes from the visitor.
 */

export const TARGET_ACCEPTANCE = 0.98;
export const FEE_LOW = 0.025;
export const FEE_HIGH = 0.05;

export type CalcInputs = {
  /** Monthly collections, $ */
  collections: number;
  /** Claims submitted per month */
  claims: number;
  /** Current denial rate, % (0–60) */
  denialRate: number;
  /** What billing costs today per month, $ */
  billingCost: number;
};

export const DEFAULT_INPUTS: CalcInputs = { collections: 120000, claims: 800, denialRate: 10, billingCost: 9000 };

export type CalcResult = {
  deniedClaims: number;
  /** Value of claims denied each month, $ */
  stuckMonthly: number;
  /** Extra revenue per month if acceptance matched 98%, $ */
  recoverableMonthly: number;
  feeLow: number;
  feeHigh: number;
  /** Current cost minus our fee, per month (positive = cheaper with us) */
  savingLow: number;
  savingHigh: number;
  upsideLow: number;
  upsideHigh: number;
};

export function calculate(i: CalcInputs): CalcResult {
  const d = Math.min(Math.max(i.denialRate, 0), 60) / 100;
  const claims = Math.max(i.claims, 0);
  const paid = Math.max(claims * (1 - d), 1);
  const avg = Math.max(i.collections, 0) / paid; // average payment per paid claim
  const deniedClaims = claims * d;
  const stuckMonthly = deniedClaims * avg;
  const recoverableMonthly = Math.max(0, claims * (d - (1 - TARGET_ACCEPTANCE))) * avg;
  const base = Math.max(i.collections, 0) + recoverableMonthly;
  const feeLow = base * FEE_LOW;
  const feeHigh = base * FEE_HIGH;
  const savingLow = i.billingCost - feeHigh;
  const savingHigh = i.billingCost - feeLow;
  return {
    deniedClaims,
    stuckMonthly,
    recoverableMonthly,
    feeLow,
    feeHigh,
    savingLow,
    savingHigh,
    upsideLow: (recoverableMonthly + savingLow) * 12,
    upsideHigh: (recoverableMonthly + savingHigh) * 12,
  };
}

export const money = (n: number) => {
  const r = Math.round(n / 10) * 10;
  return `${r < 0 ? "-" : ""}$${Math.abs(r).toLocaleString("en-US")}`;
};

/** One-line summary used for the headline and the form submission. */
export function headline(r: CalcResult) {
  if (r.upsideHigh <= 0) {
    return {
      label: "Your billing already looks efficient",
      low: r.stuckMonthly * 12,
      high: null as number | null,
      note: "That’s still the value of claims going to denial each year. A free audit shows where it goes.",
      text: `${money(r.stuckMonthly * 12)}/yr in denials`,
    };
  }
  const low = Math.max(0, r.upsideLow);
  return {
    label: "Estimated yearly upside with Steady Claims",
    low,
    high: r.upsideHigh as number | null,
    note: "More revenue paid the first time, plus the difference in billing cost.",
    text: low > 0 ? `${money(low)} – ${money(r.upsideHigh)} per year` : `Up to ${money(r.upsideHigh)} per year`,
  };
}
