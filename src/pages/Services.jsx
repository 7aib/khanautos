import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Section from '../components/Section'
import './Services.css'

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

const serviceDetails = [
  {
    id: 'spare-parts',
    title: 'Genuine Auto Spare Parts',
    description: 'We stock genuine and OEM-quality parts for all major vehicle makes including Toyota, Honda, Suzuki, Kia, Hyundai, Nissan, Mitsubishi, and more. From engine components and suspension parts to body panels and electrical parts, we have what you need.',
    features: [
      'Engine parts — pistons, gaskets, belts, filters',
      'Brake pads, discs, calipers',
      'Suspension — shocks, struts, bushings',
      'Electrical — alternators, starters, sensors',
      'Body parts — mirrors, lights, bumpers',
      'Filters — oil, air, cabin, fuel',
      'Belts and hoses',
      'Cooling system parts',
    ],
    placeholder: 'Parts shelves / inventory photo placeholder',
  },
  {
    id: 'servicing',
    title: 'General Car Servicing',
    description: 'Keep your vehicle running smoothly with our comprehensive servicing options. We handle everything from routine oil changes to full multi-point inspections, ensuring your car stays safe and reliable.',
    features: [
      'Oil and filter change',
      'Brake inspection and replacement',
      'Tyre rotation, balancing, and replacement',
      'Fluid top-ups and replacements',
      'Battery testing and replacement',
      'AC servicing and recharge',
      'Wiper blade replacement',
      'Multi-point vehicle inspection',
    ],
    placeholder: 'Workshop bay / service photo placeholder',
  },
  {
    id: 'tuning',
    title: 'Performance Tuning',
    description: 'Unlock your vehicle\'s true potential with our tuning and performance services. From engine diagnostics to ECU remapping and exhaust modifications, our experienced technicians deliver measurable results.',
    features: [
      'Engine diagnostics and fault code scanning',
      'ECU remapping and chip tuning',
      'Exhaust system upgrades',
      'Air intake and filter upgrades',
      'Throttle body cleaning and calibration',
      'Fuel system cleaning',
      'Performance exhaust installation',
      'Pre-purchase vehicle inspection',
    ],
    placeholder: 'Tuning / diagnostics equipment photo placeholder',
  },
  {
    id: 'electrical',
    title: 'Diagnostics & Electrical',
    description: 'Modern vehicles rely on complex electrical systems. Our advanced diagnostic tools and experienced technicians can quickly identify and resolve electrical issues, from warning lights to complete system failures.',
    features: [
      'Full-system OBD-II scan diagnostics',
      'Check engine light diagnosis',
      'Battery and charging system testing',
      'Alternator and starter motor repair',
      'Wiring fault tracing',
      'Sensor replacement and calibration',
      'Lighting system repair and upgrade',
      'Central locking and window motor repair',
    ],
    placeholder: 'Diagnostic scan tool photo placeholder',
  },
]

export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Genuine auto spare parts, general car servicing, performance tuning, and electrical diagnostics at Khan Autos, Wah Cantt, Punjab."
        path="/services"
      />

      <section className="services-hero">
        <div className="services-hero__inner">
          <h1 className="services-hero__title">Our Services</h1>
          <p className="services-hero__subtitle">
            From genuine spare parts to expert tuning — everything your vehicle needs, delivered with honesty and skill.
          </p>
        </div>
      </section>

      {serviceDetails.map((service, i) => (
        <Section key={service.id} id={service.id} className={i % 2 === 1 ? 'section--alt' : ''}>
          <motion.div
            className="service-detail"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <div className="service-detail__image">
              <div className="service-detail__placeholder">{service.placeholder}</div>
            </div>
            <div className="service-detail__content">
              <h2 className="service-detail__title">{service.title}</h2>
              <p className="service-detail__desc">{service.description}</p>
              <ul className="service-detail__features">
                {service.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </Section>
      ))}
    </>
  )
}
