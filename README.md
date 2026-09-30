# Steady Claims Billing — Website

Marketing site for Steady Claims Billing (steadyclaimsbilling.com), built with **Next.js (App Router)**, **Tailwind CSS v4**, **Framer Motion**, and **Lenis** smooth scrolling.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

Requires Node.js 20+.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/services` | Medical billing services (anchors: `#billing`, `#rcm`, `#denials`, `#verification`, `#ar`, `#coding`, `#credentialing`) |
| `/specialties` | Specialty explorer |
| `/about` | About us |
| `/faq` | FAQ with category filters (also emits FAQPage structured data) |
| `/contact` | Contact + consultation form |
| `/privacy`, `/terms` | Placeholders; waiting on final legal copy |

## Where things live

- `lib/site.ts`: name, phone, address, nav, disclaimer
- `lib/content.ts`: all page copy (services, FAQs, specialties, form options). Edit text here.
- `app/globals.css`: design tokens (colors, fonts), set in the Tailwind `@theme` block
- `components/motion/`: reusable animation primitives
  - `Reveal` / `Stagger`: fade-up on scroll
  - `AnimatedHeading`: word-by-word masked heading reveal
  - `PulseLine`: the brand heartbeat line
- `components/providers/SmoothScroll.tsx`: Lenis smooth scrolling plus `MotionConfig`
- `lib/doctorScene.ts`: the 3D doctor (built from primitives, no model files) and its animation; `components/home/Doctor3D.tsx` mounts it

## Animations

- Page fade on navigation (`app/template.tsx`)
- Header hides on scroll down, shows on scroll up, and blurs its background once you scroll
- Mobile menu opens with a clip reveal and staggered links
- Home page:
  - Live 3D doctor in the hero (three.js). He waves, blinks and turns his head toward the cursor, and pauses when scrolled off screen. A static poster shows while it loads, for reduced motion, or when WebGL isn't available.
  - Floating "claims in motion" cards and hero parallax
  - The 13-stage revenue cycle lights up as you scroll
  - Animated self-check meter
- Services page:
  - Scroll-filled revenue cycle management timeline
  - Animated rejected-vs-denied claim flow
  - Clickable AR aging bars
- Specialties: explorer with crossfading details
- FAQ: accordion with height animation and filters
- Contact:
  - Form tabs with a sliding pill indicator
  - Animated selection chips and success state

All motion respects the visitor's **reduced-motion** setting: Framer Motion follows `prefers-reduced-motion`, and Lenis is turned off.

## Forms: not connected yet

`components/contact/ContactForm.tsx` validates the form, collects the fields into a `data` object, and shows the success state. It **does not send anything yet**. To connect it, replace the `TODO` in `onSubmit` with a call to your API route, email service, or CRM.

The form asks visitors not to submit protected health information, so keep patient data out of whatever backend you choose.

## Deploying

The site works on Vercel with zero config: import the repo and deploy. Every page is statically generated. Any Node host that can run `next start` also works.

Before launch, check that `site.url` in `lib/site.ts` is set to the live domain. It feeds the sitemap, robots.txt, and metadata.
