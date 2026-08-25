const areas = [
  {
    name: 'Taxila',
    slug: 'taxila',
    distanceKm: 6,
    driveTimeMin: 10,
    intro: 'Looking for reliable auto spare parts or expert car tuning just a short drive from Taxila? Khan Autos is only about 6 km away — roughly a 10-minute drive along the Grand Trunk Road. Whether you need genuine parts for your Toyota, Honda, Suzuki, or any other make, or want a precision tune-up, we\'re the closest trusted workshop to Taxila.',
  },
  {
    name: 'Hasan Abdal',
    slug: 'hasan-abdal',
    distanceKm: 9,
    driveTimeMin: 15,
    intro: 'Residents of Hasan Abdal trust Khan Autos for all their auto spare parts and car servicing needs. Situated just 9 km away — about 15 minutes by car — we keep your vehicle running with genuine parts and skilled mechanics. From brake pads to full engine tune-ups, Hasan Abdal drivers know where to go.',
  },
  {
    name: 'Fateh Jang',
    slug: 'fateh-jang',
    distanceKm: 25,
    driveTimeMin: 35,
    intro: 'Fateh Jang vehicle owners looking for affordable, genuine auto spare parts don\'t have to travel far. Khan Autos in Wah Cantt is just 25 km away — approximately a 35-minute drive. We stock parts for all major brands and offer professional car tuning that keeps your engine performing at its best.',
  },
  {
    name: 'Ghurgushti',
    slug: 'ghurgushti',
    distanceKm: 26,
    driveTimeMin: 35,
    intro: 'Need a part replaced or your car serviced near Ghurgushti? Khan Autos is roughly 26 km from Ghurgushti, reachable in about 35 minutes. We carry a wide inventory of genuine spare parts and provide tuning services that Ghurgushti residents rely on for dependable, long-lasting results.',
  },
  {
    name: 'Islamabad',
    slug: 'islamabad',
    distanceKm: 28,
    driveTimeMin: 40,
    intro: 'Islamabad car owners seeking a trusted, affordable alternative to dealership prices visit Khan Autos in Wah Cantt. At just 28 km — around 40 minutes on the motorway — we offer genuine spare parts, professional servicing, and performance tuning at prices that won\'t break the bank.',
  },
  {
    name: 'Hazro',
    slug: 'hazro',
    distanceKm: 29,
    driveTimeMin: 40,
    intro: 'Hazro-based drivers who value quality auto parts and honest mechanical work choose Khan Autos. We\'re approximately 29 km from Hazro, about a 40-minute drive. Our workshop stocks genuine parts for all major vehicle makes and delivers tuning services that keep your car road-ready.',
  },
  {
    name: 'Sanjwal',
    slug: 'sanjwal',
    distanceKm: 29,
    driveTimeMin: 40,
    intro: 'For drivers in Sanjwal, Khan Autos is the go-to destination for genuine auto spare parts and expert car tuning. Located just 29 km away — roughly 40 minutes by road — we combine competitive prices with the kind of workmanship that has earned us a loyal customer base across the region.',
  },
  {
    name: 'Haripur',
    slug: 'haripur',
    distanceKm: 30,
    driveTimeMin: 40,
    intro: 'Haripur residents no longer need to settle for substandard parts or overpriced dealership service. Khan Autos in Wah Cantt is only 30 km away — about 40 minutes on the road — and we stock genuine parts for Suzuki, Toyota, Honda, and more, alongside comprehensive car tuning and servicing.',
  },
  {
    name: 'Saidpur',
    slug: 'saidpur',
    distanceKm: 30,
    driveTimeMin: 40,
    intro: 'Saidpur vehicle owners trust Khan Autos for prompt, professional auto parts supply and car servicing. We\'re located approximately 30 km from Saidpur, a drive of around 40 minutes. Our team ensures you get the right part the first time, backed by honest pricing and solid mechanical expertise.',
  },
  {
    name: 'Topi',
    slug: 'topi',
    distanceKm: 31,
    driveTimeMin: 45,
    intro: 'Topi drivers looking for genuine spare parts without the hassle of long-distance travel will find Khan Autos conveniently located just 31 km away. The roughly 45-minute drive is well worth it for access to our extensive parts inventory, skilled tuning, and the kind of customer care that keeps you coming back.',
  },
  {
    name: 'Rawalpindi',
    slug: 'rawalpindi',
    distanceKm: 34,
    driveTimeMin: 45,
    intro: 'Rawalpindi car owners who want genuine parts at fair prices and tuning work done right choose Khan Autos in Wah Cantt. At 34 km — about 45 minutes via the GT Road or motorway — we offer a full-service workshop experience without the big-city markup.',
  },
  {
    name: 'Kamra',
    slug: 'kamra',
    distanceKm: 34,
    driveTimeMin: 45,
    intro: 'Kamra residents rely on Khan Autos for all their auto spare parts and car servicing needs. We\'re just 34 km from Kamra — a 45-minute drive — and we stock parts for every major brand. Whether it\'s routine maintenance or performance tuning, Kamra drivers know they can count on us.',
  },
  {
    name: 'Attock',
    slug: 'attock',
    distanceKm: 36,
    driveTimeMin: 50,
    intro: 'Attock vehicle owners seeking genuine auto parts and professional tuning services make the worthwhile 36-km trip to Khan Autos in Wah Cantt. The drive takes about 50 minutes, and you\'ll find a well-stocked workshop with experienced mechanics who treat every car like their own.',
  },
  {
    name: 'Khalabat',
    slug: 'khalabat',
    distanceKm: 35,
    driveTimeMin: 50,
    intro: 'Drivers in Khalabat have a trusted auto parts and tuning specialist just 35 km away at Khan Autos, Wah Cantt. The approximately 50-minute drive gets you access to genuine parts for all vehicle makes, honest diagnostics, and tuning work that keeps your engine running smooth and efficient.',
  },
  {
    name: 'Zaida',
    slug: 'zaida',
    distanceKm: 37,
    driveTimeMin: 50,
    intro: 'Zaida-based vehicle owners no longer need to worry about finding genuine spare parts or reliable tuning services nearby. Khan Autos is roughly 37 km from Zaida — about a 50-minute drive — and our workshop is fully equipped to handle everything from basic servicing to complex performance tuning.',
  },
  {
    name: 'Swabi',
    slug: 'swabi',
    distanceKm: 42,
    driveTimeMin: 55,
    intro: 'Swabi residents trust Khan Autos as their preferred auto spare parts supplier and car tuning workshop. At 42 km from Swabi — roughly a 55-minute drive — we make the trip worthwhile with competitive pricing, a vast inventory of genuine parts, and the kind of expert mechanical service that builds lasting trust.',
  },
]

export default areas

export function getAreaBySlug(slug) {
  return areas.find((a) => a.slug === slug)
}
