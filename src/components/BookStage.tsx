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
  const stageRef = useRef<HTMLDivElement>(null)
  const dragStartX = useRef<number | null>(null)

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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative flex-1 w-full flex items-center justify-center px-4 sm:px-8 py-2 sm:py-3 overflow-visible select-none"
    >
      {/* ========================================================
          UNIFIED STAGE CONTAINER: OPEN & CLOSED BOOKS SHARE
          THE EXACT SAME EXPANDED BOUNDING DIMENSIONS
      ======================================================== */}
      <div
        style={{
          transform: 'none',
        }}
        className="relative w-[96vw] sm:w-[94vw] max-w-[1360px] aspect-[16/9] max-h-[calc(100vh-130px)] 2xl:max-h-[820px] flex items-center justify-center"
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
                zIndex: 40,
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
                />
              )}
            </div>

            {/* ========================================================
                UNIFIED FLANK & 5% EDGE TURN ZONES (Open Book)
            ======================================================== */}
            {!isTurning && (
              <>
                {/* LEFT FLANK & 5% MARGIN TURN ZONE (Prev Page or Close) */}
                <div
                  onClick={() => {
                    if (currentIndex > 0) {
                      onStartTurn('prev')
                    } else {
                      sound.playPaperTurn(false)
                      onToggleBook(true)
                    }
                  }}
                  title={currentIndex === 0 ? "Close Book" : "Previous Page (Click Edge or Side Area)"}
                  style={{
                    right: '95%',
                    left: 'max(-100vw, -1200px)',
                  }}
                  className="absolute inset-y-0 z-45 cursor-pointer peer/left-flank flex items-center justify-end"
                >
                  {/* Subtle edge highlight on paper edge */}
                  <div className="absolute inset-y-0 right-0 w-8 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent to-black/10 rounded-l-[20px]" />
                </div>

                {/* Left Floating Chevron Button in Outside Blank Space with Unified Hover State */}
                <div
                  onClick={() => {
                    if (currentIndex > 0) {
                      onStartTurn('prev')
                    } else {
                      sound.playPaperTurn(false)
                      onToggleBook(true)
                    }
                  }}
                  title={currentIndex === 0 ? "Close Book" : "Previous Page"}
                  className="absolute -left-16 sm:-left-24 md:-left-28 lg:-left-32 xl:-left-36 z-50 flex items-center gap-2.5 cursor-pointer group/left-btn pointer-events-none"
                >
                  <button
                    type="button"
                    aria-label={currentIndex === 0 ? "Close Book" : "Previous Page"}
                    className="w-12 h-12 rounded-full bg-black/40 group-hover/left-btn:bg-black/80 peer-hover/left-flank:bg-black/80 text-white/80 group-hover/left-btn:text-white peer-hover/left-flank:text-white flex items-center justify-center transition-all duration-200 border border-white/20 group-hover/left-btn:scale-110 peer-hover/left-flank:scale-110 active:scale-95 shadow-xl pointer-events-none"
                  >
                    {currentIndex === 0 ? (
                      <Book className="w-5 h-5 stroke-[2.2]" />
                    ) : (
                      <ChevronLeft className="w-7 h-7 stroke-[2.2]" />
                    )}
                  </button>
                  <span className="opacity-0 group-hover/left-btn:opacity-100 peer-hover/left-flank:opacity-100 transition-opacity duration-200 text-white drop-shadow-md text-[11px] font-sans font-semibold tracking-wider uppercase bg-black/75 px-3 py-1.5 rounded-full border border-white/15 whitespace-nowrap pointer-events-none hidden lg:inline-block">
                    {currentIndex === 0 ? '‹ Close' : '‹ Prev'}
                  </span>
                </div>

                {/* RIGHT FLANK & 5% MARGIN TURN ZONE (Next Page) */}
                {currentIndex < pages.length - 1 && (
                  <>
                    <div
                      onClick={() => onStartTurn('next')}
                      title="Next Page (Click Edge or Side Area)"
                      style={{
                        left: '95%',
                        right: 'max(-100vw, -1200px)',
                      }}
                      className="absolute inset-y-0 z-45 cursor-pointer peer/right-flank flex items-center justify-start"
                    >
                      {/* Subtle edge highlight on paper edge */}
                      <div className="absolute inset-y-0 left-0 w-8 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-l from-transparent to-black/10 rounded-r-[20px]" />
                    </div>

                    {/* Right Floating Chevron Button in Outside Blank Space with Unified Hover State */}
                    <div
                      onClick={() => onStartTurn('next')}
                      title="Next Page"
                      className="absolute -right-16 sm:-right-24 md:-right-28 lg:-right-32 xl:-right-36 z-50 flex items-center gap-2.5 cursor-pointer group/right-btn flex-row-reverse pointer-events-none"
                    >
                      <button
                        type="button"
                        aria-label="Next Page"
                        className="w-12 h-12 rounded-full bg-black/40 group-hover/right-btn:bg-black/80 peer-hover/right-flank:bg-black/80 text-white/80 group-hover/right-btn:text-white peer-hover/right-flank:text-white flex items-center justify-center transition-all duration-200 border border-white/20 group-hover/right-btn:scale-110 peer-hover/right-flank:scale-110 active:scale-95 shadow-xl pointer-events-none"
                      >
                        <ChevronRight className="w-7 h-7 stroke-[2.2]" />
                      </button>
                      <span className="opacity-0 group-hover/right-btn:opacity-100 peer-hover/right-flank:opacity-100 transition-opacity duration-200 text-white drop-shadow-md text-[11px] font-sans font-semibold tracking-wider uppercase bg-black/75 px-3 py-1.5 rounded-full border border-white/15 whitespace-nowrap pointer-events-none hidden lg:inline-block">
                        Next ›
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
