import { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Section from '../components/Section'
import MapEmbed from '../components/MapEmbed'
import site from '../data/site'
import './Contact.css'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: connect to backend or Formspree
    const form = e.target
    const name = form.name.value
    const phone = form.phone.value
    const message = form.message.value
    const mailtoUrl = `mailto:${site.email}?subject=Inquiry from ${name}&body=${encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nMessage: ${message}`)}`
    window.location.href = mailtoUrl
    setSubmitted(true)
  }

  return (
    <>
      <SEO
        title="Contact"
        description={`Contact ${site.name} in Wah Cantt for auto spare parts, car servicing, and tuning. Call ${site.phone}, WhatsApp us, or visit our workshop.`}
        path="/contact"
      />

      <section className="contact-hero">
        <div className="contact-hero__inner">
          <h1 className="contact-hero__title">Contact Us</h1>
          <p className="contact-hero__subtitle">
            Get in touch for auto parts, servicing, or tuning inquiries. We're here to help.
          </p>
        </div>
      </section>

      <Section>
        <motion.div
          className="contact-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="contact-form-wrap">
            <h2>Send Us a Message</h2>
            {submitted ? (
              <div className="contact-success">
                <p>Thank you! Your message has been sent via email. We'll get back to you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="contact-success__btn">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form__field">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" name="name" required placeholder="e.g. Ahmed Khan" />
                </div>
                <div className="contact-form__field">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" required placeholder="e.g. 0300 1234567" />
                </div>
                <div className="contact-form__field">
                  <label htmlFor="message">Message / Vehicle Details</label>
                  <textarea id="message" name="message" rows="5" required placeholder="Tell us about your vehicle and what you need..." />
                </div>
                <button type="submit" className="contact-form__submit">
                  Send Message
                </button>
                {/* TODO: connect to backend or Formspree */}
              </form>
            )}
          </div>

          <div className="contact-info">
            <h2>Visit Us</h2>
            <div className="contact-info__items">
              <div className="contact-info__item">
                <h3>Address</h3>
                <p>{site.addressFull}</p>
              </div>
              <div className="contact-info__item">
                <h3>Phone</h3>
                <p><a href={`tel:${site.phoneRaw}`}>{site.phone}</a></p>
              </div>
              <div className="contact-info__item">
                <h3>WhatsApp</h3>
                <p>
                  <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    Message Us on WhatsApp
                  </a>
                </p>
              </div>
              <div className="contact-info__item">
                <h3>Email</h3>
                <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
              </div>
              <div className="contact-info__item">
                <h3>Opening Hours</h3>
                <p>{site.openingHours}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      <Section title="Our Location" className="section--alt">
        <MapEmbed />
      </Section>
    </>
  )
}
