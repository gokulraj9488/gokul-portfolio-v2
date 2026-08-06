import ProductHero from '../components/broksforge/ProductHero.jsx'
import BrokDemo from '../components/broksforge/BrokDemo.jsx'
import ProblemSolution from '../components/broksforge/ProblemSolution.jsx'
import CapabilitiesGrid from '../components/broksforge/CapabilitiesGrid.jsx'
import ArchitectureExplorer from '../components/broksforge/ArchitectureExplorer.jsx'
import SecurityModel from '../components/broksforge/SecurityModel.jsx'
import StackDeployment from '../components/broksforge/StackDeployment.jsx'
import PhilosophyRoadmap from '../components/broksforge/PhilosophyRoadmap.jsx'
import ProductCta from '../components/broksforge/ProductCta.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'

// The flagship product page. Interactive proof before prose: hero claim ->
// demonstrate the one thing that makes this different (Brok, live-scripted)
// -> problem/solution -> what it's made of -> how it's built -> how it's
// secured and run -> the design law behind all of it -> CTA. Under 45
// seconds gets you the claim and the proof; everything after is for whoever
// wants the depth.
export default function BroksForge() {
  usePageMeta({
    title: "Brok's Forge — The AI Engineering Operating System",
    description:
      'An open-source AI Engineering Operating System that records the decisions behind an AI system and reasons over them deterministically — no LLM in the reasoning layer. Java 21 · Spring Boot · PostgreSQL · Next.js 15.',
  })

  return (
    <>
      <ProductHero />
      <BrokDemo />
      <ProblemSolution />
      <CapabilitiesGrid />
      <ArchitectureExplorer />
      <SecurityModel />
      <StackDeployment />
      <PhilosophyRoadmap />
      <ProductCta />
    </>
  )
}
