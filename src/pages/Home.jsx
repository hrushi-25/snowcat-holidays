import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { usePackages } from '../context/PackageContext';
import { motion } from 'framer-motion';
import FadeIn from '../components/animations/FadeIn';
import Reveal from '../components/animations/Reveal';
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerContainer';
import AnimatedCounter from '../components/animations/AnimatedCounter';
import HoverCard from '../components/animations/HoverCard';
import MagneticButton from '../components/animations/MagneticButton';
import EmptyState from '../components/animations/EmptyState';
import {
  Search,
  Compass,
  ShieldCheck,
  Heart,
  Headphones,
  User,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';

export default function Home() {
  const { packages } = usePackages();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to filters if path is /explore
  useEffect(() => {
    if (location.pathname === '/explore') {
      setTimeout(() => {
        const filterSection = document.getElementById('filters-section');
        if (filterSection) {
          filterSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.pathname]);

  // Trending Search & Switch States
  const [trendingSearchQuery, setTrendingSearchQuery] = useState('');
  const [trendingTab, setTrendingTab] = useState('international'); // 'international' or 'india'

  // Active packages only for public view
  const activePackages = useMemo(() => {
    return packages.filter(pkg => pkg && pkg.isActive);
  }, [packages]);
  console.log('activePackages:', activePackages);

  // Static reviews data
  const reviews = [
    {
      name: 'B.Ingole',
      rating: 5,
      text: 'Our recent Kashmir trip with Snowcat holiday was absolutely fantastic! The itinerary was well-planned, and the entire experience was seamless and enjoyable. From the moment we arrived to the time we left everything was taken care of. The staff was helpful and the accomodation were comfortable, clean also food was delicious. The tour was well organised. The driver was very experienced and safe. We appreciate the comfortable and reliable transportation. We were very Happy with this tour.'
    },
    {
      name: 'Hemant Patil',
      rating: 5,
      text: 'We had an amazing family trip to Bali, all thanks to Snowcat Holidays! Everything was perfectly organized, from hotels and transferrs to sightseeing. The itinerary was well-balanced, and team was always supportive and responsive. It was truly a stress-free and memorable experience throughout from booking till arrival. Highly recommended'
    },
    {
      name: 'Er rajni khoyani',
      rating: 5,
      text: 'We went on a customised trip to Shimla -manali-kasol with snowcat this January and it was an amazing experience. All the Hotels were comfortable and Team was guiding everyday towards a good experience. N really 🤩enjoyed in this tour, tempo traveler is very comfortable. In case we faced any issue, they were available over call at all the time. Overall great travel partner. 🎊 Special Kasol and jibhi tree house 🏠 night is best and memorable night with my friends 🤩 Thank you shabbirbhai for best memorable trip🙏🏻🤩🥂'
    },
    {
      name: 'SWAPNIL RAUT',
      rating: 5,
      text: 'Had a great honeymoon package which included 5 nights 6 days in Kashmir including all sight seeing and locations like Srinagar, Dal lake (House boat), Pahalgham, Dhoodpatri, Gulmarg etc. Superb stay at 4 star hotels, great food and appreciable service by staff members. Thank you Snowcat holidays for a memorable and life time experience.'
    },
    {
      name: 'Dhrumil Pandya',
      rating: 5,
      text: 'I had an incredible experience with Snowcat Holidays during my trip to Kerala. Special thanks to Mr. Shabbir for meticulously planning and organizing every aspect of the journey. From the accommodations to the itinerary, everything was well-arranged and seamless.'
    },
    {
      name: 'Prachiti Prajapati',
      rating: 5,
      text: 'It was awesome trip, overall good experiance from my side, driver also drived car very well, and given us enough time to enjoy at site visit. Hotels was nice, good surrounding view, and delicious food. Overall travelling experience in Manali & Shimla was unique and memorable.'
    },
    {
      name: 'Sujata Sardar',
      rating: 5,
      text: 'Friends it has been a wonderful experience travelling with Snowcat Holidays and with the group it was amazing experience! The places chosen were lovely and Indian food hotels were also good! Shabbir and his team managed the whole tours very well! Best wishes'
    }
  ];

  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleExpandReview = (idx) => {
    setExpandedReviews(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const getInitials = (name) => {
    if (!name) return 'S';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Helper to determine if a package is International
  const isInternationalPkg = (pkg) => {
    if (!pkg) return false;
    const cat = (pkg.category || '').toLowerCase();
    const dest = (pkg.destination || '').toLowerCase();
    const name = (pkg.name || '').toLowerCase();
    return cat === 'international' ||
      dest.includes('dubai') ||
      dest.includes('switzerland') ||
      dest.includes('singapore') ||
      dest.includes('thailand') ||
      dest.includes('maldives') ||
      dest.includes('bali') ||
      name.includes('dubai') ||
      name.includes('swiss') ||
      name.includes('singapore') ||
      name.includes('thailand') ||
      name.includes('maldives') ||
      name.includes('bali');
  };

  const filteredTrendingPackages = useMemo(() => {
    return activePackages.filter(pkg => {
      if (!pkg) return false;
      // 1. Tab check
      const matchesTab = trendingTab === 'international'
        ? isInternationalPkg(pkg)
        : !isInternationalPkg(pkg);

      // 2. Search check (name, destination, category/packageType)
      const name = (pkg.name || '').toLowerCase();
      const dest = (pkg.destination || '').toLowerCase();
      const cat = (pkg.category || '').toLowerCase();

      const matchesSearch = trendingSearchQuery === '' ||
        name.includes(trendingSearchQuery.toLowerCase()) ||
        dest.includes(trendingSearchQuery.toLowerCase()) ||
        cat.includes(trendingSearchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activePackages, trendingTab, trendingSearchQuery]);

  const handleExploreClick = () => {
    const trendingSection = document.querySelector('.trending-destinations-section');
    if (trendingSection) {
      trendingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page mobile-nav-padding">
      {/* Mobile Top Header (Matches the reference screenshots) */}
      <div className="mobile-only-header container">
        <div className="mobile-header-left">
          <span className="curated-label">CURATED JOURNEYS</span>
          <div className="brand-name">
            Snowcat<span> holidays</span>
          </div>
        </div>
        <Link to="/owner" className="mobile-profile-btn" aria-label="Owner login">
          <User size={20} />
        </Link>
      </div>

      {/* Hero Section */}
      <section className="hero-section container">
        <div className="hero-card">
          <div className="hero-overlay"></div>
          <img
            src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80"
            alt="Beautiful snow peaks of Spiti Valley"
            className="hero-bg-image"
          />
          <div className="hero-content">
            <FadeIn direction="up" delay={0.05} distance={16}>
              <div className="hero-edit-badge">
                <Compass size={14} className="edit-icon" />
                <span>THE SNOWCAT EDIT</span>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.15} distance={20}>
              <h1 className="hero-title">Go where the world feels new.</h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.25} distance={20}>
              <p className="hero-description">
                Thoughtfully planned holidays, made for the stories you'll tell for years.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.35} distance={20}>
              <MagneticButton onClick={handleExploreClick} className="btn-tan hero-cta">
                <span>Explore the edit</span>
                <ArrowUpRight size={18} />
              </MagneticButton>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Search & Trending Destinations Section */}
      <section className="trending-destinations-section container">
        {/* Large Rounded Search Bar */}
        <FadeIn direction="up" delay={0.1}>
          <div className="pill-search-container">
            <input
              type="text"
              placeholder="Search &ldquo;Dubai&rdquo;"
              value={trendingSearchQuery}
              onChange={(e) => setTrendingSearchQuery(e.target.value)}
              className="pill-search-input"
            />
            <button className="pill-search-button" aria-label="Search">
              <Search size={18} />
            </button>
          </div>
        </FadeIn>

        {/* Heading */}
        <Reveal y={16}>
          <h2 className="trending-heading">Trending Destinations</h2>
        </Reveal>

        {/* Segmented Switch Tab with Animated Layout Slider */}
        <div className="segmented-switch-container">
          <div className="segmented-switch">
            <button
              className={`switch-tab ${trendingTab === 'international' ? 'active' : ''}`}
              onClick={() => setTrendingTab('international')}
              style={{ position: 'relative' }}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>International</span>
              {trendingTab === 'international' && (
                <motion.div
                  layoutId="segmentedTabBg"
                  className="switch-tab-active-bg"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </button>
            <button
              className={`switch-tab ${trendingTab === 'india' ? 'active' : ''}`}
              onClick={() => setTrendingTab('india')}
              style={{ position: 'relative' }}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>India & Around</span>
              {trendingTab === 'india' && (
                <motion.div
                  layoutId="segmentedTabBg"
                  className="switch-tab-active-bg"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Manually Swipeable Horizontal Carousel */}
        <div className="carousel-wrapper-trending">
          {filteredTrendingPackages.length > 0 ? (
            <div className="carousel-scroll-track-trending">
              {filteredTrendingPackages.map((pkg) => {
                const mainImage = pkg.images && pkg.images.length > 0
                  ? pkg.images[0]
                  : 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80';

                return (
                  <motion.div
                    key={pkg.slug}
                    className="carousel-card-trending"
                    onClick={() => navigate(`/package/${pkg.slug}`)}
                    whileHover={{ y: -6, scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img src={mainImage} alt={pkg.name} className="carousel-card-img" />
                    <div className="carousel-card-overlay"></div>
                    <div className="carousel-card-content">
                      <h3 className="carousel-card-title">{pkg.name}</h3>
                      <div className="carousel-card-footer">
                        <div className="price-group-trending">
                          <span className="price-label-trending">Starting at</span>
                          <span className="price-value-trending">₹{pkg.price.toLocaleString('en-IN')}</span>
                        </div>
                        <button className="arrow-btn-trending" aria-label="View details">
                          &rarr;
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="No matching destinations"
              description={`We couldn't find any destinations matching "${trendingSearchQuery}".`}
              onReset={() => setTrendingSearchQuery('')}
              resetLabel="Clear Search"
            />
          )}
        </div>

        {/* Explore Now Button */}
        <div className="explore-now-btn-container">
          <Link to="/explore" className="btn-turquoise-cta trending-explore-btn">
            Explore Now &rarr;
          </Link>
        </div>
      </section>

      {/* Statistics Section with Animated Counter */}
      <section className="stats-section container">
        <Reveal y={20}>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">
                <AnimatedCounter target={12} suffix="+" />
              </div>
              <div className="stat-label">years of travel</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">
                <AnimatedCounter target={activePackages.length || 10} />
              </div>
              <div className="stat-label">curated escapes</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">4.9</div>
              <div className="stat-label">guest rating</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Built Around You Section */}
      <section className="features-section container">
        <Reveal y={16}>
          <span className="section-pre-title text-center block">TRAVEL, YOUR WAY</span>
          <h2 className="section-title text-center block mb-36">Built around you</h2>
        </Reveal>

        <StaggerContainer className="features-grid">
          <StaggerItem>
            <HoverCard className="feature-card">
              <div className="feature-icon-wrapper">
                <Compass size={24} className="feature-icon" />
              </div>
              <h3 className="feature-title">Slow travel</h3>
              <p className="feature-text">Space to take it all in.</p>
            </HoverCard>
          </StaggerItem>

          <StaggerItem>
            <HoverCard className="feature-card">
              <div className="feature-icon-wrapper">
                <ShieldCheck size={24} className="feature-icon" />
              </div>
              <h3 className="feature-title">Travel assured</h3>
              <p className="feature-text">Thoughtful details, every mile.</p>
            </HoverCard>
          </StaggerItem>

          <StaggerItem>
            <HoverCard className="feature-card">
              <div className="feature-icon-wrapper">
                <Heart size={24} className="feature-icon" />
              </div>
              <h3 className="feature-title">Local knowledge</h3>
              <p className="feature-text">The places only we know.</p>
            </HoverCard>
          </StaggerItem>

          <StaggerItem>
            <HoverCard className="feature-card">
              <div className="feature-icon-wrapper">
                <Headphones size={24} className="feature-icon" />
              </div>
              <h3 className="feature-title">Always close</h3>
              <p className="feature-text">A real person when you need one.</p>
            </HoverCard>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* About Section */}
      <section className="about-section container">
        <Reveal y={20}>
          <span className="section-pre-title">A LITTLE ABOUT US</span>
          <h2 className="about-title font-display">
            We plan the kind of trips you don’t want to come home from.
          </h2>
          <p className="about-text">
            Snowcat Holidays is a small team of big-world people. We pair local insight with considered planning, so every holiday feels effortless, personal and entirely yours.
          </p>
          <Link to="/enquire" className="meet-snowcat-link">
            Meet Snowcat <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>

      {/* What Our Travellers Say Section */}
      <section className="reviews-section container">
        <Reveal y={16}>
          <span className="section-pre-title text-center block">TESTIMONIALS</span>
          <h2 className="section-title text-center block mb-36">What our travellers say</h2>
        </Reveal>

        <StaggerContainer className="reviews-grid">
          {reviews.map((review, idx) => {
            const isExpanded = expandedReviews[idx];
            const isLong = review.text.length > 150;
            const displayedText = isLong && !isExpanded
              ? `${review.text.substring(0, 150)}...`
              : review.text;

            return (
              <StaggerItem key={idx}>
                <HoverCard className="review-card">
                  <div className="review-card-header">
                    <div className="review-avatar-row">
                      <div className="review-avatar">
                        {getInitials(review.name)}
                      </div>
                      <div className="review-author-info">
                        <h4 className="review-author-name">{review.name}</h4>
                        {review.meta && <span className="review-meta">{review.meta}</span>}
                      </div>
                    </div>
                    <div className="review-rating-row">
                      <div className="review-stars">
                        {'★'.repeat(review.rating)}
                      </div>
                      {review.time && <span className="review-time">{review.time}</span>}
                    </div>
                  </div>
                  <div className="review-card-body">
                    <p className="review-text">{displayedText}</p>
                    {isLong && (
                      <button
                        onClick={() => toggleExpandReview(idx)}
                        className="review-read-more-btn"
                        type="button"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>
                </HoverCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* Dark Navy CTA Section */}
      <section className="cta-section container">
        <Reveal y={24}>
          <div className="cta-card">
            <span className="cta-pre">LET'S MAKE A PLAN</span>
            <h2 className="cta-title">Tell us where your mind is wandering.</h2>
            <p className="cta-text">
              Not sure where to start? Share a few details and our travel designer will be in touch.
            </p>
            <Link to="/enquire" className="btn-turquoise-cta hero-cta">
              Start an enquiry <ArrowUpRight size={18} />
            </Link>
            <div className="cta-footer-contacts">
              <span>WhatsApp +91 7887778652</span>
              <span className="dot-separator">·</span>
              <span>snowcatholidays@gmail.com</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Official Footer Section */}
      <footer className="footer-section container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="curated-label">CURATED JOURNEYS</span>
            <div className="brand-name">
              Snowcat<span> holidays</span>
            </div>
            <p className="footer-tagline">Curated journeys thoughtfully planned for life-long memories.</p>
          </div>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/enquire">Enquire</Link>
            <Link to="/owner">Owner Portal</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Snowcat Holidays. All rights reserved.</span>
          <span>Trust The Cat</span>
        </div>
      </footer>

      <style>{`
        /* Mobile Header */
        .mobile-only-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 12px;
        }
        
        .mobile-header-left {
          display: flex;
          flex-direction: column;
        }

        .mobile-profile-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .mobile-profile-btn:hover {
          background-color: var(--accent-turquoise-light);
          color: var(--accent-teal);
        }

        /* Hero */
        .hero-section {
          margin-bottom: 30px;
        }

        .hero-card {
          position: relative;
          width: 100%;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background-color: var(--text-primary);
          aspect-ratio: 9 / 11;
          display: flex;
          align-items: flex-end;
          padding: 30px;
          box-shadow: var(--shadow-medium);
        }

        .hero-bg-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(11, 45, 72, 0.9) 0%, rgba(11, 45, 72, 0.4) 60%, rgba(11, 45, 72, 0.1) 100%);
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          width: 100%;
          color: #FFFFFF;
        }

        .hero-edit-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 12px;
        }

        .hero-title {
          font-size: 34px;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
          line-height: 1.15;
        }

        .hero-description {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 24px;
          font-weight: 400;
        }

        .hero-cta {
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }

        /* Stats */
        .stats-section {
          margin-bottom: 40px;
        }

        .stats-grid {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-lg);
          padding: 24px 16px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          box-shadow: var(--shadow-subtle);
          border: 1px solid rgba(226, 236, 239, 0.6);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 30%;
        }

        .stat-value {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 6px;
        }

        .stat-label {
          font-size: 11px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background-color: var(--border-color);
        }

        /* Filters Section */
        .filters-section {
          margin-bottom: 30px;
        }

        .filters-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 16px;
        }

        .section-pre-title {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: var(--accent-teal);
          margin-bottom: 4px;
          display: block;
        }

        .section-title {
          font-size: 26px;
          font-weight: 800;
          margin: 0;
          color: var(--text-primary);
          letter-spacing: -0.5px;
        }

        .view-all-link {
          font-size: 14px;
          font-weight: 700;
          color: var(--accent-teal);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .view-all-link:hover {
          color: var(--accent-teal-hover);
          text-decoration: underline;
        }

        .search-bar-container {
          display: flex;
          align-items: center;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 6px 6px 6px 16px;
          box-shadow: var(--shadow-subtle);
          margin-bottom: 16px;
        }

        .search-icon {
          color: var(--text-muted);
          margin-right: 12px;
        }

        .search-input {
          flex-grow: 1;
          border: none;
          outline: none;
          font-family: var(--font-sans);
          font-size: 15px;
          color: var(--text-primary);
          background: transparent;
        }
        
        .search-input::placeholder {
          color: var(--text-muted);
        }

        .filter-toggle-btn {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-lg);
          background: none;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        
        .filter-toggle-btn:hover {
          background-color: var(--bg-primary);
          color: var(--text-primary);
        }

        .filter-toggle-btn.active {
          background-color: var(--accent-turquoise-light);
          color: var(--accent-teal);
        }

        .expanded-filters {
          display: none;
          flex-direction: column;
          gap: 12px;
          margin-top: 12px;
          padding: 16px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          animation: fadeIn 0.3s ease;
        }

        .expanded-filters.show {
          display: flex;
        }

        .filter-group-container {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .filter-group-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Curated Packages header */
        .packages-grid-section {
          margin-bottom: 50px;
        }

        .curated-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .journey-count {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          background-color: var(--bg-secondary);
          padding: 6px 12px;
          border-radius: 50px;
          border: 1px solid var(--border-color);
        }

        .packages-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .empty-packages-state {
          text-align: center;
          background-color: var(--bg-secondary);
          padding: 40px 20px;
          border-radius: var(--radius-xl);
          border: 1px dashed var(--border-color);
        }

        .empty-icon {
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .empty-packages-state h3 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .empty-packages-state p {
          color: var(--text-secondary);
          font-size: 14px;
          max-width: 320px;
          margin: 0 auto;
        }

        /* Features Section */
        .features-section {
          margin-bottom: 50px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .feature-card {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-lg);
          padding: 24px;
          border: 1px solid rgba(226, 236, 239, 0.6);
          box-shadow: var(--shadow-subtle);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .feature-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--accent-turquoise-light);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .feature-icon {
          color: var(--accent-teal);
        }

        .feature-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--text-primary);
        }

        .feature-text {
          font-size: 14px;
          color: var(--text-secondary);
        }

        /* About Section */
        .about-section {
          background-color: transparent;
          text-align: left;
          margin-bottom: 50px;
          padding-top: 10px;
        }

        .about-title {
          font-size: 28px;
          font-weight: 800;
          line-height: 1.2;
          color: var(--text-primary);
          margin-top: 8px;
          margin-bottom: 16px;
          max-width: 500px;
        }

        .about-text {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .meet-snowcat-link {
          font-size: 15px;
          font-weight: 700;
          color: var(--accent-teal);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .meet-snowcat-link:hover {
          color: var(--accent-teal-hover);
          gap: 10px;
        }

        /* CTA Section */
        .cta-section {
          margin-bottom: 30px;
        }

        .cta-card {
          background-color: var(--text-primary);
          color: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 40px 24px;
          text-align: center;
          box-shadow: var(--shadow-medium);
        }

        .cta-pre {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 12px;
          display: block;
        }

        .cta-title {
          color: #FFFFFF;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 12px;
          line-height: 1.25;
        }

        .cta-text {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 24px;
          max-width: 420px;
          margin-left: auto;
          margin-right: auto;
        }

        .btn-turquoise-cta {
          background-color: var(--accent-turquoise);
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-weight: 600;
          padding: 14px 28px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all var(--transition-fast);
          box-shadow: 0 4px 12px rgba(21, 151, 174, 0.2);
          margin-bottom: 32px;
        }
        .btn-turquoise-cta:hover {
          background-color: #107E92;
          transform: translateY(-1px);
        }

        .cta-footer-contacts {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 24px;
        }

        .dot-separator {
          display: inline;
        }

        /* Responsive Layouts */
        @media (min-width: 768px) {
          .mobile-only-header {
            display: none;
          }
          
          .hero-section {
            margin-top: 20px;
            margin-bottom: 40px;
          }

          .hero-card {
            aspect-ratio: 16 / 7;
            padding: 50px;
          }

          .hero-title {
            font-size: 52px;
            max-width: 600px;
            margin-bottom: 12px;
          }

          .hero-description {
            font-size: 18px;
            max-width: 480px;
            margin-bottom: 28px;
          }

          .stats-section {
            margin-bottom: 50px;
          }

          .stats-grid {
            padding: 32px 24px;
          }

          .stat-value {
            font-size: 42px;
          }

          .stat-label {
            font-size: 13px;
          }

          .filters-section {
            margin-bottom: 40px;
          }

          .filters-header {
            margin-bottom: 24px;
          }

          .section-title {
            font-size: 32px;
          }

          .search-bar-container {
            margin-bottom: 24px;
          }

          /* Force filters layout to be beautiful on desktop */
          .expanded-filters {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 24px;
            background: none;
            border: none;
            padding: 0;
          }

          .filter-group-container {
            flex: 1;
          }

          .filter-toggle-btn {
            display: none; /* Hide toggle on desktop, show filters side-by-side */
          }

          .packages-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }

          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .about-section {
            margin-bottom: 60px;
          }

          .about-title {
            font-size: 38px;
            max-width: 700px;
          }

          .about-text {
            font-size: 16px;
            max-width: 800px;
          }

          .cta-card {
            padding: 60px 40px;
          }

          .cta-title {
            font-size: 42px;
          }

          .cta-text {
            font-size: 16px;
          }
          
          .cta-footer-contacts {
            font-size: 13px;
            gap: 12px;
          }
        }

        @media (min-width: 1024px) {
          .packages-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .features-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Search & Trending Destinations Carousel CSS Styles */
        .trending-destinations-section {
          margin-top: -30px;
          margin-bottom: 50px;
          position: relative;
          z-index: 5;
        }

        .pill-search-container {
          position: relative;
          max-width: 600px;
          margin: -66px auto 40px auto;
          z-index: 10;
          display: flex;
          align-items: center;
          background: #FFFFFF;
          border-radius: 50px;
          padding: 6px 6px 6px 24px;
          box-shadow: 0 10px 30px rgba(11, 45, 72, 0.1);
        }

        .pill-search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 16px;
          color: var(--text-primary);
          background: transparent;
        }

        .pill-search-input::placeholder {
          color: var(--text-muted);
        }

        .pill-search-button {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--text-primary);
          color: #FFFFFF;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }

        .pill-search-button:hover {
          background-color: var(--accent-teal);
        }

        .trending-heading {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 24px;
          text-align: left;
          padding-left: 10px;
        }

        .segmented-switch-container {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .segmented-switch {
          display: flex;
          background-color: #F0F4F6;
          border-radius: 30px;
          padding: 4px;
          width: 100%;
          max-width: 480px;
        }

        .switch-tab {
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
          transition: all var(--transition-fast);
          text-align: center;
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
          background-color: var(--text-primary);
          border-radius: 26px;
          box-shadow: 0 4px 12px rgba(11, 45, 72, 0.15);
          z-index: 1;
        }

        .carousel-wrapper-trending {
          position: relative;
          width: 100%;
          margin-bottom: 30px;
          overflow: hidden;
        }

        .carousel-scroll-track-trending {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          padding: 10px 4px;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */
        }

        .carousel-scroll-track-trending::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }

        .carousel-card-trending {
          flex: 0 0 58%;
          scroll-snap-align: center;
          height: 290px;
          border-radius: 80px 80px 16px 16px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          box-shadow: var(--shadow-medium);
          border: 1px solid rgba(226, 236, 239, 0.4);
          transition: transform var(--transition-fast);
        }

        .carousel-card-trending:hover {
          transform: translateY(-4px);
        }

        .carousel-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .carousel-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%);
        }

        .carousel-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: left;
        }

        .carousel-card-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
          line-height: 1.25;
        }

        .carousel-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 4px;
        }

        .price-group-trending {
          display: flex;
          flex-direction: column;
          color: #FFFFFF;
        }

        .price-label-trending {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
          text-transform: lowercase;
        }

        .price-value-trending {
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 800;
        }

        .arrow-btn-trending {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: var(--accent-turquoise-light);
          color: var(--accent-teal);
          border: none;
          font-size: 12px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .arrow-btn-trending:hover {
          background-color: #FFFFFF;
          color: var(--accent-teal);
          transform: scale(1.05);
        }

        .trending-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          text-align: center;
          color: var(--text-secondary);
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px dashed var(--border-color);
          width: 100%;
        }

        .trending-empty-state .empty-icon {
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .explore-now-btn-container {
          display: flex;
          justify-content: center;
          margin-top: 10px;
          margin-bottom: 20px;
        }

        .trending-explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 700;
          padding: 14px 28px;
          border-radius: 30px;
          box-shadow: 0 4px 14px rgba(21, 151, 174, 0.2);
        }

        @media (min-width: 768px) {
          .carousel-card-trending {
            flex: 0 0 calc(33.333% - 11px);
            scroll-snap-align: start;
            height: 340px;
            border-radius: 100px 100px 20px 20px;
          }
          .carousel-card-content {
            padding: 20px;
          }
          .carousel-card-title {
            font-size: 17px;
          }
          .price-value-trending {
            font-size: 16px;
          }
          .arrow-btn-trending {
            width: 34px;
            height: 34px;
            font-size: 14px;
          }
        }

        @media (min-width: 1024px) {
          .carousel-card-trending {
            flex: 0 0 calc(20% - 13px);
            height: 360px;
            border-radius: 110px 110px 24px 24px;
          }
        }

        /* Testimonials Section Styles */
        .reviews-section {
          margin-bottom: 50px;
        }

        .mb-36 {
          margin-bottom: 36px;
        }

        .block {
          display: block;
        }

        .text-center {
          text-align: center;
        }

        .reviews-grid {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 12px 4px;
        }

        .reviews-grid::-webkit-scrollbar {
          display: none;
        }

        .review-card {
          flex: 0 0 82%;
          scroll-snap-align: start;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          padding: 24px;
          border: 1px solid rgba(226, 236, 239, 0.8);
          box-shadow: var(--shadow-subtle);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: left;
        }

        .review-card-header {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 14px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 14px;
        }

        .review-avatar-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .review-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--text-primary);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }

        .review-author-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .review-author-name {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .review-meta {
          font-size: 11px;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .review-rating-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .review-stars {
          color: #FFC107;
          font-size: 15px;
          letter-spacing: 1px;
        }

        .review-time {
          font-size: 11px;
          color: var(--text-muted);
        }

        .review-card-body {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .review-text {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .review-read-more-btn {
          align-self: flex-start;
          background: none;
          border: none;
          color: var(--accent-teal);
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          padding: 0;
          margin-top: 8px;
          transition: color var(--transition-fast);
        }

        .review-read-more-btn:hover {
          color: var(--accent-teal-hover);
        }

        @media (min-width: 768px) {
          .review-card {
            flex: 0 0 45%;
          }
        }

        @media (min-width: 1024px) {
          .reviews-section {
            max-width: 1180px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 20px;
            padding-right: 20px;
            margin-bottom: 80px;
          }

          .reviews-grid {
            gap: 24px;
            padding: 16px 0;
          }

          .review-card {
            flex: 0 0 35%;
          }
        /* Footer Styles */
        .footer-section {
          padding-top: 40px;
          padding-bottom: 40px;
          margin-top: 50px;
          border-top: 1px solid var(--border-color);
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 30px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-logo-img {
          height: 48px;
          width: auto;
          object-fit: contain;
        }

        .footer-tagline {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0;
          max-width: 340px;
        }

        .footer-links {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .footer-links a {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .footer-links a:hover {
          color: var(--accent-teal);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: var(--text-muted);
          border-top: 1px solid rgba(226, 236, 239, 0.6);
          padding-top: 20px;
        }
      `}</style>
    </div>
  );
}
