import Hero from '../components/sections/Hero.jsx'
import FlagshipBroksForge from '../components/sections/FlagshipBroksForge.jsx'
import FieldNotes from '../components/sections/FieldNotes.jsx'
import SelectedWork from '../components/sections/SelectedWork.jsx'
import SystemOverview from '../components/sections/SystemOverview.jsx'
import About from '../components/sections/About.jsx'
import GameOrigin from '../components/sections/GameOrigin.jsx'
import BuildLog from '../components/sections/BuildLog.jsx'
import ExperienceTimeline from '../components/sections/ExperienceTimeline.jsx'
import Certifications from '../components/sections/Certifications.jsx'
import Contact from '../components/sections/Contact.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'

export default function Home() {
  usePageMeta({
    title: 'Gokulraj M — AI Engineer',
    description:
      "AI engineer building systems that survive production. Creator of Brok's Forge — an AI Engineering Operating System with zero LLM in its reasoning layer.",
  })

  return (
    <>
      {/* The story, in scroll order: who is this engineer -> what did he build ->
          why is it different -> why should I trust him (field notes) -> secondary
          proof -> how does he think -> what's he building next -> can he operate
          production software -> contact. */}
      <Hero />
      <FlagshipBroksForge />
      <FieldNotes />
      <SelectedWork />
      <SystemOverview />
      <About />
      <GameOrigin />
      <BuildLog />
      <ExperienceTimeline />
      <Certifications />
      <Contact />
    </>
  )
}
