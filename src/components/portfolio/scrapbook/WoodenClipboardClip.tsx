import React from 'react'

interface Props {
  className?: string
}

export const WoodenClipboardClip: React.FC<Props> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 190 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible pointer-events-none select-none ${className}`}
    >
      <defs>
        {/* Soft shadow under the clipboard clamp */}
        <filter id="woodClipShadow" x="-20%" y="-20%" width="140%" height="160%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="5" stdDeviation="4.5" floodColor="#1a0c04" floodOpacity="0.48" />
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.35" />
        </filter>

        {/* Realistic warm walnut / teak woodgrain vertical gradient */}
        <linearGradient id="woodBase" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#965c36" />
          <stop offset="20%" stopColor="#834b28" />
          <stop offset="50%" stopColor="#6e3c1c" />
          <stop offset="80%" stopColor="#582d13" />
          <stop offset="100%" stopColor="#44210c" />
        </linearGradient>

        {/* Horizontal wood streaks */}
        <linearGradient id="woodStreak" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#a36940" />
          <stop offset="15%" stopColor="#7a4625" />
          <stop offset="35%" stopColor="#925b34" />
          <stop offset="55%" stopColor="#633618" />
          <stop offset="72%" stopColor="#88522d" />
          <stop offset="88%" stopColor="#6f3d1e" />
          <stop offset="100%" stopColor="#824c28" />
        </linearGradient>

        {/* Metallic rivet rim */}
        <radialGradient id="brassRivet" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#ca8a04" />
          <stop offset="80%" stopColor="#854d0e" />
          <stop offset="100%" stopColor="#3f2305" />
        </radialGradient>

        {/* Lower metallic clamp bar */}
        <linearGradient id="metalClamp" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="75%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>

      {/* Main Wood Bracket Body */}
      <g filter="url(#woodClipShadow)">
        {/* Arched Top Tab with central hole */}
        <path
          d="M 68 38 
             C 68 24, 75 8, 95 8 
             C 115 8, 122 24, 122 38 
             L 174 38 
             C 181 38, 185 43, 184 50 
             L 181 66 
             C 180 69, 177 71, 172 71 
             L 18 71 
             C 13 71, 10 69, 9 66 
             L 6 50 
             C 5 43, 9 38, 16 38 
             Z"
          fill="url(#woodStreak)"
        />
        {/* Wood Texture Multiplier */}
        <path
          d="M 68 38 
             C 68 24, 75 8, 95 8 
             C 115 8, 122 24, 122 38 
             L 174 38 
             C 181 38, 185 43, 184 50 
             L 181 66 
             C 180 69, 177 71, 172 71 
             L 18 71 
             C 13 71, 10 69, 9 66 
             L 6 50 
             C 5 43, 9 38, 16 38 
             Z"
          fill="url(#woodBase)"
          opacity="0.65"
          style={{ mixBlendMode: 'multiply' }}
        />

        {/* Top Edge Bevel Highlight */}
        <path
          d="M 70 36 C 76 20, 84 10, 95 10 C 106 10, 114 20, 120 36 L 173 36 C 178 36, 181 39, 182 44"
          stroke="rgba(255, 235, 210, 0.45)"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Center Hanging Eyelet / Brass Rivet */}
        <circle cx="95" cy="22" r="9.5" fill="#1e1008" />
        <circle cx="95" cy="22" r="9.5" fill="url(#brassRivet)" opacity="0.88" />
        <circle cx="95" cy="22" r="5.5" fill="#2d1a0e" />
        <circle cx="95" cy="22" r="5.5" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8" fill="none" />

        {/* Lower Horizontal Metal Clamp Strip */}
        <rect x="20" y="55" width="150" height="12" rx="2.5" fill="url(#metalClamp)" />
        <rect x="20" y="55" width="150" height="1.5" fill="rgba(255,255,255,0.75)" />

        {/* Left & Right Rivet Screws on Clamp */}
        <circle cx="30" cy="61" r="2.5" fill="#0f172a" />
        <circle cx="30" cy="60.5" r="2" fill="#94a3b8" />
        <circle cx="160" cy="61" r="2.5" fill="#0f172a" />
        <circle cx="160" cy="60.5" r="2" fill="#94a3b8" />
      </g>
    </svg>
  )
}
