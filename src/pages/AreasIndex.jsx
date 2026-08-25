import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Section from '../components/Section'
import AreaCard from '../components/AreaCard'
import areas from '../data/areas'
import './AreasIndex.css'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function AreasIndex() {
  return (
    <>
      <SEO
        title="Areas We Serve"
        description="Khan Autos serves Wah Cantt and 16 surrounding areas including Taxila, Hasan Abdal, Islamabad, Rawalpindi, and more. Auto spare parts and car tuning near you."
        path="/areas"
      />

      <section className="areas-hero">
        <div className="areas-hero__inner">
          <h1 className="areas-hero__title">Areas We Serve</h1>
          <p className="areas-hero__subtitle">
            Based in Wah Cantt, we proudly serve drivers across 16 surrounding towns and cities.
            Select your area below for directions and local services.
          </p>
        </div>
      </section>

      <Section>
        <div className="areas-index-grid">
          {areas.map((area, i) => (
            <motion.div
              key={area.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              variants={fadeIn}
              transition={{ delay: i * 0.03, duration: 0.4 }}
            >
              <AreaCard {...area} />
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  )
}
