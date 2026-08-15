import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PackageProvider } from './context/PackageContext';
import { ToastProvider } from './components/animations/Toast';
import ScrollToTop from './components/animations/ScrollToTop';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import PackageDetail from './pages/PackageDetail';
import Enquiry from './pages/Enquiry';
import OwnerLogin from './pages/OwnerLogin';
import OwnerDashboard from './pages/OwnerDashboard';

export default function App() {
  return (
    <PackageProvider>
      <ToastProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navigation />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Home />} />
              <Route path="/package/:slug" element={<PackageDetail />} />
              <Route path="/enquire" element={<Enquiry />} />
              <Route path="/owner" element={<OwnerLogin />} />
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </BrowserRouter>
      </ToastProvider>
    </PackageProvider>
  );
}
