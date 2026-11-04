import React, { useState } from 'react'
import { JournalPage } from '../types/journal'
import { Search, X, MapPin, Calendar, ArrowRight } from 'lucide-react'
import { sound } from '../utils/sound'

interface SearchPanelProps {
  pages: JournalPage[]
  isOpen: boolean
  onClose: () => void
  onSelectPage: (index: number) => void
}

export const SearchPanel: React.FC<SearchPanelProps> = ({
  pages,
  isOpen,
  onClose,
  onSelectPage
}) => {
  const [query, setQuery] = useState('')

  if (!isOpen) return null

  const filtered = pages.filter(p => {
    const q = query.toLowerCase().trim()
    if (!q) return true
    return (
      p.title.toLowerCase().includes(q) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
      (p.location && p.location.toLowerCase().includes(q)) ||
      p.date.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.notes.some(n => n.text.toLowerCase().includes(q))
    )
  })

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Container */}
      <div className="w-full max-w-md bg-[#253047] h-full shadow-2xl flex flex-col p-6 border-l border-white/10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-white/70" />
            <h3 className="text-lg font-bold text-white tracking-tight">Search Journal</h3>
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

        {/* Search Input Box */}
        <div className="relative my-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, place, date, note..."
            autoFocus
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/50"
          />
          <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-2.5 text-white/40 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results Count */}
        <p className="text-xs text-white/50 mb-3">
          Found {filtered.length} matching {filtered.length === 1 ? 'page' : 'pages'}
        </p>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-white/40 text-sm">
              No matching pages found for "{query}".
            </div>
          ) : (
            filtered.map((page) => {
              const pageIdx = pages.findIndex(p => p.id === page.id)
              return (
                <div
                  key={page.id}
                  onClick={() => {
                    sound.playPaperTurn()
                    onSelectPage(pageIdx)
                    onClose()
                  }}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 cursor-pointer transition-all duration-150 flex items-center justify-between group"
                >
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2 text-[10px] text-white/50 mb-1">
                      <span className="font-semibold text-white/70">Page {page.pageNumber}</span>
                      <span>•</span>
                      <span>{page.date}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white truncate group-hover:text-blue-200">
                      {page.title}
                    </h4>
                    {page.location && (
                      <p className="text-xs text-white/60 truncate flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 opacity-60" />
                        <span>{page.location}</span>
                      </p>
                    )}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-[#253047] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

