export interface NavItem {
  label: string;
  href: string;
  tag: string;
}

export interface StatItem {
  label: string;
  value: string;
  unit: string;
  desc: string;
}

export interface SkillItem {
  name: string;
  pct: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  desc: string;
  icon: string;
  accent: 'cyan' | 'teal' | 'orange' | 'amber';
  skills: SkillItem[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  mission: string;
  period: string;
  description: string;
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  missionNumber: string;
  tag: string;
  sector: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
}

export interface SocialChannel {
  name: string;
  handle: string;
  url: string;
  icon: string;
  accent: 'cyan' | 'teal' | 'orange' | 'amber';
}

export const PORTFOLIO_CONTENT = {
  personal: {
    name: 'Sahil',
    fullName: 'Sahil Patel',
    introGreeting: "Hi, I'm Sahil Patel",
    role: 'A Full Stack & Golang Developer',
    callsign: 'CALLSIGN: SAHIL // SYS_ENGINEER',
    title: 'Full Stack & Golang Developer',
    stackHighlight: 'Golang • Full Stack • Distributed Systems',
    missionStatement:
      'Crafting high-throughput distributed architectures, resilient Golang microservices, and modern full stack web platforms across cosmic cloud environments.',
    location: 'Noida / New Delhi Sector Node',
    academicSpec: 'B.TECH CSE (2022–2026) • SECTOR: NOIDA / NEW DELHI',
    email: 'sahilpatel8826@gmail.com',
    resumeUrl: '#contact',
    avatar: '/images/avatar.jpg',
    astronautImage: '/images/astronaut.jpg',
    planetImage: '/images/planet.jpg',
  },

  navigation: [
    { label: 'HERO', href: '#hero', tag: '01' },
    { label: 'ABOUT', href: '#about', tag: '02' },
    { label: 'SKILLS', href: '#skills', tag: '03' },
    { label: 'EXPERIENCE', href: '#experience', tag: '04' },
    { label: 'PROJECTS', href: '#projects', tag: '05' },
    { label: 'CONTACT', href: '#contact', tag: '06' },
  ] as NavItem[],

  heroStats: [
    { label: 'ORBIT_CYCLE', value: '02+', unit: 'YRS', desc: 'Core Development' },
    { label: 'SORTIES', value: '18+', unit: 'OPS', desc: 'Missions Shipped' },
    { label: 'NODES', value: '14+', unit: 'ENG', desc: 'Microservices Built' },
  ] as StatItem[],

  about: {
    coreDirectives:
      'Passionate Computer Science scholar focused on high-throughput backend architecture. Deeply immersed in the mechanics of low-level concurrency, LSM-tree persistence models, robust gRPC RPC layers, and fault-tolerant Redis distribution algorithms.',
    secondaryDirective:
      'Currently navigating distributed consensus patterns, containerized deployments on cloud platforms, and mission-critical API gateways designed to handle thousands of concurrent transactions per second without degraded response thresholds.',
    academicExpedition: {
      period: '2022 – 2026',
      degree: 'B.Tech in CSE',
    },
    targetHorizon: {
      title: 'DISTRIBUTED',
      subtitle: 'Systems Architect',
    },
    crewDossier: {
      callsign: '// CREW_DOSSIER',
      name: 'SAHIL PATEL',
      bio: 'Always benchmarking query latencies, profiling memory allocations, and synchronizing distributed channels.',
    },
  },

  skillCategories: [
    {
      id: 'ARRAY 01',
      title: 'Languages',
      desc: 'Core compiled and asynchronous runtimes used for building scalable engines.',
      icon: 'terminal',
      accent: 'cyan',
      skills: [
        { name: 'Go (Golang)', pct: 95 },
        { name: 'JavaScript / Node.js', pct: 90 },
        { name: 'TypeScript', pct: 85 },
        { name: 'C++', pct: 80 },
      ],
    },
    {
      id: 'ARRAY 02',
      title: 'Architecture',
      desc: 'Protocols, routing engines, and modular distributed design models.',
      icon: 'hub',
      accent: 'teal',
      skills: [
        { name: 'Microservices Fabric', pct: 94 },
        { name: 'gRPC & Protobuf', pct: 92 },
        { name: 'Gin & GORM', pct: 90 },
        { name: 'Express.js & REST', pct: 88 },
      ],
    },
    {
      id: 'ARRAY 03',
      title: 'Databases & Cache',
      desc: 'Persistent stores, key-value caches, and indexing optimization engines.',
      icon: 'database',
      accent: 'amber',
      skills: [
        { name: 'Redis Cache & Pub/Sub', pct: 95 },
        { name: 'PostgreSQL & PgBouncer', pct: 90 },
        { name: 'MongoDB Aggregations', pct: 88 },
        { name: 'LSM-Tree Key-Values', pct: 86 },
      ],
    },
    {
      id: 'ARRAY 04',
      title: 'DevOps & Cloud',
      desc: 'Containerized pipelines, cloud infrastructure, and deployment telemetry.',
      icon: 'cloud',
      accent: 'orange',
      skills: [
        { name: 'Git & GitHub Actions', pct: 95 },
        { name: 'Docker Engine', pct: 92 },
        { name: 'Postman & CI/CD', pct: 90 },
        { name: 'Google Cloud (GCP)', pct: 82 },
      ],
    },
  ] as SkillCategory[],

  experience: [
    {
      role: 'Golang Backend Developer Intern',
      company: 'Smollan India',
      mission: 'Google Retail Hub Mission',
      period: 'APR 2026 – JUN 2026',
      description:
        'Spearheaded optimization runs on high-throughput Golang microservices across retail sync pipelines. Reduced peak query latency by 34% through proactive Redis cache invalidation strategies and Goroutine concurrency pooling.',
      tags: ['Golang', 'Redis', 'Microservices', 'Concurrency Pooling', 'REST API'],
    },
    {
      role: 'Backend Developer Intern',
      company: 'Docimize Tech Solutions',
      mission: 'Multi-Tenant Document Architecture',
      period: 'JUN 2025 – AUG 2025',
      description:
        'Engineered resilient multi-tenant REST architectures in Node.js, built bulletproof JWT RBAC authorization schemes, and streamlined continuous integration pipelines for zero-downtime micro-deployments.',
      tags: ['Node.js', 'JWT / RBAC', 'Express', 'CI/CD Pipelines', 'MongoDB'],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: 'chat-platform',
      title: 'Distributed Chat Platform',
      missionNumber: 'MISSION // 01',
      tag: 'ACTIVE NODE',
      sector: 'SECTOR: REALTIME_SYNC',
      description:
        'High-concurrency messaging fabric engineered using Golang, gRPC streaming, and WebSocket connections with Redis Pub/Sub for horizontal message fanout across decentralized nodes.',
      image: '/images/project-chat.jpg',
      tags: ['Go (Golang)', 'gRPC Streaming', 'WebSockets', 'Redis Pub/Sub'],
      githubUrl: 'https://github.com/SahilPatel8826/Decentralized-chatting-app',
    },
    {
      id: 'database-engine',
      title: 'Concurrent Database Engine',
      missionNumber: 'MISSION // 02',
      tag: 'STORAGE_CORE',
      sector: 'SECTOR: PERSISTENCE',
      description:
        'Embedded key-value storage engine in Go utilizing Log-Structured Merge-trees (LSM), MemTable serialization, Write-Ahead Logging (WAL), and mutex-less atomic concurrency primitives.',
      image: '/images/project-db.jpg',
      tags: ['Go Primitive Channels', 'LSM-Tree', 'WAL Engine', 'Atomic Writes'],
      githubUrl: 'https://github.com/SahilPatel8826/golang/tree/main/Database',
    },
    {
      id: 'cropozone',
      title: 'CropOzone Agrarian Nexus',
      missionNumber: 'MISSION // 03',
      tag: 'AGRARIAN_NEXUS',
      sector: 'SECTOR: COMMERCE_GATE',
      description:
        'Full-stack agrarian commerce and resource management platform with multi-role RBAC authorization, PayPal transactional gateways, and Cloudinary media processing nodes.',
      image: '/images/project-crop.jpg',
      tags: ['MERN Stack', 'JWT / RBAC', 'PayPal API', 'Cloudinary CDN'],
      githubUrl: 'https://github.com/SahilPatel8826/CropOzone',
    },
    {
      id: 'finance-dashboard',
      title: 'Finance Dashboard Backend API',
      missionNumber: 'MISSION // 04',
      tag: 'LEDGER_CORE',
      sector: 'SECTOR: ANALYTICS',
      description:
        'Enterprise ledger backend powered by Node.js, Express, and MongoDB. Incorporates 3-tier user role permissions, dynamic aggregations, and high-frequency analytical processing.',
      image: '/images/project-finance.jpg',
      tags: ['Node.js / Express', 'MongoDB Aggregation', '3-Tier RBAC', 'REST Gateway'],
      githubUrl: 'https://github.com/SahilPatel8826',
    },
  ] as ProjectItem[],

  gitTelemetry: {
    node: 'SahilPatel8826',
    activeRepos: 24,
    starsLogged: 38,
    codeVelocity: '98.4%',
    githubUrl: 'https://github.com/SahilPatel8826',
  },

  socialChannels: [
    {
      name: 'GitHub Archive',
      handle: '@SahilPatel8826',
      url: 'https://github.com/SahilPatel8826',
      icon: 'terminal',
      accent: 'cyan',
    },
    {
      name: 'LinkedIn Relay',
      handle: 'in/sahilpatel8826',
      url: 'https://linkedin.com/in/sahilpatel8826',
      icon: 'lan',
      accent: 'teal',
    },
    {
      name: 'Direct Transceiver',
      handle: 'sahilpatel8826@gmail.com',
      url: 'mailto:sahilpatel8826@gmail.com',
      icon: 'mail',
      accent: 'amber',
    },
    {
      name: 'LeetCode Telemetry',
      handle: 'Algorithms & Patterns',
      url: 'https://leetcode.com',
      icon: 'code',
      accent: 'orange',
    },
  ] as SocialChannel[],
};
