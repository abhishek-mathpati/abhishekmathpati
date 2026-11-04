import React from 'react'

interface Props {
  className?: string
  width?: number | string
  height?: number | string
  angle?: number
}

export const MetallicPaperclip: React.FC<Props> = ({
  className = '',
  width = 32,
  height = 76,
  angle = 0
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 34 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${angle}deg)` }}
      className={`overflow-visible pointer-events-none select-none drop-shadow-[0_3px_5px_rgba(0,0,0,0.38)] ${className}`}
    >
      <defs>
        {/* Steel metallic gradient with bright core highlight */}
        <linearGradient id="chromeWire" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="20%" stopColor="#94a3b8" />
          <stop offset="48%" stopColor="#ffffff" />
          <stop offset="75%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>

      {/* Wire drop shadow path */}
      <path
        d="M 10 24 L 10 62 C 10 70, 24 70, 24 62 L 24 15 C 24 5, 5 5, 5 15 L 5 56"
        stroke="rgba(0,0,0,0.28)"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
        transform="translate(0, 1.8)"
      />

      {/* Main Steel Wire Path */}
      <path
        d="M 10 24 L 10 62 C 10 69, 24 69, 24 62 L 24 15 C 24 6, 5 6, 5 15 L 5 56"
        stroke="url(#chromeWire)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
