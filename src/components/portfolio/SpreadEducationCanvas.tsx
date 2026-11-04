import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadEducationCanvas: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white ${className}`}>
      {/* High-Resolution Master Export with Uniform Typography and Crisp Contrast */}
      <img
        src="/designs/Page1.png?v=uniform"
        alt="Education Spread"
        loading="eager"
        fetchPriority="high"
        style={{
          imageRendering: '-webkit-optimize-contrast',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
        className="w-full h-full object-fill pointer-events-none select-none"
      />
    </div>
  )
}
