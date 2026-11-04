export interface PhotoItem {
  id: string
  url: string
  caption?: string
  style?: 'polaroid' | 'cutout' | 'stamp' | 'frameless' | 'vintage-border' | 'postcard'
  position?: {
    top?: string
    left?: string
    right?: string
    bottom?: string
    width?: string
    height?: string
    rotate?: string
    zIndex?: number
  }
  alt: string
}

export interface StickerItem {
  id: string
  type: 'stamp' | 'tape' | 'badge' | 'pin' | 'icon' | 'cutout'
  label?: string
  sublabel?: string
  color?: string
  bgColor?: string
  iconName?: string
  position: {
    top?: string
    left?: string
    right?: string
    bottom?: string
    rotate?: string
    zIndex?: number
  }
  size?: string
}

export interface NoteItem {
  id: string
  text: string
  author?: string
  fontStyle: 'handwriting' | 'script' | 'casual' | 'editorial'
  position: {
    top?: string
    left?: string
    right?: string
    bottom?: string
    rotate?: string
    maxWidth?: string
    zIndex?: number
  }
  color?: string
  fontSize?: string
}

export interface JournalPage {
  id: string
  pageNumber: number
  title: string
  subtitle?: string
  date: string
  location?: string
  tags: string[]
  paperTexture?: 'cream' | 'paperWarm' | 'kraft' | 'vintage' | 'grid'
  accentColor?: string
  photos: PhotoItem[]
  stickers: StickerItem[]
  notes: NoteItem[]
  summary?: string
  customLayout?: string
}

export interface JournalMetadata {
  title: string
  year: string
  totalPageDisplay: string
  author: string
  description: string
}

