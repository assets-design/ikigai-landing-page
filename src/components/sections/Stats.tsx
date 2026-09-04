import { STATS, STATS_VIDEO } from '@/content/stats'
import StatBlock from '@/components/ui/StatBlock'

export default function Stats() {
  return (
    <section
      id="stats"
      className="bg-white pt-[30px] pb-[2.25rem] sm:pb-0 lg:pt-[100px]"
      data-node-id="149:533"
      aria-label="Hospital statistics"
    >
      <div className="mx-auto flex min-h-[clamp(480px,48.39vw,929px)] w-full max-w-[1920px] items-center justify-center px-[clamp(1.25rem,6.25vw,7.5rem)] sm:px-[clamp(1.25rem,16.48vw,19.6875rem)]">
        <div
          className="flex w-full max-w-[1287px] flex-col items-center gap-[clamp(2rem,4.9vw,5.8125rem)] lg:flex-row lg:items-center lg:gap-[clamp(3rem,4.9vw,5.875rem)]"
          data-node-id="149:535"
        >
          <div
            className="w-full shrink-0 overflow-hidden rounded-[clamp(14px,1.15vw,22px)] lg:w-[clamp(280px,28.44vw,546px)]"
            data-node-id="149:536"
          >
            <video
              src={STATS_VIDEO.src}
              autoPlay
              loop
              muted
              playsInline
              className="aspect-[546/929] h-auto w-full object-cover"
              aria-label="IKIGAI Hospitals statistics"
            />
          </div>

          <div
            className="grid w-full max-w-[647px] shrink-0 grid-cols-2 gap-x-[clamp(2rem,4.32vw,5.1875rem)] gap-y-[clamp(3rem,6.25vw,7.5rem)]"
            data-node-id="149:537"
          >
            {STATS.map((stat) => (
              <StatBlock
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
