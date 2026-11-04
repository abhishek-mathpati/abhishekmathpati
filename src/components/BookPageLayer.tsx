import React from 'react'
import { JournalPage } from '../types/journal'
import { PageRenderer } from './PageRenderer'

interface BookPageLayerProps {
  page: JournalPage
  delta: number // distance from current page: negative for left, positive for right
  onClick: () => void
  isLeft: boolean
}

export const BookPageLayer: React.FC<BookPageLayerProps> = ({
  page,
  delta,
  onClick,
  isLeft
}) => {
  const absDelta = Math.abs(delta)
  // Distance limits: show up to 6 pages on each side
  if (absDelta > 6) return null

  // Fan offsets matching reference image:
  // - Smooth horizontal fanning stepping outwards to left/right
  // - Progressive negative Z depth strictly behind the active spread
  // - Proportional scale taper creates realistic physical perspective edges
  const xOffset = isLeft ? -absDelta * 22 : absDelta * 22
  const zOffset = -absDelta * 10
  const scale = 1 - absDelta * 0.012
  const shadowOpacity = Math.min(0.65, 0.12 + absDelta * 0.08)

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      title={`Go to page ${page.pageNumber}: ${page.title}`}
      style={{
        transform: `translateX(${xOffset}px) translateZ(${zOffset}px) scale(${scale})`,
        zIndex: 10 - absDelta,
        transition: 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease',
      }}
      className="absolute inset-0 rounded-[20px] sm:rounded-[24px] overflow-hidden cursor-pointer group shadow-xl select-none bg-[#fbf9f5] pointer-events-auto"
    >
      {/* Real page content snapshot */}
      <div className="w-full h-full pointer-events-none">
        <PageRenderer page={page} className="opacity-95" />
      </div>

      {/* Atmospheric depth shadow overlay - darker with depth */}
      <div
        style={{ backgroundColor: `rgba(16, 24, 44, ${shadowOpacity})` }}
        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-30 pointer-events-none"
      />

      {/* Subtle edge highlight */}
      <div className="absolute inset-0 border border-white/20 rounded-[20px] sm:rounded-[24px] pointer-events-none" />

      {/* Hover lift cue */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200 pointer-events-none" />
    </div>
  )
}
