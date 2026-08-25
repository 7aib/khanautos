import { Link } from 'react-router-dom'
import site from '../data/site'
import areas from '../data/areas'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__col">
            <h3 className="footer__heading">Khan Autos</h3>
            <p className="footer__text">
              Your trusted source for genuine auto spare parts, car servicing, and
              expert tuning in Wah Cantt, Punjab.
            </p>
            <p className="footer__text">{site.address}</p>
            <p className="footer__text">{site.openingHours}</p>
          </div>

          <div className="footer__col">
            <h3 className="footer__heading">Quick Links</h3>
            <nav className="footer__links">
              <Link to="/services">Services</Link>
              <Link to="/areas">Areas We Serve</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>

          <div className="footer__col">
            <h3 className="footer__heading">Service Areas</h3>
            <div className="footer__areas">
              {areas.map((area) => (
                <Link key={area.slug} to={`/areas/${area.slug}`}>
                  {area.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer__col">
            <h3 className="footer__heading">Contact</h3>
            <p className="footer__text">
              <a href={`tel:${site.phoneRaw}`} className="footer__link">
                {site.phone}
              </a>
            </p>
            <p className="footer__text">
              <a
                href={`https://wa.me/${site.whatsapp}`}
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </p>
            <div className="footer__social">
              {site.social.facebook && (
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
              )}
              {site.social.instagram && (
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
              )}
              {site.social.youtube && (
                <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">YT</a>
              )}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
