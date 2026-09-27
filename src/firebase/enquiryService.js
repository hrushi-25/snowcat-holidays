import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

const ENQUIRIES_COLLECTION = 'enquiries';

/**
 * Save a new enquiry / booking lead to Firestore.
 */
export const saveEnquiryToFirestore = async (enquiryData) => {
  if (!isFirebaseConfigured || !db) {
    return { success: false, reason: 'Firebase not configured' };
  }

  try {
    const docRef = await addDoc(collection(db, ENQUIRIES_COLLECTION), {
      ...enquiryData,
      contacted: false,
      status: 'pending',
      createdAt: serverTimestamp(),
      created_at: new Date().toISOString()
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving enquiry to Firestore:', error);
    return { success: false, error };
  }
};

/**
 * Get all enquiries from Firestore ordered by creation date descending.
 */
export const getEnquiriesFromFirestore = async () => {
  if (!isFirebaseConfigured || !db) {
    return [];
  }

  try {
    const enquiriesRef = collection(db, ENQUIRIES_COLLECTION);
    const q = query(enquiriesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const enquiries = [];
    querySnapshot.forEach((docSnap) => {
      enquiries.push({
        id: docSnap.id,
        ...docSnap.data()
      });
    });

    return enquiries;
  } catch (error) {
    console.error('Error fetching enquiries from Firestore:', error);
    // Fallback if orderBy index isn't ready
    try {
      const basicSnapshot = await getDocs(collection(db, ENQUIRIES_COLLECTION));
      const list = [];
      basicSnapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      return list;
    } catch (fallbackErr) {
      console.error('Fallback fetch enquiries also failed:', fallbackErr);
      return [];
    }
  }
};

/**
 * Real-time subscription to enquiries for the Owner Dashboard.
 * Returns an unsubscribe function.
 */
export const subscribeToEnquiries = (onData, onError) => {
  if (!isFirebaseConfigured || !db) {
    return () => {};
  }

  try {
    const enquiriesRef = collection(db, ENQUIRIES_COLLECTION);
    const q = query(enquiriesRef, orderBy('createdAt', 'desc'));

    return onSnapshot(
      q,
      (snapshot) => {
        const list = [];
        snapshot.forEach((docSnap) => {
          list.push({
            id: docSnap.id,
            ...docSnap.data()
          });
        });
        onData(list);
      },
      (error) => {
        console.warn('Realtime enquiry listener fallback:', error);
        // Fallback to unordered subscription if index is pending
        const unsubBasic = onSnapshot(collection(db, ENQUIRIES_COLLECTION), (basicSnap) => {
          const list = [];
          basicSnap.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() });
          });
          onData(list);
        }, onError);
        return unsubBasic;
      }
    );
  } catch (err) {
    if (onError) onError(err);
    return () => {};
  }
};

/**
 * Update contacted status of an enquiry.
 */
export const toggleEnquiryContactedInFirestore = async (enquiryId, currentContactedStatus) => {
  if (!isFirebaseConfigured || !db) {
    return false;
  }

  try {
    const docRef = doc(db, ENQUIRIES_COLLECTION, enquiryId);
    await updateDoc(docRef, {
      contacted: !currentContactedStatus,
      status: !currentContactedStatus ? 'contacted' : 'pending',
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating enquiry in Firestore:', error);
    return false;
  }
};

/**
 * Delete an enquiry from Firestore.
 */
export const deleteEnquiryFromFirestore = async (enquiryId) => {
  if (!isFirebaseConfigured || !db) {
    return false;
  }

  try {
    const docRef = doc(db, ENQUIRIES_COLLECTION, enquiryId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting enquiry from Firestore:', error);
    return false;
  }
};
