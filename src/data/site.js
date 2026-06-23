// Single source of truth for identity, nav, hero copy, metrics, and contact.
// Edit content here — components read from it.

export const identity = {
  name: 'Gokulraj M',
  role: 'Software Engineer · Cloud & AI',
  location: 'Tiruvannamalai, Tamil Nadu',
  email: 'gokulraj.gokul3003@gmail.com',
  resumeUrl: './resume.pdf', // drop your PDF at public/resume.pdf
  // Phone intentionally hidden by default (public-site spam hygiene). Set to a string to show.
  phone: null,
}

export const social = {
  github: 'https://github.com/gokulraj9488',
  linkedin: 'https://www.linkedin.com/in/gokul-raj3003',
  portfolio: 'https://gokul.quest',
}

// Hero profile card — a product-grade identity component.
export const profile = {
  monogram: 'GM',
  name: 'Gokulraj M',
  role: 'Software Engineer · Cloud & AI',
  location: 'Tamil Nadu, India',
  now: 'Currently @ TCS',
  available: true,
  availableLabel: 'Available',
  chips: ['GCP', 'RAG', 'React'],
  statusPanel: 'Open to Software Engineering, Cloud & AI roles. Let’s build something meaningful.',
  photo: null, // set a path (e.g. './headshot.jpg') to replace the monogram
}

// Checkpoints for the Continental GT journey rail (ids must match section ids).
export const journey = [
  { id: 'kuriosity', label: 'Product' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

// Max 4 anchor links — never list every section (nav-thinking, not index-thinking).
export const navLinks = [
  { label: 'Product', href: '#kuriosity' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

// Sections observed for active-link highlighting (order = scroll order).
export const sectionIds = [
  'hero',
  'kuriosity',
  'systems',
  'capabilities',
  'experience',
  'projects',
  'certifications',
  'contact',
]

export const hero = {
  eyebrow: 'SOFTWARE ENGINEER · CLOUD & AI',
  headline: 'I build the systems that turn data into decisions — and decisions into products.',
  // The single word rendered in Instrument Serif italic — the one expressive type moment.
  headlineSerif: 'systems',
  subhead:
    'Software Engineer at Tata Consultancy Services, specializing in Google Cloud, BigQuery and Looker. Currently building Kuriosity — an AI tutor that quizzes students on their own notes.',
  primaryCta: { label: 'See Kuriosity', href: '#kuriosity' },
  secondaryCta: { label: 'Get in Touch', href: '#contact' },
  credibility: ['Currently @ TCS', 'Google Cloud', 'BigQuery', 'Looker'],
}

// True, specific, scannable. No fabricated usage metrics.
export const metrics = [
  { value: '~35%', label: 'faster dashboard loads', sub: 'BigQuery query optimization' },
  { value: '10+', label: 'Looker dashboards shipped', sub: 'Finance · Ops · Marketing' },
  { value: '3', label: 'platform production deploy', sub: 'Vercel · Railway · GoDaddy DNS' },
  { value: '100%', label: 'RAG-grounded responses', sub: 'answers tied to source material' },
]

export const contact = {
  headline: "Let's build something.",
  subline: 'Open to Software Engineering, Cloud Engineering, and AI Engineering roles.',
  emailSubject: "Let's build something — from gokul.quest",
}
