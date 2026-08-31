import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Map, Send, User, LogIn, ChevronDown, LogOut, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuth();
  const isPackageDetail = location.pathname.startsWith('/package/');
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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

  // Close user dropdown on route change
  useEffect(() => {
    setUserMenuOpen(false);
  }, [location.pathname]);

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
            <img src="/snowcat-logo.png" alt="Snowcat Holidays Logo" className="nav-logo-img" />
            <div className="logo-text-group">
              <span className="curated-label">CURATED JOURNEYS</span>
              <div className="brand-name">
                Snowcat<span> holidays</span>
              </div>
            </div>
          </Link>
          
          <nav className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = link.end
                ? location.pathname === link.path
                : location.pathname.startsWith(link.path);
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
            
            {/* User Auth / Profile Button */}
            {isLoggedIn && user ? (
              <div className="user-dropdown-container">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="user-nav-pill shadow-realistic-sm"
                  aria-expanded={userMenuOpen}
                >
                  <div className="user-avatar-circle">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="user-nav-name">{user.name || 'Account'}</span>
                  <ChevronDown size={14} className={`dropdown-arrow ${userMenuOpen ? 'open' : ''}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="user-dropdown-menu shadow-realistic-lg"
                    >
                      <div className="dropdown-user-header">
                        <div className="dropdown-user-name">{user.name}</div>
                        <div className="dropdown-user-email">{user.email}</div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link to="/auth" className="dropdown-menu-item">
                        <User size={16} />
                        <span>Traveller Profile</span>
                      </Link>
                      <Link to="/enquire" className="dropdown-menu-item">
                        <Send size={16} />
                        <span>My Enquiries</span>
                      </Link>
                      <Link to="/owner" className="dropdown-menu-item">
                        <Shield size={16} />
                        <span>Staff Portal</span>
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button onClick={logout} className="dropdown-menu-item logout">
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                to="/auth"
                className={({ isActive }) => (isActive ? 'nav-item user-auth-btn active' : 'nav-item user-auth-btn')}
              >
                <LogIn size={16} />
                <span>Sign In / Sign Up</span>
              </NavLink>
            )}
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

          <NavLink to="/auth" className={({ isActive }) => (isActive ? 'mobile-nav-item active' : 'mobile-nav-item')}>
            <motion.div whileTap={{ scale: 0.85 }} className="mobile-icon-wrapper">
              <User size={20} />
            </motion.div>
            <span>{isLoggedIn ? 'Profile' : 'Sign In'}</span>
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
          background-color: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: var(--shadow-realistic-md);
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
          align-items: center;
          gap: 12px;
          transition: transform 0.2s ease;
          text-decoration: none;
        }

        .logo-container:hover {
          transform: translateY(-1px);
        }

        .nav-logo-img {
          height: 44px;
          width: auto;
          max-width: 60px;
          object-fit: contain;
          display: block;
        }

        .logo-text-group {
          display: flex;
          flex-direction: column;
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

        .user-auth-btn {
          background-color: var(--accent-turquoise-light);
          color: var(--accent-teal) !important;
          padding: 8px 18px;
          border-radius: 50px;
          border: 1px solid var(--accent-teal);
          font-weight: 700;
          font-size: 14px;
          transition: all var(--transition-fast);
        }
        
        .user-auth-btn:hover {
          background-color: var(--accent-teal);
          color: #FFFFFF !important;
          transform: translateY(-1px);
        }

        .user-auth-btn.active {
          background-color: var(--accent-teal);
          color: #FFFFFF !important;
        }

        /* User Dropdown */
        .user-dropdown-container {
          position: relative;
        }

        .user-nav-pill {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 6px 14px 6px 8px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-family: var(--font-sans);
          transition: all var(--transition-fast);
        }
        .user-nav-pill:hover {
          border-color: var(--accent-teal);
          background: var(--accent-turquoise-light);
        }

        .user-avatar-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--accent-teal);
          color: #FFFFFF;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-nav-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          max-width: 110px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dropdown-arrow {
          color: var(--text-secondary);
          transition: transform 0.2s ease;
        }
        .dropdown-arrow.open {
          transform: rotate(180deg);
        }

        .user-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 220px;
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(226, 236, 239, 0.9);
          padding: 8px;
          z-index: 1001;
        }

        .dropdown-user-header {
          padding: 8px 12px;
        }
        .dropdown-user-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .dropdown-user-email {
          font-size: 12px;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dropdown-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 6px 0;
        }

        .dropdown-menu-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        .dropdown-menu-item:hover {
          background-color: var(--bg-primary);
          color: var(--accent-teal);
        }
        .dropdown-menu-item.logout {
          color: var(--danger-color);
        }
        .dropdown-menu-item.logout:hover {
          background-color: var(--danger-bg);
        }

        /* Mobile Bottom Nav Styles */
        .mobile-bottom-nav {
          display: flex;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background-color: rgba(255, 255, 255, 0.94);
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
