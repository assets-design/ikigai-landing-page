export const STATS = [
  { value: 10, suffix: '+', label: 'Years of Combined Experience' },
  { value: 10, suffix: 'K+', label: 'Patients Treated' },
  { value: 95, suffix: '%', label: 'Successful Outcomes' },
  { value: 2, suffix: '', label: 'Urban Locations' },
] as const

export const STATS_VIDEO = {
  src: '/videos/number.mp4',
} as const

// Figma @ 1920 — Group 249 layout
export const STATS_LAYOUT = {
  contentMax: 1287,
  videoWidth: 546,
  videoHeight: 929,
  statsWidth: 647,
  columnGap: 94,
  gridGapX: 83,
  gridGapY: 120,
  labelGap: 15,
  sectionHeight: 929,
} as const
