import type { Location } from '@/content/locations'

type LocationCardProps = {
  location: Location
}

export default function LocationCard({ location }: LocationCardProps) {
  return (
    <article
      className="relative z-0 flex w-full flex-col md:w-[clamp(320px,28.15vw,540px)] md:shrink-0"
      data-node-id="149:937"
    >
      <div className="map-embed-clip relative aspect-[540/395] w-full overflow-hidden rounded-[clamp(12px,1.15vw,22px)]">
        <div className="map-embed-scroll absolute inset-0">
          <iframe
            src={location.mapEmbedUrl}
            title={location.mapAlt}
            width="600"
            height="450"
            className="block h-full w-full max-h-full max-w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <a
        href={location.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-0 mt-[clamp(1rem,1.56vw,1.875rem)] block capitalize text-black transition-opacity duration-150 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        <h3 className="font-display text-h3">{location.name}</h3>
        <p className="text-body mt-[clamp(0.5rem,0.78vw,0.9375rem)]">
          {location.addressLines.map((line, index) => (
            <span key={line}>
              {line}
              {index < location.addressLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      </a>
    </article>
  )
}
