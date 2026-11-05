import React, { useState } from 'react'
import { Sparkles, BookOpen } from 'lucide-react'

export interface ClosedBookCoverFaceProps {
  isInteractive?: boolean
}

export const ClosedBookCoverFace: React.FC<ClosedBookCoverFaceProps> = ({
  isInteractive = true,
}) => {
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

      {/* Red satin ribbon bookmark hanging from bottom */}
      <div
        className="absolute -bottom-9 left-1/3 w-5 sm:w-6 h-12 sm:h-14 bg-gradient-to-b from-red-800 to-red-600 shadow-lg pointer-events-none rounded-b-xs z-20"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)',
          transform: 'rotate(4deg)'
        }}
      />

      {/* Subtle interactive hover cue */}
      {isInteractive && (
        <div className="absolute bottom-5 inset-x-0 flex flex-col items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 z-20">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/85 border border-white/25 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider shadow-xl">
            <BookOpen className="w-3.5 h-3.5 text-blue-300" />
            <span>Open Portfolio Book</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <span className="text-[9px] text-white/60 tracking-wider uppercase mt-1">
            or press Space
          </span>
        </div>
      )}
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
      <ClosedBookCoverFace isInteractive={true} />
    </div>
  )
}
