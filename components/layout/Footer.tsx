import Link from "next/link";
import { site } from "@/lib/site";
import { LogoMark } from "./Logo";

const serviceLinks = [
  { href: "/services#billing", label: "Medical Billing" },
  { href: "/services#rcm", label: "Revenue Cycle Management" },
  { href: "/services#denials", label: "Denial Management" },
  { href: "/services#ar", label: "Accounts Receivable Follow-Up" },
  { href: "/services#verification", label: "Insurance Verification" },
  { href: "/services#coding", label: "Medical Coding Support" },
  { href: "/services#credentialing", label: "Credentialing" },
];

const companyLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/specialties", label: "Specialties" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
  { href: "/contact", label: "Request a Consultation" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

const linkClass = "text-[15px] leading-[2.1] text-on-dark-2 transition-colors duration-300 hover:text-teal";

export function Footer() {
  return (
    <footer className="bg-ink-3 text-paper">
      <div className="container-x flex flex-col gap-14 pb-9 pt-[72px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <LogoMark />
              <span className="font-display text-[21px] font-bold tracking-[-0.02em]">{site.name}</span>
            </div>
            <p className="max-w-[300px] text-[15px] leading-relaxed text-on-dark-2">{site.tagline}</p>
          </div>
          <div className="flex flex-col">
            <p className="mb-3.5 font-mono text-xs tracking-[0.16em] text-teal">SERVICES</p>
            {serviceLinks.map((l) => (
              <Link key={l.label} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col">
            <p className="mb-3.5 font-mono text-xs tracking-[0.16em] text-teal">COMPANY</p>
            {companyLinks.map((l) => (
              <Link key={l.label} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3.5">
            <p className="font-mono text-xs tracking-[0.16em] text-teal">CONTACT</p>
            <a href={site.phoneHref} className="font-display text-2xl font-semibold transition-colors hover:text-teal">
              {site.phone}
            </a>
            <address className="text-[15px] not-italic leading-relaxed text-on-dark-2">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.zip}
              <br />
              {site.address.country}
            </address>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-paper/10 pt-7">
          <p className="max-w-[900px] text-[13px] leading-relaxed text-on-dark-3">{site.disclaimer}</p>
          <p className="font-mono text-xs text-on-dark-3">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
