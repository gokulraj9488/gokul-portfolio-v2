// Featured product — treated like a real product page embedded in the portfolio.

export const kuriosity = {
  name: 'Kuriosity',
  tagline: 'Teach an AI Student.',
  liveUrl: 'https://kuriosity.gokul.quest',
  githubUrl: 'https://github.com/gokulraj9488',
  status: 'Live in production',
  pitch:
    'Kuriosity flips the usual AI-tutor model — instead of an AI teaching a student, an AI character named Kurio plays the student. Upload your study material (PDF/PPT) and Kurio asks context-grounded questions, evaluates your answers, and tracks topic mastery across sessions.',

  // Pipeline nodes (also drives the architecture diagram). Grouped by the three layers.
  pipeline: [
    { id: 'upload', label: 'Upload', detail: 'PDF / PPT study material', layer: 'product' },
    { id: 'embed', label: 'Embeddings', detail: 'Cohere · chunk + vectorize', layer: 'data' },
    { id: 'chroma', label: 'ChromaDB', detail: 'vector similarity search', layer: 'data' },
    { id: 'llm', label: 'Groq LLM', detail: 'grounded Q&A + evaluation', layer: 'intelligence' },
    { id: 'app', label: 'React App', detail: 'chat, analytics, progress', layer: 'product' },
  ],

  // What signals "production system" to a senior reviewer — ranked, bento-style.
  decisions: [
    {
      title: 'Custom RAG pipeline',
      body: 'PDF parsing, chunking, Cohere embeddings and ChromaDB similarity search — grounding every AI response in the uploaded source material instead of the LLM’s general knowledge.',
      tags: ['RAG', 'ChromaDB', 'Cohere'],
      span: 'lg',
    },
    {
      title: 'LLM evaluation engine',
      body: 'Scores free-text answers against retrieved source chunks, returning accuracy %, missing concepts and targeted revision topics as structured JSON.',
      tags: ['Groq', 'Structured JSON'],
      span: 'md',
    },
    {
      title: 'Cross-session topic memory',
      body: 'PostgreSQL tracks per-user topic strength (weak / developing / strong), so the AI intelligently revisits concepts you’ve struggled with.',
      tags: ['PostgreSQL'],
      span: 'md',
    },
    {
      title: 'Production-grade security',
      body: 'JWT auth with email OTP verification (Resend), rate limiting, parameterized queries and CORS hardening.',
      tags: ['JWT', 'OTP', 'Resend'],
      span: 'md',
    },
    {
      title: 'Three-platform deployment',
      body: 'Vercel frontend, Railway backend + vector DB, custom domain with DNS/SSL via GoDaddy — independently resolved cross-service env config, CORS and API rate limits under real production load.',
      tags: ['Vercel', 'Railway', 'DNS/SSL'],
      span: 'lg',
    },
    {
      title: 'Responsive product UI',
      body: 'Fully responsive mobile UI with live upload-status feedback, an auto-resizing chat composer and an in-app analytics dashboard surfacing learning accuracy and topic-level progress.',
      tags: ['React', 'Vite', 'Tailwind'],
      span: 'md',
    },
  ],

  stack: ['React', 'Vite', 'Tailwind', 'Node.js', 'Express', 'PostgreSQL', 'ChromaDB', 'Groq', 'Cohere', 'Resend'],

  // Drop a muted screen-capture loop at public/kuriosity-demo.mp4 + poster at public/kuriosity-poster.jpg
  // to activate the "show it working" demo. Falls back to a labeled placeholder until then.
  demo: {
    video: './kuriosity-demo.mp4',
    poster: './kuriosity-poster.jpg',
  },
}
