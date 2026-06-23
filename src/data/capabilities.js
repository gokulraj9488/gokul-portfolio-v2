// Capabilities grouped by the three-layer spine (not a flat tag cloud).
import { Database, BrainCircuit, Layers } from 'lucide-react'

export const layers = [
  {
    id: 'data',
    icon: Database,
    title: 'Data & Cloud Layer',
    blurb: 'Clean, governed, queryable.',
    items: ['Google Cloud (GCP)', 'BigQuery', 'Looker', 'LookML', 'Cloud Storage', 'Dataflow', 'SQL', 'Row-level security'],
  },
  {
    id: 'intelligence',
    icon: BrainCircuit,
    title: 'Intelligence Layer',
    blurb: 'Models that reason over that data.',
    items: ['RAG pipelines', 'LLM integration (Groq)', 'Vector DB (ChromaDB)', 'Embeddings (Cohere)', 'Prompt engineering', 'Similarity search'],
  },
  {
    id: 'product',
    icon: Layers,
    title: 'Product Layer',
    blurb: 'Interfaces real people use.',
    items: ['React', 'Vite', 'TailwindCSS', 'Node.js', 'Express', 'REST APIs', 'JWT auth', 'PostgreSQL', 'Docker', 'Railway', 'Vercel'],
  },
]

export const languagesAndTools = {
  languages: ['Java', 'Python', 'JavaScript', 'C#', 'C++', 'SQL'],
  tools: ['Git', 'GitHub', 'Docker', 'Postman', 'IntelliJ'],
}
