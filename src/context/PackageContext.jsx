import { API_URL } from '../utils/api';
import React, { createContext, useState, useEffect, useContext } from 'react';
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

const normalizeFromApi = (apiPkg) => ({
  id: apiPkg.id,
  slug: apiPkg.slug || generateSlug(apiPkg.name) || String(apiPkg.id),
  name: apiPkg.name,
  category: apiPkg.category,
  destination: apiPkg.destination,
  days: apiPkg.days,
  nights: apiPkg.nights,
  price: Math.round(Number(apiPkg.price || 0) * 1.1) || apiPkg.price, // 10% price addition
  shortDescription: apiPkg.short_description || apiPkg.shortDescription,
  hotelDetails: apiPkg.hotel_details || apiPkg.hotelDetails || '3-Star Deluxe & 5-Star Luxury Resort options available',
  meals: apiPkg.meals,
  transportation: apiPkg.transportation,
  sightseeing: apiPkg.sightseeing,
  specialOffer: apiPkg.special_offer || apiPkg.specialOffer,
  negotiableText: 'Price is negotiable for every destination',
  inclusions: Array.isArray(apiPkg.inclusions) ? apiPkg.inclusions : [],
  exclusions: Array.isArray(apiPkg.exclusions) ? apiPkg.exclusions : [],
  itinerary: apiPkg.itinerary || [],
  images: (apiPkg.images || []).map(img => (typeof img === 'string' ? img : img.image)),
  isFeatured: apiPkg.is_featured ?? apiPkg.isFeatured ?? false,
  isActive: apiPkg.is_active ?? apiPkg.isActive ?? true,
});

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
  const [packages, setPackages] = useState(STATIC_PACKAGES);

  // Load packages from backend, and merge with STATIC_PACKAGES so all static showcases remain available
  useEffect(() => {
    fetch(`${API_URL}/api/packages/`)
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const apiPkgs = data.map(normalizeFromApi);
          // Combine API packages with static showcase packages without duplicating by slug or id
          const existingSlugs = new Set(apiPkgs.map(p => p.slug || p.id));
          const uniqueStatic = STATIC_PACKAGES.filter(p => !existingSlugs.has(p.slug) && !existingSlugs.has(p.id));
          setPackages([...apiPkgs, ...uniqueStatic]);
        } else {
          setPackages(STATIC_PACKAGES);
        }
      })
      .catch(err => {
        // Backend offline or unreachable — keep full static packages showcase
        setPackages(STATIC_PACKAGES);
      });
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