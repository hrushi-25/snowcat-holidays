/**
 * Comprehensive static travel packages and itineraries dataset for Snowcat Holidays.
 * Covers all major Indian states and bucket-list international destinations.
 * Includes 3-Star and 5-Star accommodation options and 10% uplifted pricing.
 */

export const STATIC_PACKAGES = [
  // ==========================================
  // KARNATAKA
  // ==========================================
  {
    id: 'karnataka-kumta-gokarna',
    slug: 'kumta-gokarna-coastal-escape',
    name: 'Kumta & Gokarna Coastal Trail & Beach Hopping',
    category: 'Beach & Coastal',
    destination: 'Kumta & Gokarna, Karnataka',
    state: 'Karnataka',
    days: 4,
    nights: 3,
    price: 21890, // 10% uplift from ~19.9k
    shortDescription: 'Discover the untouched golden beaches of Kumta, pristine cliff views, Nirvana Beach, and sacred Gokarna temples.',
    hotelDetails: '3-Star Beach Cottages (Deluxe) & 5-Star Luxury Coastal Eco-Resort options available',
    meals: 'Daily Breakfast and authentic coastal Karnataka Dinners included',
    transportation: 'Dedicated AC private cab for all coastal transfers and sightseeing',
    sightseeing: 'Kumta Nirvana Beach, Mystery Cave, Om Beach, Kudle Beach, Mahabaleshwar Temple, Mirjan Fort',
    specialOffer: 'Complimentary sunset beach bonfire & acoustic music session!',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '3 nights stay in 3-Star Beachfront Deluxe Cottages or 5-Star Eco-Resort',
      'Daily freshly prepared breakfast and coastal dinner',
      'Private AC sedan/SUV for airport/railway transfers and local sightseeing',
      'Guided beach trekking from Om Beach to Half Moon Beach',
      'Entry tickets to Mirjan Fort and temple permits',
      '24/7 dedicated local trip coordinator support'
    ],
    exclusions: [
      'Train / flight tickets to Hubli / Goa / Kumta Railway Station',
      'Lunch meals and personal snacking',
      'Water sports (Jet ski, Banana ride) and surfing rentals',
      'Personal expenses, laundry, and guide gratuities'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Kumta & Nirvana Beach Sunset', details: 'Arrive at Kumta / Gokarna Railway Station. Meet your chauffeur and check in to your beachfront stay. In the afternoon, explore Nirvana Beach and Mystery Cave, ending the day with a serene Arabian Sea sunset.' },
      { day: 2, title: 'Mirjan Fort Heritage & Gokarna Temple Trail', details: 'Visit the historic 16th-century Mirjan Fort with its lush laterite ramparts. Later, head to Gokarna town to visit the revered Mahabaleshwar Temple and sacred Kotitirtha pond.' },
      { day: 3, title: 'Gokarna 5-Beach Trail & Cliffside Sunset', details: 'Embark on a scenic guided beach trek across Om Beach, Kudle Beach, Half Moon Beach, and Paradise Beach. Relax at seaside shacks and enjoy an evening barbecue dinner.' },
      { day: 4, title: 'Morning Beach Walk & Departure', details: 'Enjoy a leisurely breakfast by the sea. Check out and transfer to Kumta or Goa Airport/Railway Station with wonderful memories.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'karnataka-coorg-coffee-hills',
    slug: 'coorg-coffee-highlands-retreat',
    name: 'Coorg Coffee Highlands & Dubare Elephant Camp',
    category: 'Hills & Nature',
    destination: 'Coorg, Karnataka',
    state: 'Karnataka',
    days: 4,
    nights: 3,
    price: 24750,
    shortDescription: 'Immerse in lush misty coffee estates, cascading Abbey Falls, spice gardens, and Tibetan culture at Bylakuppe.',
    hotelDetails: '3-Star Premium Coffee Plantation Stay & 5-Star Luxury Rainforest Spa Resort',
    meals: 'Daily Kodava style breakfast & buffet dinners',
    transportation: 'Chauffeured AC vehicle for all transfers from Bangalore/Mangalore',
    sightseeing: 'Abbey Falls, Raja’s Seat, Dubare Elephant Camp, Golden Temple Bylakuppe, Talakaveri',
    specialOffer: 'Complimentary guided Coffee Plantation & Spice Tasting Walk',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '3 nights stay in handpicked coffee estate villas on twin sharing',
      'Daily breakfast and traditional Kodava dinner',
      'Private AC cab for full round-trip from Bangalore / Mangalore',
      'Dubare Elephant Camp river crossing and interaction entry',
      'Guided coffee and cardamom plantation walk with tasting session'
    ],
    exclusions: [
      'Flights/Trains to Bangalore or Mangalore',
      'Lunch meals and personal drinks',
      'River rafting charges at Dubare'
    ],
    itinerary: [
      { day: 1, title: 'Pickup from Bangalore/Mangalore & Drive to Coorg', details: 'Scenic uphill drive past Western Ghats. Check in to your estate resort. Relax amidst birdsong and aroma of blooming coffee flowers.' },
      { day: 2, title: 'Dubare Elephant Camp & Abbey Falls', details: 'Morning visit to Dubare Elephant Camp along Cauvery River. Afternoon excursion to roar of Abbey Falls and evening panoramic sunset from Raja’s Seat.' },
      { day: 3, title: 'Talakaveri Source & Bylakuppe Golden Temple', details: 'Visit Talakaveri, the sacred birthplace of River Cauvery nestled in Brahmagiri hills. Later explore Namdroling Monastery (Golden Temple) in Bylakuppe Tibetan settlement.' },
      { day: 4, title: 'Spice Shopping & Return Journey', details: 'Shop for authentic homemade chocolates, organic spices, and coffee beans. Transfer back to Bangalore/Mangalore airport.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'karnataka-hampi-heritage',
    slug: 'hampi-unesco-ruins-odyssey',
    name: 'Hampi UNESCO Heritage & Boulder Sunset Trail',
    category: 'Heritage & Culture',
    destination: 'Hampi & Badami, Karnataka',
    state: 'Karnataka',
    days: 3,
    nights: 2,
    price: 20900,
    shortDescription: 'Walk through ancient stone chariots, colossal monolithic deities, Tungabhadra riverbanks, and mystic boulder landscapes.',
    hotelDetails: '3-Star Heritage Boutique Hotel & 5-Star Royal Palace Retreat',
    meals: 'Daily breakfast and South Indian gourmet dinners',
    transportation: 'AC private cab for all monument hopping',
    sightseeing: 'Virupaksha Temple, Stone Chariot (Vijaya Vittala), Lotus Mahal, Matanga Hill, Coracle Boat Ride',
    specialOffer: 'Complimentary Coracle Boat Ride on Tungabhadra River',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '2 nights stay in curated boutique heritage hotel',
      'Daily breakfast and dinner',
      'Dedicated AC vehicle for all transfers',
      'Licensed ASI government guide for Vijaya Vittala and royal enclosure'
    ],
    exclusions: ['Airfare/Train tickets', 'Monument camera fees', 'Lunch meals'],
    itinerary: [
      { day: 1, title: 'Arrival in Hospet/Hampi & Sacred Enclosure', details: 'Arrive and check in. Visit Virupaksha Temple, Hemakuta Hill, and sunset over Tungabhadra river.' },
      { day: 2, title: 'Royal Enclosure, Vijaya Vittala & Coracle Ride', details: 'Explore the Stone Chariot, musical pillars of Vijaya Vittala, Lotus Mahal, and Elephant Stables. Experience a traditional coracle ride.' },
      { day: 3, title: 'Anjaneya Hill Sunrise & Departure', details: 'Climb Anjanadri Hill for panoramic view of boulder valleys. Check out and transfer to Hospet railway station / Hubli airport.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    isActive: true
  },

  // ==========================================
  // MAHARASHTRA
  // ==========================================
  {
    id: 'maharashtra-konkan-tarkarli',
    slug: 'konkan-tarkarli-scuba-coastal-odyssey',
    name: 'Pristine Konkan Coast: Tarkarli, Ratnagiri & Sindhudurg Fort',
    category: 'Beach & Coastal',
    destination: 'Konkan (Tarkarli, Malvan, Ratnagiri), Maharashtra',
    state: 'Maharashtra',
    days: 5,
    nights: 4,
    price: 23900,
    shortDescription: 'Crystal clear Arabian waters, scuba diving at Sindhudurg sea fort, Alphonso orchards, and authentic Malvani culinary feasts.',
    hotelDetails: '3-Star Beachfront Deluxe Resorts & 5-Star Luxury Coastal Villas',
    meals: 'Daily Breakfast and authentic Konkani/Malvani Dinners included',
    transportation: 'Dedicated AC private cab from Mumbai/Pune/Goa',
    sightseeing: 'Sindhudurg Sea Fort, Tarkarli Beach, Devbagh Sangam, Scuba Diving spot, Ganpatipule Temple, Ratnagiri Fort',
    specialOffer: 'Complimentary Scuba Diving experience with HD underwater video recording!',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '4 nights accommodation in sea-facing deluxe beach resort / luxury villa',
      'Scuba diving session with certified PADI divemaster and video/photos',
      'Parasailing, Jet-ski and Banana water sports package at Devbagh',
      'Boat transfer to Sindhudurg Fort across the open sea',
      'Daily delicious breakfast and Malvani dinner',
      'Private AC sedan/SUV for complete door-to-door journey'
    ],
    exclusions: ['Train/Flight tickets', 'Lunch meals', 'Personal shopping'],
    itinerary: [
      { day: 1, title: 'Drive to Ratnagiri & Ganpatipule Beach Temple', details: 'Scenic drive along the Konkan highway. Check in near Ganpatipule. Visit the 400-year-old self-manifested Ganesha temple right on the beach.' },
      { day: 2, title: 'Drive to Tarkarli & Sunset at White Sand Beach', details: 'Drive south through scenic mango and coconut groves to Tarkarli. Check into beachfront resort. Enjoy peaceful evening walk on golden sands.' },
      { day: 3, title: 'Scuba Diving & Sindhudurg Fort Exploration', details: 'Morning boat ride for scuba diving amidst coral reefs. Visit Chhatrapati Shivaji Maharaj’s historic Sindhudurg Fort standing in the Arabian sea.' },
      { day: 4, title: 'Devbagh Sangam, Tsunami Island & Water Sports', details: 'Cruise along the Karli river backwaters to Devbagh Sangam and Tsunami Island. Enjoy thrilling water sports and authentic Malvani fish thali/curry.' },
      { day: 5, title: 'Departure via Coastal Highway', details: 'Savor a traditional breakfast, purchase fresh cashews and Alphonso mango products, and drive back to Mumbai / Pune / Goa.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'maharashtra-alibaug-coastal',
    slug: 'alibaug-beachside-villa-retreat',
    name: 'Alibaug Coastal Retreat & Beachside Villas',
    category: 'Weekend & Beach',
    destination: 'Alibaug, Maharashtra',
    state: 'Maharashtra',
    days: 3,
    nights: 2,
    price: 18900,
    shortDescription: 'Speedboat cruise from Gateway of India to sandy shores, Kolaba Sea Fort, beach cafes, and coconut groves.',
    hotelDetails: '3-Star Boutique Beach Resort & 5-Star Luxury Private Pool Villa',
    meals: 'Daily Breakfast & Special Chef Dinner included',
    transportation: 'Ro-Ro ferry transfers / Private AC Cab throughout',
    sightseeing: 'Kolaba Sea Fort, Nagaon Beach, Kihim Beach, Kashid White Sand Beach, Murud Janjira Fort',
    specialOffer: 'Complimentary Ro-Ro Ferry ticket with car transfer from Mumbai',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '2 nights stay in luxury villa / beachfront resort',
      'Daily breakfast and chef-crafted dinner',
      'Private AC transfers for all sightseeing',
      'Boat ride to Murud-Janjira Fort in the sea'
    ],
    exclusions: ['Lunch meals', 'Water sports rentals', 'Personal shopping'],
    itinerary: [
      { day: 1, title: 'Ro-Ro Ferry to Mandwa & Kolaba Fort', details: 'Board luxury Ro-Ro ferry from Mumbai to Mandwa. Transfer to Alibaug resort. Walk through shallow waters at low tide to explore Kolaba Fort.' },
      { day: 2, title: 'Kashid White Sand Beach & Murud Janjira', details: 'Excursion to Kashid Beach, famed for silver sands. Continue to Murud Janjira, the impregnable sea fort with giant historic cannons.' },
      { day: 3, title: 'Nagaon Water Sports & Return Cruise', details: 'Morning water sports at Nagaon Beach. Lunch at seaside shack and return ferry ride back to Mumbai.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    isActive: true
  },
  {
    id: 'maharashtra-mahabaleshwar-panchgani',
    slug: 'mahabaleshwar-panchgani-strawberry-hills',
    name: 'Mahabaleshwar & Panchgani Strawberry Valleys',
    category: 'Hills & Nature',
    destination: 'Mahabaleshwar & Panchgani, Maharashtra',
    state: 'Maharashtra',
    days: 4,
    nights: 3,
    price: 21900,
    shortDescription: 'Misty mountain cliffs, strawberry farms, Venna Lake boating, Pratapgad Fort history, and Table Land walks.',
    hotelDetails: '3-Star Valley View Resort & 5-Star Mountain Spa Resort with Infinity Pool',
    meals: 'Daily Breakfast and multi-cuisine Buffet Dinners',
    transportation: 'Dedicated AC Sedan / SUV from Mumbai or Pune',
    sightseeing: 'Venna Lake, Arthur’s Seat, Elephant’s Head Point, Mapro Garden, Pratapgad Fort, Panchgani Table Land',
    specialOffer: 'Complimentary Fresh Strawberry Cream Tasting & Farm Tour',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '3 nights stay in premium valley-view resort',
      'Daily breakfast and grand dinner buffets',
      'Private AC cab for all viewpoints and fort visits',
      'Rowboat cruise ticket on Venna Lake'
    ],
    exclusions: ['Personal shopping', 'Lunch meals'],
    itinerary: [
      { day: 1, title: 'Drive to Panchgani & Table Land Sunset', details: 'Scenic uphill drive through Pasarni Ghat. Check in at resort. Evening walk on Table Land, Asia’s second largest mountain plateau.' },
      { day: 2, title: 'Mahabaleshwar Viewpoints & Venna Lake', details: 'Visit Arthur’s Seat, Kate’s Point, and Lodwick Point. In the evening, enjoy a peaceful boat ride on Venna Lake.' },
      { day: 3, title: 'Pratapgad Fort Heritage & Mapro Garden', details: 'Excursion to Shivaji Maharaj’s hilltop Pratapgad Fort. Stop at Mapro Garden for wood-fired pizzas and fresh strawberry desserts.' },
      { day: 4, title: 'Old Mahabaleshwar Temples & Return', details: 'Visit Panchganga and Mahabaleshwar Temples where five holy rivers originate. Drive back to Pune / Mumbai.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'maharashtra-matheran-lonavala',
    slug: 'matheran-lonavala-monsoon-escape',
    name: 'Matheran Eco-Hill Station & Lonavala Forts Escape',
    category: 'Hills & Nature',
    destination: 'Matheran, Lonavala & Khandala, Maharashtra',
    state: 'Maharashtra',
    days: 4,
    nights: 3,
    price: 19800,
    shortDescription: 'Automobile-free red soil paths, heritage toy train, Tiger’s Leap cliffs, Bhushi Dam cascades, and ancient Karla Caves.',
    hotelDetails: '3-Star Heritage Forest Cottages & 5-Star Luxury Valley Resorts',
    meals: 'Daily Breakfast and Chef-crafted Dinners',
    transportation: 'Dedicated AC transfers & Horseback / Hand-pulled rickshaw experiences',
    sightseeing: 'Panorama Point, Charlotte Lake, Echo Point, Tiger’s Leap, Bhushi Dam, Karla & Bhaja Caves, Rajmachi Fort',
    specialOffer: 'Complimentary box of authentic Lonavala Chikki & Fudges',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '3 nights stay (2N Matheran + 1N Lonavala) in boutique resorts',
      'Daily breakfast and dinner',
      'Full local sightseeing transfers',
      'Entry tickets to Karla Caves and Matheran eco-cess'
    ],
    exclusions: ['Lunch meals', 'Personal porter fees'],
    itinerary: [
      { day: 1, title: 'Arrival at Matheran via Toy Train', details: 'Drive to Neral/Daman Point and ride the historic toy train or horse trail into Matheran. Walk to Charlotte Lake for sunset.' },
      { day: 2, title: 'Matheran 360-degree Valley Viewpoints', details: 'Explore Echo Point, Louisa Point, and Panorama Point overlooking deep green Western Ghats valleys.' },
      { day: 3, title: 'Drive to Lonavala & Tiger’s Leap', details: 'Descend to Lonavala. Visit Tiger’s Leap, Lion’s Point, and Bhushi Dam waterfalls. Indulge in local chikki tasting.' },
      { day: 4, title: 'Karla Rock-cut Caves & Return', details: 'Explore the 2000-year-old Buddhist Karla Caves and return drive to Mumbai/Pune.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    isActive: true
  },

  // ==========================================
  // UTTARAKHAND
  // ==========================================
  {
    id: 'uttarakhand-rishikesh-haridwar',
    slug: 'rishikesh-haridwar-spiritual-rafting-trail',
    name: 'Rishikesh & Haridwar: Ganga Aarti, River Rafting & Yoga',
    category: 'Adventure & Spiritual',
    destination: 'Haridwar & Rishikesh, Uttarakhand',
    state: 'Uttarakhand',
    days: 4,
    nights: 3,
    price: 24900,
    shortDescription: 'Witness mesmerizing Ganga Aarti at Triveni Ghat & Har Ki Pauri, conquer Grade III river rapids, and rejuvenate with Himalayan yoga.',
    hotelDetails: '3-Star Riverside Deluxe Camp/Hotel & 5-Star Luxury Ayurvedic Spa Resort',
    meals: 'Daily Satvik and multi-cuisine Breakfast & Dinner',
    transportation: 'Dedicated AC private cab from Dehradun Airport or Delhi',
    sightseeing: 'Har Ki Pauri, Parmarth Niketan, Ram Jhula, Laxman Jhula, Beatles Ashram, Shivpuri 16km River Rafting, Neer Garh Waterfall',
    specialOffer: 'Complimentary 16km River Rafting expedition with cliff jumping!',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '3 nights stay in riverside luxury camps / 5-star wellness resort',
      '16 km White Water River Rafting session with safety gear and instructor',
      'VIP front-row seating assistance for Parmarth Niketan Ganga Aarti',
      'Daily morning yoga & meditation session by certified yogi',
      'Daily breakfast and dinner buffets',
      'All local and interstate transfers in private AC cab'
    ],
    exclusions: ['Airfare/Train tickets to Delhi/Dehradun', 'Lunch meals', 'Bungee jumping fee'],
    itinerary: [
      { day: 1, title: 'Arrival in Haridwar & Evening Har Ki Pauri Aarti', details: 'Pickup from Dehradun Airport / Delhi. Drive to Haridwar. Check in to your hotel. In the evening, witness thousands of oil lamps floating on Mother Ganga during the divine Har Ki Pauri Aarti.' },
      { day: 2, title: 'Drive to Rishikesh, Beatles Ashram & Parmarth Aarti', details: 'Drive to spiritual Rishikesh. Visit Ram Jhula, Laxman Jhula, and the historic Beatles Ashram. Attend the soul-stirring evening Ganga Aarti at Parmarth Niketan.' },
      { day: 3, title: 'White Water River Rafting & Waterfall Hike', details: 'Embark on a thrilling 16km river rafting journey from Shivpuri to Rishikesh with Grade III rapids and cliff jumping. Afternoon hike to Neer Garh Waterfall.' },
      { day: 4, title: 'Morning Yoga Session & Departure', details: 'Wake up for sunrise yoga overlooking the emerald river. After breakfast, transfer to Dehradun Airport or Delhi.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'uttarakhand-nainital-mussoorie',
    slug: 'nainital-mussoorie-queen-of-hills-escape',
    name: 'Nainital & Mussoorie: Lakes & Queen of Hills',
    category: 'Hills & Nature',
    destination: 'Nainital & Mussoorie, Uttarakhand',
    state: 'Uttarakhand',
    days: 6,
    nights: 5,
    price: 29900,
    shortDescription: 'Sail on Naini Lake, ride the Snow View cable car, stroll Mussoorie’s Mall Road, and bathe beneath Kempty Falls.',
    hotelDetails: '3-Star Lakeview Deluxe Boutique Stays & 5-Star Luxury Heritage Resorts',
    meals: 'Daily Breakfast and multi-cuisine Dinners included',
    transportation: 'Dedicated AC Sedan / SUV for whole mountain circuit',
    sightseeing: 'Naini Lake boating, Naina Devi Temple, Snow View Point, Kempty Falls, Gun Hill, Dhanaulti Eco Park',
    specialOffer: 'Complimentary Lake Yachting / Boating experience on Naini Lake',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '5 nights luxury hotel accommodations on twin sharing',
      'Daily breakfast and dinner at hotels',
      'Private AC cab for all mountain drives and tours',
      'Boating pass for Naini Lake'
    ],
    exclusions: ['Airfare/Train to Delhi/Kathgodam', 'Lunch meals', 'Cable car tickets'],
    itinerary: [
      { day: 1, title: 'Drive from Delhi to Nainital', details: 'Scenic uphill drive to the Lake City. Check into your hotel overlooking Naini Lake. Enjoy evening stroll on Mall Road.' },
      { day: 2, title: 'Nainital Lake Tour & Snow View Point', details: 'Visit Bhimtal, Sattal, and Naukuchiatal. Cable car ride to Snow View Point for panoramic views of Trishul and Nanda Devi peaks.' },
      { day: 3, title: 'Drive to Mussoorie via Corbett Foothills', details: 'Scenic drive through green mountain valleys to Mussoorie, the Queen of Hills. Check in and enjoy sunset from Camel’s Back Road.' },
      { day: 4, title: 'Kempty Falls & Mussoorie Local Sights', details: 'Visit gushing Kempty Falls, Company Garden, and ride the ropeway to Gun Hill.' },
      { day: 5, title: 'Day Excursion to Dhanaulti & Pine Forests', details: 'Drive to peaceful Dhanaulti. Walk through deodar forests at Eco Park and visit Surkanda Devi temple.' },
      { day: 6, title: 'Departure Drive to Delhi/Dehradun', details: 'After breakfast, transfer to Dehradun Airport or Delhi for onward journey.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'uttarakhand-jim-corbett-wildlife',
    slug: 'jim-corbett-tiger-safari-wilderness',
    name: 'Jim Corbett Tiger Safari & Wilderness Resort',
    category: 'Wildlife & Safari',
    destination: 'Jim Corbett National Park, Uttarakhand',
    state: 'Uttarakhand',
    days: 3,
    nights: 2,
    price: 24200,
    shortDescription: 'Track Royal Bengal Tigers and wild elephants on an open 4x4 Gypsy safari in India’s oldest national park.',
    hotelDetails: '3-Star Jungle Lodge & 5-Star Luxury Riverside Safari Resort',
    meals: 'All meals included (Breakfast, Lunch & Dinner)',
    transportation: 'Private AC transfer + Open 4x4 Safari Gypsy',
    sightseeing: 'Bijrani / Dhikala / Jhirna Safari Zone, Corbett Waterfalls, Garjiya Devi Temple, Kosi River',
    specialOffer: 'Complimentary Jungle Safari in open top 4x4 Gypsy with expert naturalist',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '2 nights stay in luxury riverside jungle resort',
      'All meals (Buffet Breakfast, Lunch, Dinner)',
      '1 open 4x4 Jeep Safari with forest permit and guide',
      'Evening wildlife documentary and bonfire'
    ],
    exclusions: ['Travel to Ramnagar/Delhi', 'Camera fee'],
    itinerary: [
      { day: 1, title: 'Arrival at Corbett & Kosi River Walk', details: 'Arrive at Ramnagar. Check in to your jungle resort by the Kosi River. Evening tea and bonfire with wildlife tales.' },
      { day: 2, title: 'Early Morning Tiger Safari & Garjiya Temple', details: 'Dawn open-jeep safari through sal forests in search of Royal Bengal Tigers, spotted deer, and hornbills. Afternoon visit to Garjiya Devi temple on river rock.' },
      { day: 3, title: 'Corbett Falls & Departure', details: 'Visit Corbett Waterfalls and heritage museum before driving back to Delhi.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    isActive: true
  },

  // ==========================================
  // HIMACHAL PRADESH
  // ==========================================
  {
    id: 'himachal-manali-solang-kasol',
    slug: 'manali-solang-kasol-parvati-valley',
    name: 'Manali, Solang Valley & Kasol Parvati Trail',
    category: 'Snow & Adventure',
    destination: 'Manali, Kasol & Kullu, Himachal Pradesh',
    state: 'Himachal Pradesh',
    days: 6,
    nights: 5,
    price: 29900,
    shortDescription: 'Snow activities at Solang Valley, drive through Atal Tunnel, riverside cafes in Kasol, Manikaran hot springs, and Kullu river rafting.',
    hotelDetails: '3-Star Riverside Deluxe Hotel & 5-Star Luxury Mountainside Chalet Resort',
    meals: 'Daily Breakfast and warm Himalayan Buffet Dinners included',
    transportation: 'Dedicated AC/Heated SUV for mountain roads',
    sightseeing: 'Hadimba Temple, Solang Valley, Atal Tunnel to Sissu (Lahaul), Kasol Parvati River, Manikaran Sahib, Kullu Rafting',
    specialOffer: 'Complimentary Paragliding / Snow Gear activity voucher at Solang',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '5 nights luxury hotel stay in deluxe rooms on twin sharing',
      'Daily breakfast and dinner with mountain views',
      'Private SUV for all transfers and snow excursions',
      'Permits for Atal Tunnel and Sissu waterfall valley',
      'Bonfire and live music evening in Kasol'
    ],
    exclusions: ['Airfare/Train to Chandigarh/Kullu', 'Lunch meals', 'Extreme sports gear'],
    itinerary: [
      { day: 1, title: 'Chandigarh Pickup & Scenic Beas River Drive to Manali', details: 'Arrive at Chandigarh. Board SUV and drive along rushing Beas river and Pandoh Dam to Manali. Check in and rest.' },
      { day: 2, title: 'Manali Sights: Hadimba Temple & Old Manali Cafes', details: 'Explore wooden Hadimba Temple in cedar forest, Vashisht Hot Sulphur Springs, and vibrant Old Manali cafes.' },
      { day: 3, title: 'Solang Valley Snow Point & Atal Tunnel to Sissu', details: 'Full day adventure at Solang Valley. Drive through the engineering marvel Atal Tunnel into the cold desert of Sissu (Lahaul Valley).' },
      { day: 4, title: 'Drive to Kasol via Kullu River Rafting', details: 'Experience thrilling river rafting in Kullu. Drive along turquoise Parvati River to hippie village of Kasol. Evening by the river.' },
      { day: 5, title: 'Manikaran Sahib Gurudwara & Tosh Hike', details: 'Visit Manikaran Sahib with natural hot spring baths. Afternoon hike to picturesque Tosh village overlooking snow peaks.' },
      { day: 6, title: 'Departure Drive to Chandigarh', details: 'After breakfast, descend through scenic Himalayan foothills to Chandigarh airport.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'himachal-spiti-valley-expedition',
    slug: 'spiti-valley-snowcat-escape',
    name: 'Spiti Valley Snowcat 4x4 Winter Expedition',
    category: 'Adventure',
    destination: 'Spiti Valley, Himachal Pradesh',
    state: 'Himachal Pradesh',
    days: 7,
    nights: 6,
    price: 38390, // 10% uplift from 34.9k
    shortDescription: 'A mesmerizing winter expedition to the land of lamas, cliffside monasteries, frozen waterfalls, and highest villages.',
    hotelDetails: '3-Star Cozy Mountain Homestays & 5-Star Boutique Alpine Guesthouses',
    meals: 'Daily Breakfast & Dinner included (local organic cuisine)',
    transportation: '4x4 Snowcat-ready SUV for all mountain routes',
    sightseeing: 'Key Monastery, Hikkim (Highest Post Office), Komic, Langza, Dhankar Lake, Pin Valley',
    specialOffer: 'Early Bird Offer: Complimentary high-altitude souvenir postcard mailed from Hikkim!',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '6 nights accommodation in premium homestays & mountain lodges',
      'All local transfers in dedicated 4x4 SUV (Innova / Scorpio 4x4)',
      'Daily breakfast and dinner',
      'All inner line permits and local entry fees',
      'Experienced trip leader and local spot guides',
      'Medical oxygen and emergency first-aid kit'
    ],
    exclusions: ['Flights/trains to Chandigarh/Shimla', 'Lunch meals', 'Personal snacks'],
    itinerary: [
      { day: 1, title: 'Arrival in Shimla & Drive to Kalpa', details: 'Arrive in Shimla. Board the SUV and embark on a beautiful drive to Kalpa. Check in at your homestay, acclimatize, and enjoy warm local dinner.' },
      { day: 2, title: 'Kalpa to Kaza via Tabo Monastery', details: 'Travel along the rugged Satluj river and enter Spiti Valley. Visit ancient Tabo Monastery (UNESCO site) before reaching Kaza.' },
      { day: 3, title: 'Key Monastery & Kibber High-Altitude Exploration', details: 'Visit iconic Key Monastery perched on a hilltop. Drive to Kibber, one of the highest inhabited villages in the world.' },
      { day: 4, title: 'High Post Office in Hikkim, Komic & Langza', details: 'Mail a letter from the world’s highest post office at Hikkim. Visit Komic and Langza giant Buddha statue.' },
      { day: 5, title: 'Dhankar Monastery & Pin Valley National Park', details: 'Explore the cliffside Dhankar Monastery. Walk around Pin Valley National Park and experience pristine cold desert ecology.' },
      { day: 6, title: 'Scenic Drive Back to Kinnaur', details: 'Drive back to green valleys of Kinnaur, enjoying the contrast between stark mountains and dense pine forests.' },
      { day: 7, title: 'Return Drive to Shimla/Chandigarh', details: 'After early breakfast, drive back to Shimla/Chandigarh for onward journey.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'himachal-shimla-dharamshala-dalhousie',
    slug: 'shimla-dharamshala-dalhousie-grand-circuit',
    name: 'Shimla, Dharamshala & Dalhousie Mini Switzerland',
    category: 'Hills & Nature',
    destination: 'Shimla, Dharamshala, Dalhousie, Himachal Pradesh',
    state: 'Himachal Pradesh',
    days: 7,
    nights: 6,
    price: 32900,
    shortDescription: 'Colonial heritage of Shimla Ridge, Dalai Lama’s abode in McLeodganj, and lush meadows of Khajjiar (Mini Switzerland).',
    hotelDetails: '3-Star Deluxe Pine Resorts & 5-Star Heritage Himalayan Lodges',
    meals: 'Daily Breakfast and grand Buffet Dinners',
    transportation: 'Dedicated AC/Heated Private Sedan / SUV',
    sightseeing: 'Shimla Ridge, Kufri, Dalai Lama Temple, Bhagsu Waterfall, Khajjiar Meadow, Kalatop Wildlife Sanctuary',
    specialOffer: 'Complimentary Khajjiar Horse Riding & Zorbing Activity',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '6 nights luxury hotel accommodation',
      'Daily breakfast and dinner',
      'All sightseeing and intercity transfers in private cab'
    ],
    exclusions: ['Train/Airfare', 'Lunch meals'],
    itinerary: [
      { day: 1, title: 'Chandigarh to Shimla & The Ridge Walk', details: 'Drive to Shimla. Stroll along Mall Road and historic Christ Church on The Ridge.' },
      { day: 2, title: 'Kufri Snow View & Jakhoo Temple', details: 'Excursion to Kufri for horse riding and panoramic views. Visit Jakhoo Hanuman Temple.' },
      { day: 3, title: 'Drive to Dharamshala via Kangra Valley', details: 'Scenic drive past tea gardens and Kangra Fort to Dharamshala.' },
      { day: 4, title: 'McLeodganj Dalai Lama Temple & Bhagsu', details: 'Visit Tsuglagkhang Complex (Dalai Lama Temple), Norbulingka Institute, and Bhagsu Nag waterfall.' },
      { day: 5, title: 'Drive to Dalhousie & Colonial Church Tour', details: 'Drive to colonial hill station of Dalhousie. Visit St. John’s Church and Subhash Baoli.' },
      { day: 6, title: 'Khajjiar (Mini Switzerland) Excursion', details: 'Full day at saucer-shaped Khajjiar meadow surrounded by dense deodar forests and floating island lake.' },
      { day: 7, title: 'Departure via Pathankot/Chandigarh', details: 'Check out and transfer to Pathankot / Chandigarh for return journey.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    isActive: true
  },

  // ==========================================
  // PUNJAB
  // ==========================================
  {
    id: 'punjab-amritsar-wagah-heritage',
    slug: 'amritsar-golden-temple-wagah-heritage',
    name: 'Amritsar Golden Temple, Wagah Border & Punjabi Heritage',
    category: 'Heritage & Culture',
    destination: 'Amritsar & Chandigarh, Punjab',
    state: 'Punjab',
    days: 4,
    nights: 3,
    price: 21900,
    shortDescription: 'Spiritual tranquility at Harmandir Sahib (Golden Temple), patriotic fervor at Wagah Border ceremony, Jallianwala Bagh, and legendary Amritsari Kulcha trail.',
    hotelDetails: '3-Star Deluxe City Hotel & 5-Star Grand Palace Luxury Hotel',
    meals: 'Daily Punjabi Breakfast & Traditional Dinners included',
    transportation: 'Dedicated AC Private Sedan for airport and border transfers',
    sightseeing: 'Golden Temple (Day & Night illumination), Langar community kitchen, Jallianwala Bagh, Wagah Border Retreat Ceremony, Gobindgarh Fort, Rock Garden Chandigarh',
    specialOffer: 'Complimentary VIP Gate entry pass for Wagah Border Flag Retreat!',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '3 nights stay in top-rated deluxe/5-star hotel in Amritsar',
      'Daily authentic breakfast and Punjabi dinner',
      'Dedicated AC vehicle for all transfers and Wagah border excursion',
      'Guided Golden Temple walk and Langar service experience',
      'Entry tickets to Gobindgarh Fort and Light & Sound show'
    ],
    exclusions: ['Airfare / Train tickets to Amritsar', 'Lunch meals', 'Personal shopping'],
    itinerary: [
      { day: 1, title: 'Arrival in Amritsar & Night Illumination of Golden Temple', details: 'Arrive at Sri Guru Ram Dass Jee Airport/Amritsar Junction. Check in to your hotel. In the evening, visit the illuminated Golden Temple with sacred hymns reflecting on the Amrit Sarovar.' },
      { day: 2, title: 'Jallianwala Bagh & Patriotic Wagah Border Ceremony', details: 'Visit Jallianwala Bagh Memorial and Partition Museum. In the afternoon, drive to the India-Pakistan border at Wagah to witness the electrifying Beating Retreat ceremony.' },
      { day: 3, title: 'Gobindgarh Fort & Authentic Amritsari Food Trail', details: 'Explore historic Gobindgarh Fort with 7D martial history show. Enjoy authentic culinary trail including piping hot Amritsari Kulchas with Chole and creamy Makhan Lassi.' },
      { day: 4, title: 'Morning Palki Sahib Ceremony & Departure', details: 'Witness early morning Palki Sahib ceremony at Golden Temple. Transfer to airport for flight home with blessed memories.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1588096344356-9b434a9e5257?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },

  // ==========================================
  // RAJASTHAN
  // ==========================================
  {
    id: 'rajasthan-royal-heritage-circuit',
    slug: 'rajasthan-royal-heritage-journey',
    name: 'Rajasthan Royal Heritage: Jaipur, Jodhpur & Udaipur',
    category: 'Heritage & Culture',
    destination: 'Jaipur, Jodhpur & Udaipur, Rajasthan',
    state: 'Rajasthan',
    days: 6,
    nights: 5,
    price: 32900, // 10% uplift
    shortDescription: 'Live the royal era with towering desert forts, lake palaces, camel safaris, and traditional Rajasthani cultural folk dances.',
    hotelDetails: '3-Star Heritage Havelis & 5-Star Royal Palace Resorts',
    meals: 'Daily Rajasthani buffet breakfast & royal dinners',
    transportation: 'Dedicated AC private cab with experienced chauffeur',
    sightseeing: 'Amber Fort, Hawa Mahal, City Palace Jaipur, Mehrangarh Fort Jodhpur, Lake Pichola boating, Saheliyon Ki Bari',
    specialOffer: 'Complimentary Lake Pichola Sunset Boat Cruise & Folk Dance Show',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '5 nights accommodation in curated heritage palace hotels',
      'Daily buffet breakfast and dinners',
      'Private AC cab for all intercity transfers and tours',
      'Boat cruise on Lake Pichola in Udaipur',
      'Folk dance & puppet show entry at Bagore Ki Haveli'
    ],
    exclusions: ['Airfare/Train tickets', 'Monument entry tickets', 'Lunch meals'],
    itinerary: [
      { day: 1, title: 'Jaipur Arrival & City Palace Tour', details: 'Arrive in the Pink City Jaipur. Visit City Palace and Jantar Mantar observatory. Evening shopping at Johari Bazaar.' },
      { day: 2, title: 'Amber Fort & Jal Mahal', details: 'Ascend majestic Amber Fort with mirror work in Sheesh Mahal. Photo stop at water-locked Jal Mahal and Hawa Mahal.' },
      { day: 3, title: 'Drive to Jodhpur & Mehrangarh Fort', details: 'Drive to Blue City Jodhpur. Explore Mehrangarh Fort perched 400 feet above the city and Jaswant Thada marble cenotaphs.' },
      { day: 4, title: 'Ranakpur Jain Temples & Drive to Udaipur', details: 'Drive past Aravalli hills with stop at Ranakpur marble temples with 1,444 uniquely carved pillars. Arrive in Udaipur.' },
      { day: 5, title: 'Udaipur City Palace & Lake Pichola Cruise', details: 'Tour Udaipur City Palace overlooking Lake Pichola. Enjoy relaxing sunset boat ride and cultural dance at Bagore Ki Haveli.' },
      { day: 6, title: 'Departure from Udaipur', details: 'After breakfast, transfer to Udaipur Airport for return flight.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'rajasthan-jaisalmer-desert-camp',
    slug: 'jaisalmer-golden-dunes-desert-camp',
    name: 'Jaisalmer Golden Dunes & Thar Desert Safari',
    category: 'Desert & Culture',
    destination: 'Jaisalmer, Rajasthan',
    state: 'Rajasthan',
    days: 4,
    nights: 3,
    price: 27500,
    shortDescription: 'Golden living sandstone fort, sunset camel safari on Sam Sand Dunes, luxury Swiss tents, and stargazing in the Thar desert.',
    hotelDetails: '3-Star Heritage Fort Hotel & 5-Star Luxury Royal Desert Swiss Tents',
    meals: 'Daily Breakfast & Rajasthani Dinners with live folk music',
    transportation: 'Dedicated AC cab + 4x4 Dune Bashing Jeep',
    sightseeing: 'Jaisalmer Fort (Sonar Qila), Patwon Ki Haveli, Gadisar Lake, Sam Sand Dunes, Kuldhara Ghost Village',
    specialOffer: 'Complimentary Camel Safari & Desert Dune Bashing in 4x4 Jeep',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '2 nights in Golden City hotel + 1 night in luxury Desert Camp',
      'Daily breakfast and traditional buffet dinner',
      'Camel ride on sand dunes and 4x4 jeep safari',
      'Cultural evening with Kalbelia dancers and bonfire'
    ],
    exclusions: ['Airfare to Jaisalmer/Jodhpur', 'Lunch meals'],
    itinerary: [
      { day: 1, title: 'Arrival in Jaisalmer & Gadisar Lake', details: 'Arrive in the Golden City. Check in to heritage hotel. Enjoy serene sunset boating at Gadisar Lake.' },
      { day: 2, title: 'Jaisalmer Fort & Patwon Ki Haveli', details: 'Explore the living Jaisalmer Fort with ancient Jain temples and intricately carved Patwon Ki Haveli.' },
      { day: 3, title: 'Kuldhara Ghost Village & Sam Sand Dunes Camp', details: 'Visit haunted Kuldhara village. Transfer to desert camp on Sam Sand Dunes. Enjoy camel ride, desert sunset, folk dances, and stargazing.' },
      { day: 4, title: 'Departure via Jodhpur/Jaisalmer', details: 'Wake up to sunrise over dunes. Check out and transfer to airport/station.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    isActive: true
  },

  // ==========================================
  // KERALA
  // ==========================================
  {
    id: 'kerala-backwater-houseboat-escape',
    slug: 'kerala-backwater-escape',
    name: 'Kerala Backwaters, Munnar Tea Hills & Houseboat',
    category: 'Nature & Backwaters',
    destination: 'Munnar, Thekkady & Alleppey, Kerala',
    state: 'Kerala',
    days: 5,
    nights: 4,
    price: 27500, // 10% uplift
    shortDescription: 'Cruise through palm-fringed canals on a private luxury houseboat, tour misty Munnar tea plantations, and explore spice hills.',
    hotelDetails: '3-Star Premium Homestays & 5-Star Luxury Private Backwater Houseboat & Hill Resort',
    meals: 'Daily breakfast at hotels + All Meals (Lunch, Dinner, Breakfast) on Houseboat',
    transportation: 'Dedicated AC private cab for all transfers',
    sightseeing: 'Munnar Tea Museum, Eravikulam National Park, Mattupetty Dam, Thekkady Spice Plantations, Alleppey Houseboat Cruise',
    specialOffer: 'Complimentary Guided Spice Plantation Walk & Ayurvedic welcome massage',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '3 nights in hill resorts + 1 night in fully private AC Deluxe Houseboat',
      'All meals on houseboat prepared by private onboard chef',
      'Daily breakfast at all hotels',
      'Private AC sedan for all sightseeings from Kochi to Kochi',
      'Spice plantation guided walk'
    ],
    exclusions: ['Airfare/Train to Kochi', 'Personal expenses', 'Optional Kathakali show ticket'],
    itinerary: [
      { day: 1, title: 'Kochi Arrival & Drive to Munnar Hills', details: 'Arrive at Kochi Airport. Scenic drive through lush greenery past Cheeyappara Waterfalls to Munnar. Check in and relax.' },
      { day: 2, title: 'Munnar Tea Gardens & Eravikulam National Park', details: 'Spot endangered Nilgiri Tahr at Eravikulam National Park. Visit Tata Tea Museum and Mattupetty Lake.' },
      { day: 3, title: 'Drive to Thekkady & Spice Gardens', details: 'Drive to Thekkady spice country. Guided walking tour through cardamom, pepper, and cinnamon plantations.' },
      { day: 4, title: 'Alleppey Houseboat Check-in & Backwater Cruise', details: 'Board your private luxury houseboat in Alleppey. Glide along tranquil canals, enjoying fresh coconut water and traditional Karimeen fish curry.' },
      { day: 5, title: 'Morning Cruise & Departure via Kochi', details: 'Enjoy sunrise over paddy fields. Check out after breakfast and transfer to Kochi Airport for flight home.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },

  // ==========================================
  // GOA
  // ==========================================
  {
    id: 'goa-sun-sand-heritage-escape',
    slug: 'goa-beach-escape',
    name: 'Goa Sun, Sand & Portuguese Heritage Retreat',
    category: 'Beach & Nightlife',
    destination: 'North & South Goa, Goa',
    state: 'Goa',
    days: 5,
    nights: 4,
    price: 24200, // 10% uplift
    shortDescription: 'Golden beaches of North Goa, Portuguese villas of Fontainhas, Old Goa churches, and serene South Goa luxury.',
    hotelDetails: '3-Star Beach Resort with Pool & 5-Star Beachfront Luxury Spa Resort',
    meals: 'Daily Buffet Breakfast included',
    transportation: 'Dedicated AC private car for full trip',
    sightseeing: 'Baga & Calangute Beach, Fort Aguada, Chapora Fort, Basilica of Bom Jesus, Fontainhas Latin Quarter, Mandovi Sunset Cruise',
    specialOffer: 'Complimentary Mandovi River Sunset Boat Cruise Ticket with live Goan music',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '4 nights beach resort accommodation on twin sharing',
      'Daily buffet breakfast',
      'Full day North Goa and South Goa private guided tours',
      'Mandovi river sunset cruise entry ticket'
    ],
    exclusions: ['Airfare/Train to Goa', 'Water sports rentals', 'Lunch and dinner'],
    itinerary: [
      { day: 1, title: 'Arrival in Goa & Beach Sunset', details: 'Arrive at Mopa/Dabolim Airport. Check into your beach resort. Spend a relaxed evening by the sea watching the sun dip into the horizon.' },
      { day: 2, title: 'North Goa Forts, Beaches & Cafes', details: 'Visit 17th-century Fort Aguada, vibrant Baga & Anjuna beaches, and famous Chapora Fort (Dil Chahta Hai point).' },
      { day: 3, title: 'South Goa Heritage: Old Goa Churches & Fontainhas', details: 'Explore UNESCO Basilica of Bom Jesus and Se Cathedral in Old Goa. Walk through colorful Portuguese streets in Fontainhas, Panjim.' },
      { day: 4, title: 'Dudhsagar Falls / Spice Farm or Beach Leisure', details: 'Optional trip to magnificent Dudhsagar Waterfalls or relax on the white sands of Palolem Beach in South Goa.' },
      { day: 5, title: 'Departure Flight from Goa', details: 'After breakfast, enjoy some morning souvenir shopping and transfer to Goa Airport.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },

  // ==========================================
  // JAMMU & KASHMIR & LADAKH
  // ==========================================
  {
    id: 'kashmir-paradise-on-earth',
    slug: 'kashmir-paradise-on-earth-escape',
    name: 'Kashmir Paradise: Dal Lake, Gulmarg Gondola & Pahalgam',
    category: 'Snow & Mountains',
    destination: 'Srinagar, Gulmarg & Pahalgam, Jammu & Kashmir',
    state: 'Jammu & Kashmir',
    days: 6,
    nights: 5,
    price: 36900,
    shortDescription: 'Stay in ornate cedar houseboats on Dal Lake, ride Asia’s highest cable car in Gulmarg, and walk through pine valleys of Pahalgam.',
    hotelDetails: '3-Star Deluxe Houseboat & Boutique Hotels / 5-Star Luxury Alpine Resorts',
    meals: 'Daily Kashmiri Breakfast and gourmet Dinners',
    transportation: 'Dedicated AC/Heated Private Vehicle',
    sightseeing: 'Dal Lake Shikara ride, Mughal Gardens (Nishat & Shalimar), Gulmarg Gondola Phase 1 & 2, Pahalgam Betaab Valley, Aru Valley',
    specialOffer: 'Complimentary 1-Hour Sunset Shikara Ride on Dal Lake with Kahwa tea',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '1 night in luxury carved Dal Lake Houseboat + 4 nights in premium hotels',
      'Daily breakfast and dinner (Wazwan options available)',
      'Private heated cab for all airport transfers and valley excursions',
      'Shikara ride on Dal Lake'
    ],
    exclusions: ['Airfare to Srinagar', 'Gulmarg Gondola Phase 2 ticket', 'Pony rides'],
    itinerary: [
      { day: 1, title: 'Srinagar Arrival & Romantic Shikara on Dal Lake', details: 'Arrive at Sheikh ul-Alam Airport. Check into your deluxe houseboat. Enjoy an enchanting Shikara boat ride past floating gardens.' },
      { day: 2, title: 'Srinagar Mughal Gardens & Old City', details: 'Visit Nishat Bagh, Shalimar Bagh, and Shankaracharya Temple overlooking the valley.' },
      { day: 3, title: 'Gulmarg Meadow of Flowers & Gondola Snow Ride', details: 'Drive to Gulmarg. Ride the famous Gondola cable car up to Apharwat peak for snow activities and alpine vistas.' },
      { day: 4, title: 'Drive to Pahalgam Valley of Shepherds', details: 'Drive through saffron fields of Pampore and pine forests to Pahalgam along Lidder River.' },
      { day: 5, title: 'Betaab Valley & Aru Valley Exploration', details: 'Explore Bollywood fame Betaab Valley, Chandanwari, and lush Aru Valley meadows.' },
      { day: 6, title: 'Departure Flight from Srinagar', details: 'After breakfast, transfer to Srinagar Airport with cherished Kashmir memories.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'ladakh-leh-pangong-nubra',
    slug: 'ladakh-high-passes-pangong-escape',
    name: 'Ladakh High Passes: Leh, Pangong Tso & Nubra Valley',
    category: 'High Altitude Adventure',
    destination: 'Leh, Nubra Valley & Pangong Tso, Ladakh',
    state: 'Ladakh',
    days: 7,
    nights: 6,
    price: 43900,
    shortDescription: 'Cross world’s highest motorable pass Khardung La, ride double-humped camels in Hunder sand dunes, and gaze at blue waters of Pangong Tso.',
    hotelDetails: '3-Star Deluxe Boutique Hotel & 5-Star Luxury Glamping Swiss Tents',
    meals: 'Daily Breakfast & Dinners included',
    transportation: 'Dedicated 4x4 / Luxury Tempo / SUV for high mountain passes',
    sightseeing: 'Leh Palace, Shanti Stupa, Khardung La Pass (17,982 ft), Diskit Monastery, Hunder Sand Dunes, Pangong Tso Lake, Chang La Pass',
    specialOffer: 'Complimentary Double-Humped Bactrian Camel Ride in Nubra Valley',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '6 nights luxury accommodation in Leh, Nubra Valley, and Pangong Lake',
      'Daily breakfast and dinner',
      'Inner Line Permits and Wildlife environmental fees',
      'Dedicated private vehicle with experienced high-altitude driver',
      'Oxygen cylinder in vehicle'
    ],
    exclusions: ['Airfare to Leh', 'Lunch meals', 'Camel ride fees'],
    itinerary: [
      { day: 1, title: 'Arrival in Leh & Complete Rest for Acclimatization', details: 'Arrive at Kushok Bakula Rimpochee Airport. Transfer to hotel. Rest completely for 24 hours to acclimatize to high altitude.' },
      { day: 2, title: 'Leh Local Sights: Shanti Stupa & Hall of Fame', details: 'Visit Shanti Stupa for panoramic sunset, Leh Palace, and sacred Magnetic Hill.' },
      { day: 3, title: 'Drive to Nubra Valley via Khardung La Pass', details: 'Drive across Khardung La (17,982 ft). Arrive in Nubra Valley, visit Diskit giant Buddha statue, and experience Hunder sand dunes.' },
      { day: 4, title: 'Nubra to Pangong Tso Lake via Shyok River', details: 'Drive along rugged Shyok river to the breathtaking Pangong Tso lake whose colors change from blue to green with the sun.' },
      { day: 5, title: 'Pangong Sunrise & Return to Leh via Chang La', details: 'Witness sunrise over Pangong lake. Drive back to Leh crossing Chang La pass (17,590 ft).' },
      { day: 6, title: 'Monasteries & Local Shopping in Leh', details: 'Visit Thiksey Monastery and explore Leh market for Tibetan handicrafts and pashmina shawls.' },
      { day: 7, title: 'Departure Flight from Leh', details: 'Transfer to Leh Airport with indelible memories of the Roof of the World.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },

  // ==========================================
  // SIKKIM & NORTHEAST
  // ==========================================
  {
    id: 'sikkim-gangtok-darjeeling',
    slug: 'sikkim-gangtok-darjeeling-tea-hills',
    name: 'Sikkim & Darjeeling: Gangtok, Tsomgo Lake & Tea Hills',
    category: 'Hills & Nature',
    destination: 'Gangtok & Darjeeling, Sikkim',
    state: 'Sikkim & North East',
    days: 6,
    nights: 5,
    price: 33900,
    shortDescription: 'Gaze at Mount Kanchenjunga, visit holy high-altitude Tsomgo Lake, ride Darjeeling Himalayan Toy Train, and sip organic tea.',
    hotelDetails: '3-Star Mountain View Stays & 5-Star Colonial Heritage Resorts',
    meals: 'Daily Breakfast and multi-cuisine Dinners',
    transportation: 'Dedicated AC private vehicle throughout',
    sightseeing: 'Tsomgo Lake, Baba Mandir, Rumtek Monastery, MG Marg, Tiger Hill Sunrise, Batasia Loop, Happy Valley Tea Estate',
    specialOffer: 'Complimentary Darjeeling Heritage Toy Train Joyride Pass',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '5 nights luxury hotel accommodation on twin sharing',
      'Daily breakfast and dinner',
      'All sightseeing and intercity transfers',
      'Special permits for Tsomgo Lake & Baba Mandir'
    ],
    exclusions: ['Airfare to Bagdogra / NJP Train tickets', 'Nathula Pass permit fee (if opted)', 'Lunch meals'],
    itinerary: [
      { day: 1, title: 'Bagdogra/NJP Pickup & Drive to Gangtok', details: 'Drive along Teesta river into Sikkim. Check in at Gangtok hotel. Evening walk on pedestrian-only MG Marg.' },
      { day: 2, title: 'Tsomgo Lake & Baba Mandir Excursion', details: 'High-altitude excursion to glacial Tsomgo Lake (12,400 ft) and Baba Harbhajan Singh Memorial.' },
      { day: 3, title: 'Gangtok City Tour & Drive to Darjeeling', details: 'Visit Rumtek Monastery and Banjhakri Falls. Drive across tea estates to Victorian hill town Darjeeling.' },
      { day: 4, title: 'Tiger Hill Kanchenjunga Sunrise & Toy Train', details: 'Early morning 4 AM drive to Tiger Hill to watch golden sunrise over Mount Kanchenjunga. Ride the historic Toy Train around Batasia Loop.' },
      { day: 5, title: 'Darjeeling Tea Gardens & Himalayan Zoo', details: 'Visit Padmaja Naidu Himalayan Zoological Park (home to Red Pandas and Snow Leopards) and Happy Valley Tea Estate.' },
      { day: 6, title: 'Departure Drive to Bagdogra/NJP', details: 'After breakfast, drive down through tea hills to Bagdogra Airport for departure.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },

  // ==========================================
  // TAMIL NADU & GUJARAT
  // ==========================================
  {
    id: 'tamil-nadu-ooty-kodaikanal',
    slug: 'ooty-kodaikanal-nilgiri-hills',
    name: 'Ooty & Kodaikanal: Nilgiri Hills & Princess of Hill Stations',
    category: 'Hills & Nature',
    destination: 'Ooty & Kodaikanal, Tamil Nadu',
    state: 'Tamil Nadu',
    days: 5,
    nights: 4,
    price: 28500,
    shortDescription: 'Ride the UNESCO Nilgiri Mountain Toy Train, stroll through botanical gardens, Doddabetta peak, and star-shaped Kodai Lake.',
    hotelDetails: '3-Star Colonial Cottages & 5-Star Luxury Tea Plantation Resorts',
    meals: 'Daily South Indian & Continental Breakfast & Dinners',
    transportation: 'Dedicated AC sedan from Coimbatore / Bangalore',
    sightseeing: 'Ooty Botanical Gardens, Nilgiri Toy Train, Doddabetta Peak, Pykara Lake & Falls, Kodai Lake, Coaker’s Walk, Pillar Rocks',
    specialOffer: 'Complimentary Nilgiri Mountain Toy Train Ticket from Coonoor',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '4 nights accommodation in colonial heritage properties',
      'Daily breakfast and dinner',
      'Private AC cab for all mountain drives and sightseeing',
      'Toy train experience pass'
    ],
    exclusions: ['Airfare/Train to Coimbatore', 'Lunch meals'],
    itinerary: [
      { day: 1, title: 'Coimbatore Pickup & Drive to Ooty', details: 'Drive past hairpin bends to Ooty. Visit Botanical Garden and relax.' },
      { day: 2, title: 'Doddabetta Peak & Coonoor Toy Train', details: 'Climb Doddabetta Peak. Board the heritage steam toy train to Coonoor past tea plantations.' },
      { day: 3, title: 'Drive to Kodaikanal Princess of Hill Stations', details: 'Drive to Kodaikanal. Check in and take an evening walk around star-shaped Kodai Lake.' },
      { day: 4, title: 'Pillar Rocks & Coaker’s Walk', details: 'Visit giant Pillar Rocks, Green Valley View, and Coaker’s Walk path overlooking misty plains.' },
      { day: 5, title: 'Departure Drive to Coimbatore / Madurai', details: 'Check out and transfer to Coimbatore or Madurai airport.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    isActive: true
  },
  {
    id: 'gujarat-rann-of-kutch-gir',
    slug: 'gujarat-rann-of-kutch-gir-safari',
    name: 'Rann of Kutch White Desert & Gir Lion Safari',
    category: 'Desert & Wildlife',
    destination: 'Kutch & Gir, Gujarat',
    state: 'Gujarat',
    days: 5,
    nights: 4,
    price: 32500,
    shortDescription: 'Witness white salt desert shimmering under full moonlight, traditional Kutchi handicrafts, and Asiatic Lions in Gir Forest.',
    hotelDetails: '3-Star Traditional Bhunga Cottages & 5-Star Luxury Safari Club Resort',
    meals: 'Daily Gujarati Thali Breakfast, Lunch & Dinners',
    transportation: 'Dedicated AC private vehicle from Ahmedabad / Bhuj',
    sightseeing: 'White Rann of Kutch, Kalo Dungar (Black Hill), Hodka Craft Village, Sasan Gir Forest Lion Safari, Somnath Temple',
    specialOffer: 'Complimentary Asiatic Lion Safari in Open 4x4 Gypsy at Gir National Park',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '4 nights stay in authentic AC Bhungas & luxury jungle resort',
      'All meals included during Kutch festival stay + Daily breakfast and dinner',
      '1 open jeep safari with guide and permit in Gir National Park',
      'White Rann entry permit'
    ],
    exclusions: ['Airfare/Train to Bhuj/Ahmedabad', 'Camera fee'],
    itinerary: [
      { day: 1, title: 'Bhuj Arrival & Drive to White Rann Tent City', details: 'Arrive at Bhuj. Drive to White Rann. Check in to traditional Bhunga. Evening walk on glowing white salt desert under the sunset.' },
      { day: 2, title: 'Kalo Dungar & Artisans Village', details: 'Visit Kalo Dungar (highest point in Kutch) and artisan villages of Hodka and Nirona for Rogan art and lacquer woodwork.' },
      { day: 3, title: 'Drive to Sasan Gir via Junagadh', details: 'Scenic drive to Sasan Gir Forest, home to the Asiatic Lion.' },
      { day: 4, title: 'Asiatic Lion Safari & Somnath Temple', details: 'Early morning open Gypsy safari in Gir National Park. Afternoon visit to sacred beachfront Somnath Jyotirlinga Temple.' },
      { day: 5, title: 'Departure via Rajkot / Ahmedabad', details: 'Check out and transfer to Rajkot or Ahmedabad airport.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    isActive: true
  },

  // ==========================================
  // INTERNATIONAL DESTINATIONS
  // ==========================================
  {
    id: 'international-dubai-extravaganza',
    slug: 'dubai-luxury-dunes-city-escape',
    name: 'Dubai Luxury Skyline, Desert Safari & Marina Cruise',
    category: 'International',
    destination: 'Dubai & Abu Dhabi, UAE',
    days: 5,
    nights: 4,
    price: 49500,
    shortDescription: 'Stand atop Burj Khalifa, experience thrilling 4x4 red dune bashing with BBQ dinner, Marina luxury yacht cruise, and Abu Dhabi Grand Mosque.',
    hotelDetails: '4-Star Premium City Hotel & 5-Star Luxury Downtown Skyline Hotel options',
    meals: 'Daily Buffet Breakfast + BBQ Desert Dinner + Marina Cruise Dinner',
    transportation: 'Dedicated AC Luxury Sedan airport pickups & private excursions',
    sightseeing: 'Burj Khalifa 124th Floor, Dubai Mall & Fountain Show, Desert Safari with Tanoura show, Dubai Marina Dhow Cruise, Sheikh Zayed Grand Mosque Abu Dhabi',
    specialOffer: 'Complimentary 124th Floor Burj Khalifa Observation Deck Ticket',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '4 nights in 4-Star/5-Star luxury hotel in Dubai',
      'Daily international buffet breakfast',
      'Burj Khalifa 124th/125th floor non-prime admission ticket',
      'Premium Desert Safari with 4x4 dune bashing, camel ride, belly dance, and BBQ dinner',
      'Dubai Marina Dhow Cruise with international buffet dinner',
      'Full-day Abu Dhabi city tour including Sheikh Zayed Grand Mosque',
      'Return Dubai Airport transfers in private AC vehicle'
    ],
    exclusions: ['International flights & UAE Tourist Visa', 'Tourism Dirham fee (payable directly at hotel)', 'Lunch meals'],
    itinerary: [
      { day: 1, title: 'Arrival in Dubai & Marina Dhow Cruise Dinner', details: 'Arrive at Dubai International Airport. Private transfer to hotel. In the evening, board a traditional wooden dhow for a 2-hour dinner cruise along Dubai Marina.' },
      { day: 2, title: 'Dubai City Tour & Burj Khalifa Top Floor', details: 'Morning city tour covering Dubai Frame, Palm Jumeirah, and Burj Al Arab. Evening visit to Dubai Mall and ascent to the 124th floor of Burj Khalifa.' },
      { day: 3, title: 'Thrilling Red Dunes Desert Safari with BBQ', details: 'Morning at leisure. Afternoon 4x4 Land Cruiser pickup for high dune bashing in the Lahbab red desert. Enjoy sunset photography, henna painting, fire show, and BBQ dinner.' },
      { day: 4, title: 'Full Day Abu Dhabi Tour & Grand Mosque', details: 'Day trip to UAE capital Abu Dhabi. Visit the architectural masterpiece Sheikh Zayed Grand Mosque, drive past Corniche, and stop at Ferrari World for photos.' },
      { day: 5, title: 'Gold Souk Shopping & Departure Flight', details: 'Shop for gold and spices in Deira Souk. Private transfer to Dubai Airport for flight home.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'international-swiss-postcard',
    slug: 'swiss-postcard-trail',
    name: 'Swiss Postcard Trail & Mount Titlis Alpine Magic',
    category: 'International',
    destination: 'Zurich, Lucerne & Interlaken, Switzerland',
    days: 8,
    nights: 7,
    price: 142900, // 10% uplift
    shortDescription: 'Journey through the heart of the Swiss Alps, visiting Zurich, Lucerne, Interlaken, and revolving cable car to Mount Titlis.',
    hotelDetails: '3-Star Alpine Boutique Hotels & 5-Star Luxury Panoramic Mountain Resorts',
    meals: 'Daily Swiss Continental Breakfast at all hotels',
    transportation: '8-day 2nd Class Swiss Travel Pass for unlimited train, bus, and boat rides',
    sightseeing: 'Mount Titlis revolving cable car, Jungfraujoch (Top of Europe), Lake Lucerne boat cruise, Chillon Castle, GoldenPass train',
    specialOffer: 'Swiss Pass Upgrade: Complimentary upgrade to 1st Class Swiss Pass for advance bookings',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '7 nights accommodation in handpicked alpine hotels',
      '8-day consecutive Swiss Travel Pass',
      'Excursion tickets to Mount Titlis (Rotair revolving cable car)',
      'Excursion tickets to Jungfraujoch - Top of Europe',
      'Daily continental breakfast',
      'Local city taxes and tourist fees'
    ],
    exclusions: ['International flights to/from Zurich', 'Schengen Visa fee & travel insurance', 'Lunch & dinner meals'],
    itinerary: [
      { day: 1, title: 'Arrival in Zurich & Scenic Train to Lucerne', details: 'Arrive in Zurich. Board scenic Swiss train to Lucerne. Check in and explore Chapel Bridge and historic Old Town.' },
      { day: 2, title: 'Mount Titlis Snow Mountain Excursion', details: 'Take train to Engelberg, then ride the world’s first revolving TITLIS Rotair cable car to 3,020m summit. Walk through glacier cave and suspension bridge.' },
      { day: 3, title: 'Lake Lucerne Cruise & Panorama Train to Interlaken', details: 'Cruise on Lake Lucerne with your Swiss Pass. Board panorama train to Interlaken nestled between two lakes.' },
      { day: 4, title: 'Jungfraujoch - Top of Europe Journey', details: 'Cogwheel train ride up to Jungfraujoch, the highest railway station in Europe. Experience the Sphinx Observatory and Ice Palace.' },
      { day: 5, title: 'Interlaken Leisure Day & Adventure Options', details: 'Free day in Interlaken. Optional paragliding, Harder Kulm viewpoint, or boat ride on Lake Brienz.' },
      { day: 6, title: 'GoldenPass Panoramic Express to Montreux', details: 'Board GoldenPass panoramic train across mountain passes to lakeside Montreux on Lake Geneva.' },
      { day: 7, title: 'Chillon Castle Tour & Return to Zurich', details: 'Visit medieval Chillon Castle. Later take train back to Zurich for final night shopping on Bahnhofstrasse.' },
      { day: 8, title: 'Zurich Departure Flight', details: 'Short train to Zurich Airport and departure flight home.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'international-singapore-escape',
    slug: 'singapore-escape',
    name: 'Singapore Futuristic Escape & Sentosa Fantasy',
    category: 'International',
    destination: 'Singapore',
    days: 5,
    nights: 4,
    price: 54990, // 10% uplift
    shortDescription: 'Futuristic supertrees at Gardens by the Bay, Marina Bay Sands SkyPark, Universal Studios Singapore, and Sentosa cable car.',
    hotelDetails: '4-Star Premium City Hotel & 5-Star Marina Bay Luxury Hotel options',
    meals: 'Daily Buffet Breakfast included',
    transportation: 'Dedicated AC sedan airport pickup and sightseeing transfers',
    sightseeing: 'Gardens by the Bay (Flower Dome & Cloud Forest), Marina Bay Sands SkyPark, Sentosa Island, Universal Studios, Night Safari',
    specialOffer: 'Free admission to Sentosa Mount Faber Scenic Cable Car',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '4 nights hotel accommodation in central Singapore',
      'Daily international breakfast',
      'All private airport and sightseeing transfers in AC vehicle',
      'Entry tickets to Gardens by the Bay double domes',
      'Universal Studios 1-Day Pass'
    ],
    exclusions: ['Airfare & Singapore Visa', 'Lunch & dinner'],
    itinerary: [
      { day: 1, title: 'Arrival in Singapore & Night Safari', details: 'Arrive at Changi Airport. Transfer to hotel. In the evening, explore the world’s first nocturnal zoo on Night Safari tram.' },
      { day: 2, title: 'City Tour & Gardens by the Bay Supertrees', details: 'Visit Merlion Park, Chinatown, and Little India. Afternoon in Gardens by the Bay Cloud Forest and evening Supertree light show.' },
      { day: 3, title: 'Universal Studios Full Day Adventure', details: 'Spend a thrilling day at Universal Studios on Sentosa Island with rides, shows, and movie attractions.' },
      { day: 4, title: 'Sentosa Cable Car & Marina Bay Sands SkyPark', details: 'Ride Mount Faber cable car. Visit Marina Bay Sands SkyPark observation deck overlooking Singapore Strait.' },
      { day: 5, title: 'Jewel Changi Rain Vortex & Departure', details: 'Explore Jewel Changi indoor waterfall before departure flight.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'international-thailand-getaway',
    slug: 'thailand-getaway',
    name: 'Thailand Getaway: Bangkok Temples & Pattaya Coral Island',
    category: 'International',
    destination: 'Bangkok & Pattaya, Thailand',
    days: 5,
    nights: 4,
    price: 43900,
    shortDescription: 'Golden Buddha temples, speedboat to crystal clear Coral Island, vibrant nightlife, and floating markets.',
    hotelDetails: '4-Star Beachfront Resort in Pattaya & 4-Star/5-Star City Hotel in Bangkok',
    meals: 'Daily Breakfast and Coral Island seafood lunch',
    transportation: 'Dedicated AC private taxi for all transfers',
    sightseeing: 'Coral Island speed boating, Pattaya Viewpoint, Alcazar Show, Bangkok Golden Buddha, Chao Phraya river cruise',
    specialOffer: 'Complimentary VIP tickets to world famous Alcazar Cabaret Show',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '2 nights stay in Pattaya + 2 nights stay in Bangkok',
      'Daily breakfast + Indian lunch on Coral Island',
      'Speedboat transfer to Coral Island with parasailing option',
      'All intercity transfers in private AC cab'
    ],
    exclusions: ['Airfare & Thailand Visa on Arrival', 'Water sports rentals'],
    itinerary: [
      { day: 1, title: 'Bangkok Arrival & Drive to Pattaya', details: 'Arrive at Suvarnabhumi Airport. Drive to seaside resort town Pattaya. Evening Alcazar show.' },
      { day: 2, title: 'Coral Island Speedboat Tour with Lunch', details: 'Speedboat to Coral Island (Koh Larn) for snorkeling, water sports, and beach lunch.' },
      { day: 3, title: 'Drive to Bangkok & Golden Buddha Temple', details: 'Drive to Bangkok. Visit Wat Traimit (Golden Buddha) and Wat Mahaprutharam.' },
      { day: 4, title: 'Chao Phraya River Cruise & Shopping', details: 'Explore Chatuchak / MBK Center for shopping. Evening international buffet dinner cruise on Chao Phraya River.' },
      { day: 5, title: 'Departure Flight from Bangkok', details: 'Check out and transfer to airport for return flight.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'international-maldives-paradise',
    slug: 'maldives-paradise',
    name: 'Maldives Luxury Overwater Villa Paradise',
    category: 'International',
    destination: 'Maldives',
    days: 4,
    nights: 3,
    price: 62500,
    shortDescription: 'Unwind in tropical overwater villas perched over turquoise lagoons, house reef snorkeling, and dolphin sunset cruise.',
    hotelDetails: '4-Star Beachfront Deluxe Villa & 5-Star Luxury Overwater Pool Villa',
    meals: 'All-Inclusive Meals (Daily Breakfast, Lunch, Dinner & Drinks)',
    transportation: 'Return Speedboat / Seaplane transfers from Male Airport',
    sightseeing: 'House reef snorkeling, sunset dolphin cruise, private island beach walk',
    specialOffer: 'Honeymoon Special: Complimentary candle-lit beach dinner & bed decoration',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '3 nights stay in Luxury Overwater Lagoon Villa',
      'Daily breakfast, lunch, and dinner buffet with live cooking stations',
      'Unlimited soft drinks, juices, and select beverages',
      'Return speedboat transfers from Velana International Airport (Male)',
      'Complimentary snorkeling equipment use throughout stay'
    ],
    exclusions: ['International airfare to Male', 'Motorized water sports (Jet ski)', 'Spa massages'],
    itinerary: [
      { day: 1, title: 'Male Arrival & Speedboat to Private Island', details: 'Arrive at Male Airport. Meet resort representative and board speedboat to private island resort. Check into your overwater villa.' },
      { day: 2, title: 'Coral Reef Snorkeling & Marine Life', details: 'Step directly from your private villa deck into crystal lagoon. Snorkel with colorful tropical fish and baby reef sharks.' },
      { day: 3, title: 'Sunset Dolphin Cruise & Candlelight Dinner', details: 'Enjoy relaxing afternoon at infinity pool. In the evening, sail on a traditional Dhoni for sunset dolphin watching, followed by romantic dinner on the sand.' },
      { day: 4, title: 'Morning Lagoon Dip & Departure', details: 'Final morning swim in the azure waters. Check out and speedboat transfer back to Male Airport.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    id: 'international-bali-tropical-escape',
    slug: 'bali-tropical-escape',
    name: 'Bali Tropical Paradise: Ubud Terraces, Private Villa & Uluwatu',
    category: 'International',
    destination: 'Bali, Indonesia',
    days: 5,
    nights: 4,
    price: 49500,
    shortDescription: 'Private pool villas, sacred Monkey Forest, Tegallalang rice terraces, Bali Swing, and Uluwatu cliff temple sunset with Kecak dance.',
    hotelDetails: '3-Star Deluxe Private Pool Villa & 5-Star Luxury Jungle Resort',
    meals: 'Daily Breakfast & Floating Villa Breakfast included',
    transportation: 'Dedicated Private AC Vehicle with English-speaking Balinese driver',
    sightseeing: 'Tegallalang Rice Terraces, Bali Swing, Ubud Sacred Monkey Forest, Kintamani Volcano view, Uluwatu Cliff Temple, Tanahlot Sunset',
    specialOffer: 'Complimentary Floating Breakfast experience in your Private Pool Villa',
    negotiableText: 'Price is negotiable for every destination',
    inclusions: [
      '4 nights in private pool villa (twin sharing)',
      'Daily breakfast including 1 floating breakfast',
      'Private AC car for all tours and airport pickups with dedicated driver',
      'Entry tickets to Uluwatu Temple, Monkey Forest, and Tegenungan Waterfall',
      'Bali swing admission and safety harness'
    ],
    exclusions: ['International airfare to Denpasar (DPS)', 'Visa on Arrival ($35)', 'Lunch & dinner'],
    itinerary: [
      { day: 1, title: 'Arrival in Bali & Private Villa Check-in', details: 'Arrive at Ngurah Rai Airport. Welcome flower garland and transfer to private pool villa in Seminyak / Ubud.' },
      { day: 2, title: 'Ubud Cultural Highlights & Bali Swing', details: 'Explore Ubud Sacred Monkey Forest, Tegallalang Rice Terrace, and fly high over jungle canopy on the famous Bali Swing.' },
      { day: 3, title: 'Kintamani Volcano & Coffee Plantation', details: 'Scenic drive to Kintamani overlooking Mount Batur active volcano and lake. Taste authentic Luwak coffee at spice plantation.' },
      { day: 4, title: 'Uluwatu Sunset Temple & Fire Dance', details: 'Visit iconic Tanah Lot temple in the ocean. Later head to southern cliff of Uluwatu for dramatic sunset and Kecak Fire Dance.' },
      { day: 5, title: 'Souvenir Shopping & Departure Flight', details: 'Shop for Balinese rattan bags, silver jewelry, and aromatherapy oils. Transfer to airport for flight home.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isActive: true
  }
];
