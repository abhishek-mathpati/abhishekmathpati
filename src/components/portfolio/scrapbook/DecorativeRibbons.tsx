import React from 'react'

interface Props {
  className?: string
}

export const DecorativeRibbons: React.FC<Props> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 460 576"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none z-10 ${className}`}
    >
      {/* Top Brown Hand-drawn Ribbon Doodle */}
      <path
        d="M -15 14 
           C 40 16, 75 46, 125 46 
           C 175 46, 205 14, 255 14 
           C 305 14, 335 52, 385 52 
           C 420 52, 445 30, 475 16"
        stroke="#9a7b68"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.88"
      />

      {/* Right Margin Cream Wavy Ribbon Doodle */}
      <path
        d="M 435 240 
           C 400 275, 415 320, 440 355 
           C 458 385, 458 415, 432 445 
           C 410 475, 418 505, 442 535 
           C 452 552, 438 572, 428 585"
        stroke="#f4ebd9"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
        filter="drop-shadow(0 1px 3px rgba(60, 35, 20, 0.28))"
      />
    </svg>
  )
}

