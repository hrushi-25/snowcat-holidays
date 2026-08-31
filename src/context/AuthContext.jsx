import React, { createContext, useState, useEffect, useContext } from 'react';

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

  const isLoggedIn = !!user;

  // Mock / Formality Login
  const login = async (email, password) => {
    // Basic formality check
    if (!email || !password) {
      throw new Error('Please provide email and password');
    }
    const cleanEmail = email.trim().toLowerCase();
    // Default name derived from email or stored profile
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

  // Mock / Formality Signup
  const signup = async ({ name, email, phone, password }) => {
    if (!name || !email || !password) {
      throw new Error('Please fill in all required fields');
    }
    const profile = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      isLoggedIn: true,
      signupTime: new Date().toISOString()
    };

    setUser(profile);
    localStorage.setItem('snowcat_user_profile', JSON.stringify(profile));
    return profile;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('snowcat_user_profile');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
