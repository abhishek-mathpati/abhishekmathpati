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
  const [isHoveringLeft, setIsHoveringLeft] = useState(false)
  const [isHoveringRight, setIsHoveringRight] = useState(false)

  // Reset hover states when turning or index changes
  React.useEffect(() => {
    setIsHoveringLeft(false)
    setIsHoveringRight(false)
  }, [currentIndex, isTurning])

  const handlePrev = () => {
    if (currentIndex > 0) {
      onStartTurn('prev')
    } else {
      sound.playPaperTurn(false)
      onToggleBook(true)
    }
  }

  const handleNext = () => {
    if (currentIndex < pages.length - 1) {
      onStartTurn('next')
    }
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
                  onClick={handlePrev}
                  onMouseEnter={() => setIsHoveringLeft(true)}
                  onMouseLeave={() => setIsHoveringLeft(false)}
                  title={currentIndex === 0 ? "Close Book" : "Previous Page"}
                  style={{
                    right: '95%',
                    left: 'max(-100vw, -1200px)',
                  }}
                  className="absolute inset-y-0 z-45 cursor-pointer"
                />

                {/* Left Floating Chevron Button in Outside Blank Space */}
                <div
                  onClick={handlePrev}
                  onMouseEnter={() => setIsHoveringLeft(true)}
                  onMouseLeave={() => setIsHoveringLeft(false)}
                  title={currentIndex === 0 ? "Close Book" : "Previous Page"}
                  className={`absolute -left-16 sm:-left-24 md:-left-28 lg:-left-32 xl:-left-36 z-50 flex items-center gap-3 cursor-pointer select-none transition-transform duration-300 ease-out ${
                    isHoveringLeft ? '-translate-x-2' : 'translate-x-0'
                  }`}
                >
                  {/* Button Wrapper with Ambient Light Halo */}
                  <div className="relative flex items-center justify-center">
                    {/* Ambient Glow Aura */}
                    <div
                      className={`absolute -inset-2.5 rounded-full blur-md transition-all duration-300 pointer-events-none ${
                        isHoveringLeft
                          ? 'opacity-100 bg-white/15 scale-110'
                          : 'opacity-0 scale-90'
                      }`}
                    />

                    {/* Frosted Acrylic Button */}
                    <button
                      type="button"
                      aria-label={currentIndex === 0 ? "Close Book" : "Previous Page"}
                      className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border shadow-xl ${
                        isHoveringLeft
                          ? 'backdrop-blur-xl bg-stone-900/85 border-white/45 text-white shadow-[0_0_25px_rgba(255,255,255,0.18),0_10px_30px_rgba(0,0,0,0.5)] scale-110'
                          : 'backdrop-blur-md bg-stone-900/50 border-white/20 text-stone-300 shadow-[0_4px_18px_rgba(0,0,0,0.35)] scale-100'
                      } active:scale-95`}
                    >
                      {currentIndex === 0 ? (
                        <Book className={`w-5 h-5 stroke-[2.2] transition-transform duration-300 ${isHoveringLeft ? 'scale-110' : 'scale-100'}`} />
                      ) : (
                        <ChevronLeft className={`w-7 h-7 stroke-[2.2] transition-transform duration-300 ${isHoveringLeft ? '-translate-x-0.5 scale-110' : 'translate-x-0 scale-100'}`} />
                      )}
                    </button>
                  </div>

                  {/* Refined Pill Badge */}
                  <div
                    className={`transition-all duration-300 ease-out backdrop-blur-md px-3.5 py-1.5 rounded-full border whitespace-nowrap hidden lg:flex items-center gap-1.5 shadow-xl pointer-events-none select-none ${
                      isHoveringLeft
                        ? 'opacity-100 translate-x-0 scale-100 bg-stone-900/85 border-white/30 text-white shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_15px_rgba(255,255,255,0.1)]'
                        : 'opacity-0 translate-x-3 scale-95 bg-stone-900/40 border-white/10 text-stone-400'
                    }`}
                  >
                    <span className="text-[11px] font-sans font-medium tracking-wider uppercase">
                      {currentIndex === 0 ? '‹ Close Book' : '‹ Prev Page'}
                    </span>
                  </div>
                </div>

                {/* RIGHT FLANK & 5% MARGIN TURN ZONE (Next Page) */}
                {currentIndex < pages.length - 1 && (
                  <>
                    <div
                      onClick={handleNext}
                      onMouseEnter={() => setIsHoveringRight(true)}
                      onMouseLeave={() => setIsHoveringRight(false)}
                      title="Next Page"
                      style={{
                        left: '95%',
                        right: 'max(-100vw, -1200px)',
                      }}
                      className="absolute inset-y-0 z-45 cursor-pointer"
                    />

                    {/* Right Floating Chevron Button in Outside Blank Space */}
                    <div
                      onClick={handleNext}
                      onMouseEnter={() => setIsHoveringRight(true)}
                      onMouseLeave={() => setIsHoveringRight(false)}
                      title="Next Page"
                      className={`absolute -right-16 sm:-right-24 md:-right-28 lg:-right-32 xl:-right-36 z-50 flex items-center gap-3 flex-row-reverse cursor-pointer select-none transition-transform duration-300 ease-out ${
                        isHoveringRight ? 'translate-x-2' : 'translate-x-0'
                      }`}
                    >
                      {/* Button Wrapper with Ambient Light Halo */}
                      <div className="relative flex items-center justify-center">
                        {/* Ambient Glow Aura */}
                        <div
                          className={`absolute -inset-2.5 rounded-full blur-md transition-all duration-300 pointer-events-none ${
                            isHoveringRight
                              ? 'opacity-100 bg-white/15 scale-110'
                              : 'opacity-0 scale-90'
                          }`}
                        />

                        {/* Frosted Acrylic Button */}
                        <button
                          type="button"
                          aria-label="Next Page"
                          className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border shadow-xl ${
                            isHoveringRight
                              ? 'backdrop-blur-xl bg-stone-900/85 border-white/45 text-white shadow-[0_0_25px_rgba(255,255,255,0.18),0_10px_30px_rgba(0,0,0,0.5)] scale-110'
                              : 'backdrop-blur-md bg-stone-900/50 border-white/20 text-stone-300 shadow-[0_4px_18px_rgba(0,0,0,0.35)] scale-100'
                          } active:scale-95`}
                        >
                          <ChevronRight className={`w-7 h-7 stroke-[2.2] transition-transform duration-300 ${isHoveringRight ? 'translate-x-0.5 scale-110' : 'translate-x-0 scale-100'}`} />
                        </button>
                      </div>

                      {/* Refined Pill Badge */}
                      <div
                        className={`transition-all duration-300 ease-out backdrop-blur-md px-3.5 py-1.5 rounded-full border whitespace-nowrap hidden lg:flex items-center gap-1.5 shadow-xl pointer-events-none select-none ${
                          isHoveringRight
                            ? 'opacity-100 translate-x-0 scale-100 bg-stone-900/85 border-white/30 text-white shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_15px_rgba(255,255,255,0.1)]'
                            : 'opacity-0 -translate-x-3 scale-95 bg-stone-900/40 border-white/10 text-stone-400'
                        }`}
                      >
                        <span className="text-[11px] font-sans font-medium tracking-wider uppercase">
                          Next Page ›
                        </span>
                      </div>
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
