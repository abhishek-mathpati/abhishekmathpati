import React from 'react'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './PortfolioIcons'

interface SpreadProps {
  className?: string
}

export const SpreadProjects: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white ${className}`}>
      {/* High-Resolution Design from Designs/Page4.png */}
      <img
        src="/designs/Page4.png?v=20261105"
        alt="Projects Spread"
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain pointer-events-none select-none"
      />

      {/* 1. SecureShare GitHub Repository */}
      <a
        href="https://github.com/abhishek-mathpati/SecureShare"
        target="_blank"
        rel="noopener noreferrer"
        title="Open SecureShare Repository (GitHub)"
        className="group absolute z-10 cursor-pointer rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] overflow-hidden border border-black/15 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 ease-out flex items-center justify-center active:scale-[0.98]"
        style={{
          left: '2.81%',
          top: '33.06%',
          width: '19.74%',
          height: '35.09%'
        }}
        aria-label="SecureShare GitHub Repository"
      >
        {/* Confined Card Blur Overlay on Hover */}
        <div className="absolute inset-0 bg-black/15 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Floating GitHub Badge */}
        <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/90 text-white border border-white/20 shadow-xl opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none select-none">
          <GithubIcon className="w-4 h-4" />
          <span className="text-xs font-semibold font-sans tracking-wide">GitHub</span>
          <ExternalLink className="w-3.5 h-3.5 text-white/70" />
        </div>
      </a>

      {/* 2. College Website GitHub Repository */}
      <a
        href="https://github.com/abhishek-mathpati/College-Website"
        target="_blank"
        rel="noopener noreferrer"
        title="Open College Website Repository (GitHub)"
        className="group absolute z-10 cursor-pointer rounded-[18px] sm:rounded-[22px] lg:rounded-[26px] overflow-hidden border border-black/15 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 ease-out flex items-center justify-center active:scale-[0.98]"
        style={{
          left: '26.09%',
          top: '55.28%',
          width: '16.61%',
          height: '29.63%'
        }}
        aria-label="College Website GitHub Repository"
      >
        {/* Confined Card Blur Overlay on Hover */}
        <div className="absolute inset-0 bg-black/15 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Floating GitHub Badge */}
        <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/90 text-white border border-white/20 shadow-xl opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none select-none">
          <GithubIcon className="w-4 h-4" />
          <span className="text-xs font-semibold font-sans tracking-wide">GitHub</span>
          <ExternalLink className="w-3.5 h-3.5 text-white/70" />
        </div>
      </a>

      {/* 3. SMIA (Social Media Investigative Assistant) GitHub Repository */}
      <a
        href="https://github.com/abhishek-mathpati/social-media-investigative-assistant-for-law-enforcement"
        target="_blank"
        rel="noopener noreferrer"
        title="Open Social Media Investigative Assistant Repository (GitHub)"
        className="group absolute z-10 cursor-pointer rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] overflow-hidden border border-black/15 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 ease-out flex items-center justify-center active:scale-[0.98]"
        style={{
          left: '53.28%',
          top: '9.07%',
          width: '19.06%',
          height: '34.07%'
        }}
        aria-label="Social Media Investigative Assistant GitHub Repository"
      >
        {/* Confined Card Blur Overlay on Hover */}
        <div className="absolute inset-0 bg-black/15 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Floating GitHub Badge */}
        <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/90 text-white border border-white/20 shadow-xl opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none select-none">
          <GithubIcon className="w-4 h-4" />
          <span className="text-xs font-semibold font-sans tracking-wide">GitHub</span>
          <ExternalLink className="w-3.5 h-3.5 text-white/70" />
        </div>
      </a>

      {/* 4. QPAT (Question Paper Automation Tool) GitHub Repository */}
      <a
        href="https://github.com/abhishek-mathpati/Question-Paper-Automation-Tool"
        target="_blank"
        rel="noopener noreferrer"
        title="Open Question Paper Automation Tool Repository (GitHub)"
        className="group absolute z-10 cursor-pointer rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] overflow-hidden border border-black/15 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 ease-out flex items-center justify-center active:scale-[0.98]"
        style={{
          left: '78.13%',
          top: '29.63%',
          width: '18.59%',
          height: '33.06%'
        }}
        aria-label="Question Paper Automation Tool GitHub Repository"
      >
        {/* Confined Card Blur Overlay on Hover */}
        <div className="absolute inset-0 bg-black/15 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Floating GitHub Badge */}
        <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/90 text-white border border-white/20 shadow-xl opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none select-none">
          <GithubIcon className="w-4 h-4" />
          <span className="text-xs font-semibold font-sans tracking-wide">GitHub</span>
          <ExternalLink className="w-3.5 h-3.5 text-white/70" />
        </div>
      </a>

      {/* 5. Park Hub GitHub Repository */}
      <a
        href="https://github.com/abhishek-mathpati/Park-Hub"
        target="_blank"
        rel="noopener noreferrer"
        title="Open Park Hub Repository (GitHub)"
        className="group absolute z-10 cursor-pointer rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] overflow-hidden border border-black/15 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 ease-out flex items-center justify-center active:scale-[0.98]"
        style={{
          left: '58.70%',
          top: '64.07%',
          width: '18.75%',
          height: '33.52%'
        }}
        aria-label="Park Hub GitHub Repository"
      >
        {/* Confined Card Blur Overlay on Hover */}
        <div className="absolute inset-0 bg-black/15 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Floating GitHub Badge */}
        <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/90 text-white border border-white/20 shadow-xl opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none select-none">
          <GithubIcon className="w-4 h-4" />
          <span className="text-xs font-semibold font-sans tracking-wide">GitHub</span>
          <ExternalLink className="w-3.5 h-3.5 text-white/70" />
        </div>
      </a>
    </div>
  )
}
