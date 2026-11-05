import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadCertifications: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white ${className}`}>
      {/* High-Resolution Design from Designs/Page6.png */}
      <img
        src="/designs/Page6.png?v=20261105"
        alt="Certifications Spread"
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain pointer-events-none select-none"
      />
    </div>
  )
}
