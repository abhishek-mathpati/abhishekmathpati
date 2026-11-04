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
      <div className="flex items-center">
        <h1 className="text-3xl sm:text-4xl font-normal tracking-wide text-white font-apricots flex items-center gap-2">
          <span>Abhishek Mathpati</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block mb-1"></span>
        </h1>
      </div>

      {/* Top Right: Clean Minimal Controls */}
      <div className="flex items-center gap-2.5">
        {/* Toggle Book Open / Closed */}
        <button
          onClick={() => {
            sound.playPaperTurn(!isClosed)
            onToggleBook()
          }}
          aria-label={isClosed ? "Open Book" : "Close Book"}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
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
