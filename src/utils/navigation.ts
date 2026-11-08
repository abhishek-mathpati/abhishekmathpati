export const PAGE_SLUGS: Record<number, string> = {
  0: 'education',
  1: 'workexperience',
  2: 'publications',
  3: 'projects',
  4: 'skills',
  5: 'certifications',
  6: 'awards',
  7: 'contact',
}

export const PAGE_TITLES: Record<number, string> = {
  0: 'Education',
  1: 'Work Experience',
  2: 'Publications',
  3: 'Projects',
  4: 'Technical Skills',
  5: 'Certifications',
  6: 'Awards & Volunteering',
  7: 'Contact & Connect',
}

export const SLUG_TO_INDEX: Record<string, number> = {
  // Primary slugs
  education: 0,
  workexperience: 1,
  publications: 2,
  projects: 3,
  skills: 4,
  certifications: 5,
  awards: 6,
  contact: 7,

  // User-friendly aliases
  academic: 0,
  experience: 1,
  'work-experience': 1,
  research: 2,
  papers: 2,
  technicalskills: 4,
  'technical-skills': 4,
  volunteering: 6,
  'awards-volunteering': 6,
  connect: 7,
  languages: 7,

  // Numeric and page ID aliases
  'page-1': 0,
  'page-2': 1,
  'page-3': 2,
  'page-4': 3,
  'page-5': 4,
  'page-6': 5,
  'page-7': 6,
  'page-8': 7,
  '1': 0,
  '2': 1,
  '3': 2,
  '4': 3,
  '5': 4,
  '6': 5,
  '7': 6,
  '8': 7,
}

export interface RouteState {
  isClosed: boolean
  pageIndex: number
  canonicalSlug: string | null
}

/**
 * Parses the current pathname and returns the matching page index and book state.
 */
export function parseCurrentRoute(pathname: string = window.location.pathname): RouteState {
  const clean = pathname.replace(/^\/+|\/+$/g, '').toLowerCase()

  if (!clean || clean === 'index.html') {
    return { isClosed: true, pageIndex: 0, canonicalSlug: null }
  }

  if (clean in SLUG_TO_INDEX) {
    const pageIndex = SLUG_TO_INDEX[clean]
    return {
      isClosed: false,
      pageIndex,
      canonicalSlug: PAGE_SLUGS[pageIndex],
    }
  }

  // Unrecognized path defaults to closed book at root
  return { isClosed: true, pageIndex: 0, canonicalSlug: null }
}

/**
 * Updates the browser URL and page title cleanly without hash or query params.
 */
export function updateRoute(
  isClosed: boolean,
  pageIndex: number = 0,
  mode: 'push' | 'replace' = 'push'
) {
  try {
    if (typeof window === 'undefined') return

    const baseTitle = 'Abhishek Mathpati • Portfolio'
    let targetPath = '/'
    let targetTitle = baseTitle

    if (!isClosed) {
      const slug = PAGE_SLUGS[pageIndex] || 'education'
      const title = PAGE_TITLES[pageIndex] || 'Portfolio'
      targetPath = `/${slug}`
      targetTitle = `${title} | Abhishek Mathpati`
    }

    // Do not push duplicate state if already on current path
    const currentPath = window.location.pathname
    if (currentPath === targetPath) {
      document.title = targetTitle
      return
    }

    if (mode === 'replace') {
      window.history.replaceState({ isClosed, pageIndex }, '', targetPath)
    } else {
      window.history.pushState({ isClosed, pageIndex }, '', targetPath)
    }

    document.title = targetTitle
  } catch {}
}

