import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadEducationCanvas: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white ${className}`}>
      {/* High-Resolution Design from Designs/Page1.png */}
      <img
        src="/designs/Page1.png?v=original"
        alt="Education Spread"
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain pointer-events-none select-none"
      />
    </div>
  )
}
