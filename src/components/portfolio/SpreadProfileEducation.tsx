import React from 'react'
import { MapPin, Mail, Phone, ExternalLink, GraduationCap, Award, BookOpen } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './PortfolioIcons'

interface SpreadProps {
  className?: string
}

export const SpreadProfileEducation: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full flex bg-[#faf8f5] text-slate-800 select-none overflow-hidden ${className}`}>
      {/* ========================================================= */}
      {/* LEFT PAGE: EXECUTIVE PROFILE & ABOUT (PAGE 1)             */}
      {/* ========================================================= */}
      <div className="w-1/2 h-full flex flex-col justify-between p-6 sm:p-8 pr-7 sm:pr-9 border-r border-slate-200/70 relative">
        {/* Top Section Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
            01 / Executive Profile
          </span>
          <span className="text-[10px] font-mono text-slate-400">Hyderabad, India</span>
        </div>

        {/* Hero Profile Block */}
        <div className="flex items-center gap-4 sm:gap-5 my-auto">
          {/* Real Profile Photo extracted from Resume */}
          <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-slate-300 shadow-md bg-slate-100">
            <img
              src="/profile.png"
              alt="Abhishek Mathpati"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to high quality avatar if profile img fails
                ;(e.target as HTMLElement).style.display = 'none'
              }}
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Abhishek Mathpati
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-blue-700 tracking-wide mt-0.5">
              Software Developer & Security Researcher
            </p>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>Keshav Memorial Engg. College, Osmania University</span>
            </p>
          </div>
        </div>

        {/* Executive Bio / Focus Areas */}
        <div className="bg-white/80 rounded-xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs">
          <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
            Computer Science engineer specializing in <strong>decentralized architectures</strong>,{' '}
            <strong>digital forensics</strong>, and <strong>applied AI security</strong>. Experienced in
            building tamper-evident distributed platforms (Blockchain/IPFS) and assisting law enforcement
            with active cybercrime investigations.
          </p>

          <div className="flex flex-wrap gap-1.5 mt-2.5">
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono font-medium">
              Blockchain & IPFS
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono font-medium">
              FastAPI & Flutter
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono font-medium">
              Digital Forensics & OSINT
            </span>
            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-mono font-medium">
              LLM Adversarial Benchmarking
            </span>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-white rounded-lg p-2.5 border border-slate-200 text-center shadow-2xs">
            <span className="block text-base sm:text-lg font-black text-blue-700 font-mono">8.41</span>
            <span className="block text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              B.E. CGPA
            </span>
          </div>
          <div className="bg-white rounded-lg p-2.5 border border-slate-200 text-center shadow-2xs">
            <span className="block text-base sm:text-lg font-black text-emerald-700 font-mono">3 Papers</span>
            <span className="block text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              IEEE & Journals
            </span>
          </div>
          <div className="bg-white rounded-lg p-2.5 border border-slate-200 text-center shadow-2xs">
            <span className="block text-base sm:text-lg font-black text-amber-700 font-mono">1st Place</span>
            <span className="block text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              National Contest
            </span>
          </div>
        </div>

        {/* Quick Contact Links */}
        <div className="flex items-center justify-between text-[11px] pt-1">
          <a
            href="https://github.com/abhishek-mathpati"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-slate-700 hover:text-black font-medium transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>abhishek-mathpati</span>
          </a>
          <a
            href="https://www.linkedin.com/in/mathpati-abhishek-b654b2296/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-medium transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>Abhishek Mathpati</span>
          </a>
          <span className="text-slate-400 text-[10px] font-mono">abhishekmathpati2027@gmail.com</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-200/60">
          <span>Portfolio • Abhishek Mathpati</span>
          <span>Page 1</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT PAGE: EDUCATION & QUALIFICATIONS (PAGE 2)           */}
      {/* ========================================================= */}
      <div className="w-1/2 h-full flex flex-col justify-between p-6 sm:p-8 pl-7 sm:pr-8 pl-7 sm:pl-9 relative">
        {/* Top Section Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
            02 / Education & Training
          </span>
          <span className="text-[10px] font-mono text-blue-700 font-semibold">Osmania University & TSBIE</span>
        </div>

        {/* Header Title */}
        <div className="mt-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-700" />
            <span>Academic Qualifications</span>
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Formal technical education and continuous academic excellence.
          </p>
        </div>

        {/* 3 Education Cards */}
        <div className="space-y-2.5 my-auto">
          {/* Card 1: College */}
          <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs flex items-center justify-between gap-3 hover:border-blue-300 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                  2022 – 2026
                </span>
                <span className="text-xs font-bold text-slate-900 font-mono">
                  Grade: <span className="text-blue-700">8.41 / 10 CGPA</span>
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-1 truncate">
                Bachelors of Engineering in Computer Science
              </h3>
              <p className="text-[11px] text-slate-600 truncate">
                Keshav Memorial Engg. College • Osmania University
              </p>
              <div className="flex items-center gap-2 mt-1 text-[9px] text-slate-400 font-mono">
                <span>City: Hyderabad, India</span>
                <span>•</span>
                <span className="text-slate-600 font-medium">Level in EQF: 6</span>
              </div>
            </div>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
                alt="Osmania University KMEC"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Card 2: Intermediate */}
          <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs flex items-center justify-between gap-3 hover:border-emerald-300 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                  2020 – 2022
                </span>
                <span className="text-xs font-bold text-slate-900 font-mono">
                  Grade: <span className="text-emerald-700">96.9 %</span>
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-1 truncate">
                Intermediate in MPC (Maths, Physics, Chem)
              </h3>
              <p className="text-[11px] text-slate-600 truncate">Narayana Junior College, Hyderabad</p>
              <div className="flex items-center gap-2 mt-1 text-[9px] text-slate-400 font-mono">
                <span>City: Hyderabad, India</span>
                <span>•</span>
                <span className="text-slate-600 font-medium">Level in EQF: 5</span>
              </div>
            </div>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
              <img
                src="/education/intermediate.jpg"
                alt="Narayana Junior College"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Card 3: School */}
          <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs flex items-center justify-between gap-3 hover:border-amber-300 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] font-mono bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-semibold">
                  2020
                </span>
                <span className="text-xs font-bold text-slate-900 font-mono">
                  Grade: <span className="text-amber-700">10 / 10 GPA</span>
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-1 truncate">
                Secondary School Certificate (SSC)
              </h3>
              <p className="text-[11px] text-slate-600 truncate">St. Marks Boys Town High School</p>
              <div className="flex items-center gap-2 mt-1 text-[9px] text-slate-400 font-mono">
                <span>City: Hyderabad, India</span>
                <span>•</span>
                <span className="text-slate-600 font-medium">Level in EQF: 4</span>
              </div>
            </div>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
              <img
                src="/education/school.jpg"
                alt="St. Marks Boys Town High School"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-200/60">
          <span>Academic Records & EQF Standards</span>
          <span>Page 2</span>
        </div>
      </div>
    </div>
  )
}

