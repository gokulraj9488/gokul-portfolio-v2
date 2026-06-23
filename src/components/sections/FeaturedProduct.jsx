import { motion } from 'framer-motion'
import { ExternalLink, Github, Send } from 'lucide-react'
import { kuriosity } from '../../data/kuriosity.js'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../ui/Reveal.jsx'
import Badge from '../ui/Badge.jsx'
import Card from '../ui/Card.jsx'
import PipelineDiagram from '../ui/PipelineDiagram.jsx'

// Lightweight, classy product preview inside a browser frame.
// Swap the inner mock for <video src={kuriosity.demo.video} ... /> once you record a demo loop.
function ProductWindow() {
  return (
    <div className="card overflow-hidden shadow-float">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-border-subtle bg-raised/60 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
        </span>
        <span className="mx-auto inline-flex items-center gap-2 rounded-md border border-border-subtle bg-ink/60 px-3 py-1 font-mono text-[0.72rem] text-tertiary">
          <span className="h-1.5 w-1.5 rounded-full bg-status" aria-hidden="true" />
          kuriosity.gokul.quest
        </span>
      </div>
      {/* mock app body */}
      <div className="relative space-y-4 p-5 sm:p-7">
        <div className="absolute right-5 top-5 hidden sm:block">
          <Badge tone="accent">Topic mastery · tracked</Badge>
        </div>
        {/* Kurio asks a grounded question */}
        <div className="flex max-w-md gap-3">
          <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full border-2 border-amber bg-amber/15 font-mono text-xs text-amber">
            K
          </span>
          <div className="rounded-2xl rounded-tl-sm border border-border-subtle bg-ink px-4 py-3">
            <p className="font-mono text-[0.7rem] uppercase tracking-wider text-tertiary">Kurio · the AI student</p>
            <p className="mt-1 text-sm text-primary">
              From your notes on RAG — what does the retriever actually hand to the LLM, and why
              does that stop it from hallucinating?
            </p>
          </div>
        </div>
        {/* evaluation chip */}
        <div className="ml-11 inline-flex flex-wrap items-center gap-2 rounded-xl border border-border-subtle bg-surface px-3 py-2">
          <span className="font-mono text-[0.72rem] text-tertiary">Last answer</span>
          <span className="font-mono text-sm font-medium text-status">86% accurate</span>
          <span className="text-tertiary">·</span>
          <span className="font-mono text-[0.72rem] text-secondary">revise: chunk overlap</span>
        </div>
        {/* composer */}
        <div className="flex items-center gap-2 rounded-xl border border-border-subtle bg-ink px-3 py-2.5">
          <span className="flex-1 text-sm text-tertiary">Type your answer…</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber text-ink" aria-hidden="true">
            <Send size={15} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedProduct() {
  return (
    <section id="kuriosity" className="section border-t border-border-subtle">
      <div className="container-edge">
        <SectionHeader
          eyebrow="Featured Product"
          title={`Kuriosity — ${kuriosity.tagline}`}
          subhead={kuriosity.pitch}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <Reveal>
            <ProductWindow />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-5">
            <Badge tone="live">
              <span className="h-1.5 w-1.5 rounded-full bg-status" aria-hidden="true" />
              {kuriosity.status}
            </Badge>
            <p className="text-secondary">
              A full-stack RAG application, shipped and operated solo across three platforms. The
              twist: the AI is the <span className="text-primary">student</span>, not the teacher.
            </p>
            <ul className="flex flex-wrap gap-2">
              {kuriosity.stack.map((s) => (
                <li key={s}>
                  <span className="pill">{s}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={kuriosity.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-3 text-sm font-medium text-ink transition duration-200 hover:-translate-y-0.5 hover:shadow-glow"
              >
                Visit live
                <ExternalLink size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href={kuriosity.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border-subtle px-5 py-3 text-sm font-medium text-primary transition duration-200 hover:border-white/20 hover:bg-white/[0.03]"
              >
                <Github size={16} />
                Code
              </a>
            </div>
          </Reveal>
        </div>

        {/* Under the hood — reused pipeline diagram */}
        <div className="mt-16">
          <Reveal className="mb-6 flex items-center gap-3">
            <span className="eyebrow">Under the hood</span>
            <span className="h-px flex-1 bg-border-subtle" aria-hidden="true" />
          </Reveal>
          <Reveal>
            <PipelineDiagram
              nodes={kuriosity.pipeline}
              ariaLabel="Kuriosity architecture: upload to Cohere embeddings to ChromaDB to Groq LLM to React app."
            />
          </Reveal>
        </div>

        {/* Engineering decisions — bento */}
        <motion.div
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid grid-flow-dense auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {kuriosity.decisions.map((d) => (
            <motion.div
              key={d.title}
              variants={fadeUp}
              className={d.span === 'lg' ? 'sm:col-span-2 lg:col-span-2' : ''}
            >
              <Card spotlight className="h-full p-6">
                <h3 className="font-display text-lg font-semibold text-primary">{d.title}</h3>
                <p className="mt-2 text-sm text-secondary">{d.body}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {d.tags.map((t) => (
                    <li key={t}>
                      <span className="font-mono text-[0.72rem] text-amber/90">#{t}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
