import site from '../data/site'
import './StickyCTA.css'

export default function StickyCTA() {
  return (
    <div className="sticky-cta">
      <a href={`tel:${site.phoneRaw}`} className="sticky-cta__btn sticky-cta__btn--call">
        Call Now
      </a>
      <a
        href={`https://wa.me/${site.whatsapp}`}
        className="sticky-cta__btn sticky-cta__btn--whatsapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
    </div>
  )
}
