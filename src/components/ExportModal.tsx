import React, { useState } from 'react'
import { JournalPage } from '../types/journal'
import { X, Upload, Share2, Copy, Check, Printer, Download, Sparkles } from 'lucide-react'
import { sound } from '../utils/sound'

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  page: JournalPage
  onShowToast: (msg: string) => void
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  page,
  onShowToast
}) => {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopyLink = () => {
    sound.playClick()
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    onShowToast("Link copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePrint = () => {
    sound.playClick()
    window.print()
  }

  const handleNativeShare = async () => {
    sound.playClick()
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${page.title} - Digital Journal`,
          text: page.summary || `Page ${page.pageNumber}: ${page.title}`,
          url: window.location.href,
        })
        onShowToast("Shared successfully!")
      } catch {
        // user cancelled
      }
    } else {
      handleCopyLink()
    }
  }

  const handleDownloadJSON = () => {
    sound.playClick()
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(page, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `journal-page-${page.pageNumber}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
    onShowToast(`Exported page ${page.pageNumber} as JSON`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-[#253149] rounded-2xl shadow-2xl border border-white/15 p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-white/80" />
            <h3 className="text-lg font-bold text-white tracking-tight">Export & Share</h3>
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

        {/* Current Page Snapshot Info */}
        <div className="py-4">
          <p className="text-xs text-white/60 mb-1">CURRENT ACTIVE PAGE</p>
          <h4 className="text-base font-bold text-white truncate">{page.title}</h4>
          <p className="text-xs text-white/70 mt-0.5">{page.date} • Page {page.pageNumber}</p>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {/* Share via Web Share API / Copy Link */}
          <button
            onClick={handleNativeShare}
            className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-sm flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Share2 className="w-4 h-4 text-blue-300" />
              <span>Share Spread</span>
            </div>
            <span className="text-xs text-white/50 group-hover:text-white">Native Share</span>
          </button>

          {/* Copy Direct Link */}
          <button
            onClick={handleCopyLink}
            className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-sm flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2.5">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-white/70" />}
              <span>{copied ? 'Link Copied!' : 'Copy Journal Link'}</span>
            </div>
          </button>

          {/* Print / Save to PDF */}
          <button
            onClick={handlePrint}
            className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-sm flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Print / Save as PDF</span>
            </div>
          </button>

          {/* Download JSON Data */}
          <button
            onClick={handleDownloadJSON}
            className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-sm flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Download className="w-4 h-4 text-purple-300" />
              <span>Export Page JSON</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

