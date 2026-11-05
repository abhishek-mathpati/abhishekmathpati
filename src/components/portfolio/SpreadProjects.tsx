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
  cardBgColor: string
  filledImage: string
}

// Each card has its color filling 100% of the border with zero gaps, matching the design exactly
const PROJECT_CARDS: ProjectCardData[] = [
  {
    id: 'secureshare',
    title: 'SecureShare',
    href: 'https://github.com/abhishek-mathpati/SecureShare',
    left: '2.8125%',    // 54px / 1920
    top: '33.0556%',    // 357px / 1080
    width: '19.7396%',  // 379px / 1920
    height: '35.0926%', // 379px / 1080
    borderRadius: '18.73%',
    cardBgColor: '#D8E6A8',
    filledImage: '/designs/projects/filled_secureshare.png'
  },
  {
    id: 'college-website',
    title: 'College Website',
    href: 'https://github.com/abhishek-mathpati/College-Website',
    left: '26.0938%',   // 501px / 1920
    top: '55.1852%',    // 596px / 1080
    width: '16.8229%',  // 323px / 1920
    height: '30.0926%', // 325px / 1080
    borderRadius: '13.31%',
    cardBgColor: '#F6F0A0',
    filledImage: '/designs/projects/filled_college_website.png'
  },
  {
    id: 'smia',
    title: 'Social Media Investigative Assistant (SMIA)',
    href: 'https://github.com/abhishek-mathpati/social-media-investigative-assistant-for-law-enforcement',
    left: '53.1250%',   // 1020px / 1920
    top: '8.8889%',     // 96px / 1080
    width: '19.5313%',  // 375px / 1920
    height: '34.8148%', // 376px / 1080
    borderRadius: '12.80%',
    cardBgColor: '#ACCBE9',
    filledImage: '/designs/projects/filled_smia.png'
  },
  {
    id: 'qpat',
    title: 'Question Paper Automation Tool (QPAT)',
    href: 'https://github.com/abhishek-mathpati/Question-Paper-Automation-Tool',
    left: '78.1250%',   // 1500px / 1920
    top: '29.5370%',    // 319px / 1080
    width: '18.7500%',  // 360px / 1920
    height: '33.4259%', // 361px / 1080
    borderRadius: '13.33%',
    cardBgColor: '#F6BD95',
    filledImage: '/designs/projects/filled_qpat.png'
  },
  {
    id: 'park-hub',
    title: 'Park Hub: Parking Management System',
    href: 'https://github.com/abhishek-mathpati/Park-Hub',
    left: '58.6458%',   // 1126px / 1920
    top: '63.8889%',    // 690px / 1080
    width: '18.9583%',  // 364px / 1920
    height: '33.8889%', // 366px / 1080
    borderRadius: '10.71%',
    cardBgColor: '#D6BFE7',
    filledImage: '/designs/projects/filled_park_hub.png'
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

      {/* Project Cards: Card color fully fills to the border with 0 gaps */}
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
            borderRadius: project.borderRadius,
            backgroundColor: project.cardBgColor
          }}
        >
          {/* Card Image: Full card color filling to the border edge with original artwork text */}
          <img
            src={project.filledImage}
            alt={project.title}
            className="w-full h-full object-cover pointer-events-none select-none"
            loading="eager"
            decoding="async"
          />

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
