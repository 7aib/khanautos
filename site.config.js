/**
 * Khan Autos — single source of truth for business details.
 *
 * EDIT THIS FILE, THEN RUN `npm run build` (or `npm run dev`).
 * Every `{{site.*}}` token in index.html is replaced at build time, so the
 * values below end up in the shipped HTML, metadata, and JSON-LD.
 *
 * Rules:
 *  - Leave a text field empty ('') and a visible [ADD ...] placeholder is
 *    rendered instead, so nothing silently disappears.
 *  - Leave a URL field empty ('') and the link stays inert (#) and is
 *    click-disabled, so a half-finished site never links to a dead target.
 *  - phoneRaw / whatsappNumber must be digits with country code and no
 *    spaces or symbols, because they are used in tel: and wa.me links.
 */

const site = {
  // ---------------------------------------------------------------- identity
  name: 'Khan Autos',
  tagline: 'Genuine auto spare parts & expert car tuning in Wah Cantt',
  slogan: 'Straight answers before any work begins.',
  priceRange: 'PKR',

  // ----------------------------------------------------------------- contact
  /** Human-readable, exactly as you want it displayed. */
  phone: '+92 3083 888872',
  /** Digits only with country code, e.g. 923083888872. Used for tel: links. */
  phoneRaw: '923083888872',
  /** Digits only with country code, e.g. 923083888872. Used for wa.me links. */
  whatsappNumber: '923083888872',
  email: 'contact@khanautos.store',

  // ---------------------------------------------------------------- location
  city: 'Wah Cantt',
  region: 'Punjab',
  countryName: 'Pakistan',
  /** ISO 3166-1 alpha-2, used by JSON-LD. */
  country: 'PK',
  postalCode: '47040',
  /** Street line only, used by JSON-LD. */
  street: 'Main GT Road',
  /** One-line address for compact spots like the footer. */
  addressShort: 'Wah Cantt, Punjab, Pakistan',
  /** Full address for the contact card and map panel. */
  addressFull: 'Main GT Road, Wah Cantt, Punjab 47040, Pakistan',
  /** Google Maps link for the "Open in Google Maps" button. */
  mapsUrl: 'https://maps.google.com/?q=33.7572152426913,72.7391839660532',

  // ------------------------------------------------------------------ hours
  /** Human-readable opening hours. */
  hours: 'Sat–Thu, 9:00 AM – 9:00 PM',
  /**
   * schema.org opening hours, in HH:MM 24-hour form.
   * Format: [DayRange, opens, closes]. Use a comma for multiple entries.
   * https://schema.org/openingHoursSpecification
   */
  hoursSchema: [['Sa-Th', '09:00', '21:00']],

  // ------------------------------------------------------------- service area
  /** Short line for the hero. */
  serviceAreaSummary: 'serving Taxila, Hasan Abdal & nearby',
  /** Full list, used by JSON-LD areaServed. */
  serviceAreas: ['Wah Cantt', 'Taxila', 'Hasan Abdal', 'Rawalpindi', 'Islamabad', 'Attock'],

  // ----------------------------------------------------------------- socials
  /** Paste full URLs. Leave '' to keep the icon visible but inert. */
  social: {
    facebook: '',
    instagram: '',
    youtube: '',
  },

  // -------------------------------------------------------------------- site
  /** Canonical origin, no trailing slash. */
  siteUrl: 'https://khanautos.store',
  /** Optional year the workshop opened. Leave '' to hide it. */
  foundedYear: '2005',
}

export default site
