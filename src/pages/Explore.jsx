import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../utils/api';
import localDestinationsData from '../data/destinations_data.json';
import Footer from '../components/Footer';
import EmptyState from '../components/animations/EmptyState';
import FadeIn from '../components/animations/FadeIn';
import {
  Globe,
  Map,
  Search,
  ArrowLeft,
  ChevronRight,
  MapPin,
  Clock,
  Car,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL state derivation - directly driven by URL parameters
  const activeTab = searchParams.get('tab') || 'india';
  const selectedStateId = searchParams.get('state') || null;
  const selectedCountry = searchParams.get('country') || 'all';
  const urlSearch = searchParams.get('q') || '';

  // Local search query input
  const [searchQuery, setSearchQuery] = useState(urlSearch);

  // Sync local search query with URL search param
  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  // Instant local dataset (0ms render) + background revalidation
  const [indiaStates, setIndiaStates] = useState(localDestinationsData.india || []);
  const [internationalPackages, setInternationalPackages] = useState(localDestinationsData.international || []);

  // [OLD DJANGO BACKEND REVALIDATION - CUT OFF / COMMENTED OUT]
  /*
  useEffect(() => {
    let isMounted = true;
    const fetchLiveUpdates = async () => {
      try {
        const [indiaRes, intlRes] = await Promise.allSettled([
          fetch(`${API_URL}/api/packages/india/`),
          fetch(`${API_URL}/api/packages/international/`),
        ]);
        ...
      } catch (err) {}
    };
    fetchLiveUpdates();
    return () => { isMounted = false; };
  }, []);
  */

  // Navigation handlers with clean History Push for proper browser Back button
  const handleTabChange = (newTab) => {
    setSearchQuery('');
    navigate(`/explore?tab=${newTab}`);
  };

  const handleSelectState = (stateId) => {
    navigate(`/explore?tab=india&state=${stateId}`);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleBackToAllStates = () => {
    navigate(`/explore?tab=india`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCountryChange = (country) => {
    if (country === 'all') {
      navigate(`/explore?tab=international`);
    } else {
      navigate(`/explore?tab=international&country=${encodeURIComponent(country)}`);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    } else {
      params.delete('q');
    }
    navigate(`/explore?${params.toString()}`);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    const params = new URLSearchParams(searchParams);
    params.delete('q');
    navigate(`/explore?${params.toString()}`);
  };

  const handleNavigateToPackage = (pkg) => {
    const slug = pkg.slug || pkg.id || pkg.subId;
    navigate(`/package/${slug}`);
  };

  // Active state object when viewing sub-destinations
  const currentStateObj = useMemo(() => {
    if (!selectedStateId || activeTab !== 'india') return null;
    return indiaStates.find(
      (st) => (st.stateId || '').toLowerCase() === selectedStateId.toLowerCase()
    ) || null;
  }, [selectedStateId, indiaStates, activeTab]);

  // List of all international countries for filter pills
  const internationalCountries = useMemo(() => {
    const countries = new Set();
    internationalPackages.forEach((pkg) => {
      if (pkg.country) countries.add(pkg.country);
    });
    return Array.from(countries);
  }, [internationalPackages]);

  // Filtered India States (for all-states grid)
  const filteredIndiaStates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return indiaStates;

    return indiaStates.filter((st) => {
      const name = (st.stateName || '').toLowerCase();
      const summary = (st.summary || '').toLowerCase();
      const matchesSub = (st.subDestinations || []).some(
        (sub) =>
          (sub.packageName || '').toLowerCase().includes(q) ||
          (sub.subName || '').toLowerCase().includes(q) ||
          (sub.shortDescription || '').toLowerCase().includes(q)
      );
      return name.includes(q) || summary.includes(q) || matchesSub;
    });
  }, [indiaStates, searchQuery]);

  // Filtered Sub-destinations for the current state
  const filteredSubDestinations = useMemo(() => {
    if (!currentStateObj) return [];
    const subs = currentStateObj.subDestinations || [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return subs;

    return subs.filter((sub) => {
      const name = (sub.packageName || '').toLowerCase();
      const subName = (sub.subName || '').toLowerCase();
      const desc = (sub.shortDescription || '').toLowerCase();
      return name.includes(q) || subName.includes(q) || desc.includes(q);
    });
  }, [currentStateObj, searchQuery]);

  // Filtered International Packages
  const filteredInternationalPackages = useMemo(() => {
    let list = internationalPackages;

    if (selectedCountry && selectedCountry !== 'all') {
      list = list.filter(
        (pkg) => (pkg.country || '').toLowerCase() === selectedCountry.toLowerCase()
      );
    }

    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;

    return list.filter((pkg) => {
      const name = (pkg.packageName || pkg.name || '').toLowerCase();
      const country = (pkg.country || '').toLowerCase();
      const desc = (pkg.shortDescription || '').toLowerCase();
      return name.includes(q) || country.includes(q) || desc.includes(q);
    });
  }, [internationalPackages, selectedCountry, searchQuery]);

  // Format currency
  const formatPrice = (val, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  return (
    <div className="explore-page container mobile-nav-padding">
      {/* ---------------------------------------------------- */}
      {/* TOP HERO BANNER & SEARCH */}
      {/* ---------------------------------------------------- */}
      <section className="explore-hero shadow-realistic-lg">
        <div className="explore-hero-overlay"></div>
        <img
          src={
            activeTab === 'india'
              ? 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=75'
              : 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=75'
          }
          alt="Explore Destinations"
          className="explore-hero-bg"
          loading="eager"
          decoding="async"
        />
        <div className="explore-hero-content">
          <FadeIn direction="up" delay={0.05}>
            <div className="explore-badge shadow-realistic-sm">
              <Sparkles size={14} className="badge-icon" />
              <span>CURATED EXPERIENCES & ITINERARIES</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <h1 className="explore-hero-title">
              {activeTab === 'india' ? 'Explore Incredible India' : 'International Escapes'}
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.25}>
            <p className="explore-hero-subtitle">
              {activeTab === 'india'
                ? 'Select a state to explore detailed regional circuits, day-by-day itineraries, and negotiable package pricing.'
                : 'Browse premier global destinations with verified 4-Star & 5-Star accommodations, full transport, and customizable itineraries.'}
            </p>
          </FadeIn>

          {/* Search Bar */}
          <FadeIn direction="up" delay={0.35}>
            <form onSubmit={handleSearchSubmit} className="explore-search-bar shadow-realistic-lg">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder={
                  activeTab === 'india'
                    ? 'Search states, Maharashtra, Kashmir, Kerala, Goa, Manali...'
                    : 'Search countries, Switzerland, Dubai, Paris, Bali...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="explore-search-input"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="search-clear-btn"
                  type="button"
                >
                  Clear
                </button>
              )}
            </form>
          </FadeIn>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* MAIN TAB SWITCHER (INDIA vs INTERNATIONAL) */}
      {/* ---------------------------------------------------- */}
      <div className="explore-tabs-bar">
        <div className="segmented-switch-container">
          <div className="segmented-switch shadow-realistic-sm">
            <button
              className={`switch-tab ${activeTab === 'india' ? 'active' : ''}`}
              onClick={() => handleTabChange('india')}
            >
              <Map size={16} className="tab-icon" />
              <span>India Packages</span>
              {activeTab === 'india' && (
                <motion.div
                  layoutId="exploreMainTabBg"
                  className="switch-tab-active-bg"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </button>

            <button
              className={`switch-tab ${activeTab === 'international' ? 'active' : ''}`}
              onClick={() => handleTabChange('international')}
            >
              <Globe size={16} className="tab-icon" />
              <span>International Escapes</span>
              {activeTab === 'international' && (
                <motion.div
                  layoutId="exploreMainTabBg"
                  className="switch-tab-active-bg"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 1. INDIA TAB CONTENT */}
      {/* ==================================================== */}
      {activeTab === 'india' && (
        <div className="india-tab-wrapper">
          {currentStateObj ? (
            /* -------------------------------------------------- */
            /* STEP 2: ANIMATED SUB-VIEW FOR SELECTED INDIAN STATE */
            /* -------------------------------------------------- */
            <motion.section
              key={currentStateObj.stateId}
              className="state-sub-view-section"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Navigation Action Bar & Breadcrumbs */}
              <div className="state-nav-bar">
                <button
                  onClick={handleBackToAllStates}
                  className="btn-change-state shadow-realistic-sm"
                  title="Return to Indian States Grid"
                >
                  <ArrowLeft size={16} />
                  <span>Change State</span>
                </button>

                <div className="state-breadcrumbs">
                  <Link to="/">Home</Link>
                  <ChevronRight size={14} />
                  <button onClick={handleBackToAllStates} className="breadcrumb-btn">
                    Explore India
                  </button>
                  <ChevronRight size={14} />
                  <span className="current">{currentStateObj.stateName}</span>
                </div>
              </div>

              {/* State Header Card */}
              <div className="state-banner-card shadow-realistic-md">
                <img
                  src={currentStateObj.coverPhoto}
                  alt={currentStateObj.stateName}
                  className="state-banner-bg"
                  loading="eager"
                  decoding="async"
                />
                <div className="state-banner-overlay"></div>
                <div className="state-banner-content">
                  <span className="state-banner-pill">
                    <MapPin size={13} /> {currentStateObj.stateName} Tourism
                  </span>
                  <h2 className="state-banner-title">{currentStateObj.stateName} Packages</h2>
                  <p className="state-banner-summary">{currentStateObj.summary}</p>
                </div>
              </div>

              {/* Sub-Destinations List */}
              <div className="sub-destinations-section">
                <div className="section-header-bar">
                  <h3 className="section-sub-title">
                    Curated Circuits & Itineraries in {currentStateObj.stateName}
                  </h3>
                  <span className="count-tag">
                    {filteredSubDestinations.length} Package{filteredSubDestinations.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {filteredSubDestinations.length > 0 ? (
                  <div className="sub-destinations-grid">
                    {filteredSubDestinations.map((sub) => {
                      const pricing = sub.pricing || {
                        startingPrice: Math.round(Number(sub.price || 0) * 1.15),
                        discountedPrice: sub.price || 0,
                        currency: 'INR',
                      };
                      const startPrice = pricing.startingPrice || Math.round(Number(pricing.discountedPrice || 0) * 1.15);
                      const discPrice = pricing.discountedPrice || 0;
                      const discountPct = startPrice > discPrice
                        ? Math.round(((startPrice - discPrice) / startPrice) * 100)
                        : 0;
                      const photos = sub.photos && sub.photos.length > 0
                        ? sub.photos
                        : ['https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=75'];

                      return (
                        <motion.div
                          key={sub.id || sub.subId || sub.slug}
                          className="sub-pkg-card shadow-interactive"
                          whileHover={{ y: -6 }}
                          transition={{ duration: 0.25 }}
                          onClick={() => handleNavigateToPackage(sub)}
                          style={{ cursor: 'pointer' }}
                        >
                          {/* Image & Badges */}
                          <div className="sub-pkg-img-wrap">
                            <img
                              src={photos[0]}
                              alt={sub.packageName}
                              className="sub-pkg-img"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="sub-pkg-img-overlay"></div>
                            {discountPct > 0 && (
                              <span className="sub-discount-badge">
                                {discountPct}% OFF
                              </span>
                            )}
                            <span className="sub-tag-chip">
                              <MapPin size={12} />
                              {sub.subName || currentStateObj.stateName}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="sub-pkg-body">
                            <h4 className="sub-pkg-title">{sub.packageName}</h4>
                            <p className="sub-pkg-desc">{sub.shortDescription}</p>

                            {/* Meta Specs */}
                            <div className="sub-specs-row">
                              <span className="spec-item">
                                <Clock size={13} className="spec-item-icon" />
                                {sub.duration}
                              </span>
                              <span className="spec-item">
                                <Car size={13} className="spec-item-icon" />
                                {sub.modeOfTransport}
                              </span>
                            </div>

                            {/* Inclusions Highlights */}
                            {sub.inclusions && sub.inclusions.length > 0 && (
                              <div className="sub-inclusions-block">
                                <span className="inc-header">Key Inclusions:</span>
                                <ul className="inc-mini-list">
                                  {sub.inclusions.slice(0, 3).map((inc, i) => (
                                    <li key={i}>
                                      <CheckCircle2 size={12} className="inc-check-icon" />
                                      <span>{inc}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Card Footer Pricing & Actions */}
                            <div className="sub-pkg-footer">
                              <div className="pricing-group">
                                {startPrice > discPrice && (
                                  <span className="starting-price-cross">
                                    {formatPrice(startPrice, pricing.currency)}
                                  </span>
                                )}
                                <span className="discount-price-highlight">
                                  {formatPrice(discPrice, pricing.currency)}
                                </span>
                                <span className="price-tagline">*Negotiable custom dates</span>
                              </div>

                              <Link
                                to={`/package/${sub.slug || sub.id || sub.subId}`}
                                onClick={(e) => e.stopPropagation()}
                                className="btn-view-itinerary shadow-realistic-sm"
                              >
                                <span>View Itinerary</span>
                                <ChevronRight size={16} />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyState
                    title={`No itineraries found matching "${searchQuery}"`}
                    description="Try searching with a different landmark, town, or clear your search."
                    onReset={handleClearSearch}
                    resetLabel="Clear Search"
                  />
                )}
              </div>

              {/* Other States Quick Bar */}
              <div className="other-states-bar">
                <h4 className="other-states-title">Explore Other Indian States</h4>
                <div className="other-states-chips">
                  {indiaStates
                    .filter((st) => st.stateId !== currentStateObj.stateId)
                    .map((st) => (
                      <button
                        key={st.stateId}
                        onClick={() => handleSelectState(st.stateId)}
                        className="other-state-chip shadow-realistic-sm"
                      >
                        <span>{st.stateName}</span>
                      </button>
                    ))}
                </div>
              </div>
            </motion.section>
          ) : (
            /* -------------------------------------------------- */
            /* STEP 1: INTERACTIVE ALL-STATES GRID */
            /* -------------------------------------------------- */
            <section className="states-grid-section">
              <div className="section-header-bar">
                <div>
                  <span className="section-pre-title">STATE-BY-STATE CATALOG</span>
                  <h2 className="section-main-title">Select an Indian State to Begin</h2>
                  <p className="section-sub-text">
                    Click any state card to open its dedicated sub-destinations and curated itineraries.
                  </p>
                </div>
              </div>

              {filteredIndiaStates.length > 0 ? (
                <div className="all-states-grid">
                  {filteredIndiaStates.map((st) => {
                    const subCount = (st.subDestinations || []).length;
                    return (
                      <motion.div
                        key={st.stateId}
                        className="state-interactive-card shadow-interactive"
                        onClick={() => handleSelectState(st.stateId)}
                        whileHover={{ y: -6, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="state-card-img-wrap">
                          <img
                            src={st.coverPhoto}
                            alt={st.stateName}
                            className="state-card-img"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="state-card-img-overlay"></div>
                          <span className="state-count-chip shadow-realistic-sm">
                            {subCount} Circuit{subCount !== 1 ? 's' : ''}
                          </span>
                          <div className="state-hover-cta">
                            <span>Explore {st.stateName} &rarr;</span>
                          </div>
                        </div>

                        <div className="state-card-body">
                          <h3 className="state-card-title">{st.stateName}</h3>
                          <p className="state-card-summary">{st.summary}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <EmptyState
                  title="No states match your search"
                  description="We couldn't find any Indian state matching your query. Try searching with a broader keyword."
                  onReset={handleClearSearch}
                  resetLabel="Reset Search"
                />
              )}
            </section>
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* 2. INTERNATIONAL TAB CONTENT */}
      {/* ==================================================== */}
      {activeTab === 'international' && (
        <section className="international-tab-wrapper">
          {/* Country Filter Bar */}
          <div className="country-filters-bar">
            <span className="filters-label">
              <SlidersHorizontal size={14} /> Filter by Destination:
            </span>
            <div className="country-pills-list">
              <button
                className={`country-pill ${selectedCountry === 'all' ? 'active' : ''}`}
                onClick={() => handleCountryChange('all')}
              >
                <span>All Countries</span>
                <span className="pill-badge">{internationalPackages.length}</span>
              </button>

              {internationalCountries.map((country) => {
                const count = internationalPackages.filter((p) => p.country === country).length;
                return (
                  <button
                    key={country}
                    className={`country-pill ${selectedCountry.toLowerCase() === country.toLowerCase() ? 'active' : ''}`}
                    onClick={() => handleCountryChange(country)}
                  >
                    <span>{country}</span>
                    <span className="pill-badge">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* International Packages Grid */}
          <div className="international-grid-section">
            <div className="section-header-bar">
              <h2 className="section-main-title">
                {selectedCountry !== 'all' ? `${selectedCountry} Packages` : 'All International Escapes'}
              </h2>
              <span className="count-tag">
                {filteredInternationalPackages.length} Journey{filteredInternationalPackages.length !== 1 ? 's' : ''} Available
              </span>
            </div>

            {filteredInternationalPackages.length > 0 ? (
              <div className="intl-packages-grid">
                {filteredInternationalPackages.map((pkg) => {
                  const pricing = pkg.pricing || {
                    startingPrice: Math.round(Number(pkg.price || 0) * 1.15),
                    discountedPrice: pkg.price || 0,
                    currency: 'INR',
                  };
                  const startPrice = pricing.startingPrice || Math.round(Number(pricing.discountedPrice || 0) * 1.15);
                  const discPrice = pricing.discountedPrice || 0;
                  const discountPct = startPrice > discPrice
                    ? Math.round(((startPrice - discPrice) / startPrice) * 100)
                    : 0;
                  const photos = pkg.photos && pkg.photos.length > 0
                    ? pkg.photos
                    : ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=75'];

                  return (
                    <motion.div
                      key={pkg.id || pkg.package_id || pkg.slug}
                      className="intl-pkg-card shadow-interactive"
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.25 }}
                      onClick={() => handleNavigateToPackage(pkg)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Photo Header */}
                      <div className="intl-card-img-wrap">
                        <img
                          src={photos[0]}
                          alt={pkg.packageName || pkg.name}
                          className="intl-card-img"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="intl-card-img-overlay"></div>
                        <span className="intl-country-tag">
                          <Globe size={12} /> {pkg.country}
                        </span>
                        {discountPct > 0 && (
                          <span className="intl-discount-tag">
                            {discountPct}% OFF
                          </span>
                        )}
                      </div>

                      {/* Content Body */}
                      <div className="intl-card-body">
                        <h3 className="intl-card-title">{pkg.packageName || pkg.name}</h3>
                        <p className="intl-card-desc">{pkg.shortDescription}</p>

                        {/* Quick Spec Badges */}
                        <div className="sub-specs-row">
                          <span className="spec-item">
                            <Clock size={13} className="spec-item-icon" />
                            {pkg.duration}
                          </span>
                          <span className="spec-item">
                            <Car size={13} className="spec-item-icon" />
                            {pkg.modeOfTransport}
                          </span>
                        </div>

                        {/* Inclusions list */}
                        {pkg.inclusions && pkg.inclusions.length > 0 && (
                          <div className="sub-inclusions-block">
                            <span className="inc-header">Inclusions:</span>
                            <ul className="inc-mini-list">
                              {pkg.inclusions.slice(0, 3).map((inc, i) => (
                                <li key={i}>
                                  <CheckCircle2 size={12} className="inc-check-icon" />
                                  <span>{inc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Pricing & CTA Footer */}
                        <div className="sub-pkg-footer">
                          <div className="pricing-group">
                            {startPrice > discPrice && (
                              <span className="starting-price-cross">
                                {formatPrice(startPrice, pricing.currency)}
                              </span>
                            )}
                            <span className="discount-price-highlight">
                              {formatPrice(discPrice, pricing.currency)}
                            </span>
                            <span className="price-tagline">*Negotiable customized quote</span>
                          </div>

                          <Link
                            to={`/package/${pkg.slug || pkg.id || pkg.package_id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="btn-view-itinerary shadow-realistic-sm"
                          >
                            <span>View Itinerary</span>
                            <ChevronRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                title="No international packages found"
                description={`No packages found matching "${searchQuery}". Try selecting another country filter.`}
                onReset={handleClearSearch}
                resetLabel="Reset Filters"
              />
            )}
          </div>
        </section>
      )}

      <Footer />

      {/* ---------------------------------------------------- */}
      {/* COMPONENT STYLES */}
      {/* ---------------------------------------------------- */}
      <style>{`
        .explore-page {
          padding-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* Hero */
        .explore-hero {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          min-height: 360px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 48px 24px;
          background-color: var(--text-primary);
        }

        .explore-hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.42;
          transform: scale(1.03);
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .explore-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(11, 45, 72, 0.4) 0%, rgba(11, 45, 72, 0.88) 100%);
        }

        .explore-hero-content {
          position: relative;
          z-index: 2;
          max-width: 760px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .explore-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.28);
          color: #FFFFFF;
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .badge-icon {
          color: #FCD34D;
        }

        .explore-hero-title {
          font-size: 38px;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.15;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .explore-hero-subtitle {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.88);
          line-height: 1.5;
          max-width: 620px;
          margin: 0;
        }

        /* Search */
        .explore-search-bar {
          display: flex;
          align-items: center;
          background: #FFFFFF;
          border-radius: 50px;
          padding: 8px 18px;
          width: 100%;
          max-width: 600px;
          margin-top: 8px;
          gap: 12px;
        }

        .search-icon {
          color: var(--accent-teal);
          flex-shrink: 0;
        }

        .explore-search-input {
          border: none;
          outline: none;
          font-size: 14px;
          color: var(--text-primary);
          width: 100%;
          background: transparent;
        }

        .search-clear-btn {
          background: #F1F5F9;
          border: none;
          border-radius: 20px;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
        }

        /* Segmented Tabs Switcher */
        .explore-tabs-bar {
          display: flex;
          justify-content: center;
          margin-top: -12px;
        }

        .segmented-switch-container {
          background: #E2ECEF;
          padding: 5px;
          border-radius: 50px;
          display: inline-block;
        }

        .segmented-switch {
          display: flex;
          gap: 4px;
          position: relative;
        }

        .switch-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          border-radius: 50px;
          border: none;
          background: transparent;
          font-size: 14px;
          font-weight: 700;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
          z-index: 2;
          transition: color 0.2s ease;
        }

        .switch-tab.active {
          color: #FFFFFF;
        }

        .switch-tab-active-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--accent-teal);
          border-radius: 50px;
          z-index: -1;
          box-shadow: 0 4px 12px rgba(8, 124, 141, 0.3);
        }

        /* Section Headers */
        .section-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 20px;
        }

        .section-pre-title {
          font-size: 11px;
          font-weight: 800;
          color: var(--accent-teal);
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .section-main-title {
          font-size: 26px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 4px 0 0 0;
        }

        .section-sub-text {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 4px 0 0 0;
        }

        .count-tag {
          background: #E2ECEF;
          color: var(--text-primary);
          font-size: 12px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 50px;
        }

        /* All States Grid */
        .all-states-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }

        .state-interactive-card {
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
        }

        .state-card-img-wrap {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
        }

        .state-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .state-interactive-card:hover .state-card-img {
          transform: scale(1.08);
        }

        .state-card-img-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, transparent 40%, rgba(11, 45, 72, 0.8) 100%);
        }

        .state-count-chip {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(4px);
          font-size: 11px;
          font-weight: 800;
          color: var(--accent-teal);
          padding: 4px 10px;
          border-radius: 50px;
        }

        .state-hover-cta {
          position: absolute;
          bottom: 12px;
          left: 14px;
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          opacity: 0.9;
        }

        .state-card-body {
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .state-card-title {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .state-card-summary {
          font-size: 12.5px;
          color: var(--text-secondary);
          line-height: 1.45;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* State Sub View (Step 2) */
        .state-sub-view-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .state-nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .btn-change-state {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          color: var(--accent-teal);
          font-size: 13px;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-change-state:hover {
          background: var(--accent-turquoise-light);
          border-color: var(--accent-teal);
          transform: translateX(-2px);
        }

        .state-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .state-breadcrumbs a, .breadcrumb-btn {
          color: var(--text-secondary);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
        }

        .state-breadcrumbs a:hover, .breadcrumb-btn:hover {
          color: var(--accent-teal);
        }

        .state-breadcrumbs .current {
          color: var(--text-primary);
          font-weight: 700;
        }

        /* State Banner */
        .state-banner-card {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          min-height: 220px;
          display: flex;
          align-items: flex-end;
          padding: 32px;
          background: var(--text-primary);
        }

        .state-banner-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.5;
        }

        .state-banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(11, 45, 72, 0.2) 0%, rgba(11, 45, 72, 0.9) 100%);
        }

        .state-banner-content {
          position: relative;
          z-index: 2;
          max-width: 680px;
          color: #FFFFFF;
        }

        .state-banner-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 50px;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .state-banner-title {
          font-size: 30px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 6px 0;
        }

        .state-banner-summary {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          line-height: 1.45;
        }

        /* Sub Destinations & Packages Grid */
        .sub-destinations-grid, .intl-packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .sub-pkg-card, .intl-pkg-card {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          overflow: hidden;
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sub-pkg-img-wrap, .intl-card-img-wrap {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .sub-pkg-img, .intl-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sub-pkg-card:hover .sub-pkg-img, .intl-pkg-card:hover .intl-card-img {
          transform: scale(1.06);
        }

        .sub-pkg-img-overlay, .intl-card-img-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, transparent 50%, rgba(11, 45, 72, 0.7) 100%);
        }

        .sub-tag-chip, .intl-country-tag {
          position: absolute;
          bottom: 12px;
          left: 14px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(4px);
          font-size: 11px;
          font-weight: 700;
          color: var(--accent-teal);
          padding: 4px 10px;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .sub-discount-badge, .intl-discount-tag {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #DC2626;
          color: #FFFFFF;
          font-size: 10px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 50px;
          box-shadow: 0 4px 10px rgba(220, 38, 38, 0.3);
        }

        .sub-pkg-body, .intl-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 12px;
        }

        .sub-pkg-title, .intl-card-title {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.3;
        }

        .sub-pkg-desc, .intl-card-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .sub-specs-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          padding: 8px 12px;
          background: #F8FAFC;
          border-radius: var(--radius-sm);
        }

        .spec-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .spec-item-icon {
          color: var(--accent-teal);
        }

        .sub-inclusions-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .inc-header {
          font-size: 10.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
        }

        .inc-mini-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .inc-mini-list li {
          font-size: 12px;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 6px;
          line-height: 1.3;
        }

        .inc-check-icon {
          color: #10B981;
          flex-shrink: 0;
        }

        .sub-pkg-footer {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 12px;
        }

        .pricing-group {
          display: flex;
          flex-direction: column;
        }

        .starting-price-cross {
          font-size: 11px;
          color: var(--text-muted);
          text-decoration: line-through;
          line-height: 1;
        }

        .discount-price-highlight {
          font-size: 20px;
          font-weight: 800;
          color: var(--accent-teal);
          line-height: 1.1;
        }

        .price-tagline {
          font-size: 9px;
          font-weight: 600;
          color: var(--accent-teal);
          letter-spacing: -0.1px;
        }

        .btn-view-itinerary {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: var(--accent-teal);
          color: #FFFFFF;
          border: none;
          padding: 10px 16px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
          text-decoration: none;
        }

        .btn-view-itinerary:hover {
          background: var(--accent-teal-hover);
          transform: translateY(-1px);
        }

        /* Other States Bar */
        .other-states-bar {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .other-states-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .other-states-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .other-state-chip {
          background: #F8FAFC;
          border: 1px solid var(--border-color);
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .other-state-chip:hover {
          background: var(--accent-turquoise-light);
          color: var(--accent-teal);
          border-color: var(--accent-teal);
        }

        /* Country Filter Bar (International) */
        .country-filters-bar {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .filters-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .country-pills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .country-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 50px;
          background: #F1F5F9;
          border: 1px solid transparent;
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .country-pill:hover {
          background: #E2E8F0;
          color: var(--text-primary);
        }

        .country-pill.active {
          background: var(--accent-teal);
          color: #FFFFFF;
          border-color: var(--accent-teal);
          box-shadow: 0 4px 10px rgba(8, 124, 141, 0.25);
        }

        .pill-badge {
          background: rgba(0, 0, 0, 0.12);
          padding: 1px 6px;
          border-radius: 50px;
          font-size: 10px;
          font-weight: 700;
        }

        .country-pill.active .pill-badge {
          background: rgba(255, 255, 255, 0.28);
          color: #FFFFFF;
        }

        @media (max-width: 768px) {
          .explore-hero {
            min-height: 280px;
            padding: 32px 16px;
          }
          .explore-hero-title {
            font-size: 26px;
          }
          .sub-destinations-grid, .intl-packages-grid {
            grid-template-columns: 1fr;
          }
          .all-states-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .all-states-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}