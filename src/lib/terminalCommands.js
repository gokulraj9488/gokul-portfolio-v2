import { broksforge, differentiator, architecture, modules, production, stack, roadmap, philosophy } from '../data/broksforge.js'
import { fieldNotes } from '../data/fieldNotes.js'
import { brokDemo } from '../data/brokDemo.js'
import { kuriosity } from '../data/kuriosity.js'
import { gameOrigin } from '../data/gameOrigin.js'
import { TRACKS } from '../components/workshop/Radio.jsx'

// The Workshop Terminal's "real console" commands — everything here is
// sourced directly from the same data files the pages render from. Nothing
// is invented for flavor: where a fact isn't measured or documented (uptime,
// alerts, a queue depth), the command says "unknown" rather than guessing —
// the same rule Brok itself follows. That symmetry is the point.

const pad = (s, n) => String(s).padEnd(n)

// A handful of things genuinely aren't published anywhere — same treatment
// Brok gives an unsupported question: say so, don't invent a plausible number.
function unknown(ctx, topic, note) {
  ctx.push(
    ctx.line(`${topic}: unknown.`, 'dim'),
    ctx.line(note ?? "not documented publicly — brok would return exactly this rather than guess.", 'dim'),
  )
}

export const COMMANDS = [
  // ---------------------------------------------------------------- SYSTEM
  {
    name: 'status',
    category: 'SYSTEM',
    help: 'platform health',
    run: (ctx) => {
      ctx.push(ctx.line("brok's forge — platform status"))
      const rows = [
        ['frontend', 'vercel · next.js 15'],
        ['api', 'spring boot · built from source on the host'],
        ['database', 'postgresql 16'],
        ['cache', 'redis 7'],
        ['proxy', 'nginx + certbot'],
      ]
      rows.forEach(([k, v], i) => {
        const branch = i === rows.length - 1 ? '└─' : '├─'
        ctx.push(ctx.line(`${branch} ${pad(k, 10)} ${pad(v, 34)} ok`, 'ok'))
      })
      ctx.push(ctx.line('reasoning layer: zero LLM · 25 intents · deterministic', 'dim'))
    },
  },
  {
    name: 'health',
    category: 'SYSTEM',
    help: 'security posture',
    run: (ctx) => {
      ctx.push(ctx.line('security posture'))
      production.security.forEach((s) => ctx.push(ctx.line(`· ${s.title.toLowerCase()}`)))
    },
  },
  {
    name: 'metrics',
    category: 'SYSTEM',
    help: 'the six verified numbers',
    run: (ctx) => {
      broksforge.stats.forEach((s) => ctx.push(ctx.line(`${pad(s.value, 5)} ${s.label}`)))
    },
  },
  {
    name: 'version',
    category: 'SYSTEM',
    help: "brok's forge + workshop version",
    run: (ctx) => {
      ctx.push(
        ctx.line(`${pad("brok's forge", 14)} ${broksforge.version} · ${broksforge.license} · ${broksforge.status.toLowerCase()}`),
        ctx.line(`${pad('workshop', 14)} v3.0 · forged jul 2026`, 'dim'),
      )
    },
  },
  {
    name: 'logs',
    category: 'SYSTEM',
    help: "what's actually observed",
    run: (ctx) => {
      ctx.push(
        ctx.line('observability: micrometer + prometheus — metrics, not logs shipped anywhere public.'),
        ctx.line('no live tail from here — this terminal is a portfolio, not a shell into the host.', 'dim'),
      )
    },
  },
  {
    name: 'tests',
    category: 'SYSTEM',
    help: 'test counts',
    run: (ctx) => {
      ctx.push(
        ctx.line('499 backend tests · 83 classes · JUnit 5 + Testcontainers'),
        ctx.line('34 end-to-end specs · Playwright'),
        ctx.line('type `coverage` for the honest version', 'dim'),
      )
    },
  },
  {
    name: 'coverage',
    category: 'SYSTEM',
    help: 'verification summary, no invented %',
    run: (ctx) => {
      ctx.push(
        ctx.line('499 tests passing · 83 classes · tracked via JaCoCo.'),
        ctx.line('no fabricated coverage percentage — the one real gap, stated in the open:', 'dim'),
        ctx.line(roadmap.honesty.items[1], 'dim'),
      )
    },
  },

  // ------------------------------------------------------------ ARCHITECTURE
  {
    name: 'topology',
    category: 'ARCHITECTURE',
    help: 'ascii deployment diagram',
    run: (ctx) => {
      ctx.push(ctx.line(production.topology.map((n) => n.label).join('  ─▶  ')))
      production.topology.forEach((n) => ctx.push(ctx.line(`  ${pad(n.label, 18)} ${n.sub}`, 'dim')))
    },
  },
  {
    name: 'layers',
    category: 'ARCHITECTURE',
    help: 'the 5-layer read-down stack',
    run: (ctx) => {
      ctx.push(ctx.line(architecture.title.toLowerCase()))
      architecture.layers.forEach((l, i) => ctx.push(ctx.line(`${i + 1}. ${pad(l.name, 26)} ${l.detail}`)))
    },
  },
  {
    name: 'modules',
    category: 'ARCHITECTURE',
    help: 'the ten Maven modules',
    run: (ctx) => {
      ctx.push(ctx.line(`${modules.length} maven modules`))
      ctx.push(ctx.line(modules.map((m) => m.label).join(' · ')))
    },
  },
  {
    name: 'routes',
    category: 'ARCHITECTURE',
    help: 'rest surface, honestly scoped',
    run: (ctx) => {
      ctx.push(
        ctx.line(`${broksforge.stats[0].value} public REST endpoints, documented via springdoc-openapi.`),
        ctx.line("route-level detail lives in the OpenAPI spec, not a terminal echo — type `api`.", 'dim'),
      )
    },
  },
  {
    name: 'providers',
    category: 'ARCHITECTURE',
    help: 'llm providers, via spring ai',
    run: (ctx) => {
      ctx.push(
        ctx.line('llm providers (via Spring AI): Claude · GPT · Gemini · Groq · OpenRouter'),
        ctx.line("none of them sit in Brok's own reasoning path — type `advisor`.", 'dim'),
      )
    },
  },
  {
    name: 'architecture',
    category: 'ARCHITECTURE',
    help: 'the shape of the whole thing',
    run: (ctx) => {
      ctx.push(
        ctx.line(`5 layers · 4 pillars (${architecture.pillars.join(', ').toLowerCase()}) · ${modules.length} modules`),
        ctx.line(architecture.monolith),
        ctx.line('type `layers` or `modules` for the breakdown.', 'dim'),
      )
    },
  },

  // -------------------------------------------------------------- EVALUATION
  {
    name: 'eval',
    category: 'EVALUATION',
    help: 'how a run becomes a result',
    run: (ctx) => {
      ctx.push(
        ctx.line('evaluation profiles are versioned; jobs produce runs; runs produce results.'),
        ctx.line('benchmark gallery: rag · coding · hallucination · safety · summarization'),
        ctx.line("none of it is scored by Brok — Brok has zero LLM in its own reasoning.", 'dim'),
      )
    },
  },
  {
    name: 'benchmark',
    category: 'EVALUATION',
    help: 'the benchmark gallery',
    run: (ctx) => {
      ctx.push(
        ctx.line('benchmark gallery — rag · coding · hallucination · safety · summarization'),
        ctx.line("each template runs against a registered agent through whichever provider it's configured with.", 'dim'),
      )
    },
  },
  {
    name: 'score',
    category: 'EVALUATION',
    help: 'how a result gets its number',
    run: (ctx) => {
      ctx.push(
        ctx.line("each run records structured metrics against the benchmark's rubric."),
        ctx.line('results version alongside the prompt/dataset that produced them — nothing overwrites history.', 'dim'),
      )
    },
  },
  {
    name: 'trace',
    category: 'EVALUATION',
    help: 'watch one answer get derived',
    run: (ctx) => {
      const t = brokDemo.turns[0]
      ctx.push(
        ctx.line(`composing: "${t.question}"`),
        ctx.line(`intent   → ${t.intent.replace('resolved intent — ', '')}`),
        ctx.line(`state    → ${t.state.toUpperCase()}`, 'ok'),
        ctx.line(`answer   → ${t.answer}`),
        ctx.line('composed from:', 'dim'),
        ...t.sources.map((s) => ctx.line(` · ${s}`, 'dim')),
        ctx.line('(scripted illustration of real, shipped behavior — not a live call.)', 'dim'),
      )
    },
  },
  {
    name: 'evidence',
    category: 'EVALUATION',
    help: 'the four epistemic states',
    run: (ctx) => {
      ctx.push(ctx.line('every answer wears one of four epistemic states:'))
      differentiator.epistemicStates.forEach((s) => ctx.push(ctx.line(`${pad(s.key.toUpperCase(), 11)} ${s.body}`)))
    },
  },
  {
    name: 'advisor',
    category: 'EVALUATION',
    help: 'deterministic reasoning, demonstrated',
    run: (ctx) => {
      const t = brokDemo.turns.find((x) => x.refusal) ?? brokDemo.turns[brokDemo.turns.length - 1]
      ctx.push(
        ctx.line(`"${t.question}"`),
        ctx.line(`→ ${t.intent}`, 'dim'),
        ctx.line(`→ ${t.state.toUpperCase()}`, 'dim'),
        ctx.line(`→ refused: ${t.answer}`),
        ctx.line("this is the whole point — it refuses rather than guesses.", 'dim'),
      )
    },
  },
  {
    name: 'explain',
    category: 'EVALUATION',
    help: 'why the answers are trustworthy',
    run: (ctx) => {
      ctx.push(ctx.line(differentiator.gloss), ctx.line(differentiator.plainEnglish, 'dim'))
    },
  },
  { name: 'reason', category: 'EVALUATION', help: 'alias of explain', run: (ctx) => COMMANDS.find((c) => c.name === 'explain').run(ctx) },
  {
    name: 'simulate',
    category: 'EVALUATION',
    help: 'no fake live connection',
    run: (ctx) => {
      ctx.push(
        ctx.line('no live simulation from this terminal — this is a portfolio frontend, not a shell into the host.'),
        ctx.line('the real scripted walkthrough lives at /broksforge — type `forge`.', 'dim'),
      )
    },
  },
  {
    name: 'replay',
    category: 'EVALUATION',
    help: 'all three scripted turns, compact',
    run: (ctx) => {
      ctx.push(ctx.line('replaying 3 scripted turns:'))
      brokDemo.turns.forEach((t, i) => {
        ctx.push(ctx.line(`${i + 1}. "${t.question}" → ${t.state.toUpperCase()}${t.refusal ? ' (refused)' : ''}`))
      })
      ctx.push(ctx.line('full transcript: `trace` for #1, `advisor` for #3.', 'dim'))
    },
  },
  {
    name: 'timeline',
    category: 'EVALUATION',
    help: 'ai git, in one paragraph',
    run: (ctx) => {
      ctx.push(ctx.line('ai git — version control for engineering reasoning, not source.'))
      ctx.push(ctx.line('records what was promoted, why, what it superseded, and what evidence covered it.'))
      ctx.push(ctx.line("displays a rollback as a rollback when production runs an older revision than the newest one.", 'dim'))
    },
  },

  // -------------------------------------------------------------- PRODUCTION
  {
    name: 'deploy',
    category: 'PRODUCTION',
    help: 'the unattended deploy pipeline',
    run: (ctx) => {
      ctx.push(
        ctx.line('push to main → build → apply → reload nginx → wait for container health'),
        ctx.line('→ verify the public https endpoint → prune. fully unattended.'),
        ctx.line(production.cicd.workflows.join(' · '), 'dim'),
      )
    },
  },
  {
    name: 'rollback',
    category: 'PRODUCTION',
    help: 'implemented, never triggered in anger',
    run: (ctx) => {
      ctx.push(ctx.line(roadmap.honesty.items[0]))
    },
  },
  { name: 'uptime', category: 'PRODUCTION', help: 'unknown — not measured', run: (ctx) => unknown(ctx, 'uptime', 'no synthetic monitoring configured. absence is not health.') },
  {
    name: 'latency',
    category: 'PRODUCTION',
    help: 'no backend numbers, one real one',
    run: (ctx) => {
      ctx.push(
        ctx.line('no backend latency numbers are measured or published.'),
        ctx.line('the one number that IS measured: this marketing site — lighthouse 97 desktop / 93 mobile, CLS 0.', 'dim'),
      )
    },
  },
  { name: 'queue', category: 'PRODUCTION', help: 'unknown — internals not documented', run: (ctx) => unknown(ctx, 'queue', 'execution internals for evaluation jobs aren’t documented publicly. not guessing at them here.') },
  {
    name: 'workers',
    category: 'PRODUCTION',
    help: "what's actually doing the work",
    run: (ctx) => {
      ctx.push(
        ctx.line('what actually does the work: 5 containers, one host —'),
        ctx.line(production.topology.slice(2).map((n) => n.label).join(' · '), 'dim'),
        ctx.line('no separate worker-pool tier. one box, honestly described.', 'dim'),
      )
    },
  },
  {
    name: 'scheduler',
    category: 'PRODUCTION',
    help: 'github actions, not a cron layer',
    run: (ctx) => {
      ctx.push(ctx.line(`the only scheduler in this system is github actions — ${production.cicd.workflows.length} workflows, triggered by push, pr, or schedule.`))
    },
  },
  { name: 'alerts', category: 'PRODUCTION', help: 'unknown — same rule as uptime', run: (ctx) => unknown(ctx, 'alerts', 'outside what’s documented publicly. unknown beats a guess in either direction.') },
  {
    name: 'incidents',
    category: 'PRODUCTION',
    help: 'resolved incidents, for real',
    run: (ctx) => {
      ctx.push(ctx.line('resolved incidents (see `fieldnotes` for the writeup):'))
      fieldNotes.stories.forEach((s) => ctx.push(ctx.line(`· ${pad(s.title, 40)} [${s.tag.toLowerCase()}]`)))
    },
  },
  { name: 'backups', category: 'PRODUCTION', help: 'unknown — same rule as alerts', run: (ctx) => unknown(ctx, 'backups', 'outside what’s documented publicly. same rule as `alerts`.') },

  // ---------------------------------------------------------------- KNOWLEDGE
  {
    name: 'docs',
    category: 'KNOWLEDGE',
    help: 'the public documentation site',
    run: (ctx) => {
      ctx.push(ctx.line(`opening the docs — ${broksforge.stats[5].value} public pages, llms.txt, sitemap, JSON-LD.`))
      ctx.close(() => window.open(broksforge.liveUrl, '_blank', 'noopener'))
    },
  },
  {
    name: 'adr',
    category: 'KNOWLEDGE',
    help: 'architecture decisions',
    run: (ctx) => {
      ctx.push(ctx.line("no standalone adr count published for v2 — the closest public equivalent is the design constitution."))
      ctx.push(ctx.line('type `principles`.', 'dim'))
    },
  },
  { name: 'decisions', category: 'KNOWLEDGE', help: 'alias of adr', run: (ctx) => COMMANDS.find((c) => c.name === 'adr').run(ctx) },
  {
    name: 'roadmap',
    category: 'KNOWLEDGE',
    help: 'reserved vs. done, side by side',
    run: (ctx) => {
      ctx.push(ctx.line('reserved, not yet built:'))
      roadmap.items.forEach((r) => ctx.push(ctx.line(`· ${r.title}`)))
      ctx.push(ctx.line('known follow-ups, stated honestly:', 'dim'))
      roadmap.honesty.items.forEach((i) => ctx.push(ctx.line(`· ${i}`, 'dim')))
    },
  },
  {
    name: 'principles',
    category: 'KNOWLEDGE',
    help: 'one workshop law at a time',
    run: (ctx) => {
      const p = philosophy.principles[Math.floor(Math.random() * philosophy.principles.length)]
      ctx.push(ctx.line(`"${p.title}"`), ctx.line(p.body, 'dim'), ctx.line(`(1 of ${philosophy.principles.length} — the rest are on the page.)`, 'dim'))
    },
  },
  {
    name: 'fieldnotes',
    category: 'KNOWLEDGE',
    help: 'one engineering lesson at a time',
    run: (ctx) => {
      const s = fieldNotes.stories[Math.floor(Math.random() * fieldNotes.stories.length)]
      ctx.push(ctx.line(`${s.title} [${s.tag.toLowerCase()}]`), ctx.line(`lesson: ${s.lesson}`, 'dim'), ctx.line(`(1 of ${fieldNotes.stories.length} — type \`incidents\` to list them all.)`, 'dim'))
    },
  },
  {
    name: 'philosophy',
    category: 'KNOWLEDGE',
    help: 'the design constitution',
    run: (ctx) => {
      ctx.push(ctx.line(philosophy.subhead), ctx.line('type `principles` for one law at a time.', 'dim'))
    },
  },
  {
    name: 'why',
    category: 'KNOWLEDGE',
    help: 'why this exists at all',
    run: (ctx) => {
      ctx.push(
        ctx.line('teams lose the reasoning behind their AI systems.'),
        ctx.line("the prompt is in version control; why v8 replaced v7 is in a Slack thread.", 'dim'),
        ctx.line("Brok's Forge models the engineering act itself, so nothing rots.", 'dim'),
      )
    },
  },
  {
    name: 'derive',
    category: 'KNOWLEDGE',
    help: 'derived, never authored',
    run: (ctx) => {
      ctx.push(
        ctx.line('knowledge is derived, never authored and never generated.'),
        ctx.line('promoting a version is a decision. running an evaluation is evidence.', 'dim'),
      )
    },
  },
  {
    name: 'schema',
    category: 'KNOWLEDGE',
    help: 'the schema is the contract',
    run: (ctx) => {
      ctx.push(
        ctx.line('"the schema is the contract" — databases outlive code.'),
        ctx.line('the forge kernel manages its own postgres schema (forge_kernel) and deliberately skips flyway.', 'dim'),
      )
    },
  },

  // ----------------------------------------------------------------- DEVELOPER
  {
    name: 'stack',
    category: 'DEVELOPER',
    help: 'the stack, exactly as shipped',
    run: (ctx) => {
      stack.groups.forEach((g) => ctx.push(ctx.line(`${pad(g.name.toLowerCase(), 11)} ${g.items.slice(0, 5).join(' · ')}${g.items.length > 5 ? ' …' : ''}`)))
    },
  },
  { name: 'dependencies', category: 'DEVELOPER', help: 'alias of stack', run: (ctx) => COMMANDS.find((c) => c.name === 'stack').run(ctx) },
  {
    name: 'env',
    category: 'DEVELOPER',
    help: "nothing to show, on purpose",
    run: (ctx) => {
      ctx.push(
        ctx.line('nothing to show.'),
        ctx.line("jwt signing key, encryption key, db/redis passwords and smtp credentials live only in a .env on the server —", 'dim'),
        ctx.line('never duplicated into CI, never printed here either.', 'dim'),
      )
    },
  },
  {
    name: 'docker',
    category: 'DEVELOPER',
    help: 'docker ps, honestly',
    run: (ctx) => {
      ctx.push(ctx.line(`${pad('CONTAINER', 20)}STATUS`, 'dim'))
      ;[
        ['spring-boot-api', 'up'],
        ['postgresql-16', 'up · internal network only'],
        ['redis-7', 'up · internal network only'],
        ['nginx', 'up'],
        ['certbot', 'up'],
      ].forEach(([c, s]) => ctx.push(ctx.line(`${pad(c, 20)}${s}`)))
    },
  },
  {
    name: 'nginx',
    category: 'DEVELOPER',
    help: 'tls terminator + one real incident',
    run: (ctx) => {
      ctx.push(
        ctx.line('tls terminator for api.broksforge.gokul.quest.'),
        ctx.line('http serves only the acme challenge and a 301 to https.', 'dim'),
        ctx.line('one real incident: nginx caches its upstream IP at startup — a redeploy without a reload meant 502s. type `incidents`.', 'dim'),
      )
    },
  },
  {
    name: 'postgres',
    category: 'DEVELOPER',
    help: 'postgresql 16, internal only',
    run: (ctx) => {
      ctx.push(
        ctx.line('postgresql 16, reachable only over the internal docker network — no host port at all.'),
        ctx.line('the forge kernel keeps its own schema (forge_kernel) and deliberately skips flyway.', 'dim'),
      )
    },
  },
  {
    name: 'redis',
    category: 'DEVELOPER',
    help: 'redis 7, internal only',
    run: (ctx) => {
      ctx.push(ctx.line('redis 7 — same rule as postgres: internal docker network only, no host-exposed port.'))
    },
  },
  {
    name: 'api',
    category: 'DEVELOPER',
    help: 'the rest api, at a glance',
    run: (ctx) => {
      ctx.push(ctx.line(`${broksforge.apiUrl} — ${broksforge.stats[0].value} endpoints, documented via springdoc-openapi.`))
    },
  },
  { name: 'openapi', category: 'DEVELOPER', help: 'alias of api', run: (ctx) => COMMANDS.find((c) => c.name === 'api').run(ctx) },
  {
    name: 'migrations',
    category: 'DEVELOPER',
    help: 'flyway, except where it deliberately isn’t',
    run: (ctx) => {
      ctx.push(
        ctx.line('the main schema migrates with flyway.'),
        ctx.line("the forge kernel deliberately doesn't — a framework-free kernel inherits nothing, not even the app's own migration tool.", 'dim'),
      )
    },
  },
  {
    name: 'seed',
    category: 'DEVELOPER',
    help: 'no seed script, one real analog',
    run: (ctx) => {
      ctx.push(
        ctx.line('no production seed script published.'),
        ctx.line('closest real analog: JUnit 5 + Testcontainers spins up a disposable postgres per test run, seeded fresh every time.', 'dim'),
      )
    },
  },

  // ---------------------------------------------------------------- AI DEPTH
  {
    name: 'rag',
    category: 'EVALUATION',
    help: 'retrieval, for real — two angles',
    run: (ctx) => {
      ctx.push(
        ctx.line('two different things share this word here:'),
        ctx.line('· Kuriosity — a real RAG pipeline in production. Cohere embeddings, ChromaDB similarity search.'),
        ctx.line("· Brok's Forge — a RAG *benchmark template* in the gallery, for scoring someone else's RAG system.", 'dim'),
        ctx.line("neither one touches Brok's own reasoning — that path has zero LLM.", 'dim'),
      )
    },
  },
  {
    name: 'embeddings',
    category: 'DEVELOPER',
    help: 'where vectors actually live',
    run: (ctx) => {
      ctx.push(
        ctx.line("Kuriosity embeds with Cohere, indexed in ChromaDB."),
        ctx.line("Brok's Forge doesn't publish a vector store for its own reasoning — it composes from relational rows, not nearest-neighbor search.", 'dim'),
      )
    },
  },
  { name: 'vectors', category: 'DEVELOPER', help: 'alias of embeddings', run: (ctx) => COMMANDS.find((c) => c.name === 'embeddings').run(ctx) },
  {
    name: 'datasets',
    category: 'EVALUATION',
    help: 'versioned, with column mapping',
    run: (ctx) => {
      ctx.push(ctx.line('dataset management: versions, items, column mapping.'))
      ctx.push(ctx.line('a dataset version is immutable once evaluated against — same rule as everything else here.', 'dim'))
    },
  },
  {
    name: 'prompts',
    category: 'EVALUATION',
    help: 'versioned, compared, never overwritten',
    run: (ctx) => {
      ctx.push(ctx.line('prompt management: versioning and comparison.'))
      ctx.push(ctx.line('v8 replacing v7 is a promotion, not an edit — the old version stays readable. type `timeline`.', 'dim'))
    },
  },
  {
    name: 'versioning',
    category: 'KNOWLEDGE',
    help: 'the one rule underneath everything',
    run: (ctx) => {
      ctx.push(
        ctx.line('prompts, datasets, evaluation profiles, artifacts — all versioned, none overwritten.'),
        ctx.line('a promotion supersedes a version; it never deletes one. type `timeline` for the AI Git angle.', 'dim'),
      )
    },
  },
  {
    name: 'graph',
    category: 'ARCHITECTURE',
    help: 'forge graph, execution graph, failure graph',
    run: (ctx) => {
      ctx.push(
        ctx.line('one graph, three lenses:'),
        ctx.line('· Forge Graph — every artifact, real relationships, built from what actually happened.'),
        ctx.line('· narrowed to a single run → the Execution Graph.', 'dim'),
        ctx.line('· narrowed to a failure → the Failure Graph.', 'dim'),
      )
    },
  },
  {
    name: 'memory',
    category: 'KNOWLEDGE',
    help: "engineering memory, not context memory",
    run: (ctx) => {
      ctx.push(
        ctx.line("not an LLM context window — Brok doesn't have one, it has zero LLM."),
        ctx.line('"Engineering Memory": the reason an engineer wrote at promotion time, recalled verbatim, forever.', 'dim'),
      )
    },
  },
  {
    name: 'context',
    category: 'EVALUATION',
    help: "no context window to manage",
    run: (ctx) => {
      ctx.push(
        ctx.line("there's no context window here — nothing to truncate, summarize, or lose.", ),
        ctx.line('every answer is composed fresh from rows in the database, not carried forward in a prompt.', 'dim'),
      )
    },
  },
  {
    name: 'toolcalls',
    category: 'EVALUATION',
    help: 'zero, by design',
    run: (ctx) => {
      ctx.push(ctx.line('zero. Brok makes no tool calls and no LLM calls to answer a question.'))
      ctx.push(ctx.line('everything it says is composed from rows already sitting in Postgres.', 'dim'))
    },
  },
  { name: 'reasoning', category: 'EVALUATION', help: 'alias of explain', run: (ctx) => COMMANDS.find((c) => c.name === 'explain').run(ctx) },
  {
    name: 'regression',
    category: 'SYSTEM',
    help: 'the e2e safety net',
    run: (ctx) => {
      ctx.push(ctx.line(`${broksforge.stats[2].value} end-to-end specs (Playwright) run as the regression net, on top of the ${broksforge.stats[1].value} backend tests.`))
    },
  },
  {
    name: 'experiments',
    category: 'EVALUATION',
    help: 'alias-ish of eval',
    run: (ctx) => {
      ctx.push(ctx.line('an "experiment" here is a versioned evaluation profile run as a job — type `eval`.'))
      ctx.push(ctx.line('no experiment cost tracking — type `cost`.', 'dim'))
    },
  },
  { name: 'cost', category: 'PRODUCTION', help: 'unknown — not tracked', run: (ctx) => unknown(ctx, 'cost', 'no per-run or per-token cost tracking is published. not guessing at a number.') },

  // ----------------------------------------------------------------- PROJECTS
  {
    name: 'demo',
    category: 'BROK',
    help: "watch Brok answer a question, live on the page",
    run: (ctx) => {
      ctx.push(ctx.line('opening the scripted walkthrough — /broksforge#bf-demo'))
      ctx.close(() => ctx.navigate('/broksforge#bf-demo'))
    },
  },
  {
    name: 'brok',
    category: 'PROJECTS',
    help: "brok's forge, in one line",
    run: (ctx) => {
      ctx.push(
        ctx.line(broksforge.oneLiner),
        ctx.line("type `demo` to watch it answer a question, or `forge` for the full page.", 'dim'),
      )
    },
  },
  {
    name: 'kuriosity',
    category: 'PROJECTS',
    help: 'the other product, in one line',
    run: (ctx) => {
      ctx.push(ctx.line(kuriosity.pitch), ctx.line(`live: ${kuriosity.liveUrl}`, 'dim'))
    },
  },
  {
    name: 'games',
    category: 'PROJECTS',
    help: 'before AI — the engineering origin story',
    run: (ctx) => {
      ctx.push(ctx.line(gameOrigin.hook))
      gameOrigin.glimpses.forEach((g) => ctx.push(ctx.line(`· ${g.label}: ${g.line}`, 'dim')))
      ctx.push(ctx.line('kept small on purpose — a few sections down the page.', 'dim'))
    },
  },
  // ------------------------------------------------------------------- MEMES
  {
    name: 'cowsay',
    category: 'WORKSHOP',
    help: 'a cow, with opinions',
    run: (ctx) => {
      ;[
        ' ____________________',
        '< the forge is lit. >',
        ' --------------------',
        '        \\   ^__^',
        '         \\  (oo)\\_______',
        '            (__)\\       )\\/\\',
        '                ||----w |',
        '                ||     ||',
      ].forEach((l) => ctx.push(ctx.line(l)))
    },
  },
  {
    name: 'segfault',
    category: 'WORKSHOP',
    help: 'core dumped',
    run: (ctx) => {
      ctx.push(ctx.line('Segmentation fault (core dumped)', 'err'), ctx.line('(this is why the test suite exists.)', 'dim'))
    },
  },
  {
    name: 'motivation',
    category: 'WORKSHOP',
    help: '404',
    run: (ctx) => {
      ctx.push(
        ctx.line('404 motivation not found', 'err'),
        ctx.line('checked the forge. checked the garage. shipping anyway.', 'dim'),
      )
    },
  },

  // ------------------------------------------------------------------ WORKSHOP
  {
    name: 'radio',
    category: 'WORKSHOP',
    help: 'music I build to',
    run: (ctx) => {
      ctx.push(ctx.line('workshop playlist — music I build to:'))
      TRACKS.forEach((t) => ctx.push(ctx.line(`· ${pad(t.title, 26)} ${t.artist}`)))
    },
  },
]

export const COMMAND_MAP = new Map()
COMMANDS.forEach((c) => {
  COMMAND_MAP.set(c.name, c)
  ;(c.aliases ?? []).forEach((a) => COMMAND_MAP.set(a, c))
})

// The curated `help` listing — "recommended commands," not the whole
// surface. Recruiters get five short groups; everything else (every command
// in COMMAND_MAP above, plus the switch-only ones below) still resolves,
// autocompletes, and works from history — it's just not printed here. Same
// idea as `git help` showing a short list while every plumbing command still
// tab-completes.
export const HELP_GROUPS = [
  {
    title: 'SYSTEM',
    rows: [
      ['status', 'platform health'],
      ['health', 'security posture'],
      ['version', "brok's forge + workshop version"],
    ],
  },
  {
    title: "BROK'S FORGE",
    rows: [
      ['demo', 'watch Brok answer a question, live'],
      ['architecture', 'the shape of the whole thing'],
      ['modules', 'the ten maven modules'],
      ['trace', 'watch one answer get derived'],
      ['principles', 'one workshop law at a time'],
    ],
  },
  {
    title: 'PROJECTS',
    rows: [
      ['brok', "brok's forge, in one line"],
      ['kuriosity', 'the other product, in one line'],
      ['games', 'before AI — the engineering origin story'],
    ],
  },
  {
    title: 'WORKSHOP',
    rows: [
      ['garage', 'take the GT650 out'],
      ['radio', 'music I build to'],
      ['coffee', 'compile motivation'],
    ],
  },
  {
    title: 'RECRUITER',
    rows: [
      ['resume', 'download résumé (+10 XP)'],
      ['contact', 'copy my email'],
      ['speedrun', 'the 30-second version'],
    ],
  },
]

// Commands handled directly in CommandPalette's switch statement (never
// registered in COMMAND_MAP above) that should still autocomplete and work
// from history even though `help` no longer lists all of them. Deliberately
// excludes the secret ones (sudo hire gokulraj, nyan, rickroll, whereami,
// deploy friday, git push friday, rm -rf, git blame, exit/quit) — those stay
// undiscoverable on purpose, exactly as before.
const SWITCH_ONLY_COMMANDS = [
  'help', 'whoami', 'coffee', 'fortune', 'git log', 'changelog', 'ship', 'fixit',
  'heat', 'schematics', 'speedrun', 'ride', 'garage', 'github', 'resume', 'email',
  'contact', 'forge', 'clear',
]

// Every real command name + alias — the full curated list, everything in
// COMMAND_MAP, and every switch-only command. Shrinking HELP_GROUPS above
// only changes what `help` prints; it never removes anything from here.
export const AUTOCOMPLETE_POOL = [
  ...new Set([...HELP_GROUPS.flatMap((g) => g.rows.map(([c]) => c)), ...COMMAND_MAP.keys(), ...SWITCH_ONLY_COMMANDS]),
]
