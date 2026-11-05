import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadPublications: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white ${className}`}>
      {/* High-Resolution Design from Designs/Page3.png */}
      <img
        src="/designs/Page3.png?v=uniform"
        alt="Publications Spread"
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain pointer-events-none select-none"
      />

      {/* Interactive Link 1: Left Paper (IEEE Xplore) */}
      <a
        href="https://ieeexplore.ieee.org/document/11722208"
        target="_blank"
        rel="noopener noreferrer"
        title="Read Paper: An Intelligent Decentralized Secure File Sharing System with Privacy-Preserving Access Control (IEEE Xplore)"
        className="absolute z-10 cursor-pointer rounded-xs transition-all duration-200 hover:outline hover:outline-2 hover:outline-emerald-500/50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        style={{
          left: '9.4%',
          top: '38.9%',
          width: '27.1%',
          height: '35.2%',
          transform: 'rotate(-4.5deg)'
        }}
        aria-label="Read Paper on IEEE Xplore"
      />

      {/* Interactive Link 2: Top Right Paper (IJRDET) */}
      <a
        href="https://www.ijrdet.com/files/Volume14Issue12/IJRDET_1225_148.pdf"
        target="_blank"
        rel="noopener noreferrer"
        title="Read Paper: A Web-Based Automation Framework for Instagram Profile Forensics (IJRDET)"
        className="absolute z-10 cursor-pointer rounded-xs transition-all duration-200 hover:outline hover:outline-2 hover:outline-blue-500/50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        style={{
          left: '61.5%',
          top: '13.0%',
          width: '29.2%',
          height: '28.7%',
          transform: 'rotate(5deg)'
        }}
        aria-label="Read Paper on IJRDET"
      />
    </div>
  )
}
