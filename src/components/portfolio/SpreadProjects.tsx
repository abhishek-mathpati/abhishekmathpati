import React from 'react'

interface SpreadProps {
  className?: string
}

export const SpreadProjects: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full h-full flex overflow-hidden select-text ${className}`}
      style={{
        aspectRatio: '16/9',
        fontFamily: '"Times New Roman", Times, Georgia, serif'
      }}
    >
      {/* ========================================================= */}
      {/* LEFT PAGE (~50%): Gingham Notebook with Projects Heading  */}
      {/* ========================================================= */}
      <div
        className="relative w-1/2 h-full overflow-hidden"
        style={{
          backgroundImage: "url('/projects/gingham_tile.png')",
          backgroundRepeat: 'repeat',
          backgroundColor: '#ffffff'
        }}
      >
        {/* Torn Notebook Paper Header with spiral binding punch holes & incandescent bulb */}
        <div
          className="absolute top-0 left-[2.8%] w-[90.5%] z-20 pointer-events-none drop-shadow-sm select-none"
          style={{ height: '32.5%' }}
        >
          <img
            src="/projects/header_paper_full.png"
            alt="Projects notebook header"
            className="w-full h-full object-contain object-top pointer-events-none"
          />
          {/* Accessible semantic heading */}
          <h2 className="sr-only">Projects</h2>
        </div>

        {/* Green Note: SecureShare */}
        <a
          href="https://github.com/abhishek-mathpati/SecureShare"
          target="_blank"
          rel="noopener noreferrer"
          title="SecureShare - Decentralized Secure File Sharing & Communication Platform (GitHub)"
          className="absolute z-20 flex flex-col items-center justify-center text-center p-3 sm:p-4 md:p-6 rounded-[24px] sm:rounded-[28px] transition-all duration-200 hover:scale-[1.03] hover:shadow-xl active:scale-[0.98] cursor-pointer group"
          style={{
            left: '5.5%',
            top: '33.0%',
            width: '39.5%',
            height: '35.6%',
            backgroundColor: '#d2dfa5',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
            color: '#000000'
          }}
        >
          <div className="leading-[1.26] tracking-normal font-normal text-[clamp(11px,1.55vw,18px)]">
            <span className="block">SecureShare -</span>
            <span className="block">Decentralized Secure</span>
            <span className="block">File Sharing and</span>
            <span className="block">Communication</span>
            <span className="block">Platform</span>
          </div>
        </a>

        {/* Yellow Note: College Website */}
        <div
          className="absolute z-20 flex flex-col items-center justify-center text-center p-3 sm:p-4 md:p-6 rounded-[24px] sm:rounded-[28px] transition-all duration-200 hover:scale-[1.03] hover:shadow-xl cursor-default"
          style={{
            left: '51.8%',
            top: '54.7%',
            width: '34.2%',
            height: '30.4%',
            backgroundColor: '#f9f2a2',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
            color: '#000000'
          }}
        >
          <div className="leading-[1.28] tracking-normal font-normal text-[clamp(14px,1.9vw,22px)]">
            <span className="block">College</span>
            <span className="block">Website</span>
          </div>
        </div>

        {/* Bottom-left Torn Paper Accent */}
        <img
          src="/projects/torn_corner_bl.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[60.5%] pointer-events-none select-none z-10"
        />
      </div>

      {/* ========================================================= */}
      {/* CENTER SPINE: Subtle Book Fold Shadow                     */}
      {/* ========================================================= */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none z-30 bg-gradient-to-r from-black/20 via-black/5 to-black/20 mix-blend-multiply" />

      {/* ========================================================= */}
      {/* RIGHT PAGE (~50%): Connected Project Flow Cards           */}
      {/* ========================================================= */}
      <div
        className="relative w-1/2 h-full overflow-hidden"
        style={{
          backgroundColor: '#ffffff'
        }}
      >
        {/* Top-Right Torn Blue Cardstock Accent */}
        <img
          src="/projects/torn_corner_tr.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[67.2%] pointer-events-none select-none z-10"
        />

        {/* Connected Dashed SVG Flow Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 512 576"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Top trail into Blue Card */}
          <path
            d="M 64 2 Q 80 28 92 52"
            stroke="#7a91ba"
            strokeWidth="2.5"
            strokeDasharray="9 7"
            strokeLinecap="round"
          />
          {/* Blue Card to Orange Card */}
          <path
            d="M 235 160 Q 255 185 288 220"
            stroke="#7a91ba"
            strokeWidth="2.5"
            strokeDasharray="9 7"
            strokeLinecap="round"
          />
          {/* Orange Card to Purple Card */}
          <path
            d="M 282 300 Q 235 330 200 368"
            stroke="#7a91ba"
            strokeWidth="2.5"
            strokeDasharray="9 7"
            strokeLinecap="round"
          />
          {/* Purple Card trailing out bottom-right */}
          <path
            d="M 304 518 Q 400 532 512 546"
            stroke="#7a91ba"
            strokeWidth="2.5"
            strokeDasharray="9 7"
            strokeLinecap="round"
          />
        </svg>

        {/* Blue Card: SMIA */}
        <div
          className="absolute z-20 flex flex-col items-center justify-center text-center p-3 sm:p-4 md:p-6 rounded-[24px] sm:rounded-[28px] transition-all duration-200 hover:scale-[1.03] hover:shadow-xl cursor-default"
          style={{
            left: '6.5%',
            top: '9.0%',
            width: '39.1%',
            height: '34.7%',
            backgroundColor: '#accee9',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
            color: '#000000'
          }}
        >
          <div className="leading-[1.26] tracking-normal font-normal text-[clamp(11.5px,1.55vw,18px)]">
            <span className="block">Social Media</span>
            <span className="block">Investigative Assistant</span>
            <span className="block">(SMIA)</span>
            <span className="block">Digital Forensic</span>
            <span className="block">Documentation Tool</span>
          </div>
        </div>

        {/* Orange Card: QPAT */}
        <a
          href="https://github.com/abhishek-mathpati/Question-Paper-Automation-Tool"
          target="_blank"
          rel="noopener noreferrer"
          title="Question Paper Automation Tool (QPAT) - GitHub"
          className="absolute z-20 flex flex-col items-center justify-center text-center p-3 sm:p-4 md:p-6 rounded-[24px] sm:rounded-[28px] transition-all duration-200 hover:scale-[1.03] hover:shadow-xl active:scale-[0.98] cursor-pointer group"
          style={{
            left: '56.3%',
            top: '29.5%',
            width: '37.1%',
            height: '33.0%',
            backgroundColor: '#f3bd91',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
            color: '#000000'
          }}
        >
          <div className="leading-[1.26] tracking-normal font-normal text-[clamp(11px,1.5vw,17.5px)]">
            <span className="block">Question Paper</span>
            <span className="block">Automation Tool</span>
            <span className="block">(QPAT) | Automated</span>
            <span className="block">Academic Assessment</span>
            <span className="block">System</span>
          </div>
        </a>

        {/* Purple Card: Park Hub */}
        <div
          className="absolute z-20 flex flex-col items-center justify-center text-center p-3 sm:p-4 md:p-6 rounded-[24px] sm:rounded-[28px] transition-all duration-200 hover:scale-[1.03] hover:shadow-xl cursor-default"
          style={{
            left: '17.2%',
            top: '63.9%',
            width: '38.1%',
            height: '33.3%',
            backgroundColor: '#cebddd',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
            color: '#000000'
          }}
        >
          <div className="leading-[1.28] tracking-normal font-normal text-[clamp(12px,1.65vw,19px)]">
            <span className="block">Park Hub: Parking</span>
            <span className="block">Management</span>
            <span className="block">System</span>
          </div>
        </div>
      </div>
    </div>
  )
}
