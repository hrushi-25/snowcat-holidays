import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  Car,
  MapPin,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Mail,
  ChevronRight,
  Sparkles,
  ChevronLeft,
  Share2,
  ShieldCheck,
  Percent
} from 'lucide-react';
import ShareModal from './ShareModal';

export default function ItineraryModal({ isOpen, onClose, packageData }) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [expandedDay, setExpandedDay] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);

  // Reset photo index and expanded day when package changes
  useEffect(() => {
    setActivePhotoIdx(0);
    setExpandedDay(0);
  }, [packageData]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !packageData) return null;

  const pkg = packageData;
  const photos = pkg.photos && pkg.photos.length > 0
    ? pkg.photos
    : (pkg.images && pkg.images.length > 0 ? pkg.images : [
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80'
      ]);

  const pricing = pkg.pricing || {
    startingPrice: Math.round(Number(pkg.price || 0) * 1.15),
    discountedPrice: pkg.price || 0,
    currency: 'INR',
    perPerson: true
  };

  const startingPrice = pricing.startingPrice || Math.round(Number(pricing.discountedPrice || pkg.price || 0) * 1.15);
  const discountedPrice = pricing.discountedPrice || pkg.price || 0;
  const currency = pricing.currency || 'INR';

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const discountPercent = startingPrice > discountedPrice
    ? Math.round(((startingPrice - discountedPrice) / startingPrice) * 100)
    : 0;

  const packageName = pkg.packageName || pkg.name || 'Curated Journey';
  const duration = pkg.duration || `${pkg.nights || 0} Nights / ${pkg.days || 1} Days`;
  const transport = pkg.modeOfTransport || pkg.transportation || 'Private Air-Conditioned Vehicle';
  const inclusions = Array.isArray(pkg.inclusions) ? pkg.inclusions : [];
  const exclusions = Array.isArray(pkg.exclusions) ? pkg.exclusions : [];
  const itinerary = Array.isArray(pkg.itinerary) ? pkg.itinerary : [];

  const locationLabel = pkg.country || pkg.destination || pkg.subName || 'Explore';

  // WhatsApp Enquiry Link
  const getWhatsAppLink = () => {
    const text = `Hello Snowcat Holidays! I am interested in booking the "${packageName}" (${duration}) to ${locationLabel}. Please share full details and current custom pricing.`;
    return `https://wa.me/917887778652?text=${encodeURIComponent(text)}`;
  };

  // Email Enquiry Link
  const getEmailLink = () => {
    const subject = `Itinerary Enquiry: ${packageName}`;
    const body = `Hello Snowcat Holidays,\n\nI would like to enquire about the "${packageName}" tour (${duration}) to ${locationLabel}.\n\nStarting Price: ${formatPrice(discountedPrice)}\nTransport: ${transport}\n\nPlease share availability and custom quote.\n\nThank you!`;
    return `mailto:snowcatholidays@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <AnimatePresence>
        <div className="itinerary-modal-backdrop" onClick={onClose}>
          <motion.div
            className="itinerary-modal-card shadow-realistic-lg"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Modal Header */}
            <div className="modal-top-bar">
              <div className="modal-title-group">
                <div className="modal-badges-row">
                  <span className="location-chip">
                    <MapPin size={12} />
                    {locationLabel}
                  </span>
                  <span className="duration-chip">
                    <Clock size={12} />
                    {duration}
                  </span>
                  {discountPercent > 0 && (
                    <span className="discount-chip">
                      <Percent size={11} />
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
                <h2 className="modal-main-title">{packageName}</h2>
              </div>

              <div className="modal-actions-right">
                <button
                  onClick={() => setShareOpen(true)}
                  className="modal-icon-btn"
                  title="Share Itinerary"
                  aria-label="Share Itinerary"
                >
                  <Share2 size={18} />
                </button>
                <button
                  onClick={onClose}
                  className="modal-icon-btn close-btn"
                  title="Close"
                  aria-label="Close Itinerary Modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="modal-scroll-body">
              {/* Image Carousel / Gallery Banner */}
              <div className="gallery-container">
                <div className="main-image-wrapper">
                  <img
                    src={photos[activePhotoIdx] || photos[0]}
                    alt={`${packageName} photo ${activePhotoIdx + 1}`}
                    className="main-gallery-img"
                  />
                  {photos.length > 1 && (
                    <>
                      <button
                        className="gallery-nav-btn prev-btn"
                        onClick={() => setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1))}
                        aria-label="Previous photo"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        className="gallery-nav-btn next-btn"
                        onClick={() => setActivePhotoIdx((prev) => (prev < photos.length - 1 ? prev + 1 : 0))}
                        aria-label="Next photo"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                  <div className="photo-count-badge">
                    {activePhotoIdx + 1} / {photos.length}
                  </div>
                </div>

                {photos.length > 1 && (
                  <div className="thumbnails-strip">
                    {photos.map((img, idx) => (
                      <button
                        key={idx}
                        className={`thumb-btn ${activePhotoIdx === idx ? 'active' : ''}`}
                        onClick={() => setActivePhotoIdx(idx)}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Details Bar */}
              <div className="quick-specs-grid">
                <div className="spec-card">
                  <span className="spec-label">
                    <Clock size={14} className="spec-icon" /> Duration
                  </span>
                  <strong className="spec-val">{duration}</strong>
                </div>

                <div className="spec-card">
                  <span className="spec-label">
                    <Car size={14} className="spec-icon" /> Mode of Transport
                  </span>
                  <strong className="spec-val">{transport}</strong>
                </div>

                <div className="spec-card price-highlight-card">
                  <span className="spec-label">Curated Pricing</span>
                  <div className="spec-price-row">
                    {startingPrice > discountedPrice && (
                      <span className="starting-price-strikethrough">
                        {formatPrice(startingPrice)}
                      </span>
                    )}
                    <span className="discounted-price-bold">
                      {formatPrice(discountedPrice)}
                    </span>
                    <span className="per-person-note">/ Person</span>
                  </div>
                  <span className="negotiable-pill">
                    <ShieldCheck size={12} /> 100% Negotiable for Custom Groups
                  </span>
                </div>
              </div>

              {/* Overview & Description */}
              {pkg.shortDescription && (
                <div className="overview-section">
                  <h3 className="section-title">Journey Overview</h3>
                  <p className="overview-text">{pkg.shortDescription}</p>
                </div>
              )}

              {/* Day-by-Day Itinerary */}
              {itinerary.length > 0 && (
                <div className="itinerary-timeline-section">
                  <div className="itinerary-header-row">
                    <h3 className="section-title">
                      <Calendar size={18} className="title-icon" /> Day-by-Day Detailed Itinerary
                    </h3>
                    <span className="timeline-subtitle">{itinerary.length} Days Planned</span>
                  </div>

                  <div className="itinerary-accordion-list">
                    {itinerary.map((dayItem, idx) => {
                      const isExpanded = expandedDay === idx;
                      return (
                        <div
                          key={dayItem.day || idx}
                          className={`itinerary-day-card ${isExpanded ? 'expanded' : ''}`}
                        >
                          <button
                            className="day-accordion-header"
                            onClick={() => setExpandedDay(isExpanded ? null : idx)}
                            aria-expanded={isExpanded}
                          >
                            <div className="day-number-badge">
                              Day {dayItem.day || idx + 1}
                            </div>
                            <span className="day-item-title">{dayItem.title}</span>
                            <ChevronRight
                              size={18}
                              className={`day-chevron ${isExpanded ? 'rotated' : ''}`}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                className="day-accordion-body"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <p className="day-details-text">{dayItem.details}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Inclusions & Exclusions Checklist */}
              <div className="inclusions-exclusions-grid">
                <div className="inc-exc-box inclusions-box">
                  <h4 className="inc-exc-title">
                    <CheckCircle2 size={16} className="text-emerald-500" /> What's Included
                  </h4>
                  {inclusions.length > 0 ? (
                    <ul className="inc-exc-list">
                      {inclusions.map((item, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={14} className="list-icon check-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-inc-text">Detailed inclusions provided with tailored quote.</p>
                  )}
                </div>

                <div className="inc-exc-box exclusions-box">
                  <h4 className="inc-exc-title">
                    <XCircle size={16} className="text-rose-500" /> What's Excluded
                  </h4>
                  {exclusions.length > 0 ? (
                    <ul className="inc-exc-list">
                      {exclusions.map((item, idx) => (
                        <li key={idx}>
                          <XCircle size={14} className="list-icon cross-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-inc-text">Standard exclusions apply (personal expenses, flights).</p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Sticky Footer CTA */}
            <div className="modal-footer-cta">
              <div className="footer-pricing-summary">
                <span className="footer-price-from">STARTING AT</span>
                <span className="footer-price-val">{formatPrice(discountedPrice)}</span>
                <span className="footer-price-note">*All prices are customizable</span>
              </div>

              <div className="footer-btns-group">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-cta shadow-realistic-sm"
                >
                  <MessageCircle size={18} />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={getEmailLink()}
                  className="btn-email-cta shadow-realistic-sm"
                >
                  <Mail size={18} />
                  <span>Enquire via Email</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        packageData={pkg}
      />

      <style>{`
        .itinerary-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(11, 45, 72, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .itinerary-modal-card {
          background: #FFFFFF;
          width: 100%;
          max-width: 860px;
          max-height: 90vh;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: var(--shadow-large);
        }

        .modal-top-bar {
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          background: #FFFFFF;
          z-index: 10;
        }

        .modal-title-group {
          flex: 1;
        }

        .modal-badges-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 6px;
        }

        .location-chip, .duration-chip, .discount-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .location-chip {
          background: var(--accent-turquoise-light);
          color: var(--accent-teal);
        }

        .duration-chip {
          background: #F1F5F9;
          color: var(--text-secondary);
        }

        .discount-chip {
          background: #FEF2F2;
          color: #DC2626;
        }

        .modal-main-title {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.3;
        }

        .modal-actions-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #F1F5F9;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-icon-btn:hover {
          background: #E2E8F0;
          color: var(--text-primary);
        }

        .modal-icon-btn.close-btn:hover {
          background: #FEE2E2;
          color: #DC2626;
        }

        .modal-scroll-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Gallery */
        .gallery-container {
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #F8FAFC;
        }

        .main-image-wrapper {
          position: relative;
          width: 100%;
          height: 320px;
        }

        .main-gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .gallery-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(4px);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-primary);
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }

        .gallery-nav-btn.prev-btn { left: 12px; }
        .gallery-nav-btn.next-btn { right: 12px; }
        .gallery-nav-btn:hover {
          background: #FFFFFF;
          transform: translateY(-50%) scale(1.1);
        }

        .photo-count-badge {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: rgba(11, 45, 72, 0.75);
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 50px;
          backdrop-filter: blur(4px);
        }

        .thumbnails-strip {
          display: flex;
          gap: 8px;
          padding: 10px;
          overflow-x: auto;
          background: #0B2D48;
        }

        .thumb-btn {
          width: 60px;
          height: 42px;
          border-radius: 6px;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          padding: 0;
          background: transparent;
          flex-shrink: 0;
          opacity: 0.6;
          transition: all 0.2s ease;
        }

        .thumb-btn.active {
          border-color: var(--accent-turquoise);
          opacity: 1;
        }

        .thumb-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Quick Specs */
        .quick-specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1.3fr;
          gap: 12px;
        }

        .spec-card {
          background: #F8FAFC;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .spec-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }

        .spec-icon {
          color: var(--accent-teal);
        }

        .spec-val {
          font-size: 13px;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .price-highlight-card {
          background: #EFF6FF;
          border-color: #BFDBFE;
        }

        .spec-price-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
          flex-wrap: wrap;
        }

        .starting-price-strikethrough {
          font-size: 12px;
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .discounted-price-bold {
          font-size: 19px;
          font-weight: 800;
          color: var(--accent-teal);
        }

        .per-person-note {
          font-size: 11px;
          color: var(--text-secondary);
        }

        .negotiable-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 700;
          color: #1D4ED8;
          margin-top: 4px;
        }

        /* Overview */
        .section-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .title-icon {
          color: var(--accent-teal);
        }

        .overview-text {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        /* Timeline / Accordion */
        .itinerary-timeline-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .itinerary-header-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .timeline-subtitle {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
        }

        .itinerary-accordion-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .itinerary-day-card {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #FFFFFF;
          transition: all 0.2s ease;
        }

        .itinerary-day-card.expanded {
          border-color: var(--accent-teal);
          box-shadow: var(--shadow-realistic-sm);
        }

        .day-accordion-header {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #FFFFFF;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .day-number-badge {
          background: var(--accent-turquoise-light);
          color: var(--accent-teal);
          font-size: 11px;
          font-weight: 800;
          padding: 4px 8px;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .day-item-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          flex: 1;
        }

        .day-chevron {
          color: var(--text-muted);
          transition: transform 0.2s ease;
        }

        .day-chevron.rotated {
          transform: rotate(90deg);
          color: var(--accent-teal);
        }

        .day-accordion-body {
          padding: 0 16px 14px 50px;
        }

        .day-details-text {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0;
        }

        /* Inclusions & Exclusions */
        .inclusions-exclusions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .inc-exc-box {
          border-radius: var(--radius-md);
          padding: 16px;
        }

        .inclusions-box {
          background: #F0FDF4;
          border: 1px solid #BBF7D0;
        }

        .exclusions-box {
          background: #FEF2F2;
          border: 1px solid #FECACA;
        }

        .inc-exc-title {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .inc-exc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .inc-exc-list li {
          font-size: 12.5px;
          line-height: 1.4;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          color: var(--text-primary);
        }

        .list-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .check-icon {
          color: #10B981;
        }

        .cross-icon {
          color: #EF4444;
        }

        .empty-inc-text {
          font-size: 12px;
          color: var(--text-muted);
          margin: 0;
        }

        /* Footer */
        .modal-footer-cta {
          padding: 16px 24px;
          border-top: 1px solid var(--border-color);
          background: #FFFFFF;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          z-index: 10;
        }

        .footer-pricing-summary {
          display: flex;
          flex-direction: column;
        }

        .footer-price-from {
          font-size: 9px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 1px;
        }

        .footer-price-val {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .footer-price-note {
          font-size: 9.5px;
          color: var(--accent-teal);
          font-weight: 600;
        }

        .footer-btns-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-whatsapp-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #25D366;
          color: #FFFFFF;
          font-size: 13px;
          font-weight: 700;
          padding: 10px 18px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-whatsapp-cta:hover {
          background: #1EBE5D;
          transform: translateY(-1px);
        }

        .btn-email-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent-teal);
          color: #FFFFFF;
          font-size: 13px;
          font-weight: 700;
          padding: 10px 18px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-email-cta:hover {
          background: var(--accent-teal-hover);
          transform: translateY(-1px);
        }

        @media (max-width: 640px) {
          .quick-specs-grid {
            grid-template-columns: 1fr;
          }
          .inclusions-exclusions-grid {
            grid-template-columns: 1fr;
          }
          .modal-footer-cta {
            flex-direction: column;
            align-items: stretch;
          }
          .footer-btns-group {
            flex-direction: column;
          }
          .btn-whatsapp-cta, .btn-email-cta {
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
