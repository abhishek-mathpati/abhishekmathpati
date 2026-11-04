import React, { useState } from 'react'
import { JournalPage } from '../types/journal'
import { X, Plus, Sparkles, Image as ImageIcon, MapPin, Calendar } from 'lucide-react'
import { sound } from '../utils/sound'
import confetti from 'canvas-confetti'

interface AddPageModalProps {
  isOpen: boolean
  onClose: () => void
  onAddPage: (newPage: JournalPage) => void
  nextPageNumber: number
}

const PRESET_PHOTOS = [
  {
    title: "Santorini Sunset",
    url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    location: "Oia, Santorini"
  },
  {
    title: "Iceland Waterfall",
    url: "https://images.unsplash.com/photo-1489674267075-cee793167910?auto=format&fit=crop&w=800&q=80",
    location: "Skógafoss, Iceland"
  },
  {
    title: "Venice Canal",
    url: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=800&q=80",
    location: "Grand Canal, Venice"
  },
  {
    title: "Swiss Alpine Lake",
    url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    location: "Lake Oeschinen, Switzerland"
  }
]

export const AddPageModal: React.FC<AddPageModalProps> = ({
  isOpen,
  onClose,
  onAddPage,
  nextPageNumber
}) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('OCTOBER 2024')
  const [location, setLocation] = useState('')
  const [tag, setTag] = useState('Travel')
  const [selectedPhoto, setSelectedPhoto] = useState(PRESET_PHOTOS[0])
  const [reflection, setReflection] = useState('')
  const [paperTexture, setPaperTexture] = useState<'cream' | 'paperWarm' | 'kraft' | 'vintage'>('cream')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const newPage: JournalPage = {
      id: `page-${Date.now()}`,
      pageNumber: nextPageNumber,
      title: title.trim(),
      subtitle: location || "New Memory",
      date: date.trim() || "TODAY",
      location: location.trim(),
      tags: [tag, "Memory"],
      paperTexture: paperTexture,
      accentColor: "#3b82f6",
      summary: reflection || "A new page in my floating digital journal.",
      photos: [
        {
          id: `photo-${Date.now()}-1`,
          url: selectedPhoto.url,
          caption: selectedPhoto.title,
          style: "frameless",
          position: { top: "4%", right: "4%", width: "46%", height: "92%" },
          alt: selectedPhoto.title
        }
      ],
      stickers: [
        {
          id: `sticker-${Date.now()}-1`,
          type: "tape",
          color: "pink",
          position: { top: "6%", left: "16%", rotate: "-6deg", zIndex: 12 }
        },
        {
          id: `sticker-${Date.now()}-2`,
          type: "stamp",
          label: "NEW MEMORY",
          color: "#3b82f6",
          position: { top: "6%", left: "34%", rotate: "4deg", zIndex: 12 }
        }
      ],
      notes: [
        {
          id: `note-${Date.now()}-title`,
          text: title.trim(),
          fontStyle: "script",
          position: { top: "18%", left: "6%" },
          fontSize: "text-3xl font-bold",
          color: "#0f172a"
        },
        {
          id: `note-${Date.now()}-body`,
          text: reflection.trim() || "Wrote a fresh page in the scrapbook today. Some moments deserve to be held forever.",
          fontStyle: "handwriting",
          position: { top: "34%", left: "6%", maxWidth: "340px" },
          fontSize: "text-base leading-relaxed",
          color: "#334155"
        }
      ]
    }

    // Play sound and trigger mini confetti
    sound.playPaperTurn(true)
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 }
    })

    onAddPage(newPage)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#243048] rounded-2xl shadow-2xl border border-white/15 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-white/80" />
            <h3 className="text-lg font-bold text-white tracking-tight">Add New Scrapbook Page</h3>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
              Page Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sunset in Santorini, Golden Hour Coffee..."
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          {/* Date & Location Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="OCTOBER 2024"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Paris, Tokyo, Big Sur"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            </div>
          </div>

          {/* Photo Selection */}
          <div>
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
              Select Featured Photograph
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_PHOTOS.map((photo) => (
                <button
                  type="button"
                  key={photo.title}
                  onClick={() => {
                    sound.playClick()
                    setSelectedPhoto(photo)
                    if (!location) setLocation(photo.location)
                  }}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                    selectedPhoto.title === photo.title
                      ? 'border-white ring-2 ring-white/50 scale-[1.03]'
                      : 'border-white/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-1.5 flex items-end">
                    <span className="text-[10px] text-white font-medium truncate">{photo.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Paper Texture Style */}
          <div>
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
              Paper Texture
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'cream', name: 'Cream Parchment', bg: 'bg-[#fbf9f5] text-neutral-800' },
                { id: 'paperWarm', name: 'Warm Paper', bg: 'bg-[#f4eee5] text-neutral-800' },
                { id: 'kraft', name: 'Kraft Card', bg: 'bg-[#e8decb] text-neutral-800' },
                { id: 'vintage', name: 'Aged Vintage', bg: 'bg-[#f5edd6] text-neutral-800' }
              ].map((tex) => (
                <button
                  type="button"
                  key={tex.id}
                  onClick={() => {
                    sound.playClick()
                    setPaperTexture(tex.id as any)
                  }}
                  className={`py-2 px-1.5 rounded-xl text-[11px] font-semibold text-center border transition-all ${tex.bg} ${
                    paperTexture === tex.id ? 'ring-2 ring-white border-white scale-102' : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  {tex.name}
                </button>
              ))}
            </div>
          </div>

          {/* Handwritten Reflection Note */}
          <div>
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
              Handwritten Reflection / Notes
            </label>
            <textarea
              rows={3}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Write your memories, funny moments, thoughts, or feelings here..."
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 resize-none font-handwriting text-base"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-white text-[#243048] font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Create Page</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

