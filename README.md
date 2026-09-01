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

## Displaying Google Reviews (Elfsight widget)

The homepage reviews section uses the **Elfsight Google Reviews** free widget.

### 1. Create the widget on Elfsight
1. Go to [elfsight.com](https://elfsight.com) and sign up (free plan available)
2. Choose the **Google Reviews** widget
3. Connect your Google Business Profile for "Khan Autos"
4. Customize appearance to match the dark theme
5. Click **Get the code** — it shows an embed snippet like:

```html
<div class="elfsight-app-YOUR-APP-ID" data-elfsight-app-lazy data-elfsight-app-alias="google-reviews"></div>
```

### 2. Add the app ID to the site

```js
// src/data/site.js
elfsight: {
  appId: 'YOUR-APP-ID',        // ← Paste the app ID from the snippet here
  alias: 'google-reviews',     // ← If your snippet has data-elfsight-app-alias
  platformScript: 'https://static.elfsight.com/platform/platform.js',
  useServiceCore: false,
},
```

The Elfsight platform script loads automatically and the widget appears on the homepage. If `appId` is empty, the widget is skipped entirely.

> The Elfsight free plan includes a small "Powered by Elfsight" badge — upgrading removes it.

## Updating Phone Number, Business Hours & Contact Info

All business info is in **one file**: `src/data/site.js`

```js
// src/data/site.js
const site = {
  name: 'Khan Autos',
  phone: '+92 3083888872',    // ← Update here
  phoneRaw: '923083888872',     // ← For tel: links (no spaces, no +)
  whatsapp: '923083888872',     // ← For wa.me links
  email: 'contact@khanautos.store',   // ← Update here
  openingHours: 'Sat-Thur: 9:00 AM – 9:00 PM',  // ← Update here
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
  <loc>https://khanautos.store/areas/new-town</loc>
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
