import { API_URL } from '../utils/api';
import React, { createContext, useState, useEffect, useContext } from 'react';
import localDestinationsData from '../data/destinations_data.json';
import { STATIC_PACKAGES } from '../data/staticPackages';

const PackageContext = createContext();

// Helper to create a clean URL-friendly slug
const generateSlug = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const normalizeFromApi = (apiPkg) => {
  const isIntl = (apiPkg.category || '').toLowerCase() === 'international' || 
                 (apiPkg.country && apiPkg.country.toLowerCase() !== 'india');
  const cat = isIntl ? 'International' : 'India';
  const discPrice = apiPkg.pricing?.discountedPrice ?? apiPkg.discounted_price ?? apiPkg.price ?? 0;
  const startPrice = apiPkg.pricing?.startingPrice ?? apiPkg.starting_price ?? discPrice;
  const currency = apiPkg.pricing?.currency ?? apiPkg.currency ?? 'INR';

  const photoList = Array.isArray(apiPkg.photos) && apiPkg.photos.length > 0 
    ? apiPkg.photos 
    : (Array.isArray(apiPkg.images) && apiPkg.images.length > 0
        ? apiPkg.images.map(img => (typeof img === 'string' ? img : img.image))
        : []);

  return {
    id: apiPkg.id || apiPkg.subId || apiPkg.package_id,
    subId: apiPkg.subId || apiPkg.id || apiPkg.package_id,
    slug: apiPkg.slug || generateSlug(apiPkg.packageName || apiPkg.name) || String(apiPkg.id || apiPkg.subId),
    name: apiPkg.packageName || apiPkg.name,
    packageName: apiPkg.packageName || apiPkg.name,
    category: cat,
    destination: apiPkg.destination || apiPkg.country || apiPkg.subName,
    country: apiPkg.country || (isIntl ? apiPkg.destination : 'India'),
    subName: apiPkg.subName,
    state: apiPkg.state || apiPkg.stateName,
    stateId: apiPkg.stateId,
    days: apiPkg.days || 1,
    nights: apiPkg.nights || 0,
    duration: apiPkg.duration || `${apiPkg.nights || 0} Nights / ${apiPkg.days || 1} Days`,
    price: discPrice,
    pricing: {
      startingPrice: startPrice,
      discountedPrice: discPrice,
      currency: currency,
      perPerson: true
    },
    shortDescription: apiPkg.short_description || apiPkg.shortDescription,
    hotelDetails: apiPkg.hotel_details || apiPkg.hotelDetails || '3-Star Deluxe & 5-Star Luxury Resort options available',
    meals: apiPkg.meals || 'Daily Breakfast included',
    transportation: apiPkg.mode_of_transport || apiPkg.modeOfTransport || apiPkg.transportation,
    modeOfTransport: apiPkg.mode_of_transport || apiPkg.modeOfTransport || apiPkg.transportation,
    sightseeing: apiPkg.sightseeing,
    specialOffer: apiPkg.special_offer || apiPkg.specialOffer,
    negotiableText: 'Price is negotiable for every destination',
    inclusions: Array.isArray(apiPkg.inclusions) ? apiPkg.inclusions : [],
    exclusions: Array.isArray(apiPkg.exclusions) ? apiPkg.exclusions : [],
    itinerary: apiPkg.itinerary || [],
    images: photoList,
    photos: photoList,
    isFeatured: apiPkg.is_featured ?? apiPkg.isFeatured ?? true,
    isActive: apiPkg.is_active ?? apiPkg.isActive ?? true,
  };
};

const normalizeToApi = (pkg) => ({
  name: pkg.name || pkg.packageName,
  package_name: pkg.packageName || pkg.name,
  category: pkg.category,
  destination: pkg.destination,
  country: pkg.country,
  days: pkg.days || 1,
  nights: pkg.nights || 0,
  duration: pkg.duration || `${pkg.nights || 0} Nights / ${pkg.days || 1} Days`,
  price: pkg.pricing?.discountedPrice ?? pkg.price,
  starting_price: pkg.pricing?.startingPrice ?? pkg.startingPrice ?? pkg.price,
  discounted_price: pkg.pricing?.discountedPrice ?? pkg.discountedPrice ?? pkg.price,
  currency: pkg.pricing?.currency ?? pkg.currency ?? 'INR',
  short_description: pkg.shortDescription || pkg.short_description,
  hotel_details: pkg.hotelDetails || pkg.hotel_details,
  meals: pkg.meals,
  transportation: pkg.modeOfTransport || pkg.transportation,
  mode_of_transport: pkg.modeOfTransport || pkg.transportation,
  sightseeing: pkg.sightseeing,
  special_offer: pkg.specialOffer || pkg.special_offer,
  inclusions: pkg.inclusions || [],
  exclusions: pkg.exclusions || [],
  itinerary: pkg.itinerary || [],
  photos: pkg.photos || pkg.images || [],
  is_featured: pkg.isFeatured,
  is_active: pkg.isActive,
});

// Build rich initial packages synchronously for 0ms initial load
const buildInitialPackages = () => {
  const map = new Map();

  if (Array.isArray(STATIC_PACKAGES)) {
    STATIC_PACKAGES.forEach(p => {
      const norm = normalizeFromApi(p);
      const key = norm.slug || norm.id;
      if (key) map.set(key, norm);
    });
  }

  if (localDestinationsData.international) {
    localDestinationsData.international.forEach(p => {
      const norm = normalizeFromApi(p);
      const key = norm.slug || norm.id;
      if (key) map.set(key, norm);
    });
  }

  if (localDestinationsData.india) {
    localDestinationsData.india.forEach(st => {
      (st.subDestinations || []).forEach(sub => {
        const norm = normalizeFromApi({ ...sub, state: st.stateName, stateId: st.stateId });
        const key = norm.slug || norm.id;
        if (key) map.set(key, norm);
      });
    });
  }

  return Array.from(map.values());
};

const INITIAL_PACKAGES = buildInitialPackages();

export const PackageProvider = ({ children }) => {
  const [packages, setPackages] = useState(INITIAL_PACKAGES);

  // Background revalidation with live backend
  useEffect(() => {
    let isMounted = true;
    fetch(`${API_URL}/api/packages/`)
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!isMounted) return;
        if (Array.isArray(data) && data.length > 0) {
          const apiPkgs = data.map(normalizeFromApi);
          const map = new Map();
          INITIAL_PACKAGES.forEach(p => map.set(p.slug || p.id, p));
          apiPkgs.forEach(p => map.set(p.slug || p.id, p));
          setPackages(Array.from(map.values()));
        }
      })
      .catch(() => {
        // Backend offline — instant local dataset remains active
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Create
  const addPackage = async (pkg) => {
    try {
      const res = await fetch(`${API_URL}/api/packages/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(normalizeToApi(pkg)),
      });
      if (res.ok) {
        const saved = await res.json();
        const newPkg = normalizeFromApi(saved);
        setPackages(prev => [newPkg, ...prev]);
        return newPkg;
      }
    } catch (e) {
      console.warn('Backend unavailable, saving package locally', e);
    }
    // Local fallback
    const localPkg = {
      ...pkg,
      id: pkg.id || `local-${Date.now()}`,
      slug: pkg.slug || generateSlug(pkg.name),
      isActive: true
    };
    setPackages(prev => [localPkg, ...prev]);
    return localPkg;
  };

  // Update
  const updatePackage = async (updatedPkg) => {
    try {
      const res = await fetch(`${API_URL}/api/packages/${updatedPkg.slug}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(normalizeToApi(updatedPkg)),
      });
      if (res.ok) {
        const saved = await res.json();
        const normalized = normalizeFromApi(saved);
        setPackages(prev => prev.map(p => (p.slug === normalized.slug || p.id === normalized.id ? normalized : p)));
        return;
      }
    } catch (e) {
      console.warn('Backend unavailable, updating package locally', e);
    }
    // Local update
    setPackages(prev => prev.map(p => (p.slug === updatedPkg.slug || p.id === updatedPkg.id ? updatedPkg : p)));
  };

  // Delete
  const deletePackage = async (slug) => {
    try {
      await fetch(`${API_URL}/api/packages/${slug}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
      });
    } catch (e) {
      console.warn('Backend unavailable, removing package locally', e);
    }
    setPackages(prev => prev.filter(p => p.slug !== slug && p.id !== slug));
  };

  // Toggle Active
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