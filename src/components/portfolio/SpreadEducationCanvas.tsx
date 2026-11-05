import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadEducationCanvas: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white crisp-page ${className}`}>
      {/* High-Resolution Design from Designs/Page1.png */}
      <img
        src="/designs/Page1.png?v=2"
        alt="Education Spread"
        loading="eager"
        fetchPriority="high"
        className="w-full h-full object-fill pointer-events-none select-none crisp-page"
      />
    </div>
  )
}
