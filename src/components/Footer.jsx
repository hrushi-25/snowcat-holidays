import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowUpRight, Sparkles } from 'lucide-react';

const InstagramIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
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
            Curated journeys thoughtfully planned for life-long memories.
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
            <Link to="/enquire">Custom Enquiry</Link>
            <Link to="/owner">Owner Portal</Link>
          </div>
        </div>

        {/* Social Handles Column */}
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
              href="https://facebook.com/snowcatholidays"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link facebook-link"
            >
              <div className="social-icon-box">
                <FacebookIcon size={18} />
              </div>
              <div className="social-text">
                <span className="social-platform">Facebook</span>
                <span className="social-handle">Snowcat Holidays</span>
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
        </div>

        {/* Developer Tag */}
        <div className="developer-tag-badge shadow-realistic-sm">
          <Sparkles size={13} className="dev-sparkle" />
          <span>Website developed by <strong>NEURASPARK AI AGENCY</strong></span>
        </div>
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
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 700;
          padding: 10px 20px;
          border-radius: 50px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .footer-whatsapp-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.35);
          color: #FFFFFF;
        }

        .whatsapp-icon-pulse {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-column-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links a {
          font-size: 14px;
          color: var(--text-secondary);
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }

        .footer-links a:hover {
          color: var(--accent-teal);
          transform: translateX(3px);
        }

        .footer-social-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 14px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          transition: all 0.25s ease;
        }

        .social-link:hover {
          border-color: var(--accent-teal);
          transform: translateY(-2px);
          box-shadow: var(--shadow-realistic-sm);
        }

        .instagram-link:hover .social-icon-box {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          color: #FFFFFF;
        }

        .facebook-link:hover .social-icon-box {
          background: #1877F2;
          color: #FFFFFF;
        }

        .social-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--accent-turquoise-light);
          color: var(--accent-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }

        .social-text {
          display: flex;
          flex-direction: column;
        }

        .social-platform {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .social-handle {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .footer-bottom {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
          font-size: 13px;
          color: var(--text-muted);
        }

        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
          }
        }

        .footer-copyright {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .dot-sep {
          color: var(--border-color);
        }

        .developer-tag-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: linear-gradient(135deg, rgba(8, 124, 141, 0.08) 0%, rgba(21, 151, 174, 0.15) 100%);
          border: 1px solid rgba(8, 124, 141, 0.2);
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 12px;
          color: var(--text-primary);
        }

        .dev-sparkle {
          color: var(--accent-teal);
          animation: spinSparkle 4s linear infinite;
        }

        @keyframes spinSparkle {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
        }

        .developer-tag-badge strong {
          color: var(--accent-teal);
          font-weight: 800;
          letter-spacing: 0.3px;
        }
      `}</style>
    </footer>
  );
}
