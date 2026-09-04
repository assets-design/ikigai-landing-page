import { LOCATIONS, LOCATIONS_HEADING } from '@/content/locations'
import LocationCard from '@/components/ui/LocationCard'

export default function Locations() {
  return (
    <section
      className="relative z-0 isolate bg-white pt-[clamp(2.1rem,5.21vw,6.25rem)] pb-[2.25rem] sm:pb-0"
      data-node-id="228:1116"
      aria-labelledby="locations-heading"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)]">
        <div className="mx-auto w-full max-w-[1680px]">
          <header>
            <p className="text-label font-medium uppercase text-primary">
              {LOCATIONS_HEADING.label}
            </p>

            <h2
              id="locations-heading"
              className="font-display text-[30px] sm:text-h2 mt-[clamp(0.75rem,1.04vw,1.25rem)] capitalize text-black"
            >
              {LOCATIONS_HEADING.title}
            </h2>

            <p className="text-body mt-[clamp(1rem,1.56vw,1.875rem)] max-w-[1166px] capitalize text-black">
              {LOCATIONS_HEADING.description}
            </p>
          </header>

          <div
            className="mt-[clamp(2rem,3.65vw,4.375rem)] flex flex-col gap-[clamp(2rem,3.65vw,4.375rem)] md:flex-row md:items-start md:gap-x-[clamp(1.5rem,3.44vw,4.125rem)]"
            data-node-id="149:938"
          >
            {LOCATIONS.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
