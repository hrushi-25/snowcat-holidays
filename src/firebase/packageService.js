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
    const dataToSave = {
      ...pkg,
      id: docId,
      slug: pkg.slug || docId,
      updatedAt: serverTimestamp()
    };

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

    const dataToUpdate = {
      ...updates,
      updatedAt: serverTimestamp()
    };

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
 * Batch seed or sync a list of packages to Firestore in chunks of up to 500 (Firestore batch limit).
 */
export const seedPackagesToFirestore = async (packagesList) => {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured yet. Please configure .env credentials.');
  }

  if (!Array.isArray(packagesList) || packagesList.length === 0) {
    throw new Error('No packages provided to seed.');
  }

  const chunkSize = 400;
  let totalSaved = 0;

  for (let i = 0; i < packagesList.length; i += chunkSize) {
    const chunk = packagesList.slice(i, i + chunkSize);
    const batch = writeBatch(db);

    chunk.forEach((pkg) => {
      const docId = String(pkg.slug || pkg.id || `pkg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`);
      const docRef = doc(db, PACKAGES_COLLECTION, docId);
      batch.set(docRef, {
        ...pkg,
        id: docId,
        slug: pkg.slug || docId,
        syncedAt: serverTimestamp()
      }, { merge: true });
      totalSaved++;
    });

    await batch.commit();
  }

  return { success: true, count: totalSaved };
};
