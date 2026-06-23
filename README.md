# gokul.quest — Building Intelligent Systems

Portfolio of **Gokulraj M** — Software Engineer · Cloud & AI.
Built with **Vite + React + Tailwind CSS + Framer Motion**. Static output, deploys to **GitHub Pages**.

Design direction: *AI Systems Architect, disciplined* — dark, structure-led, one teal accent (`#3FE0C5`) with a violet gradient endpoint (`#8B6CF1`). The signature element is a reusable, hover-interactive **pipeline diagram** used in the hero and in the Kuriosity section.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs static site to dist/
npm run preview  # serve the production build locally
```

## Deploy to GitHub Pages (automated)

1. Create a GitHub repo and push this project to the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source = "GitHub Actions"**.
3. Every push to `main` runs `.github/workflows/deploy.yml` (build → upload → deploy). Done.

### Custom domain (gokul.quest)
- `public/CNAME` already contains `gokul.quest`, so Pages will request that domain.
- At your DNS provider, point the apex domain at GitHub Pages:
  - `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - (and/or `AAAA` records for IPv6), or a `CNAME` for `www` → `<user>.github.io`.
- In **Settings → Pages**, set the custom domain and enable **Enforce HTTPS**.

> Not using a custom domain? Delete `public/CNAME`. `vite.config.js` uses `base: './'` (relative
> URLs), so the build works at a project-pages subpath (`<user>.github.io/<repo>/`) with no change.

## Content — edit without touching components

All copy lives in `src/data/`:

| File | What |
|---|---|
| `site.js` | Identity, nav links, hero copy, metrics, contact |
| `kuriosity.js` | Featured product: pitch, pipeline nodes, engineering decisions, stack |
| `capabilities.js` | The three capability layers + languages/tools |
| `experience.js` | Timeline entries |
| `projects.js` | Case studies (problem / approach / outcome) |
| `certifications.js` | Credentials |

## Assets to drop in `public/`

- `resume.pdf` — your résumé (the Resume button links to `./resume.pdf`).
- `og-image.png` — 1200×630 social preview (referenced by `index.html` meta tags).
- `kuriosity-demo.mp4` + `kuriosity-poster.jpg` *(optional)* — a muted screen-capture loop of Kuriosity.
  When added, swap the placeholder mock in `src/components/sections/FeaturedProduct.jsx` (`ProductWindow`)
  for a `<video autoPlay muted loop playsInline poster=...>`. The "show it working" upgrade.

## Things to verify before you ship

- [ ] **Certification wording.** `certifications.js` says *"Associate Cloud Engineer"* (per the blueprint);
      your resume PDF says *"Fundamentals"*. Confirm which is true and make both match.
- [ ] Add `public/resume.pdf` and `public/og-image.png`.
- [ ] Confirm social/profile URLs in `src/data/site.js`.

## Accessibility & performance notes

- WCAG-minded: visible focus rings, skip-to-content link, keyboard nav, `prefers-reduced-motion`
  honored globally (one switch in `index.css` neutralizes all motion).
- Fonts self-hosted via `@fontsource` (no render-blocking Google Fonts request).
- Animations are compositor-only (transform/opacity), fire once, and never gate content.
