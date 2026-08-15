import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePackages } from '../context/PackageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../components/animations/Toast';
import FadeIn from '../components/animations/FadeIn';
import Reveal from '../components/animations/Reveal';
import HoverCard from '../components/animations/HoverCard';
import MagneticButton from '../components/animations/MagneticButton';
import {
  Plus,
  Edit,
  Trash2,
  Power,
  PowerOff,
  LogOut,
  X,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Layers,
  ArrowLeft
} from 'lucide-react';

const PRESET_IMAGES = [
  { name: 'Mountain Peak', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' },
  { name: 'Forest Lake', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80' },
  { name: 'Tropical Beach', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Swiss Alps', url: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80' },
  { name: 'Desert Oasis', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80' }
];

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const {
    packages,
    addPackage,
    updatePackage,
    deletePackage,
    togglePackageActive
  } = usePackages();

  // Authentication check
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('snowcat_auth') === 'true';
    if (!isLoggedIn) {
      navigate('/owner');
    }
  }, [navigate]);

  // Form Editor Toggle State
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState(null); // Null for CREATE, String for EDIT

  // Form Fields State (matching screenshot inputs exactly)
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [daysNightsText, setDaysNightsText] = useState(''); // e.g. "6 Days / 5 Nights"
  const [category, setCategory] = useState('Leisure'); // Package Type
  const [price, setPrice] = useState('0');
  const [shortDescription, setShortDescription] = useState('');
  const [hotelDetails, setHotelDetails] = useState('');
  const [meals, setMeals] = useState('');
  const [transportation, setTransportation] = useState('');
  const [sightseeing, setSightseeing] = useState('');
  const [specialOffer, setSpecialOffer] = useState('');

  // Custom textarea inputs (parsed on submit)
  const [itineraryText, setItineraryText] = useState('Day 1 | ');
  const [inclusionsText, setInclusionsText] = useState('Accommodation');
  const [exclusionsText, setExclusionsText] = useState('Flights');

  // Images
  const [imageUrls, setImageUrls] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);

  // Statistics counters (matching Screenshot 3 counters card layout)
  const totalCount = packages.length;
  const activeCount = packages.filter(p => p.isActive).length;
  const featuredCount = packages.filter(p => p.isFeatured).length;

  const handleLogout = () => {
    sessionStorage.removeItem('snowcat_auth');
    navigate('/owner');
  };

  // Parse "Days / Nights" input string
  const parseDaysNights = (str) => {
    const daysMatch = str.match(/(\d+)\s*Day/i);
    const nightsMatch = str.match(/(\d+)\s*Night/i);
    return {
      days: daysMatch ? parseInt(daysMatch[1]) : 1,
      nights: nightsMatch ? parseInt(nightsMatch[1]) : 0
    };
  };

  // Reconstruct Day-wise Itinerary Array from Text Area
  const parseItineraryText = (text) => {
    return text.split('\n').filter(line => line.trim()).map((line, idx) => {
      const parts = line.split('|');
      if (parts.length >= 3) {
        // Format: Day 1 | Title | Details
        const dayLabel = parts[0].trim();
        const title = parts[1].trim();
        const details = parts.slice(2).join('|').trim();
        const dayNumMatch = dayLabel.match(/\d+/);
        const dayNum = dayNumMatch ? parseInt(dayNumMatch[0]) : idx + 1;
        return {
          day: dayNum,
          title: title || `Day ${dayNum}`,
          details: details
        };
      } else if (parts.length === 2) {
        // Format: Day 1 | Details (auto-extracting first sentence or using Day number as title)
        const dayLabel = parts[0].trim();
        const details = parts[1].trim();
        const dayNumMatch = dayLabel.match(/\d+/);
        const dayNum = dayNumMatch ? parseInt(dayNumMatch[0]) : idx + 1;

        let title = `Day ${dayNum}`;
        let detailText = details;
        const dotIndex = details.indexOf('.');
        if (dotIndex > 0 && dotIndex < 40) {
          title = details.substring(0, dotIndex).trim();
          detailText = details.substring(dotIndex + 1).trim();
        }
        return {
          day: dayNum,
          title: title,
          details: detailText || details
        };
      } else {
        // Raw text line fallback
        return {
          day: idx + 1,
          title: `Day ${idx + 1}`,
          details: line.trim()
        };
      }
    });
  };

  // Format Itinerary Array back to Text Area Format for Editing
  const getItineraryTextString = (itineraryArray) => {
    if (!itineraryArray || itineraryArray.length === 0) return 'Day 1 | ';
    return itineraryArray.map(item => {
      // Reconstruct as "Day X | Title | Details"
      return `${item.title.toLowerCase().startsWith('day') ? item.title : `Day ${item.day} - ${item.title}`} | ${item.details}`;
    }).join('\n');
  };

  // Open full-screen editor in CREATE mode
  const openCreateMode = () => {
    setEditingId(null);
    setName('');
    setDestination('');
    setDaysNightsText('');
    setCategory('Leisure');
    setPrice('0');
    setShortDescription('');
    setHotelDetails('');
    setMeals('');
    setTransportation('');
    setSightseeing('');
    setSpecialOffer('');
    setItineraryText('Day 1 | ');
    setInclusionsText('Accommodation');
    setExclusionsText('Flights');
    setImageUrls([]);
    setIsFeatured(false);
    setIsActive(true);
    setShowEditor(true);
  };

  // Open full-screen editor in EDIT mode
  const openEditMode = (pkg) => {
    setEditingId(pkg.id);
    setName(pkg.name);
    setDestination(pkg.destination);
    setDaysNightsText(`${pkg.days} Days / ${pkg.nights} Nights`);
    setCategory(pkg.category || 'Leisure');
    setPrice(pkg.price.toString());
    setShortDescription(pkg.shortDescription || '');
    setHotelDetails(pkg.hotelDetails || '');
    setMeals(pkg.meals || '');
    setTransportation(pkg.transportation || '');
    setSightseeing(pkg.sightseeing || '');
    setSpecialOffer(pkg.specialOffer || '');
    setItineraryText(getItineraryTextString(pkg.itinerary));
    setInclusionsText(pkg.inclusions ? pkg.inclusions.join('\n') : 'Accommodation');
    setExclusionsText(pkg.exclusions ? pkg.exclusions.join('\n') : 'Flights');
    setImageUrls(pkg.images || []);
    setIsFeatured(pkg.isFeatured || false);
    setIsActive(pkg.isActive !== false);
    setShowEditor(true);
  };

  // Choose file upload converting to base64
  const handleMultipleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrls(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeSelectedImage = (index) => {
    setImageUrls(imageUrls.filter((_, idx) => idx !== index));
  };

  const selectCuratedPreset = (url) => {
    setImageUrls(prev => [...prev, url]);
  };

  const handleSavePackageSubmit = (e) => {
    e.preventDefault();
    if (!name || !destination || !price || !daysNightsText) {
      addToast('Please fill in required fields: Name, Destination, Days/nights, and Price.', 'error');
      return;
    }

    // Parse Duration
    const { days, nights } = parseDaysNights(daysNightsText);

    // Parse Inclusions & Exclusions
    const inclusions = inclusionsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '');

    const exclusions = exclusionsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '');

    // Parse Itinerary Text
    const itinerary = parseItineraryText(itineraryText);

    // Final Images check
    let images = [...imageUrls];
    if (images.length === 0) {
      // Add default preset image
      images.push('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80');
    }

    const payload = {
      name,
      destination,
      category,
      price: Number(price) || 0,
      days,
      nights,
      shortDescription,
      hotelDetails,
      meals,
      transportation,
      sightseeing,
      specialOffer,
      inclusions,
      exclusions,
      images,
      itinerary,
      isFeatured,
      isActive
    };

    if (editingId) {
      updatePackage({ ...payload, id: editingId });
      addToast(`Updated package "${name}" successfully.`, 'success');
    } else {
      addPackage(payload);
      addToast(`Created package "${name}" successfully.`, 'success');
    }

    setShowEditor(false);
  };

  const handleCancelEditor = () => {
    setShowEditor(false);
  };

  const handleConfirmDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      deletePackage(id);
      addToast(`Deleted package "${title}".`, 'info');
    }
  };

  return (
    <div className="dashboard-container mobile-nav-padding fade-in">

      {/* Brand Top Header Bar */}
      <div className="dashboard-top-brand container">
        <div className="db-brand-left">
          <span className="curated-label">SNOWCAT HOLIDAYS</span>
          <h1 className="dashboard-title">Owner dashboard</h1>
        </div>
        <button onClick={handleLogout} className="dashboard-signout-btn" title="Sign out" aria-label="Sign out">
          <LogOut size={20} />
        </button>
      </div>

      {/* Statistics Cards Grid Card (Matching layout in screenshots) */}
      <div className="container mb-24">
        <div className="dashboard-stats-card-container">
          <div className="d-stat-column">
            <span className="d-stat-val">{totalCount}</span>
            <span className="d-stat-lbl">total journeys</span>
          </div>
          <div className="d-stat-divider"></div>
          <div className="d-stat-column">
            <span className="d-stat-val">{activeCount}</span>
            <span className="d-stat-lbl">active now</span>
          </div>
          <div className="d-stat-divider"></div>
          <div className="d-stat-column">
            <span className="d-stat-val">{featuredCount}</span>
            <span className="d-stat-lbl">featured</span>
          </div>
        </div>
      </div>

      {/* Editor Toggler Button Bar */}
      <div className="container mb-20">
        {showEditor ? (
          <button onClick={handleCancelEditor} className="btn-close-editor-custom">
            <X size={18} />
            <span>Close editor</span>
          </button>
        ) : (
          <div className="catalog-header-actions-row">
            <h2 className="catalog-heading">Trips Catalog</h2>
            <button onClick={openCreateMode} className="btn-primary add-pkg-btn">
              <Plus size={18} />
              <span>Add new package</span>
            </button>
          </div>
        )}
      </div>

      {/* Inline Content Toggle: Editor vs Table list */}
      <div className="container">
        <AnimatePresence mode="wait">
          {showEditor ? (
            /* FULL-SCREEN / FULL-WIDTH INLINE PACKAGE FORM */
            <motion.div
              key="editor"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="full-screen-editor-card"
            >
              <div className="editor-card-header">
                <h2 className="editor-card-title">{editingId ? 'Edit package' : 'New package'}</h2>
                <p className="editor-card-subtitle">
                  Packages are saved locally and appear on the website immediately.
                </p>
              </div>

              <form onSubmit={handleSavePackageSubmit} className="editor-inputs-form">
                {/* Form Input fields */}
                <div className="editor-form-group">
                  <label className="editor-label">Package name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kashmir in bloom"
                    className="editor-input-field"
                  />
                </div>

                <div className="editor-form-group">
                  <label className="editor-label">Destination</label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Kashmir"
                    className="editor-input-field"
                  />
                </div>

                <div className="editor-form-group">
                  <label className="editor-label">Days / nights</label>
                  <input
                    type="text"
                    required
                    value={daysNightsText}
                    onChange={(e) => setDaysNightsText(e.target.value)}
                    placeholder="e.g. 6 Days / 5 Nights"
                    className="editor-input-field"
                  />
                </div>

                <div className="editor-form-group">
                  <label className="editor-label">Package type</label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Leisure"
                    className="editor-input-field"
                  />
                </div>

                <div className="editor-form-group">
                  <label className="editor-label">Price per person</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                    className="editor-input-field"
                  />
                </div>

                <div className="editor-form-group">
                  <label className="editor-label">Short description</label>
                  <textarea
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="What makes this journey special?"
                    rows="3"
                    className="editor-textarea-field"
                  ></textarea>
                </div>

                <div className="editor-form-group">
                  <label className="editor-label">Hotel details</label>
                  <textarea
                    value={hotelDetails}
                    onChange={(e) => setHotelDetails(e.target.value)}
                    placeholder="Stay style and room details"
                    rows="3"
                    className="editor-textarea-field"
                  ></textarea>
                </div>

                <div className="editor-form-group">
                  <label className="editor-label">Meals</label>
                  <textarea
                    value={meals}
                    onChange={(e) => setMeals(e.target.value)}
                    placeholder="What's included?"
                    rows="3"
                    className="editor-textarea-field"
                  ></textarea>
                </div>

                <div className="editor-form-group">
                  <label className="editor-label">Transportation</label>
                  <textarea
                    value={transportation}
                    onChange={(e) => setTransportation(e.target.value)}
                    placeholder="Private cab / transfers"
                    rows="3"
                    className="editor-textarea-field"
                  ></textarea>
                </div>

                <div className="editor-form-group">
                  <label className="editor-label">Sightseeing</label>
                  <textarea
                    value={sightseeing}
                    onChange={(e) => setSightseeing(e.target.value)}
                    placeholder="Key highlights"
                    rows="3"
                    className="editor-textarea-field"
                  ></textarea>
                </div>

                <div className="editor-form-group">
                  <label className="editor-label">Special offer / discount text</label>
                  <input
                    type="text"
                    value={specialOffer}
                    onChange={(e) => setSpecialOffer(e.target.value)}
                    placeholder="e.g. Save 10% on early bird bookings"
                    className="editor-input-field"
                  />
                </div>

                {/* Textarea fields for Daywise Itinerary */}
                <div className="editor-form-group full-width-group">
                  <label className="editor-label">Day-by-Day Itinerary (one line per day)</label>
                  <p className="editor-hint">Format: <code>Day 1 | Arrival in Srinagar | Check-in at houseboat.</code></p>
                  <textarea
                    value={itineraryText}
                    onChange={(e) => setItineraryText(e.target.value)}
                    rows="6"
                    className="editor-textarea-field code-font"
                  ></textarea>
                </div>

                <div className="editor-form-group full-width-group">
                  <label className="editor-label">Inclusions (one item per line)</label>
                  <textarea
                    value={inclusionsText}
                    onChange={(e) => setInclusionsText(e.target.value)}
                    rows="4"
                    className="editor-textarea-field"
                  ></textarea>
                </div>

                <div className="editor-form-group full-width-group">
                  <label className="editor-label">Exclusions (one item per line)</label>
                  <textarea
                    value={exclusionsText}
                    onChange={(e) => setExclusionsText(e.target.value)}
                    rows="4"
                    className="editor-textarea-field"
                  ></textarea>
                </div>

                {/* Multiple Image Selector & Preset gallery */}
                <div className="editor-form-group full-width-group">
                  <label className="editor-label">Package Images</label>
                  <div className="image-uploader-wrapper">
                    <input
                      type="file"
                      id="img-upload-input"
                      multiple
                      accept="image/*"
                      onChange={handleMultipleImagesUpload}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="img-upload-input" className="img-upload-dropzone">
                      <ImageIcon size={24} />
                      <span>Upload photos from device</span>
                    </label>

                    <div className="preset-selector">
                      <span className="preset-label">Or choose preset photo:</span>
                      <div className="preset-chips-row">
                        {PRESET_IMAGES.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => selectCuratedPreset(preset.url)}
                            className="preset-chip-btn"
                          >
                            + {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {imageUrls.length > 0 && (
                      <div className="selected-thumbs-grid">
                        {imageUrls.map((url, idx) => (
                          <div key={idx} className="thumb-preview-box">
                            <img src={url} alt={`Preview ${idx + 1}`} />
                            <button
                              type="button"
                              onClick={() => removeSelectedImage(idx)}
                              className="remove-thumb-btn"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Toggles: Featured & Active */}
                <div className="editor-toggles-row full-width-group">
                  <label className="toggle-checkbox-label">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                    />
                    <span>Highlight as Featured Package</span>
                  </label>

                  <label className="toggle-checkbox-label">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                    />
                    <span>Package is Live (visible to public)</span>
                  </label>
                </div>

                {/* Editor Action Buttons */}
                <div className="editor-footer-actions full-width-group">
                  <button type="button" onClick={handleCancelEditor} className="btn-cancel-editor">
                    Cancel
                  </button>
                  <button type="submit" className="btn-save-package-editor">
                    Save package
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            /* TRIPS CATALOG TABLE LIST */
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="catalog-table-card"
            >
              {packages.length > 0 ? (
                <div className="table-responsive">
                  <table className="catalog-table">
                    <thead>
                      <tr>
                        <th>Trip</th>
                        <th>Destination</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {packages.map((pkg) => (
                          <motion.tr
                            key={pkg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <td>
                              <div className="table-package-cell">
                                <img
                                  src={pkg.images?.[0] || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=120&q=80'}
                                  alt={pkg.name}
                                  className="table-pkg-thumb"
                                />
                                <div>
                                  <div className="table-pkg-name">{pkg.name}</div>
                                  <span className="table-pkg-cat">{pkg.category}</span>
                                </div>
                              </div>
                            </td>
                            <td>{pkg.destination}</td>
                            <td>
                              <strong>₹{pkg.price.toLocaleString('en-IN')}</strong>
                            </td>
                            <td>{pkg.days}D / {pkg.nights}N</td>
                            <td>
                              <button
                                onClick={() => {
                                  togglePackageActive(pkg.id);
                                  addToast(`Status changed for ${pkg.name}`, 'info');
                                }}
                                className={`status-badge-btn ${pkg.isActive ? 'active' : 'inactive'}`}
                                title="Click to toggle status"
                              >
                                {pkg.isActive ? <Power size={12} /> : <PowerOff size={12} />}
                                <span>{pkg.isActive ? 'LIVE' : 'INACTIVE'}</span>
                              </button>
                            </td>
                            <td className="text-right">
                              <div className="actions-cell-flex">
                                <button
                                  onClick={() => openEditMode(pkg)}
                                  className="action-icon-btn edit-btn"
                                  title="Edit package"
                                  aria-label={`Edit ${pkg.name}`}
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => handleConfirmDelete(pkg.id, pkg.name)}
                                  className="action-icon-btn delete-btn"
                                  title="Delete package"
                                  aria-label={`Delete ${pkg.name}`}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-catalog text-center">
                  <Layers size={40} className="empty-icon" />
                  <p>Your package list is empty. Click "Add new package" above to create one.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        /* Top Brand Header styles */
        .dashboard-container {
          padding-top: 24px;
          padding-bottom: 40px;
          background-color: var(--bg-primary);
          min-height: 100vh;
        }

        .dashboard-top-brand {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 24px;
        }

        .db-brand-left {
          display: flex;
          flex-direction: column;
        }

        .dashboard-title {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          letter-spacing: -0.5px;
        }

        .dashboard-signout-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--accent-turquoise-light);
          color: var(--accent-teal);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .dashboard-signout-btn:hover {
          background-color: #D3EEF2;
          transform: translateY(-1px);
        }

        /* Stats Card (matches Screenshot 3 layout in dark navy blue) */
        .dashboard-stats-card-container {
          background-color: #0B2D48; /* Dark navy */
          border-radius: var(--radius-xl);
          padding: 24px 16px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          box-shadow: var(--shadow-medium);
        }

        .d-stat-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 30%;
          color: #FFFFFF;
        }

        .d-stat-val {
          font-family: var(--font-display);
          font-size: 34px;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1;
          margin-bottom: 4px;
        }

        .d-stat-lbl {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
          text-transform: lowercase;
        }

        .d-stat-divider {
          width: 1px;
          height: 44px;
          background-color: rgba(255, 255, 255, 0.15);
        }

        /* Add New Package Bar */
        .catalog-header-actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }

        .catalog-heading {
          font-size: 20px;
          font-weight: 800;
          margin: 0;
          color: var(--text-primary);
        }

        .add-pkg-btn {
          font-size: 14px;
          padding: 10px 20px;
        }

        /* ✕ Close Editor Custom Turquoise Button (Full Width) */
        .btn-close-editor-custom {
          background-color: #1597AE; /* Turquoise */
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 16px;
          padding: 14px;
          border-radius: 50px;
          border: none;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: background-color var(--transition-fast);
          box-shadow: 0 4px 12px rgba(21, 151, 174, 0.25);
          margin-top: 10px;
        }

        .btn-close-editor-custom:hover {
          background-color: #107E92;
        }

        /* Catalog list table card */
        .catalog-table-card {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-subtle);
          overflow: hidden;
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .catalog-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .catalog-table th, .catalog-table td {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-color);
          font-size: 14px;
        }

        .catalog-table th {
          background-color: var(--bg-primary);
          color: var(--text-secondary);
          font-weight: 700;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.5px;
        }

        .table-package-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .table-pkg-thumb {
          width: 50px;
          height: 38px;
          object-fit: cover;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
        }

        .table-pkg-name {
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .table-pkg-cat {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-teal);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-badge-btn {
          background: none;
          border: 1px solid var(--border-color);
          padding: 6px 12px;
          border-radius: 50px;
          font-size: 11px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .status-badge-btn.active {
          background-color: var(--accent-turquoise-light);
          border-color: var(--accent-teal);
          color: var(--accent-teal);
        }

        .status-badge-btn.inactive {
          background-color: var(--danger-bg);
          border-color: rgba(230, 57, 70, 0.2);
          color: var(--danger-color);
        }

        .actions-cell-flex {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        .action-icon-btn {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .action-icon-btn:hover {
          color: var(--text-primary);
          border-color: var(--text-muted);
        }

        .action-icon-btn.edit-btn:hover {
          background-color: var(--accent-turquoise-light);
          color: var(--accent-teal);
          border-color: var(--accent-teal);
        }

        .action-icon-btn.delete-btn:hover {
          background-color: var(--danger-bg);
          color: var(--danger-color);
          border-color: var(--danger-color);
        }

        .empty-catalog {
          padding: 40px 20px;
          color: var(--text-secondary);
        }

        /* 📋 FULL-SCREEN / FULL-WIDTH EDITOR CARD (Screenshot style) */
        .full-screen-editor-card {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          padding: 24px;
          box-shadow: var(--shadow-subtle);
          border: 1px solid var(--border-color);
          margin-bottom: 30px;
        }

        .editor-card-header {
          margin-bottom: 24px;
          text-align: left;
        }

        .editor-card-title {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 4px 0;
        }

        .editor-card-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.4;
        }

        .editor-inputs-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
        }

        .editor-form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .editor-label {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .editor-input-field {
          font-family: var(--font-sans);
          font-size: 15px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background-color: #FFFFFF;
          color: var(--text-primary);
          outline: none;
          transition: all var(--transition-fast);
        }

        .editor-input-field:focus {
          border-color: var(--accent-teal);
          box-shadow: 0 0 0 3px var(--accent-turquoise-light);
        }

        .editor-textarea-field {
          font-family: var(--font-sans);
          font-size: 15px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background-color: #FFFFFF;
          color: var(--text-primary);
          outline: none;
          resize: vertical;
          line-height: 1.5;
          transition: all var(--transition-fast);
        }

        .editor-textarea-field:focus {
          border-color: var(--accent-teal);
          box-shadow: 0 0 0 3px var(--accent-turquoise-light);
        }

        .code-text-font {
          font-family: var(--font-sans);
        }

        /* Multiple Images Upload button (Screenshot style) */
        .choose-images-btn-custom-styled {
          background-color: #E8F5F7; /* light turquoise */
          border: 1px dashed #1597AE; /* teal dashed */
          color: #087C8D;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px;
          border-radius: var(--radius-md);
          cursor: pointer;
          font-weight: 600;
          font-size: 15px;
          transition: all var(--transition-fast);
          user-select: none;
        }

        .choose-images-btn-custom-styled:hover {
          background-color: #D3EEF2;
        }

        .hidden-uploader-input {
          display: none;
        }

        /* Uploaded Image Thumbnails Row */
        .thumbnails-flex-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 12px;
        }

        .thumbnail-preview-wrapper {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-md);
          position: relative;
          border: 1px solid var(--border-color);
          overflow: hidden;
          box-shadow: var(--shadow-subtle);
        }

        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .btn-delete-thumb {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: rgba(230, 57, 70, 0.9);
          color: #FFFFFF;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }

        .btn-delete-thumb:hover {
          background-color: var(--danger-color);
        }

        /* Preset photos choices row */
        .preset-choices-container {
          margin-top: 16px;
          padding: 12px;
          background-color: var(--bg-primary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .presets-row-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .preset-chips-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .preset-pill-btn {
          background-color: #FFFFFF;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 50px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .preset-pill-btn:hover {
          border-color: var(--accent-teal);
          color: var(--accent-teal);
          background-color: var(--accent-turquoise-light);
        }

        /* Toggle switches rows (Matches Screenshot 1 & 3 toggle layouts) */
        .toggle-row-wrapper-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid var(--border-color);
        }

        .toggle-text-left-container {
          display: flex;
          flex-direction: column;
          text-align: left;
          gap: 2px;
        }

        .toggle-main-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .toggle-sub-desc {
          font-size: 12px;
          color: var(--text-secondary);
        }

        /* Custom styled iOS toggle switch */
        .custom-ios-switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 28px;
          flex-shrink: 0;
        }

        .custom-ios-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .custom-ios-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #E2ECEF;
          transition: .3s;
          border-radius: 34px;
        }

        .custom-ios-slider:before {
          position: absolute;
          content: "";
          height: 22px;
          width: 22px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .custom-ios-switch input:checked + .custom-ios-slider {
          background-color: var(--accent-teal);
        }

        .custom-ios-switch input:checked + .custom-ios-slider:before {
          transform: translateX(22px);
        }

        /* Form footer buttons cancel / save */
        .editor-form-actions-flex {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        .btn-cancel-editor {
          flex: 1;
          background-color: #FFFFFF;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 16px;
          padding: 14px;
          border-radius: 50px;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: center;
        }

        .btn-cancel-editor:hover {
          background-color: var(--bg-primary);
          color: var(--text-primary);
        }

        .btn-save-package-editor {
          flex: 1;
          background-color: var(--accent-teal);
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 16px;
          padding: 14px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: center;
          box-shadow: 0 4px 12px rgba(8, 124, 141, 0.2);
        }

        .btn-save-package-editor:hover {
          background-color: var(--accent-teal-hover);
        }

        .mb-24 { margin-bottom: 24px; }
        .mb-20 { margin-bottom: 20px; }
        .text-teal { color: var(--accent-teal); }
        
        /* Desktop multi-column grid adjustments */
        @media (min-width: 768px) {
          .dashboard-top-brand {
            margin-top: 20px;
          }

          .dashboard-stats-card-container {
            padding: 32px 24px;
          }

          .d-stat-val {
            font-size: 42px;
          }

          .d-stat-lbl {
            font-size: 13px;
          }

          .full-screen-editor-card {
            padding: 40px;
          }

          /* Two column layout for input grids */
          .editor-inputs-form {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .editor-form-group {
            grid-column: span 1;
          }

          /* Elements that should span full-width on desktop */
          .editor-form-group:nth-child(6), /* Short description */
          .editor-form-group:nth-child(7), /* Hotel details */
          .editor-form-group:nth-child(8), /* Meals */
          .editor-form-group:nth-child(9), /* Transportation */
          .editor-form-group:nth-child(10), /* Sightseeing */
          .editor-form-group:nth-child(11), /* Special offers */
          .editor-form-group:nth-child(12), /* Day-wise itinerary */
          .editor-form-group:nth-child(13), /* Inclusions */
          .editor-form-group:nth-child(14), /* Exclusions */
          .editor-form-group:nth-child(15), /* Package images */
          .toggle-row-wrapper-flex,          /* Toggles */
          .editor-form-actions-flex {       /* Actions */
            grid-column: span 2;
          }

          .editor-form-actions-flex {
            justify-content: flex-end;
            gap: 16px;
          }

          .btn-cancel-editor, .btn-save-package-editor {
            flex: 0 1 200px;
          }
        }
      `}</style>
    </div>
  );
}
