import { HERO } from '@/content/hero'

export default function Hero() {
  return (
    <section
      className="relative mx-auto w-full max-w-[1920px] overflow-hidden bg-surface-muted"
      data-node-id="198:125"
      aria-label="Hero"
    >
      <img
        src={HERO.image.src}
        alt={HERO.image.alt}
        className="h-[30vh] w-full object-cover sm:hidden"
        data-node-id="175:953"
      />

      <div
        className="absolute inset-0 hidden bg-cover bg-no-repeat bg-[center_25%] sm:block sm:bg-[center_20%]"
        style={{ backgroundImage: `url(${HERO.image.src})` }}
        role="img"
        aria-label={HERO.image.alt}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] hidden h-[clamp(64px,12.5vw,240px)] bg-gradient-to-t from-surface-muted from-25% via-surface-muted/60 to-transparent sm:block"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col px-[clamp(1.25rem,6.25vw,7.5rem)] py-6 text-center sm:h-[clamp(480px,56.25vw,1080px)] sm:py-0">
        <div
          className="hidden shrink-0 sm:block sm:h-[calc(clamp(12px,1.56vw,30px)+clamp(56px,4.375vw,84px))]"
          aria-hidden="true"
        />

        <div className="flex flex-col sm:min-h-0 sm:flex-1 sm:justify-center">
          <h1
            className="font-display text-[30px] leading-[1.13] hero-fade mx-auto capitalize text-black sm:-mt-[35px] sm:text-display sm:max-w-[clamp(20rem,70vw,63.5rem)]"
            data-node-id="175:956"
          >
            {HERO.titleLine1}
            <br className="hidden sm:block" />
            <span className="sm:whitespace-nowrap">{HERO.titleLine2}</span>
          </h1>

          <p
            className="text-body hero-fade-delayed mx-auto mt-4 capitalize text-black sm:mt-[clamp(0.9rem,1.404vw,1.6875rem)] sm:max-w-[clamp(18rem,55vw,51.8125rem)]"
            data-node-id="175:957"
          >
            {HERO.subtitle}
          </p>
        </div>

        <div className="hidden shrink-0 sm:block sm:h-[48%]" aria-hidden="true" />
      </div>
    </section>
  )
}
