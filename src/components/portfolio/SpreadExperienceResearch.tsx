import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadExperienceResearch: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-[#2c1d11] ${className}`}>
      {/* 2K High-Definition Base (Includes clipboard, spiral notebook spine, cursive Work Experience headings, notes, clips & plaid texture) */}
      <img
        src="/experience/experience_spread_2k.jpg"
        alt="Work Experience Spread"
        className="w-full h-full object-fill pointer-events-none select-none"
      />
    </div>
  )
}
