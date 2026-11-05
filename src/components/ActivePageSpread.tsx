import React from 'react'
import { JournalPage } from '../types/journal'
import { PageRenderer } from './PageRenderer'

interface ActivePageSpreadProps {
  page: JournalPage
  className?: string
  onClickLeft?: () => void
  onClickRight?: () => void
  interactive?: boolean
}

export const ActivePageSpread: React.FC<ActivePageSpreadProps> = ({
  page,
  className = '',
  onClickLeft,
  onClickRight,
  interactive = true
}) => {
  return (
    <div
      className={`relative w-full h-full rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-2xl select-none bg-[#fbf9f5] ${className}`}
    >
      {/* Seamless Full Spread Content Canvas */}
      <div className="absolute inset-0 w-full h-full">
        <PageRenderer page={page} />
      </div>

      {/* 
        Refined, delicate center seam:
        Thin 1px line + subtle soft feather, no heavy grease or dark smudge!
      */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 subtle-center-seam pointer-events-none z-20" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/15 pointer-events-none z-20" />

      {/* Clean, subtle outer page edge highlight */}
      <div className="absolute inset-0 rounded-[20px] sm:rounded-[24px] border border-black/8 pointer-events-none z-30" />
      <div className="absolute inset-0 rounded-[20px] sm:rounded-[24px] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.6),inset_0_-1px_1.5px_rgba(0,0,0,0.1)] pointer-events-none z-30" />
    </div>
  )
}
