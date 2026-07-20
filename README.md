# gokul.quest — AI Engineer · AI Infrastructure

Portfolio of **Gokulraj M** — AI engineer building the infrastructure behind AI agents.
Two pages: the portfolio (`/`) and a full product page for the flagship platform (`/broksforge`).

Built with **Vite + React + Tailwind CSS + Framer Motion**, prerendered to static HTML at build
time and hydrated on load. Deploys to **GitHub Pages**.

Design direction: *the workshop has a soul* — a handcrafted engineer's site with a play layer,
not a SaaS landing page. Warm near-black surfaces, one ember accent (`#E2A45A`, the forge),
drafting-sheet details (corner marks, title blocks, measurement guides, blueprint grids,
stamps, rulers, ember sparks), handwritten margin notes in Architects Daughter, and small,
fast micro-interactions (magnetic CTAs, pointer tilt, count-up metrics, an interactive
evaluation-run replay). Every number on the Brok's Forge page is counted from its repo;
design targets are labeled as targets, never as measurements.

### The play layer (discoverable)

| Trigger | Reward |
|---|---|
| The blinking `>` in the corner | It types hints. Click it — or press `/` — for the workshop terminal |
| Terminal commands | `help` `whoami` `coffee` `fortune` `panic` `git blame` `git log` `deploy friday` `rm -rf bugs` `ship` `make demo` `heat` `benchmark` … and a few unlisted (`nyan`, `sudo hire gokulraj`, one that never gives you up) |
| `↑ ↑ ↓ ↓ ← → ← → B A` | Developer mode — blueprint grid, container guides, FPS HUD, section labels |
| Hover the logo spark ×5 | A hammer appears; click it: forge mode — heat that follows your cursor |
| "Recruiter?" in the nav | Boots WORKSHOP://RECRUITER — ACCESS GRANTED, keyboard-first, ESC returns |
| The Continental GT650 (right rail) | Rides as you scroll; idles with exhaust at the Forge; headlight on for the last stretch. Honk it. |
| `radio` in the footer | The songs this site was built to (nothing autoplays) |
| Achievements | 8 to find — persisted, counted in Recruiter OS |
| Résumé download | +10 Recruiter XP |
| Red cells in the eval replay | "task failed successfully." (hover the legend, too) |
| Hover Brok's Forge / Kuriosity | FINAL BOSS / SIDE QUEST |
| Unknown URL | "This page checked out the wrong branch" → `git checkout main` |
| Footer | A different sign-off every visit |
| View source | A greeting, and the hints above |

All of it is client-only state (`src/lib/workshop.jsx`) — the prerendered HTML never changes,
hydration stays clean, and axe reports zero violations with the terminal and Recruiter OS open.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # client build + SSR build + prerender -> dist/
npm run preview  # serve the production build locally
```

`npm run build` runs three steps (see `package.json`):

1. `vite build` — client bundle into `dist/`
2. `vite build --ssr src/entry-server.jsx` — server renderer into `dist-ssr/`
3. `node scripts/prerender.mjs` — renders `/` and `/broksforge` to static HTML
   (`dist/index.html`, `dist/broksforge/index.html`, `dist/broksforge.html`), so first paint
   carries real content and crawlers see full markup. `src/main.jsx` hydrates in the browser.

## Routing

`src/lib/router.jsx` is a ~100-line path router (two routes don't justify a dependency):

- `/` — portfolio · `/broksforge` — flagship product page
- Cross-page hash links (`/#work`) navigate then re-anchor using each section's
  `scroll-margin-top`.
- `public/404.html` handles GitHub Pages deep links for any path that isn't prerendered
  (redirects to `/?p=<path>`, which the router restores).

## Deploy to GitHub Pages

```bash
npm run deploy   # builds, then pushes dist/ to the gh-pages branch
```

`public/CNAME` pins the custom domain (`gokul.quest`). In **Settings → Pages** set the custom
domain and enable **Enforce HTTPS**.

## Content — edit without touching components

All copy lives in `src/data/`:

| File | What |
|---|---|
| `site.js` | Identity, nav, hero copy + workbench sheet, metrics, About principles, build log, contact |
| `broksforge.js` | Everything on the Brok's Forge product page — stats, modules, pipeline, security, stack, roadmap |
| `kuriosity.js` | Secondary product: pitch, highlights, stack |
| `projects.js` | Earlier systems (supporting evidence) |
| `experience.js` | Timeline entries |
| `certifications.js` | Credentials |

## Assets to drop in `public/`

- `resume.pdf` — the Resume button links to `./resume.pdf`.
- `og-image.png` — 1200×630 social preview (referenced by `index.html` meta tags).

## Accessibility & performance

- **axe (WCAG 2.0 A/AA): 0 violations** on both pages; visible focus rings, skip link,
  keyboard-operable module explorer, `prefers-reduced-motion` honored globally.
- **Lighthouse (throttled, production build): 95–97 performance · 100 accessibility ·
  100 best practices · 100 SEO** per page.
- Prerendered HTML → LCP fires on first paint; sections use `content-visibility: auto` to keep
  main-thread work low; fonts self-hosted via `@fontsource`; animations are compositor-only
  (transform/opacity) and fire once.
