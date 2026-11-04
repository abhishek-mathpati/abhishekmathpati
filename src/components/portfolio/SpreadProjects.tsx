import React from 'react'
import { Terminal, ShieldCheck, Lock, ExternalLink, Code, Layers, Globe, Smartphone, Trophy } from 'lucide-react'
import { GithubIcon } from './PortfolioIcons'

interface SpreadProps {
  className?: string
}

export const SpreadProjects: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full flex bg-[#faf8f5] text-slate-800 select-none overflow-hidden ${className}`}>
      {/* ========================================================= */}
      {/* LEFT PAGE: FLAGSHIP PROJECTS • PART I (PAGE 5)            */}
      {/* ========================================================= */}
      <div className="w-1/2 h-full flex flex-col justify-between p-6 sm:p-8 pr-7 sm:pr-9 border-r border-slate-200/70 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
            05 / Featured Engineering Systems
          </span>
          <span className="text-[10px] font-mono text-blue-700 font-semibold">Decentralized & AI</span>
        </div>

        {/* Title */}
        <div className="mt-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-700" />
            <span>Distributed & NLP Platforms</span>
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Production-grade architectures combining cryptography, real-time sync, and NLP automation.
          </p>
        </div>

        {/* 2 Flagship Projects */}
        <div className="space-y-3.5 my-auto">
          {/* Project 1: SecureShare */}
          <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/90 shadow-xs hover:border-blue-400 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">SecureShare</h3>
                  <span className="text-[9px] font-mono bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-semibold">
                    Oct 2025 – Jun 2026
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-blue-700">
                  Decentralized Secure File Sharing & Communication Platform
                </p>
              </div>

              <a
                href="https://github.com/abhishek-mathpati/SecureShare"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-[10px] font-mono font-semibold text-slate-700 hover:text-black shrink-0 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Repo</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
              Decentralized, tamper-evident messaging platform using blockchain anchoring and IPFS storage, backed by a modular FastAPI backend and hardened Flutter client.
            </p>

            <ul className="mt-2 space-y-1 text-[10px] sm:text-[11px] text-slate-700">
              <li className="flex items-start gap-1.5">
                <span className="text-blue-600 font-bold">•</span>
                <span>Engineered real-time WebSocket communication enforced by JWT auth, strict RBAC, and admin audit visibility.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-blue-600 font-bold">•</span>
                <span>Integrated ephemeral file-sharing controls with anti-screenshot and screen-recording protections.</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-slate-100">
              <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-mono">Blockchain</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-mono">IPFS</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-mono">FastAPI</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-mono">Flutter</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-mono">WebSockets</span>
            </div>
          </div>

          {/* Project 2: QPAT */}
          <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/90 shadow-xs hover:border-emerald-400 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">QPAT</h3>
                  <span className="text-[9px] font-mono bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-semibold">
                    Sep 2025 – Feb 2026
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-emerald-700">
                  Question Paper Automation Tool • Academic Assessment System
                </p>
              </div>

              <a
                href="https://github.com/abhishek-mathpati/Question-Paper-Automation-Tool"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-[10px] font-mono font-semibold text-slate-700 hover:text-black shrink-0 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Repo</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
              Blueprint-driven automated question paper generation platform using a FastAPI backend and Flutter frontend, strictly aligned with academic regulations.
            </p>

            <ul className="mt-2 space-y-1 text-[10px] sm:text-[11px] text-slate-700">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Integrated NLP-powered semantic analysis, Bloom’s Taxonomy classification, and Course Outcome mapping.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Automated syntax validation while generating password-protected PDFs alongside BT-level summary analytics.</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-slate-100">
              <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-mono">NLP</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-mono">Bloom's Taxonomy</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-mono">FastAPI</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-mono">Flutter</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-mono">PDF Generation</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-200/60">
          <span>Decentralized Platforms & Assessment Engines</span>
          <span>Page 5</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT PAGE: FLAGSHIP PROJECTS • PART II (PAGE 6)           */}
      {/* ========================================================= */}
      <div className="w-1/2 h-full flex flex-col justify-between p-6 sm:p-8 pl-7 sm:pl-9 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
            06 / Applied Tools & Hackathons
          </span>
          <span className="text-[10px] font-mono text-purple-700 font-semibold">Forensics & Web</span>
        </div>

        {/* Title */}
        <div className="mt-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-purple-700" />
            <span>Forensic & Interactive Applications</span>
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Tools built for authorized law enforcement, hackathons, and real-time transit.
          </p>
        </div>

        {/* 3 Projects */}
        <div className="space-y-2.5 my-auto">
          {/* Project 1: SMIA */}
          <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:border-purple-300 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">SMIA • Law Enforcement Assistant</h3>
                </div>
                <p className="text-[10px] sm:text-[11px] font-semibold text-purple-700">
                  Digital Forensic Documentation Tool (Feb 2025 – Aug 2025)
                </p>
              </div>

              <a
                href="https://github.com/abhishek-mathpati/social-media-investigative-assistant-for-law-enforcement"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-[9px] font-mono font-semibold text-slate-700 hover:text-black shrink-0 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded transition-colors"
              >
                <GithubIcon className="w-3 h-3" />
                <span>Repo</span>
              </a>
            </div>

            <p className="text-[10px] sm:text-[11px] text-slate-600 mt-1 leading-normal">
              Flutter forensic application enabling structured, case-oriented social media analysis for authorized law enforcement. Engineered timestamp-validated screenshot evidence capture with automated court-admissible PDF reports.
            </p>

            <div className="flex flex-wrap gap-1 mt-1.5">
              <span className="px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 text-[9px] font-mono">Flutter</span>
              <span className="px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 text-[9px] font-mono">Zero-Scraping Compliance</span>
              <span className="px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 text-[9px] font-mono">Encrypted Local DB</span>
            </div>
          </div>

          {/* Project 2: College Portal (Hackathon Winner) */}
          <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:border-amber-300 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-600" />
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">College Web Portal</h3>
                  <span className="text-[9px] font-mono bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">
                    1st Place (30+ Teams)
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] font-semibold text-amber-700">
                  National-Level Hackathon Winner (Feb 2024 – May 2024)
                </p>
              </div>
            </div>

            <p className="text-[10px] sm:text-[11px] text-slate-600 mt-1 leading-normal">
              Designed a responsive, high-performance college web portal using HTML, CSS, and JavaScript. Outperformed 30+ competing teams in a national hackathon with sub-second page loads and accessible UI.
            </p>

            <div className="flex flex-wrap gap-1 mt-1.5">
              <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[9px] font-mono">HTML5 / CSS3</span>
              <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[9px] font-mono">Vanilla JavaScript</span>
              <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[9px] font-mono">Web Performance</span>
            </div>
          </div>

          {/* Project 3: Park Hub */}
          <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Park Hub: Smart Parking System</h3>
                <p className="text-[10px] sm:text-[11px] font-semibold text-blue-700">
                  Urban Mobility Mobile App (Oct 2023 – Feb 2024)
                </p>
              </div>
            </div>

            <p className="text-[10px] sm:text-[11px] text-slate-600 mt-1 leading-normal">
              Smart urban parking application using Flutter and Firebase. Features real-time spot availability, dynamic pricing models, interactive mapping, and secure payment processing.
            </p>

            <div className="flex flex-wrap gap-1 mt-1.5">
              <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[9px] font-mono">Flutter</span>
              <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[9px] font-mono">Firebase</span>
              <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[9px] font-mono">Interactive Maps</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-200/60">
          <span>Forensics, Mobility & Web Architecture</span>
          <span>Page 6</span>
        </div>
      </div>
    </div>
  )
}

