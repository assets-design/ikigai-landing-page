import type { Specialist } from '@/content/specialists'

type SpecialistFieldProps = {
  label: string
  value: string
  valueMinLines?: 1 | 2
}

function SpecialistField({
  label,
  value,
  valueMinLines = 1,
}: SpecialistFieldProps) {
  const valueMinHeight =
    valueMinLines === 2 ? 'min-h-[2.4lh]' : 'min-h-[1.3lh]'

  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-body-sm capitalize text-navy/70">{label}</p>
      <p
        className={`text-body capitalize text-black ${valueMinHeight}`}
      >
        {value || '\u00A0'}
      </p>
    </div>
  )
}

type SpecialistCardProps = {
  specialist: Specialist
}

export default function SpecialistCard({ specialist }: SpecialistCardProps) {
  return (
    <article className="flex h-full w-full flex-col">
      <div className="relative aspect-[405/552] overflow-hidden rounded-[clamp(12px,0.83vw,16px)]">
        <img
          src={specialist.image}
          alt={specialist.imageAlt}
          className={
            specialist.imageClassName ??
            'absolute inset-0 h-full w-full object-cover'
          }
          loading="lazy"
        />

        {specialist.portraitImage ? (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              src={specialist.portraitImage}
              alt=""
              aria-hidden="true"
              className={
                specialist.portraitClassName ??
                'h-full w-full object-cover'
              }
            />
          </div>
        ) : null}

        <div
          className="absolute inset-x-0 bottom-0 h-[clamp(7.5rem,9.7vw,11.625rem)] bg-gradient-to-t from-black to-transparent"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0 px-[clamp(0.75rem,0.78vw,0.9375rem)] pb-[clamp(0.75rem,0.78vw,0.9375rem)]">
          <h3 className="font-display text-h3 max-lg:!text-[1.375rem] capitalize text-white">
            {specialist.name}
          </h3>
          <p className="text-body-sm mt-[clamp(0.25rem,0.42vw,0.5rem)] capitalize text-white">
            {specialist.specialty}
          </p>
        </div>
      </div>

      <div className="mt-[clamp(1rem,1.56vw,1.875rem)] flex flex-col gap-[clamp(0.5rem,0.78vw,0.875rem)]">
        <SpecialistField
          label="Qualification"
          value={specialist.qualification}
          valueMinLines={2}
        />
        <SpecialistField
          label="Role"
          value={specialist.role}
          valueMinLines={2}
        />
        <SpecialistField
          label="Registration No."
          value={specialist.registrationNo ?? ''}
        />
      </div>
    </article>
  )
}
