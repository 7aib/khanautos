import { Link } from 'react-router-dom'
import site from '../data/site'
import './Logo.css'

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`logo ${className}`}>
      <span className="logo__text">{site.name}</span>
      <span className="logo__accent" />
    </Link>
  )
}
