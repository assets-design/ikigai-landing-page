import {
  WHY_IKIGAI_HEADING,
  WHY_IKIGAI_SYMBOL,
  WHY_IKIGAI_VALUES,
} from '@/content/whyIkigai'
import ValuePropItem from '@/components/ui/ValuePropItem'

export default function WhyIkigai() {
  return (
    <section
      className="bg-white pt-[clamp(2.1rem,5.21vw,6.25rem)] pb-[2.25rem] sm:pb-0"
      data-node-id="230:1128"
      aria-labelledby="why-ikigai-heading"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)]">
        <div className="mx-auto w-full max-w-[1680px]">
          <header>
            <p className="text-label font-medium uppercase text-primary">
              {WHY_IKIGAI_HEADING.label}
            </p>

            <h2
              id="why-ikigai-heading"
              className="font-display text-[30px] sm:text-h2 mt-[clamp(0.75rem,1.04vw,1.25rem)] capitalize text-black"
            >
              {WHY_IKIGAI_HEADING.titleLine1}
              <br className="hidden sm:block" />
              {' '}
              {WHY_IKIGAI_HEADING.titleLine2}
            </h2>

            <p className="text-body mt-[clamp(1rem,1.56vw,1.875rem)] max-w-[829px] capitalize text-black">
              {WHY_IKIGAI_HEADING.description}
            </p>
          </header>

          <div
            className="mt-[clamp(2rem,5.42vw,6.5rem)] lg:grid lg:grid-cols-[clamp(280px,24.4vw,468px)_minmax(0,1fr)] lg:items-start lg:gap-x-[clamp(2rem,22.66vw,27.1875rem)]"
            data-node-id="149:550"
          >
            <aside
              className="mx-auto w-full max-w-[clamp(280px,24.4vw,468px)] lg:sticky lg:top-[calc(clamp(12px,1.56vw,30px)+clamp(56px,4.375vw,84px)+clamp(1rem,1.56vw,1.875rem))] lg:mx-0 lg:self-start"
              data-node-id="133:591"
            >
              <img
                src={WHY_IKIGAI_SYMBOL.src}
                alt={WHY_IKIGAI_SYMBOL.alt}
                className="h-auto w-full"
                loading="lazy"
              />
            </aside>

            <div
              className="mt-[clamp(2rem,5.42vw,6.5rem)] flex min-w-0 flex-col gap-[clamp(1.25rem,2.08vw,2.5rem)] lg:mt-0"
              data-node-id="149:555"
            >
              {WHY_IKIGAI_VALUES.map((value) => (
                <ValuePropItem key={value.title} value={value} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
