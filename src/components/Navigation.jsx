import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Home, Map, Send, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const location = useLocation();
  const isOwnerPortal = location.pathname.startsWith('/owner');
  const isPackageDetail = location.pathname.startsWith('/package/');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home', end: true },
    { path: '/explore', label: 'Explore', end: false },
    { path: '/enquire', label: 'Enquire', end: false },
  ];

  return (
    <>
      {/* Desktop Top Header Navigation */}
      <header className={`desktop-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <Link to="/" className="logo-container">
            <span className="curated-label">CURATED JOURNEYS</span>
            <div className="brand-name">
              snowcat<span> holidays</span>
            </div>
          </Link>
          
          <nav className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = link.end
                ? location.pathname === link.path
                : location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.end}
                  className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="nav-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </NavLink>
              );
            })}
            
            <NavLink
              to="/owner"
              className={({ isActive }) => (isActive ? 'nav-item portal active' : 'nav-item portal')}
            >
              <Settings size={16} />
              <span>Owner Portal</span>
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Sticky Navigation */}
      {!isPackageDetail && (
        <nav className="mobile-bottom-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'mobile-nav-item active' : 'mobile-nav-item')}>
            <motion.div whileTap={{ scale: 0.85 }} className="mobile-icon-wrapper">
              <Home size={20} />
            </motion.div>
            <span>Home</span>
          </NavLink>
          <NavLink to="/explore" className={({ isActive }) => (isActive ? 'mobile-nav-item active' : 'mobile-nav-item')}>
            <motion.div whileTap={{ scale: 0.85 }} className="mobile-icon-wrapper">
              <Map size={20} />
            </motion.div>
            <span>Explore</span>
          </NavLink>
          <NavLink to="/enquire" className={({ isActive }) => (isActive ? 'mobile-nav-item active' : 'mobile-nav-item')}>
            <motion.div whileTap={{ scale: 0.85 }} className="mobile-icon-wrapper">
              <Send size={20} />
            </motion.div>
            <span>Enquire</span>
          </NavLink>
          <NavLink to="/owner" className={({ isActive }) => (isActive ? 'mobile-nav-item active' : 'mobile-nav-item')}>
            <motion.div whileTap={{ scale: 0.85 }} className="mobile-icon-wrapper">
              <Settings size={20} />
            </motion.div>
            <span>Owner</span>
          </NavLink>
        </nav>
      )}

      <style>{`
        /* Desktop Header Styles */
        .desktop-header {
          display: none;
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: 14px 0;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .desktop-header.scrolled {
          background-color: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 20px rgba(11, 45, 72, 0.06);
          padding: 10px 0;
          border-bottom-color: rgba(226, 236, 239, 0.8);
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-container {
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease;
        }

        .logo-container:hover {
          transform: translateY(-1px);
        }

        .curated-label {
          font-size: 9px;
          font-weight: 700;
          color: var(--accent-teal);
          letter-spacing: 1.5px;
          margin-bottom: -2px;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .nav-item {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 6px 0;
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color var(--transition-fast);
        }

        .nav-active-pill {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: var(--accent-teal);
          border-radius: 2px;
        }

        .nav-item:hover {
          color: var(--text-primary);
        }

        .nav-item.active {
          color: var(--accent-teal);
        }

        .nav-item.portal {
          background-color: var(--bg-primary);
          padding: 8px 16px;
          border-radius: 50px;
          border: 1px solid var(--border-color);
          transition: all var(--transition-fast);
        }
        
        .nav-item.portal:hover {
          background-color: var(--accent-turquoise-light);
          border-color: var(--accent-teal);
          color: var(--accent-teal);
          transform: translateY(-1px);
        }

        .nav-item.portal.active {
          background-color: var(--accent-teal);
          border-color: var(--accent-teal);
          color: #FFFFFF;
        }

        /* Mobile Bottom Nav Styles */
        .mobile-bottom-nav {
          display: flex;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background-color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid var(--border-color);
          box-shadow: 0 -4px 15px rgba(11, 45, 72, 0.05);
          z-index: 1000;
          justify-content: space-around;
          align-items: center;
          padding-bottom: env(safe-area-inset-bottom);
        }

        .mobile-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          font-size: 11px;
          font-weight: 500;
          gap: 4px;
          width: 25%;
          height: 100%;
          transition: color var(--transition-fast);
        }

        .mobile-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-nav-item.active {
          color: var(--accent-teal);
          font-weight: 600;
        }

        @media (min-width: 768px) {
          .desktop-header {
            display: block;
          }
          .mobile-bottom-nav {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
