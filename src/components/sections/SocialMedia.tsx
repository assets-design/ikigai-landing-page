import {
  INSTAGRAM_PROFILE,
  SOCIAL_MEDIA_HEADING,
  SOCIAL_VIDEOS,
} from '@/content/socialMedia'
import SocialVideoCarousel from '@/components/ui/SocialVideoCarousel'
import SocialVideoTile from '@/components/ui/SocialVideoTile'

export default function SocialMedia() {
  return (
    <section
      className="bg-white pt-[clamp(2.1rem,5.21vw,6.25rem)] pb-[2.25rem] sm:pb-0"
      data-node-id="228:1113"
      aria-labelledby="social-media-heading"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)]">
        <div className="mx-auto w-full max-w-[1680px]">
          <div
            className="flex flex-col gap-[clamp(1rem,1.56vw,1.875rem)] lg:flex-row lg:items-start lg:justify-between"
            data-node-id="149:941"
          >
            <header className="max-w-[861px]">
              <p className="text-label font-medium uppercase text-primary">
                {SOCIAL_MEDIA_HEADING.label}
              </p>

              <h2
                id="social-media-heading"
                className="font-display text-[30px] sm:text-h2 mt-[clamp(0.75rem,1.04vw,1.25rem)] capitalize text-black"
              >
                {SOCIAL_MEDIA_HEADING.title}
              </h2>

              <p className="text-body mt-[clamp(1rem,1.56vw,1.875rem)] capitalize text-black">
                {SOCIAL_MEDIA_HEADING.description}
              </p>
            </header>

            <a
              href={INSTAGRAM_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[clamp(44px,2.92vw,56px)] shrink-0 items-center gap-[clamp(0.5rem,0.78vw,0.9375rem)] self-start rounded-[clamp(22px,1.54vw,29.5px)] bg-navy px-[clamp(1rem,1.2vw,1.44rem)] text-cta font-normal capitalize text-white transition-colors duration-150 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus lg:mt-[clamp(4.25rem,7.03vw,8.4375rem)]"
              data-node-id="149:630"
            >
              <img
                src="/images/icons/instagram.svg"
                alt=""
                className="size-[clamp(18px,1.25vw,24px)] shrink-0 brightness-0 invert"
              />
              {SOCIAL_MEDIA_HEADING.cta}
            </a>
          </div>

          <div
            className="mt-[clamp(2rem,3.65vw,4.375rem)] sm:hidden"
            data-node-id="149:635"
          >
            <SocialVideoCarousel videos={SOCIAL_VIDEOS} />
          </div>

          <div
            className="mt-[clamp(2rem,3.65vw,4.375rem)] hidden gap-[clamp(1rem,1.67vw,2rem)] sm:grid sm:grid-cols-2 xl:grid-cols-4"
            data-node-id="149:635"
          >
            {SOCIAL_VIDEOS.map((video) => (
              <div key={video.id} className="min-w-0">
                <SocialVideoTile video={video} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
