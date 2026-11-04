import React from 'react'
import { JournalPage } from '../types/journal'
import { X, Copy, Sparkles, Volume2, VolumeX, Eye, ArrowRight, Layers } from 'lucide-react'
import { sound } from '../utils/sound'
import confetti from 'canvas-confetti'

interface PageOptionsModalProps {
  isOpen: boolean
  onClose: () => void
  page: JournalPage
  totalCount: number
  currentIndex: number
  onJumpToPage: (pageIndex: number) => void
  onDuplicatePage: () => void
  soundEnabled: boolean
  onToggleSound: () => void
  tiltEnabled: boolean
  onToggleTilt: () => void
  onOpenGrid: () => void
}

export const PageOptionsModal: React.FC<PageOptionsModalProps> = ({
  isOpen,
  onClose,
  page,
  totalCount,
  currentIndex,
  onJumpToPage,
  onDuplicatePage,
  soundEnabled,
  onToggleSound,
  tiltEnabled,
  onToggleTilt,
  onOpenGrid
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-[#253149] rounded-2xl shadow-2xl border border-white/15 p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Page Actions</h3>
            <p className="text-xs text-white/60">Page {page.pageNumber} of {totalCount}</p>
          </div>
          <button
            onClick={() => {
              sound.playClick()
              onClose()
            }}
            className="w-8 h-8 rounded-full border border-white/20 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Page Jump Slider / Quick Switch */}
        <div className="py-4 border-b border-white/10">
          <div className="flex items-center justify-between text-xs text-white/70 mb-2">
            <span>Jump to Page</span>
            <span className="font-bold text-white">{currentIndex + 1} / {totalCount}</span>
          </div>
          <input
            type="range"
            min={0}
            max={totalCount - 1}
            value={currentIndex}
            onChange={(e) => {
              sound.playPaperTurn()
              onJumpToPage(Number(e.target.value))
            }}
            className="w-full accent-white h-1.5 bg-white/20 rounded-lg cursor-pointer"
          />
        </div>

        {/* Option Buttons */}
        <div className="py-3 space-y-2">
          {/* Duplicate Current Page */}
          <button
            onClick={() => {
              sound.playClick()
              onDuplicatePage()
              onClose()
            }}
            className="w-full py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white text-sm font-medium flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Copy className="w-4 h-4 text-blue-300" />
              <span>Duplicate Page</span>
            </div>
            <span className="text-[11px] text-white/50">Clone spread</span>
          </button>

          {/* Open Grid Overview */}
          <button
            onClick={() => {
              sound.playClick()
              onOpenGrid()
              onClose()
            }}
            className="w-full py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white text-sm font-medium flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-emerald-300" />
              <span>View All Pages Grid</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-white/50" />
          </button>

          {/* Toggle Sound */}
          <button
            onClick={() => {
              onToggleSound()
              sound.playPaperTurn()
            }}
            className="w-full py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white text-sm font-medium flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2.5">
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-white/40" />}
              <span>Paper Audio</span>
            </div>
            <span className="text-[11px] font-semibold text-white/80">{soundEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Celebrate Confetti */}
          <button
            onClick={() => {
              sound.playClick()
              confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.6 }
              })
            }}
            className="w-full py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white text-sm font-medium flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Celebrate Page</span>
            </div>
            <span className="text-[11px] text-white/50">✨</span>
          </button>
        </div>
      </div>
    </div>
  )
}

