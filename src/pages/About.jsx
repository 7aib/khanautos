import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Section from '../components/Section'
import site from '../data/site'
import './About.css'

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description={`Learn about ${site.name} — your trusted auto spare parts and car tuning workshop in Wah Cantt, Punjab. Serving the community with genuine parts and expert service.`}
        path="/about"
      />

      <section className="about-hero">
        <div className="about-hero__inner">
          <h1 className="about-hero__title">About Khan Autos</h1>
          <p className="about-hero__subtitle">
            Your trusted neighborhood auto spare parts shop and tuning workshop in Wah Cantt.
          </p>
        </div>
      </section>

      <Section>
        <motion.div
          className="about-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Khan Autos was established with a simple mission: to provide genuine auto spare parts
              and reliable car servicing to the people of Wah Cantt and surrounding areas. What
              started as a small parts shop has grown into a full-service workshop trusted by
              thousands of vehicle owners across the region.
            </p>
            <p>
              We understand that finding the right part at the right price can be a challenge.
              That's why we maintain a comprehensive inventory of genuine and OEM-quality parts
              for all major vehicle brands — from everyday Suzuki models to Toyota, Honda, Kia,
              and everything in between.
            </p>
            <p>
              Our workshop team brings years of hands-on experience to every job, whether it's a
              routine oil change, a complex engine tune-up, or a full performance modification.
              We treat every vehicle as if it were our own.
            </p>
          </div>

          <div className="about-image">
            <div className="about-image__placeholder">
              {/* TODO: Replace with real shop front photo */}
              Shop Front Photo Placeholder
            </div>
          </div>
        </motion.div>
      </Section>

      <Section title="Our Values" subtitle="What drives us every day" className="section--alt">
        <div className="about-values-grid">
          <motion.div
            className="about-value"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3>Genuine Parts Only</h3>
            <p>We never compromise on part quality. Every part we sell meets OEM standards for fit, finish, and durability.</p>
          </motion.div>
          <motion.div
            className="about-value"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3>Honest Pricing</h3>
            <p>No hidden fees, no unnecessary upselling. We give you a fair quote and stick to it.</p>
          </motion.div>
          <motion.div
            className="about-value"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3>Expert Mechanics</h3>
            <p>Our team is trained on all major brands and stays current with the latest automotive technology.</p>
          </motion.div>
          <motion.div
            className="about-value"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3>Customer First</h3>
            <p>Your satisfaction is our reputation. We build long-term relationships, not just one-time transactions.</p>
          </motion.div>
        </div>
      </Section>

      <Section title="Meet the Team">
        <div className="about-team-note">
          <p>
            {/* TODO: Add real team photos and bios */}
            Our experienced team of mechanics and parts specialists is ready to help you.
            Visit us in person at our Wah Cantt workshop to meet the team.
          </p>
          <div className="about-team-grid">
            <div className="about-team-card">
              <div className="about-team-card__photo">Photo Placeholder</div>
              <h4>Workshop Manager</h4>
              <p>15+ years experience</p>
            </div>
            <div className="about-team-card">
              <div className="about-team-card__photo">Photo Placeholder</div>
              <h4>Lead Technician</h4>
              <p>10+ years experience</p>
            </div>
            <div className="about-team-card">
              <div className="about-team-card__photo">Photo Placeholder</div>
              <h4>Parts Specialist</h4>
              <p>8+ years experience</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
