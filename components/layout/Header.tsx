"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { Icon } from "../ui/Icon";
import { ButtonLink } from "../ui/Button";
import { EASE } from "../motion/Reveal";
import { useLenis } from "../providers/SmoothScroll";

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(!open && y > 240 && y > prev + 2);
    if (y < prev - 2) setHidden(false);
  });

  // Close the menu on navigation and lock scrolling while it's open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const isContact = pathname.startsWith("/contact");

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <div
        className={`transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled || open
            ? "border-b border-paper/10 bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className={`container-x flex items-center justify-between gap-5 transition-[padding] duration-500 ${
            scrolled ? "py-3.5" : "py-5"
          }`}
        >
          <Logo onClick={() => setOpen(false)} />

          <ul className="hidden items-center gap-[clamp(14px,2.2vw,32px)] nav-lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative block py-3 text-[15px] transition-colors duration-300 ${
                    isActive(item.href) ? "text-paper" : "text-on-dark hover:text-paper"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 bottom-1.5 h-[1.5px] rounded-full bg-teal"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 nav-lg:flex">
            {!isContact && (
              <a
                href={site.phoneHref}
                className="flex items-center gap-2 font-mono text-sm text-on-dark transition-colors hover:text-paper"
              >
                <Icon name="phone" size={17} />
                {site.phone}
              </a>
            )}
            {isContact ? (
              <ButtonLink href={site.phoneHref} className="min-h-[46px]">
                Call {site.phone}
              </ButtonLink>
            ) : (
              <ButtonLink href="/contact" className="min-h-[46px]">
                Request a Consultation
              </ButtonLink>
            )}
          </div>

          <button
            type="button"
            className="relative flex h-12 w-12 items-center justify-center rounded-2xl border-[1.5px] border-paper/30 text-paper nav-lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3.5 w-5">
              <motion.span
                className="absolute left-0 top-0 h-[2px] w-5 rounded bg-current"
                animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
              <motion.span
                className="absolute left-0 top-[6px] h-[2px] w-5 rounded bg-current"
                animate={{ opacity: open ? 0 : 1, scaleX: open ? 0.3 : 1 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="absolute left-0 top-3 h-[2px] w-5 rounded bg-current"
                animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
            </span>
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="absolute inset-x-0 top-full h-[calc(100dvh-76px)] overflow-y-auto bg-ink nav-lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            data-lenis-prevent
          >
            <motion.ul
              className="container-x flex flex-col pt-4"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
              }}
            >
              {nav.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                  className="border-b border-paper/10"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-5 font-display text-[28px] font-semibold tracking-[-0.02em] ${
                      isActive(item.href) ? "text-teal" : "text-paper"
                    }`}
                  >
                    {item.label}
                    <Icon name="arrow" size={22} className="opacity-50" />
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
                className="flex flex-col gap-3 py-8"
              >
                <ButtonLink href="/contact" arrow>
                  Request a Consultation
                </ButtonLink>
                <ButtonLink href={site.phoneHref} variant="ghost-dark">
                  Call {site.phone}
                </ButtonLink>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
