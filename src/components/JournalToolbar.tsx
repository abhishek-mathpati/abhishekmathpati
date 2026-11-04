import React from 'react'
import { MoreHorizontal, Upload, Trash2, Plus } from 'lucide-react'
import { sound } from '../utils/sound'

interface JournalToolbarProps {
  onMoreOptions: () => void
  onSharePage: () => void
  onDeletePage: () => void
  onAddPage: () => void
  disableDelete?: boolean
}

export const JournalToolbar: React.FC<JournalToolbarProps> = ({
  onMoreOptions,
  onSharePage,
  onDeletePage,
  onAddPage,
  disableDelete = false
}) => {
  return (
    <nav
      aria-label="Journal Controls"
      className="relative z-30 flex items-center justify-center gap-3.5 pb-6 pt-2 select-none"
    >
      {/* Contextual More Options (...) */}
      <button
        onClick={() => {
          sound.playClick()
          onMoreOptions()
        }}
        aria-label="More Actions"
        title="Page Options & Tools"
        className="w-11 h-11 rounded-full bg-white text-[#2a354d] flex items-center justify-center shadow-lg shadow-black/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/40"
      >
        <MoreHorizontal className="w-5 h-5 stroke-[2.2]" />
      </button>

      {/* Share / Export (Upload Tray) */}
      <button
        onClick={() => {
          sound.playClick()
          onSharePage()
        }}
        aria-label="Export or Share Page"
        title="Share / Export Page"
        className="w-11 h-11 rounded-full bg-white text-[#2a354d] flex items-center justify-center shadow-lg shadow-black/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/40"
      >
        <Upload className="w-5 h-5 stroke-[2.2]" />
      </button>

      {/* Delete Current Page (Trash Can) */}
      <button
        onClick={() => {
          sound.playClick()
          onDeletePage()
        }}
        disabled={disableDelete}
        aria-label="Delete Page"
        title={disableDelete ? "Cannot delete the last remaining page" : "Delete Current Page"}
        className={`w-11 h-11 rounded-full bg-white text-[#2a354d] flex items-center justify-center shadow-lg shadow-black/25 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/40 ${
          disableDelete
            ? 'opacity-40 cursor-not-allowed'
            : 'hover:shadow-xl hover:scale-105 active:scale-95 hover:text-red-600'
        }`}
      >
        <Trash2 className="w-5 h-5 stroke-[2.2]" />
      </button>

      {/* Add New Page (+) */}
      <button
        onClick={() => {
          sound.playClick()
          onAddPage()
        }}
        aria-label="Add New Page"
        title="Add New Journal Page"
        className="w-11 h-11 rounded-full bg-white text-[#2a354d] flex items-center justify-center shadow-lg shadow-black/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/40"
      >
        <Plus className="w-5 h-5 stroke-[2.4]" />
      </button>
    </nav>
  )
}

