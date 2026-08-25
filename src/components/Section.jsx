import './Section.css'

export default function Section({ title, subtitle, children, className = '', id }) {
  return (
    <section className={`section ${className}`} id={id}>
      <div className="section__inner">
        {title && (
          <div className="section__header">
            <h2 className="section__title">{title}</h2>
            {subtitle && <p className="section__subtitle">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
