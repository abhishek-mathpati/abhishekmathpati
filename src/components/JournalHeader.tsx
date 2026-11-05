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
        <h1 className="text-5xl sm:text-6xl font-normal tracking-wide text-white font-apricots flex items-center gap-2">
          <span>Abhishek Mathpati</span>
        </h1>
      </div>

      {/* Top Right: Clean Minimal Controls */}
      <div className="flex items-center gap-2.5">
        {/* Toggle Book Open / Closed */}


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
