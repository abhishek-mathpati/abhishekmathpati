import { JournalPage, JournalMetadata } from '../types/journal'

export const defaultMetadata: JournalMetadata = {
  title: "Abhishek Mathpati • Portfolio",
  year: "2026",
  totalPageDisplay: "16 Pages (8 Spreads)",
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

  // SPREAD 4: Flagship Projects (Page 4)
  {
    id: "page-4",
    pageNumber: 4,
    title: "Projects",
    subtitle: "SecureShare, College Website, SMIA, QPAT & Park Hub",
    date: "2023 - 2026",
    location: "Hyderabad, India",
    tags: ["Projects", "Blockchain", "IPFS", "FastAPI", "Flutter", "Forensics"],
    paperTexture: "cream",
    accentColor: "#2563eb",
    summary: "Decentralized messaging, automated academic question paper generation, police evidence documentation, and parking systems.",
    customLayout: "projects",
    photos: [],
    stickers: [],
    notes: []
  },

  // SPREAD 5: Skills (Page 5)
  {
    id: "page-5",
    pageNumber: 5,
    title: "Technical Skills",
    subtitle: "Cybersecurity, Tools, Languages, Backend, Systems & AI",
    date: "2020 - 2026",
    location: "Hyderabad, India",
    tags: ["Skills", "Cybersecurity", "Forensics", "Tools", "Languages", "Backend", "AI"],
    paperTexture: "cream",
    accentColor: "#0284c7",
    summary: "Comprehensive technical toolset across cyber forensics, programming languages, backend frameworks, distributed systems, and AI.",
    customLayout: "skills",
    photos: [],
    stickers: [],
    notes: []
  },

  // SPREAD 6: Certifications (Page 6)
  {
    id: "page-6",
    pageNumber: 6,
    title: "Certifications",
    subtitle: "Forensics, Ethical Hacking, ML & National Cadet Corps",
    date: "2020 - 2026",
    location: "Hyderabad, India",
    tags: ["Certifications", "Cyber Crime", "Forensics", "Ethical Hacking", "Machine Learning", "NCC"],
    paperTexture: "cream",
    accentColor: "#16a34a",
    summary: "Professional certifications and accredited credentials in cyber crime investigations, ethical hacking, and machine learning.",
    customLayout: "certifications",
    photos: [],
    stickers: [],
    notes: []
  },

  // SPREAD 7: Awards & Volunteering (Page 7)
  {
    id: "page-7",
    pageNumber: 7,
    title: "Awards & Volunteering",
    subtitle: "Contest Winner, Hackathons, CSI, NSS & NCC",
    date: "2022 - 2026",
    location: "Hyderabad, India",
    tags: ["Awards", "Volunteering", "Hackathon", "Coding Contest", "CSI", "NSS", "NCC"],
    paperTexture: "cream",
    accentColor: "#991b1b",
    summary: "First place coding contest winner, TECHTONIC '24 Hackathon champion, CSI leadership, and national service initiatives.",
    customLayout: "awards-volunteering",
    photos: [],
    stickers: [],
    notes: []
  },

  // SPREAD 8: Languages & Contact (Page 8)
  {
    id: "page-8",
    pageNumber: 8,
    title: "Languages & Connect",
    subtitle: "Multilingual Proficiency, Direct Reachout & Social Channels",
    date: "2026",
    location: "Hyderabad, India",
    tags: ["Languages", "Contact", "Connect", "GitHub", "LinkedIn", "Resume"],
    paperTexture: "cream",
    accentColor: "#be185d",
    summary: "Multilingual proficiency across 5 languages and direct collaboration channels including GitHub, LinkedIn, email, and CV.",
    customLayout: "contact",
    photos: [],
    stickers: [],
    notes: []
  }
]
