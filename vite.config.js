import { defineConfig } from 'vite'
import site from './site.config.js'

/**
 * Replaces every `{{site.*}}` token in index.html with values from
 * site.config.js at build time, so the shipped HTML, metadata and JSON-LD
 * contain real values with no runtime JavaScript involved.
 *
 * Two token flavours are supported:
 *   {{site.foo}}      -> HTML-escaped, safe in text nodes and attributes
 *   {{site.json.foo}} -> JSON-escaped, safe inside the ld+json block
 *
 * Empty values never render as a blank:
 *   - empty text field -> a visible [ADD ...] placeholder
 *   - empty URL field  -> "#" (kept inert by data-placeholder-link)
 */

const withTrailingSlash = (url) => {
  const value = String(url ?? '').trim()
  if (!value) return ''
  return value.endsWith('/') ? value : `${value}/`
}

const socialUrls = [site.social?.facebook, site.social?.instagram, site.social?.youtube].map((url) =>
  String(url ?? '').trim(),
)

/** Scalar tokens, keyed by the part that follows `{{site.`. */
const scalarValues = {
  name: site.name,
  tagline: site.tagline,
  slogan: site.slogan,
  priceRange: site.priceRange,
  phone: site.phone,
  phoneRaw: site.phoneRaw,
  whatsappNumber: site.whatsappNumber,
  email: site.email,
  city: site.city,
  region: site.region,
  countryName: site.countryName,
  postalCode: site.postalCode,
  street: site.street,
  addressShort: site.addressShort,
  addressFull: site.addressFull,
  mapsUrl: site.mapsUrl,
  hours: site.hours,
  serviceAreaSummary: site.serviceAreaSummary,
  siteUrl: withTrailingSlash(site.siteUrl),
  foundedYear: site.foundedYear,
  facebook: site.social?.facebook,
  instagram: site.social?.instagram,
  youtube: site.social?.youtube,
}

/** Tokens that must become "#" when unset, so the link stays inert. */
const urlKeys = new Set([
  'phoneRaw',
  'whatsappNumber',
  'mapsUrl',
  'siteUrl',
  'facebook',
  'instagram',
  'youtube',
])

/** Human-readable placeholder per text token, used when the value is empty. */
const textPlaceholders = {
  name: '[ADD BUSINESS NAME]',
  tagline: '[ADD TAGLINE]',
  slogan: '[ADD SLOGAN]',
  phone: '[ADD PHONE]',
  email: '[ADD EMAIL]',
  city: '[ADD CITY]',
  region: '[ADD REGION]',
  countryName: '[ADD COUNTRY]',
  postalCode: '[ADD POSTAL CODE]',
  street: '[ADD STREET]',
  addressShort: '[ADD ADDRESS]',
  addressFull: '[ADD ADDRESS]',
  hours: '[ADD HOURS]',
  serviceAreaSummary: '[ADD SERVICE AREA]',
}

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const escapeJson = (value) => JSON.stringify(String(value ?? '')).slice(1, -1)

/** Whole-JSON-value tokens: these expand to a complete array, quotes included. */
const jsonArrayTokens = {
  'site.json.areaServed': () => JSON.stringify(site.serviceAreas?.filter(Boolean) ?? []),
  'site.json.openingHours': () =>
    JSON.stringify(
      (site.hoursSchema ?? [])
        .filter(([days, opens, closes]) => days && opens && closes)
        .map(([days, opens, closes]) => `${days} ${opens}-${closes}`),
    ),
  'site.json.openingHoursSpecification': () =>
    JSON.stringify(
      (site.hoursSchema ?? [])
        .filter(([days, opens, closes]) => days && opens && closes)
        .map(([days, opens, closes]) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: days,
          opens,
          closes,
        })),
    ),
  'site.json.sameAs': () => JSON.stringify(socialUrls.filter(Boolean)),
}

/** Scalar JSON tokens, escaped for the ld+json block. */
const jsonScalarValues = {
  'site.json.name': site.name,
  'site.json.description': site.tagline,
  'site.json.url': withTrailingSlash(site.siteUrl),
  'site.json.telephone': site.phone,
  'site.json.email': site.email,
  'site.json.street': site.street,
  'site.json.locality': site.city,
  'site.json.region': site.region,
  'site.json.postalCode': site.postalCode,
  'site.json.country': site.country,
  'site.json.priceRange': site.priceRange,
}

const scalarPattern = /\{\{site\.([a-zA-Z0-9]+)\}\}/g
const jsonScalarPattern = /\{\{site\.json\.([a-zA-Z0-9]+)\}\}/g

// Array tokens expand to a complete JSON value, so they must be consumed
// before the scalar pass: the scalar pattern would otherwise also match
// them (e.g. `{{site.json.areaServed}}`) and replace them with an empty string.
function applyJsonArrays(html) {
  return Object.entries(jsonArrayTokens).reduce(
    (result, [token, build]) => result.replaceAll(`{{${token}}}`, build()),
    html,
  )
}

function applyJsonScalars(html) {
  return html.replace(jsonScalarPattern, (match, key) => {
    const fullKey = `site.json.${key}`
    if (Object.hasOwn(jsonArrayTokens, fullKey)) return match
    return escapeJson(jsonScalarValues[fullKey] ?? '')
  })
}

function applyScalars(html) {
  return html.replace(scalarPattern, (match, key) => {
    const value = String(scalarValues[key] ?? '').trim()
    if (!value) return urlKeys.has(key) ? '#' : (textPlaceholders[key] ?? '')
    return escapeHtml(value)
  })
}

/** Fields that should be filled in before the site goes live. */
const requiredKeys = ['name', 'phone', 'phoneRaw', 'whatsappNumber', 'email', 'addressFull', 'hours', 'mapsUrl']

function siteDetails() {
  return {
    name: 'khan-autos-site-details',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        // NOTE: Vite 6 calls this handler detached from the plugin context, so
        // `this.warn` is not available here. Use console.warn instead.
        const missing = requiredKeys.filter((key) => !String(scalarValues[key] ?? '').trim())
        if (missing.length > 0) {
          console.warn(
            `\n[site.config.js] Missing required values: ${missing.join(', ')}\n` +
              '[site.config.js] Placeholders will be rendered until they are set.\n',
          )
        }

        const replaced = applyScalars(applyJsonScalars(applyJsonArrays(html)))

        const leftover = replaced.match(/\{\{site\.[^}]*\}\}/g)
        if (leftover) {
          console.warn(
            `\n[site.config.js] Unknown site token(s) in index.html: ${[...new Set(leftover)].join(', ')}\n`,
          )
        }

        // Drop the optional hours note <em> when no note is configured.
        return replaced.replace(/<em>\s*<\/em>/g, '')
      },
    },
  }
}

export default defineConfig({
  plugins: [siteDetails()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
