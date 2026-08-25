import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import site from '../data/site'
import './Header.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/areas', label: 'Areas' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="header">
      <div className="header__inner">
        <Logo className="logo--header" />

        <nav className={`header__nav ${open ? 'header__nav--open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`header__link ${location.pathname === link.to ? 'header__link--active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a href={`tel:${site.phoneRaw}`} className="header__cta header__cta--call">
            Call Now
          </a>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            className="header__cta header__cta--whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </nav>

        <button
          className="header__burger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span className={`header__burger-line ${open ? 'open' : ''}`} />
          <span className={`header__burger-line ${open ? 'open' : ''}`} />
          <span className={`header__burger-line ${open ? 'open' : ''}`} />
        </button>
      </div>
    </header>
  )
}
