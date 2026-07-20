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
  headline: 'Engineering AI that survives production.',
  // Handwritten margin note next to the headline — short and true.
  headlineNote: 'demos are easy.\nsurviving is the job.',
  subhead:
    'Evaluation pipelines, RAG systems, agent registries, developer tooling — designed, built and operated end to end. The flagship is Brok’s Forge: an open-source engineering platform for AI agents.',
  primaryCta: { label: "Explore Brok's Forge", href: '/broksforge', route: true },
  secondaryCta: { label: 'GitHub', href: 'https://github.com/gokulraj9488', external: true },
  // Quiet credibility line under the CTAs.
  credibility: ['Software Engineer @ TCS', 'Google Cloud · BigQuery', '2 systems live in production'],
  measure: 'designed · built · operated — solo',
  // What's actually on the bench right now (from the public roadmap).
  now: 'async evaluation workers',
}

// The workbench drawing — the loop the flagship owns, drawn like a sheet from a drafting table.
export const bench = {
  sheetLabel: 'SHEET 01 — THE LOOP',
  note: 'runs on every merge',
  nodes: ['Agent', 'Evaluate', 'Benchmark', 'Advise'],
  // Shape of a real run: 500 dataset items × 9 metrics.
  metrics: [
    { value: 94.2, decimals: 1, suffix: '%', label: 'pass rate' },
    { value: 1.8, decimals: 1, suffix: 's', label: 'p95 latency' },
    { value: 4500, decimals: 0, suffix: '', label: 'results scored' },
  ],
  caption: 'fig. 01 — one evaluation job: 500 items fan out, 9 metrics score every run.',
  titleBlock: [
    ['drawing', 'evaluation loop'],
    ['rev', 'v1.0.0'],
    ['scale', 'production'],
    ['drawn by', 'g.m.'],
  ],
}

// True, specific, scannable. Counted from the Brok's Forge repo — no fabricated usage metrics.
export const metrics = [
  { value: 22, label: 'backend modules', sub: 'one platform, clean boundaries' },
  { value: 29, label: 'append-only migrations', sub: 'the schema is the contract' },
  { value: 13, label: 'LLM providers modeled', sub: 'behind one SPI' },
  { value: 2, label: 'systems in production', sub: 'built and operated solo' },
]

// About, written as operating principles — how I think, not what I enjoy.
export const about = {
  eyebrow: 'Operating principles',
  title: 'Principles I refuse to compromise.',
  note: 'all learned the hard way',
  intro:
    "I'm an AI engineer who treats AI systems as production software, not demos. By day I build governed cloud data platforms at Tata Consultancy Services; nights and weekends belong to the workshop — the registries, pipelines and evaluation loops that make AI agents shippable.",
  principles: [
    {
      title: 'Platforms, not demos',
      body: 'Anyone can call a model API. The hard part is everything around it — versioning, credentials, datasets, evaluation, cost. I build that part.',
    },
    {
      title: 'Measured, not vibes',
      body: "An agent that isn't evaluated is an agent you can't ship. Every system I build produces metrics, benchmarks and regression signals — quality is a number, not an impression.",
    },
    {
      title: 'The schema is the contract',
      body: 'Databases outlive code. Append-only migrations, immutable versions and reproducible results — so an evaluation run today means the same thing a year from now.',
    },
    {
      title: 'Boundaries over convenience',
      body: 'Modules reference each other by id and published services, never shared tables. It costs a query today and buys a clean extraction tomorrow.',
    },
    {
      title: 'Security by construction',
      body: 'Tenant isolation that returns 404 instead of leaking existence, encrypted credentials, SSRF guards on every outbound call. Defaults, not afterthoughts.',
    },
    {
      title: 'Built to be operated',
      body: 'Correlation IDs on every log line, structured errors, health probes, fail-fast startup. If an incident is hard to trace, the system is unfinished.',
    },
  ],
}

// The build log — real dates, real ships, straight from the repos.
export const buildLog = {
  eyebrow: 'Build log',
  title: 'From the workshop.',
  now: 'Async evaluation workers — moving the executor seam behind a queue and a worker fleet.',
  entries: [
    {
      date: 'Jul 2026',
      text: 'Production hardening pass on Brok’s Forge — provider-aware health checks, OTP password change, Prometheus metrics, structured JSON logging.',
    },
    {
      date: 'Jul 2026',
      text: 'Brok’s Forge v1.0.0 — all four phases live. 22 modules, 29 migrations, 17 ADRs, and a Master Architecture doc that is actually kept true.',
    },
    {
      date: '2026',
      text: 'Phase 4: the AI Engineering Advisor — recommendations, root-cause engine, AI debugger, knowledge graph. Everything computed on read, nothing stale.',
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
  emailSubject: 'Hello from gokul.quest',
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
