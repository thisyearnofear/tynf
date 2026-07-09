# thisyearnofear

An over-the-top, scroll-driven portfolio for the **thisyearnofear** studio — a single immersive page that showcases the projects built under the moniker. Real-time WebGL background, smooth scroll, masked line reveals, and parallax, composed with Next.js 16 (App Router), Three.js, GSAP, and Lenis.

## Stack

- **Next.js 16.2** (App Router, Turbopack) — `src/app`
- **Three.js** — fixed full-screen shader background (`WebGLBackground`)
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
    layout.tsx        # fonts (Space Grotesk / Fraunces / Geist Mono) + metadata
    page.tsx          # renders <Experience/>
    globals.css       # design tokens + all component styles
  components/
    Experience.tsx    # top-level client orchestrator (preloader gate, composition)
    Preloader.tsx     # 0→100 counter that wipes into the hero
    Cursor.tsx        # custom magnetic cursor
    WebGLBackground.tsx
    heroIntro.ts      # shared registry so Experience can trigger the hero intro
    SmoothScrollProvider.tsx  # accent + pointer context shared with WebGL
    sections/         # page sections, one file each
      Nav.tsx Hero.tsx Marquee.tsx Manifesto.tsx
      Projects.tsx About.tsx Footer.tsx
    useScrollReveal.tsx  # useScrollReveal hook + <Reveal>/<Parallax> helpers
  app/
    page.tsx          # home (Experience)
    work/[id]/page.tsx  # per-project detail route (statically generated)
  data/
    projects.ts       # ★ project list — edit to add/change projects
    details.ts        # ★ concise detail copy (what / highlights / note)
  lib/
    gsap.ts                 # registers ScrollTrigger once
    useIsomorphicLayoutEffect.ts
```

### Project detail pages

Each project gets a concise detail page at `/work/[id]` (statically generated for
every project in `projects.ts`). It shows a masked title reveal, a one-line "what
it is", a few "why it's fun" highlights, a sticky meta panel (stack / tags /
status) with live + code links, and a next-project link. The WebGL background
retints to the project's accent color on entry.

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

The grid, parallax, reveals, and marquee are all data-driven — no other file needs to change.

## Git hooks

A Husky `pre-commit` runs on every commit:

1. **gitleaks** — scans staged changes for secrets (config: `.gitleaks.toml`, vendored baseline: `.gitleaks.base.toml`). Blocks the commit if a leak is found.
2. **lint-staged** — runs `eslint --fix` (and `tsc --noEmit`) on staged `*.{ts,tsx,js,jsx}` files.

The secret-scan config files (`.gitleaks.*`) are git-ignored on purpose — they're environment tooling, not source.

## Notes

- Respects `prefers-reduced-motion`: preloader, reveals, parallax, and the WebGL loop all degrade gracefully.
- The WebGL background pauses when the tab is hidden to save battery.
