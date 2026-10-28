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
    role: ' Full Stack Developer | Golang | Javascript | Node',
    callsign: 'CALLSIGN: SAHIL // SYS_ENGINEER',
    title: 'Full Stack Developer | Go | Node',
    stackHighlight: 'Golang • Node.js • Distributed Systems',
    missionStatement:
      'Building concurrent Go services, real-time systems, and full stack web platforms that stay fast and reliable under load.',
    location: 'New Delhi, India',
    academicSpec: 'B.TECH CSE (2022–2026) • SECTOR: NEW DELHI',
    email: 'sahilpatel8826@gmail.com',
    phone: '+91 8303051574',
    resumeUrl:
      'https://drive.google.com/file/d/1PGbeM-K3m8tHesEnzz4vmfRxLO5nofI-/view?usp=drive_link',
    avatar: '/images/avatar.jpg',
    astronautImage: '/images/astronaut.jpg',
    planetImage: '/images/planet.jpg',
  },

  navigation: [
    // { label: 'HERO', href: '#hero', tag: '01' },
    { label: 'ABOUT', href: '#about', tag: '01' },
    { label: 'SKILLS', href: '#skills', tag: '02' },
    { label: 'EXPERIENCE', href: '#experience', tag: '03' },
    { label: 'PROJECTS', href: '#projects', tag: '04' },
    { label: 'CONTACT', href: '#contact', tag: '05 ' },
  ] as NavItem[],

  heroStats: [
    { label: 'ORBIT_CYCLE', value: '6+', unit: 'MONTHS', desc: 'Industry Experience' },
    { label: 'SORTIES', value: '15+', unit: 'APIS', desc: 'Production APIs Shipped' },
    { label: 'ARCHIVE', value: '20+', unit: 'REPOS', desc: 'Projects on GitHub' },
  ] as StatItem[],

  about: {
      coreDirectives:
      'Backend Engineer building production systems across Go microservices, real-time WebSocket platforms, and high-performance REST/gRPC APIs. Experienced in concurrent systems, caching, database optimization, and end-to-end full stack delivery from schema design to deployment.',
    secondaryDirective:
      'Most recently worked as a Golang Backend Developer Intern at Smollan India (Google Retail Hub), where I shipped 15+ production REST and gRPC APIs, cut response times with Redis caching and SQL tuning, and secured endpoints with JWT, RBAC and middleware authorization.',
    academicExpedition: {
      period: '2022 – 2026',
      degree: 'B.Tech in CSE',
    },
    targetHorizon: {
      title: 'BACKEND',
      subtitle: 'Software Engineer (SDE-1)',
    },
    crewDossier: {
      callsign: '// CREW_DOSSIER',
      name: 'SAHIL PATEL',
      bio: 'Always benchmarking query latencies, profiling memory allocations, and solving algorithm puzzles on LeetCode.',
    },
  },

  skillCategories: [
    {
      id: 'ARRAY 01',
      title: 'Languages',
      desc: 'Core runtimes used for building services, tools and interfaces.',
      icon: 'terminal',
      accent: 'cyan',
      skills: [
        { name: 'Go (Golang)', pct: 90 },
        { name: 'JavaScript / Node.js', pct: 88 },
        { name: 'TypeScript', pct: 80 },
        { name: 'C++', pct: 75 },
        { name: 'SQL', pct: 82 },
      ],
    },
    {
      id: 'ARRAY 02',
      title: 'Backend & Frontend',
      desc: 'Frameworks, protocols and UI tooling for full stack delivery.',
      icon: 'hub',
      accent: 'teal',
      skills: [
        { name: 'Gin, GORM & REST APIs', pct: 90 },
        { name: 'gRPC & Protobuf', pct: 82 },
        { name: 'Express.js & WebSockets', pct: 85 },
        { name: 'JWT, RBAC & Middleware', pct: 90 },
        { name: 'React, Redux Toolkit & Tailwind', pct: 80 },
      ],
    },
    {
      id: 'ARRAY 03',
      title: 'Databases & Cache',
      desc: 'Persistent stores, caching and query optimization.',
      icon: 'database',
      accent: 'amber',
      skills: [
        { name: 'PostgreSQL', pct: 88 },
        { name: 'MongoDB & Aggregations', pct: 86 },
        { name: 'MySQL', pct: 75 },
        { name: 'Redis Caching', pct: 78 },
      ],
    },
    {
      id: 'ARRAY 04',
      title: 'DevOps & Tools',
      desc: 'Containers, cloud and the tooling around shipping code.',
      icon: 'cloud',
      accent: 'orange',
      skills: [
        { name: 'Docker & Docker Compose', pct: 85 },
        { name: 'Google Cloud (GCP)', pct: 75 },
        { name: 'Git, GitHub & CI/CD', pct: 85 },
        { name: 'Postman & Linux', pct: 88 },
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
        'Shipped 15+ production REST and gRPC APIs across 10+ business modules using Go, Gin and GORM. Cut API response time from 480ms to 385ms (20%) by introducing Redis caching, fixing ORM bottlenecks, and tuning raw SQL and PostgreSQL indexes. Built JWT auth, RBAC and middleware authorization; wrote a Postman suite of 100+ test cases and resolved 25+ production bugs in Agile sprints.',
      tags: ['Golang', 'Gin', 'GORM', 'gRPC', 'PostgreSQL', 'Redis', 'JWT / RBAC'],
    },
    {
      role: 'Backend Developer Intern',
      company: 'Docimize Tech Solutions',
      mission: 'REST API Optimization',
      period: 'JUL 2025 – SEP 2025',
      description:
        'Built scalable Node.js/Express/MongoDB REST APIs serving 1,000+ daily requests at sub-200ms p95. Halved latency from 400ms to 200ms by eliminating N+1 queries, adding compound indexes and batching database calls; optimized MongoDB schemas to cut average query time by 30%.',
      tags: ['Node.js', 'Express', 'MongoDB', 'Indexing', 'REST API'],
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
        'Real-time chat backend in Go with one-to-one and group conversations, live presence and message history. Handles 500+ concurrent WebSocket connections with a hybrid store: PostgreSQL for users and rooms, MongoDB for messages (1,000+ writes/sec). JWT auth, RBAC, gRPC between services, Docker support, and a React frontend with Framer Motion.',
      image: '/images/project-chat.jpg',
      tags: ['Go', 'Gin', 'WebSockets', 'gRPC', 'PostgreSQL', 'MongoDB', 'React'],
      githubUrl: 'https://github.com/SahilPatel8826/Decentralized-chatting-app',
    },
    {
      id: 'database-engine',
      title: 'Concurrent Database Engine',
      missionNumber: 'MISSION // 02',
      tag: 'STORAGE_CORE',
      sector: 'SECTOR: PERSISTENCE',
      description:
        'Lightweight key-value database engine written from scratch in Go. Concurrent CRUD at 10,000+ ops/sec using goroutines, channels and mutex synchronization with zero data races under load, plus atomic crash-safe writes via os.Rename.',
      image: '/images/project-db.jpg',
      tags: ['Go', 'Goroutines', 'Channels', 'Mutex', 'Atomic Writes'],
      githubUrl: 'https://github.com/SahilPatel8826/golang/tree/main/Database',
    },
    {
      id: 'cropozone',
      title: 'CropOzone',
      missionNumber: 'MISSION // 03',
      tag: 'AGRARIAN_NEXUS',
      sector: 'SECTOR: COMMERCE_GATE',
      description:
        'Full-stack MERN marketplace for crops, seeds and produce with a customer storefront and admin dashboard. Filtering and sorting, guest-cart merge on login, PayPal checkout, order tracking, JWT auth with role-protected admin routes, and Cloudinary image uploads.',
      image: '/images/project-crop.jpg',
      tags: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'PayPal', 'Cloudinary'],
      githubUrl: 'https://github.com/SahilPatel8826/cropozone_',
    },
    {
      id: 'redis-lite',
      title: 'Redis-Lite',
      missionNumber: 'MISSION // 04',
      tag: 'CACHE_CORE',
      sector: 'SECTOR: IN_MEMORY',
      description:
        'Redis-inspired in-memory key-value store in Go with SET/GET/DEL, TTL expiry and O(1) LRU eviction (hashmap + doubly linked list). Thread-safe via RWMutex, with a background ticker goroutine sweeping expired keys alongside lazy expiry on read.',
      image: '/images/project-finance.jpg',
      tags: ['Go', 'LRU Cache', 'TTL', 'RWMutex', 'Goroutines'],
      githubUrl: 'https://github.com/SahilPatel8826/redis_lite',
    },
  ] as ProjectItem[],

  // More repos worth linking in an optional "Archive" strip
  moreRepos: [
    { name: 'Secure CLI Authentication', stack: 'Go • PostgreSQL • GORM • Docker • TOTP 2FA', url: 'https://github.com/SahilPatel8826/Secure_CLI_Authentication' },
    { name: 'Eve Booking API', stack: 'FastAPI • SQLAlchemy • PostgreSQL • Idempotent Webhooks', url: 'https://github.com/SahilPatel8826/eve-booking' },
    { name: 'Finance Dashboard API', stack: 'Node.js • Express • MongoDB • 3-Tier RBAC', url: 'https://github.com/SahilPatel8826/finance_backend' },
    { name: 'Banking Web App', stack: 'Go • MongoDB • JWT', url: 'https://github.com/SahilPatel8826/bankingwebapp' },
    { name: 'Trading App', stack: 'Spring Boot • JWT • 2FA', url: 'https://github.com/SahilPatel8826/trading' },
    { name: 'Voice Assistant Booking', stack: 'MERN • Web Speech API', url: 'https://github.com/SahilPatel8826/voice_assistant_restro_booking_system' },
  ],

  gitTelemetry: {
    node: 'SahilPatel8826',
    activeRepos: 23,
    starsLogged: 0, // TODO: set to your real star count
    codeVelocity: 'GO + TS', // top languages instead of a made-up percentage
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
      handle: 'in/sahil-patel-9264b6397',
      url: 'https://www.linkedin.com/in/sahil-patel-9264b6397/',
      icon: 'lan',
      accent: 'teal',
    },
    {
      name: 'X Signal',
      handle: '@SahilPatel1607',
      url: 'https://x.com/SahilPatel1607',
      icon: 'tag',
      accent: 'cyan',
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
      handle: 'Sahil8826',
      url: 'https://leetcode.com/u/Sahil8826/',
      icon: 'code',
      accent: 'orange',
    },
  ] as SocialChannel[],
};