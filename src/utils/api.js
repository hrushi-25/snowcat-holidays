/**
 * Central API configuration helper for Snowcat Holidays frontend.
 */

export const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://127.0.0.1:8000';
    }
  }
  return 'https://snowcat-backend-8jjf.onrender.com';
};

export const API_URL = getApiUrl();
