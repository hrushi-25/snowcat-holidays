import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './config';

/**
 * Register a user in Firebase Auth and create their Firestore user profile document.
 */
export const registerWithFirebase = async ({ name, email, phone, password }) => {
  if (!isFirebaseConfigured || !auth) {
    throw new Error('Firebase Authentication is not configured');
  }

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Update Auth profile name
  if (name) {
    await updateProfile(user, { displayName: name });
  }

  // Create document in 'users' collection
  if (db) {
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name: name || email.split('@')[0],
        email: email.toLowerCase(),
        phone: phone || '',
        createdAt: serverTimestamp(),
        role: 'traveller'
      }, { merge: true });
    } catch (dbErr) {
      console.warn('Could not store extra user document in Firestore:', dbErr);
    }
  }

  return {
    uid: user.uid,
    name: name || email.split('@')[0],
    email: user.email,
    phone: phone || '',
    isLoggedIn: true
  };
};

/**
 * Log in a user with Firebase Auth and retrieve their Firestore profile.
 */
export const loginWithFirebase = async (email, password) => {
  if (!isFirebaseConfigured || !auth) {
    throw new Error('Firebase Authentication is not configured');
  }

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  let extraProfile = {};
  if (db) {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        extraProfile = userDoc.data();
      }
    } catch (dbErr) {
      console.warn('Could not fetch extra profile from Firestore:', dbErr);
    }
  }

  return {
    uid: user.uid,
    name: extraProfile.name || user.displayName || email.split('@')[0],
    email: user.email,
    phone: extraProfile.phone || user.phoneNumber || '',
    role: extraProfile.role || 'traveller',
    isLoggedIn: true
  };
};

/**
 * Verify owner credentials instantly and sync owner document in Firestore non-blockingly.
 */
export const verifyAndSyncOwnerInFirestore = async (username, password) => {
  const cleanUser = (username || '').trim();
  const cleanPass = (password || '').trim();

  const isOwnerUser = cleanUser.toLowerCase() === 'shabbir12';
  const isOwnerPass = cleanPass === 'Snowcat#123';

  if (!isOwnerUser || !isOwnerPass) {
    return { success: false, message: 'Invalid username or password' };
  }

  // Non-blocking background Firestore sync with 1.5s timeout guard so UI never hangs
  if (isFirebaseConfigured && db) {
    const savePromise = setDoc(doc(db, 'admin_users', 'shabbir12'), {
      username: 'Shabbir12',
      role: 'owner',
      portal: 'Snowcat Holidays Owner Portal',
      lastLogin: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    }, { merge: true }).catch(err => {
      console.warn('Firestore admin_users background sync warning:', err);
    });

    const timeoutPromise = new Promise(resolve => setTimeout(resolve, 800));
    await Promise.race([savePromise, timeoutPromise]);
  }

  return {
    success: true,
    user: {
      username: 'Shabbir12',
      role: 'owner',
      loginTime: new Date().toISOString()
    }
  };
};

/**
 * Log out current Firebase user.
 */
export const logoutWithFirebase = async () => {
  if (!isFirebaseConfigured || !auth) {
    return;
  }
  await signOut(auth);
};

/**
 * Listen to Firebase Auth state changes.
 */
export const subscribeToAuthState = (callback) => {
  if (!isFirebaseConfigured || !auth) {
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};
