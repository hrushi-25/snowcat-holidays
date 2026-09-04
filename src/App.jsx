import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PackageProvider } from './context/PackageContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/animations/Toast';
import ScrollToTop from './components/animations/ScrollToTop';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Catalog from './pages/Catalog';
import PackageDetail from './pages/PackageDetail';
import Enquiry from './pages/Enquiry';
import UserAuth from './pages/UserAuth';
import OwnerLogin from './pages/OwnerLogin';
import OwnerDashboard from './pages/OwnerDashboard';

export default function App() {
  return (
    <AuthProvider>
      <PackageProvider>
        <ToastProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Navigation />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/catalog" element={<Explore />} />
                <Route path="/package/:slug" element={<PackageDetail />} />
                <Route path="/enquire" element={<Enquiry />} />
                <Route path="/auth" element={<UserAuth />} />
                <Route path="/login" element={<UserAuth />} />
                <Route path="/signup" element={<UserAuth />} />
                <Route path="/owner" element={<OwnerLogin />} />
                <Route path="/owner/dashboard" element={<OwnerDashboard />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </BrowserRouter>
        </ToastProvider>
      </PackageProvider>
    </AuthProvider>
  );
}
