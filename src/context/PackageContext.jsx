import React, { createContext, useState, useEffect, useContext } from 'react';

const PackageContext = createContext();

// Sample Seed Packages — kept here as reference data only.
// This array is no longer used to populate the app at runtime (the backend now
// owns that data), but it's useful if you want to bulk-load these exact
// packages into Postgres via a Django data migration or admin import.
const SEED_PACKAGES = [
  {
    id: 'spiti-valley',
    name: 'Spiti Valley Snowcat Escape',
    category: 'Adventure',
    destination: 'Himachal Pradesh',
    days: 7,
    nights: 6,
    price: 34900,
    shortDescription: 'A mesmerizing winter expedition to the land of lamas, monasteries, and frozen rivers.',
    hotelDetails: 'Premium cozy homestays & mountain boutique guesthouses',
    meals: 'Daily Breakfast & Dinner included (local organic cuisine)',
    transportation: '4x4 Snowcat-ready SUV for all transfers and mountain routes',
    sightseeing: 'Key Monastery, Hikkim (Highest Post Office), Komic, Langza, and Dhankar Lake',
    specialOffer: 'Early Bird Offer: Get ₹2,000 off per person for bookings done 30 days in advance!',
    inclusions: [
      'Accommodation in premium homestays on twin-sharing basis',
      'All local transfers in dedicated 4x4 SUVs',
      'Daily breakfast and dinner',
      'All inner line permits and local entry fees',
      'Experienced trip leader and local spot guides',
      'Medical oxygen and emergency first-aid kit'
    ],
    exclusions: [
      'Flights/trains to and from Chandigarh/Shimla',
      'Lunch on all days and personal snacks',
      'Water sports, adventure activities, or rental gear',
      'Tips, gratuities, laundry, or porter services',
      'Travel insurance and medical emergencies'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Shimla & Drive to Kalpa', details: 'Arrive in Shimla. Board the SUV and embark on a beautiful drive to Kalpa. Check in at your homestay, acclimatize to the altitude, and enjoy a warm local dinner.' },
      { day: 2, title: 'Kalpa to Kaza via Tabo Monastery', details: 'Travel along the rugged Satluj river and enter Spiti Valley. Visit the ancient Tabo Monastery, a UNESCO heritage site, before reaching the town of Kaza.' },
      { day: 3, title: 'Key Monastery & Kibber High-Altitude Exploration', details: 'Visit the iconic Key Monastery, perched on a hilltop. Drive to Kibber, one of the highest inhabited villages in the world, and look out for Himalayan wildlife.' },
      { day: 4, title: 'High Post Office in Hikkim, Komic & Langza', details: 'Drive to Hikkim to mail a letter from the world’s highest post office. Visit Komic (highest village connected by motorable road) and Langza to see the giant Buddha statue.' },
      { day: 5, title: 'Excursion to Dhankar Monastery & Pin Valley', details: 'Explore the cliffside Dhankar Monastery, overlooking the confluence of Spiti and Pin rivers. Walk around Pin Valley National Park and experience pristine alpine ecology.' },
      { day: 6, title: 'Scenic Drive Back from Kaza to Kalpa/Sangla', details: 'Begin the return journey. Drive back to the green valleys of Kinnaur, enjoying the changing landscapes from stark cold desert to dense pine forests.' },
      { day: 7, title: 'Return Drive to Shimla & Departure', details: 'After early breakfast, drive back to Shimla to catch your evening transport home with beautiful memories of Spiti.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'andaman-horizon',
    name: 'Andaman Blue Horizon',
    category: 'Beach',
    destination: 'Andaman Islands',
    days: 6,
    nights: 5,
    price: 42900,
    shortDescription: 'Explore the turquoise waters, pristine white sands, and historical landmarks of Havelock and Neil Islands.',
    hotelDetails: '4-star beachfront resort (Havelock) & eco-cabins (Neil Island)',
    meals: 'Daily Buffet Breakfast included at all hotels & resorts',
    transportation: 'Private AC vehicle for land transfers, premium cruise ferry for inter-island journeys',
    sightseeing: 'Radhanagar Beach, Cellular Jail Light & Sound Show, Elephant Beach boat ride, Bharatpur Beach',
    specialOffer: 'Honeymoon Special: Complimentary candle-lit dinner and room decoration!',
    inclusions: [
      'Beachfront resort accommodation (twin sharing)',
      'Inter-island transfers via premium private cruise ferry (Nautika/Makruzz)',
      'All sightseeing and land transfers in private AC cab',
      'Daily breakfast at all hotels',
      'Entry tickets, permits, and boat charges for Elephant Beach',
      'Meet and greet assistance at Port Blair airport'
    ],
    exclusions: [
      'Airfare to and from Port Blair',
      'Lunch and dinner meals',
      'Optional water sports (Scuba diving, Sea Walk, Jet ski)',
      'Personal expenses, tips, and drinks',
      'Camera charges at sightseeing spots'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Port Blair & Cellular Jail Show', details: 'Arrive at Veer Savarkar Airport, Port Blair. Transfer to hotel. In the afternoon, visit Cellular Jail and watch the patriotic Light & Sound Show in the evening.' },
      { day: 2, title: 'Cruise to Havelock & Radhanagar Beach', details: 'Board the morning cruise ferry to Havelock Island. Check in to your beach resort. Spend a relaxed afternoon at Radhanagar Beach, rated among Asia’s best beaches.' },
      { day: 3, title: 'Elephant Beach Boat Ride & Snorkeling', details: 'Take a speed boat to Elephant Beach. Enjoy a complimentary session of snorkeling and experience the colorful coral reefs and marine life.' },
      { day: 4, title: 'Cruise to Neil Island & Natural Bridge Visit', details: 'Board the ferry to Neil Island. Visit the natural rock formations (Natural Bridge), Laxmanpur Beach for sunset, and Bharatpur Beach.' },
      { day: 5, title: 'Neil Island Sunrise & Return to Port Blair', details: 'Enjoy a serene morning at Neil Island. Cruise back to Port Blair in the afternoon. Evening at leisure for shopping local handicrafts.' },
      { day: 6, title: 'Departure Flight from Port Blair', details: 'After breakfast, check out from the hotel. Transfer to the airport for your onward flight with wonderful island memories.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1589979482837-e74f2e145060?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'swiss-postcard',
    name: 'Swiss Postcard Trail',
    category: 'International',
    destination: 'Switzerland',
    days: 8,
    nights: 7,
    price: 129900,
    shortDescription: 'Journey through the heart of the Alps, visiting Zurich, Lucerne, Interlaken, and the majestic Jungfraujoch.',
    hotelDetails: 'Alpine boutique hotels with panoramic mountain views',
    meals: 'Swiss continental breakfast daily at all hotels',
    transportation: '8-day 2nd Class Swiss Travel Pass for unlimited train, bus, and boat rides',
    sightseeing: 'Mount Titlis cable car, Jungfraujoch (Top of Europe) train ride, Lake Lucerne boat cruise',
    specialOffer: 'Swiss Pass Upgrade: Free upgrade to 1st Class Swiss Pass for bookings before September 30!',
    inclusions: [
      '7 nights accommodation in carefully selected alpine hotels',
      '8-day consecutive Swiss Travel Pass (2nd Class)',
      'Excursion tickets to Mount Titlis (Revolving Cable Car)',
      'Excursion tickets to Jungfraujoch - Top of Europe',
      'Daily continental breakfast',
      'Local city taxes and tourist fees'
    ],
    exclusions: [
      'International flights to and from Zurich',
      'Lunch, dinner meals, and beverages',
      'Schengen Visa fees and travel insurance',
      'Personal tour guides or optional activities like paragliding',
      'Luggage transfer services between cities'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Zurich & Scenic Train to Lucerne', details: 'Arrive in Zurich. Board the scenic Swiss train directly to Lucerne. Check in to your hotel and spend the evening exploring the Chapel Bridge and historic Old Town.' },
      { day: 2, title: 'Mount Titlis Snow Mountain Excursion', details: 'Take a scenic train to Engelberg, then ride the world’s first revolving cable car, the TITLIS Rotair, to the summit at 3,020 meters. Explore the glacier cave and suspension bridge.' },
      { day: 3, title: 'Lake Lucerne Cruise & Travel to Interlaken', details: 'Enjoy a relaxing 1-hour cruise on Lake Lucerne using your Swiss Pass. Afterwards, take the panorama train route to Interlaken, nestled between two lakes.' },
      { day: 4, title: 'Jungfraujoch - Top of Europe Journey', details: 'Ride the cogwheel train up to Jungfraujoch, the highest railway station in Europe. Experience the Sphinx Observatory deck and walk through the Ice Palace.' },
      { day: 5, title: 'Interlaken Leisure Day & Adventure Options', details: 'A free day to explore Interlaken at your own pace. Optional activities include paragliding over Interlaken, visiting Harder Kulm viewpoint, or taking a boat ride on Lake Brienz.' },
      { day: 6, title: 'GoldenPass Panoramic Express to Montreux', details: 'Board the GoldenPass panoramic train. Travel past Swiss vineyards and mountain passes to the lakeside town of Montreux on Lake Geneva.' },
      { day: 7, title: 'Chillon Castle Tour & Return to Zurich', details: 'Visit the legendary medieval Chillon Castle. Later, take the train back to Zurich for your final night. Enjoy shopping on Bahnhofstrasse.' },
      { day: 8, title: 'Zurich Departure', details: 'Take a short train to Zurich Airport and board your departure flight home.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'singapore-escape',
    name: 'Singapore Escape',
    category: 'International',
    destination: 'Singapore',
    days: 5,
    nights: 4,
    price: 49999,
    shortDescription: 'Explore the modern futuristic city-state of Singapore with gardens, modern skyscrapers and island attractions.',
    hotelDetails: '4-star premium city hotel',
    meals: 'Daily breakfast included',
    transportation: 'AC sedan airport pickup and transfers',
    sightseeing: 'Gardens by the Bay, Marina Bay Sands, Sentosa Island',
    specialOffer: 'Free admission to Sentosa cable car',
    inclusions: [
      '4 nights hotel accommodation',
      'Daily buffet breakfast',
      'All transfers in AC vehicle',
      'Entry tickets to major attractions'
    ],
    exclusions: [
      'Airfare & Visa fees',
      'Lunch & dinner',
      'Personal expenses'
    ],
    itinerary: [
      { day: 1, title: 'Arrival', details: 'Arrive in Singapore. Transfer to hotel.' },
      { day: 2, title: 'City Tour', details: 'Sightseeing of city landmarks.' },
      { day: 3, title: 'Sentosa Island', details: 'Enjoy beaches and views.' },
      { day: 4, title: 'Shopping', details: 'Orchard Road shopping.' },
      { day: 5, title: 'Departure', details: 'Transfer to airport.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'thailand-getaway',
    name: 'Thailand Getaway',
    category: 'International',
    destination: 'Thailand',
    days: 5,
    nights: 4,
    price: 39999,
    shortDescription: 'Discover temples, sandy beaches and vibrant streets in Bangkok and Pattaya.',
    hotelDetails: '4-star beachfront resort in Pattaya & city hotel in Bangkok',
    meals: 'Daily breakfast and Coral Island lunch',
    transportation: 'AC taxi for all inter-city transfers',
    sightseeing: 'Coral Island, Pattaya Viewpoint, Bangkok Temples',
    specialOffer: 'Free ticket to Alcazar Show',
    inclusions: [
      '4 nights stay on twin sharing',
      'Daily breakfast',
      'Coral Island speedboat tour',
      'Airport transfers'
    ],
    exclusions: [
      'Airfare & Visa',
      'Personal laundry & tips'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Pattaya transfer', details: 'Arrive in Bangkok and drive to Pattaya.' },
      { day: 2, title: 'Coral Island', details: 'Enjoy speedboating and beach time.' },
      { day: 3, title: 'Bangkok City Tour', details: 'Drive to Bangkok and see golden temples.' },
      { day: 4, title: 'Leisure Shopping', details: 'Explore local street markets.' },
      { day: 5, title: 'Departure', details: 'Transfer to airport.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'maldives-paradise',
    name: 'Maldives Paradise',
    category: 'International',
    destination: 'Maldives',
    days: 4,
    nights: 3,
    price: 54999,
    shortDescription: 'Unwind in tropical water villas surrounded by crystal clear waters and coral reefs.',
    hotelDetails: 'Beachfront villa at private island resort',
    meals: 'Daily breakfast and dinner included',
    transportation: 'Speedboat return transfers from Male airport',
    sightseeing: 'Snorkeling, island walk, sunset beach session',
    specialOffer: 'Free honeymoon room decoration',
    inclusions: [
      '3 nights stay in deluxe villa',
      'Breakfast & dinner',
      'Return speedboat transfers'
    ],
    exclusions: [
      'Airfare',
      'Water sports equipment hire'
    ],
    itinerary: [
      { day: 1, title: 'Arrival', details: 'Transfer from airport via speedboat.' },
      { day: 2, title: 'Reef Snorkeling', details: 'Swim with marine life in clear waters.' },
      { day: 3, title: 'Sunset Dolphin Cruise', details: 'Relaxing boat ride at sunset.' },
      { day: 4, title: 'Departure', details: 'Check out and transfer back.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'bali-tropical-escape',
    name: 'Bali Tropical Escape',
    category: 'International',
    destination: 'Bali, Indonesia',
    days: 5,
    nights: 4,
    price: 44999,
    shortDescription: 'Experience Bali with serene beaches, ancient temples, lush rice fields, and rich culture.',
    hotelDetails: 'Cozy private villa with pool access',
    meals: 'Daily breakfast included',
    transportation: 'Dedicated driver with AC vehicle',
    sightseeing: 'Uluwatu Temple, Ubud Monkey Forest, Tegallalang Rice Terrace',
    specialOffer: 'Free authentic Balinese massage session',
    inclusions: [
      '4 nights in private pool villa',
      'Daily breakfast',
      'All local transfers with private driver'
    ],
    exclusions: [
      'International flights & visa fees',
      'Personal tips and expenses'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Bali', details: 'Meet driver and transfer to private pool villa.' },
      { day: 2, title: 'Ubud Tour & Rice Terraces', details: 'Explore Ubud culture and rice terraces.' },
      { day: 3, title: 'Temple & Beach Sunset', details: 'Visit Uluwatu temple overlooking the ocean.' },
      { day: 4, title: 'Leisure Day', details: 'Relax at beach or try local food.' },
      { day: 5, title: 'Departure', details: 'Transfer to airport.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'kerala-backwater-escape',
    name: 'Kerala Backwater Escape',
    category: 'India',
    destination: 'Kerala',
    days: 5,
    nights: 4,
    price: 24999,
    shortDescription: 'Relax on a private houseboat and tour Munnar\'s spice gardens and green valleys.',
    hotelDetails: 'Premium homestays & backwater deluxe houseboat',
    meals: 'Daily breakfast, all meals on houseboat',
    transportation: 'Private AC sedan transfers',
    sightseeing: 'Munnar Tea Museum, Alleppey houseboats',
    specialOffer: 'Free spice plantation guided tour',
    inclusions: [
      '4 nights quality room accommodations',
      'Daily breakfast at hotels, plus full meals on Houseboat',
      'Private AC sedan for all sightseeings'
    ],
    exclusions: [
      'Flight/Train tickets to Kochi',
      'Personal expenses, tips'
    ],
    itinerary: [
      { day: 1, title: 'Kochi Arrival & Drive to Munnar', details: 'Arrive at Kochi Airport. Board your cab and drive past waterfalls to Munnar.' },
      { day: 2, title: 'Munnar Tea Garden Tour', details: 'Visit Eravikulam National Park and the Tea Museum.' },
      { day: 3, title: 'Drive to Thekkady Spice Hills', details: 'Take a guided walking tour of a spice plantation.' },
      { day: 4, title: 'Alleppey Houseboat Check-in', details: 'Board your traditional houseboat and cruise past palm-fringed canals.' },
      { day: 5, title: 'Departure Flight', details: 'Check out from the houseboat and transfer to Kochi Airport.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'himachal-mountain-escape',
    name: 'Himachal Mountain Escape',
    category: 'India',
    destination: 'Himachal Pradesh',
    days: 6,
    nights: 5,
    price: 27999,
    shortDescription: 'Journey through cold mountain air, Solang Valley and ancient pine forests.',
    hotelDetails: 'Cozy mountainside boutique hotel',
    meals: 'Daily breakfast and dinner',
    transportation: 'Dedicated SUV driver transfers',
    sightseeing: 'Hadimba Temple, Solang valley adventure spots',
    specialOffer: 'Free snow activity gear hire',
    inclusions: [
      '5 nights hotel stay in deluxe rooms',
      'Daily breakfast and dinner at the hotel',
      'Private AC sedan for all transfers and sightseeing'
    ],
    exclusions: [
      'Train/Flight tickets to Chandigarh/Kullu',
      'Personal consumption'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Transfer to Manali', details: 'Arrive at Chandigarh. Transfer to Manali by road.' },
      { day: 2, title: 'Manali Local City Sightseeing', details: 'Visit Hadimba Temple and Vashisht Hot Springs.' },
      { day: 3, title: 'Solang Valley Excursion', details: 'Spend the day at Solang Valley, famous for adventure sports.' },
      { day: 4, title: 'Atal Tunnel & Sissu Excursion', details: 'Drive through the Atal Tunnel to Sissu/Lahaul Valley.' },
      { day: 5, title: 'Leisure and Local Exploration', details: 'Explore local markets for handicrafts and fresh apples.' },
      { day: 6, title: 'Departure', details: 'Drive back to Chandigarh airport.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'rajasthan-heritage-journey',
    name: 'Rajasthan Heritage Journey',
    category: 'India',
    destination: 'Rajasthan',
    days: 6,
    nights: 5,
    price: 29999,
    shortDescription: 'Live the royal era in fortress palaces in Jaipur and lakes in Udaipur.',
    hotelDetails: 'Authentic palace-style heritage resort',
    meals: 'Daily Rajasthani breakfast',
    transportation: 'Dedicated AC taxi sightseeing',
    sightseeing: 'Amber Fort, Lake Pichola boating, Hawa Mahal',
    specialOffer: 'Complimentary traditional folk dance show entry',
    inclusions: [
      '5 nights stay in curated heritage hotels',
      'Daily buffet breakfast at hotels',
      'Private AC cab for all transfers and tours'
    ],
    exclusions: [
      'Flight/Train tickets to Jaipur/Udaipur',
      'Monument tickets'
    ],
    itinerary: [
      { day: 1, title: 'Jaipur Arrival & City Palace', details: 'Arrive in the Pink City, Jaipur. Visit City Palace.' },
      { day: 2, title: 'Amber Fort & Drive to Jodhpur', details: 'Visit Amber Fort. Drive to Jodhpur in the afternoon.' },
      { day: 3, title: 'Mehrangarh Fort & Drive to Udaipur', details: 'Explore Mehrangarh Fort. Drive down to Udaipur.' },
      { day: 4, title: 'Udaipur Pichola & Palaces', details: 'Explore Udaipur City Palace and enjoy Lake Pichola.' },
      { day: 5, title: 'Leisure Day', details: 'A free day to walk around lakes and cafes.' },
      { day: 6, title: 'Departure', details: 'Transfer to Udaipur Airport.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'goa-beach-escape',
    name: 'Goa Beach Escape',
    category: 'India',
    destination: 'Goa',
    days: 5,
    nights: 4,
    price: 21999,
    shortDescription: 'Soak up the sun on golden sands, tour historic Portuguese churches, and enjoy spice plantations.',
    hotelDetails: 'Beachfront eco-resort with pool access',
    meals: 'Daily buffet breakfast',
    transportation: 'Dedicated AC transfers',
    sightseeing: 'Baga Beach, Calangute Beach, Old Goa Churches, Spice Plantation',
    specialOffer: 'Complimentary sunset boat cruise ticket',
    inclusions: [
      '4 nights beach resort accommodation',
      'Daily buffet breakfast',
      'Full day North Goa and South Goa tours'
    ],
    exclusions: [
      'Flight/Train tickets to Goa',
      'Water sports'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Goa', details: 'Arrive at Goa Airport. Transfer to beach resort.' },
      { day: 2, title: 'North Goa Beach Tour', details: 'Visit Baga, Calangute, and Anjuna beaches.' },
      { day: 3, title: 'South Goa Heritage Tour', details: 'Visit Basilica of Bom Jesus, Mangueshi Temple, and Miramar beach.' },
      { day: 4, title: 'Spice Plantation Visit', details: 'Tour guided organic spice farm with traditional buffet lunch.' },
      { day: 5, title: 'Departure', details: 'Transfer to airport.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  }
];

// Django sends snake_case field names (is_active, short_description, etc.)
// and represents images as [{image: url, order: n}, ...]. The rest of this
// app (Home.jsx, PackageCard.jsx, PackageDetail.jsx, OwnerDashboard.jsx) was
// built against the old localStorage shape, which used camelCase and a flat
// array of image URL strings. Rather than rewriting every component, these
// two functions translate at the boundary, once, right here.
const normalizeFromApi = (apiPkg) => ({
  id: apiPkg.id,
  slug: apiPkg.slug,
  name: apiPkg.name,
  category: apiPkg.category,
  destination: apiPkg.destination,
  days: apiPkg.days,
  nights: apiPkg.nights,
  price: apiPkg.price,
  shortDescription: apiPkg.short_description,
  hotelDetails: apiPkg.hotel_details,
  meals: apiPkg.meals,
  transportation: apiPkg.transportation,
  sightseeing: apiPkg.sightseeing,
  specialOffer: apiPkg.special_offer,
  // Guard against inclusions/exclusions being saved as an object instead of
  // an array in Django Admin — components call .map() on these and will
  // crash on a plain object. Enter them as a JSON list in the admin, e.g.
  // ["Breakfast", "Airport transfer"], not {"name": "..."}.
  inclusions: Array.isArray(apiPkg.inclusions) ? apiPkg.inclusions : [],
  exclusions: Array.isArray(apiPkg.exclusions) ? apiPkg.exclusions : [],
  itinerary: apiPkg.itinerary || [],
  images: (apiPkg.images || []).map(img => (typeof img === 'string' ? img : img.image)),
  isFeatured: apiPkg.is_featured,
  isActive: apiPkg.is_active,
});

// Reverse direction — used when the Owner Dashboard form (still camelCase)
// sends a package to the API.
const normalizeToApi = (pkg) => ({
  name: pkg.name,
  category: pkg.category,
  destination: pkg.destination,
  days: pkg.days,
  nights: pkg.nights,
  price: pkg.price,
  short_description: pkg.shortDescription,
  hotel_details: pkg.hotelDetails,
  meals: pkg.meals,
  transportation: pkg.transportation,
  sightseeing: pkg.sightseeing,
  special_offer: pkg.specialOffer,
  inclusions: pkg.inclusions,
  exclusions: pkg.exclusions,
  is_featured: pkg.isFeatured,
  is_active: pkg.isActive,
});

export const PackageProvider = ({ children }) => {
  const [packages, setPackages] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  // Load packages from the real backend instead of localStorage.
  useEffect(() => {
    fetch(`${API_URL}/api/packages/`)
      .then(res => res.json())
      .then(data => setPackages(data.map(normalizeFromApi)))
      .catch(err => console.error('Failed to load packages from backend', err));
  }, []);

  // Create
  const addPackage = async (pkg) => {
    const res = await fetch(`${API_URL}/api/packages/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(normalizeToApi(pkg)),
    });
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.detail || `Failed to create package (status ${res.status})`);
    }
    const saved = await res.json();
    const newPkg = normalizeFromApi(saved);
    setPackages(prev => [newPkg, ...prev]);
    return newPkg;
  };

  // Update (send the changed fields; the backend uses `slug` as the lookup key, not `id`)
  const updatePackage = async (updatedPkg) => {
    const res = await fetch(`${API_URL}/api/packages/${updatedPkg.slug}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(normalizeToApi(updatedPkg)),
    });
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.detail || `Failed to update package (status ${res.status})`);
    }
    const saved = await res.json();
    const normalized = normalizeFromApi(saved);
    setPackages(prev => prev.map(p => (p.slug === normalized.slug ? normalized : p)));
  };

  // Delete
  const deletePackage = async (slug) => {
    await fetch(`${API_URL}/api/packages/${slug}/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
    });
    setPackages(prev => prev.filter(p => p.slug !== slug));
  };

  // Toggle Active — implemented as a partial update rather than a separate
  // localStorage-style helper, since every write now goes through the API.
  const togglePackageActive = async (pkg) => {
    await updatePackage({ ...pkg, isActive: !pkg.isActive });
  };

  // Toggle Featured
  const togglePackageFeatured = async (pkg) => {
    await updatePackage({ ...pkg, isFeatured: !pkg.isFeatured });
  };

  return (
    <PackageContext.Provider value={{
      packages,
      addPackage,
      updatePackage,
      deletePackage,
      togglePackageActive,
      togglePackageFeatured
    }}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackages = () => useContext(PackageContext);