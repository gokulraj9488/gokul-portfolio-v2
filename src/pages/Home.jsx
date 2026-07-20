import Hero from '../components/sections/Hero.jsx'
import FlagshipBroksForge from '../components/sections/FlagshipBroksForge.jsx'
import SelectedWork from '../components/sections/SelectedWork.jsx'
import SystemOverview from '../components/sections/SystemOverview.jsx'
import About from '../components/sections/About.jsx'
import BuildLog from '../components/sections/BuildLog.jsx'
import ExperienceTimeline from '../components/sections/ExperienceTimeline.jsx'
import Certifications from '../components/sections/Certifications.jsx'
import Contact from '../components/sections/Contact.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'

export default function Home() {
  usePageMeta({
    title: 'Gokulraj M — AI Engineer',
    description:
      "AI engineer building systems that survive production. Creator of Brok's Forge — an open-source engineering platform for evaluating, benchmarking and debugging AI agents.",
  })

  return (
    <>
      {/* Proof first: the claim -> flagship platform -> second product -> how I think ->
          the workshop journal -> career. */}
      <Hero />
      <FlagshipBroksForge />
      <SelectedWork />
      <SystemOverview />
      <About />
      <BuildLog />
      <ExperienceTimeline />
      <Certifications />
      <Contact />
    </>
  )
}
