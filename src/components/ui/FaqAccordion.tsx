import { useId, useState } from 'react'
import type { Faq } from '@/content/faqs'

type FaqAccordionProps = {
  faqs: readonly Faq[]
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const baseId = useId()
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)

  return (
    <div className="flex flex-col divide-y divide-black/15 border-y border-black/15">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id
        const panelId = `${baseId}-${faq.id}-panel`
        const buttonId = `${baseId}-${faq.id}-button`

        return (
          <div key={faq.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="font-display text-[20px] sm:text-h3 flex w-full items-center justify-between gap-4 py-[clamp(1rem,1.56vw,1.875rem)] text-left capitalize text-black transition-opacity duration-150 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <span className="min-w-0 flex-1">{faq.question}</span>
                <span
                  aria-hidden="true"
                  className="text-body flex size-[clamp(2rem,2.08vw,2.5rem)] shrink-0 items-center justify-center rounded-full bg-black/10 text-black/60"
                >
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-[clamp(1rem,1.56vw,1.875rem)]"
            >
              <p className="text-body-sm max-w-[52rem] capitalize text-black">
                {faq.answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
