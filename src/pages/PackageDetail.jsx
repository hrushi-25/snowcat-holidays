import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePackages } from '../context/PackageContext';
import { motion, AnimatePresence } from 'framer-motion';
import localDestinationsData from '../data/destinations_data.json';
import { STATIC_PACKAGES } from '../data/staticPackages';
import ShareModal from '../components/ShareModal';
import Footer from '../components/Footer';
import FadeIn from '../components/animations/FadeIn';
import {
  ArrowLeft,
  Share2,
  MapPin,
  Calendar,
  Clock,
  Car,
  Hotel,
  CheckCircle2,
  XCircle,
  Percent,
  Mail,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Sparkles,
  Utensils,
  Camera
} from 'lucide-react';

export default function PackageDetail() {
  const { slug, id } = useParams();
  const target = (slug || id || '').toLowerCase().trim();
  const navigate = useNavigate();
  const { packages } = usePackages();

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [expandedDay, setExpandedDay] = useState(0);
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary' | 'inclusions' | 'transport'
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Helper to normalize any package record
  const normalizePackage = (p) => {
    if (!p) return null;
    const pricing = p.pricing || {
      startingPrice: Math.round(Number(p.price || 0) * 1.15),
      discountedPrice: p.price || 0,
      currency: 'INR',
      perPerson: true
    };
    const startPrice = pricing.startingPrice || Math.round(Number(pricing.discountedPrice || p.price || 0) * 1.15);
    const discPrice = pricing.discountedPrice || p.price || 0;
    const currency = pricing.currency || 'INR';

    const photos = (Array.isArray(p.photos) && p.photos.length > 0)
      ? p.photos
      : ((Array.isArray(p.images) && p.images.length > 0)
        ? p.images.map(img => typeof img === 'string' ? img : img.image)
        : ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80']);

    return {
      ...p,
      id: p.id || p.subId || p.slug,
      slug: p.slug || p.id || p.subId,
      name: p.packageName || p.name || 'Curated Itinerary',
      packageName: p.packageName || p.name || 'Curated Itinerary',
      destination: p.destination || p.country || p.subName || 'Explore',
      category: p.category || (p.country ? 'International' : 'India'),
      duration: p.duration || `${p.nights || 0} Nights / ${p.days || 1} Days`,
      modeOfTransport: p.modeOfTransport || p.transportation || 'Private AC Vehicle with Chauffeur',
      shortDescription: p.shortDescription || p.short_description || '',
      hotelDetails: p.hotelDetails || p.hotel_details || '3-Star Deluxe & 5-Star Luxury Resort options available',
      meals: p.meals || 'Daily Breakfast included',
      inclusions: Array.isArray(p.inclusions) ? p.inclusions : [],
      exclusions: Array.isArray(p.exclusions) ? p.exclusions : [],
      itinerary: Array.isArray(p.itinerary) ? p.itinerary : [],
      photos,
      images: photos,
      startingPrice: startPrice,
      discountedPrice: discPrice,
      currency,
    };
  };

  // Build comprehensive searchable dataset synchronously for 0ms lookup
  const allKnownPackages = useMemo(() => {
    const list = [];

    // 1. From destinations_data.json
    if (localDestinationsData.international) {
      localDestinationsData.international.forEach(p => list.push(normalizePackage(p)));
    }
    if (localDestinationsData.india) {
      localDestinationsData.india.forEach(st => {
        (st.subDestinations || []).forEach(sub => {
          list.push(normalizePackage({ ...sub, stateName: st.stateName, stateId: st.stateId }));
        });
      });
    }

    // 2. From staticPackages.js
    if (Array.isArray(STATIC_PACKAGES)) {
      STATIC_PACKAGES.forEach(p => list.push(normalizePackage(p)));
    }

    // 3. From PackageContext
    if (Array.isArray(packages)) {
      packages.forEach(p => list.push(normalizePackage(p)));
    }

    return list;
  }, [packages]);

  // Synchronous resolution of target package
  const pkg = useMemo(() => {
    if (!target) return allKnownPackages[0] || null;

    // 1. Exact slug / id match
    let match = allKnownPackages.find(p =>
      (p.slug && p.slug.toLowerCase() === target) ||
      (p.id && String(p.id).toLowerCase() === target) ||
      (p.subId && String(p.subId).toLowerCase() === target)
    );

    // 2. Slugified name match
    if (!match) {
      match = allKnownPackages.find(p => {
        const slugified = (p.name || '').toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
        return slugified === target || target.includes(slugified) || slugified.includes(target);
      });
    }

    // 3. Partial keyword match
    if (!match) {
      match = allKnownPackages.find(p =>
        (p.name && p.name.toLowerCase().includes(target)) ||
        (p.destination && p.destination.toLowerCase().includes(target))
      );
    }

    return match || allKnownPackages[0] || null;
  }, [target, allKnownPackages]);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [target]);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/explore?tab=india');
    }
  };

  if (!pkg) {
    return (
      <div className="container error-container mobile-nav-padding" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Loading itinerary details...</h2>
        <button onClick={() => navigate('/explore')} className="btn-return-explore">
          &larr; Return to Explore
        </button>
      </div>
    );
  }

  // Currency Formatter
  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: pkg.currency || 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const discountPercent = pkg.startingPrice > pkg.discountedPrice
    ? Math.round(((pkg.startingPrice - pkg.discountedPrice) / pkg.startingPrice) * 100)
    : 0;

  // WhatsApp Enquiry Link
  const getWhatsAppLink = () => {
    const message = `Hello Snowcat Holidays! I am interested in booking the "${pkg.name}" package (${pkg.duration}) to ${pkg.destination}. Starting Price: ${formatPrice(pkg.discountedPrice)}. Please share custom details and availability.`;
    return `https://wa.me/917887778652?text=${encodeURIComponent(message)}`;
  };

  // Email Enquiry Link
  const getEmailLink = () => {
    const subject = `Itinerary Enquiry: ${pkg.name}`;
    const body = `Hello Snowcat Holidays,\n\nI am interested in booking the "${pkg.name}" tour (${pkg.duration}) to ${pkg.destination}.\n\nStarting Price: ${formatPrice(pkg.discountedPrice)}\nMode of Transport: ${pkg.modeOfTransport}\n\nPlease share availability, customized dates, and pricing.\n\nThank you!`;
    return `mailto:snowcatholidays@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="package-detail-page">
      {/* ---------------------------------------------------- */}
      {/* HERO BANNER WITH CONTROLS & BREADCRUMBS */}
      {/* ---------------------------------------------------- */}
      <section className="detail-hero-section">
        <div className="hero-image-wrapper">
          <img
            src={pkg.photos[activePhotoIdx] || pkg.photos[0]}
            alt={pkg.name}
            className="detail-hero-bg"
            loading="eager"
            decoding="async"
          />
          <div className="hero-gradient-overlay"></div>
        </div>

        {/* Top Floating Action Bar */}
        <div className="hero-floating-nav container">
          <motion.button
            onClick={handleBack}
            className="hero-nav-btn shadow-realistic-md"
            aria-label="Back to last page"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </motion.button>

          <motion.button
            onClick={() => setShareModalOpen(true)}
            className="hero-nav-btn shadow-realistic-md"
            aria-label="Share package"
            title="Share Itinerary"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            <Share2 size={18} />
            <span>Share</span>
          </motion.button>
        </div>

        {/* Hero Title & Badges Content */}
        <div className="hero-bottom-content container">
          <FadeIn direction="up" delay={0.05}>
            <div className="hero-badges-row">
              <span className="hero-category-chip">
                <MapPin size={12} /> {pkg.category}
              </span>
              <span className="hero-duration-chip">
                <Clock size={12} /> {pkg.duration}
              </span>
              {discountPercent > 0 && (
                <span className="hero-discount-chip">
                  <Percent size={11} /> {discountPercent}% OFF
                </span>
              )}
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <h1 className="hero-package-title">{pkg.name}</h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.25}>
            <div className="hero-meta-summary">
              <div className="hero-loc">
                <MapPin size={16} className="text-turquoise" />
                <span>{pkg.destination}</span>
              </div>
              <div className="hero-transport-tag">
                <Car size={16} className="text-turquoise" />
                <span>{pkg.modeOfTransport}</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* THUMBNAIL GALLERY BAR (IF MULTIPLE PHOTOS) */}
      {/* ---------------------------------------------------- */}
      {pkg.photos.length > 1 && (
        <section className="gallery-thumbnails-strip container">
          <div className="thumbnails-scroll-row">
            {pkg.photos.map((photoUrl, idx) => (
              <button
                key={idx}
                className={`thumb-item ${activePhotoIdx === idx ? 'active' : ''}`}
                onClick={() => setActivePhotoIdx(idx)}
                aria-label={`View photo ${idx + 1}`}
              >
                <img src={photoUrl} alt={`Thumbnail ${idx + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------- */}
      {/* MAIN TWO-COLUMN LAYOUT */}
      {/* ---------------------------------------------------- */}
      <div className="detail-main-layout container">
        {/* Left Column: Itinerary, Inclusions & Overview */}
        <div className="detail-left-col">
          {/* Quick Overview Card */}
          {pkg.shortDescription && (
            <div className="detail-overview-card shadow-subtle">
              <h2 className="overview-title">
                <Sparkles size={18} className="overview-icon" /> Journey Overview
              </h2>
              <p className="overview-text">{pkg.shortDescription}</p>
            </div>
          )}

          {/* Section Navigation Tabs */}
          <div className="detail-tabs-bar">
            <button
              className={`detail-tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
              onClick={() => setActiveTab('itinerary')}
            >
              <span>Day-by-Day Itinerary ({pkg.itinerary.length} Days)</span>
            </button>
            <button
              className={`detail-tab-btn ${activeTab === 'inclusions' ? 'active' : ''}`}
              onClick={() => setActiveTab('inclusions')}
            >
              <span>Inclusions & Exclusions</span>
            </button>
            <button
              className={`detail-tab-btn ${activeTab === 'transport' ? 'active' : ''}`}
              onClick={() => setActiveTab('transport')}
            >
              <span>Stay & Transport</span>
            </button>
          </div>

          {/* TAB 1: DAY-BY-DAY ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="itinerary-tab-content">
              {pkg.itinerary && pkg.itinerary.length > 0 ? (
                <div className="itinerary-timeline-list">
                  {pkg.itinerary.map((dayItem, idx) => {
                    const isExpanded = expandedDay === idx;
                    return (
                      <motion.div
                        key={dayItem.day || idx}
                        className={`itinerary-day-box shadow-subtle ${isExpanded ? 'expanded' : ''}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          className="day-box-header"
                          onClick={() => setExpandedDay(isExpanded ? null : idx)}
                          aria-expanded={isExpanded}
                        >
                          <div className="day-number-pill">
                            Day {dayItem.day || idx + 1}
                          </div>
                          <span className="day-title-text">{dayItem.title}</span>
                          <ChevronRight
                            size={18}
                            className={`day-chevron-icon ${isExpanded ? 'rotated' : ''}`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              className="day-box-body"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <p className="day-details-paragraph">{dayItem.details}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <p className="empty-tab-text">Day-by-day itinerary will be customized for your travel dates upon request.</p>
              )}
            </div>
          )}

          {/* TAB 2: INCLUSIONS & EXCLUSIONS */}
          {activeTab === 'inclusions' && (
            <div className="inclusions-tab-content">
              <div className="inc-exc-grid">
                <div className="inc-box shadow-subtle">
                  <h3 className="inc-title">
                    <CheckCircle2 size={18} className="text-emerald-500" /> What's Included
                  </h3>
                  {pkg.inclusions.length > 0 ? (
                    <ul className="inc-list">
                      {pkg.inclusions.map((item, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={15} className="inc-check" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-tab-text">Full list provided with tailored proposal.</p>
                  )}
                </div>

                <div className="exc-box shadow-subtle">
                  <h3 className="exc-title">
                    <XCircle size={18} className="text-rose-500" /> What's Excluded
                  </h3>
                  {pkg.exclusions.length > 0 ? (
                    <ul className="exc-list">
                      {pkg.exclusions.map((item, idx) => (
                        <li key={idx}>
                          <XCircle size={15} className="exc-cross" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-tab-text">Standard exclusions apply (flights, personal shopping).</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STAY & TRANSPORT */}
          {activeTab === 'transport' && (
            <div className="transport-tab-content shadow-subtle">
              <div className="spec-row-item">
                <div className="spec-icon-circle">
                  <Car size={20} />
                </div>
                <div>
                  <h4 className="spec-item-title">Mode of Transport</h4>
                  <p className="spec-item-val">{pkg.modeOfTransport}</p>
                </div>
              </div>

              <div className="spec-row-item">
                <div className="spec-icon-circle">
                  <Hotel size={20} />
                </div>
                <div>
                  <h4 className="spec-item-title">Accommodation Category</h4>
                  <p className="spec-item-val">{pkg.hotelDetails}</p>
                </div>
              </div>

              <div className="spec-row-item">
                <div className="spec-icon-circle">
                  <Utensils size={20} />
                </div>
                <div>
                  <h4 className="spec-item-title">Meal Plans</h4>
                  <p className="spec-item-val">{pkg.meals}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Pricing & Direct Enquiry Card */}
        <aside className="detail-right-col">
          <div className="sticky-booking-card shadow-realistic-lg">
            <div className="booking-card-header">
              <span className="booking-curated-label">CURATED PRICING</span>
              <div className="booking-price-row">
                {pkg.startingPrice > pkg.discountedPrice && (
                  <span className="booking-starting-cross">
                    {formatPrice(pkg.startingPrice)}
                  </span>
                )}
                <span className="booking-discounted-bold">
                  {formatPrice(pkg.discountedPrice)}
                </span>
                <span className="booking-per-person">/ Person</span>
              </div>
              <div className="booking-negotiable-badge">
                <ShieldCheck size={14} /> 100% Negotiable for Custom Group Sizes
              </div>
            </div>

            <div className="booking-features-list">
              <div className="booking-feature">
                <Clock size={16} className="feature-icon" />
                <span>{pkg.duration} Handcrafted Tour</span>
              </div>
              <div className="booking-feature">
                <Car size={16} className="feature-icon" />
                <span>{pkg.modeOfTransport}</span>
              </div>
              <div className="booking-feature">
                <CheckCircle2 size={16} className="feature-icon" />
                <span>{pkg.inclusions.length} Premium Inclusions Included</span>
              </div>
            </div>

            {/* Direct Consultation CTAs */}
            <div className="booking-action-buttons">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-booking shadow-realistic-sm"
              >
                <MessageCircle size={18} />
                <span>Enquire via WhatsApp</span>
              </a>

              <a
                href={getEmailLink()}
                className="btn-email-booking shadow-realistic-sm"
              >
                <Mail size={18} />
                <span>Request Custom Quote</span>
              </a>

              <Link
                to={`/enquire?package=${encodeURIComponent(pkg.name)}`}
                className="btn-form-booking"
              >
                <span>Fill Booking Enquiry Form &rarr;</span>
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <Footer />

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        packageData={pkg}
      />

      {/* Component Styles */}
      <style>{`
        .package-detail-page {
          background-color: var(--bg-primary);
          min-height: 100vh;
        }

        /* Hero */
        .detail-hero-section {
          position: relative;
          min-height: 440px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px 0 40px 0;
          background: #0B2D48;
          color: #FFFFFF;
        }

        .hero-image-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .detail-hero-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.45;
          transform: scale(1.02);
        }

        .hero-gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(11, 45, 72, 0.4) 0%, rgba(11, 45, 72, 0.95) 100%);
        }

        .hero-floating-nav {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .hero-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(8px);
          border: none;
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .hero-nav-btn:hover {
          background: #FFFFFF;
          color: var(--accent-teal);
        }

        .hero-bottom-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .hero-badges-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .hero-category-chip, .hero-duration-chip, .hero-discount-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 50px;
          text-transform: uppercase;
        }

        .hero-category-chip {
          background: var(--accent-turquoise-light);
          color: var(--accent-teal);
        }

        .hero-duration-chip {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          color: #FFFFFF;
        }

        .hero-discount-chip {
          background: #DC2626;
          color: #FFFFFF;
        }

        .hero-package-title {
          font-size: 36px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.2;
        }

        .hero-meta-summary {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
        }

        .hero-loc, .hero-transport-tag {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .text-turquoise {
          color: #38BDF8;
        }

        /* Thumbnails Strip */
        .gallery-thumbnails-strip {
          margin-top: -24px;
          position: relative;
          z-index: 20;
        }

        .thumbnails-scroll-row {
          display: flex;
          gap: 10px;
          background: #FFFFFF;
          padding: 10px 14px;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-realistic-md);
          overflow-x: auto;
          border: 1px solid var(--border-color);
        }

        .thumb-item {
          width: 70px;
          height: 50px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          padding: 0;
          background: transparent;
          flex-shrink: 0;
          opacity: 0.65;
          transition: all 0.2s ease;
        }

        .thumb-item.active {
          border-color: var(--accent-teal);
          opacity: 1;
          transform: scale(1.05);
        }

        .thumb-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Main Layout */
        .detail-main-layout {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 32px;
          padding-top: 32px;
          padding-bottom: 60px;
        }

        /* Left Column */
        .detail-left-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .detail-overview-card {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 24px;
          border: 1px solid var(--border-color);
        }

        .overview-title {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 10px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .overview-icon {
          color: var(--accent-teal);
        }

        .overview-text {
          font-size: 14.5px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        /* Tabs Bar */
        .detail-tabs-bar {
          display: flex;
          gap: 8px;
          border-bottom: 2px solid var(--border-color);
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .detail-tab-btn {
          background: none;
          border: none;
          padding: 10px 18px;
          font-size: 14px;
          font-weight: 700;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .detail-tab-btn:hover {
          color: var(--text-primary);
        }

        .detail-tab-btn.active {
          color: var(--accent-teal);
        }

        .detail-tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--accent-teal);
          border-radius: 3px;
        }

        /* Itinerary Timeline */
        .itinerary-timeline-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .itinerary-day-box {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .itinerary-day-box.expanded {
          border-color: var(--accent-teal);
          box-shadow: var(--shadow-realistic-sm);
        }

        .day-box-header {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: #FFFFFF;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .day-number-pill {
          background: var(--accent-turquoise-light);
          color: var(--accent-teal);
          font-size: 12px;
          font-weight: 800;
          padding: 5px 10px;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .day-title-text {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          flex: 1;
        }

        .day-chevron-icon {
          color: var(--text-muted);
          transition: transform 0.2s ease;
        }

        .day-chevron-icon.rotated {
          transform: rotate(90deg);
          color: var(--accent-teal);
        }

        .day-box-body {
          padding: 0 20px 18px 58px;
        }

        .day-details-paragraph {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        /* Inclusions & Exclusions */
        .inc-exc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .inc-box, .exc-box {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 24px;
          border: 1px solid var(--border-color);
        }

        .inc-box {
          border-left: 4px solid #10B981;
        }

        .exc-box {
          border-left: 4px solid #EF4444;
        }

        .inc-title, .exc-title {
          font-size: 15px;
          font-weight: 800;
          margin: 0 0 14px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .inc-list, .exc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .inc-list li, .exc-list li {
          font-size: 13.5px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: var(--text-primary);
          line-height: 1.4;
        }

        .inc-check {
          color: #10B981;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .exc-cross {
          color: #EF4444;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Transport Tab */
        .transport-tab-content {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 24px;
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .spec-row-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .spec-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--accent-turquoise-light);
          color: var(--accent-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .spec-item-title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          margin: 0 0 2px 0;
        }

        .spec-item-val {
          font-size: 14.5px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        /* Sticky Booking Card */
        .sticky-booking-card {
          position: sticky;
          top: 80px;
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 28px;
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .booking-curated-label {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--accent-teal);
          text-transform: uppercase;
        }

        .booking-price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          flex-wrap: wrap;
          margin: 4px 0;
        }

        .booking-starting-cross {
          font-size: 14px;
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .booking-discounted-bold {
          font-size: 28px;
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1;
        }

        .booking-per-person {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .booking-negotiable-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: #1D4ED8;
          background: #EFF6FF;
          padding: 4px 10px;
          border-radius: 50px;
          margin-top: 4px;
        }

        .booking-features-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 14px 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .booking-feature {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .feature-icon {
          color: var(--accent-teal);
          flex-shrink: 0;
        }

        .booking-action-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .btn-whatsapp-booking {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #25D366;
          color: #FFFFFF;
          padding: 12px 20px;
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-whatsapp-booking:hover {
          background: #1EBE5D;
          transform: translateY(-1px);
        }

        .btn-email-booking {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: var(--accent-teal);
          color: #FFFFFF;
          padding: 12px 20px;
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-email-booking:hover {
          background: var(--accent-teal-hover);
          transform: translateY(-1px);
        }

        .btn-form-booking {
          text-align: center;
          font-size: 12.5px;
          font-weight: 700;
          color: var(--accent-teal);
          padding: 6px 0;
          transition: color 0.2s ease;
        }

        .btn-form-booking:hover {
          color: var(--accent-teal-hover);
          text-decoration: underline;
        }

        @media (max-width: 900px) {
          .detail-main-layout {
            grid-template-columns: 1fr;
          }
          .sticky-booking-card {
            position: static;
          }
          .hero-package-title {
            font-size: 26px;
          }
          .inc-exc-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
