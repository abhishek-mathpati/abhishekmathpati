import React, { useState } from 'react'
import { Sparkles, BookOpen } from 'lucide-react'

interface ClosedBookCoverProps {
  onOpen: () => void
  tilt?: { x: number; y: number }
  tiltEnabled?: boolean
}

export const ClosedBookCover: React.FC<ClosedBookCoverProps> = ({
  onOpen,
  tilt = { x: 0, y: 0 },
  tiltEnabled = true
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Click to Open Portfolio"
      style={{
        transform: 'translateZ(30px)',
        transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.4, 1)',
        transformStyle: 'preserve-3d',
      }}
      className="relative w-full h-full rounded-[20px] sm:rounded-[24px] cursor-pointer select-none group perspective-stage"
    >
      {/* 3D CAST GROUND SHADOW */}
      <div className="absolute -bottom-10 inset-x-8 h-20 bg-black/60 rounded-full blur-2xl transform scale-y-75 pointer-events-none" />

      {/* 3D GILDED PAGE EDGES (Simulates the thickness of the closed book on the right side) */}
      <div
        className="absolute -right-3 top-3 bottom-3 w-4 rounded-r-[4px] pointer-events-none overflow-hidden shadow-lg"
        style={{
          background: 'linear-gradient(to right, #cfc5b0 0%, #eee8dc 30%, #fbf9f4 70%, #d4caa8 100%)',
          backgroundImage: 'repeating-linear-gradient(to bottom, #d4caa8, #d4caa8 1px, #fcfbf7 1px, #fcfbf7 3px)',
          transform: 'rotateY(35deg) translateZ(-6px)',
          transformOrigin: 'left center'
        }}
      />

      {/* TOP & BOTTOM PAGE BLOCK EDGES */}
      <div
        className="absolute -top-2 left-6 right-2 h-3 pointer-events-none rounded-t-[2px]"
        style={{
          background: 'linear-gradient(to bottom, #cfc5b0 0%, #ede6d7 100%)',
          backgroundImage: 'repeating-linear-gradient(to right, #d4caa8, #d4caa8 1px, #fcfbf7 1px, #fcfbf7 3px)',
          transform: 'rotateX(55deg)',
          transformOrigin: 'bottom center'
        }}
      />

      {/* MAIN HARDCOVER FRONT */}
      <div className="relative w-full h-full rounded-[20px] sm:rounded-[24px] overflow-hidden book-cover-leather border border-white/10 flex flex-col items-center justify-between p-8 sm:p-12 shadow-2xl">
        {/* LEATHER SPINE SEAM ON LEFT EDGE */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-black/60 via-black/25 to-transparent border-r border-black/40 flex flex-col justify-around py-12 pointer-events-none">
          <div className="w-full h-0.5 bg-amber-500/30 shadow-xs" />
          <div className="w-full h-0.5 bg-amber-500/30 shadow-xs" />
          <div className="w-full h-0.5 bg-amber-500/30 shadow-xs" />
          <div className="w-full h-0.5 bg-amber-500/30 shadow-xs" />
        </div>

        {/* GOLD EMBOSSED INSET BORDER */}
        <div className="absolute inset-4 sm:inset-6 border-2 gold-foil-border rounded-[14px] pointer-events-none opacity-80" />
        <div className="absolute inset-5 sm:inset-7 border border-dashed border-amber-400/30 rounded-[12px] pointer-events-none" />

        {/* TOP HEADER: EDITION */}
        <div className="relative z-10 text-center pt-2">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] text-amber-200/80 uppercase">
            Portfolio & Selected Works • 2026
          </p>
          <div className="w-16 h-px bg-amber-400/40 mx-auto mt-2" />
        </div>

        {/* CENTER: CREST & MONOGRAM & TITLE */}
        <div className="relative z-10 flex flex-col items-center text-center my-auto">
          {/* Monogram Emblem */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-400/60 flex items-center justify-center p-2 mb-4 bg-black/20 shadow-inner group-hover:border-amber-300 transition-colors">
            <div className="w-full h-full rounded-full border border-dashed border-amber-400/40 flex items-center justify-center">
              <span className="font-editorial text-2xl sm:text-3xl font-bold gold-foil-text tracking-widest">
                AM
              </span>
            </div>
          </div>

          {/* Name & Portfolio Title */}
          <h1 className="font-editorial text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight gold-foil-text uppercase mb-1">
            Abhishek Mathpati
          </h1>
          <p className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-amber-100/90 uppercase font-sans">
            Software Developer & Security Researcher
          </p>
          <p className="text-xs sm:text-sm text-amber-200/60 tracking-wider mt-2 font-mono text-[11px]">
            Decentralized Architectures • Digital Forensics • Applied AI Security
          </p>
        </div>

        {/* BOTTOM: INTERACTIVE "CLICK TO OPEN" CUE */}
        <div className="relative z-10 flex flex-col items-center pb-2">
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 border border-amber-400/40 backdrop-blur-xs text-amber-200 text-xs font-semibold tracking-wider uppercase group-hover:bg-amber-400 group-hover:text-neutral-900 group-hover:border-amber-300 transition-all duration-300 shadow-md">
            <BookOpen className="w-4 h-4" />
            <span>Open Portfolio Book</span>
            <Sparkles className="w-4 h-4 text-amber-300 group-hover:text-neutral-900" />
          </div>
          <span className="text-[10px] text-white/40 tracking-widest uppercase mt-2">
            10 Pages • Use Arrows or Click Pages to Flip
          </span>
        </div>

        {/* RED SATIN RIBBON BOOKMARK HANGING FROM BOTTOM */}
        <div
          className="absolute -bottom-10 left-1/4 w-6 h-14 bg-gradient-to-b from-red-800 to-red-600 shadow-lg pointer-events-none rounded-b-xs"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)',
            transform: 'rotate(4deg)'
          }}
        />
      </div>
    </div>
  )
}
