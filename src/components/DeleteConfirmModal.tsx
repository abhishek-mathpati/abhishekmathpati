import React from 'react'
import { JournalPage } from '../types/journal'
import { Trash2, AlertTriangle, X } from 'lucide-react'
import { sound } from '../utils/sound'

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  page: JournalPage
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  page
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-[#253149] rounded-2xl shadow-2xl border border-white/15 p-6 flex flex-col items-center text-center">
        {/* Warning Icon Badge */}
        <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-4 ring-8 ring-red-500/10">
          <Trash2 className="w-6 h-6 stroke-[2]" />
        </div>

        <h3 className="text-lg font-bold text-white tracking-tight mb-1">
          Delete Page {page.pageNumber}?
        </h3>
        <p className="text-sm text-white/70 mb-4">
          Are you sure you want to remove <span className="text-white font-semibold">"{page.title}"</span>? You can undo this action immediately after deleting.
        </p>

        {/* Thumbnail Preview */}
        {page.photos[0] && (
          <div className="w-full h-24 rounded-xl overflow-hidden mb-5 border border-white/15 relative">
            <img
              src={page.photos[0].url}
              alt={page.photos[0].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-end p-2 text-left">
              <span className="text-xs text-white/90 font-medium truncate">
                {page.date} • {page.location || page.title}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="w-full grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              sound.playClick()
              onClose()
            }}
            className="w-full py-2.5 rounded-xl border border-white/20 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              sound.playClick()
              onConfirm()
              onClose()
            }}
            className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-sm font-bold text-white shadow-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}

