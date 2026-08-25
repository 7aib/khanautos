import { Helmet } from 'react-helmet-async'
import site from '../data/site'

export default function SEO({
  title,
  description,
  path = '/',
  ogImage = '/og-default.jpg',
  type = 'website',
}) {
  const fullTitle = title
    ? `${title} | ${site.name}`
    : `${site.name} – ${site.tagline}`
  const canonical = `${site.siteUrl}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${site.siteUrl}${ogImage}`} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content="en_PK" />
      <meta property="og:site_name" content={site.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
