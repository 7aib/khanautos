import site from '../data/site'

export default function MapEmbed({ className = '', address = '' }) {
  const query = address || site.address
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(query)}&center=${site.coordinates.lat},${site.coordinates.lng}&zoom=14`

  return (
    <div className={`map-embed ${className}`}>
      <iframe
        title={`Map showing ${site.name} location`}
        src={embedUrl}
        width="100%"
        height="400"
        style={{ border: 0, borderRadius: '12px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
