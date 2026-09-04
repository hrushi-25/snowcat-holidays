import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/animations/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../components/animations/MagneticButton';
import {
  User,
  Mail,
  Lock,
  Phone,
  ArrowLeft,
  Sparkles,
  LogOut,
  Shield,
  Compass,
  ArrowRight
} from 'lucide-react';

export default function UserAuth() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  const [authMode, setAuthMode] = useState(initialMode); // 'login' | 'signup'

  const { user, isLoggedIn, login, signup, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      addToast('Please enter your email and password', 'error');
      return;
    }
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      addToast(`Welcome back, ${formData.email.split('@')[0]}!`, 'success');
      navigate(-1);
    } catch (err) {
      addToast(err.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      addToast('Please fill in Name, Email and Password', 'error');
      return;
    }
    if (formData.password.length < 4) {
      addToast('Password must be at least 4 characters long', 'error');
      return;
    }
    setLoading(true);
    try {
      await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      addToast(`Account created successfully! Welcome to Snowcat, ${formData.name}`, 'success');
      navigate(-1);
    } catch (err) {
      addToast(err.message || 'Signup failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestContinue = () => {
    addToast('Continuing as Guest traveller. Enjoy exploring!', 'info');
    navigate('/explore');
  };

  const handleQuickDemoLogin = async () => {
    setLoading(true);
    try {
      await login('traveller@snowcatholidays.com', 'password123');
      addToast('Signed in with guest traveller profile!', 'success');
      navigate(-1);
    } catch {
      addToast('Demo login error', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page container mobile-nav-padding">
      <div className="auth-card-wrapper">
        
        {/* Back Link */}
        <div className="auth-top-bar">
          <button onClick={() => navigate(-1)} className="auth-back-btn">
            <ArrowLeft size={16} />
            <span>Back to website</span>
          </button>
          
          <button onClick={handleGuestContinue} className="auth-skip-btn">
            <span>Skip for now</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* If already logged in, show Account Profile card */}
        {isLoggedIn && user ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="logged-in-card shadow-realistic-lg"
          >
            <div className="profile-avatar-circle shadow-realistic-md">
              <User size={36} />
            </div>
            
            <span className="profile-badge">TRAVELLER PROFILE</span>
            <h2 className="profile-name">Hello, {user.name || 'Traveller'}!</h2>
            <p className="profile-email">{user.email}</p>
            {user.phone && <p className="profile-phone">📱 {user.phone}</p>}

            <div className="profile-actions-grid">
              <Link to="/explore" className="btn-primary profile-btn">
                <Compass size={18} />
                <span>Explore Tour Packages</span>
              </Link>
              <Link to="/enquire" className="btn-secondary profile-btn">
                <Mail size={18} />
                <span>Custom Trip Enquiry</span>
              </Link>
            </div>

            <div className="profile-footer-row">
              <button
                onClick={() => {
                  logout();
                  addToast('You have signed out successfully.', 'info');
                }}
                className="btn-logout"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>

              <Link to="/owner" className="btn-owner-access">
                <Shield size={14} />
                <span>Agency Staff Login</span>
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Authentication Form (Sign In / Sign Up) */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="auth-card shadow-realistic-lg"
          >
            {/* Brand Header */}
            <div className="auth-header text-center">
              <div className="auth-icon-circle shadow-realistic-sm">
                <Sparkles size={22} className="sparkle-icon" />
              </div>
              <span className="curated-label">SNOWCAT HOLIDAYS</span>
              <h2 className="auth-title">
                {authMode === 'login' ? 'Sign in to your account' : 'Join Snowcat Holidays'}
              </h2>
              <p className="auth-subtitle">
                {authMode === 'login'
                  ? 'Access your saved trips, custom quotes, and exclusive member travel offers.'
                  : 'Create an account to easily save itineraries, request quotes, and track bookings.'}
              </p>
            </div>

            {/* Switch Tabs: Sign In / Create Account */}
            <div className="auth-mode-switch">
              <button
                type="button"
                className={`switch-tab-btn ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => setAuthMode('login')}
              >
                Sign In
                {authMode === 'login' && (
                  <motion.div
                    layoutId="authTabIndicator"
                    className="switch-tab-pill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>

              <button
                type="button"
                className={`switch-tab-btn ${authMode === 'signup' ? 'active' : ''}`}
                onClick={() => setAuthMode('signup')}
              >
                Create Account
                {authMode === 'signup' && (
                  <motion.div
                    layoutId="authTabIndicator"
                    className="switch-tab-pill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            </div>

            {/* FORM */}
            <AnimatePresence mode="wait">
              {authMode === 'login' ? (
                <motion.form
                  key="login-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleLogin}
                  className="auth-form"
                >
                  <div className="form-group">
                    <label className="form-label" htmlFor="login-email">Email or Username *</label>
                    <div className="input-with-icon">
                      <Mail size={18} className="field-icon" />
                      <input
                        type="text"
                        id="login-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. traveller@example.com"
                        required
                        className="form-input with-left-icon"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-label-row">
                      <label className="form-label" htmlFor="login-password">Password *</label>
                    </div>
                    <div className="input-with-icon">
                      <Lock size={18} className="field-icon" />
                      <input
                        type="password"
                        id="login-password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        className="form-input with-left-icon"
                      />
                    </div>
                  </div>

                  <MagneticButton
                    type="submit"
                    disabled={loading}
                    className="btn-primary auth-submit-btn"
                  >
                    <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                    <ArrowRight size={16} />
                  </MagneticButton>

                  <div className="formality-note">
                    <span>💡 Note: You can also explore all destinations as a guest without signing in.</span>
                  </div>

                  <div className="quick-demo-row">
                    <button
                      type="button"
                      onClick={handleQuickDemoLogin}
                      className="btn-demo-quick"
                    >
                      ⚡ Quick 1-Click Guest Traveller Sign In
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.form
                  key="signup-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSignup}
                  className="auth-form"
                >
                  <div className="form-group">
                    <label className="form-label" htmlFor="signup-name">Full Name *</label>
                    <div className="input-with-icon">
                      <User size={18} className="field-icon" />
                      <input
                        type="text"
                        id="signup-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="form-input with-left-icon"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="signup-email">Email Address *</label>
                    <div className="input-with-icon">
                      <Mail size={18} className="field-icon" />
                      <input
                        type="email"
                        id="signup-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. name@example.com"
                        required
                        className="form-input with-left-icon"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="signup-phone">Phone Number (Optional)</label>
                    <div className="input-with-icon">
                      <Phone size={18} className="field-icon" />
                      <input
                        type="tel"
                        id="signup-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 9876543210"
                        className="form-input with-left-icon"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="signup-password">Create Password *</label>
                    <div className="input-with-icon">
                      <Lock size={18} className="field-icon" />
                      <input
                        type="password"
                        id="signup-password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Minimum 4 characters"
                        required
                        className="form-input with-left-icon"
                      />
                    </div>
                  </div>

                  <MagneticButton
                    type="submit"
                    disabled={loading}
                    className="btn-primary auth-submit-btn"
                  >
                    <span>{loading ? 'Creating account...' : 'Create Traveller Account'}</span>
                    <ArrowRight size={16} />
                  </MagneticButton>

                  <div className="formality-note">
                    <span>✨ Registration is completely free and optional for all travellers.</span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Bottom Guest Option & Owner Portal Link */}
            <div className="auth-footer-bar">
              <button onClick={handleGuestContinue} className="guest-action-link">
                Continue browsing as Guest &rarr;
              </button>

              <div className="owner-portal-discreet">
                <Link to="/owner" className="owner-link">
                  <Shield size={12} />
                  <span>Agency Staff / Owner Portal</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        .auth-page {
          min-height: calc(100vh - 120px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 24px;
          padding-bottom: 50px;
        }

        .auth-card-wrapper {
          width: 100%;
          max-width: 480px;
        }

        .auth-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .auth-back-btn {
          background: none;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: color var(--transition-fast);
        }
        .auth-back-btn:hover {
          color: var(--text-primary);
        }

        .auth-skip-btn {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 6px 14px;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .auth-skip-btn:hover {
          background: var(--accent-turquoise-light);
          color: var(--accent-teal);
          border-color: var(--accent-teal);
        }

        .auth-card, .logged-in-card {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          padding: 32px 24px;
          border: 1px solid rgba(226, 236, 239, 0.9);
        }
        @media (min-width: 480px) {
          .auth-card, .logged-in-card {
            padding: 40px 32px;
          }
        }

        .auth-icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--accent-turquoise-light);
          color: var(--accent-teal);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .auth-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 6px 0;
        }

        .auth-subtitle {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0 0 24px 0;
        }

        /* Switch Tabs */
        .auth-mode-switch {
          display: flex;
          background: var(--bg-primary);
          border-radius: 50px;
          padding: 4px;
          margin-bottom: 24px;
          border: 1px solid var(--border-color);
        }

        .switch-tab-btn {
          flex: 1;
          background: transparent;
          border: none;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-secondary);
          padding: 10px 16px;
          border-radius: 50px;
          cursor: pointer;
          position: relative;
          text-align: center;
          transition: color var(--transition-fast);
        }
        .switch-tab-btn.active {
          color: #FFFFFF;
        }

        .switch-tab-pill {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--accent-teal);
          border-radius: 50px;
          z-index: 0;
        }
        .switch-tab-btn span, .switch-tab-btn {
          position: relative;
          z-index: 1;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-icon {
          position: absolute;
          left: 14px;
          color: var(--text-muted);
          pointer-events: none;
        }

        .form-input.with-left-icon {
          padding-left: 42px;
          width: 100%;
        }

        .auth-submit-btn {
          width: 100%;
          justify-content: center;
          padding: 14px;
          font-size: 15px;
          margin-top: 10px;
        }

        .formality-note {
          text-align: center;
          margin-top: 16px;
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .quick-demo-row {
          margin-top: 16px;
          text-align: center;
        }

        .btn-demo-quick {
          background: var(--accent-turquoise-light);
          border: 1px dashed var(--accent-teal);
          color: var(--accent-teal);
          font-size: 13px;
          font-weight: 700;
          padding: 10px 16px;
          border-radius: 50px;
          cursor: pointer;
          transition: all var(--transition-fast);
          width: 100%;
        }
        .btn-demo-quick:hover {
          background: var(--accent-teal);
          color: #FFFFFF;
        }

        .auth-footer-bar {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .guest-action-link {
          background: none;
          border: none;
          color: var(--accent-teal);
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: color var(--transition-fast);
        }
        .guest-action-link:hover {
          color: var(--accent-teal-hover);
          text-decoration: underline;
        }

        .owner-portal-discreet {
          margin-top: 4px;
        }

        .owner-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }
        .owner-link:hover {
          color: var(--text-primary);
        }

        /* Logged In Card */
        .logged-in-card {
          text-align: center;
        }

        .profile-avatar-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--accent-teal);
          color: #FFFFFF;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .profile-badge {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--accent-teal);
          background: var(--accent-turquoise-light);
          padding: 4px 12px;
          border-radius: 50px;
          display: inline-block;
          margin-bottom: 8px;
        }

        .profile-name {
          font-size: 26px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 4px 0;
        }

        .profile-email {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0;
        }

        .profile-phone {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 4px 0 20px 0;
        }

        .profile-actions-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }

        .profile-btn {
          width: 100%;
          justify-content: center;
        }

        .profile-footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }

        .btn-logout {
          background: none;
          border: none;
          color: var(--danger-color);
          font-size: 13px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }

        .btn-owner-access {
          font-size: 12px;
          color: var(--text-secondary);
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
      `}</style>
    </div>
  );
}
