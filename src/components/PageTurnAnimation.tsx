import React, { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { JournalPage } from '../types/journal'
import { PageRenderer } from './PageRenderer'

interface PageTurnAnimationProps {
  currentPage: JournalPage
  targetPage: JournalPage
  direction: 'next' | 'prev'
  onComplete: () => void
  duration?: number
}

export const PageTurnAnimation: React.FC<PageTurnAnimationProps> = ({
  currentPage,
  targetPage,
  direction,
  onComplete,
  duration = 0.82
}) => {
  // Motion value for angle in degrees: always starts at 0deg
  const angle = useMotionValue(0)

  // Dynamic shadow on turning leaf as it rotates through the perpendicular light angle
  const leafShadowOpacity = useTransform(
    angle,
    direction === 'next' ? [0, -90, -180] : [0, 90, 180],
    [0, 0.48, 0]
  )

  // Dynamic shadow on the underlying base page being revealed
  const baseShadowOpacity = useTransform(
    angle,
    direction === 'next' ? [0, -100, -180] : [0, 100, 180],
    [0.45, 0.12, 0]
  )

  useEffect(() => {
    // 'next' flips right leaf to left: 0 -> -180
    // 'prev' flips left leaf to right: 0 -> +180
    const targetAngle = direction === 'next' ? -180 : 180

    const controls = animate(angle, targetAngle, {
      duration: duration,
      ease: [0.22, 1, 0.36, 1], // Natural physical deceleration curve
      onComplete: () => {
        onComplete()
      }
    })

    return () => controls.stop()
  }, [direction, duration, onComplete, angle])

  // ==========================================
  // CASE 1: NEXT PAGE (Flip Right Leaf to Left)
  // ==========================================
  if (direction === 'next') {
    return (
      <div
        className="absolute inset-0 rounded-[22px] sm:rounded-[24px] overflow-hidden select-none pointer-events-none"
        style={{ perspective: 2400, transformStyle: 'preserve-3d' }}
      >
        {/* UNDERLYING STATIC BASE SPREAD */}
        <div className="absolute inset-0 flex bg-[#fbf9f5]">
          {/* Static Left Half: Shows Current Page's Left Half */}
          <div className="relative w-1/2 h-full overflow-hidden">
            <div className="absolute top-0 left-0 w-[200%] h-full">
              <PageRenderer page={currentPage} />
            </div>
          </div>

          {/* Static Right Half: Shows TARGET Page's Right Half (revealed beneath turning leaf) */}
          <div className="relative w-1/2 h-full overflow-hidden">
            <div className="absolute top-0 left-[-100%] w-[200%] h-full">
              <PageRenderer page={targetPage} />
            </div>
            {/* Shadow cast by lifting page */}
            <motion.div
              style={{ opacity: baseShadowOpacity }}
              className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none"
            />
          </div>
        </div>

        {/* Delicate Center Spine Seam */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 subtle-center-seam pointer-events-none z-20" />
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/15 pointer-events-none z-20" />

        {/* TURNING LEAF (Right half folding over to left, hinged at left: 50%) */}
        <motion.div
          className="absolute top-0 left-1/2 w-1/2 h-full"
          style={{
            transformOrigin: 'left center',
            rotateY: angle,
            transformStyle: 'preserve-3d',
            zIndex: 40
          }}
        >
          {/* FRONT FACE OF LEAF (Right half of Current Page) - visible from 0 to -90 deg */}
          <div
            className="absolute inset-0 overflow-hidden backface-hidden"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
              borderTopRightRadius: '22px',
              borderBottomRightRadius: '22px',
            }}
          >
            <div className="absolute top-0 left-[-100%] w-[200%] h-full">
              <PageRenderer page={currentPage} />
            </div>

            {/* Dynamic shading on lifting page */}
            <motion.div
              style={{ opacity: leafShadowOpacity }}
              className="absolute inset-0 bg-gradient-to-l from-black/65 via-black/20 to-transparent pointer-events-none"
            />
          </div>

          {/* BACK FACE OF LEAF (Left half of Target Page) - visible from -90 to -180 deg */}
          <div
            className="absolute inset-0 overflow-hidden backface-hidden"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderTopLeftRadius: '22px',
              borderBottomLeftRadius: '22px',
            }}
          >
            <div className="absolute top-0 left-0 w-[200%] h-full">
              <PageRenderer page={targetPage} />
            </div>

            {/* Dynamic shading as it settles onto left */}
            <motion.div
              style={{ opacity: leafShadowOpacity }}
              className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent pointer-events-none"
            />
          </div>
        </motion.div>
      </div>
    )
  }

  // ==========================================
  // CASE 2: PREV PAGE (Flip Left Leaf to Right)
  // ==========================================
  return (
    <div
      className="absolute inset-0 rounded-[22px] sm:rounded-[24px] overflow-hidden select-none pointer-events-none"
      style={{ perspective: 2400, transformStyle: 'preserve-3d' }}
    >
      {/* UNDERLYING STATIC BASE SPREAD */}
      <div className="absolute inset-0 flex bg-[#fbf9f5]">
        {/* Static Left Half: Shows TARGET Page's Left Half (revealed beneath lifting left leaf) */}
        <div className="relative w-1/2 h-full overflow-hidden">
          <div className="absolute top-0 left-0 w-[200%] h-full">
            <PageRenderer page={targetPage} />
          </div>
          {/* Shadow cast as leaf lifts away from left */}
          <motion.div
            style={{ opacity: baseShadowOpacity }}
            className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent pointer-events-none"
          />
        </div>

        {/* Static Right Half: Shows Current Page's Right Half (until turning leaf lands at +180 deg) */}
        <div className="relative w-1/2 h-full overflow-hidden">
          <div className="absolute top-0 left-[-100%] w-[200%] h-full">
            <PageRenderer page={currentPage} />
          </div>
        </div>
      </div>

      {/* Delicate Center Spine Seam */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 subtle-center-seam pointer-events-none z-20" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/15 pointer-events-none z-20" />

      {/* TURNING LEAF (Left half folding back over to right, hinged at right: 50% / right center) */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{
          transformOrigin: 'right center',
          rotateY: angle, // Rotates from 0deg to +180deg (left to right)
          transformStyle: 'preserve-3d',
          zIndex: 40
        }}
      >
        {/* FRONT FACE OF LEAF (Left half of Current Page) - visible from 0 to +90 deg */}
        <div
          className="absolute inset-0 overflow-hidden backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
            borderTopLeftRadius: '22px',
            borderBottomLeftRadius: '22px',
          }}
        >
          <div className="absolute top-0 left-0 w-[200%] h-full">
            <PageRenderer page={currentPage} />
          </div>

          {/* Dynamic shading on lifting left leaf */}
          <motion.div
            style={{ opacity: leafShadowOpacity }}
            className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent pointer-events-none"
          />
        </div>

        {/* BACK FACE OF LEAF (Right half of Target Page) - visible from +90 to +180 deg, lands on right */}
        <div
          className="absolute inset-0 overflow-hidden backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderTopRightRadius: '22px',
            borderBottomRightRadius: '22px',
          }}
        >
          <div className="absolute top-0 left-[-100%] w-[200%] h-full">
            <PageRenderer page={targetPage} />
          </div>

          {/* Dynamic shading as it settles onto right */}
          <motion.div
            style={{ opacity: leafShadowOpacity }}
            className="absolute inset-0 bg-gradient-to-l from-black/65 via-black/20 to-transparent pointer-events-none"
          />
        </div>
      </motion.div>
    </div>
  )
}
