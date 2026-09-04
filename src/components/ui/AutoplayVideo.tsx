import { useCallback, useEffect, useRef } from 'react'

interface AutoplayVideoProps {
  src: string
  poster: string
  className?: string
  ariaLabel?: string
}

export default function AutoplayVideo({
  src,
  poster,
  className = '',
  ariaLabel,
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const playVideo = useCallback(async () => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    try {
      await video.play()
    } catch {
      // Autoplay can be blocked until visible; IntersectionObserver retries.
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    void playVideo()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            void playVideo()
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.2 },
    )

    observer.observe(video)

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void playVideo()
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [playVideo, src])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onLoadedData={() => void playVideo()}
      onCanPlay={() => void playVideo()}
      className={className}
      aria-label={ariaLabel}
    />
  )
}
