import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  registerWithFirebase,
  loginWithFirebase,
  logoutWithFirebase,
  subscribeToAuthState,
  isFirebaseConfigured
} from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('snowcat_user_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse user profile from localStorage', e);
    }
    return null;
  });

  const [loading, setLoading] = useState(true);
  const isLoggedIn = !!user;

  // Firebase auth state observer
  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToAuthState((fbUser) => {
      if (fbUser) {
        const profile = {
          uid: fbUser.uid,
          name: fbUser.displayName || fbUser.email.split('@')[0],
          email: fbUser.email,
          phone: fbUser.phoneNumber || '',
          isLoggedIn: true
        };
        setUser(profile);
        localStorage.setItem('snowcat_user_profile', JSON.stringify(profile));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login (Firebase Auth with local fallback)
  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error('Please provide email and password');
    }
    const cleanEmail = email.trim().toLowerCase();

    // 1. Try Firebase Auth if configured
    if (isFirebaseConfigured) {
      try {
        const fbProfile = await loginWithFirebase(cleanEmail, password);
        setUser(fbProfile);
        localStorage.setItem('snowcat_user_profile', JSON.stringify(fbProfile));
        return fbProfile;
      } catch (fbErr) {
        console.warn('Firebase login attempt:', fbErr.message);
        throw fbErr;
      }
    }

    // 2. Local fallback
    const existingName = cleanEmail.split('@')[0];
    const formattedName = existingName.charAt(0).toUpperCase() + existingName.slice(1);
    
    const profile = {
      name: user?.name || formattedName,
      email: cleanEmail,
      phone: user?.phone || '+91 9876543210',
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    };
    
    setUser(profile);
    localStorage.setItem('snowcat_user_profile', JSON.stringify(profile));
    return profile;
  };

  // Signup (Firebase Auth with local fallback)
  const signup = async ({ name, email, phone, password }) => {
    if (!name || !email || !password) {
      throw new Error('Please fill in all required fields');
    }
    const cleanEmail = email.trim().toLowerCase();

    // 1. Try Firebase Auth if configured
    if (isFirebaseConfigured) {
      try {
        const fbProfile = await registerWithFirebase({
          name: name.trim(),
          email: cleanEmail,
          phone: phone ? phone.trim() : '',
          password
        });
        setUser(fbProfile);
        localStorage.setItem('snowcat_user_profile', JSON.stringify(fbProfile));
        return fbProfile;
      } catch (fbErr) {
        console.warn('Firebase signup attempt:', fbErr.message);
        throw fbErr;
      }
    }

    // 2. Local fallback
    const profile = {
      name: name.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : '',
      isLoggedIn: true,
      signupTime: new Date().toISOString()
    };

    setUser(profile);
    localStorage.setItem('snowcat_user_profile', JSON.stringify(profile));
    return profile;
  };

  const logout = async () => {
    if (isFirebaseConfigured) {
      try {
        await logoutWithFirebase();
      } catch (e) {
        console.warn('Firebase logout warning:', e);
      }
    }
    setUser(null);
    localStorage.removeItem('snowcat_user_profile');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn,
      loading,
      isFirebaseActive: isFirebaseConfigured,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
