import React from 'react'
import { Book, BookOpen, Volume2, VolumeX } from 'lucide-react'
import { sound } from '../utils/sound'

interface JournalHeaderProps {
  isClosed: boolean
  onToggleBook: () => void
  soundEnabled: boolean
  onToggleSound: () => void
  currentPageNumber?: number
  totalPages?: number
}

export const JournalHeader: React.FC<JournalHeaderProps> = ({
  isClosed,
  onToggleBook,
  soundEnabled,
  onToggleSound,
  currentPageNumber = 1,
  totalPages = 10
}) => {
  return (
    <header className="relative z-30 w-full px-6 sm:px-10 pt-5 pb-2 flex items-center justify-between select-none">
      {/* Top Left Heading */}
      <div className="flex flex-col">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans flex items-center gap-2">
          <span>Abhishek Mathpati</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span>
        </h1>
        <p className="text-[11px] sm:text-xs text-white/70 tracking-wider font-medium mt-0.5">
          Software Developer & Security Researcher • Portfolio
        </p>
      </div>

      {/* Center: Minimal Page Count Icon matching reference screenshot */}
      {!isClosed && (
        <div className="hidden sm:flex items-center gap-1.5 text-white/75 text-xs font-medium tracking-wide">
          <div className="relative w-3.5 h-3.5 flex items-center justify-center">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              className="w-3.5 h-3.5 stroke-[1.6]"
            >
              <rect x="2.5" y="2" width="11" height="12" rx="1.5" />
              <line x1="2.5" y1="14" x2="13.5" y2="2" />
            </svg>
          </div>
          <span>{totalPages * 2} Pages ({totalPages} Spreads)</span>
        </div>
      )}

      {/* Top Right: Clean Minimal Controls */}
      <div className="flex items-center gap-2.5">
        {/* Toggle Book Open / Closed */}
        <button
          onClick={() => {
            sound.playPaperTurn(!isClosed)
            onToggleBook()
          }}
          aria-label={isClosed ? "Open Book" : "Close Book"}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide transition-all duration-200 backdrop-blur-xs shadow-sm hover:scale-105 active:scale-95"
        >
          {isClosed ? (
            <>
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Open Book</span>
            </>
          ) : (
            <>
              <Book className="w-3.5 h-3.5 text-blue-300" />
              <span>Close Book</span>
              <span className="opacity-40">•</span>
              <span className="text-white/80 font-mono text-[11px]">
                Pages {currentPageNumber * 2 - 1}–{currentPageNumber * 2} of {totalPages * 2}
              </span>
            </>
          )}
        </button>

        {/* Subtle Audio Mute / Unmute Button */}
        <button
          onClick={() => {
            onToggleSound()
          }}
          aria-label="Toggle Sound"
          title={soundEnabled ? "Mute paper sounds" : "Enable paper sounds"}
          className="w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white/75 hover:text-white flex items-center justify-center transition-all duration-200"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-white/40" />
          )}
        </button>
      </div>
    </header>
  )
}
