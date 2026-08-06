// Single source of truth for identity, nav, hero copy, principles, build log, contact.
// Edit content here — components read from it.

export const identity = {
  name: 'Gokulraj M',
  role: 'AI Engineer',
  location: 'Tamil Nadu, India',
  email: 'gokulraj.gokul3003@gmail.com',
  resumeUrl: './resume.pdf', // drop your PDF at public/resume.pdf
}

export const social = {
  github: 'https://github.com/gokulraj9488',
  linkedin: 'https://www.linkedin.com/in/gokul-raj3003',
  portfolio: 'https://gokul.quest',
}

// Top nav. "Brok's Forge" is a route; the rest are home-page sections.
export const navLinks = [
  { label: "Brok's Forge", href: '/broksforge', route: true },
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
]

// Sections observed for active-link highlighting (order = scroll order).
export const sectionIds = ['hero', 'work', 'about', 'experience', 'contact']

export const hero = {
  eyebrow: "AI ENGINEER — BUILDER OF BROK'S FORGE",
  headline: 'Systems that explain themselves.',
  // Handwritten margin note next to the headline — short and true.
  headlineNote: 'guessing is easy.\nexplaining yourself isn’t.',
  subhead:
    'My flagship, Brok’s Forge, is an AI Engineering Operating System — it keeps the reasoning behind an AI system, not just what happened to it. How it actually answers a question is the part worth scrolling for.',
  primaryCta: { label: "Explore Brok's Forge", href: '/broksforge', route: true },
  secondaryCta: { label: 'GitHub', href: 'https://github.com/gokulraj9488', external: true },
  // Quiet credibility line under the CTAs.
  credibility: ['Software Engineer @ TCS', 'Google Cloud · BigQuery', '2 systems live in production'],
  measure: 'designed · built · operated — solo',
  // What's actually on the bench right now — a real, honestly-stated gap, not a fabricated one.
  now: 'closing the CI test-skip gap on the kernel and forge-* modules',
}

// The workbench drawing — the four pillars every screen belongs to, drawn like a sheet from a drafting table.
export const bench = {
  sheetLabel: 'SHEET 01 — THE LOOP',
  note: 'runs on every merge',
  nodes: ['Build', 'Evaluate', 'Understand', 'Evolve'],
  // Real, counted numbers — not a fabricated run.
  metrics: [
    { value: 122, decimals: 0, suffix: '', label: 'REST endpoints' },
    { value: 499, decimals: 0, suffix: '', label: 'tests passing' },
    { value: 5, decimals: 0, suffix: '', label: 'architecture layers' },
  ],
  caption: 'fig. 01 — the four pillars. Every screen belongs to exactly one.',
  titleBlock: [
    ['drawing', 'the four pillars'],
    ['rev', 'v2'],
    ['scale', 'production'],
    ['drawn by', 'g.m.'],
  ],
}

// True, specific, scannable. Counted from the Brok's Forge repo — no fabricated usage metrics.
export const metrics = [
  { value: 122, label: 'REST endpoints shipped', sub: 'Brok’s Forge V2, OpenAPI/Swagger' },
  { value: 499, label: 'backend tests passing', sub: '83 test classes, JUnit 5 + Testcontainers' },
  { value: 10, label: 'Maven modules', sub: 'framework-free kernel + forge-* platform' },
  { value: 2, label: 'systems in production', sub: "Brok's Forge · Kuriosity" },
]

// About, written as operating principles — how I think, not what I enjoy.
export const about = {
  eyebrow: 'Operating principles',
  title: 'Principles I refuse to compromise.',
  note: 'all learned the hard way',
  intro:
    "I'm an AI engineer who treats reasoning as something worth engineering, not just answers. By day I build governed cloud data platforms at Tata Consultancy Services; nights and weekends belong to the workshop — most recently, Brok's Forge, an AI Engineering Operating System built around one hard rule: no language model in the reasoning path.",
  principles: [
    {
      title: 'Knowledge should be derived, never authored',
      body: "If a fact isn't a byproduct of real work — a promotion, an evaluation — I don't want it in the system. Anything a human has to remember to write down eventually stops being true.",
    },
    {
      title: 'Absence is not health',
      body: "An unmeasured thing and a passing thing are different claims. I'd rather a system say 'unknown' and be honest than say 'green' and be guessing.",
    },
    {
      title: 'Evidence beats confidence',
      body: "A plausible-sounding answer I still have to go verify hasn't saved me any work. If I can't trace a sentence back to the row that produced it, I don't trust the sentence.",
    },
    {
      title: 'Concede before you’re caught',
      body: "I'd rather publish a comparison page that admits a competitor is more mature than get caught overstating it later. Confidence without a caveat isn't confidence — it's exposure.",
    },
    {
      title: 'The schema is the contract',
      body: 'Databases outlive code. Append-only migrations and immutable versions, so a result means the same thing a year from now as it does today.',
    },
    {
      title: 'Fix the mechanism, not the symptom',
      body: 'When 115 characters corrupted across 23 files, I reversed the exact mis-decode instead of pattern-matching broken strings — then negative-tested my own guardrail to prove it actually guards.',
    },
  ],
}

// The build log — real dates, real ships, straight from the repos.
export const buildLog = {
  eyebrow: 'Build log',
  title: 'From the workshop.',
  now: "Closing the CI test-skip gap — the kernel and forge-* modules currently install with tests skipped in CI, so their own suites don't run there yet.",
  entries: [
    {
      date: '2026',
      text: "Brok's Forge V2 shipped — Brok (zero-LLM reasoning), Root Cause Explorer, AI Git and Forge Graph, on top of the original registry and evaluation engine. 122 REST endpoints, 499 backend tests, 34 end-to-end specs.",
    },
    {
      date: '2026',
      text: 'Diagnosed and fixed a chain of production incidents to root cause, back to back — the full write-ups are a few sections up, in Field Notes.',
    },
    {
      date: '2025',
      text: 'Repaired repository-wide UTF-8 corruption and shipped a negative-tested CI guard against it — also in Field Notes.',
    },
    {
      date: '2025',
      text: 'Kuriosity shipped — a RAG tutor in production across three platforms. Still running.',
    },
  ],
  note: 'the roadmap is public — hold me to it',
}

export const contact = {
  headline: 'Build something with me.',
  subline:
    "Open to AI engineering and platform roles — teams that care whether the system still works six months after the demo. If that's you, the inbox is open.",
  emailSubject: 'Interested in working together',
  note: 'i read everything. usually same day.',
}

// Footer sign-offs — workshop notes, not marketing copy. One per visit,
// rotated client-side after hydration.
export const footerQuips = [
  'git commit -m "it works. don\'t touch it."',
  'coffee → code → ride → repeat.',
  '// probably overengineered',
  'forged after 6PM.',
  'works on my machine™',
  'built after work. shipped before sleep.',
  'if it scales, it stays.',
  'less hype. more logs.',
  'first make it work.\nthen make it beautiful.',
  'designed for production.\nbuilt for curiosity.',
]
