import { motion } from 'framer-motion'
import { layers, languagesAndTools } from '../../data/capabilities.js'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../ui/Reveal.jsx'
import Card from '../ui/Card.jsx'

export default function EngineeringCapabilities() {
  return (
    <section id="capabilities" className="section border-t border-border-subtle">
      <div className="container-edge">
        <SectionHeader
          eyebrow="Capabilities"
          title="The full stack of an intelligent system."
          subhead="Grouped by the three layers — because that's how they're actually used together, not as a flat list of logos."
        />

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid gap-4 md:grid-cols-3"
        >
          {layers.map((layer) => {
            const Icon = layer.icon
            return (
              <motion.div key={layer.id} variants={fadeUp}>
                <Card spotlight className="h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-subtle bg-ink text-amber">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-primary">{layer.title}</h3>
                  <p className="mt-1 text-sm text-tertiary">{layer.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {layer.items.map((item) => (
                      <li key={item}>
                        <span className="pill">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Secondary row */}
        <Reveal className="mt-8 grid gap-4 rounded-2xl border border-border-subtle bg-surface p-6 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-wider text-tertiary">Languages</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {languagesAndTools.languages.map((l) => (
                <li key={l}>
                  <span className="pill">{l}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-wider text-tertiary">Tools</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {languagesAndTools.tools.map((t) => (
                <li key={t}>
                  <span className="pill">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
