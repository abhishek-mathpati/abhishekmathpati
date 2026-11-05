import React from 'react'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './PortfolioIcons'

interface SpreadProps {
  className?: string
}

interface ProjectCardData {
  id: string
  title: string
  href: string
  left: string
  top: string
  width: string
  height: string
  borderRadius: string
}

// Exact tight card color boundaries: the card color fills 100% of the interior right to the border with 0 gap
const PROJECT_CARDS: ProjectCardData[] = [
  {
    id: 'secureshare',
    title: 'SecureShare',
    href: 'https://github.com/abhishek-mathpati/SecureShare',
    left: '2.8125%',    // x: 54
    top: '33.0556%',    // y: 357
    width: '19.7396%',  // 379px (x: 54..432)
    height: '35.0926%', // 379px (y: 357..735)
    borderRadius: '18.73%' // 71px radius on 379x379px
  },
  {
    id: 'college-website',
    title: 'College Website',
    href: 'https://github.com/abhishek-mathpati/College-Website',
    left: '26.0938%',   // x: 501
    top: '55.2778%',    // y: 597
    width: '16.6146%',  // 319px (x: 501..819)
    height: '29.6296%', // 320px (y: 597..916)
    borderRadius: '12.85%' // 41px radius on 319x320px
  },
  {
    id: 'smia',
    title: 'Social Media Investigative Assistant (SMIA)',
    href: 'https://github.com/abhishek-mathpati/social-media-investigative-assistant-for-law-enforcement',
    left: '53.2292%',   // x: 1022
    top: '9.0741%',     // y: 98
    width: '19.1146%',  // 367px (x: 1022..1388)
    height: '34.0741%', // 368px (y: 98..465)
    borderRadius: '12.53%' // 46px radius on 367x368px
  },
  {
    id: 'qpat',
    title: 'Question Paper Automation Tool (QPAT)',
    href: 'https://github.com/abhishek-mathpati/Question-Paper-Automation-Tool',
    left: '78.1250%',   // x: 1500
    top: '29.6296%',    // y: 320
    width: '18.5938%',  // 357px (x: 1500..1856)
    height: '33.0556%', // 357px (y: 320..676)
    borderRadius: '12.88%' // 46px radius on 357x357px
  },
  {
    id: 'park-hub',
    title: 'Park Hub: Parking Management System',
    href: 'https://github.com/abhishek-mathpati/Park-Hub',
    left: '58.6979%',   // x: 1127
    top: '64.0741%',    // y: 692
    width: '18.8021%',  // 361px (x: 1127..1487)
    height: '33.4259%', // 361px (y: 692..1052)
    borderRadius: '10.25%' // 37px radius on 361x361px
  }
]

export const SpreadProjects: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white ${className}`}>
      {/* High-Resolution Master Design from Designs/Page4.png */}
      <img
        src="/designs/Page4.png?v=20261105"
        alt="Projects Spread"
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain pointer-events-none select-none"
      />

      {/* Precisely Calibrated Project Cards: Clean, Thin, Dark Border with Zero Gap */}
      {PROJECT_CARDS.map((project) => (
        <a
          key={project.id}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Open ${project.title} Repository (GitHub)`}
          aria-label={`${project.title} GitHub Repository`}
          className="group absolute z-10 cursor-pointer overflow-hidden border-[1.5px] border-black/55 hover:border-black/85 transition-colors duration-300 ease-out flex items-center justify-center active:scale-[0.98]"
          style={{
            left: project.left,
            top: project.top,
            width: project.width,
            height: project.height,
            borderRadius: project.borderRadius
          }}
        >
          {/* Confined Card Blur Overlay on Hover - Exactly matching the card shape */}
          <div
            className="absolute inset-0 bg-black/15 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              borderRadius: project.borderRadius
            }}
          />

          {/* Centered Floating GitHub Action Badge */}
          <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/90 text-white border border-white/20 shadow-xl opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none select-none">
            <GithubIcon className="w-4 h-4" />
            <span className="text-xs font-semibold font-sans tracking-wide">GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/70" />
          </div>
        </a>
      ))}
    </div>
  )
}
