// Brok's Forge V2 — the flagship. Every fact here is sourced directly from the
// canonical V2 profile document (BROKS_FORGE_PROFILE.txt) or its own "Metrics
// and Scale" section. This file does NOT restate V1's architecture — V2 is a
// materially different, larger product on a different module map (Forge
// Kernel, not an agent-registry modular monolith). Nothing here is a usage,
// adoption or performance number that isn't explicitly in the source; design
// intent (the roadmap) is labeled as intent, never as delivered.

export const broksforge = {
  name: "Brok's Forge",
  tagline: 'The AI Engineering Operating System.',
  version: 'V2',
  license: 'Apache 2.0',
  status: 'Live in production',
  liveUrl: 'https://broksforge.gokul.quest',
  apiUrl: 'https://api.broksforge.gokul.quest',
  githubUrl: 'https://github.com/gokulraj9488/broks-forge',

  oneLiner:
    'Most AI tooling tells you what happened. Brok’s Forge is built to tell you why your system is the way it is — the decisions behind it, the evidence for them, and the reasoning that connects the two, answered deterministically.',

  shortPitch:
    'An open-source AI Engineering Operating System: it keeps the reasoning behind your AI system, not just its traces.',

  // Verified counts — from the canonical doc's own "Metrics and Scale" section.
  stats: [
    { value: 122, label: 'public REST endpoints' },
    { value: 499, label: 'backend tests passing' },
    { value: 34, label: 'end-to-end browser tests' },
    { value: 802, label: 'Java files — 663 main · 139 test' },
    { value: 10, label: 'Maven modules' },
    { value: 49, label: 'public documentation pages' },
  ],
}

// ---------------------------------------------------------------------------
// The differentiator — demonstrated on the page (BrokDemo), stated here.
// ---------------------------------------------------------------------------

export const differentiator = {
  eyebrow: 'The one rule that shapes everything else',
  claim: 'Brok doesn’t guess. It composes.',
  gloss:
    'There is no language model anywhere in Brok’s reasoning path. Every question resolves to one of a fixed set of engineering intents and is answered by composing real database rows — the same question always returns the same answer, and every sentence traces back to the record that produced it.',
  plainEnglish: 'In plain terms: the answers are provable and repeatable, not AI guesses you still have to go verify yourself.',
  refusal:
    'Asked something the record can’t support, Brok refuses and offers what it can answer instead — it doesn’t fill the gap with a plausible-sounding sentence.',
  epistemicStates: [
    { key: 'Derived', body: 'Composed directly from recorded rows — a decision and its evidence, both present.' },
    { key: 'Inferred', body: 'Composed from related evidence, not a direct record of this exact claim.' },
    { key: 'Suggested', body: 'A pattern worth checking, not yet confirmed by evidence.' },
    { key: 'Unknown', body: 'Nobody has measured this. Reported as unknown — never as passing.' },
  ],
}

// ---------------------------------------------------------------------------
// Problem → What makes it different (canonical §3–4)
// ---------------------------------------------------------------------------

export const problem = {
  eyebrow: 'The problem',
  title: 'Teams lose the reasoning behind their AI systems.',
  paragraphs: [
    'The prompt is in version control, but why v8 replaced v7 is in a Slack thread. Evaluation results sit on a dashboard, but which decision they justified is recorded nowhere. The engineer who knew has moved on. Six weeks later something fails and nobody can reconstruct which change mattered.',
    'Existing tooling answers the mechanical questions well — what did this request do, which calls were slow, did this prompt change break a test. It doesn’t answer the engineering questions: why was this promoted, what evidence covers it, has this happened before, what’s the blast radius of changing this dataset.',
  ],
  gaps: [
    'The reasoning behind a decision, not just the decision itself',
    'Evidence that a promoted configuration is actually defensible',
    'Whether a failure has happened before, and what fixed it last time',
    'The blast radius of a change, known before you make it, not after',
    'A distinction between "nobody measured this" and "this is healthy"',
  ],
}

export const solution = {
  eyebrow: 'What makes it different',
  title: 'Reasoning, modeled as a first-class object.',
  paragraphs: [
    'Brok’s Forge models the engineering act itself — artifacts, versions, observations, claims, decisions, evidence, knowledge — and derives its knowledge layer from work the engineer was doing anyway, rather than asking anyone to document anything. Promoting a version is a decision. Running an evaluation is evidence. Nobody writes documentation, so nothing rots.',
    'And the reasoning layer contains no language model. Questions resolve to a fixed set of engineering intents and are answered by composing real rows — reproducible and auditable rather than merely plausible.',
  ],
  points: [
    'Knowledge is derived, never authored and never generated',
    'Every statement declares how it’s known — Derived, Inferred, Suggested or Unknown',
    'Absence is never reported as health — an unmeasured artifact returns "unknown," not "passing"',
    'Positioning is deliberately non-competitive — the public comparison page concedes that LangSmith, Langfuse, Promptfoo and Weights & Biases are more mature at what they do',
  ],
}

// ---------------------------------------------------------------------------
// Key innovations (canonical §5) — the primary capability grid
// ---------------------------------------------------------------------------

export const innovations = [
  {
    title: 'Brok',
    body: 'A grounded engineering assistant with no LLM in its reasoning path. Resolves a question to one of 25 engineering intents and composes the answer from real rows. Asked something the record can’t support, it refuses and offers what it can answer instead. Also produces standing briefs — daily, deployment, incident, prompt, evaluation, dataset, knowledge, architecture.',
  },
  {
    title: 'Root Cause Explorer',
    body: 'Opening a failure yields an already-assembled investigation: a dated chronology of the engineering that led there, the cause at four depths — immediate, contributing, historical, related change — the evidence and version chains, and every earlier failure on the same ground.',
  },
  {
    title: 'AI Git',
    body: 'Version control for engineering reasoning, not source. Records what was promoted, why, what it superseded and what evidence covered it — and displays a rollback as a rollback when production runs an older revision than the newest one. The reason an engineer writes at promotion time becomes Engineering Memory, recalled verbatim.',
  },
  {
    title: 'Engineering Intelligence',
    body: 'The derived layer: observations, claims, decisions, evidence and knowledge — all produced as a by-product of normal engineering work, never authored by hand.',
  },
  {
    title: 'Forge Graph',
    body: 'A live map of artifacts and their real relationships, built from what the system actually recorded rather than a maintained document. Narrowed to a single run it becomes the Execution Graph; narrowed to a failure, the Failure Graph.',
  },
  {
    title: 'Forge Kernel',
    body: 'A deliberately framework-free, append-only event log with its own API / core / TCK / PostgreSQL-store split. The Postgres adapter manages its own schema in a dedicated forge_kernel namespace and intentionally avoids Flyway, so the kernel inherits no application framework.',
  },
]

// Everything else that ships — verbatim from canonical §7, condensed to a pill list.
export const capabilities = [
  'Agent registry across frameworks, with per-provider health checking',
  'Provider management — Claude, GPT, Gemini, Groq, OpenRouter via Spring AI',
  'Encrypted agent credential storage with connection testing',
  'Prompt management with versioning and comparison',
  'Dataset management with versions, items and column mapping',
  'Evaluation profiles, versioned; evaluation jobs, runs and results',
  'Benchmark gallery — RAG, coding, hallucination, safety, summarization templates',
  'Execution Graph and Failure Graph, per run',
  'AI Git evolution, promotion, rollback and deployment timeline',
  'Organizations, projects, membership and role-based access',
  'Public documentation site — 49 pages, llms.txt, sitemap, JSON-LD',
]

// ---------------------------------------------------------------------------
// Architecture (canonical §6) — 5 layers, 4 pillars, real Maven modules
// ---------------------------------------------------------------------------

export const architecture = {
  eyebrow: 'Architecture',
  title: 'Five layers. Read down. Never duplicate.',
  subhead:
    'Each layer can read everything beneath it and nothing above it, and is forbidden from duplicating a layer below — which is why adding a reasoning surface never means adding a table.',
  // Listed top-down, exactly as the canonical doc orders them.
  layers: [
    { name: 'Engineering Applications', detail: 'Brok, Root Cause Explorer, Briefs. Own no data.' },
    { name: 'Forge Graph', detail: 'Artifacts, real relationships, reasoning on top.' },
    { name: 'AI Git', detail: 'Revisions, promotions, rollbacks, rationale.' },
    { name: 'Registry', detail: 'Every artifact and derived knowledge object.' },
    { name: 'Forge Kernel', detail: 'Identity, tenancy, persistence, execution.' },
  ],
  pillars: ['Build', 'Evaluate', 'Understand', 'Evolve'],
  pillarNote: 'Four product pillars — every screen belongs to exactly one.',
  monolith:
    'A modular monolith (Spring Boot) that depends on local Maven modules rather than microservices. The kernel and forge-* modules are separate, published-in-repo artifacts, consumed through public APIs only.',
}

// The real repository module list — 10 Maven modules including the kernel aggregator.
export const modules = [
  { id: 'kernel', label: 'kernel', detail: 'Aggregator module for the framework-free event log.' },
  { id: 'kernel-api', label: 'kernel-api', detail: 'The kernel’s public contract — what everything above it is allowed to depend on.' },
  { id: 'kernel-core', label: 'kernel-core', detail: 'The append-only event log implementation. Inherits nothing from Spring, Postgres or the web layer.' },
  { id: 'kernel-store-postgres', label: 'kernel-store-postgres', detail: 'The Postgres adapter — manages its own schema in a dedicated forge_kernel namespace, deliberately without Flyway.' },
  { id: 'kernel-tck', label: 'kernel-tck', detail: 'The technology-compatibility kit — proves any storage adapter honors the kernel’s contract.' },
  { id: 'forge-knowledge', label: 'forge-knowledge', detail: 'The knowledge system behind Engineering Intelligence — observations, claims, decisions, evidence.' },
  { id: 'forge-fvcs', label: 'forge-fvcs', detail: 'The version-control substrate behind AI Git.' },
  { id: 'forge-fkge', label: 'forge-fkge', detail: 'The knowledge-graph engine behind Forge Graph.' },
  { id: 'forge-fxp', label: 'forge-fxp', detail: 'The experience platform composing every layer above into product. Currently v2.0.0.' },
  { id: 'forge-explorer', label: 'forge-explorer', detail: 'The exploration module behind Root Cause Explorer.' },
]

// ---------------------------------------------------------------------------
// Production & security (canonical §9) — the deployment story, verified
// ---------------------------------------------------------------------------

export const production = {
  eyebrow: 'Production',
  title: 'Deployed and operated, not just described.',
  subhead: 'A split deployment, both sides driven automatically by a push to main.',
  topology: [
    { id: 'browser', label: 'Browser', sub: 'broksforge.gokul.quest' },
    { id: 'vercel', label: 'Vercel', sub: 'Next.js 15 frontend' },
    { id: 'nginx', label: 'Nginx + Certbot', sub: 'api.broksforge.gokul.quest — TLS terminator' },
    { id: 'api', label: 'Spring Boot API', sub: 'built from source on the host' },
    { id: 'data', label: 'PostgreSQL 16 · Redis 7', sub: 'internal Docker network only — no host ports' },
  ],
  security: [
    {
      title: 'Nothing exposed but the proxy',
      body: 'Postgres and Redis publish no host ports at all — reachable only over the internal Docker network. The backend isn’t bound to a host port either; only Nginx can reach it.',
    },
    {
      title: 'Secrets never leave the server',
      body: 'The JWT signing key, encryption key, database/Redis passwords and SMTP credentials live only in a .env on the server, deliberately not duplicated into GitHub Secrets. The deploy workflow never reads or transmits them.',
    },
    {
      title: 'A deploy key that can’t do much',
      body: 'A dedicated SSH keypair with strict host-key checking, written with umask 077 and removed under if: always(). The deploy job is guarded to the canonical repo owner, so a fork can’t trigger it.',
    },
    {
      title: 'HTTPS only',
      body: 'HTTP serves only the ACME challenge and a 301 redirect to HTTPS. Nothing else is reachable over plain HTTP.',
    },
  ],
  cicd: {
    workflows: ['backend-ci', 'frontend-ci', 'docker', 'e2e', 'encoding', 'codeql', 'dependency-review', 'deploy-production', 'release'],
    detail:
      'The production deploy is fully automatic and unattended: SSH, pull, build, apply, reload Nginx, wait for container health, verify the public HTTPS endpoint, prune. It tags the live image before building, so a backend that never becomes healthy is automatically rolled back, reloaded and re-checked.',
  },
}

// ---------------------------------------------------------------------------
// Technology stack (canonical §10) — exact, no invention
// ---------------------------------------------------------------------------

export const stack = {
  eyebrow: 'Technology',
  title: 'The stack, exactly as shipped.',
  groups: [
    {
      name: 'Backend',
      items: ['Java 21', 'Spring Boot 3.4.13', 'Spring Security', 'Spring Data JPA', 'Spring AI', 'Hibernate', 'Flyway', 'JWT (jjwt)', 'MapStruct', 'Lombok', 'springdoc-openapi', 'Micrometer / Prometheus', 'Apache POI', 'JSON Schema Validator', 'Maven (multi-module)'],
    },
    { name: 'Data', items: ['PostgreSQL 16', 'Redis 7'] },
    { name: 'Frontend', items: ['TypeScript', 'Next.js 15 (App Router)', 'React', 'Tailwind CSS', 'Radix UI', 'Framer Motion', 'next-themes'] },
    { name: 'Testing', items: ['JUnit 5', 'Testcontainers', 'JaCoCo', 'Playwright', 'Newman / Postman'] },
    { name: 'Infra', items: ['Docker', 'Docker Compose', 'BuildKit / Buildx', 'Nginx', 'Certbot', 'AWS EC2', 'Vercel', 'GitHub Actions', 'CodeQL'] },
  ],
}

// ---------------------------------------------------------------------------
// Design constitution (canonical §8) — the philosophy section
// ---------------------------------------------------------------------------

export const philosophy = {
  eyebrow: 'Design constitution',
  title: 'Written down. Non-negotiable. Outranks the code.',
  subhead:
    'Governed by a written three-volume constitution — identity, UX, design language — that outranks any implementation that conflicts with it.',
  principles: [
    { title: 'Meaning before measurement', body: 'Every screen opens with what happened and why, never with raw data.' },
    { title: 'Nothing asserted that cannot be traced', body: 'An answer you have to independently verify hasn’t saved you the work of finding it.' },
    { title: 'Causality is the axis; time is an attribute', body: 'The record is organized around why, not when.' },
    { title: 'One substrate, many lenses', body: 'No surface owns its own data, so no two surfaces can disagree.' },
    { title: 'Depth chosen, never forced', body: 'The default view is meaning; detail is one click away, not a wall of it.' },
    { title: 'Objects, not pages; acts, not events', body: 'Decisions and evidence are things you can point at, not log lines.' },
    { title: 'There is no playground', body: 'Every trial is a real, recorded act — nothing tried is ever lost.' },
    { title: 'Never duplicate', body: 'One product, one navigation, one engineering language, one identity.' },
  ],
}

// ---------------------------------------------------------------------------
// Roadmap (canonical §22) — reserved-but-unbuilt, plus honest follow-ups
// ---------------------------------------------------------------------------

export const roadmap = {
  eyebrow: 'What’s next',
  title: 'Reserved in the constitution. Not yet built.',
  subhead: 'Described here as planned — never as delivered.',
  items: [
    { title: 'The Exemplar', body: 'A read-only demonstration organization, so a visitor can explore a real engineering record without registering.' },
    { title: 'The Bench and Trials', body: 'An inner-loop workspace where every trial is a durable recorded act and nothing tried is lost.' },
    { title: 'The Question Language', body: 'Relationship queries over the record, instead of metric queries.' },
    { title: 'Four ingress doors at parity', body: 'UI, CLI, CI and API/SDK — each with its own laws.' },
    { title: 'Governance and audit', body: 'Including erasure reconciliation — content may be erased, but the existence of the act never is.' },
    { title: 'Architecture Diff & AI pull requests', body: 'Plus reports, production learning, and additional graph lenses — Impact, Delta.' },
  ],
  honesty: {
    title: 'Known follow-ups — stated honestly',
    items: [
      'The automatic rollback path in the deploy pipeline is implemented and syntax-verified, but has never fired in anger — no deployment has yet failed its health gate.',
      'The kernel and forge-* modules install with tests skipped in CI, so their own suites don’t run there yet.',
      'The production host is resource-constrained — ~912 MB RAM, 8 GB root volume — and would benefit from a larger instance before further growth.',
    ],
  },
}
