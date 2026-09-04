import { SITE } from '@/lib/constants'
import { FOOTER } from '@/content/appointment'

type FooterProps = {
  className?: string
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <footer id="site-footer" className={className} data-node-id="149:698">
      <div className="flex flex-col gap-[clamp(1.5rem,2vw,2.5rem)] sm:flex-row sm:items-center sm:justify-between">
        <a href="/" className="flex shrink-0 items-center gap-[clamp(6px,0.52vw,10px)]">
          <img
            src="/images/brand/logo-icon.svg"
            alt=""
            className="h-[clamp(48px,4.32vw,83px)] w-auto"
          />
          <img
            src="/images/brand/logo-wordmark.svg"
            alt={SITE.name}
            className="h-[clamp(44px,3.92vw,75px)] w-auto"
          />
        </a>

        <div className="flex flex-col gap-[clamp(0.75rem,1.04vw,1.25rem)] sm:flex-row sm:items-center sm:gap-[clamp(1rem,1.56vw,1.875rem)]">
          <p className="flex flex-wrap items-center gap-x-1 text-body capitalize text-black/60">
            {FOOTER.locations.map((location, index) => (
              <span key={location.name} className="inline-flex flex-wrap items-center gap-x-1">
                {index > 0 && <span aria-hidden="true">|</span>}
                <span>{location.name}</span>
                <span aria-hidden="true">|</span>
                <a
                  href={location.tel}
                  className="transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {location.phone}
                </a>
              </span>
            ))}
          </p>

          <nav aria-label="Social media" className="flex items-center gap-[clamp(0.75rem,1.04vw,1.25rem)]">
            {FOOTER.social.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <img
                  src={item.icon}
                  alt=""
                  className="size-[clamp(40px,3.02vw,58px)]"
                />
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-[clamp(1.25rem,1.56vw,1.875rem)] border-t border-black/15 pt-[clamp(1rem,1.56vw,1.875rem)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body capitalize text-black/60">{FOOTER.copyright}</p>
          <p className="text-body capitalize text-black/60">
            {FOOTER.credit.prefix}
            <a
              href={FOOTER.credit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              {FOOTER.credit.company}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
