import { API_URL } from '../utils/api';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../components/animations/MagneticButton';
import { useToast } from '../components/animations/Toast';

export default function OwnerLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addToast } = useToast();

  // If already logged in, redirect straight to dashboard
  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('access_token');
    if (isLoggedIn) {
      navigate('/owner/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      if (!res.ok) {
        setError('Invalid username or password. Please try again.');
        addToast('Invalid login credentials', 'error');
        return;
      }

      const data = await res.json();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      addToast('Welcome back!', 'success');
      navigate('/owner/dashboard');
    } catch (err) {
      setError('Could not reach the server. Please try again.');
      addToast('Login failed — server unreachable', 'error');
    }
  };

  return (
    <div className="login-page container mobile-nav-padding">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="login-card-container"
      >
        {/* Back link */}
        <Link to="/" className="back-link-website">
          <ArrowLeft size={16} />
          <span>Back to website</span>
        </Link>

        <div className="login-card">
          <motion.div
            className="lock-icon-wrapper"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Lock size={24} className="lock-icon" />
          </motion.div>
          
          <span className="portal-label">OWNER PORTAL</span>
          <h2 className="login-headline">Welcome back.</h2>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="login-error-alert"
              >
                <AlertCircle size={18} className="alert-icon" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label" htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="form-input"
              />
            </div>

            <MagneticButton type="submit" className="btn-primary login-btn">
              <span>Sign in to dashboard</span>
              <span>&rarr;</span>
            </MagneticButton>
          </form>
        </div>
      </motion.div>

      <style>{`
        .login-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 120px);
          padding-top: 40px;
          padding-bottom: 40px;
        }

        .login-card-container {
          width: 100%;
          max-width: 440px;
        }

        .back-link-website {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
          transition: color var(--transition-fast);
        }

        .back-link-website:hover {
          color: var(--text-primary);
        }

        .login-card {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          padding: 40px 30px;
          box-shadow: var(--shadow-large);
          border: 1px solid rgba(226, 236, 239, 0.7);
          text-align: center;
        }

        .lock-icon-wrapper {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background-color: var(--accent-turquoise-light);
          color: var(--accent-teal);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .portal-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: var(--accent-teal);
          display: block;
          margin-bottom: 4px;
        }

        .login-headline {
          font-size: 26px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 28px;
        }

        .login-error-alert {
          background-color: var(--danger-bg);
          border: 1px solid rgba(230, 57, 70, 0.2);
          color: var(--danger-color);
          padding: 12px 16px;
          border-radius: var(--radius-md);
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          text-align: left;
        }

        .alert-icon {
          flex-shrink: 0;
        }

        .login-form {
          text-align: left;
        }

        .login-btn {
          width: 100%;
          justify-content: center;
          margin-top: 10px;
          padding: 14px;
          font-size: 15px;
        }
      `}</style>
    </div>
  );
}