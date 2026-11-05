import React, { useState } from 'react'
import { Sparkles, BookOpen } from 'lucide-react'

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
      className="relative w-full h-full rounded-[18px] sm:rounded-[22px] cursor-pointer select-none group"
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
      <div className="relative w-full h-full rounded-[18px] sm:rounded-[22px] overflow-hidden book-cover-leather border border-white/10 flex flex-col items-center justify-between py-6 sm:py-8 pl-12 sm:pl-16 pr-5 sm:pr-7 shadow-2xl">
        {/* LEATHER SPINE SEAM ON LEFT EDGE */}
        <div className="absolute inset-y-0 left-0 w-10 sm:w-13 bg-gradient-to-r from-black/70 via-black/35 to-transparent border-r border-black/50 flex flex-col justify-around py-12 pointer-events-none z-10">
          <div className="w-full h-0.5 bg-amber-500/30 shadow-xs" />
          <div className="w-full h-0.5 bg-amber-500/30 shadow-xs" />
          <div className="w-full h-0.5 bg-amber-500/30 shadow-xs" />
          <div className="w-full h-0.5 bg-amber-500/30 shadow-xs" />
        </div>

        {/* GOLD EMBOSSED INSET BORDER */}
        <div className="absolute top-3.5 sm:top-5 bottom-3.5 sm:bottom-5 right-3.5 sm:right-5 left-12 sm:left-15 border-2 gold-foil-border rounded-[12px] pointer-events-none opacity-80" />
        <div className="absolute top-4.5 sm:top-6 bottom-4.5 sm:bottom-6 right-4.5 sm:right-6 left-13 sm:left-16 border border-dashed border-amber-400/30 rounded-[10px] pointer-events-none" />

        {/* TOP HEADER: EDITION */}
        <div className="relative z-10 text-center pt-1">
          <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-amber-200/80 uppercase">
            Portfolio & Selected Works • 2026
          </p>
          <div className="w-14 sm:w-16 h-px bg-amber-400/40 mx-auto mt-1.5" />
        </div>

        {/* CENTER: CREST & MONOGRAM & TITLE */}
        <div className="relative z-10 flex flex-col items-center text-center my-auto px-2">
          {/* Monogram Emblem */}
          <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border-2 border-amber-400/60 flex items-center justify-center p-1.5 mb-3 bg-black/25 shadow-inner group-hover:border-amber-300 transition-colors">
            <div className="w-full h-full rounded-full border border-dashed border-amber-400/40 flex items-center justify-center">
              <span className="font-editorial text-xl sm:text-2xl font-bold gold-foil-text tracking-widest">
                AM
              </span>
            </div>
          </div>

          {/* Name & Portfolio Title */}
          <h1 className="font-editorial text-2xl sm:text-3xl md:text-[2.2rem] font-bold tracking-tight gold-foil-text uppercase mb-1 leading-tight">
            Abhishek Mathpati
          </h1>
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] text-amber-100/90 uppercase font-sans">
            Software Developer & Security Researcher
          </p>
          <p className="text-[10px] sm:text-[11px] text-amber-200/70 tracking-wider mt-2 font-mono">
            Decentralized Architectures • Digital Forensics • Applied AI Security
          </p>
        </div>

        {/* BOTTOM: INTERACTIVE "CLICK TO OPEN" CUE */}
        <div className="relative z-10 flex flex-col items-center pb-1">
          <div className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-black/40 border border-amber-400/40 backdrop-blur-xs text-amber-200 text-[11px] sm:text-xs font-semibold tracking-wider uppercase group-hover:bg-amber-400 group-hover:text-neutral-900 group-hover:border-amber-300 transition-all duration-300 shadow-md">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Open Portfolio Book</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:text-neutral-900" />
          </div>
          <span className="text-[9px] sm:text-[10px] text-white/40 tracking-widest uppercase mt-2">
            Click to Flip Open • Press Space
          </span>
        </div>

        {/* RED SATIN RIBBON BOOKMARK HANGING FROM BOTTOM */}
        <div
          className="absolute -bottom-9 left-1/3 w-5 sm:w-6 h-12 sm:h-14 bg-gradient-to-b from-red-800 to-red-600 shadow-lg pointer-events-none rounded-b-xs z-20"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)',
            transform: 'rotate(4deg)'
          }}
        />
      </div>
    </div>
  )
}
