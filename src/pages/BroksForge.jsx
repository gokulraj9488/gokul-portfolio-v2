import ProductHero from '../components/broksforge/ProductHero.jsx'
import EvalRunSimulator from '../components/broksforge/EvalRunSimulator.jsx'
import ProblemSolution from '../components/broksforge/ProblemSolution.jsx'
import CapabilitiesGrid from '../components/broksforge/CapabilitiesGrid.jsx'
import EvaluationPipeline from '../components/broksforge/EvaluationPipeline.jsx'
import ArchitectureExplorer from '../components/broksforge/ArchitectureExplorer.jsx'
import Neutrality from '../components/broksforge/Neutrality.jsx'
import SecurityModel from '../components/broksforge/SecurityModel.jsx'
import StackDeployment from '../components/broksforge/StackDeployment.jsx'
import PhilosophyRoadmap from '../components/broksforge/PhilosophyRoadmap.jsx'
import ProductCta from '../components/broksforge/ProductCta.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'

// The flagship product page — reads like a company site, not a project card:
// claim -> problem/solution -> capabilities -> the two core architectures ->
// neutrality -> security -> stack & production -> philosophy, timeline, roadmap -> CTA.
export default function BroksForge() {
  usePageMeta({
    title: "Brok's Forge — The Engineering Platform for AI Agents",
    description:
      'An open-source, multi-tenant platform for registering, versioning, evaluating, benchmarking and debugging AI agents. Java 21 · Spring Boot · PostgreSQL · Next.js 15.',
  })

  return (
    <>
      <ProductHero />
      <EvalRunSimulator />
      <ProblemSolution />
      <CapabilitiesGrid />
      <EvaluationPipeline />
      <ArchitectureExplorer />
      <Neutrality />
      <SecurityModel />
      <StackDeployment />
      <PhilosophyRoadmap />
      <ProductCta />
    </>
  )
}
