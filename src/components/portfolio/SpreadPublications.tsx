import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadPublications: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-[#fbf9f5] ${className}`}>
      {/* Clean Empty Spread with subtle paper texture */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
    </div>
  )
}
