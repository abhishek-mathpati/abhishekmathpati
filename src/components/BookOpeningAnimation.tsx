import React, { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { JournalPage } from '../types/journal'
import { PageRenderer } from './PageRenderer'
import { ClosedBookCoverFace } from './ClosedBookCover'

interface BookOpeningAnimationProps {
  firstPage: JournalPage
  direction?: 'open' | 'close'
  onComplete: () => void
  duration?: number
}

export const BookOpeningAnimation: React.FC<BookOpeningAnimationProps> = ({
  firstPage,
  direction = 'open',
  onComplete,
  duration = 0.95
}) => {
  // Motion angle:
  // For 'open': 0deg (closed) -> -180deg (fully spread open)
  // For 'close': -180deg -> 0deg
  const startAngle = direction === 'open' ? 0 : -180
  const targetAngle = direction === 'open' ? -180 : 0
  const angle = useMotionValue(startAngle)

  // progress goes smoothly from 0 (closed) to 1 (fully open)
  const progress = useTransform(angle, [0, -180], [0, 1])

  // Book base (pages block) moves to the right: '25%' -> '50%'
  const baseLeft = useTransform(progress, [0, 1], ['25%', '50%'])

  // Spine hinge moves to the center: '25%' -> '50%'
  const coverLeft = useTransform(progress, [0, 1], ['25%', '50%'])

  // Shading & lighting transforms
  const frontFaceShadow = useTransform(angle, [0, -90], [0, 0.5])
  const backFaceShadow = useTransform(angle, [-90, -180], [0.45, 0])
  const baseCastShadow = useTransform(angle, [0, -90, -180], [0.65, 0.28, 0])

  // Ground shadow expands from centered closed block to full open spread
  const shadowLeft = useTransform(progress, [0, 1], ['25%', '0%'])
  const shadowWidth = useTransform(progress, [0, 1], ['50%', '100%'])
  const shadowOpacity = useTransform(progress, [0, 0.5, 1], [0.6, 0.7, 0.55])

  // Delicate center seam appears as book opens
  const spineOpacity = useTransform(progress, [0.6, 1], [0, 1])

  useEffect(() => {
    const controls = animate(angle, targetAngle, {
      duration: duration,
      ease: [0.22, 1, 0.36, 1], // Natural physical book swing deceleration
      onComplete: () => {
        onComplete()
      }
    })

    return () => controls.stop()
  }, [angle, targetAngle, duration, onComplete])

  return (
    <div
      className="absolute inset-0 select-none pointer-events-none"
      style={{ perspective: 2400, transformStyle: 'preserve-3d' }}
    >
      {/* 3D CAST GROUND SHADOW (Expands smoothly from closed book center to full spread) */}
      <motion.div
        style={{
          left: shadowLeft,
          width: shadowWidth,
          opacity: shadowOpacity,
        }}
        className="absolute -bottom-10 h-20 bg-black rounded-full blur-2xl transform scale-y-75 pointer-events-none z-0"
      />

      {/* ========================================================
          UNDERLYING BOOK BASE (Right-hand pages block)
          Moves to the right from '25%' to '50%' as the cover lifts,
          revealing the first page underneath!
      ======================================================== */}
      <motion.div
        style={{
          left: baseLeft,
          width: '50%',
          height: '100%',
          zIndex: 10
        }}
        className="absolute top-0"
      >
        <div className="relative w-full h-full rounded-r-[20px] sm:rounded-r-[24px] overflow-hidden bg-[#fbf9f5] shadow-2xl">
          {/* Right half of First Page Spread */}
          <div className="absolute top-0 left-[-100%] w-[200%] h-full">
            <PageRenderer page={firstPage} />
          </div>

          {/* 3D Gilded page edges on right side */}
          <div
            className="absolute -right-3 top-2.5 bottom-2.5 w-4 rounded-r-[4px] pointer-events-none overflow-hidden shadow-lg"
            style={{
              background: 'linear-gradient(to right, #cfc5b0 0%, #eee8dc 30%, #fbf9f4 70%, #d4caa8 100%)',
              backgroundImage: 'repeating-linear-gradient(to bottom, #d4caa8, #d4caa8 1px, #fcfbf7 1px, #fcfbf7 3px)',
              transform: 'rotateY(35deg) translateZ(-6px)',
              transformOrigin: 'left center'
            }}
          />

          {/* Top page block edge */}
          <div
            className="absolute -top-2.5 left-2 right-2 h-3.5 pointer-events-none rounded-t-[2px]"
            style={{
              background: 'linear-gradient(to bottom, #cfc5b0 0%, #ede6d7 100%)',
              backgroundImage: 'repeating-linear-gradient(to right, #d4caa8, #d4caa8 1px, #fcfbf7 1px, #fcfbf7 3px)',
              transform: 'rotateX(55deg)',
              transformOrigin: 'bottom center'
            }}
          />

          {/* Bottom page block edge */}
          <div
            className="absolute -bottom-2.5 left-2 right-2 h-3.5 pointer-events-none rounded-b-[2px]"
            style={{
              background: 'linear-gradient(to top, #cfc5b0 0%, #ede6d7 100%)',
              backgroundImage: 'repeating-linear-gradient(to right, #d4caa8, #d4caa8 1px, #fcfbf7 1px, #fcfbf7 3px)',
              transform: 'rotateX(-55deg)',
              transformOrigin: 'top center'
            }}
          />

          {/* Soft spine shadow on left edge of right page */}
          <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none z-20" />

          {/* Dynamic cast shadow from the lifting cover */}
          <motion.div
            style={{ opacity: baseCastShadow }}
            className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none z-20"
          />
        </div>
      </motion.div>

      {/* ========================================================
          TURNING FRONT COVER LEAF (Hinged at the spine)
          - Hinge moves from '25%' to '50%'
          - Rotates from 0deg to -180deg
          - Front face: Outside Hardcover (0deg to -90deg)
          - Back face: Inside Cover / Left half of Page 1 (-90deg to -180deg)
      ======================================================== */}
      <motion.div
        style={{
          left: coverLeft,
          width: '50%',
          height: '100%',
          transformOrigin: 'left center',
          rotateY: angle,
          transformStyle: 'preserve-3d',
          zIndex: 40
        }}
        className="absolute top-0"
      >
        {/* FRONT FACE: OUTSIDE HARDCOVER (Visible 0deg to -90deg) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
        >
          <ClosedBookCoverFace isInteractive={false} />

          {/* Dynamic 3D lighting shadow on lifting cover */}
          <motion.div
            style={{ opacity: frontFaceShadow }}
            className="absolute inset-0 bg-gradient-to-l from-black/65 via-black/20 to-transparent pointer-events-none rounded-[18px] sm:rounded-[22px]"
          />
        </div>

        {/* BACK FACE: INSIDE FRONT COVER / LEFT HALF OF PAGE 1 (Visible -90deg to -180deg) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderTopLeftRadius: '20px',
            borderBottomLeftRadius: '20px',
          }}
        >
          <div className="relative w-full h-full rounded-l-[20px] sm:rounded-l-[24px] overflow-hidden bg-[#fbf9f5] shadow-2xl">
            {/* Left half of First Page Spread */}
            <div className="absolute top-0 left-0 w-[200%] h-full">
              <PageRenderer page={firstPage} />
            </div>

            {/* Soft spine shadow on right edge of left page */}
            <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-20" />

            {/* Dynamic shadow as it settles onto desk */}
            <motion.div
              style={{ opacity: backFaceShadow }}
              className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none z-20"
            />
          </div>
        </div>
      </motion.div>

      {/* DELICATE CENTER SEAM (Fades in as spread opens) */}
      <motion.div
        style={{ opacity: spineOpacity }}
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 subtle-center-seam pointer-events-none z-30"
      />
      <motion.div
        style={{ opacity: spineOpacity }}
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/15 pointer-events-none z-30"
      />

      {/* Clean outer page edge highlight matching ActivePageSpread */}
      <motion.div
        style={{ opacity: spineOpacity }}
        className="absolute inset-0 rounded-[20px] sm:rounded-[24px] border border-black/8 pointer-events-none z-30 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.6),inset_0_-1px_1.5px_rgba(0,0,0,0.1)]"
      />
    </div>
  )
}
