import React, { useState } from 'react'
import { JournalPage } from '../types/journal'
import { PageRenderer } from './PageRenderer'
import { Search, X, BookOpen, Tag } from 'lucide-react'
import { sound } from '../utils/sound'

interface GridViewProps {
  pages: JournalPage[]
  currentIndex: number
  onSelectPage: (index: number) => void
  onClose: () => void
}

export const GridView: React.FC<GridViewProps> = ({
  pages,
  currentIndex,
  onSelectPage,
  onClose
}) => {
  const [filterTag, setFilterTag] = useState<string>('all')

  // Collect all unique tags
  const allTags = Array.from(new Set(pages.flatMap(p => p.tags)))

  const filteredPages = filterTag === 'all'
    ? pages
    : pages.filter(p => p.tags.includes(filterTag))

  return (
    <div className="fixed inset-0 z-50 bg-[#28344e]/95 backdrop-blur-md flex flex-col p-6 sm:p-10 select-none animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              All Journal Pages
            </h2>
            <p className="text-xs text-white/60">
              {pages.length} pages total • Click any spread to jump into 3D view
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick()
            onClose()
          }}
          aria-label="Close Grid View"
          className="w-10 h-10 rounded-full border border-white/30 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Tags */}
      <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setFilterTag('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            filterTag === 'all'
              ? 'bg-white text-[#28344e] shadow-md font-semibold'
              : 'bg-white/10 text-white/80 hover:bg-white/20'
          }`}
        >
          All ({pages.length})
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
              filterTag === tag
                ? 'bg-white text-[#28344e] shadow-md font-semibold'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            <Tag className="w-3 h-3 opacity-60" />
            <span>{tag}</span>
          </button>
        ))}
      </div>

      {/* Pages Grid */}
      <div className="flex-1 overflow-y-auto pt-2 pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPages.map((page) => {
          const actualIndex = pages.findIndex(p => p.id === page.id)
          const isActive = actualIndex === currentIndex

          return (
            <div
              key={page.id}
              onClick={() => {
                sound.playPaperTurn()
                onSelectPage(actualIndex)
                onClose()
              }}
              className={`group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 transform hover:-translate-y-1.5 ${
                isActive
                  ? 'ring-2 ring-white shadow-2xl scale-[1.02]'
                  : 'hover:shadow-xl opacity-90 hover:opacity-100'
              }`}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[1.55/1] w-full rounded-2xl overflow-hidden bg-neutral-800 shadow-md">
                <div className="w-full h-full pointer-events-none transform scale-100 group-hover:scale-105 transition-transform duration-300">
                  <PageRenderer page={page} />
                </div>

                {/* Spine crease shadow in preview */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 center-crease-shadow opacity-60 pointer-events-none" />

                {/* Page Number Pill */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-semibold text-white/90">
                  Page {page.pageNumber}
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white text-[#28344e] text-[9px] font-bold shadow-xs">
                    ACTIVE
                  </div>
                )}
              </div>

              {/* Title & Date Caption */}
              <div className="p-2.5">
                <h4 className="text-sm font-semibold text-white tracking-tight line-clamp-1 group-hover:text-blue-200 transition-colors">
                  {page.title}
                </h4>
                <p className="text-[11px] text-white/60 line-clamp-1 mt-0.5">
                  {page.date} {page.location && `• ${page.location}`}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

