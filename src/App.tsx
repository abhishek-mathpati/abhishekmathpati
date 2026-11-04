import React, { useState, useEffect, useCallback } from 'react'
import { JournalPage } from './types/journal'
import { samplePages } from './data/samplePages'
import { JournalHeader } from './components/JournalHeader'
import { BookStage } from './components/BookStage'
import { sound } from './utils/sound'

export default function App() {
  // State with URL sync
  const [pages] = useState<JournalPage[]>(samplePages)
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    try {
      const p = new URLSearchParams(window.location.search).get('page')
      if (p) {
        const val = parseInt(p, 10) - 1
        if (val >= 0 && val < samplePages.length) return val
      }
    } catch {}
    return 0
  })
  const [isClosed, setIsClosed] = useState<boolean>(() => {
    try {
      return new URLSearchParams(window.location.search).get('closed') === 'true'
    } catch {}
    return false
  })

  // Sync current page number and closed state with URL
  useEffect(() => {
    try {
      const url = new URL(window.location.href)
      url.searchParams.set('page', String(currentIndex + 1))
      if (isClosed) {
        url.searchParams.set('closed', 'true')
      } else {
        url.searchParams.delete('closed')
      }
      window.history.replaceState({}, '', url.toString())
    } catch {}
  }, [currentIndex, isClosed])

  // 3D Animation states
  const [isTurning, setIsTurning] = useState(false)
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev' | null>(null)
  const [targetIndex, setTargetIndex] = useState<number | null>(null)

  // Settings: Active by default without configuration clutter
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [tiltEnabled] = useState(true)

  // Turn orchestration
  const startTurn = useCallback(
    (direction: 'next' | 'prev') => {
      if (isTurning || isClosed) return

      if (direction === 'next' && currentIndex < pages.length - 1) {
        sound.playPaperTurn(true)
        setIsTurning(true)
        setTurnDirection('next')
        setTargetIndex(currentIndex + 1)
      } else if (direction === 'prev') {
        if (currentIndex > 0) {
          sound.playPaperTurn(false)
          setIsTurning(true)
          setTurnDirection('prev')
          setTargetIndex(currentIndex - 1)
        } else {
          // If already on page 1 and turn prev is pressed, close the book!
          sound.playPaperTurn(false)
          setIsClosed(true)
        }
      }
    },
    [currentIndex, pages.length, isTurning, isClosed]
  )

  const handleTurnComplete = useCallback(() => {
    if (targetIndex !== null) {
      setCurrentIndex(targetIndex)
    }
    setIsTurning(false)
    setTurnDirection(null)
    setTargetIndex(null)
  }, [targetIndex])

  // Direct page navigation
  const handlePageSelect = useCallback(
    (index: number) => {
      if (index === currentIndex || isTurning || isClosed) return

      if (index === currentIndex + 1) {
        startTurn('next')
      } else if (index === currentIndex - 1) {
        startTurn('prev')
      } else {
        sound.playPaperTurn(index > currentIndex)
        setCurrentIndex(index)
      }
    },
    [currentIndex, isTurning, isClosed, startTurn]
  )

  // Toggle book open/closed
  const handleToggleBook = (closed?: boolean) => {
    const nextState = closed !== undefined ? closed : !isClosed
    setIsClosed(nextState)
    if (nextState) {
      setCurrentIndex(0)
    }
  }

  // Toggle audio
  const handleToggleSound = () => {
    const newState = sound.toggleSound()
    setSoundEnabled(newState)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return
      }

      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D' || e.key === ' ') {
        e.preventDefault()
        if (isClosed) {
          sound.playPaperTurn(true)
          setIsClosed(false)
        } else {
          startTurn('next')
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault()
        if (!isClosed) {
          startTurn('prev')
        }
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault()
        sound.playPaperTurn(!isClosed)
        handleToggleBook()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [startTurn, isClosed])

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col bg-[#344260] text-white">
      {/* TOP HEADER: Clean heading on top-left, minimal controls on right */}
      <JournalHeader
        isClosed={isClosed}
        onToggleBook={handleToggleBook}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        currentPageNumber={currentIndex + 1}
        totalPages={pages.length}
      />

      {/* CENTER VIEW: EXPANDED 3D BOOK STAGE */}
      <main className="relative flex-1 w-full flex items-center justify-center overflow-visible">
        <BookStage
          pages={pages}
          currentIndex={currentIndex}
          onPageChange={handlePageSelect}
          isTurning={isTurning}
          turnDirection={turnDirection}
          targetIndex={targetIndex}
          onTurnComplete={handleTurnComplete}
          onStartTurn={startTurn}
          tiltEnabled={tiltEnabled}
          isClosed={isClosed}
          onToggleBook={handleToggleBook}
        />
      </main>

      {/* CLEAN MINIMAL FOOTER / HINT */}
      <footer className="relative z-20 pb-4 pt-1 px-6 text-center select-none pointer-events-none">
        <p className="text-[11px] text-white/40 tracking-wider font-sans">
          {isClosed ? (
            <span>Click the book or press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] text-white/70">Space</kbd> to open</span>
          ) : (
            <span>Use <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] text-white/70">←</kbd> <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] text-white/70">→</kbd> or click page edges to flip • Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] text-white/70">C</kbd> to close</span>
          )}
        </p>
      </footer>
    </div>
  )
}
