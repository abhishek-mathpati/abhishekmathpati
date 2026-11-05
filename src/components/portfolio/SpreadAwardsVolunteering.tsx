import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadAwardsVolunteering: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white ${className}`}>
      {/* High-Resolution Design from Designs/Page7.png */}
      <img
        src="/designs/Page7.png?v=20261105"
        alt="Awards and Volunteering Spread"
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain pointer-events-none select-none"
      />
    </div>
  )
}
