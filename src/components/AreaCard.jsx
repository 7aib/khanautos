import { Link } from 'react-router-dom'
import './AreaCard.css'

export default function AreaCard({ name, slug, distanceKm, driveTimeMin }) {
  return (
    <Link to={`/areas/${slug}`} className="area-card">
      <span className="area-card__name">{name}</span>
      <span className="area-card__meta">
        ~{distanceKm} km &middot; ~{driveTimeMin} min drive
      </span>
    </Link>
  )
}
