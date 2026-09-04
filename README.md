# thisyearnofear

A public portfolio of experimental AI, WebGL, and onchain products — a single immersive page with shareable project pages, smooth-scroll storytelling, and a 3D project gallery. Built with Next.js 16 (App Router), Three.js, GSAP, and Lenis.

## Stack

- **Next.js 16.2** (App Router, Turbopack) — `src/app`
- **Three.js** — fixed full-screen shader background (`WebGLBackground`) + 3D project gallery (`CurveGallery`)
- **GSAP + ScrollTrigger** — intro timeline, scroll reveals, parallax, marquee
- **Lenis** — smooth scrolling, driven by GSAP's ticker (wired in `Experience`)
- **TypeScript** throughout

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Project structure

```
src/
  app/
    layout.tsx                  # fonts (Space Grotesk / Fraunces / Geist Mono) + metadata
    page.tsx                    # home (Experience)
    opengraph-image.tsx         # site-level OG image
    globals.css                 # design tokens + all component styles
    work/[id]/
      page.tsx                  # per-project detail route
      ProjectPage.tsx           # client detail wrapper
  components/
    Experience.tsx              # top-level client orchestrator (preloader gate, composition)
    Preloader.tsx               # 0→100 counter that wipes into the hero
    CurveGallery.tsx            # 3D scroll-driven project gallery
    Cursor.tsx                  # custom magnetic cursor
    WebGLBackground.tsx
    DetailOverlay.tsx           # project detail UI
    heroIntro.ts                # shared registry so Experience can trigger the hero intro
    SmoothScrollProvider.tsx    # accent + pointer context shared with WebGL
    sections/                   # page sections, one file each
      Nav.tsx Hero.tsx Marquee.tsx Manifesto.tsx
      About.tsx Footer.tsx
    useScrollReveal.tsx         # useScrollReveal hook + <Reveal>/<Parallax> helpers
  data/
    projects.ts                 # ★ project list — edit to add/change projects
    details.ts                  # ★ project detail copy (what / highlights / uses / insight / note)
  lib/
    gsap.ts                     # registers ScrollTrigger once
    useIsomorphicLayoutEffect.ts
```

### Project detail pages

Each project gets a dedicated URL at `/work/[id]` with:

- A masked title reveal and one-line "what it is".
- An optional **"Our take"** paragraph for thought-leadership context.
- A **"Use it for"** list describing concrete jobs-to-be-done.
- **"Why it's fun"** highlights.
- A sticky meta panel (stack / tags / status).
- Clear CTAs: **Try it now**, **View source**, and **Share project** (copies the URL).
- A next-project link and a WebGL background that retints to the project's accent color.

Pages are rendered on demand with per-project metadata and OG images.

## 3D gallery

The homepage centerpiece is a scroll-driven WebGL gallery. Scroll to fly through project cards and click one to open its detail page. The gallery also includes:

- A visible **"Selected work"** heading.
- A hover tooltip with the project title.
- `aria-label` and a screen-reader-only project list for accessibility.
- `devicePixelRatio` recalculation on resize/zoom.

## Adding a project

Open `src/data/projects.ts` and append an object to the `projects` array:

```ts
{
  id: "my-project",
  title: "MY PROJECT",
  tagline: "One line that sells it.",
  description: "A paragraph of context.",
  year: "2026",
  role: "Role · Discipline",
  language: "TypeScript",
  tags: ["WebGL", "AI"],
  accent: "#ff4d2e",          // any CSS color; drives the card glow
  status: "live",             // "live" | "fork" | "archived"
  href: "https://…",          // live URL (falls back to repo)
  repo: "https://github.com/thisyearnofear/my-project",
}
```

Then add the detail copy in `src/data/details.ts`:

```ts
"my-project": {
  what: "A one-line description of what it is.",
  highlights: ["Why it's fun or clever."],
  uses: ["Concrete job it does"],           // optional
  insight: "A short take on why it exists.", // optional
  note: "Forked from …",                    // optional credit/origin
},
```

The gallery, detail pages, marquee, and metadata are all data-driven — no other file needs to change.

## Shareability & SEO

- Every project has a `/work/[id]` deep link with its own title, description, and OG image.
- The detail overlay includes a **Share project** button that copies the canonical URL to the clipboard.
- `layout.tsx` sets metadata and `metadataBase` for the domain.

## Community & contact

- The footer links to the GitHub org and a contact email.
- A **Get updates** email form pre-fills a `mailto:` message. (Swap in a newsletter provider to collect signups directly.)

## Git hooks

A Husky `pre-commit` runs on every commit:

1. **gitleaks** — scans staged changes for secrets (config: `.gitleaks.toml`, vendored baseline: `.gitleaks.base.toml`). Blocks the commit if a leak is found.
2. **lint-staged** — runs `eslint --fix` (and `tsc --noEmit`) on staged `*.{ts,tsx,js,jsx}` files.

The secret-scan config files (`.gitleaks.*`) are git-ignored on purpose — they're environment tooling, not source.

## Notes

- Respects `prefers-reduced-motion`: preloader, reveals, parallax, and the WebGL loop all degrade gracefully.
- The WebGL background pauses when the tab is hidden to save battery.
- Status `fork` is displayed as **remix** in the UI, with a tooltip explaining it was built on existing open-source work and extended.
