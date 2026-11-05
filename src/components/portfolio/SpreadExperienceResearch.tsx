import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadExperienceResearch: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-[#2c1d11] ${className}`}>
      {/* High-Resolution Rebuilt Master Export from Designs/Page2.png */}
      <img
        src="/designs/Page2.png?v=uniform"
        alt="Work Experience Spread"
        loading="eager"
        fetchPriority="high"
        className="w-full h-full object-fill pointer-events-none select-none"
      />
    </div>
  )
}
