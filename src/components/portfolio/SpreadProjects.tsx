import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadProjects: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white ${className}`}>
      {/* High-Resolution Design from Designs/Page4.png */}
      <img
        src="/designs/Page4.png?v=20261105"
        alt="Projects Spread"
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain pointer-events-none select-none"
      />

      {/* 1. SecureShare GitHub Repository */}
      <a
        href="https://github.com/abhishek-mathpati/SecureShare"
        target="_blank"
        rel="noopener noreferrer"
        title="Open SecureShare Repository (GitHub)"
        className="group absolute z-10 cursor-pointer rounded-[24px] sm:rounded-[28px] transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.98]"
        style={{
          left: '2.71%',
          top: '32.96%',
          width: '19.79%',
          height: '35.56%'
        }}
        aria-label="SecureShare GitHub Repository"
      >
        <img
          src="/designs/projects/card_secureshare.png"
          alt="SecureShare"
          className="w-full h-full object-contain rounded-[24px] sm:rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_12px_24px_rgba(0,0,0,0.22)] pointer-events-none select-none"
        />
      </a>

      {/* 2. College Website GitHub Repository */}
      <a
        href="https://github.com/abhishek-mathpati/College-Website"
        target="_blank"
        rel="noopener noreferrer"
        title="Open College Website Repository (GitHub)"
        className="group absolute z-10 cursor-pointer rounded-[24px] sm:rounded-[26px] transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.98]"
        style={{
          left: '25.89%',
          top: '54.63%',
          width: '17.08%',
          height: '30.46%'
        }}
        aria-label="College Website GitHub Repository"
      >
        <img
          src="/designs/projects/card_college_website.png"
          alt="College Website"
          className="w-full h-full object-contain rounded-[24px] sm:rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_12px_24px_rgba(0,0,0,0.22)] pointer-events-none select-none"
        />
      </a>

      {/* 3. SMIA (Social Media Investigative Assistant) GitHub Repository */}
      <a
        href="https://github.com/abhishek-mathpati/social-media-investigative-assistant-for-law-enforcement"
        target="_blank"
        rel="noopener noreferrer"
        title="Open Social Media Investigative Assistant Repository (GitHub)"
        className="group absolute z-10 cursor-pointer rounded-[24px] sm:rounded-[28px] transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.98]"
        style={{
          left: '53.23%',
          top: '8.98%',
          width: '19.53%',
          height: '34.63%'
        }}
        aria-label="Social Media Investigative Assistant GitHub Repository"
      >
        <img
          src="/designs/projects/card_smia.png"
          alt="Social Media Investigative Assistant"
          className="w-full h-full object-contain rounded-[24px] sm:rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_12px_24px_rgba(0,0,0,0.22)] pointer-events-none select-none"
        />
      </a>

      {/* 4. QPAT (Question Paper Automation Tool) GitHub Repository */}
      <a
        href="https://github.com/abhishek-mathpati/Question-Paper-Automation-Tool"
        target="_blank"
        rel="noopener noreferrer"
        title="Open Question Paper Automation Tool Repository (GitHub)"
        className="group absolute z-10 cursor-pointer rounded-[24px] sm:rounded-[28px] transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.98]"
        style={{
          left: '78.13%',
          top: '29.44%',
          width: '18.54%',
          height: '33.06%'
        }}
        aria-label="Question Paper Automation Tool GitHub Repository"
      >
        <img
          src="/designs/projects/card_qpat.png"
          alt="Question Paper Automation Tool"
          className="w-full h-full object-contain rounded-[24px] sm:rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_12px_24px_rgba(0,0,0,0.22)] pointer-events-none select-none"
        />
      </a>

      {/* 5. Park Hub GitHub Repository */}
      <a
        href="https://github.com/abhishek-mathpati/Park-Hub"
        target="_blank"
        rel="noopener noreferrer"
        title="Open Park Hub Repository (GitHub)"
        className="group absolute z-10 cursor-pointer rounded-[24px] sm:rounded-[28px] transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.98]"
        style={{
          left: '58.59%',
          top: '63.89%',
          width: '19.01%',
          height: '33.24%'
        }}
        aria-label="Park Hub GitHub Repository"
      >
        <img
          src="/designs/projects/card_park_hub.png"
          alt="Park Hub"
          className="w-full h-full object-contain rounded-[24px] sm:rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_12px_24px_rgba(0,0,0,0.22)] pointer-events-none select-none"
        />
      </a>
    </div>
  )
}
