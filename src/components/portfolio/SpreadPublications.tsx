import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadPublications: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white ${className}`}>
      {/* High-Resolution Master Design from Designs/Page3.png */}
      <img
        src="/designs/Page3.png?v=20261105"
        alt="Publications Spread"
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain pointer-events-none select-none"
      />

      {/* 1. Interactive Green Tape: "Read The Paper" (ICSSEECC 2026 - IEEE Xplore) */}
      <a
        href="https://ieeexplore.ieee.org/document/11722208"
        target="_blank"
        rel="noopener noreferrer"
        title="Read Paper on IEEE Xplore: An Intelligent Decentralized Secure File Sharing System with Privacy-Preserving Access Control (ICSSEECC 2026)"
        aria-label="Read Paper on IEEE Xplore: An Intelligent Decentralized Secure File Sharing System"
        className="group absolute z-10 cursor-pointer select-none -translate-x-1/2 -translate-y-1/2 rotate-[-0.4deg] transition-transform duration-300 ease-out hover:scale-108 active:scale-95"
        style={{
          left: '37.370%',
          top: '85.880%',
          width: '22.396%',
          height: '12.593%'
        }}
      >
        {/* Exact Original Tape & Text: Straight Pop-Up Only matching Contacts page */}
        <img
          src="/designs/publications/tape_pop_green.png"
          alt="Read The Paper"
          className="relative w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_6px_14px_rgba(0,0,0,0.22)] pointer-events-none select-none"
        />
      </a>

      {/* 2. Interactive Blue Tape: "Read The Paper" (ICCIC 2025 - IJRDET) */}
      <a
        href="https://www.ijrdet.com/files/Volume14Issue12/IJRDET_1225_148.pdf"
        target="_blank"
        rel="noopener noreferrer"
        title="Read Paper on IJRDET: A Web-Based Automation Framework for Instagram Profile Forensics (ICCIC 2025)"
        aria-label="Read Paper on IJRDET: A Web-Based Automation Framework for Instagram Profile Forensics"
        className="group absolute z-10 cursor-pointer select-none -translate-x-1/2 -translate-y-1/2 rotate-[-5.9deg] transition-transform duration-300 ease-out hover:scale-108 active:scale-95"
        style={{
          left: '62.526%',
          top: '46.574%',
          width: '22.188%',
          height: '12.500%'
        }}
      >
        {/* Exact Original Tape & Text: Straight Pop-Up Only matching Contacts page */}
        <img
          src="/designs/publications/tape_pop_blue.png"
          alt="Read The Paper"
          className="relative w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_6px_14px_rgba(0,0,0,0.22)] pointer-events-none select-none"
        />
      </a>

      {/* 3. Bottom-Right Paper Note Tooltip: Accepted, To Appear in IEEE Xplore (ISDDC 2026) */}
      <div
        title="Status: Accepted to appear in IEEE Xplore (ISDDC - 2026)"
        aria-label="Accepted to appear in IEEE Xplore (ISDDC - 2026)"
        className="absolute z-10 cursor-default select-none -translate-x-1/2 -translate-y-1/2"
        style={{
          left: '61.6%',
          top: '85.8%',
          width: '10.5%',
          height: '15.5%'
        }}
      />
    </div>
  )
}
