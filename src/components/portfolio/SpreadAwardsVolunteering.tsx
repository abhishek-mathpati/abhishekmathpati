import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadAwardsVolunteering: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white ${className}`}>
      <img
        src="/designs/Page7.png"
        alt="Awards and Volunteering Spread"
        className="w-full h-full object-fill pointer-events-none select-none"
      />
    </div>
  )
}

