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

// Exact outer perimeter bounds calibrated to flush directly against the background (1920x1080)
// This fully encapsulates the subtle artwork bevel so no secondary light halo/line is visible outside.
const PROJECT_CARDS: ProjectCardData[] = [
  {
    id: 'secureshare',
    title: 'SecureShare',
    href: 'https://github.com/abhishek-mathpati/SecureShare',
    left: '2.8125%',    // x: 54
    top: '33.0556%',    // y: 357
    width: '19.7917%',  // 380px (x: 54..433)
    height: '35.1852%', // 380px (y: 357..736)
    borderRadius: '18.68%'
  },
  {
    id: 'college-website',
    title: 'College Website',
    href: 'https://github.com/abhishek-mathpati/College-Website',
    left: '26.0938%',   // x: 501
    top: '55.1852%',    // y: 596
    width: '16.8229%',  // 323px (x: 501..823)
    height: '30.0926%', // 325px (y: 596..920)
    borderRadius: '13.31%'
  },
  {
    id: 'smia',
    title: 'Social Media Investigative Assistant (SMIA)',
    href: 'https://github.com/abhishek-mathpati/social-media-investigative-assistant-for-law-enforcement',
    left: '53.1250%',   // x: 1020
    top: '8.8889%',     // y: 96
    width: '19.5313%',  // 375px (x: 1020..1394)
    height: '34.8148%', // 376px (y: 96..471)
    borderRadius: '12.80%'
  },
  {
    id: 'qpat',
    title: 'Question Paper Automation Tool (QPAT)',
    href: 'https://github.com/abhishek-mathpati/Question-Paper-Automation-Tool',
    left: '78.1250%',   // x: 1500
    top: '29.5370%',    // y: 319
    width: '18.7500%',  // 360px (x: 1500..1859)
    height: '33.4259%', // 361px (y: 319..679)
    borderRadius: '13.33%'
  },
  {
    id: 'park-hub',
    title: 'Park Hub: Parking Management System',
    href: 'https://github.com/abhishek-mathpati/Park-Hub',
    left: '58.6458%',   // x: 1126
    top: '63.8889%',    // y: 690
    width: '18.9583%',  // 364px (x: 1126..1489)
    height: '33.8889%', // 366px (y: 690..1055)
    borderRadius: '10.71%'
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

      {/* Precisely Calibrated Project Cards: Clean, Thin, Dark Border with Zero Outer Light Lines */}
      {PROJECT_CARDS.map((project) => (
        <a
          key={project.id}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Open ${project.title} Repository (GitHub)`}
          aria-label={`${project.title} GitHub Repository`}
          className="group absolute z-10 cursor-pointer overflow-hidden border-[1.5px] border-black/50 hover:border-black/80 transition-colors duration-300 ease-out flex items-center justify-center active:scale-[0.98]"
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
