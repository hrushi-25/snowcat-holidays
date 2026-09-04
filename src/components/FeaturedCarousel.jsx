import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, ArrowRight, MapPin, Clock, ArrowUpRight, Globe, Map } from 'lucide-react';

// Helper to compute search match score for a package
const getSearchScore = (pkg, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return 1;

  const name = (pkg.name || '').toLowerCase().trim();
  const destination = (pkg.destination || '').toLowerCase().trim();

  // 1. Exact matches in name or destination (highest priority)
  if (name === q || destination === q) {
    return 1000;
  }

  // 2. Starts with match in name or destination
  const startsWithName = name.startsWith(q);
  const startsWithDest = destination.startsWith(q);
  if (startsWithName || startsWithDest) {
    return 800;
  }

  // 3. Substring match in name or destination
  const includesName = name.includes(q);
  const includesDest = destination.includes(q);
  if (includesName || includesDest) {
    return 500;
  }

  // 4. Matches in descriptions, sightseeing, hotel details, or other fields
  const shortDesc = (pkg.shortDescription || '').toLowerCase();
  const sightseeing = (pkg.sightseeing || '').toLowerCase();
  const hotelDetails = (pkg.hotelDetails || '').toLowerCase();
  const category = (pkg.category || '').toLowerCase();
  const meals = (pkg.meals || '').toLowerCase();
  const transportation = (pkg.transportation || '').toLowerCase();
  const specialOffer = (pkg.specialOffer || '').toLowerCase();
  
  const inclusions = (pkg.inclusions || []).join(' ').toLowerCase();
  const exclusions = (pkg.exclusions || []).join(' ').toLowerCase();
  const itinerary = (pkg.itinerary || []).map(day => `${day.title || ''} ${day.details || ''}`).join(' ').toLowerCase();

  const otherFieldsMatch = 
    shortDesc.includes(q) ||
    sightseeing.includes(q) ||
    hotelDetails.includes(q) ||
    category.includes(q) ||
    meals.includes(q) ||
    transportation.includes(q) ||
    specialOffer.includes(q) ||
    inclusions.includes(q) ||
    exclusions.includes(q) ||
    itinerary.includes(q);

  if (otherFieldsMatch) {
    return 10;
  }

  return 0; // No match
};

export default function FeaturedCarousel({
  packages = [],
  title = "Trending Destinations",
  speedTag = "0.1x AUTO-SCROLL TICKER",
  speedDuration = "110s",
  searchQuery = "",
  activeCategoryProp,
  onCategoryChange,
  showBadge = true,
  showTabs = true,
  staticGrid = false
}) {
  const navigate = useNavigate();
  const [internalCategory, setInternalCategory] = useState('international'); // 'international' | 'india'
  const scrollRef = useRef(null);

  const isSearchActive = searchQuery.trim() !== '';
  const isGridMode = staticGrid || isSearchActive;

  const activeCategory = activeCategoryProp !== undefined ? activeCategoryProp : internalCategory;

  const handleCategoryClick = (cat) => {
    if (onCategoryChange) {
      onCategoryChange(cat);
    } else {
      setInternalCategory(cat);
    }
  };

  // Helper to determine if package is International
  const isInternationalPkg = (pkg) => {
    if (!pkg) return false;
    const cat = (pkg.category || '').toLowerCase();
    const dest = (pkg.destination || pkg.location || pkg.dest || '').toLowerCase();
    const name = (pkg.name || pkg.packageName || pkg.package_name || '').toLowerCase();
    const country = (pkg.country || '').toLowerCase();

    if (cat === 'international' || (country && country !== 'india')) return true;
    if (cat === 'india') return false;

    return (
      dest.includes('dubai') || dest.includes('switzerland') || dest.includes('singapore') ||
      dest.includes('thailand') || dest.includes('maldives') || dest.includes('bali') ||
      dest.includes('london') || dest.includes('paris') || dest.includes('egypt') ||
      name.includes('dubai') || name.includes('swiss') || name.includes('singapore') ||
      name.includes('thailand') || name.includes('maldives') || name.includes('bali') ||
      name.includes('london') || name.includes('paris') || name.includes('egypt')
    );
  };

  // Filter packages based on activeCategory and searchQuery
  const categoryPackages = useMemo(() => {
    const activePkgs = packages.filter(p => p && p.isActive);

    // Apply category filter first
    const categoryFiltered = activeCategory === 'international'
      ? activePkgs.filter(p => isInternationalPkg(p))
      : activePkgs.filter(p => !isInternationalPkg(p));

    const query = searchQuery.trim().toLowerCase();

    if (query !== '') {
      const withScores = categoryFiltered
        .map(pkg => ({ pkg, score: getSearchScore(pkg, searchQuery) }))
        .filter(item => item.score > 0);

      // Sort by score descending
      withScores.sort((a, b) => b.score - a.score);

      return withScores.map(item => item.pkg);
    }

    return categoryFiltered;
  }, [packages, activeCategory, searchQuery]);

  // Duplicate items for seamless continuous looping ticker effect
  const displayPackages = useMemo(() => {
    if (categoryPackages.length === 0) return [];
    if (isGridMode) return categoryPackages;
    if (categoryPackages.length < 5) {
      return [...categoryPackages, ...categoryPackages, ...categoryPackages, ...categoryPackages];
    }
    return [...categoryPackages, ...categoryPackages];
  }, [categoryPackages, isGridMode]);

  const handleManualScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className={`featured-carousel-section ${staticGrid ? 'static-grid-mode' : ''}`}>
      <div className="featured-header-row">
        <div className="featured-title-group">
          {!isGridMode && showBadge && (
            <div className="speed-badge shadow-realistic-sm">
              <Sparkles size={14} className="badge-sparkle-icon" />
              <span>{speedTag}</span>
            </div>
          )}
          <h2 className="featured-main-title">{title}</h2>
        </div>

        {/* Tab Switcher: India & Around vs International */}
        {showTabs && (
          <div className="segmented-switch-container featured-switch">
            <div className="segmented-switch shadow-realistic-sm">
              <button
                className={`switch-tab ${activeCategory === 'international' ? 'active' : ''}`}
                onClick={() => handleCategoryClick('international')}
                style={{ position: 'relative' }}
              >
                <span className="tab-label-wrap">
                  <Globe size={16} className="tab-icon" />
                  <span>International Escapes</span>
                </span>
                {activeCategory === 'international' && (
                  <motion.div
                    layoutId="carouselCategoryBg"
                    className="switch-tab-active-bg"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </button>

              <button
                className={`switch-tab ${activeCategory === 'india' ? 'active' : ''}`}
                onClick={() => handleCategoryClick('india')}
                style={{ position: 'relative' }}
              >
                <span className="tab-label-wrap">
                  <Map size={16} className="tab-icon" />
                  <span>India Packages</span>
                </span>
                {activeCategory === 'india' && (
                  <motion.div
                    layoutId="carouselCategoryBg"
                    className="switch-tab-active-bg"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Manual Arrow Nav */}
        <div
          className="carousel-nav-arrows"
          style={isGridMode ? { visibility: 'hidden', pointerEvents: 'none' } : {}}
        >
          <button
            onClick={() => handleManualScroll('left')}
            className="carousel-arrow-btn shadow-realistic-sm"
            aria-label="Scroll left"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => handleManualScroll('right')}
            className="carousel-arrow-btn shadow-realistic-sm"
            aria-label="Scroll right"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Ticker Container with auto-scroll marquee + manual scroll fallback */}
      <div className="ticker-wrapper" ref={scrollRef}>
        {displayPackages.length > 0 ? (
          <div
            className="ticker-track"
            style={isGridMode ? { animation: 'none' } : { animationDuration: speedDuration }}
          >
            {displayPackages.map((pkg, idx) => {
              const imgUrl = pkg.images && pkg.images.length > 0
                ? pkg.images[0]
                : 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80';

              return (
                <motion.div
                  key={`${pkg.slug || pkg.id}-${idx}`}
                  className="ticker-card shadow-interactive"
                  onClick={() => navigate(`/package/${pkg.slug || pkg.id}`)}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="ticker-card-img-wrapper">
                    <img src={imgUrl} alt={pkg.name} className="ticker-card-img" />
                    <div className="ticker-card-badge shadow-realistic-sm">
                      <Clock size={12} />
                      <span>{pkg.days}D / {pkg.nights}N</span>
                    </div>
                    {pkg.specialOffer && (
                      <span className="ticker-offer-tag">Special Offer</span>
                    )}
                  </div>

                  <div className="ticker-card-body">
                    <div className="ticker-dest">
                      <MapPin size={13} className="ticker-icon" />
                      <span>{pkg.destination || 'Curated Escape'}</span>
                    </div>
                    <h3 className="ticker-card-title">{pkg.name}</h3>

                    <div className="ticker-card-footer">
                      <div className="ticker-price-block">
                        <span className="price-sub">Starting from</span>
                        <span className="price-val">₹{Number(pkg.price || 0).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="ticker-action-btn shadow-realistic-sm">
                        <span>Details</span>
                        <ArrowUpRight size={15} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="empty-ticker-msg">
            No active featured packages available in this category yet.
          </div>
        )}
      </div>

      <style>{`
        .featured-carousel-section {
          position: relative;
          width: 100%;
          margin: 40px 0;
        }

        .featured-header-row {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }
        @media (min-width: 768px) {
          .featured-header-row {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          }
        }

        .featured-title-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .speed-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          align-self: flex-start;
          background-color: var(--accent-turquoise-light);
          color: var(--accent-teal);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 6px 14px;
          border-radius: 50px;
          border: 1px solid rgba(8, 124, 141, 0.2);
        }

        .badge-sparkle-icon {
          color: var(--accent-teal);
          animation: pulseSparkle 2s infinite alternate;
        }

        @keyframes pulseSparkle {
          0% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1.15); opacity: 1; }
        }

        .featured-main-title {
          font-size: 30px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          letter-spacing: -0.5px;
        }

        .carousel-nav-arrows {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .carousel-arrow-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .carousel-arrow-btn:hover {
          background-color: var(--accent-teal);
          color: #FFFFFF;
          border-color: var(--accent-teal);
          transform: scale(1.06);
        }

        .ticker-wrapper {
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 12px 4px 24px 4px;
        }
        .ticker-wrapper::-webkit-scrollbar {
          display: none;
        }

        .ticker-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: marqueeContinuous 55s linear infinite;
        }

        .ticker-wrapper:hover .ticker-track {
          animation-play-state: paused;
        }

        .ticker-card {
          width: 310px;
          flex-shrink: 0;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          overflow: hidden;
          border: 1px solid rgba(226, 236, 239, 0.9);
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .ticker-card-img-wrapper {
          position: relative;
          width: 100%;
          height: 190px;
          overflow: hidden;
        }

        .ticker-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .ticker-card:hover .ticker-card-img {
          transform: scale(1.08);
        }

        .ticker-card-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(11, 45, 72, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .ticker-offer-tag {
          position: absolute;
          top: 14px;
          right: 14px;
          background: var(--accent-teal);
          color: #FFFFFF;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 4px 10px;
          border-radius: 50px;
        }

        .ticker-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .ticker-dest {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
          color: var(--accent-teal);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }

        .ticker-icon {
          color: var(--accent-turquoise);
        }

        .ticker-card-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 16px 0;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ticker-card-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid var(--border-color);
        }

        .ticker-price-block {
          display: flex;
          flex-direction: column;
        }

        .price-sub {
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .price-val {
          font-size: 19px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .ticker-action-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background-color: var(--accent-turquoise-light);
          color: var(--accent-teal);
          font-size: 13px;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: 50px;
          transition: all 0.2s ease;
        }

        .ticker-card:hover .ticker-action-btn {
          background-color: var(--accent-teal);
          color: #FFFFFF;
        }

        .empty-ticker-msg {
          padding: 30px;
          text-align: center;
          color: var(--text-secondary);
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          width: 100%;
        }

        /* Static grid overrides */
        .featured-carousel-section.static-grid-mode .ticker-wrapper {
          overflow-x: visible;
          padding: 12px 4px 24px 4px;
        }

        .featured-carousel-section.static-grid-mode .ticker-track {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          width: 100%;
          animation: none !important;
        }

        .featured-carousel-section.static-grid-mode .ticker-track:hover {
          animation-play-state: running;
        }

        .featured-carousel-section.static-grid-mode .ticker-card {
          width: 100%;
          flex-shrink: 1;
        }

        .tab-label-wrap {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .tab-icon {
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .switch-tab:hover .tab-icon {
          transform: scale(1.12);
        }
      `}</style>
    </div>
  );
}
