// Brok's Forge — the flagship. Every fact here is sourced from the platform's
// Master Architecture doc and counted from the repo (docs/MASTER_ARCHITECTURE.md,
// docs/RESUME_POINTS.md). Design targets are labeled as targets, never as measurements.

export const broksforge = {
  name: "Brok's Forge",
  tagline: 'The Engineering Platform for AI Agents.',
  version: 'v1.0.0',
  license: 'Apache 2.0',
  status: 'Live in production',
  liveUrl: 'https://broksforge.gokul.quest',
  githubUrl: 'https://github.com/gokulraj9488/broks-forge',

  oneLiner:
    'Frameworks help you build an agent. Brok’s Forge is the platform that helps you engineer one — register it, version it, point real datasets and prompts at it, evaluate it against objective metrics, benchmark variants, catch regressions, and report on cost, latency and quality over time.',

  // Verified counts — from the repo and source-of-truth docs.
  stats: [
    { value: 22, label: 'feature & infra modules' },
    { value: 27, label: 'REST controllers' },
    { value: 29, label: 'append-only migrations' },
    { value: 335, prefix: '~', label: 'backend Java files' },
    { value: 13, label: 'LLM providers modeled' },
    { value: 17, label: 'architecture decision records' },
  ],
}

// ---------------------------------------------------------------------------
// Problem → Solution
// ---------------------------------------------------------------------------

export const problem = {
  eyebrow: 'The problem',
  title: 'Building an agent is easy. Engineering one is not.',
  paragraphs: [
    'Every framework — LangGraph, CrewAI, AutoGen, Spring AI — helps you build an agent. Almost nothing helps you after that: which prompt version is live, whether the new model is actually better, what a deploy did to cost and latency, why run #482 failed.',
    'Teams answer these questions with spreadsheets, ad-hoc scripts and gut feel. That works for a demo. It collapses the moment agents carry production traffic.',
  ],
  gaps: [
    'No stable registry of agents, versions and credentials',
    'Evaluations that are unreproducible because inputs drift',
    'No objective comparison between prompts, models or versions',
    'Regressions discovered by users instead of by pipelines',
    'Cost and latency invisible until the invoice arrives',
  ],
}

export const solution = {
  eyebrow: 'The platform',
  title: 'One system for the whole engineering loop.',
  paragraphs: [
    "Brok's Forge treats the agent as the central aggregate root — a stable, framework-agnostic identity every other capability attaches to. Datasets and prompts are immutable, versioned artifacts; evaluation jobs pin exact versions, so every result is reproducible forever.",
    'It is provider-agnostic and framework-agnostic by construction: an agent is described by metadata, not by any framework’s types, and every LLM provider is reached through one SPI. Adding a provider is a code-only change — no schema migration.',
  ],
}

// ---------------------------------------------------------------------------
// Core capabilities (product-level, not module-level)
// ---------------------------------------------------------------------------

export const capabilities = [
  {
    title: 'Agent registry',
    body: 'Framework-agnostic agents with versioning, encrypted credentials and provider-aware health checks. The single source of truth for "the thing under test."',
  },
  {
    title: 'Versioned datasets & prompts',
    body: 'Immutable, append-only versions with {{variable}} templating, activate/rollback and version comparison. Evaluations pin versions, so results never shift under you.',
  },
  {
    title: 'Evaluation engine',
    body: 'Jobs fan out into runs and per-metric results — deterministic metrics plus judge-family metrics (LLM judge, semantic similarity, hallucination and citation checks).',
  },
  {
    title: 'Benchmarking & leaderboards',
    body: 'Six comparison axes — agent, version, prompt, model, dataset, profile — ranked from precomputed job summaries. Nothing is re-run to build a leaderboard.',
  },
  {
    title: 'Regression detection',
    body: 'Baseline-vs-candidate checks against thresholds, so a worse deploy is caught by the pipeline — not by your users.',
  },
  {
    title: 'Cost, latency & token analytics',
    body: 'Historical trends across every run: spend concentration, latency spikes, token bloat — per agent, per model, per project.',
  },
  {
    title: 'AI Engineering Advisor',
    body: 'Five pure sub-advisors (prompt, model, cost, agent, RAG) produce recommendations with why, what changed, how to fix and expected improvement — computed on read, never stale.',
  },
  {
    title: 'Root cause & AI debugger',
    body: 'Failed runs become diagnoses (timeout, HTTP error, empty output, JSON-invalid…) and a 7-stage execution timeline that honestly marks unobserved stages NOT_INSTRUMENTED.',
  },
  {
    title: 'Engineering knowledge graph',
    body: 'A queryable graph of failure modes, regressions and remediations (20 seeded nodes, 20 typed edges) that learns — every surfaced pattern increments its occurrence count.',
  },
]

// ---------------------------------------------------------------------------
// Evaluation pipeline (drives the animated diagram)
// ---------------------------------------------------------------------------

export const evaluationPipeline = {
  eyebrow: 'Fig. 02 — evaluation architecture',
  title: 'Job → runs → results → summary.',
  subhead:
    'The pipeline is a fan-out tree with an insert-only hot path: one job, one run per dataset item, one result per metric per run. Summaries are precomputed, so benchmarks and regression checks read one row — not millions.',
  stages: [
    { id: 'job', label: 'EvaluationJob', detail: 'agent + dataset + prompt + profile, all pinned by version id' },
    { id: 'executor', label: 'JobExecutor', detail: 'the queue-ready seam — fans the job out per dataset item' },
    { id: 'invoke', label: 'ModelInvocation', detail: 'provider-agnostic SPI calls the agent endpoint' },
    { id: 'runs', label: 'EvaluationRuns', detail: 'output, latency, cost, tokens — one per item' },
    { id: 'results', label: 'Results × metrics', detail: 'one atomic score per metric, per run' },
    { id: 'summary', label: 'Job summary', detail: 'one precomputed row feeds benchmarks, regressions, analytics' },
  ],
  scaleNotes: [
    {
      title: 'Insert-only hot path',
      body: 'A running job appends rows; nothing is updated in place except progress counters. High-volume inserts are the workload the schema is tuned for.',
    },
    {
      title: 'Designed for millions of results',
      body: 'Runs and results partition naturally by job id. "Millions" is the explicit design target the hierarchy is sized for — a target, not a measured benchmark.',
    },
    {
      title: 'Queue-ready by seam, not rewrite',
      body: 'The executor is the only component that fans jobs out. Moving it behind a queue and a worker fleet is a contained change — schema and API stay put.',
    },
  ],
  metricTypes: [
    'EXACT_MATCH', 'CONTAINS', 'REGEX_MATCH', 'JSON_VALID', 'LENGTH',
    'LATENCY', 'COST', 'TOKEN_COUNT', 'NON_EMPTY',
  ],
  judgeMetrics: ['LLM_JUDGE', 'SEMANTIC_SIMILARITY', 'HALLUCINATION_DETECTION', 'CITATION_VERIFICATION'],
  benchmarkAxes: [
    { type: 'AGENT_VS_AGENT', what: 'different agents, same dataset / prompt / profile' },
    { type: 'VERSION_VS_VERSION', what: 'did the new deploy actually improve things?' },
    { type: 'PROMPT_VS_PROMPT', what: 'prompt versions against the same agent' },
    { type: 'MODEL_VS_MODEL', what: 'different providers or models behind the agents' },
    { type: 'DATASET_VS_DATASET', what: 'the same agent on different datasets' },
    { type: 'PROFILE_VS_PROFILE', what: 'the same runs under different thresholds' },
  ],
}

// ---------------------------------------------------------------------------
// Architecture: modular monolith + module explorer
// ---------------------------------------------------------------------------

export const architecture = {
  eyebrow: 'Fig. 03 — architecture',
  title: 'A modular monolith with microservice fault lines.',
  subhead:
    'One deployable today; strict module boundaries so extraction later is mechanical, not archaeological. No cross-module JPA associations, no shared repositories — modules reference each other by UUID and published services only.',
  layers: [
    { name: 'web/', detail: 'thin controllers · record DTOs · MapStruct mappers · OpenAPI' },
    { name: 'service/', detail: 'use cases · transactions · access guards · invariants' },
    { name: 'domain/', detail: 'JPA entities · enums · value objects — matches the schema exactly' },
    { name: 'repository/', detail: 'Spring Data JPA · private to its module, never shared' },
  ],
  boundaryRules: [
    'No cross-module JPA associations — evaluation stores a plain UUID agentId, never a @ManyToOne Agent',
    'No shared repositories — reads go through the owning module’s published service',
    'The database is the source of truth — Flyway owns the schema, Hibernate only validates it',
  ],
}

// Module explorer — grouped by delivery phase. Summaries from the Core Domains table.
export const modulePhases = [
  {
    phase: 'Phase 1',
    name: 'Foundation',
    summary: 'Identity, multi-tenancy and access control.',
    modules: [
      { id: 'auth', label: 'auth', detail: 'Register/login, JWT issuance, rotating refresh tokens, email verification, OTP password change.' },
      { id: 'user', label: 'user', detail: 'Profiles, platform roles (USER/ADMIN), credentials.' },
      { id: 'organization', label: 'organization', detail: 'The tenancy boundary — membership and OWNER > ADMIN > MEMBER roles.' },
      { id: 'project', label: 'project', detail: 'The workspace every resource is scoped to.' },
      { id: 'apikey', label: 'apikey', detail: 'Project-scoped programmatic keys, SHA-256-hashed, shown once.' },
    ],
  },
  {
    phase: 'Phase 2',
    name: 'Agent Registry',
    summary: 'Agent as the central aggregate root.',
    modules: [
      { id: 'agent', label: 'agent', detail: 'Framework-agnostic agents with versions, AES-256-GCM-encrypted credentials, tags and provider-aware health checks. Everything else attaches to an agent by id.' },
    ],
  },
  {
    phase: 'Phase 3',
    name: 'Intelligence Layer',
    summary: 'The modules that turn a registry into an engineering platform.',
    modules: [
      { id: 'dataset', label: 'dataset', detail: 'Immutable, versioned evaluation inputs — CSV/JSON import, per-version statistics.' },
      { id: 'prompt', label: 'prompt', detail: 'Prompt library with {{variable}} templates, activate/rollback and version comparison.' },
      { id: 'model', label: 'model', detail: 'The provider-agnostic invocation SPI — no tables, pure machinery. ModelInvoker, ModelInvocationService, AgentEndpointInvoker.' },
      { id: 'evaluation', label: 'evaluation', detail: 'EvaluationJob → EvaluationRun → EvaluationResult, plus reusable metric/threshold profiles.' },
      { id: 'benchmark', label: 'benchmark', detail: 'Leaderboards over precomputed job summaries, across six comparison axes. Plus a gallery of 8 one-click starter templates.' },
      { id: 'regression', label: 'regression', detail: 'Baseline-vs-candidate job comparison against thresholds.' },
      { id: 'analytics', label: 'analytics', detail: 'Cost / latency / token / usage aggregates and historical trends (read models).' },
      { id: 'report', label: 'report', detail: 'Audit records with JSON/CSV/HTML export — injection-safe rendering.' },
      { id: 'search', label: 'search', detail: 'Global search across agents, datasets, prompts, jobs, benchmarks and reports.' },
      { id: 'dashboard', label: 'dashboard', detail: 'The aggregate operational view of the whole platform.' },
    ],
  },
  {
    phase: 'Phase 4',
    name: 'AI Engineering Advisor',
    summary: 'Turning measurement into advice — computed on read, never persisted.',
    modules: [
      { id: 'advisor', label: 'advisor', detail: 'Five pure sub-advisors (prompt, model, cost, agent, RAG) composed into ranked recommendations. No tables — computed on read.' },
      { id: 'rootcause', label: 'rootcause', detail: 'A pure engine that turns failed runs and regressions into diagnoses with evidence and remediation. No tables.' },
      { id: 'debugger', label: 'debugger', detail: 'Reconstructs a 7-stage per-run execution timeline; unobserved stages are honestly NOT_INSTRUMENTED.' },
      { id: 'knowledge', label: 'knowledge', detail: 'The Engineering Knowledge Graph — failure modes, regressions and remediations as typed, weighted nodes and edges.' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Provider / framework neutrality (drives the SPI diagram)
// ---------------------------------------------------------------------------

export const neutrality = {
  eyebrow: 'Fig. 04 — provider & framework agnostic',
  title: 'One SPI. Any provider. Any framework.',
  subhead:
    'Business logic never touches a provider SDK. Callers invoke through ModelInvocationService; concrete invokers are an extension point — adding one is code-only, because providers and frameworks are text-backed enums with no schema coupling.',
  spi: {
    dispatcher: 'ModelInvocationService',
    contract: 'ModelInvoker',
    shipped: 'AgentEndpointInvoker — evaluates any agent that speaks HTTP',
  },
  providers: [
    'OpenAI', 'Anthropic', 'Google Gemini', 'Groq', 'Ollama', 'OpenRouter', 'DeepSeek',
    'Azure OpenAI', 'AWS Bedrock', 'Google Vertex', 'Mistral', 'Cohere', 'Hugging Face',
  ],
  frameworks: [
    'Spring AI', 'LangGraph', 'CrewAI', 'AutoGen', 'PydanticAI', 'Semantic Kernel', 'Custom REST / HTTP',
  ],
}

// ---------------------------------------------------------------------------
// Security
// ---------------------------------------------------------------------------

export const security = {
  eyebrow: 'Security',
  title: 'Multi-tenant isolation, enforced — not assumed.',
  items: [
    {
      title: 'IDOR as 404',
      body: 'Every aggregate resolves by its full (id, projectId, organizationId) tuple. A foreign id is indistinguishable from a missing one — the API never confirms a resource the caller cannot see.',
    },
    {
      title: 'Encryption doctrine',
      body: 'Verification secrets are hashed (BCrypt, SHA-256); usage secrets the platform must present upstream are encrypted (AES-256-GCM, versioned ciphertext for key rotation). Never logged, never returned.',
    },
    {
      title: 'SSRF defence in depth',
      body: 'Agent endpoints are user-supplied URLs the platform calls outbound. Syntactic validation on write; a runtime OutboundUrlGuard re-resolves every call and blocks private, loopback and metadata targets.',
    },
    {
      title: 'Mass assignment: impossible',
      body: 'Request DTOs are records that omit every server-controlled field — a client physically cannot set ids, tenancy keys, status or audit columns.',
    },
    {
      title: 'RBAC + stateless auth',
      body: 'OWNER > ADMIN > MEMBER enforced centrally in the service layer; short-lived JWTs with rotating refresh tokens; password change revokes every session; API keys hashed and shown once.',
    },
    {
      title: 'Leak-free error contract',
      body: 'One GlobalExceptionHandler renders a stable ApiError shape. No stack trace ever leaves the process; correlation IDs make incidents traceable without exposing secrets.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Tech stack — layered, not badges
// ---------------------------------------------------------------------------

export const stack = {
  eyebrow: 'Technology',
  title: 'The stack, as it is layered in production.',
  groups: [
    {
      name: 'Backend',
      items: [
        { tech: 'Java 21 · Spring Boot 3.4', note: 'records, sealed types, virtual-thread-ready' },
        { tech: 'PostgreSQL + Flyway', note: 'schema as source of truth, ddl-auto=validate' },
        { tech: 'Redis', note: 'rate limiting, caching, token revocation' },
        { tech: 'Spring Security + JWT', note: 'rotating refresh tokens, API keys' },
        { tech: 'MapStruct · springdoc-openapi', note: 'generated mappers, typed API surface' },
      ],
    },
    {
      name: 'Frontend',
      items: [
        { tech: 'Next.js 15 · React 19 · TypeScript', note: 'App Router' },
        { tech: 'Tailwind + shadcn/Radix', note: 'CSS-variable design system' },
        { tech: 'TanStack Query · Zustand', note: 'server state with transparent token refresh' },
        { tech: 'React Hook Form + Zod', note: 'schemas shared between form and API' },
      ],
    },
    {
      name: 'AI layer',
      items: [
        { tech: 'ModelInvoker SPI', note: '13 providers modeled — OpenAI, Anthropic, Gemini, Groq, Ollama…' },
        { tech: 'Evaluation engine', note: 'deterministic + LLM-judge metric strategies' },
        { tech: 'Benchmark engine', note: 'leaderboards from precomputed summaries' },
      ],
    },
    {
      name: 'Infrastructure',
      items: [
        { tech: 'Docker Compose', note: 'api · postgres · redis · web' },
        { tech: 'AWS EC2 + Nginx + Let’s Encrypt', note: 'self-hosted API, TLS, reverse proxy' },
        { tech: 'Vercel', note: 'frontend at broksforge.gokul.quest' },
        { tech: 'Prometheus + structured logs', note: 'Micrometer metrics, ECS-JSON logging, correlation IDs' },
      ],
    },
  ],
}

// Deployment topology (drives the deployment diagram).
export const deployment = {
  eyebrow: 'Fig. 05 — production',
  title: 'Deployed and operated, end to end.',
  subhead:
    'Not a localhost project. The API runs on AWS EC2 behind Nginx with Let’s Encrypt TLS; the frontend ships from Vercel. Postgres and Redis are never exposed publicly — only Nginx binds host ports.',
  nodes: [
    { id: 'user', label: 'Browser', sub: 'broksforge.gokul.quest' },
    { id: 'vercel', label: 'Vercel', sub: 'Next.js 15 frontend' },
    { id: 'nginx', label: 'Nginx + TLS', sub: 'api.broksforge.gokul.quest' },
    { id: 'api', label: 'Spring Boot API', sub: 'Docker · AWS EC2' },
    { id: 'data', label: 'Postgres · Redis', sub: 'internal network only' },
  ],
  practices: [
    '12-factor config — the app fails fast if a required secret is missing',
    'Flyway migrates on boot; an entity/schema mismatch aborts startup',
    'Stateless app tier — scales horizontally without sticky sessions',
    'Kubernetes-grade liveness/readiness probes; readiness reflects DB reachability',
  ],
}

// ---------------------------------------------------------------------------
// Engineering philosophy (from the Master Architecture, condensed)
// ---------------------------------------------------------------------------

export const philosophy = {
  eyebrow: 'Engineering philosophy',
  title: 'Non-negotiables, reflected in code and schema.',
  principles: [
    { title: 'The agent is the centre of gravity', body: 'One stable aggregate root every module attaches to — nothing invents its own notion of "the thing under test."' },
    { title: 'The database is the source of truth', body: 'Flyway owns the schema; entities conform to it; migrations are append-only and never edited.' },
    { title: 'Provider neutrality is a hard rule', body: 'Anything provider-specific lives behind the SPI. Text-backed enums keep new providers migration-free.' },
    { title: 'Secrets are sacred', body: 'Hash what you verify, encrypt what you must present upstream, log neither.' },
    { title: 'Immutability where correctness depends on it', body: 'Dataset, prompt and agent versions never change — results stay reproducible and attributable.' },
    { title: 'Fail safe, fail loud, leak nothing', body: 'Optimistic locking, fail-fast startup on missing secrets, sanitized error contract.' },
    { title: 'Computed on read, never stale', body: 'Recommendations, diagnoses and leaderboards are derived from current data each request — they can never drift.' },
    { title: 'Honest observability', body: 'Stages the platform cannot see yet are NOT_INSTRUMENTED — reported, never faked.' },
  ],
}

// ---------------------------------------------------------------------------
// Timeline + roadmap
// ---------------------------------------------------------------------------

export const timeline = {
  eyebrow: 'Delivery',
  title: 'Four phases to v1.0.',
  phases: [
    { name: 'Phase 1 — Foundation', detail: 'Auth, users, organizations, projects, API keys. Multi-tenancy and RBAC from day one.' },
    { name: 'Phase 2 — Agent Registry', detail: 'Agent as the central aggregate: versioning, encrypted credentials, health checks.' },
    { name: 'Phase 3 — Intelligence Layer', detail: 'Datasets, prompts, the invocation SPI, evaluation, benchmarking, regression, analytics, reports, search, dashboard.' },
    { name: 'Phase 4 — AI Engineering Advisor', detail: 'Advisor, root-cause engine, AI debugger, knowledge graph — measurement becomes advice.' },
    { name: 'v1.0 — Production hardening', detail: 'Prometheus metrics, structured logging, health probes, OTP flows, provider-aware health checks, EC2 deployment.' },
  ],
}

export const roadmap = {
  eyebrow: 'Roadmap',
  title: 'What v1.x is for.',
  items: [
    { title: 'Async evaluation workers', body: 'Move the executor seam behind a queue and a horizontally-scaled worker fleet.' },
    { title: 'Live tracing', body: 'Drive the TraceRecorder seam with real per-stage spans — lighting up the AI Debugger’s NOT_INSTRUMENTED stages.' },
    { title: 'OpenTelemetry export', body: 'IDs and structure are already in place; wiring exporters is config, not domain change.' },
    { title: 'Provider-direct invokers', body: 'OpenAI/Anthropic/Gemini clients as additional ModelInvoker implementations behind the same SPI.' },
    { title: 'Backend test suite', body: 'JUnit + Testcontainers coverage for RBAC, IDOR-as-404, SSRF and encryption paths. Documented strategy; honest gap today.' },
    { title: 'SDK & CLI', body: 'Programmatic access for CI pipelines — evaluate on every merge.' },
  ],
  honesty:
    'Calibrated claims, on purpose: counts on this page are from the repo; "millions of evaluations" is the stated design target of the schema, not a measured benchmark; the backend test suite is documented but not yet implemented.',
}
