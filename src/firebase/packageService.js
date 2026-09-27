import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  writeBatch
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

const PACKAGES_COLLECTION = 'packages';
const DELETED_PACKAGES_COLLECTION = 'deleted_packages';

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
 * Fetch all active packages from Firestore 'packages' collection.
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
    console.warn('Firestore fetch packages notice:', error.message || error);
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
    console.warn('Firestore save package notice:', error.message || error);
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
    console.warn('Firestore update package notice:', error.message || error);
    return { success: false, error };
  }
};

/**
 * Delete a package from active packages in Firestore.
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
    console.warn('Firestore delete package notice:', error.message || error);
    return { success: false, error };
  }
};

/**
 * Save deleted package to 'deleted_packages' history collection in Firestore.
 */
export const saveDeletedPackageToFirestore = async (pkg) => {
  if (!isFirebaseConfigured || !db) {
    return false;
  }

  try {
    const docId = String(pkg.slug || pkg.id || `del-${Date.now()}`);
    const docRef = doc(db, DELETED_PACKAGES_COLLECTION, docId);

    const dataToSave = cleanFirestorePayload({
      ...pkg,
      id: docId,
      originalSlug: pkg.slug || docId,
      deletedAt: new Date().toISOString(),
      deletedBy: 'Shabbir12'
    });

    await setDoc(docRef, dataToSave, { merge: true });
    return { success: true };
  } catch (error) {
    console.warn('Firestore save deleted package notice:', error.message || error);
    return { success: false, error };
  }
};

/**
 * Fetch all deleted packages history from Firestore.
 */
export const getDeletedPackagesFromFirestore = async () => {
  if (!isFirebaseConfigured || !db) {
    return [];
  }

  try {
    const deletedRef = collection(db, DELETED_PACKAGES_COLLECTION);
    const querySnapshot = await getDocs(deletedRef);

    if (querySnapshot.empty) {
      return [];
    }

    const list = [];
    querySnapshot.forEach((docSnap) => {
      list.push({
        id: docSnap.id,
        ...docSnap.data()
      });
    });

    return list;
  } catch (error) {
    console.warn('Firestore fetch deleted packages notice:', error.message || error);
    return [];
  }
};

/**
 * Permanently remove a record from deleted history in Firestore.
 */
export const removeDeletedPackageFromFirestore = async (docId) => {
  if (!isFirebaseConfigured || !db) {
    return false;
  }

  try {
    const docRef = doc(db, DELETED_PACKAGES_COLLECTION, String(docId));
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.warn('Firestore remove deleted package notice:', error.message || error);
    return { success: false, error };
  }
};

/**
 * Batch seed or sync a list of packages to Firestore in chunks.
 */
export const seedPackagesToFirestore = async (packagesList) => {
  if (!isFirebaseConfigured || !db) {
    return { success: false, count: 0 };
  }

  if (!Array.isArray(packagesList) || packagesList.length === 0) {
    return { success: false, count: 0 };
  }

  const chunkSize = 250;
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
