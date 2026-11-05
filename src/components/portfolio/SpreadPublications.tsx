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
        className="absolute z-10 cursor-pointer select-none transition-transform duration-200 ease-out active:scale-[0.98]"
        style={{
          left: '37.370%',
          top: '85.880%',
          width: '22.396%',
          height: '12.593%',
          transform: 'translate(-50%, -50%) rotate(-0.4deg)'
        }}
      />

      {/* 2. Interactive Blue Tape: "Read The Paper" (ICCIC 2025 - IJRDET) */}
      <a
        href="https://www.ijrdet.com/files/Volume14Issue12/IJRDET_1225_148.pdf"
        target="_blank"
        rel="noopener noreferrer"
        title="Read Paper on IJRDET: A Web-Based Automation Framework for Instagram Profile Forensics (ICCIC 2025)"
        aria-label="Read Paper on IJRDET: A Web-Based Automation Framework for Instagram Profile Forensics"
        className="absolute z-10 cursor-pointer select-none transition-transform duration-200 ease-out active:scale-[0.98]"
        style={{
          left: '62.526%',
          top: '46.574%',
          width: '22.188%',
          height: '12.500%',
          transform: 'translate(-50%, -50%) rotate(-5.9deg)'
        }}
      />

      {/* 3. Bottom-Right Paper Note Tooltip: Accepted, To Appear in IEEE Xplore (ISDDC 2026) */}
      <div
        title="Status: Accepted to appear in IEEE Xplore (ISDDC - 2026)"
        aria-label="Accepted to appear in IEEE Xplore (ISDDC - 2026)"
        className="absolute z-10 cursor-default select-none"
        style={{
          left: '61.6%',
          top: '85.8%',
          width: '10.5%',
          height: '15.5%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  )
}
