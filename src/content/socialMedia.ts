export type SocialVideo = {
  /** Instagram reel shortcode */
  id: string
  /** Self-hosted video path (refresh via `npm run sync:reels`) */
  src: string
  /** Self-hosted poster image path */
  poster: string
  /** Direct link to the reel on Instagram */
  instagramUrl: string
  alt: string
}

export const SOCIAL_MEDIA_HEADING = {
  label: 'Social Media',
  title: 'See Ikigai in Action',
  description:
    'Follow Our Doctors, Patient Education, Hospital Updates And Everyday Moments From Ikigai.',
  cta: 'Follow us on instagram',
} as const

export const INSTAGRAM_PROFILE = 'https://www.instagram.com/ikigaihospitals/' as const

/**
 * Latest 4 reels from @ikigaihospitals (newest first).
 * Self-host assets with: npm run sync:reels
 */
export const SOCIAL_VIDEOS: readonly SocialVideo[] = [
  {
    id: 'DcgScDUkxX7',
    src: '/videos/social/reel-1.mp4',
    poster: '/images/social/reel-1-poster.jpg',
    instagramUrl: 'https://www.instagram.com/ikigaihospitals/reel/DcgScDUkxX7/',
    alt: 'IKIGAI Hospitals Instagram reel — full conversation link in bio',
  },
  {
    id: 'DcTV3yMFOtO',
    src: '/videos/social/reel-2.mp4',
    poster: '/images/social/reel-2-poster.jpg',
    instagramUrl: 'https://www.instagram.com/ikigaihospitals/reel/DcTV3yMFOtO/',
    alt: 'IKIGAI Hospitals Instagram reel — patient education',
  },
  {
    id: 'DcOMXdjFfWx',
    src: '/videos/social/reel-3.mp4',
    poster: '/images/social/reel-3-poster.jpg',
    instagramUrl: 'https://www.instagram.com/ikigaihospitals/reel/DcOMXdjFfWx/',
    alt: 'IKIGAI Hospitals Instagram reel — specialist care',
  },
  {
    id: 'DcF4Lq0jdTx',
    src: '/videos/social/reel-4.mp4',
    poster: '/images/social/reel-4-poster.jpg',
    instagramUrl: 'https://www.instagram.com/ikigaihospitals/reel/DcF4Lq0jdTx/',
    alt: 'IKIGAI Hospitals Instagram reel — hospital update',
  },
] as const
