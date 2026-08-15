import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function PackageCard({ pkg }) {
  const shouldReduceMotion = useReducedMotion();

  // Format currency helper
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const mainImage = pkg.images && pkg.images.length > 0 
    ? pkg.images[0] 
    : 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80';

  return (
    <motion.div
      className="package-card"
      whileHover={shouldReduceMotion ? {} : { y: -6, boxShadow: '0 12px 30px rgba(11, 45, 72, 0.1)' }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/package/${pkg.slug}`} className="card-image-link">
        <div className="card-image-container">
          <img src={mainImage} alt={pkg.name} className="card-image" loading="lazy" />
          {pkg.isFeatured && (
            <motion.div
              className="featured-badge"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Featured
            </motion.div>
          )}
        </div>
      </Link>

      <div className="card-content">
        <div className="card-meta">
          <span className="card-category">{pkg.category}</span>
          <span className="card-duration">{pkg.days} Days / {pkg.nights} Nights</span>
        </div>

        <Link to={`/package/${pkg.slug}`} className="card-title-link">
          <h3 className="card-title">{pkg.name}</h3>
        </Link>

        <div className="card-location">
          <MapPin size={14} className="location-icon" />
          <span>{pkg.destination}</span>
        </div>

        <div className="card-divider"></div>

        <div className="card-footer">
          <div className="price-section">
            <span className="price-label">FROM</span>
            <span className="price-val">{formatPrice(pkg.price)}</span>
            <span className="price-sub">per person</span>
          </div>
          
          <Link to={`/package/${pkg.slug}`} aria-label={`View details for ${pkg.name}`}>
            <motion.div
              className="card-action-btn"
              whileHover={{ scale: 1.08, backgroundColor: 'var(--accent-teal-hover)' }}
              whileTap={{ scale: 0.94 }}
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </Link>
        </div>
      </div>

      <style>{`
        .package-card {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-subtle);
          border: 1px solid rgba(226, 236, 239, 0.7);
          display: flex;
          flex-direction: column;
          text-align: left;
          height: 100%;
        }

        .card-image-link {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
        }

        .card-image-container {
          width: 100%;
          height: 100%;
          position: relative;
          background-color: rgba(226, 236, 239, 0.4);
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .package-card:hover .card-image {
          transform: scale(1.05);
        }

        .featured-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background-color: var(--accent-teal);
          color: #FFFFFF;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 6px 12px;
          border-radius: 50px;
          box-shadow: 0 4px 10px rgba(8, 124, 141, 0.25);
        }

        .card-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .card-category {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: var(--accent-teal);
          text-transform: uppercase;
        }

        .card-duration {
          font-size: 12px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .card-title-link {
          margin-bottom: 8px;
          display: block;
        }

        .card-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          line-height: 1.3;
          margin: 0;
          color: var(--text-primary);
          transition: color var(--transition-fast);
        }

        .package-card:hover .card-title {
          color: var(--accent-teal);
        }

        .card-location {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .location-icon {
          color: var(--accent-teal);
        }

        .card-divider {
          height: 1px;
          background-color: var(--border-color);
          margin-bottom: 20px;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: auto;
        }

        .price-section {
          display: flex;
          flex-direction: column;
        }

        .price-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .price-val {
          font-size: 22px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .price-sub {
          font-size: 11px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .card-action-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--accent-teal);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(8, 124, 141, 0.15);
        }

        @media (max-width: 480px) {
          .card-content {
            padding: 20px;
          }
          .card-title {
            font-size: 18px;
          }
          .price-val {
            font-size: 20px;
          }
        }
      `}</style>
    </motion.div>
  );
}
