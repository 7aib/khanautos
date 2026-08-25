import { Link } from 'react-router-dom'
import './ServiceCard.css'

export default function ServiceCard({ icon, title, description, link }) {
  const content = (
    <>
      <div className="service-card__icon">{icon}</div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__desc">{description}</p>
    </>
  )

  return link ? (
    <Link to={link} className="service-card">
      {content}
    </Link>
  ) : (
    <div className="service-card">{content}</div>
  )
}
