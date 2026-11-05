import React from 'react'
import { JournalPage, PhotoItem, StickerItem, NoteItem } from '../types/journal'
import { MapPin, Calendar, Heart, Compass, Sparkles } from 'lucide-react'
import { SpreadEducationCanvas } from './portfolio/SpreadEducationCanvas'
import { SpreadProfileEducation } from './portfolio/SpreadProfileEducation'
import { SpreadExperienceResearch } from './portfolio/SpreadExperienceResearch'
import { SpreadPublications } from './portfolio/SpreadPublications'
import { SpreadProjects } from './portfolio/SpreadProjects'
import { SpreadSkills } from './portfolio/SpreadSkills'
import { SpreadCertifications } from './portfolio/SpreadCertifications'
import { SpreadAwardsVolunteering } from './portfolio/SpreadAwardsVolunteering'
import { SpreadContact } from './portfolio/SpreadContact'

interface PageRendererProps {
  page: JournalPage
  isLeftHalf?: boolean
  isRightHalf?: boolean
  isSingleFull?: boolean
  className?: string
}

export const PageRenderer: React.FC<PageRendererProps> = ({
  page,
  isLeftHalf = false,
  isRightHalf = false,
  isSingleFull = true,
  className = ''
}) => {
  // ROUTE DEDICATED PORTFOLIO SPREADS
  if (page.id === 'page-1' || page.customLayout === 'education' || page.customLayout === 'profile-education') {
    return <SpreadEducationCanvas className={className} />
  }
  if (page.id === 'page-2' || page.customLayout === 'experience-research' || page.customLayout === 'experience') {
    return <SpreadExperienceResearch className={className} />
  }
  if (page.id === 'page-3' || page.customLayout === 'publications') {
    return <SpreadPublications className={className} />
  }
  if (page.id === 'page-4' || page.customLayout === 'projects') {
    return <SpreadProjects className={className} />
  }
  if (page.id === 'page-5' || page.customLayout === 'skills' || page.customLayout === 'skills-honors') {
    return <SpreadSkills className={className} />
  }
  if (page.id === 'page-6' || page.customLayout === 'certifications') {
    return <SpreadCertifications className={className} />
  }
  if (page.id === 'page-7' || page.customLayout === 'awards-volunteering' || page.customLayout === 'awards' || page.customLayout === 'volunteering') {
    return <SpreadAwardsVolunteering className={className} />
  }
  if (page.id === 'page-8' || page.customLayout === 'contact' || page.customLayout === 'languages-contact') {
    return <SpreadContact className={className} />
  }

  // Paper texture class fallback
  const getTextureClass = () => {
    switch (page.paperTexture) {
      case 'kraft':
        return 'bg-[#e8decb] text-[#2c2419]'
      case 'paperWarm':
        return 'bg-[#f4eee5] text-[#292524]'
      case 'vintage':
        return 'bg-[#f5edd6] text-[#332211]'
      case 'grid':
        return 'bg-[#faf8f5] text-[#1e293b]'
      case 'cream':
      default:
        return 'bg-[#fbf9f5] text-[#1e293b]'
    }
  }

  // Render photo items
  const renderPhoto = (photo: PhotoItem) => {
    const pos = photo.position || {}
    const styleObj: React.CSSProperties = {
      position: 'absolute',
      top: pos.top,
      left: pos.left,
      right: pos.right,
      bottom: pos.bottom,
      width: pos.width,
      height: pos.height,
      transform: pos.rotate ? `rotate(${pos.rotate})` : undefined,
      zIndex: pos.zIndex || 2
    }

    if (photo.style === 'frameless') {
      return (
        <div key={photo.id} style={styleObj} className="overflow-hidden rounded-md shadow-md group">
          <img
            src={photo.url}
            alt={photo.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {photo.caption && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-[10px] text-white/90 font-sans">
              {photo.caption}
            </div>
          )}
        </div>
      )
    }

    if (photo.style === 'postcard') {
      return (
        <div
          key={photo.id}
          style={styleObj}
          className="bg-[#fcfaf5] p-2 border border-[#d6cbba] shadow-lg rounded-sm"
        >
          <div className="overflow-hidden aspect-[4/3] bg-neutral-200">
            <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="mt-1 flex items-center justify-between text-[9px] text-[#786b59] px-0.5">
            <span>POSTCARD</span>
            <span>AIR MAIL</span>
          </div>
        </div>
      )
    }

    // Default Polaroid
    return (
      <div
        key={photo.id}
        style={styleObj}
        className="polaroid-frame rounded-sm"
      >
        <div className="overflow-hidden aspect-[4/3] bg-neutral-200">
          <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover" loading="lazy" />
        </div>
        {photo.caption && (
          <p className="mt-2 text-center font-handwriting text-xs text-neutral-700 leading-tight">
            {photo.caption}
          </p>
        )}
      </div>
    )
  }

  // Render sticker items
  const renderSticker = (sticker: StickerItem) => {
    const pos = sticker.position
    const styleObj: React.CSSProperties = {
      position: 'absolute',
      top: pos.top,
      left: pos.left,
      right: pos.right,
      bottom: pos.bottom,
      transform: pos.rotate ? `rotate(${pos.rotate})` : undefined,
      zIndex: pos.zIndex || 10
    }

    if (sticker.type === 'tape') {
      let tapeColor = 'washi-tape-pattern'
      if (sticker.color === 'pink') tapeColor = 'washi-tape-pink'
      if (sticker.color === 'gold') tapeColor = 'washi-tape-gold'

      return (
        <div
          key={sticker.id}
          style={styleObj}
          className={`washi-tape ${tapeColor} ${sticker.size || 'w-24'} rounded-xs`}
        />
      )
    }

    if (sticker.type === 'stamp') {
      // Hand-drawn smiley face circle stamp (Reference Image 2)
      if (sticker.label === ':)' || sticker.label === 'smiley') {
        return (
          <div
            key={sticker.id}
            style={styleObj}
            className="w-11 h-11 rounded-full border-2 border-neutral-800 flex items-center justify-center bg-transparent select-none shadow-xs"
          >
            <div className="text-xl font-bold font-sans text-neutral-800 leading-none tracking-tighter">
              ☺
            </div>
          </div>
        )
      }

      // Spanish flag stamp (Reference Image 1)
      if (sticker.label === 'SPAIN') {
        return (
          <div
            key={sticker.id}
            style={styleObj}
            className="w-16 h-10 rounded-sm shadow-md overflow-hidden flex flex-col border border-white/60"
          >
            <div className="h-[25%] bg-[#c60b1e]" />
            <div className="h-[50%] bg-[#ffc400] flex items-center justify-center">
              <span className="text-[7px] font-black tracking-widest text-neutral-800">ESPAÑA</span>
            </div>
            <div className="h-[25%] bg-[#c60b1e]" />
          </div>
        )
      }

      return (
        <div
          key={sticker.id}
          style={{ ...styleObj, color: sticker.color || '#3b82f6', borderColor: sticker.color || '#3b82f6' }}
          className="border-2 border-dashed border-current px-2.5 py-1 rounded-sm text-center shadow-xs flex flex-col items-center justify-center bg-white/40 backdrop-blur-2xs"
        >
          <span className="font-editorial text-[10px] font-bold tracking-widest uppercase">
            {sticker.label}
          </span>
          {sticker.sublabel && (
            <span className="text-[8px] font-sans opacity-80">{sticker.sublabel}</span>
          )}
        </div>
      )
    }

    if (sticker.type === 'cutout') {
      // Flamenco fan (Abanico - Reference Image 1)
      return (
        <div
          key={sticker.id}
          style={styleObj}
          className="select-none filter drop-shadow-lg"
        >
          <div className="relative w-12 h-8 flex items-end justify-center">
            {/* Fan semi-circle with pleats */}
            <div className="w-12 h-6 bg-gradient-to-t from-red-700 to-red-500 rounded-t-full border-b-2 border-amber-900 shadow-sm flex items-center justify-around overflow-hidden px-1">
              <span className="w-0.5 h-full bg-red-900/40 transform rotate-12" />
              <span className="w-0.5 h-full bg-red-900/40" />
              <span className="w-0.5 h-full bg-red-900/40 transform -rotate-12" />
            </div>
          </div>
        </div>
      )
    }

    // Badge / Food sticker
    let badgeEmoji = '✨'
    if (sticker.label?.toLowerCase().includes('paella')) badgeEmoji = '🥘'
    else if (sticker.label?.toLowerCase().includes('churros')) badgeEmoji = '🥖'
    else if (sticker.label?.toLowerCase().includes('sangria')) badgeEmoji = '🍷'
    else if (sticker.label?.toLowerCase().includes('tapas')) badgeEmoji = '🍤'
    else if (sticker.label?.toLowerCase().includes('limon')) badgeEmoji = '🍋'

    return (
      <div
        key={sticker.id}
        style={styleObj}
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 border-2 border-white/90 shadow-md flex flex-col items-center justify-center text-white text-center leading-none p-0.5"
      >
        <span className="text-xs leading-none">{badgeEmoji}</span>
        <span className="text-[7px] font-extrabold uppercase tracking-tight mt-0.5">
          {sticker.label}
        </span>
      </div>
    )
  }

  // Render note items
  const renderNote = (note: NoteItem) => {
    const pos = note.position
    const styleObj: React.CSSProperties = {
      position: 'absolute',
      top: pos.top,
      left: pos.left,
      right: pos.right,
      bottom: pos.bottom,
      maxWidth: pos.maxWidth,
      transform: pos.rotate ? `rotate(${pos.rotate})` : undefined,
      zIndex: pos.zIndex || 5,
      color: note.color || '#1e293b'
    }

    let fontClass = 'font-handwriting'
    if (note.fontStyle === 'script') fontClass = 'font-script'
    if (note.fontStyle === 'casual') fontClass = 'font-casual'
    if (note.fontStyle === 'editorial') fontClass = 'font-editorial'

    return (
      <div
        key={note.id}
        style={styleObj}
        className={`${fontClass} ${note.fontSize || 'text-base'} leading-snug whitespace-pre-line pointer-events-none`}
      >
        {note.text}
      </div>
    )
  }

  return (
    <div
      className={`relative w-full h-full select-none overflow-hidden bg-[#fbf9f5] ${className}`}
    >
      {/* Paper fiber / grain background overlay */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
    </div>
  )
}
