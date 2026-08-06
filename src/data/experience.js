// Chronological proof. Independent AI-infrastructure work and TCS run in parallel;
// game/VR internships are a compressed earlier tier.
export const experience = [
  {
    company: "Brok's Forge — Independent / Open Source",
    role: 'Creator & Maintainer · AI Engineering Operating System',
    period: '2026 – Present',
    location: 'Remote',
    emphasis: true,
    points: [
      "Designed and built Brok's Forge V2, an AI Engineering Operating System that records the decisions and evidence behind an AI system and answers engineering questions about it deterministically — no language model anywhere in the reasoning layer.",
      'Architected a five-layer platform (Forge Kernel → Registry → AI Git → Forge Graph → Engineering Applications) on a deliberately framework-free, append-only event kernel with its own API/core/TCK/PostgreSQL-adapter split.',
      'Built and hardened a fully unattended production deployment to AWS EC2 (Docker Compose, Nginx, Let’s Encrypt) with automatic image-tag rollback on a failed health gate, across 9 GitHub Actions workflows including CodeQL and dependency review.',
      'Diagnosed and fixed a chain of live production incidents to root cause — a CI/CD pipeline that had never once executed, a health check silently skipped by a stdin-consumption bug, and Nginx serving 502s by caching a stale upstream IP after every deploy.',
    ],
    tags: ['Java 21', 'Spring Boot 3.4', 'PostgreSQL 16', 'Next.js 15', 'AWS EC2'],
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
