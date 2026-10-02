# Khan Autos — Static Automotive Workshop Website

A fast, responsive single-page website for Khan Autos, covering EFI general tuning, vehicle repairs and restoration, and spare parts.

## Tech stack

- Plain semantic HTML
- Plain CSS with design tokens
- Plain JavaScript with progressive enhancement
- GSAP + ScrollTrigger loaded as an optional CDN enhancement for the tuning showcase and reveal animations
- Native IntersectionObserver fallbacks when GSAP is unavailable

## Quick start

```bash
npm install
npm run dev
npm run build
npm run preview
```

The production site is written to `dist/`.

## Business details — `site.config.js`

**All contact details live in one file: `site.config.js`.** Edit it, then run `npm run build` (or `npm run dev`).

A small Vite plugin in `vite.config.js` replaces every `{{site.*}}` token in `index.html` at build time, so the real values are baked into the shipped HTML, the `<title>`, the canonical/Open Graph tags, and the `AutoRepair` JSON-LD. There is no runtime JavaScript involved, so the details are correct for search engines and for visitors with JS disabled.

The file currently ships pre-filled with the values already curated in `src/data/site.js`. Two things to confirm:

- **Opening hours conflict.** The old static markup said `Mon–Sat, 9:00 AM–7:00 PM`; `src/data/site.js` says `Sat–Thu, 9:00 AM–9:00 PM`. The config uses the `src/data/site.js` version. Change `hours` and `hoursSchema` if that is wrong.
- **Social links are empty.** Leave a social URL as `''` and its icon stays visible but inert (the link is `href="#"` and click-disabled). Paste a full URL and the link, the `aria-label`, and the JSON-LD `sameAs` list all activate.

### Fields

| Field | Used for |
| --- | --- |
| `name`, `tagline`, `slogan` | `<title>`, footer, brand copy |
| `phone` | Display text, JSON-LD `telephone` |
| `phoneRaw` | `tel:` links — digits with country code, no spaces |
| `whatsappNumber` | `wa.me` links — digits with country code, no spaces |
| `email` | `mailto:` links, contact card, JSON-LD |
| `addressShort` | Compact spots such as the footer |
| `addressFull` | Contact card and map panel |
| `street`, `city`, `region`, `postalCode`, `country` | JSON-LD `PostalAddress` |
| `mapsUrl` | "Open in Google Maps" button |
| `hours` | Human-readable opening hours |
| `hoursSchema` | `openingHours` and `openingHoursSpecification` — `[dayRange, opens, closes]`, 24-hour `HH:MM` |
| `serviceAreaSummary`, `serviceAreas` | Hero text and JSON-LD `areaServed` |
| `social.facebook`, `social.instagram`, `social.youtube` | Social icons and JSON-LD `sameAs` |
| `siteUrl` | Canonical URL, Open Graph URL, JSON-LD `url` |
| `priceRange`, `foundedYear` | JSON-LD `priceRange`, footer "est." line |

### Safety behaviour

Empty values never render as blank space:

- An empty **text** field renders a visible `[ADD PHONE]`-style placeholder.
- An empty **URL** field renders `#` and stays click-disabled, so a half-finished site never links to a dead target.
- `npm run build` prints a warning naming any required field that is still empty, and warns about unknown `{{site.*}}` tokens.

To add a new field, add it to `site.config.js`, add it to `scalarValues` (or `jsonScalarValues`) in `vite.config.js`, and add an optional `textPlaceholders` entry.

## Project structure

```text
index.html                 Page structure, content, showcase imagery, and {{site.*}} tokens
site.config.js             Single source of truth for all business details
styles.css                 Responsive design system and component styles
script.js                  Navigation, showcase controls, reveals, and form demo handler
public/
  images/                  Existing workshop and parts imagery
  favicon.ico              Browser favicon
  robots.txt               Search-engine crawler instructions
  sitemap.xml              Generated canonical homepage URL
scripts/
  generateSitemap.mjs      Regenerates the sitemap during builds
vite.config.js             Static Vite build config + the {{site.*}} replacement plugin
src/                       Previous React source, retained for reference but not loaded
```

## Before launch

1. Confirm every value in `site.config.js`, then run `npm run build`. Phone, WhatsApp, address, hours, and email are wired up from that file; a build with any of them blank prints a warning.
2. Replace the demo workshop, parts, and about images in `public/images/` with final approved photography. The image labels in the page identify the swap points. Replace the showcase center image and all ten step images with licensed photography; each showcase image keeps its intended Unsplash keyword URL in `data-stock-source`, while the active step placeholders use Picsum. The 605A card uses `public/images/cnc-605.png` from the supplied source; confirm reuse rights before launch.
3. Connect `data-contact-form` in `script.js` to a real email, CRM, or form endpoint. The current handler only shows a local confirmation and does not transmit data.
4. Replace the placeholder testimonials with verified customer feedback.
5. Replace the decorative map panel with the approved map embed, or keep it and set `mapsUrl`.
6. Update `siteUrl` in `site.config.js` if the final domain changes, then run `npm run build`.


## Replaceable EFI showcase

The centerpiece is in the `REPLACEABLE SHOWCASE BLOCK` in `index.html`. It currently uses:

- A stock vehicle photo with a local workshop fallback
- CSS diagnostic-zone overlays with zoom, glow, and scan effects
- Ten scroll-controlled diagnostic steps with replaceable equipment imagery
- GSAP ScrollTrigger when available
- CSS sticky positioning on desktop
- A swipeable, scroll-snap card sequence on small screens
- Native IntersectionObserver fallbacks

Replace the photo URLs and `[PLACEHOLDER]` captions with approved, licensed photography before launch. The block can later be replaced with a professional video, Three.js scene, or Spline embed without removing the ten-step text reference section.

## Deployment

### Vercel or Netlify

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite

### cPanel or traditional hosting

1. Run `npm run build`.
2. Upload the contents of `dist/` to `public_html`.
3. Add this rewrite file to `public_html/.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## SEO and accessibility

- The page includes title, description, canonical, Open Graph, favicon, and `AutoRepair` structured data, all driven by `site.config.js` at build time.
- The tuning checklist is rendered as a semantic ordered list for crawlers and assistive technology.
- The showcase has accessible labels, keyboard-focusable progress controls, reduced-motion support, and a text fallback.
- Unset social links stay visible but inert instead of pointing at `#`.
