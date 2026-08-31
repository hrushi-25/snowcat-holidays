import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { usePackages } from '../context/PackageContext';
import { motion } from 'framer-motion';
import FadeIn from '../components/animations/FadeIn';
import Reveal from '../components/animations/Reveal';
import EmptyState from '../components/animations/EmptyState';
import FeaturedCarousel from '../components/FeaturedCarousel';
import PackageCard from '../components/PackageCard';
import Footer from '../components/Footer';
import {
  Search,
  Compass,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

// Comprehensive Indian States metadata with curated high quality unsplash images & keywords
const INDIA_STATES = [
  {
    id: 'karnataka',
    name: 'Karnataka',
    tagline: 'Kumta Beaches, Gokarna Cliffs, Coorg Hills & Hampi Ruins',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    highlights: 'Kumta, Gokarna, Coorg, Hampi, Mysore, Kabini',
    destKeywords: ['karnataka', 'kumta', 'gokarna', 'coorg', 'hampi', 'mysore', 'kabini', 'dandeli', 'bangalore']
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    tagline: 'Konkan Scuba, Alibaug Villas, Mahabaleshwar & Matheran',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
    highlights: 'Konkan Coast, Alibaug, Mahabaleshwar, Matheran, Lonavala, Igatpuri',
    destKeywords: ['maharashtra', 'konkan', 'tarkarli', 'malvan', 'ratnagiri', 'alibaug', 'mahabaleshwar', 'panchgani', 'matheran', 'lonavala', 'khandala', 'igatpuri', 'mumbai', 'pune', 'ganpatipule', 'sindhudurg']
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    tagline: 'Rishikesh Rafting, Haridwar Aarti, Nainital & Mussoorie',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    highlights: 'Rishikesh, Haridwar, Nainital, Mussoorie, Jim Corbett, Auli',
    destKeywords: ['uttarakhand', 'rishikesh', 'haridwar', 'nainital', 'mussoorie', 'corbett', 'jim corbett', 'auli', 'kedarnath', 'chopta', 'dhanaulti', 'dehradun']
  },
  {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    tagline: 'Manali Snow, Solang Adventure, Kasol & Spiti 4x4',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
    highlights: 'Manali, Kasol, Kullu, Spiti Valley, Shimla, Dharamshala, Dalhousie',
    destKeywords: ['himachal', 'manali', 'solang', 'kasol', 'kullu', 'spiti', 'shimla', 'dharamshala', 'mcleodganj', 'tosh', 'manikaran', 'sissu', 'dalhousie', 'khajjiar']
  },
  {
    id: 'punjab',
    name: 'Punjab',
    tagline: 'Golden Temple, Wagah Border & Rich Heritage Trail',
    image: 'https://images.unsplash.com/photo-1588096344356-9b434a9e5257?auto=format&fit=crop&w=800&q=80',
    highlights: 'Golden Temple, Wagah Border, Amritsar, Chandigarh',
    destKeywords: ['punjab', 'amritsar', 'golden temple', 'wagah', 'chandigarh', 'anandpur']
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    tagline: 'Royal Forts, Udaipur Lakes & Thar Desert Safari',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    highlights: 'Jaipur Pink City, Udaipur Lakes, Jaisalmer Desert, Jodhpur',
    destKeywords: ['rajasthan', 'jaipur', 'udaipur', 'jaisalmer', 'jodhpur', 'pushkar', 'ranthambore', 'sam sand']
  },
  {
    id: 'kerala',
    name: 'Kerala',
    tagline: 'God’s Own Country — Palm Canals & Misty Tea Hills',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    highlights: 'Munnar, Alleppey Houseboats, Thekkady, Wayanad',
    destKeywords: ['kerala', 'munnar', 'alleppey', 'thekkady', 'kochi', 'wayanad', 'kovalam', 'varkala']
  },
  {
    id: 'goa',
    name: 'Goa',
    tagline: 'Golden Sunshine, Portuguese Heritage & Tropical Beaches',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    highlights: 'North Goa Beaches, South Goa Resorts, Fort Aguada',
    destKeywords: ['goa', 'baga', 'calangute', 'panjim', 'anjuna', 'palolem', 'dudhsagar', 'aguada']
  },
  {
    id: 'jammu-kashmir',
    name: 'Jammu & Kashmir',
    tagline: 'Paradise on Earth — Dal Lake Shikaras, Gulmarg & Pahalgam',
    image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
    highlights: 'Srinagar Dal Lake, Gulmarg Gondola, Pahalgam Valley',
    destKeywords: ['kashmir', 'srinagar', 'gulmarg', 'pahalgam', 'sonamarg', 'jammu', 'dal lake']
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    tagline: 'High Passes, Blue Lakes & Tibetan Monasteries',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    highlights: 'Leh, Pangong Tso, Nubra Valley, Khardung La',
    destKeywords: ['ladakh', 'leh', 'pangong', 'nubra', 'khardung', 'hunder', 'chang la']
  },
  {
    id: 'sikkim-darjeeling',
    name: 'Sikkim & North East',
    tagline: 'Mystic Monasteries, Organic Tea & Himalayan Heights',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    highlights: 'Gangtok, Tsomgo Lake, Darjeeling, Meghalaya',
    destKeywords: ['sikkim', 'gangtok', 'darjeeling', 'meghalaya', 'shillong', 'tsomgo', 'assam']
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    tagline: 'Nilgiri Toy Train, Ooty Hills & Temple Architecture',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    highlights: 'Ooty Hills, Kodaikanal, Rameshwaram, Kanyakumari',
    destKeywords: ['tamil nadu', 'ooty', 'kodaikanal', 'nilgiri', 'coonoor', 'rameshwaram', 'kanyakumari', 'madurai']
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    tagline: 'White Desert of Kutch & Asiatic Lion Safari',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
    highlights: 'Rann of Kutch, Gir Forest, Dwarka, Somnath',
    destKeywords: ['gujarat', 'kutch', 'gir', 'dwarka', 'statue of unity', 'ahmedabad', 'somnath', 'rann']
  }
];

// Helper to compute search match score for a package
const getSearchScore = (pkg, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return 1;

  const name = (pkg.name || '').toLowerCase().trim();
  const destination = (pkg.destination || '').toLowerCase().trim();
  const state = (pkg.state || '').toLowerCase().trim();

  // 1. Exact matches
  if (name === q || destination === q || state === q) return 1000;

  // 2. Starts with match
  if (name.startsWith(q) || destination.startsWith(q) || state.startsWith(q)) return 800;

  // 3. Substring match in primary fields
  if (name.includes(q) || destination.includes(q) || state.includes(q)) return 500;

  // 4. Matches in description or sightseeing
  const shortDesc = (pkg.shortDescription || '').toLowerCase();
  const sightseeing = (pkg.sightseeing || '').toLowerCase();
  const hotelDetails = (pkg.hotelDetails || '').toLowerCase();
  const category = (pkg.category || '').toLowerCase();

  if (shortDesc.includes(q) || sightseeing.includes(q) || hotelDetails.includes(q) || category.includes(q)) {
    return 100;
  }

  return 0;
};

export default function Catalog() {
  const { packages } = usePackages();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active view tab: 'india' or 'international'
  const initialTab = searchParams.get('tab') || 'india';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Active state filter for India
  const initialSelectedState = searchParams.get('state') || 'all';
  const [selectedState, setSelectedState] = useState(initialSelectedState);

  // Search query string
  const initialSearch = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Sync URL search query back to state when URL parameters change
  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);

  // Sync URL tab back to state when URL parameters change
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Sync URL state filter back to state when URL parameters change
  useEffect(() => {
    setSelectedState(initialSelectedState);
  }, [initialSelectedState]);

  // Sync states to URL parameters
  useEffect(() => {
    const params = {};
    if (activeTab) params.tab = activeTab;
    if (selectedState && selectedState !== 'all') params.state = selectedState;
    if (searchQuery) params.q = searchQuery;
    setSearchParams(params, { replace: true });
  }, [activeTab, selectedState, searchQuery, setSearchParams]);

  // Active public packages
  const activePackages = useMemo(() => {
    return packages.filter(pkg => pkg && pkg.isActive !== false);
  }, [packages]);

  // Helper check for international
  const isInternational = (pkg) => {
    if (!pkg) return false;
    const cat = (pkg.category || '').toLowerCase();
    const dest = (pkg.destination || '').toLowerCase();
    const name = (pkg.name || '').toLowerCase();
    return cat === 'international' ||
      dest.includes('dubai') || dest.includes('switzerland') || dest.includes('singapore') ||
      dest.includes('thailand') || dest.includes('maldives') || dest.includes('bali') ||
      name.includes('dubai') || name.includes('swiss') || name.includes('singapore') ||
      name.includes('thailand') || name.includes('maldives') || name.includes('bali');
  };

  // Filtered packages calculation
  const filteredPackages = useMemo(() => {
    // Apply category tab filter first
    const categoryFiltered = activePackages.filter(pkg => {
      return activeTab === 'international' ? isInternational(pkg) : !isInternational(pkg);
    });

    const query = searchQuery.trim().toLowerCase();

    if (query !== '') {
      const withScores = categoryFiltered
        .map(pkg => ({ pkg, score: getSearchScore(pkg, searchQuery) }))
        .filter(item => item.score > 0);

      withScores.sort((a, b) => b.score - a.score);
      return withScores.map(item => item.pkg);
    }

    // Default flow when search is empty: filter by selectedState (for India tab)
    return categoryFiltered.filter(pkg => {
      if (activeTab === 'india' && selectedState !== 'all') {
        const stateObj = INDIA_STATES.find(s => s.id === selectedState);
        if (stateObj) {
          const destLower = (pkg.destination || '').toLowerCase();
          const nameLower = (pkg.name || '').toLowerCase();
          const stateLower = (pkg.state || '').toLowerCase();
          const matchesState = stateObj.destKeywords.some(kw => 
            destLower.includes(kw) || nameLower.includes(kw) || stateLower.includes(kw)
          );
          if (!matchesState) return false;
        }
      }
      return true;
    });
  }, [activePackages, activeTab, selectedState, searchQuery]);

  // Count packages available per state
  const stateCounts = useMemo(() => {
    const counts = {};
    const indiaPkgs = activePackages.filter(p => !isInternational(p));
    INDIA_STATES.forEach(st => {
      counts[st.id] = indiaPkgs.filter(p => {
        const d = (p.destination || '').toLowerCase();
        const n = (p.name || '').toLowerCase();
        const s = (p.state || '').toLowerCase();
        return st.destKeywords.some(kw => d.includes(kw) || n.includes(kw) || s.includes(kw));
      }).length;
    });
    return counts;
  }, [activePackages]);

  return (
    <div className="catalog-page container mobile-nav-padding">
      
      {/* Hero Banner Section */}
      <section className="catalog-hero shadow-realistic-lg">
        <div className="catalog-hero-overlay"></div>
        <img
          src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1400&q=80"
          alt="Explore India & International Catalog"
          className="catalog-hero-bg"
        />
        <div className="catalog-hero-content">
          <FadeIn direction="up" delay={0.05}>
            <div className="catalog-badge shadow-realistic-sm">
              <Compass size={14} className="badge-compass" />
              <span>OFFICIAL TRAVEL CATALOG</span>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <h1 className="catalog-hero-title">Discover India & Beyond</h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.25}>
            <p className="catalog-hero-subtitle">
              Browse curated state-wise journeys with 3-Star & 5-Star accommodations and negotiable pricing.
            </p>
          </FadeIn>

          {/* Unified Search Input */}
          <FadeIn direction="up" delay={0.35}>
            <div className="catalog-search-bar shadow-realistic-lg">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search by state (Karnataka, Maharashtra, Uttarakhand, Punjab) or spot..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="catalog-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                  type="button"
                >
                  Clear
                </button>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main Tab Segment: India vs International */}
      <div className="catalog-tabs-bar">
        <div className="segmented-switch-container catalog-tab-segmented">
          <div className="segmented-switch shadow-realistic-sm">
            <button
              className={`switch-tab ${activeTab === 'international' ? 'active' : ''}`}
              onClick={() => { setActiveTab('international'); setSelectedState('all'); }}
              style={{ position: 'relative' }}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>✈️ International Escapes</span>
              {activeTab === 'international' && (
                <motion.div
                  layoutId="catalogMainTabBg"
                  className="switch-tab-active-bg"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </button>

            <button
              className={`switch-tab ${activeTab === 'india' ? 'active' : ''}`}
              onClick={() => { setActiveTab('india'); setSelectedState('all'); }}
              style={{ position: 'relative' }}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>🇮🇳 India Packages</span>
              {activeTab === 'india' && (
                <motion.div
                  layoutId="catalogMainTabBg"
                  className="switch-tab-active-bg"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* FEATURED RESPONSIVE GRID */}
      <FeaturedCarousel
        packages={activePackages}
        title={activeTab === 'india' ? 'Featured India Escapes' : 'Featured International Trips'}
        staticGrid={true}
        showTabs={false}
        activeCategoryProp={activeTab}
        searchQuery={searchQuery}
      />

      {/* INDIA STATE-WISE PREVIEW SHOWCASE */}
      {activeTab === 'india' && (
        <section className="state-showcase-section">
          <Reveal y={16}>
            <div className="state-section-header">
              <div>
                <span className="section-pre-title">EXPLORE BY STATE</span>
                <h2 className="state-section-title">State-Wise Destination Showcase</h2>
              </div>
              {selectedState !== 'all' && (
                <button
                  onClick={() => setSelectedState('all')}
                  className="btn-reset-state shadow-realistic-sm"
                >
                  Show All States ({activePackages.filter(p => !isInternational(p)).length})
                </button>
              )}
            </div>
          </Reveal>

          {/* Grid of State Cards */}
          <div className="states-grid">
            {INDIA_STATES.map((st) => {
              const count = stateCounts[st.id] || 0;
              const isSelected = selectedState === st.id;

              return (
                <motion.div
                  key={st.id}
                  className={`state-card shadow-interactive ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedState(isSelected ? 'all' : st.id)}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="state-img-wrapper">
                    <img src={st.image} alt={st.name} className="state-card-img" />
                    <div className="state-img-overlay"></div>
                    <span className="state-count-badge shadow-realistic-sm">
                      {count > 0 ? `${count} Package${count > 1 ? 's' : ''}` : 'Featured State'}
                    </span>
                    {isSelected && (
                      <div className="state-selected-check">
                        <CheckCircle2 size={16} />
                        <span>Selected State</span>
                      </div>
                    )}
                  </div>
                  <div className="state-card-content">
                    <h3 className="state-card-name">{st.name}</h3>
                    <p className="state-card-tagline">{st.tagline}</p>
                    <div className="state-card-highlights">
                      <span>{st.highlights}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* FILTERED PACKAGES RESULTS LIST */}
      <section className="catalog-packages-section">
        <div className="catalog-list-header">
          <div className="catalog-list-title-group">
            <h2 className="catalog-list-title">
              {activeTab === 'india'
                ? selectedState === 'all'
                  ? 'All India Tour Packages'
                  : `Packages in ${INDIA_STATES.find(s => s.id === selectedState)?.name || 'Selected State'}`
                : 'International Escapes'}
            </h2>
            <span className="results-count-chip shadow-realistic-sm">
              Showing {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Package Grid */}
        {filteredPackages.length > 0 ? (
          <div className="catalog-grid">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.slug || pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No packages match your search"
            description={`We couldn't find any packages matching your selection. Try clearing the state filter or search terms.`}
            onReset={() => {
              setSelectedState('all');
              setSearchQuery('');
            }}
            resetLabel="Reset All Filters"
          />
        )}
      </section>

      {/* Need Custom Itinerary Banner */}
      <section className="custom-plan-cta container">
        <div className="custom-plan-card shadow-realistic-lg">
          <div className="custom-plan-text">
            <span className="custom-pre">CAN'T FIND YOUR STATE OR DESTINATION?</span>
            <h2 className="custom-title">We craft bespoke itineraries all over India & Abroad.</h2>
            <p className="custom-desc">
              Tell us where you want to travel, and our expert travel planner will design a custom package for you within 2 hours. All prices are negotiable!
            </p>
          </div>
          <Link to="/enquire" className="btn-turquoise-cta custom-cta-btn shadow-realistic-md">
            Request Custom Trip <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Official Footer Section */}
      <Footer />

      <style>{`
        .catalog-page {
          padding-top: 16px;
          padding-bottom: 40px;
        }

        /* Catalog Hero */
        .catalog-hero {
          position: relative;
          width: 100%;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background-color: var(--text-primary);
          padding: 44px 24px;
          color: #FFFFFF;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          min-height: 280px;
        }
        @media (min-width: 768px) {
          .catalog-hero {
            padding: 56px 40px;
            min-height: 320px;
          }
        }

        .catalog-hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .catalog-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(11, 45, 72, 0.92) 0%, rgba(11, 45, 72, 0.7) 60%, rgba(8, 124, 141, 0.4) 100%);
          z-index: 2;
        }

        .catalog-hero-content {
          position: relative;
          z-index: 3;
          max-width: 680px;
        }

        .catalog-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          padding: 6px 14px;
          border-radius: 50px;
          margin-bottom: 14px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .catalog-hero-title {
          font-size: 32px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 10px 0;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }
        @media (min-width: 768px) {
          .catalog-hero-title {
            font-size: 42px;
          }
        }

        .catalog-hero-subtitle {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.88);
          margin: 0 0 24px 0;
          line-height: 1.5;
        }

        .catalog-search-bar {
          display: flex;
          align-items: center;
          background: #FFFFFF;
          border-radius: 50px;
          padding: 6px 10px 6px 20px;
          gap: 12px;
          width: 100%;
        }

        .search-icon {
          color: var(--accent-teal);
          flex-shrink: 0;
        }

        .catalog-search-input {
          flex-grow: 1;
          border: none;
          outline: none;
          font-size: 15px;
          font-family: var(--font-sans);
          color: var(--text-primary);
          background: transparent;
        }

        .search-clear-btn {
          background: var(--bg-primary);
          border: none;
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .search-clear-btn:hover {
          background: var(--accent-turquoise-light);
          color: var(--accent-teal);
        }

        /* Tabs bar styling */
        .catalog-tabs-bar {
          margin-bottom: 28px;
        }
        .catalog-tab-segmented {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
          width: 100%;
        }
        .catalog-tab-segmented .segmented-switch {
          display: flex;
          background-color: #F0F4F6;
          border-radius: 30px;
          padding: 4px;
          width: 100%;
          max-width: 480px;
          border: none;
          gap: 0;
        }
        .catalog-tab-segmented .switch-tab {
          flex: 1;
          border: none;
          background: transparent;
          padding: 12px 20px;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-secondary);
          border-radius: 26px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
        }
        .catalog-tab-segmented .switch-tab.active {
          color: #FFFFFF;
        }
        .catalog-tab-segmented .switch-tab-active-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--accent-teal);
          border-radius: 26px;
          z-index: 1;
        }

        /* State Showcase */
        .state-showcase-section {
          margin: 40px 0;
        }

        .state-section-header {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }
        @media (min-width: 768px) {
          .state-section-header {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          }
        }

        .state-section-title {
          font-size: 26px;
          font-weight: 800;
          margin: 4px 0 0 0;
        }

        .btn-reset-state {
          background: var(--accent-turquoise-light);
          color: var(--accent-teal);
          border: 1px solid var(--accent-teal);
          font-size: 13px;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 50px;
          cursor: pointer;
          align-self: flex-start;
          transition: all 0.2s ease;
        }
        .btn-reset-state:hover {
          background: var(--accent-teal);
          color: #FFFFFF;
        }

        .states-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 18px;
        }

        .state-card {
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid rgba(226, 236, 239, 0.9);
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        .state-card.selected {
          border: 2px solid var(--accent-teal);
          box-shadow: 0 0 0 3px var(--accent-turquoise-light), var(--shadow-hover-lift);
        }

        .state-img-wrapper {
          position: relative;
          width: 100%;
          height: 150px;
          overflow: hidden;
        }

        .state-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .state-card:hover .state-card-img {
          transform: scale(1.08);
        }

        .state-img-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(11, 45, 72, 0.6) 0%, transparent 70%);
        }

        .state-count-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(11, 45, 72, 0.8);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 50px;
        }

        .state-selected-check {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: var(--accent-teal);
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .state-card-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .state-card-name {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .state-card-tagline {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.4;
        }

        .state-card-highlights {
          font-size: 11px;
          font-weight: 600;
          color: var(--accent-teal);
          background: var(--accent-turquoise-light);
          padding: 4px 10px;
          border-radius: 6px;
          margin-top: 6px;
          display: inline-block;
        }

        /* Catalog Packages List */
        .catalog-packages-section {
          margin-top: 40px;
        }

        .catalog-list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .catalog-list-title-group {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .catalog-list-title {
          font-size: 24px;
          font-weight: 800;
          margin: 0;
        }

        .results-count-chip {
          background: var(--bg-secondary);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 600;
          padding: 4px 14px;
          border-radius: 50px;
          border: 1px solid var(--border-color);
        }

        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        /* Custom CTA */
        .custom-plan-cta {
          margin: 50px 0 20px 0;
        }

        .custom-plan-card {
          background: linear-gradient(135deg, var(--text-primary) 0%, #0B3A5B 100%);
          border-radius: var(--radius-xl);
          padding: 36px 28px;
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .custom-plan-card {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 48px;
          }
        }

        .custom-pre {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: var(--accent-turquoise);
        }

        .custom-title {
          font-size: 26px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 6px 0 10px 0;
        }

        .custom-desc {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
          max-width: 580px;
          line-height: 1.5;
        }

        .custom-cta-btn {
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}
