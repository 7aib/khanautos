import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import site from '../src/data/site.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const base = site.siteUrl.replace(/\/$/, '')

const routes = [
  { path: '/', priority: 1.0, freq: 'weekly' },
]

const urlset = routes
  .map(
    (r) => `  <url>
    <loc>${base}${r.path}</loc>
    <changefreq>${r.freq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`

const out = path.join(__dirname, '..', 'public', 'sitemap.xml')
writeFileSync(out, xml)

console.log(`Sitemap generated at ${out} — ${routes.length} URLs under ${base}`)