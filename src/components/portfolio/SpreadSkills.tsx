import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadSkills: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white crisp-page ${className}`}>
      {/* High-Resolution Design from Designs/Page5.png */}
      <img
        src="/designs/Page5.png?v=2"
        alt="Skills Spread"
        loading="eager"
        fetchPriority="high"
        className="w-full h-full object-fill pointer-events-none select-none crisp-page"
      />
    </div>
  )
}
