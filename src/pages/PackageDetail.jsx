import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePackages } from '../context/PackageContext';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../components/animations/FadeIn';
import ShareModal from '../components/ShareModal';
import Footer from '../components/Footer';
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
  Sparkles,
  Star,
  MessageCircle
} from 'lucide-react';

export default function PackageDetail() {
  const { slug, id } = useParams();
  const target = slug || id;
  const navigate = useNavigate();
  const { packages } = usePackages();
  
  const [pkg, setPkg] = useState(null);
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary' | 'hotels' | 'inclusions'
  const [expandedDay, setExpandedDay] = useState(0); // Accordion active day
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    if (!packages || packages.length === 0) return;

    // Normalizing slug lookup
    const normalizedTarget = target ? target.toLowerCase().trim() : '';
    
    let found = packages.find(p => 
      p.slug === target || 
      String(p.id) === target || 
      p.id === target ||
      (p.name && p.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-') === normalizedTarget)
    );

    // Fallback: If not exact slug, check if name/destination includes target keywords
    if (!found && normalizedTarget) {
      found = packages.find(p => 
        (p.name && p.name.toLowerCase().includes(normalizedTarget)) ||
        (p.destination && p.destination.toLowerCase().includes(normalizedTarget))
      );
    }

    // Default fallback to first package if still not found (never show broken error state)
    if (!found) {
      found = packages[0];
    }

    setPkg(found);
  }, [target, packages]);

  // Loading state
  if (!pkg) {
    return (
      <div className="container error-container mobile-nav-padding">
        <div className="loading-spinner"></div>
        <p>Loading journey details...</p>
      </div>
    );
  }

  // Formatting currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price || 0);
  };

  // WhatsApp Enquiry Link
  const getWhatsAppLink = () => {
    const message = `Hello Snowcat Holidays, I am interested in the "${pkg.name}" package (${pkg.days} Days / ${pkg.nights} Nights) to ${pkg.destination}. Please share full details and current pricing.`;
    return `https://wa.me/917887778652?text=${encodeURIComponent(message)}`;
  };

  // Email Enquiry Link
  const getEmailLink = () => {
    const subject = `Enquiry for ${pkg.name}`;
    const body = `Hello Snowcat Holidays,\n\nI am interested in booking the "${pkg.name}" trip (${pkg.days} Days / ${pkg.nights} Nights) to ${pkg.destination}.\n\nPlease share more details and availability.\n\nThank you!`;
    return `mailto:snowcatholidays@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="package-detail-page">
      {/* Hero Header with Overlay Navigation */}
      <section className="detail-hero">
        <img
          src={pkg.images?.[0] || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80'}
          alt={pkg.name}
          className="hero-img"
        />
        <div className="hero-gradient"></div>
        
        <div className="hero-nav-bar container">
          <motion.button
            onClick={() => navigate(-1)}
            className="hero-circle-btn shadow-realistic-md"
            aria-label="Go back"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <ArrowLeft size={20} />
          </motion.button>

          <motion.button
            onClick={() => setShareModalOpen(true)}
            className="hero-circle-btn shadow-realistic-md"
            aria-label="Share package"
            title="Share Itinerary"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <Share2 size={20} />
          </motion.button>
        </div>
      </section>

      {/* Package Header Content Section */}
      <section className="detail-header-section">
        <div className="container">
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
                <MapPin size={18} className="loc-icon" />
                <span>{pkg.destination}</span>
              </div>
              <div className="detail-price-box">
                <div className="price-tag-row">
                  <span className="price-tag">{formatPrice(pkg.price)}</span>
                  <span className="price-sub">per person</span>
                </div>
                <span className="price-negotiable-note">
                  * Price is negotiable for every destination
                </span>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.35}>
            <p className="detail-desc">{pkg.shortDescription}</p>
          </FadeIn>

          {/* Special Offer Card */}
          {pkg.specialOffer && (
            <FadeIn direction="up" delay={0.4}>
              <div className="special-offer-card shadow-realistic-sm">
                <div className="offer-icon-box">
                  <Percent size={20} />
                </div>
                <div className="offer-content">
                  <h4>Special Seasonal Offer</h4>
                  <p>{pkg.specialOffer}</p>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Navigation Tabs (Itinerary, Hotels & Services, Inclusions) */}
      <section className="tabs-nav-section container">
        <div className="detail-tabs shadow-realistic-sm">
          {[
            { id: 'itinerary', label: 'Day-by-Day Itinerary' },
            { id: 'hotels', label: '3-Star & 5-Star Hotels' },
            { id: 'inclusions', label: 'Inclusions & Exclusions' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="detailTabActiveBg"
                  className="tab-btn-active-bg"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
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
            <div className="panel-header-row">
              <h3 className="tab-title">Day-by-Day Travel Plan</h3>
              <button
                onClick={() => setShareModalOpen(true)}
                className="btn-share-itinerary-inline"
              >
                <Share2 size={15} />
                <span>Share Plan</span>
              </button>
            </div>

            <div className="accordion-list">
              {pkg.itinerary && pkg.itinerary.length > 0 ? (
                pkg.itinerary.map((day, idx) => {
                  const isOpen = expandedDay === idx;
                  return (
                    <div key={idx} className={`accordion-item ${isOpen ? 'open' : ''} shadow-realistic-sm`}>
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
                })
              ) : (
                <div className="accordion-item open shadow-realistic-sm">
                  <div className="accordion-content pt-16">
                    <p>Detailed day-by-day itinerary will be customized to your preferred travel dates and group preferences.</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab 2: 3-Star & 5-Star Hotels & Services */}
        {activeTab === 'hotels' && (
          <motion.div
            key="hotels"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="details-panel"
          >
            <h3 className="tab-title">Accommodation & Services</h3>
            
            {/* 3-Star & 5-Star Hotel Options Grid */}
            <div className="hotel-tiers-container mb-24">
              <div className="hotel-tier-card tier-3star shadow-realistic-sm">
                <div className="tier-header">
                  <div className="tier-icon-circle star3">
                    <Star size={18} fill="currentColor" />
                  </div>
                  <div>
                    <h4 className="tier-title">3-Star Deluxe Accommodations</h4>
                    <span className="tier-sub">Comfortable, sanitized boutique hotels & mountain stays</span>
                  </div>
                </div>
                <ul className="tier-perks">
                  <li>✔ Premium category room on twin/triple sharing</li>
                  <li>✔ Daily complimentary hot breakfast buffet</li>
                  <li>✔ Free high-speed Wi-Fi & tea/coffee maker</li>
                  <li>✔ Prime tourist location with easy local market access</li>
                </ul>
              </div>

              <div className="hotel-tier-card tier-5star shadow-realistic-sm">
                <div className="tier-header">
                  <div className="tier-icon-circle star5">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 className="tier-title">5-Star Luxury Resorts & Villas</h4>
                    <span className="tier-sub">World-class hospitality, panoramic views & private amenities</span>
                  </div>
                </div>
                <ul className="tier-perks">
                  <li>✔ Luxury suite / private pool villa / club rooms</li>
                  <li>✔ Gourmet breakfast & chef-special dining options</li>
                  <li>✔ Infinity pool, spa access & evening bonfire lounges</li>
                  <li>✔ VIP early check-in & priority concierge service</li>
                </ul>
              </div>
            </div>

            <div className="services-grid">
              <div className="service-card shadow-realistic-sm">
                <div className="service-header">
                  <Hotel size={20} className="service-icon" />
                  <h4>Hotel Overview</h4>
                </div>
                <p>{pkg.hotelDetails || '3-Star Deluxe & 5-Star Luxury options available based on your preference.'}</p>
              </div>

              <div className="service-card shadow-realistic-sm">
                <div className="service-header">
                  <Utensils size={20} className="service-icon" />
                  <h4>Meals Included</h4>
                </div>
                <p>{pkg.meals || 'Daily Breakfast included at all hotels. Full board available on request.'}</p>
              </div>

              <div className="service-card shadow-realistic-sm">
                <div className="service-header">
                  <Car size={20} className="service-icon" />
                  <h4>Transportation</h4>
                </div>
                <p>{pkg.transportation || 'Dedicated private AC sedan/SUV with experienced local chauffeur for all transfers.'}</p>
              </div>

              <div className="service-card shadow-realistic-sm">
                <div className="service-header">
                  <Eye size={20} className="service-icon" />
                  <h4>Sightseeing</h4>
                </div>
                <p>{pkg.sightseeing || 'All major viewpoints, heritage monuments, lakes, and local attractions included.'}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Inclusions & Exclusions */}
        {activeTab === 'inclusions' && (
          <motion.div
            key="inclusions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inclusions-panel"
          >
            <div className="inc-exc-grid">
              <div className="inc-card shadow-realistic-sm">
                <h4 className="inc-title">What's Included</h4>
                <ul className="inc-list">
                  {pkg.inclusions && pkg.inclusions.length > 0 ? (
                    pkg.inclusions.map((inc, index) => (
                      <li key={index}>
                        <CheckCircle2 size={16} className="check-icon" />
                        <span>{inc}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li><CheckCircle2 size={16} className="check-icon" /><span>Hotel accommodations on twin-sharing basis</span></li>
                      <li><CheckCircle2 size={16} className="check-icon" /><span>Daily breakfast at all hotels</span></li>
                      <li><CheckCircle2 size={16} className="check-icon" /><span>Dedicated private vehicle for all transfers</span></li>
                      <li><CheckCircle2 size={16} className="check-icon" /><span>Driver allowances, toll taxes, and parking fees</span></li>
                    </>
                  )}
                </ul>
              </div>

              <div className="exc-card shadow-realistic-sm">
                <h4 className="exc-title">What's Excluded</h4>
                <ul className="exc-list">
                  {pkg.exclusions && pkg.exclusions.length > 0 ? (
                    pkg.exclusions.map((exc, index) => (
                      <li key={index}>
                        <XCircle size={16} className="cross-icon" />
                        <span>{exc}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li><XCircle size={16} className="cross-icon" /><span>Airfare / Train tickets to destination</span></li>
                      <li><XCircle size={16} className="cross-icon" /><span>Lunch meals and personal drinks/snacks</span></li>
                      <li><XCircle size={16} className="cross-icon" /><span>Optional adventure sports and personal shopping</span></li>
                      <li><XCircle size={16} className="cross-icon" /><span>Travel insurance and medical expenses</span></li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Package Image Gallery */}
      {pkg.images && pkg.images.length > 1 && (
        <section className="gallery-section container">
          <h3 className="section-title mb-20">Journey Gallery</h3>
          <div className="gallery-grid">
            {pkg.images.map((imgUrl, index) => (
              <div key={index} className="gallery-item shadow-realistic-md">
                <img src={imgUrl} alt={`${pkg.name} photo ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Official Footer */}
      <Footer />

      {/* Sticky Bottom Action Panel (WhatsApp + Email + Share) */}
      <div className="sticky-bottom-bar shadow-realistic-lg">
        <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-primary btn-whatsapp-action flex-2">
          <MessageCircle size={18} />
          <span>Quick Enquiry (WhatsApp)</span>
        </a>
        <a href={getEmailLink()} className="btn-secondary flex-1">
          <Mail size={18} />
          <span>Email Details</span>
        </a>
        <button
          onClick={() => setShareModalOpen(true)}
          className="btn-share-icon shadow-realistic-sm"
          aria-label="Share package"
          title="Share"
        >
          <Share2 size={20} />
        </button>
      </div>

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        packageData={pkg}
      />

      <style>{`
        .package-detail-page {
          background-color: var(--bg-primary);
          /* Crucial: ensures full scroll clearance above fixed bottom enquiry bar */
          padding-bottom: 120px;
          min-height: 100vh;
        }

        .error-container {
          text-align: center;
          padding: 80px 20px;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--border-color);
          border-top-color: var(--accent-teal);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 16px auto;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Hero */
        .detail-hero {
          position: relative;
          width: 100%;
          height: 340px;
          overflow: hidden;
          background-color: var(--text-primary);
        }
        @media (min-width: 768px) {
          .detail-hero { height: 460px; }
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
          background: linear-gradient(to bottom, rgba(11, 45, 72, 0.5) 0%, rgba(0,0,0,0) 40%, rgba(11, 45, 72, 0.7) 100%);
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
          background-color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .hero-circle-btn:hover {
          background-color: #FFFFFF;
          color: var(--accent-teal);
        }

        /* Header section */
        .detail-header-section {
          padding-top: 28px;
          padding-bottom: 28px;
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
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .detail-title {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 14px;
          line-height: 1.25;
          color: var(--text-primary);
        }
        @media (min-width: 768px) {
          .detail-title { font-size: 38px; }
        }

        .detail-loc-price {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .detail-location {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 16px;
        }

        .loc-icon {
          color: var(--accent-teal);
        }

        .detail-price-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        @media (min-width: 768px) {
          .detail-price-box {
            align-items: flex-end;
          }
        }

        .price-tag-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .price-tag {
          font-size: 28px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .price-sub {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .price-negotiable-note {
          font-size: 11px;
          font-weight: 700;
          color: var(--accent-teal);
          margin-top: 4px;
        }

        .detail-desc {
          font-size: 16px;
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
          border: 1px solid rgba(226, 236, 239, 0.5);
        }

        .offer-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.8);
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
          margin-top: 24px;
          margin-bottom: 24px;
        }

        .detail-tabs {
          display: flex;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-lg);
          padding: 4px;
          border: 1px solid var(--border-color);
          overflow-x: auto;
        }

        .tab-btn {
          flex: 1;
          background: none;
          border: none;
          padding: 12px 16px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 13px;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
          position: relative;
          white-space: nowrap;
          text-align: center;
        }

        .tab-btn.active {
          color: #FFFFFF;
        }

        .tab-btn span {
          position: relative;
          z-index: 2;
        }

        .tab-btn-active-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--accent-teal);
          border-radius: var(--radius-md);
          z-index: 1;
        }

        /* Tab Panels */
        .tab-panels-section {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          padding: 30px 24px;
          border: 1px solid rgba(226, 236, 239, 0.8);
          margin-bottom: 40px;
        }
        @media (min-width: 768px) {
          .tab-panels-section {
            padding: 40px;
          }
        }

        .panel-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .tab-title {
          font-size: 22px;
          font-weight: 800;
          margin: 0;
          color: var(--text-primary);
        }

        .btn-share-itinerary-inline {
          background: var(--accent-turquoise-light);
          color: var(--accent-teal);
          border: 1px solid var(--accent-teal);
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-share-itinerary-inline:hover {
          background: var(--accent-teal);
          color: #FFFFFF;
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
          background: var(--bg-secondary);
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

        /* Hotel Tiers Showcase */
        .hotel-tiers-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .hotel-tiers-container {
            grid-template-columns: 1fr 1fr;
          }
        }

        .hotel-tier-card {
          background: var(--bg-primary);
          border-radius: var(--radius-lg);
          padding: 20px;
          border: 1px solid var(--border-color);
        }
        .hotel-tier-card.tier-5star {
          border-color: var(--accent-turquoise);
          background: linear-gradient(135deg, var(--bg-primary) 0%, var(--accent-turquoise-light) 100%);
        }

        .tier-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .tier-icon-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .tier-icon-circle.star3 {
          background-color: #F59E0B;
          color: #FFFFFF;
        }
        .tier-icon-circle.star5 {
          background-color: var(--accent-teal);
          color: #FFFFFF;
        }

        .tier-title {
          font-size: 15px;
          font-weight: 800;
          margin: 0;
          color: var(--text-primary);
        }

        .tier-sub {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .tier-perks {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 13px;
          color: var(--text-primary);
        }

        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .service-card {
          padding: 20px;
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
          line-height: 1.5;
        }

        /* Inc / Exc */
        .inc-exc-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .inc-exc-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .inc-card, .exc-card {
          background: var(--bg-primary);
          border-radius: var(--radius-lg);
          padding: 24px;
          border: 1px solid var(--border-color);
        }

        .inc-title, .exc-title {
          font-size: 17px;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .inc-title { color: var(--accent-teal); }
        .exc-title { color: var(--danger-color); }

        .inc-list, .exc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .inc-list li, .exc-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: var(--text-primary);
          line-height: 1.4;
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
          gap: 14px;
        }
        @media (min-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .gallery-item {
          aspect-ratio: 4 / 3;
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .gallery-item:hover img {
          transform: scale(1.06);
        }

        /* Sticky Bottom action bar */
        .sticky-bottom-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 14px 20px;
          display: flex;
          gap: 12px;
          align-items: center;
          z-index: 1000;
          border-top: 1px solid var(--border-color);
        }

        .btn-whatsapp-action {
          background-color: var(--accent-green);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .btn-whatsapp-action:hover {
          background-color: var(--accent-green-hover);
        }

        .btn-share-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        .btn-share-icon:hover {
          background: var(--accent-turquoise-light);
          color: var(--accent-teal);
          border-color: var(--accent-teal);
        }

        .flex-2 { flex: 2; }
      `}</style>
    </div>
  );
}
