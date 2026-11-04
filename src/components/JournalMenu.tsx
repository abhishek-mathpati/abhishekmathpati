import React from 'react'
import { X, Volume2, VolumeX, Sparkles, Sliders, Keyboard, Book, RefreshCw, Download } from 'lucide-react'
import { sound } from '../utils/sound'
import { JournalMetadata } from '../types/journal'

interface JournalMenuProps {
  isOpen: boolean
  onClose: () => void
  soundEnabled: boolean
  onToggleSound: () => void
  tiltEnabled: boolean
  onToggleTilt: () => void
  metadata: JournalMetadata
  onUpdateMetadata: (meta: Partial<JournalMetadata>) => void
  onResetData: () => void
  totalCount: number
}

export const JournalMenu: React.FC<JournalMenuProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
  tiltEnabled,
  onToggleTilt,
  metadata,
  onUpdateMetadata,
  onResetData,
  totalCount
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer */}
      <div className="w-full max-w-sm bg-[#222c42] h-full shadow-2xl flex flex-col p-6 border-l border-white/10 overflow-y-auto animate-in slide-in-from-right duration-300 select-none">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Book className="w-5 h-5 text-white/70" />
            <h3 className="text-lg font-bold text-white tracking-tight">Journal Settings</h3>
          </div>
          <button
            onClick={() => {
              sound.playClick()
              onClose()
            }}
            className="w-8 h-8 rounded-full border border-white/30 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Journal Title Edit */}
        <div className="py-4 border-b border-white/10 space-y-3">
          <label className="text-xs font-semibold text-white/60 uppercase tracking-wider block">
            Journal Title
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['Journal', '2024', 'Spain Memories', 'Travel Scrapbook'].map((name) => (
              <button
                key={name}
                onClick={() => {
                  sound.playClick()
                  onUpdateMetadata({ title: name })
                }}
                className={`px-3 py-2 rounded-xl text-xs font-medium text-left truncate transition-all border ${
                  metadata.title === name
                    ? 'border-white bg-white/20 text-white font-semibold'
                    : 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles (Sound & 3D Tilt) */}
        <div className="py-4 border-b border-white/10 space-y-4">
          <label className="text-xs font-semibold text-white/60 uppercase tracking-wider block">
            Experience & Effects
          </label>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-white/40" />
              )}
              <div>
                <p className="text-sm font-medium text-white">Paper Turning Sounds</p>
                <p className="text-[11px] text-white/50">Physical audio swoosh on turn</p>
              </div>
            </div>
            <button
              onClick={() => {
                onToggleSound()
                sound.playPaperTurn()
              }}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                soundEnabled ? 'bg-emerald-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* 3D Tilt Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <div>
                <p className="text-sm font-medium text-white">Interactive 3D Tilt</p>
                <p className="text-[11px] text-white/50">Follows cursor angle in space</p>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playClick()
                onToggleTilt()
              }}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                tiltEnabled ? 'bg-emerald-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  tiltEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts Guide */}
        <div className="py-4 border-b border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-white/70 mb-2">
            <Keyboard className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Keyboard Navigation</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
              <span className="text-white/60">Turn Right / Next</span>
              <kbd className="px-1.5 py-0.5 bg-white/15 rounded text-[10px] font-mono text-white">→ / D</kbd>
            </div>
            <div className="p-2 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
              <span className="text-white/60">Turn Left / Prev</span>
              <kbd className="px-1.5 py-0.5 bg-white/15 rounded text-[10px] font-mono text-white">← / A</kbd>
            </div>
            <div className="p-2 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
              <span className="text-white/60">Grid View</span>
              <kbd className="px-1.5 py-0.5 bg-white/15 rounded text-[10px] font-mono text-white">G</kbd>
            </div>
            <div className="p-2 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
              <span className="text-white/60">Search</span>
              <kbd className="px-1.5 py-0.5 bg-white/15 rounded text-[10px] font-mono text-white">/</kbd>
            </div>
          </div>
        </div>

        {/* Reset / Actions */}
        <div className="pt-4 mt-auto space-y-2">
          <button
            onClick={() => {
              sound.playClick()
              onResetData()
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white text-xs font-medium flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Sample Scrapbook Content</span>
          </button>
        </div>
      </div>
    </div>
  )
}

