import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadEducationCanvas: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white ${className}`}>
      <img
        src="/education/education_spread.png"
        alt="Education"
        className="w-full h-full object-fill pointer-events-none select-none"
      />
    </div>
  )
}
