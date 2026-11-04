import { JournalPage, JournalMetadata } from '../types/journal'

export const defaultMetadata: JournalMetadata = {
  title: "Abhishek Mathpati • Portfolio",
  year: "2026",
  totalPageDisplay: "12 Pages (6 Spreads)",
  author: "Abhishek Mathpati",
  description: "Interactive 3D Portfolio & Selected Works in Decentralized Systems, Forensics, and Applied Security."
}

export const samplePages: JournalPage[] = [
  // SPREAD 1: Education (Page 1)
  {
    id: "page-1",
    pageNumber: 1,
    title: "Education",
    subtitle: "Academic Journey",
    date: "2020 - 2026",
    location: "Hyderabad, India",
    tags: ["Education", "Osmania University", "Computer Science"],
    paperTexture: "cream",
    accentColor: "#1d4ed8",
    summary: "Bachelors, Intermediate, and Secondary School education qualifications.",
    customLayout: "education",
    photos: [],
    stickers: [],
    notes: []
  },

  // SPREAD 2: Work Experience (Page 2)
  {
    id: "page-2",
    pageNumber: 2,
    title: "Work Experience",
    subtitle: "Teleparadigm Networks & Telangana Police",
    date: "2024 - 2025",
    location: "Hyderabad, India",
    tags: ["Experience", "Cybersecurity", "Software Developer", "Teleparadigm", "Telangana Police"],
    paperTexture: "cream",
    accentColor: "#5c3d2e",
    summary: "Software Developer at Teleparadigm Networks and Cybersecurity Intern at Women Safety Wing, Telangana Police.",
    customLayout: "experience",
    photos: [],
    stickers: [],
    notes: []
  },

  // SPREAD 3: Research Publications (Page 3)
  {
    id: "page-3",
    pageNumber: 3,
    title: "Publications",
    subtitle: "Peer-Reviewed Research & Conference Papers",
    date: "2025 - 2026",
    location: "IEEE Xplore & IJRDET",
    tags: ["Publications", "Research", "IEEE Xplore", "Decentralized Systems", "OSINT", "LLM Benchmark"],
    paperTexture: "cream",
    accentColor: "#059669",
    summary: "Published and accepted research papers in decentralized file sharing, Instagram profile forensics, and LLM adversarial benchmarks.",
    customLayout: "publications",
    photos: [],
    stickers: [],
    notes: []
  },

  // SPREAD 4: Flagship Projects I & II (Page 4)
  {
    id: "page-4",
    pageNumber: 4,
    title: "Flagship Engineering Systems",
    subtitle: "SecureShare, QPAT, SMIA & Hackathons",
    date: "2023 - 2026",
    location: "Hyderabad, India",
    tags: ["Projects", "Blockchain", "IPFS", "FastAPI", "Flutter", "Forensics"],
    paperTexture: "cream",
    accentColor: "#2563eb",
    summary: "Decentralized messaging, automated academic question paper generation, police evidence documentation, and award-winning web portals.",
    customLayout: "projects",
    photos: [],
    stickers: [],
    notes: []
  },

  // SPREAD 5: Technical Skills Matrix & Honors (Page 5)
  {
    id: "page-5",
    pageNumber: 5,
    title: "Skills Matrix & Honors",
    subtitle: "Toolchain, Coding Contest Winner & NLU Forensics",
    date: "2020 - 2026",
    location: "Hyderabad, India",
    tags: ["Skills", "Awards", "Certifications", "NLU Odisha", "NPTEL"],
    paperTexture: "cream",
    accentColor: "#d97706",
    summary: "Comprehensive technical matrix across cybersecurity, systems programming, AI, national contest victories, and legal certifications.",
    customLayout: "skills-honors",
    photos: [],
    stickers: [],
    notes: []
  },

  // SPREAD 6: Security Philosophy & Contact (Page 6)
  {
    id: "page-6",
    pageNumber: 6,
    title: "Principles & Contact",
    subtitle: "Zero-Trust Engineering & Direct Reachout",
    date: "2026",
    location: "Hyderabad, India",
    tags: ["Philosophy", "Zero-Trust", "Contact", "Connect"],
    paperTexture: "cream",
    accentColor: "#0f172a",
    summary: "Core engineering principles in zero-trust resilience and direct contact channels for professional collaboration.",
    customLayout: "contact",
    photos: [],
    stickers: [],
    notes: []
  }
]
