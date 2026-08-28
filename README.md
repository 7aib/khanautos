# Khan Autos — Auto Spare Parts & Car Tuning Website

React + Vite website for Khan Autos, a combined auto spare parts shop and car tuning/servicing workshop based in Wah Cantt, Punjab, Pakistan.

## Quick Start

```bash
npm install
npm run dev       # Dev server at http://localhost:5173
npm run build     # Production build to dist/
npm run preview   # Preview the production build locally
```

## Adding Real Photos

1. Place images in `public/images/` (e.g., `public/images/workshop-front.jpg`)
2. In the component file, find the placeholder `<div>` and replace it with an `<img>` tag:

```jsx
// Before (placeholder)
<div className="hero__placeholder">Workshop Photo Placeholder</div>

// After (real photo)
<img
  src="/images/workshop-front.jpg"
  alt="Car tuning workshop in Wah Cantt"
  loading="lazy"
  width="1200"
  height="600"
/>
```

## Displaying Real Google Reviews

The homepage reviews section fetches your real Google reviews live, for free, using the Places API on the same API key in `.env`.

### 1. Find your Google Place ID
Search your business on Google Maps, open the URL, and the Place ID is the long `ChI...` string. Or use Google's [Place ID finder](https://developers.google.com/maps/documentation/places/web-service/place-id):
1. Go to the Place ID finder
2. Search your business name + "Wah Cantt"
3. Copy the `place_id` value (starts with `ChIJ...`)

### 2. Enable the Places API (New)
In your Google Cloud Console:
1. Go to "APIs & Services" → "Library"
2. Enable **"Places API (New)"** (in addition to Maps JavaScript API / Embed API)
3. Your API key in `.env` must be unrestricted or include this API

### 3. Add the Place ID to the site

```js
// src/data/site.js
placeId: 'ChIJxxxxxxxxxxxxxxxxxxxxxxxxx',  // ← Paste yours here
```

That's it — the reviews will load automatically on the homepage. If the Place ID is missing or the API fails, the reviews section quietly hides itself (no broken UI).

> Note: Google returns up to 5 reviews and requires "Powered by Google" attribution, which the component shows automatically.

## Updating Phone Number, Business Hours & Contact Info

All business info is in **one file**: `src/data/site.js`

```js
// src/data/site.js
const site = {
  name: 'Khan Autos',
  phone: '+92 300 0000000',    // ← Update here
  phoneRaw: '923000000000',     // ← For tel: links (no spaces, no +)
  whatsapp: '923000000000',     // ← For wa.me links
  email: 'info@khanautos.pk',   // ← Update here
  openingHours: 'Mon–Sat: 9:00 AM – 8:00 PM',  // ← Update here
  // ...
}
```

Also update `public/sitemap.xml` with the real domain URL.

## Adding a New Area Page

Edit `src/data/areas.js` and add a new entry to the array:

```js
{
  name: 'New Town',
  slug: 'new-town',              // URL will be /areas/new-town
  distanceKm: 20,
  driveTimeMin: 30,
  intro: 'Unique intro paragraph about servicing near New Town...',
}
```

Then add the corresponding entry in `public/sitemap.xml`:

```xml
<url>
  <loc>https://khanautos.pk/areas/new-town</loc>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

That's it — the area page is generated automatically from the data.

## Project Structure

```
src/
  data/
    site.js          ← Business info (phone, address, hours, etc.)
    areas.js         ← 16 area pages data (add new towns here)
  components/
    Header.jsx       ← Sticky header with nav + CTA buttons
    Footer.jsx       ← Footer with NAP, links, area list
    StickyCTA.jsx    ← Mobile bottom bar (Call + WhatsApp)
    SEO.jsx          ← Per-page meta tags via react-helmet-async
    MapEmbed.jsx     ← Google Maps embed
    Logo.jsx         ← Text-based wordmark (swap for image later)
    ServiceCard.jsx  ← Service card component
    AreaCard.jsx     ← Area card component
    Breadcrumb.jsx   ← Breadcrumb navigation
    Section.jsx      ← Reusable section wrapper
  pages/
    Home.jsx         ← Homepage with hero, services, areas, map
    Services.jsx     ← Detailed services page
    AreasIndex.jsx   ← Grid of all 16 areas
    AreaPage.jsx     ← Individual area page (template)
    About.jsx        ← About the shop
    Contact.jsx      ← Contact form + map
  styles/
    global.css       ← CSS variables, reset, base styles
public/
  sitemap.xml        ← XML sitemap for all routes
  robots.txt         ← Robots file
```

## Deployment

### Vercel / Netlify
1. Push to GitHub
2. Connect the repo to Vercel or Netlify
3. Framework preset: Vite
4. Build command: `npm run build`
5. Output directory: `dist`

### cPanel / Traditional Hosting
1. Run `npm run build`
2. Upload the contents of `dist/` to your `public_html` folder
3. Add this `.htaccess` file in `public_html/` for clean URLs:

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

## Tech Stack

- React 18 + Vite
- React Router 6 (BrowserRouter)
- react-helmet-async (SEO meta tags)
- Framer Motion (subtle animations)
- Plain CSS with custom properties
