import type { SocialVideo } from '@/content/socialMedia'
import SocialVideoTile from '@/components/ui/SocialVideoTile'

/** Figma reel tile: 396×636 — width scales down on small screens. */
const CARD_WIDTH = 'w-[min(78vw,300px)]'
const CARD_GAP = 'gap-[clamp(0.75rem,3vw,1rem)]'

type SocialVideoCarouselProps = {
  videos: readonly SocialVideo[]
}

export default function SocialVideoCarousel({ videos }: SocialVideoCarouselProps) {
  return (
    <div
      className="relative -mx-[clamp(1.25rem,6.25vw,7.5rem)] overflow-hidden"
      aria-label="Instagram videos carousel"
    >
      <div
        className={`specialist-carousel-scroll flex overflow-x-auto overflow-y-hidden ${CARD_GAP} px-[clamp(1.25rem,6.25vw,7.5rem)]`}
        role="region"
        aria-roledescription="carousel"
        tabIndex={0}
      >
        {videos.map((video) => (
          <div key={video.id} className={`${CARD_WIDTH} shrink-0`}>
            <SocialVideoTile video={video} />
          </div>
        ))}
      </div>
    </div>
  )
}
