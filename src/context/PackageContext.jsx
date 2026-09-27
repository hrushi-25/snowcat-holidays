import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import localDestinationsData from '../data/destinations_data.json';
import { STATIC_PACKAGES } from '../data/staticPackages';
import {
  getPackagesFromFirestore,
  savePackageToFirestore,
  updatePackageInFirestore,
  deletePackageFromFirestore,
  saveDeletedPackageToFirestore,
  getDeletedPackagesFromFirestore,
  removeDeletedPackageFromFirestore,
  seedPackagesToFirestore,
  isFirebaseConfigured
} from '../firebase';

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

// Build rich initial packages synchronously for instant initial load
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
  const [deletedHistory, setDeletedHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('snowcat_deleted_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [loadingFromFirebase, setLoadingFromFirebase] = useState(false);

  // Load active packages and deleted history from Firebase Firestore
  const refreshPackages = useCallback(async () => {
    if (isFirebaseConfigured) {
      try {
        setLoadingFromFirebase(true);
        const fbPackages = await getPackagesFromFirestore();
        if (Array.isArray(fbPackages) && fbPackages.length > 0) {
          const normalizedFb = fbPackages.map(normalizeFromApi);
          const map = new Map();
          INITIAL_PACKAGES.forEach(p => map.set(p.slug || p.id, p));
          normalizedFb.forEach(p => map.set(p.slug || p.id, p));
          setPackages(Array.from(map.values()));
        } else {
          // Auto-seed initial packages to Firestore
          seedPackagesToFirestore(INITIAL_PACKAGES).then(res => {
            console.info(`Auto-populated ${res.count} packages into Cloud Firestore.`);
          }).catch(err => {
            console.warn('Auto-seed initial packages notice:', err);
          });
        }

        // Fetch deleted packages history
        const fbDeleted = await getDeletedPackagesFromFirestore();
        if (Array.isArray(fbDeleted) && fbDeleted.length > 0) {
          setDeletedHistory(fbDeleted);
          localStorage.setItem('snowcat_deleted_history', JSON.stringify(fbDeleted));
        }
      } catch (fbErr) {
        console.warn('Firebase package load warning:', fbErr);
      } finally {
        setLoadingFromFirebase(false);
      }
    }
  }, []);

  useEffect(() => {
    refreshPackages();
  }, [refreshPackages]);

  // Create package
  const addPackage = async (pkg) => {
    const slug = pkg.slug || generateSlug(pkg.name || pkg.packageName);
    const normalizedNew = normalizeFromApi({
      ...pkg,
      id: pkg.id || slug || `pkg-${Date.now()}`,
      slug: slug,
      isActive: true
    });

    // Save to Firebase Firestore
    if (isFirebaseConfigured) {
      savePackageToFirestore(normalizedNew).catch(err => console.warn('Firestore add package notice:', err));
    }

    setPackages(prev => [normalizedNew, ...prev]);
    return normalizedNew;
  };

  // Update package
  const updatePackage = async (updatedPkg) => {
    const norm = normalizeFromApi(updatedPkg);
    const identifier = norm.slug || norm.id;

    // Update in Firebase Firestore
    if (isFirebaseConfigured) {
      updatePackageInFirestore(identifier, norm).catch(err => console.warn('Firestore update package notice:', err));
    }

    setPackages(prev => prev.map(p => (p.slug === norm.slug || p.id === norm.id ? norm : p)));
  };

  // Delete package (moves to Deleted History)
  const deletePackage = async (slugOrId) => {
    const target = packages.find(p => p.slug === slugOrId || p.id === slugOrId);

    if (target) {
      const deletedRecord = {
        ...target,
        deletedAt: new Date().toISOString(),
        deletedBy: 'Shabbir12'
      };

      // 1. Save to Deleted History in Firestore
      if (isFirebaseConfigured) {
        saveDeletedPackageToFirestore(deletedRecord).catch(err => console.warn('Firestore save deleted notice:', err));
        deletePackageFromFirestore(slugOrId).catch(err => console.warn('Firestore delete notice:', err));
      }

      // 2. Update local deleted history
      setDeletedHistory(prev => {
        const updated = [deletedRecord, ...prev.filter(d => (d.slug || d.id) !== slugOrId)];
        localStorage.setItem('snowcat_deleted_history', JSON.stringify(updated));
        return updated;
      });
    }

    setPackages(prev => prev.filter(p => p.slug !== slugOrId && p.id !== slugOrId));
  };

  // Restore package from Deleted History back to active catalog
  const restorePackage = async (deletedPkg) => {
    const identifier = deletedPkg.slug || deletedPkg.id;
    const restoredPkg = normalizeFromApi({
      ...deletedPkg,
      isActive: true
    });

    // 1. Re-add to active packages in Firestore & remove from deleted history collection
    if (isFirebaseConfigured) {
      savePackageToFirestore(restoredPkg).catch(err => console.warn('Firestore restore notice:', err));
      removeDeletedPackageFromFirestore(deletedPkg.id || identifier).catch(err => console.warn('Firestore remove deleted notice:', err));
    }

    // 2. Update local states
    setPackages(prev => [restoredPkg, ...prev]);
    setDeletedHistory(prev => {
      const updated = prev.filter(d => (d.slug || d.id) !== identifier && d.id !== deletedPkg.id);
      localStorage.setItem('snowcat_deleted_history', JSON.stringify(updated));
      return updated;
    });

    return restoredPkg;
  };

  // Permanently delete a package from history
  const permanentlyDeletePackage = async (docIdOrSlug) => {
    if (isFirebaseConfigured) {
      removeDeletedPackageFromFirestore(docIdOrSlug).catch(err => console.warn('Firestore perm delete notice:', err));
    }
    setDeletedHistory(prev => {
      const updated = prev.filter(d => (d.id || d.slug) !== docIdOrSlug);
      localStorage.setItem('snowcat_deleted_history', JSON.stringify(updated));
      return updated;
    });
  };

  // Clear all deleted history
  const clearDeletedHistory = async () => {
    if (isFirebaseConfigured) {
      deletedHistory.forEach(d => {
        removeDeletedPackageFromFirestore(d.id || d.slug).catch(() => {});
      });
    }
    setDeletedHistory([]);
    localStorage.removeItem('snowcat_deleted_history');
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
      deletedHistory,
      loadingFromFirebase,
      isFirebaseConnected: isFirebaseConfigured,
      refreshPackages,
      addPackage,
      updatePackage,
      deletePackage,
      restorePackage,
      permanentlyDeletePackage,
      clearDeletedHistory,
      togglePackageActive,
      togglePackageFeatured
    }}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackages = () => useContext(PackageContext);