import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Section from '../components/Section'
import ServiceCard from '../components/ServiceCard'
import AreaCard from '../components/AreaCard'
import MapEmbed from '../components/MapEmbed'
import GoogleReviews from '../components/GoogleReviews'
import site from '../data/site'
import areas from '../data/areas'
import './Home.css'

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

const stagger = (i) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
})

const services = [
  {
    icon: '🔧',
    title: 'Genuine Spare Parts',
    description: 'Parts for all major brands — Toyota, Honda, Suzuki, Kia, and more. Genuine quality at competitive prices.',
    link: '/services',
  },
  {
    icon: '🛞',
    title: 'General Servicing',
    description: 'Oil changes, brake service, filters, fluids, and full vehicle inspections to keep you safe on the road.',
    link: '/services',
  },
  {
    icon: '⚡',
    title: 'Performance Tuning',
    description: 'Engine diagnostics, ECU tuning, exhaust upgrades, and performance modifications for more power and efficiency.',
    link: '/services',
  },
  {
    icon: '🔋',
    title: 'Diagnostics & Electrical',
    description: 'Advanced scan tool diagnostics, battery service, alternator repair, and full electrical troubleshooting.',
    link: '/services',
  },
]

export default function Home() {
  return (
    <>
      <SEO
        description={`${site.name} — Genuine auto spare parts, car servicing, and expert tuning in Wah Cantt, Punjab. Call ${site.phone} or visit us today.`}
        path="/"
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AutoRepair',
            name: site.name,
            image: `${site.siteUrl}/og-default.jpg`,
            url: site.siteUrl,
            telephone: site.phone,
            priceRange: site.priceRange,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Main GT Road',
              addressLocality: 'Wah Cantt',
              addressRegion: 'Punjab',
              postalCode: '47040',
              addressCountry: 'PK',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: site.coordinates.lat,
              longitude: site.coordinates.lng,
            },
            openingHoursSpecification: site.openingHoursSchema.map((h) => ({
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: h.split(' ')[0],
              opens: h.split(' ')[1].split('-')[0],
              closes: h.split(' ')[1].split('-')[1],
            })),
            areaServed: areas.map((a) => ({
              '@type': 'City',
              name: a.name,
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="hero">
        <div className="hero__bg">
          <img
            src="/images/hero-workshop.jpg"
            alt="Auto spare parts workshop in Wah Cantt"
            className="hero__img"
            loading="eager"
          />
          <div className="hero__overlay" />
        </div>
        <motion.div
          className="hero__content"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h1 className="hero__title">Genuine Auto Spare Parts<br />& Expert Car Tuning</h1>
          <p className="hero__subtitle">{site.tagline}</p>
          <p className="hero__location">Wah Cantt, Punjab, Pakistan</p>
          <div className="hero__actions">
            <a href={`tel:${site.phoneRaw}`} className="hero__btn hero__btn--primary">
              Call Now
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              className="hero__btn hero__btn--secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

      {/* Services */}
      <Section title="Our Services" subtitle="Everything your vehicle needs, under one roof">
        <div className="home-services-grid">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeIn}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ServiceCard {...s} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Areas */}
      <Section
        title="Areas We Serve"
        subtitle="Serving Wah Cantt and 16 surrounding towns across Punjab"
        className="section--alt"
      >
        <div className="home-areas-grid">
          {areas.map((area) => (
            <AreaCard key={area.slug} {...area} />
          ))}
        </div>
        <div className="home-areas-cta">
          <Link to="/areas" className="home-areas-link">
            View All Areas &rarr;
          </Link>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section title="Why Choose Khan Autos" subtitle="Trusted by drivers across Wah Cantt and beyond">
        <div className="why-grid">
          <div className="why-card">
            <span className="why-card__number">20+</span>
            <span className="why-card__label">Years in Business</span>
          </div>
          <div className="why-card">
            <span className="why-card__number">5000+</span>
            <span className="why-card__label">Vehicles Serviced</span>
          </div>
          <div className="why-card">
            <span className="why-card__number">100%</span>
            <span className="why-card__label">Genuine Parts</span>
          </div>
          <div className="why-card">
            <span className="why-card__number">16</span>
            <span className="why-card__label">Areas Covered</span>
          </div>
        </div>
      </Section>

      {/* Map + Contact */}
      <Section title="Find Us" subtitle="Visit our workshop or get in touch">
        <div className="home-map-grid">
          <MapEmbed />
          <div className="home-map-info">
            <h3>Contact Information</h3>
            <p><strong>Phone:</strong> <a href={`tel:${site.phoneRaw}`}>{site.phone}</a></p>
            <p><strong>WhatsApp:</strong> <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">Message Us</a></p>
            <p><strong>Address:</strong> {site.addressFull}</p>
            <p><strong>Hours:</strong> {site.openingHours}</p>
            <a href={site.mapsUrl} className="hero__btn hero__btn--primary" target="_blank" rel="noopener noreferrer" style={{ marginTop: '1rem', display: 'inline-flex' }}>
              Get Directions
            </a>
          </div>
        </div>
      </Section>

      {/* Reviews */}
      <Section title="What Customers Say" subtitle="Real reviews from drivers who trust Khan Autos">
        <GoogleReviews />
      </Section>
    </>
  )
}
