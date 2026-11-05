import React, { useState, useEffect, useCallback } from 'react'
import { JournalPage } from './types/journal'
import { samplePages } from './data/samplePages'
import { JournalHeader } from './components/JournalHeader'
import { BookStage } from './components/BookStage'
import { AntiDevTools } from './components/security/AntiDevTools'
import { sound } from './utils/sound'

export default function App() {
  // State
  const [pages] = useState<JournalPage[]>(samplePages)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isClosed, setIsClosed] = useState<boolean>(true)

  // Ensure URL remains completely clean without query parameters
  useEffect(() => {
    try {
      if (window.location.search) {
        const cleanUrl = window.location.pathname + window.location.hash
        window.history.replaceState({}, '', cleanUrl || '/')
      }
    } catch {}
  }, [])

  // 3D Animation states
  const [isTurning, setIsTurning] = useState(false)
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev' | null>(null)
  const [targetIndex, setTargetIndex] = useState<number | null>(null)
  const [coverAnimation, setCoverAnimation] = useState<'open' | 'close' | null>(null)

  // Settings: Active by default without configuration clutter
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [tiltEnabled] = useState(true)

  // Turn orchestration
  const startTurn = useCallback(
    (direction: 'next' | 'prev') => {
      if (isTurning || isClosed || coverAnimation) return

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
          // If already on page 1 and turn prev is pressed, smoothly close the book!
          handleCloseBook()
        }
      }
    },
    [currentIndex, pages.length, isTurning, isClosed, coverAnimation]
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
      if (index === currentIndex || isTurning || isClosed || coverAnimation) return

      if (index === currentIndex + 1) {
        startTurn('next')
      } else if (index === currentIndex - 1) {
        startTurn('prev')
      } else {
        sound.playPaperTurn(index > currentIndex)
        setCurrentIndex(index)
      }
    },
    [currentIndex, isTurning, isClosed, coverAnimation, startTurn]
  )

  // Open book animation
  const handleOpenBook = useCallback(() => {
    if (coverAnimation || !isClosed || isTurning) return
    sound.playPaperTurn(true)
    setCoverAnimation('open')
  }, [coverAnimation, isClosed, isTurning])

  const handleOpenComplete = useCallback(() => {
    setCoverAnimation(null)
    setIsClosed(false)
    setCurrentIndex(0)
  }, [])

  // Close book animation
  const handleCloseBook = useCallback(() => {
    if (coverAnimation || isClosed || isTurning) return
    sound.playPaperTurn(false)
    setCurrentIndex(0)
    setCoverAnimation('close')
  }, [coverAnimation, isClosed, isTurning])

  const handleCloseComplete = useCallback(() => {
    setCoverAnimation(null)
    setIsClosed(true)
  }, [])

  const handleCoverAnimationComplete = useCallback(() => {
    if (coverAnimation === 'open') {
      handleOpenComplete()
    } else if (coverAnimation === 'close') {
      handleCloseComplete()
    }
  }, [coverAnimation, handleOpenComplete, handleCloseComplete])

  // Toggle book open/closed
  const handleToggleBook = useCallback((closed?: boolean) => {
    const nextState = closed !== undefined ? closed : !isClosed
    if (nextState) {
      handleCloseBook()
    } else {
      handleOpenBook()
    }
  }, [isClosed, handleCloseBook, handleOpenBook])

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
          handleOpenBook()
        } else {
          startTurn('next')
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault()
        if (!isClosed) {
          if (currentIndex === 0) {
            handleCloseBook()
          } else {
            startTurn('prev')
          }
        }
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault()
        handleToggleBook()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [startTurn, isClosed, currentIndex, handleOpenBook, handleCloseBook, handleToggleBook])

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col bg-[#344260] text-white">
      {/* SECURITY PROTOCOL: Anti-DevTools diagnostic shield */}
      <AntiDevTools />

      {/* TOP HEADER: Clean heading on top-left, minimal controls on right */}
      <JournalHeader
        isClosed={isClosed && coverAnimation !== 'open'}
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
          coverAnimation={coverAnimation}
          onOpenBook={handleOpenBook}
          onCoverAnimationComplete={handleCoverAnimationComplete}
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
