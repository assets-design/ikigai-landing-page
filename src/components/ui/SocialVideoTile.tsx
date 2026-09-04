import { useCallback, useEffect, useRef, useState } from 'react'
import type { SocialVideo } from '@/content/socialMedia'

type SocialVideoTileProps = {
  video: SocialVideo
}

export default function SocialVideoTile({ video }: SocialVideoTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [hasError, setHasError] = useState(false)

  const playVideo = useCallback(async () => {
    const el = videoRef.current
    if (!el || hasError) return

    // Always start muted so autoplay succeeds in all browsers.
    el.muted = true

    try {
      await el.play()
      el.muted = isMuted
    } catch {
      // Retry when visible if autoplay is blocked.
    }
  }, [hasError, isMuted])

  useEffect(() => {
    const el = videoRef.current
    if (!el || hasError) return

    void playVideo()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            void playVideo()
          } else {
            el.pause()
          }
        })
      },
      { threshold: 0.35 },
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [hasError, playVideo, video.src])

  useEffect(() => {
    const el = videoRef.current
    if (!el || hasError) return
    el.muted = isMuted
  }, [hasError, isMuted])

  const toggleMute = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setIsMuted((current) => !current)
  }

  return (
    <article
      className="relative w-full overflow-hidden rounded-[clamp(12px,0.83vw,16px)] bg-black"
      style={{ aspectRatio: '396 / 636' }}
    >
      <div className="absolute inset-0">
        {hasError ? (
          <img
            src={video.poster}
            alt={video.alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => void playVideo()}
            onCanPlay={() => void playVideo()}
            onError={() => setHasError(true)}
            className="h-full w-full object-cover"
            aria-label={video.alt}
          />
        )}
      </div>

      <button
        type="button"
        onClick={toggleMute}
        disabled={hasError}
        className="pointer-events-auto absolute top-[clamp(0.75rem,0.78vw,0.9375rem)] right-[clamp(0.75rem,0.78vw,0.9375rem)] z-10 flex size-[clamp(2rem,2.19vw,2.625rem)] items-center justify-center rounded-full bg-black/55 transition-colors duration-150 hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-50"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        aria-pressed={!isMuted}
      >
        <img
          src={isMuted ? '/images/icons/volume-muted.svg' : '/images/icons/volume-on.svg'}
          alt=""
          className="size-[clamp(1rem,1.04vw,1.25rem)]"
        />
      </button>

      <a
        href={video.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-none absolute inset-0 z-[1] sr-only focus:pointer-events-auto focus:not-sr-only focus:z-20 focus:flex focus:items-end focus:justify-center focus:pb-4 focus:text-white focus:underline"
      >
        View on Instagram
      </a>
    </article>
  )
}
