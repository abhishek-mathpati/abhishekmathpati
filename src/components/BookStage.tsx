import React, { useState, useRef } from 'react'
import { JournalPage } from '../types/journal'
import { BookPageLayer } from './BookPageLayer'
import { ActivePageSpread } from './ActivePageSpread'
import { PageTurnAnimation } from './PageTurnAnimation'
import { ClosedBookCover } from './ClosedBookCover'
import { ChevronLeft, ChevronRight, Book } from 'lucide-react'
import { sound } from '../utils/sound'

interface BookStageProps {
  pages: JournalPage[]
  currentIndex: number
  onPageChange: (newIndex: number) => void
  isTurning: boolean
  turnDirection: 'next' | 'prev' | null
  targetIndex: number | null
  onTurnComplete: () => void
  onStartTurn: (direction: 'next' | 'prev') => void
  tiltEnabled?: boolean
  isClosed: boolean
  onToggleBook: (closed?: boolean) => void
}

export const BookStage: React.FC<BookStageProps> = ({
  pages,
  currentIndex,
  onPageChange,
  isTurning,
  turnDirection,
  targetIndex,
  onTurnComplete,
  onStartTurn,
  tiltEnabled = true,
  isClosed,
  onToggleBook
}) => {
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 })
  const stageRef = useRef<HTMLDivElement>(null)
  const dragStartX = useRef<number | null>(null)

  // Subtle 3D mouse parallax tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEnabled) return
    if (!stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMouseTilt({
      x: -y * 3.5,
      y: x * 5
    })
  }

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 })
  }

  // Touch and drag swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isClosed) return
    dragStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isClosed || dragStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = dragStartX.current - touchEndX
    dragStartX.current = null

    if (Math.abs(diff) > 40) {
      if (diff > 0 && currentIndex < pages.length - 1) {
        onStartTurn('next')
      } else if (diff < 0) {
        if (currentIndex > 0) {
          onStartTurn('prev')
        } else {
          // If on page 1 and swiped right, close book
          onToggleBook(true)
        }
      }
    }
  }

  const currentPage = pages[currentIndex] || pages[0]
  const targetPage = targetIndex !== null ? pages[targetIndex] : null

  // Collect left-side background pages (pages before current)
  const leftPages: { page: JournalPage; delta: number }[] = []
  for (let i = currentIndex - 1; i >= Math.max(0, currentIndex - 6); i--) {
    leftPages.push({ page: pages[i], delta: currentIndex - i })
  }
  leftPages.reverse()

  // Collect right-side background pages (pages after current)
  const rightPages: { page: JournalPage; delta: number }[] = []
  for (let j = Math.min(pages.length - 1, currentIndex + 6); j > currentIndex; j--) {
    rightPages.push({ page: pages[j], delta: j - currentIndex })
  }

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative flex-1 w-full flex items-center justify-center px-4 sm:px-8 py-4 overflow-visible select-none perspective-stage"
    >
      {/* ========================================================
          UNIFIED 3D STAGE CONTAINER: OPEN & CLOSED BOOKS SHARE
          THE EXACT SAME EXPANDED BOUNDING DIMENSIONS (1150px x 720px)
      ======================================================== */}
      <div
        style={{
          transform: `rotateX(${mouseTilt.x}deg) rotateY(${mouseTilt.y}deg)`,
          transition: 'transform 0.25s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[95vw] sm:w-[92vw] max-w-[1150px] aspect-[1.56/1] max-h-[720px] flex items-center justify-center"
      >
        {isClosed ? (
          /* ========================================================
              STATE 1: BOOK CLOSED (Rich Hardcover Matching Open Size)
          ======================================================== */
          <ClosedBookCover
            onOpen={() => {
              sound.playPaperTurn(true)
              onToggleBook(false)
            }}
            tilt={mouseTilt}
            tiltEnabled={tiltEnabled}
          />
        ) : (
          /* ========================================================
              STATE 2: BOOK OPEN (Layered Fanned 3D Album Stack)
          ======================================================== */
          <>
            {/* STEPPED CAST SHADOW LAYER ON BACKGROUND (Floor Depth matching reference) */}
            <div className="absolute -bottom-10 inset-x-8 h-20 pointer-events-none z-0">
              {/* Main book center shadow */}
              <div className="absolute inset-x-12 bottom-0 h-16 bg-black/50 rounded-full blur-2xl transform scale-y-75" />
              <div className="absolute inset-x-4 bottom-2 h-12 bg-black/35 rounded-full blur-xl" />

              {/* Stepped left fan shadow */}
              {leftPages.length > 0 && (
                <div
                  style={{
                    width: `${leftPages.length * 24 + 120}px`,
                    left: `-${leftPages.length * 22}px`,
                  }}
                  className="absolute -bottom-3 h-12 bg-black/25 rounded-full blur-xl transform -rotate-2"
                />
              )}

              {/* Stepped right fan shadow */}
              {rightPages.length > 0 && (
                <div
                  style={{
                    width: `${rightPages.length * 24 + 120}px`,
                    right: `-${rightPages.length * 22}px`,
                  }}
                  className="absolute -bottom-3 h-12 bg-black/25 rounded-full blur-xl transform rotate-2"
                />
              )}
            </div>

            {/* ========================================================
                LAYER 1: FANNED BACKGROUND PAGES STACK (Strictly Behind Spread)
            ======================================================== */}
            <div
              style={{
                transform: 'translateZ(-20px)',
                zIndex: 10,
              }}
              className="absolute inset-0 pointer-events-none"
            >
              {/* LEFT FANNED BACKGROUND PAGES */}
              {leftPages.map(({ page, delta }) => (
                <BookPageLayer
                  key={page.id}
                  page={page}
                  delta={-delta}
                  isLeft={true}
                  onClick={() => {
                    if (isTurning) return
                    sound.playPaperTurn(false)
                    onPageChange(page.pageNumber - 1)
                  }}
                />
              ))}

              {/* RIGHT FANNED BACKGROUND PAGES */}
              {rightPages.map(({ page, delta }) => (
                <BookPageLayer
                  key={page.id}
                  page={page}
                  delta={delta}
                  isLeft={false}
                  onClick={() => {
                    if (isTurning) return
                    sound.playPaperTurn(true)
                    onPageChange(page.pageNumber - 1)
                  }}
                />
              ))}
            </div>

            {/* ========================================================
                LAYER 2: ACTIVE CENTER SPREAD (Elevated in Foreground)
            ======================================================== */}
            <div
              style={{
                transform: 'translateZ(25px)',
                zIndex: 40,
                transformStyle: 'preserve-3d',
              }}
              className="absolute inset-0 rounded-[20px] sm:rounded-[24px]"
            >
              {isTurning && targetPage && turnDirection ? (
                <PageTurnAnimation
                  currentPage={currentPage}
                  targetPage={targetPage}
                  direction={turnDirection}
                  onComplete={onTurnComplete}
                />
              ) : (
                <ActivePageSpread
                  page={currentPage}
                  onClickLeft={() => {
                    if (currentIndex > 0 && !isTurning) {
                      onStartTurn('prev')
                    } else if (currentIndex === 0 && !isTurning) {
                      // Flipping backward from page 1 closes the book!
                      sound.playPaperTurn(false)
                      onToggleBook(true)
                    }
                  }}
                  onClickRight={() => {
                    if (currentIndex < pages.length - 1 && !isTurning) {
                      onStartTurn('next')
                    }
                  }}
                />
              )}
            </div>

            {/* ELEGANT MINIMAL FLOATING CHEVRON BUTTONS */}
            {!isTurning && (
              <>
                {/* Left Arrow (Prev Page or Close Book if on Page 1) */}
                <button
                  onClick={() => {
                    if (currentIndex > 0) {
                      onStartTurn('prev')
                    } else {
                      sound.playPaperTurn(false)
                      onToggleBook(true)
                    }
                  }}
                  aria-label={currentIndex === 0 ? "Close Book" : "Previous Page"}
                  title={currentIndex === 0 ? "Close Book" : "Previous Page (Left Arrow)"}
                  className="absolute -left-6 sm:-left-9 z-50 w-11 h-11 rounded-full bg-black/30 hover:bg-black/55 text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/20 backdrop-blur-xs hover:scale-105 active:scale-95 shadow-lg"
                >
                  {currentIndex === 0 ? (
                    <Book className="w-4 h-4 stroke-[2.2]" />
                  ) : (
                    <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
                  )}
                </button>

                {/* Right Arrow (Next Page) */}
                {currentIndex < pages.length - 1 && (
                  <button
                    onClick={() => onStartTurn('next')}
                    aria-label="Next Page"
                    title="Next Page (Right Arrow)"
                    className="absolute -right-6 sm:-right-9 z-50 w-11 h-11 rounded-full bg-black/30 hover:bg-black/55 text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/20 backdrop-blur-xs hover:scale-105 active:scale-95 shadow-lg"
                  >
                    <ChevronRight className="w-6 h-6 stroke-[2.2]" />
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
