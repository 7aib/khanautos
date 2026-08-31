import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'
import MapEmbed from '../components/MapEmbed'
import Section from '../components/Section'
import site from '../data/site'
import { getAreaBySlug } from '../data/areas'

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function AreaPage() {
  const { slug } = useParams()
  const area = getAreaBySlug(slug)

  if (!area) {
    return (
      <>
        <SEO title="Area Not Found" description="The requested area page was not found." path={`/areas/${slug}`} />
        <section className="area-not-found">
          <h1>Area Not Found</h1>
          <p>The area you're looking for doesn't exist.</p>
          <Link to="/areas" className="area-not-found__link">View All Areas &rarr;</Link>
        </section>
      </>
    )
  }

  const directionsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(area.name + ', Pakistan')}/${site.coordinates.lat},${site.coordinates.lng}`

  const faqs = [
    {
      q: `Do you supply auto spare parts for vehicles from ${area.name}?`,
      a: `Yes. ${site.name} in Wah Cantt stocks genuine auto spare parts for all major makes, and drivers from ${area.name} (about ${area.distanceKm} km away, a ${area.driveTimeMin}-minute drive) regularly visit us for parts and servicing. We keep common spares in stock so you can be in and out the same day.`,
    },
    {
      q: `How far is Khan Autos from ${area.name}?`,
      a: `${site.name} is located on Main GT Road in Wah Cantt, approximately ${area.distanceKm} km from ${area.name} — around a ${area.driveTimeMin}-minute drive. Use the map above or the directions link to reach us directly.`,
    },
    {
      q: `Can you tune or service my car if I live in ${area.name}?`,
      a: `Absolutely. Our workshop handles general car servicing, engine diagnostics, and performance tuning for vehicles from ${area.name} and all surrounding towns. Call ${site.phone} or message us on WhatsApp to book a slot.`,
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <SEO
        title={`${area.keywords[0]} | ${area.name} Car Tuning & Servicing`}
        description={`${site.name} — ${area.keywords.join(', ')}. Call ${site.phone} for genuine parts, tuning, and servicing just ${area.distanceKm} km from ${area.name}.`}
        path={`/areas/${area.slug}`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="area-hero">
        <div className="area-hero__inner">
          <Breadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'Areas', to: '/areas' },
              { label: area.name },
            ]}
          />
          <motion.h1
            className="area-hero__title"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            Auto Spare Parts & Car Tuning Near {area.name}
          </motion.h1>
          <p className="area-hero__meta">
            ~{area.distanceKm} km from Wah Cantt &middot; ~{area.driveTimeMin} minute drive
          </p>
        </div>
      </section>

      <Section>
        <motion.div
          className="area-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="area-content__text">
            <p className="area-intro">{area.intro}</p>

            <h2>What We Offer in {area.name}</h2>
            <ul className="area-services-list">
              <li>Genuine auto spare parts for all major brands</li>
              <li>Professional car servicing and maintenance</li>
              <li>Engine tuning and performance upgrades</li>
              <li>Diagnostics and electrical repair</li>
              <li>Brake, suspension, and exhaust work</li>
              <li>AC servicing and repair</li>
            </ul>

            <h2>Directions from {area.name}</h2>
            <p>
              Our workshop is located on Main GT Road in Wah Cantt. From {area.name}, take the GT Road
              towards Wah Cantt — we're approximately {area.distanceKm} km away, a drive of about {area.driveTimeMin} minutes.
            </p>
            <a
              href={directionsUrl}
              className="area-directions-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions from {area.name} &rarr;
            </a>

            <div className="area-contact-block">
              <h2>Contact Us</h2>
              <p><strong>Phone:</strong> <a href={`tel:${site.phoneRaw}`}>{site.phone}</a></p>
              <p><strong>WhatsApp:</strong> <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">Message Us</a></p>
              <p><strong>Hours:</strong> {site.openingHours}</p>
              <p><strong>Address:</strong> {site.addressFull}</p>
            </div>
          </div>

          <div className="area-content__map">
            <MapEmbed address={`${site.name}, Wah Cantt, Punjab, Pakistan`} />
          </div>
        </motion.div>
      </Section>

      {/* FAQ */}
      <Section title={`Frequently Asked Questions`} subtitle={`Auto parts & car tuning in ${area.name}`}>
        <div className="area-faq">
          {faqs.map((faq, i) => (
            <div className="area-faq__item" key={i}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Other Areas We Serve" className="section--alt">
        <div className="area-other-grid">
          <Link to="/areas" className="area-other-link">View All Areas &rarr;</Link>
        </div>
      </Section>
    </>
  )
}
