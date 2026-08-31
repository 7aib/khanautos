import { Link } from 'react-router-dom'
import site from '../data/site'
import './Logo.css'

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`logo ${className}`} aria-label={`${site.name} — Home`}>
      <img
        src="/images/logos/Logo Khan Autos.png"
        alt={site.name}
        className="logo__img"
        width="140"
        height="40"
      />
    </Link>
  )
}
