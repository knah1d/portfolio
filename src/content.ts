// All site text lives here. Edit this file to update the portfolio.

export const site = {
  url: "https://knah1d.vercel.app",
  name: "Kazi Nahid",
  role: "Software Engineer — AI & Full-Stack",
  description:
    "Kazi Nahid is a software engineer in Dhaka building LLM-powered features and full-stack systems with Java, Spring Boot, Angular, Next.js and FastAPI.",
  location: "Dhaka, Bangladesh",
  email: "bsse1437@iit.du.ac.bd",
  github: "https://github.com/knah1d",
  linkedin: "https://linkedin.com/in/knah1d",
  resume: "/Kazi_Nahid_Resume.pdf",
};

export const hero = {
  status: "Junior Software Engineer at LEADS Corporation",
  headline: "I build AI features people can trust — and the full-stack systems around them.",
  intro:
    "Software engineer working on a banking HRM platform by day, and on satellite-driven carbon verification for my final-year project. I like LLMs that stay reproducible, models that explain instead of decide, and systems with an audit trail.",
};

export const about = [
  "I'm a software engineer at LEADS Corporation in Dhaka, where I started as an intern in October 2025 and moved to full-time in November 2026. I work on a banking HRM platform built with Java, Spring Boot microservices, Angular and Oracle — from payroll approval workflows to the self-hosted LLM that reads candidate CVs.",
  "I'm finishing my BSc in Software Engineering at the Institute of Information Technology, University of Dhaka. My final-year project, Terra Audit, turns free satellite radar into reviewed, verifier-ready carbon credit reports.",
  "What I care about: AI that is useful without being unpredictable, backends that hold up under concurrency, and code that a second reviewer can follow.",
];

export type Role = { title: string; period: string };

export const experience = {
  company: "LEADS Corporation Limited",
  location: "Dhaka, Bangladesh",
  product: "Banking HRM platform · Java, Spring Boot microservices, Angular, Oracle",
  roles: [
    { title: "Junior Software Engineer (Full-time)", period: "Nov 2026 — Present" },
    { title: "Junior Software Engineer (Part-time)", period: "Apr 2026 — Oct 2026" },
    { title: "Software Engineer Intern", period: "Oct 2025 — Mar 2026" },
  ] satisfies Role[],
  groups: [
    {
      label: "AI & LLM",
      items: [
        "Built an LLM-based CV parsing pipeline on a self-hosted model (Ollama, Qwen2.5-3B), using PDFBox text extraction and schema-constrained JSON output to turn PDF CVs into structured candidate profiles.",
        "Developed AI candidate shortlisting that scores profiles against job descriptions across multiple job circulars, using deterministic skill matching and rule-based extraction to cut hallucinations and keep results reproducible.",
        "Added a recruiter-facing explanation of every AI match score in the Angular CV sorting screen.",
      ],
    },
    {
      label: "Backend & Platform",
      items: [
        "Implemented maker-checker approval with audit trails across nearly 30 payroll modules, migrating them to a shared Hibernate-based framework.",
        "Engineered Provident Fund and Benevolent Fund modules end to end, with record locking against concurrent withdrawals, duplicate checks and automatic loan settlement.",
        "Integrated Microsoft Graph and MSAL to sync interview schedules to Outlook with online meeting links.",
        "As an intern: built a biometric attendance sync service, scheduled attendance-flag jobs, and employee profile modules with validation rules.",
      ],
    },
  ],
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  kind: string;
  description: string;
  stats?: { value: string; label: string }[];
  tags: string[];
  links: { label: string; href: string }[];
  caseStudy?: string;
};

export const projects: Project[] = [
  {
    slug: "terra-audit",
    name: "Terra Audit",
    tagline: "AI-assisted carbon credit verification from satellite radar",
    period: "May 2026 — Present",
    kind: "Final-year project · Solo",
    description:
      "Detects Alternate Wetting and Drying in rice fields from Sentinel-1 radar and turns it into reviewed, verifier-ready carbon credit reports under Verra VM0051 and VM0042. Deterministic engines compute every number; ML and an LLM only advise and explain.",
    stats: [
      { value: "2", label: "Verra methodologies" },
      { value: "20+", label: "API modules" },
      { value: "184", label: "Backend tests passing" },
      { value: "0.72", label: "ML F1 on held-out plots" },
    ],
    tags: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Google Earth Engine", "XGBoost", "Groq LLM", "Docker"],
    links: [
      { label: "Live app", href: "https://terra-audit.vercel.app" },
      { label: "Source", href: "https://github.com/knah1d/terra-audit" },
    ],
    caseStudy: "/projects/terra-audit",
  },
  {
    slug: "shopease",
    name: "ShopEase",
    tagline: "E-commerce backend with payments and security",
    period: "May 2025 — Aug 2025",
    kind: "Team project",
    description:
      "A Spring Boot backend built with Clean Architecture and Domain-Driven Design. REST APIs for users, products, orders and payments, SSLCommerz payment gateway, and JWT authentication with Spring Security.",
    tags: ["Spring Boot", "Spring Security", "JWT", "PostgreSQL", "DDD"],
    links: [{ label: "Source", href: "https://github.com/knah1d/shopease" }],
  },
  {
    slug: "stockvision",
    name: "StockVision",
    tagline: "Stock market analysis on 15 years of DSE data",
    period: "Jul 2025 — Sep 2025",
    kind: "Team project",
    description:
      "Engineered 17 technical features over 1.79M daily Dhaka Stock Exchange records (1,007 securities, 2008–2022) and benchmarked six regressors with a year-based split. I built the FastAPI prediction service and the React dashboard for analysis, comparison and sectors.",
    tags: ["Python", "FastAPI", "Scikit-learn", "Pandas", "React", "Chart.js"],
    links: [{ label: "Source", href: "https://github.com/knah1d/StockVision" }],
  },
];

export const skills = [
  { group: "Languages", items: ["Java", "Python", "TypeScript", "JavaScript", "SQL", "C", "C++"] },
  { group: "AI / ML", items: ["LLMs (Ollama, Groq)", "Structured output", "Scikit-learn", "XGBoost", "NumPy", "Pandas", "Google Earth Engine"] },
  { group: "Frameworks", items: ["Spring Boot", "Spring Security", "Hibernate / JPA", "Angular", "FastAPI", "Next.js", "React"] },
  { group: "Data & Tools", items: ["PostgreSQL", "Oracle", "Docker", "Git", "GitHub Actions", "JUnit", "Mockito", "pytest", "Microsoft Graph"] },
  { group: "Domain", items: ["ERP / HRM", "Payroll", "Tax", "Provident Fund", "Recruitment", "Maker-checker approvals"] },
];

export const education = [
  {
    school: "University of Dhaka — Institute of Information Technology",
    degree: "BSc in Software Engineering",
    detail: "CGPA 3.34 / 4.00 (through 7th semester)",
    period: "Expected Nov 2026",
  },
  {
    school: "Govt. Science College, Dhaka",
    degree: "Higher Secondary Certificate",
    detail: "GPA 5.00 / 5.00",
    period: "2021",
  },
];
