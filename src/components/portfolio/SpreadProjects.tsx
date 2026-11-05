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

// Exact mathematical 1-pixel coordinate boundaries and corner radii measured from Page4.png (1920x1080)
const PROJECT_CARDS: ProjectCardData[] = [
  {
    id: 'secureshare',
    title: 'SecureShare',
    href: 'https://github.com/abhishek-mathpati/SecureShare',
    left: '2.8125%',
    top: '33.0556%',
    width: '19.7396%',
    height: '35.0926%',
    borderRadius: '18.73%' // 71px radius on 379x379px square
  },
  {
    id: 'college-website',
    title: 'College Website',
    href: 'https://github.com/abhishek-mathpati/College-Website',
    left: '26.0938%',
    top: '55.1852%',
    width: '16.6667%',
    height: '29.8148%',
    borderRadius: '12.81%' // 41px radius on 320x322px rectangle
  },
  {
    id: 'smia',
    title: 'Social Media Investigative Assistant (SMIA)',
    href: 'https://github.com/abhishek-mathpati/social-media-investigative-assistant-for-law-enforcement',
    left: '53.1250%',
    top: '8.8889%',
    width: '19.3229%',
    height: '34.4444%',
    borderRadius: '12.13%' // 45px radius on 371x372px rectangle
  },
  {
    id: 'qpat',
    title: 'Question Paper Automation Tool (QPAT)',
    href: 'https://github.com/abhishek-mathpati/Question-Paper-Automation-Tool',
    left: '78.1250%',
    top: '29.5370%',
    width: '18.6458%',
    height: '33.2407%',
    borderRadius: '12.85%' // 46px radius on 358x359px rectangle
  },
  {
    id: 'park-hub',
    title: 'Park Hub: Parking Management System',
    href: 'https://github.com/abhishek-mathpati/Park-Hub',
    left: '58.6458%',
    top: '63.8889%',
    width: '18.9583%',
    height: '33.7963%',
    borderRadius: '10.16%' // 37px radius on 364x365px rectangle
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

      {/* Precisely Calibrated Project Cards with Card-Specific Radii & Bounds */}
      {PROJECT_CARDS.map((project) => (
        <a
          key={project.id}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Open ${project.title} Repository (GitHub)`}
          aria-label={`${project.title} GitHub Repository`}
          className="group absolute z-10 cursor-pointer overflow-hidden border-[1.5px] border-black/45 hover:border-black/70 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 ease-out flex items-center justify-center active:scale-[0.98]"
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
