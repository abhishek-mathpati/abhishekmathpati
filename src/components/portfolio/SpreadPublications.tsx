import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadPublications: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white ${className}`}>
      {/* High-Definition Master Design */}
      <img
        src="/designs/Page3.png"
        alt="Publications Spread"
        className="w-full h-full object-fill pointer-events-none select-none"
      />

      {/* Interactive Link 1: Left Paper (IEEE Xplore) */}
      <a
        href="https://ieeexplore.ieee.org/document/11722208"
        target="_blank"
        rel="noopener noreferrer"
        title="Read Paper: An Intelligent Decentralized Secure File Sharing System with Privacy-Preserving Access Control (IEEE Xplore)"
        className="absolute z-10 cursor-pointer rounded-xs transition-all duration-200 hover:outline hover:outline-2 hover:outline-emerald-500/50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        style={{
          left: '25.4%',
          top: '84.2%',
          width: '22.2%',
          height: '8.8%',
          transform: 'rotate(-2deg)'
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
          left: '49.8%',
          top: '41.6%',
          width: '22.8%',
          height: '9.6%',
          transform: 'rotate(-4deg)'
        }}
        aria-label="Read Paper on IJRDET"
      />
    </div>
  )
}
