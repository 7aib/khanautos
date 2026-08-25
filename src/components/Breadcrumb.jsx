import { Link } from 'react-router-dom'
import './Breadcrumb.css'

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb__list">
        {items.map((item, i) => (
          <li key={i} className="breadcrumb__item">
            {item.to ? (
              <Link to={item.to} className="breadcrumb__link">{item.label}</Link>
            ) : (
              <span className="breadcrumb__current">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
