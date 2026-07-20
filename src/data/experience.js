// Chronological proof. Independent AI-infrastructure work and TCS run in parallel;
// game/VR internships are a compressed earlier tier.
export const experience = [
  {
    company: "Brok's Forge — Independent / Open Source",
    role: 'Creator & Maintainer · AI Engineering Platform',
    period: '2026 – Present',
    location: 'Remote',
    emphasis: true,
    points: [
      'Designed and built a multi-tenant, provider-agnostic AI-agent engineering platform (Java 21 / Spring Boot, PostgreSQL, Next.js 15): agent registry, evaluation pipeline, benchmarking, regression detection and an on-read engineering advisor.',
      'Architected it as a modular monolith — 22 modules with id-only boundaries — so any module extracts into a microservice mechanically.',
      'Operate it in production on AWS EC2 (Docker, Nginx, Let’s Encrypt) with a Vercel frontend, Prometheus metrics and structured logging.',
    ],
    tags: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Next.js', 'AWS'],
  },
  {
    company: 'Tata Consultancy Services',
    role: 'Software Engineer · Google Cloud / Looker',
    period: 'Dec 2025 – Present',
    location: 'Chennai',
    emphasis: true,
    points: [
      'Design and develop production LookML models, views and explores on Google Cloud Looker, enabling self-serve analytics for business teams.',
      'Optimized BigQuery SQL, reducing average dashboard load time by ~35%.',
      'Built 10+ Looker dashboards across Finance, Operations and Marketing.',
      'Implemented row-level security and access-group policies for multi-tenant data governance.',
    ],
    tags: ['GCP', 'BigQuery', 'Looker', 'LookML'],
  },
  {
    company: 'NIT Trichy',
    role: 'Game Developer Intern',
    period: 'Sep 2024 – Oct 2024',
    location: 'Trichy',
    emphasis: false,
    points: [
      'Shipped a full game on online-bullying awareness with Unity and C#, owning design through deployment.',
    ],
    tags: ['Unity', 'C#'],
  },
  {
    company: 'MIC Chennai',
    role: 'VR Developer Intern',
    period: 'Aug 2023',
    location: 'Chennai',
    emphasis: false,
    points: [
      "Built immersive VR experiences with Unity's XR Interaction Toolkit, improving simulation fidelity through iterative testing.",
    ],
    tags: ['Unity XR', 'C#'],
  },
  {
    company: 'SRM Institute of Science & Technology',
    role: 'B.Tech, Computer Science Engineering',
    period: '2021 – 2025',
    location: 'Trichy',
    emphasis: false,
    points: [],
    tags: [],
  },
]
