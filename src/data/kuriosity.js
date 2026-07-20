// Kuriosity — the secondary product. A live, end-to-end RAG system that supports
// the flagship story: the same engineer who builds the evaluation platform also
// ships the kind of AI product it evaluates.

export const kuriosity = {
  name: 'Kuriosity',
  role: 'Secondary product',
  tagline: 'A production RAG system where the AI is the student.',
  liveUrl: 'https://kuriosity.gokul.quest',
  githubUrl: 'https://github.com/gokulraj9488',
  status: 'Live in production',
  pitch:
    'Kuriosity inverts the AI-tutor model: an AI named Kurio plays the student. Upload study material and Kurio asks context-grounded questions, scores your free-text answers against the retrieved source chunks, and tracks topic mastery across sessions.',
  highlights: [
    {
      title: 'Custom RAG pipeline',
      body: 'PDF parsing, chunking, Cohere embeddings, ChromaDB similarity search — every response grounded in the uploaded source, not the model’s general knowledge.',
    },
    {
      title: 'LLM evaluation loop',
      body: 'Free-text answers scored against retrieved chunks — accuracy %, missing concepts and revision topics returned as structured JSON.',
    },
    {
      title: 'Cross-session memory',
      body: 'PostgreSQL tracks per-user topic strength, so weak concepts resurface until they hold.',
    },
    {
      title: 'Operated in production',
      body: 'JWT auth with email OTP, rate limiting, and a three-platform deploy (Vercel, Railway, custom DNS/TLS) run under real traffic.',
    },
  ],
  stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'ChromaDB', 'Cohere', 'Groq'],
}
