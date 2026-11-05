import React, { useState } from 'react'

export interface ClosedBookCoverFaceProps {
  isInteractive?: boolean
}

export const ClosedBookCoverFace: React.FC<ClosedBookCoverFaceProps> = () => {
  return (
    <div className="relative w-full h-full rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#3f455a] border border-white/10 shadow-2xl select-none">
      {/* Master Cover Artwork from Designs/CoverPage.png */}
      <img
        src="/designs/CoverPage.png?v=20261105"
        alt="Portfolio Cover - Turn the Page"
        className="w-full h-full object-cover select-none pointer-events-none"
        loading="eager"
        decoding="async"
      />

      {/* Subtle Leather Spine Crease on Left Edge */}
      <div className="absolute inset-y-0 left-0 w-8 sm:w-11 bg-gradient-to-r from-black/45 via-black/15 to-transparent border-r border-black/25 pointer-events-none z-10" />

      {/* Subtle outer page edge highlight */}
      <div className="absolute inset-0 rounded-[18px] sm:rounded-[22px] border border-black/10 pointer-events-none z-20 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.4),inset_0_-1px_1.5px_rgba(0,0,0,0.25)]" />
    </div>
  )
}

interface ClosedBookCoverProps {
  onOpen: () => void
  tilt?: { x: number; y: number }
  tiltEnabled?: boolean
}

export const ClosedBookCover: React.FC<ClosedBookCoverProps> = ({
  onOpen,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Click to Open Portfolio"
      style={{
        transform: isHovered ? 'translateY(-6px) scale(1.015)' : 'translateY(0) scale(1)',
        transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
      className="relative w-1/2 h-full mx-auto rounded-[18px] sm:rounded-[22px] cursor-pointer select-none group"
    >
      {/* 3D CAST GROUND SHADOW */}
      <div className="absolute -bottom-8 inset-x-4 h-16 bg-black/60 rounded-full blur-2xl transform scale-y-75 pointer-events-none transition-all duration-300 group-hover:blur-3xl group-hover:bg-black/75" />

      {/* 3D GILDED PAGE EDGES (Right side book thickness) */}
      <div
        className="absolute -right-3 top-2.5 bottom-2.5 w-4 rounded-r-[4px] pointer-events-none overflow-hidden shadow-lg"
        style={{
          background: 'linear-gradient(to right, #cfc5b0 0%, #eee8dc 30%, #fbf9f4 70%, #d4caa8 100%)',
          backgroundImage: 'repeating-linear-gradient(to bottom, #d4caa8, #d4caa8 1px, #fcfbf7 1px, #fcfbf7 3px)',
          transform: 'rotateY(35deg) translateZ(-6px)',
          transformOrigin: 'left center'
        }}
      />

      {/* TOP PAGE BLOCK EDGE */}
      <div
        className="absolute -top-2.5 left-7 right-2 h-3.5 pointer-events-none rounded-t-[2px]"
        style={{
          background: 'linear-gradient(to bottom, #cfc5b0 0%, #ede6d7 100%)',
          backgroundImage: 'repeating-linear-gradient(to right, #d4caa8, #d4caa8 1px, #fcfbf7 1px, #fcfbf7 3px)',
          transform: 'rotateX(55deg)',
          transformOrigin: 'bottom center'
        }}
      />

      {/* BOTTOM PAGE BLOCK EDGE */}
      <div
        className="absolute -bottom-2.5 left-7 right-2 h-3.5 pointer-events-none rounded-b-[2px]"
        style={{
          background: 'linear-gradient(to top, #cfc5b0 0%, #ede6d7 100%)',
          backgroundImage: 'repeating-linear-gradient(to right, #d4caa8, #d4caa8 1px, #fcfbf7 1px, #fcfbf7 3px)',
          transform: 'rotateX(-55deg)',
          transformOrigin: 'top center'
        }}
      />

      {/* MAIN HARDCOVER FRONT */}
      <ClosedBookCoverFace isInteractive={false} />

      {/* FLOATING "OPEN" PILL BADGE (Exact style from next page & prev page, without arrow) */}
      <div
        onClick={(e) => {
          e.stopPropagation()
          onOpen()
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="Open"
        className={`absolute -right-12 sm:-right-16 md:-right-20 top-1/2 -translate-y-1/2 z-50 flex items-center cursor-pointer select-none transition-transform duration-300 ease-out ${
          isHovered ? 'translate-x-1' : 'translate-x-0'
        }`}
      >
        {/* Ambient Glow Aura */}
        <div
          className={`absolute -inset-2 rounded-full blur-md transition-all duration-300 pointer-events-none ${
            isHovered
              ? 'opacity-100 bg-white/15 scale-105'
              : 'opacity-0 scale-90'
          }`}
        />

        {/* Refined Pill Badge */}
        <div
          className={`transition-all duration-300 ease-out backdrop-blur-md px-4 py-2 rounded-full border whitespace-nowrap flex items-center shadow-xl ${
            isHovered
              ? 'opacity-100 translate-x-0 scale-100 bg-stone-900/85 border-white/35 text-white shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_15px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95'
              : 'opacity-0 -translate-x-3 scale-95 bg-stone-900/40 border-white/10 text-stone-400 pointer-events-none'
          }`}
        >
          <span className="text-[11px] font-sans font-medium tracking-wider uppercase">
            Open
          </span>
        </div>
      </div>
    </div>
  )
}
