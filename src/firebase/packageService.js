import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

const PACKAGES_COLLECTION = 'packages';

/**
 * Recursively clean objects for Firestore by removing all `undefined` values.
 */
export const cleanFirestorePayload = (data) => {
  if (data === null || data === undefined) {
    return null;
  }
  if (typeof data !== 'object') {
    return data;
  }
  if (Array.isArray(data)) {
    return data
      .filter((item) => item !== undefined)
      .map((item) => cleanFirestorePayload(item));
  }
  const cleaned = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      cleaned[key] = cleanFirestorePayload(value);
    }
  }
  return cleaned;
};

/**
 * Fetch all packages from Firestore 'packages' collection.
 */
export const getPackagesFromFirestore = async () => {
  if (!isFirebaseConfigured || !db) {
    return null;
  }

  try {
    const packagesRef = collection(db, PACKAGES_COLLECTION);
    const q = query(packagesRef);
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    const fetchedPackages = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      fetchedPackages.push({
        id: docSnap.id,
        ...data
      });
    });

    return fetchedPackages;
  } catch (error) {
    console.error('Error fetching packages from Firestore:', error);
    return null;
  }
};

/**
 * Add or overwrite a package in Firestore.
 */
export const savePackageToFirestore = async (pkg) => {
  if (!isFirebaseConfigured || !db) {
    return false;
  }

  try {
    const docId = String(pkg.slug || pkg.id || `pkg-${Date.now()}`);
    const docRef = doc(db, PACKAGES_COLLECTION, docId);
    
    // Clean package data for Firestore
    const dataToSave = cleanFirestorePayload({
      ...pkg,
      id: docId,
      slug: pkg.slug || docId,
      updatedAt: new Date().toISOString()
    });

    await setDoc(docRef, dataToSave, { merge: true });
    return { success: true, id: docId, data: dataToSave };
  } catch (error) {
    console.error('Error saving package to Firestore:', error);
    return { success: false, error };
  }
};

/**
 * Update an existing package in Firestore.
 */
export const updatePackageInFirestore = async (pkgIdOrSlug, updates) => {
  if (!isFirebaseConfigured || !db) {
    return false;
  }

  try {
    const docId = String(pkgIdOrSlug);
    const docRef = doc(db, PACKAGES_COLLECTION, docId);

    const dataToUpdate = cleanFirestorePayload({
      ...updates,
      updatedAt: new Date().toISOString()
    });

    await setDoc(docRef, dataToUpdate, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Error updating package in Firestore:', error);
    return { success: false, error };
  }
};

/**
 * Delete a package from Firestore.
 */
export const deletePackageFromFirestore = async (pkgIdOrSlug) => {
  if (!isFirebaseConfigured || !db) {
    return false;
  }

  try {
    const docId = String(pkgIdOrSlug);
    const docRef = doc(db, PACKAGES_COLLECTION, docId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting package from Firestore:', error);
    return { success: false, error };
  }
};

/**
 * Batch seed or sync a list of packages to Firestore in chunks of up to 400.
 */
export const seedPackagesToFirestore = async (packagesList) => {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured yet. Please configure .env credentials.');
  }

  if (!Array.isArray(packagesList) || packagesList.length === 0) {
    throw new Error('No packages provided to seed.');
  }

  const chunkSize = 300;
  let totalSaved = 0;

  for (let i = 0; i < packagesList.length; i += chunkSize) {
    const chunk = packagesList.slice(i, i + chunkSize);
    const batch = writeBatch(db);

    chunk.forEach((pkg) => {
      const docId = String(pkg.slug || pkg.id || `pkg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`);
      const docRef = doc(db, PACKAGES_COLLECTION, docId);
      
      const cleanedData = cleanFirestorePayload({
        ...pkg,
        id: docId,
        slug: pkg.slug || docId,
        syncedAt: new Date().toISOString()
      });

      batch.set(docRef, cleanedData, { merge: true });
      totalSaved++;
    });

    await batch.commit();
  }

  return { success: true, count: totalSaved };
};
