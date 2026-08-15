import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePackages } from '../context/PackageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../components/animations/Toast';
import FadeIn from '../components/animations/FadeIn';
import Reveal from '../components/animations/Reveal';
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerContainer';
import HoverCard from '../components/animations/HoverCard';
import MagneticButton from '../components/animations/MagneticButton';
import { 
  ArrowLeft, 
  Share2, 
  MapPin, 
  Calendar, 
  Hotel, 
  Utensils, 
  Car, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Percent,
  Mail,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { packages } = usePackages();
  const { addToast } = useToast();
  
  const [pkg, setPkg] = useState(null);
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary', 'details', 'inclusions'
  const [expandedDay, setExpandedDay] = useState(0); // Accordion active day
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const found = packages.find(p => p.id === id);
    if (found) {
      setPkg(found);
    }
  }, [id, packages]);

  if (!pkg) {
    return (
      <div className="container error-container mobile-nav-padding">
        <h3>Package not found</h3>
        <p>The package you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate('/')} className="btn-primary mt-12">
          Back to Home
        </button>
      </div>
    );
  }

  // Formatting currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // WhatsApp Enquiry Link
  const getWhatsAppLink = () => {
    const message = `Hello Snowcat Holidays, I am interested in the "${pkg.name}" package. Please share more details.`;
    return `https://wa.me/917887778652?text=${encodeURIComponent(message)}`;
  };

  // Email Enquiry Link
  const getEmailLink = () => {
    const subject = `Enquiry for ${pkg.name}`;
    const body = `Hello Snowcat Holidays,\n\nI am interested in booking the "${pkg.name}" trip (${pkg.days} Days / ${pkg.nights} Nights).\n\nPlease share more details and availability.\n\nThank you!`;
    return `mailto:snowcatholidays@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Share using Web Share API or Clipboard fallback
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Snowcat Holidays | ${pkg.name}`,
          text: pkg.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed or canceled', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        addToast('Package link copied to clipboard!', 'success');
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        addToast('Failed to copy link', 'error');
      }
    }
  };

  return (
    <div className="package-detail-page mobile-nav-padding">
      {/* Hero Header with Overlay Buttons */}
      <section className="detail-hero">
        <img src={pkg.images?.[0] || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80'} alt={pkg.name} className="hero-img" />
        <div className="hero-gradient"></div>
        
        <div className="hero-nav-bar container">
          <motion.button
            onClick={() => navigate(-1)}
            className="hero-circle-btn"
            aria-label="Go back"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft size={20} />
          </motion.button>

          <motion.button
            onClick={handleShare}
            className="hero-circle-btn"
            aria-label="Share package"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 size={20} />
            {copied && <span className="copied-tooltip">Copied link!</span>}
          </motion.button>
        </div>
      </section>

      {/* Package Header Content */}
      <section className="detail-header-section container">
        <FadeIn direction="up" delay={0.05}>
          <div className="detail-meta">
            <span className="package-badge">{pkg.category}</span>
            <span className="detail-duration-pill">
              <Calendar size={14} />
              {pkg.days} Days / {pkg.nights} Nights
            </span>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.15}>
          <h1 className="detail-title">{pkg.name}</h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.25}>
          <div className="detail-loc-price">
            <div className="detail-location">
              <MapPin size={16} className="loc-icon" />
              <span>{pkg.destination}</span>
            </div>
            <div className="detail-price-box">
              <span className="price-tag">{formatPrice(pkg.price)}</span>
              <span className="price-sub">per person</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.35}>
          <p className="detail-desc">{pkg.shortDescription}</p>
        </FadeIn>

        {/* Special Offer Card */}
        {pkg.specialOffer && (
          <FadeIn direction="up" delay={0.4}>
            <div className="special-offer-card">
              <div className="offer-icon-box">
                <Percent size={20} />
              </div>
              <div className="offer-content">
                <h4>Special Offer</h4>
                <p>{pkg.specialOffer}</p>
              </div>
            </div>
          </FadeIn>
        )}
      </section>

      {/* Navigation Tabs (Itinerary, Details, Inclusions) */}
      <section className="tabs-nav-section container">
        <div className="detail-tabs">
          {[
            { id: 'itinerary', label: 'Itinerary' },
            { id: 'details', label: 'Hotels & Services' },
            { id: 'inclusions', label: 'Inclusions' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              style={{ position: 'relative' }}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="detailTabActiveBg"
                  className="tab-btn-active-bg"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Panels */}
      <section className="tab-panels-section container">
        {/* Tab 1: Day by Day Itinerary */}
        {activeTab === 'itinerary' && (
          <motion.div
            key="itinerary"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="itinerary-panel"
          >
            <h3 className="tab-title">Day-by-Day Journey</h3>
            <div className="accordion-list">
              {pkg.itinerary?.map((day, idx) => {
                const isOpen = expandedDay === idx;
                return (
                  <div key={idx} className={`accordion-item ${isOpen ? 'open' : ''}`}>
                    <button
                      onClick={() => setExpandedDay(isOpen ? -1 : idx)}
                      className="accordion-header"
                    >
                      <span className="day-number">Day {day.day}</span>
                      <span className="day-title">{day.title}</span>
                      <motion.span
                        className="accordion-chevron"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown size={18} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="accordion-content">
                            <p>{day.details}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Tab 2: Hotel details & services */}
        {activeTab === 'details' && (
          <div className="details-panel fade-in">
            <h3 className="tab-title">Hotels & Services</h3>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-header">
                  <Hotel size={20} className="service-icon" />
                  <h4>Accommodation</h4>
                </div>
                <p>{pkg.hotelDetails}</p>
              </div>

              <div className="service-card">
                <div className="service-header">
                  <Utensils size={20} className="service-icon" />
                  <h4>Meals Included</h4>
                </div>
                <p>{pkg.meals}</p>
              </div>

              <div className="service-card">
                <div className="service-header">
                  <Car size={20} className="service-icon" />
                  <h4>Transportation</h4>
                </div>
                <p>{pkg.transportation}</p>
              </div>

              <div className="service-card">
                <div className="service-header">
                  <Eye size={20} className="service-icon" />
                  <h4>Sightseeing</h4>
                </div>
                <p>{pkg.sightseeing}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Inclusions & Exclusions */}
        {activeTab === 'inclusions' && (
          <div className="inclusions-panel fade-in">
            <div className="inc-exc-grid">
              <div className="inc-card">
                <h4 className="inc-title">What's Included</h4>
                <ul className="inc-list">
                  {pkg.inclusions?.map((inc, index) => (
                    <li key={index}>
                      <CheckCircle2 size={16} className="check-icon" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="exc-card">
                <h4 className="exc-title">What's Excluded</h4>
                <ul className="exc-list">
                  {pkg.exclusions?.map((exc, index) => (
                    <li key={index}>
                      <XCircle size={16} className="cross-icon" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Package Image Gallery */}
      {pkg.images && pkg.images.length > 1 && (
        <section className="gallery-section container">
          <h3 className="section-title mb-20">Journey Gallery</h3>
          <div className="gallery-grid">
            {pkg.images.map((imgUrl, index) => (
              <div key={index} className="gallery-item">
                <img src={imgUrl} alt={`${pkg.name} photo ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sticky Bottom Action Panel */}
      <div className="sticky-bottom-bar">
        <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1">
          Quick Enquiry (WhatsApp)
        </a>
        <a href={getEmailLink()} className="btn-secondary flex-1">
          Email Details
        </a>
      </div>

      <style>{`
        .package-detail-page {
          background-color: var(--bg-primary);
        }

        .error-container {
          text-align: center;
          padding: 80px 20px;
        }

        /* Hero */
        .detail-hero {
          position: relative;
          width: 100%;
          height: 320px;
          overflow: hidden;
          background-color: var(--text-primary);
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-gradient {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(11, 45, 72, 0.4) 0%, rgba(0,0,0,0) 40%, rgba(11, 45, 72, 0.5) 100%);
        }

        .hero-nav-bar {
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          z-index: 10;
        }

        .hero-circle-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.9);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .hero-circle-btn:hover {
          background-color: #FFFFFF;
          transform: scale(1.05);
        }

        .copied-tooltip {
          position: absolute;
          bottom: -36px;
          right: 0;
          background-color: var(--text-primary);
          color: #FFFFFF;
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 4px;
          white-space: nowrap;
        }

        /* Header section */
        .detail-header-section {
          padding-top: 24px;
          padding-bottom: 24px;
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        .detail-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .detail-duration-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .detail-title {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 14px;
          line-height: 1.25;
        }

        .detail-loc-price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .detail-location {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 15px;
        }

        .loc-icon {
          color: var(--accent-teal);
        }

        .detail-price-box {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .price-tag {
          font-size: 26px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .detail-desc {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 0;
        }

        /* Special Offer */
        .special-offer-card {
          background-color: var(--accent-tan);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          display: flex;
          gap: 16px;
          align-items: center;
          margin-top: 24px;
          border: 1px solid rgba(226, 236, 239, 0.4);
        }

        .offer-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-teal);
          flex-shrink: 0;
        }

        .offer-content h4 {
          margin: 0 0 2px 0;
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .offer-content p {
          margin: 0;
          font-size: 13px;
          color: var(--text-secondary);
          font-weight: 500;
          line-height: 1.4;
        }

        /* Tabs Nav */
        .tabs-nav-section {
          margin-top: 16px;
          margin-bottom: 20px;
        }

        .detail-tabs {
          display: flex;
          border-bottom: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          padding: 4px;
          border: 1px solid var(--border-color);
        }

        .tab-btn {
          flex: 1;
          background: none;
          border: none;
          padding: 12px 6px;
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 13px;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .tab-btn.active {
          color: #FFFFFF;
        }

        .tab-btn-active-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--accent-teal);
          border-radius: var(--radius-sm);
          z-index: 1;
        }

        /* Tab Panels content */
        .tab-panels-section {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          padding: 24px 20px;
          border: 1px solid rgba(226, 236, 239, 0.6);
          box-shadow: var(--shadow-subtle);
          margin-bottom: 30px;
        }

        .tab-title {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 20px;
          color: var(--text-primary);
        }

        /* Accordion List */
        .accordion-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .accordion-item {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border-color var(--transition-fast);
        }

        .accordion-item.open {
          border-color: var(--accent-teal);
        }

        .accordion-header {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 16px 20px;
          background-color: var(--bg-secondary);
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 12px;
        }

        .day-number {
          font-size: 12px;
          font-weight: 800;
          color: var(--accent-teal);
          background-color: var(--accent-turquoise-light);
          padding: 4px 10px;
          border-radius: 50px;
          flex-shrink: 0;
        }

        .day-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          flex-grow: 1;
        }

        .accordion-content {
          padding: 0 20px 16px 20px;
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.6;
        }

        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .service-card {
          padding: 16px;
          background-color: var(--bg-primary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .service-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
          color: var(--accent-teal);
        }

        .service-header h4 {
          margin: 0;
          font-size: 15px;
          color: var(--text-primary);
        }

        .service-card p {
          margin: 0;
          font-size: 14px;
          color: var(--text-secondary);
        }

        /* Inc / Exc */
        .inc-exc-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .inc-title, .exc-title {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .inc-title { color: var(--accent-teal); }
        .exc-title { color: var(--danger-color); }

        .inc-list, .exc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .inc-list li, .exc-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: var(--text-primary);
        }

        .check-icon { color: var(--accent-teal); flex-shrink: 0; margin-top: 2px; }
        .cross-icon { color: var(--danger-color); flex-shrink: 0; margin-top: 2px; }

        /* Gallery */
        .gallery-section {
          margin-bottom: 40px;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .gallery-item {
          aspect-ratio: 4 / 3;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .gallery-item:hover img {
          transform: scale(1.05);
        }

        @media (min-width: 768px) {
          .detail-hero { height: 420px; }
          .detail-title { font-size: 36px; }
          .services-grid { grid-template-columns: 1fr 1fr; }
          .inc-exc-grid { grid-template-columns: 1fr 1fr; }
          .gallery-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </div>
  );
}
