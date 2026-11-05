import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadProjects: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white ${className}`}>
      {/* High-Resolution Design from Designs/Page4.png */}
      <img
        src="/designs/Page4.png?v=3"
        alt="Projects Spread"
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain pointer-events-none select-none"
      />

      {/* Interactive Link: SecureShare GitHub Repository */}
      <a
        href="https://github.com/abhishek-mathpati/SecureShare"
        target="_blank"
        rel="noopener noreferrer"
        title="Open SecureShare Repository (GitHub)"
        className="absolute z-10 cursor-pointer rounded-3xl transition-all duration-200 hover:outline hover:outline-2 hover:outline-lime-600/50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        style={{
          left: '2.7%',
          top: '33.0%',
          width: '19.7%',
          height: '35.6%'
        }}
        aria-label="SecureShare GitHub Repository"
      />

      {/* Interactive Link: QPAT GitHub Repository */}
      <a
        href="https://github.com/abhishek-mathpati/Question-Paper-Automation-Tool"
        target="_blank"
        rel="noopener noreferrer"
        title="Open Question Paper Automation Tool Repository (GitHub)"
        className="absolute z-10 cursor-pointer rounded-3xl transition-all duration-200 hover:outline hover:outline-2 hover:outline-orange-500/50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        style={{
          left: '78.1%',
          top: '29.5%',
          width: '18.6%',
          height: '33.0%'
        }}
        aria-label="Question Paper Automation Tool GitHub Repository"
      />
    </div>
  )
}
