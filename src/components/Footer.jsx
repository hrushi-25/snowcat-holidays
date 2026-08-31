import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowUpRight, Sparkles, Lock, Mail, Phone } from 'lucide-react';

const InstagramIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = "917887778652";
  const whatsappMessage = encodeURIComponent("Hello Snowcat Holidays, I would like to enquire about a tour package.");

  return (
    <footer className="footer-section container">
      <div className="footer-content">
        {/* Brand & Description */}
        <div className="footer-brand">
          <div className="footer-brand-header">
            <img src="/snowcat-logo.png" alt="Snowcat Holidays Logo" className="footer-logo-img" />
            <div className="footer-brand-text">
              <span className="curated-label">CURATED JOURNEYS</span>
              <div className="brand-name">
                Snowcat<span> holidays</span>
              </div>
            </div>
          </div>
          <p className="footer-tagline">
            Curated journeys thoughtfully planned for life-long memories. All package prices are negotiable.
          </p>

          {/* Direct WhatsApp Enquiry Button */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-whatsapp-btn shadow-realistic-sm"
          >
            <div className="whatsapp-icon-pulse">
              <MessageCircle size={18} />
            </div>
            <span>Direct WhatsApp Enquiry</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Links Column */}
        <div className="footer-nav-column">
          <h4 className="footer-column-title">Explore</h4>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/explore">Explore Packages</Link>
            <Link to="/explore?tab=india">India Destinations</Link>
            <Link to="/explore?tab=international">International Escapes</Link>
            <Link to="/enquire">Custom Enquiry</Link>
          </div>
        </div>

        {/* Official Channels Column */}
        <div className="footer-social-column">
          <h4 className="footer-column-title">Connect With Us</h4>
          <div className="footer-social-links">
            <a
              href="https://www.instagram.com/snowcatholidays/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link instagram-link"
            >
              <div className="social-icon-box">
                <InstagramIcon size={18} />
              </div>
              <div className="social-text">
                <span className="social-platform">Instagram</span>
                <span className="social-handle">@snowcat_holidays</span>
              </div>
            </a>

            <a
              href="mailto:snowcatholidays@gmail.com"
              className="social-link email-link"
            >
              <div className="social-icon-box email-box">
                <Mail size={17} />
              </div>
              <div className="social-text">
                <span className="social-platform">Email Desk</span>
                <span className="social-handle">snowcatholidays@gmail.com</span>
              </div>
            </a>

            <a
              href="tel:+917887778652"
              className="social-link phone-link"
            >
              <div className="social-icon-box phone-box">
                <Phone size={17} />
              </div>
              <div className="social-text">
                <span className="social-platform">Direct Hotline</span>
                <span className="social-handle">+91 78877 78652</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-copyright">
          <span>© {currentYear} Snowcat Holidays. All rights reserved.</span>
          <span className="dot-sep">•</span>
          <span>Trust The Cat</span>
          {/* Subtle Owner Login portal link */}
          <Link to="/owner" className="footer-owner-discreet" title="Staff Portal" aria-label="Staff Login">
            <Lock size={11} />
          </Link>
        </div>

        {/* Developer Tag clickable to https://neuraspark.co.in */}
        <a
          href="https://neuraspark.co.in"
          target="_blank"
          rel="noopener noreferrer"
          className="developer-tag-badge shadow-realistic-sm"
          title="Website created by Neuraspark Agency"
        >
          <Sparkles size={13} className="dev-sparkle" />
          <span>Website created by <strong className="dev-agency-link">neuraspark.co.in</strong></span>
          <ArrowUpRight size={13} className="dev-arrow" />
        </a>
      </div>

      <style>{`
        .footer-section {
          margin-top: 60px;
          padding-top: 40px;
          padding-bottom: 30px;
          border-top: 1px solid var(--border-color);
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
          margin-bottom: 36px;
        }

        @media (min-width: 768px) {
          .footer-content {
            grid-template-columns: 2fr 1fr 1.5fr;
            gap: 40px;
          }
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-brand-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-logo-img {
          height: 42px;
          width: auto;
          max-width: 56px;
          object-fit: contain;
          display: block;
        }

        .footer-brand-text {
          display: flex;
          flex-direction: column;
        }

        .footer-tagline {
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 10px;
          margin-bottom: 20px;
          max-width: 340px;
          line-height: 1.6;
        }

        .footer-whatsapp-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background-color: var(--accent-turquoise-light);
          color: var(--accent-teal);
          border: 1px solid rgba(8, 124, 141, 0.25);
          padding: 10px 18px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 700;
          transition: all var(--transition-fast);
        }

        .footer-whatsapp-btn:hover {
          background-color: var(--accent-teal);
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(8, 124, 141, 0.25);
        }

        .whatsapp-icon-pulse {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-nav-column, .footer-social-column {
          display: flex;
          flex-direction: column;
        }

        .footer-column-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 16px 0;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links a {
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
          transition: all var(--transition-fast);
        }

        .footer-links a:hover {
          color: var(--accent-teal);
          transform: translateX(4px);
        }

        .footer-social-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 9px 14px;
          border-radius: var(--radius-md);
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          transition: all var(--transition-fast);
          text-decoration: none;
        }

        .social-link:hover {
          border-color: var(--accent-teal);
          transform: translateY(-2px);
          box-shadow: var(--shadow-subtle);
        }

        .social-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .instagram-link .social-icon-box {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          color: #FFFFFF;
        }

        .email-box {
          background-color: var(--accent-teal);
          color: #FFFFFF;
        }

        .phone-box {
          background-color: var(--accent-green);
          color: #FFFFFF;
        }

        .social-text {
          display: flex;
          flex-direction: column;
        }

        .social-platform {
          font-size: 10.5px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .social-handle {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Bottom bar */
        .footer-bottom {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
        }

        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
          }
        }

        .footer-copyright {
          font-size: 12px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .dot-sep {
          color: var(--border-color);
        }

        .footer-owner-discreet {
          color: var(--text-muted);
          opacity: 0.35;
          display: inline-flex;
          align-items: center;
          margin-left: 6px;
          transition: opacity 0.2s ease;
        }
        .footer-owner-discreet:hover {
          opacity: 1;
          color: var(--accent-teal);
        }

        .developer-tag-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: linear-gradient(135deg, rgba(8, 124, 141, 0.08) 0%, rgba(34, 169, 189, 0.15) 100%);
          border: 1px solid rgba(8, 124, 141, 0.25);
          color: var(--text-primary);
          font-size: 12px;
          padding: 6px 14px;
          border-radius: 50px;
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .developer-tag-badge:hover {
          background: linear-gradient(135deg, rgba(8, 124, 141, 0.18) 0%, rgba(34, 169, 189, 0.28) 100%);
          border-color: var(--accent-teal);
          color: var(--accent-teal);
          transform: translateY(-1px);
        }

        .dev-sparkle {
          color: var(--accent-teal);
        }

        .dev-agency-link {
          color: var(--accent-teal);
          text-decoration: underline;
        }

        .dev-arrow {
          color: var(--accent-teal);
        }
      `}</style>
    </footer>
  );
}
