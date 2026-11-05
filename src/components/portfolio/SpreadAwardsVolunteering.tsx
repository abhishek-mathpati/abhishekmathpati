import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadAwardsVolunteering: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white crisp-page ${className}`}>
      {/* High-Resolution Design from Designs/Page7.png */}
      <img
        src="/designs/Page7.png?v=2"
        alt="Awards and Volunteering Spread"
        loading="eager"
        fetchPriority="high"
        className="w-full h-full object-fill pointer-events-none select-none crisp-page"
      />
    </div>
  )
}
