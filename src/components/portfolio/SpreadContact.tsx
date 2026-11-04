import React, { useState } from 'react'
import { Mail, Phone, MapPin, ExternalLink, Shield, Send, CheckCircle2, MessageSquare, Terminal } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './PortfolioIcons'
import { ContactModal } from '../contact/ContactModal'

interface SpreadProps {
  className?: string
}

export const SpreadContact: React.FC<SpreadProps> = ({ className = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className={`relative w-full h-full flex bg-[#faf8f5] text-slate-800 select-none overflow-hidden ${className}`}>
      {/* ========================================================= */}
      {/* LEFT PAGE: ENGINEERING PHILOSOPHY & LANGUAGES (PAGE 9)    */}
      {/* ========================================================= */}
      <div className="w-1/2 h-full flex flex-col justify-between p-6 sm:p-8 pr-7 sm:pr-9 border-r border-slate-200/70 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
            09 / Engineering Principles
          </span>
          <span className="text-[10px] font-mono text-blue-700 font-semibold">Philosophy & Languages</span>
        </div>

        {/* Title */}
        <div className="mt-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-700" />
            <span>Core Engineering Philosophy</span>
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Principles guiding decentralized architecture, zero-trust security, and forensic integrity.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="space-y-2.5 my-auto">
          <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>Zero-Trust & Cryptographic Access Control</span>
            </h3>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Security must be native, not an afterthought. Architecting dynamic RBAC, tokenized access controls, and anti-leakage protections to eliminate unauthorized data exfiltration.
            </p>
          </div>

          <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Decentralized & Tamper-Evident Resilience</span>
            </h3>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Replacing single points of failure with content-addressed storage (IPFS) and cryptographic immutability (Blockchain) for audit-ready transparency.
            </p>
          </div>

          <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
              <span>Forensic Rigor & Evidence Provenance</span>
            </h3>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Ensuring court-admissible standards through automated SHA-256 evidence hashing, timestamp verification, and strict chain-of-custody documentation.
            </p>
          </div>

          {/* Multilingual Proficiency from Resume */}
          <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-200/80">
            <span className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Spoken Languages
            </span>
            <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-600">
              <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">Kannada (Native)</span>
              <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">English (Fluent)</span>
              <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">Telugu (Fluent)</span>
              <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">Hindi (Fluent)</span>
              <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">Marathi</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-200/60">
          <span>Security Principles & Multilingual Proficiency</span>
          <span>Page 9</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT PAGE: CONTACT & CONNECT (PAGE 10)                   */}
      {/* ========================================================= */}
      <div className="w-1/2 h-full flex flex-col justify-between p-6 sm:p-8 pl-7 sm:pl-9 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
            10 / Connect & Collaborate
          </span>
          <span className="text-[10px] font-mono text-emerald-700 font-semibold">Available for Roles</span>
        </div>

        {/* Title */}
        <div className="mt-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-700" />
            <span>Get In Touch</span>
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Interested in collaborating on software engineering, cybersecurity, or research projects.
          </p>
        </div>

        {/* Direct Contact Cards */}
        <div className="space-y-2.5 my-auto">
          {/* Quick Message Modal Trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsModalOpen(true)
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-xs shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-98"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Direct Message (Email via Resend)</span>
          </button>

          {/* Email */}
          <a
            href="mailto:abhishekmathpati2027@gmail.com"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono text-slate-400 uppercase font-medium">Direct Email</span>
                <span className="block text-xs sm:text-sm font-bold text-slate-900 font-mono">
                  abhishekmathpati2027@gmail.com
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </a>

          {/* Phone */}
          <a
            href="tel:+918106344345"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-emerald-400 hover:shadow-xs transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono text-slate-400 uppercase font-medium">Mobile Phone</span>
                <span className="block text-xs sm:text-sm font-bold text-slate-900 font-mono">
                  (+91) 8106344345
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </a>

          {/* GitHub & LinkedIn side-by-side */}
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href="https://github.com/abhishek-mathpati"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-black hover:shadow-xs transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <GithubIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-[9px] font-mono text-slate-400 uppercase font-medium">GitHub</span>
                <span className="block text-xs font-bold text-slate-900 truncate font-mono">
                  abhishek-mathpati
                </span>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/abhishek-mathpati"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-blue-600 hover:shadow-xs transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <LinkedinIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-[9px] font-mono text-slate-400 uppercase font-medium">LinkedIn</span>
                <span className="block text-xs font-bold text-slate-900 truncate font-mono">
                  Abhishek Mathpati
                </span>
              </div>
            </a>
          </div>

          {/* Location badge */}
          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Hyderabad, Telangana, India</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
              Open to Opportunities
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-200/60">
          <span>End of Selected Works • Abhishek Mathpati</span>
          <span>Page 10</span>
        </div>
      </div>

      {/* Interactive Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

