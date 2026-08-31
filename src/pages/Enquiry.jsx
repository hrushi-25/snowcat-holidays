import { API_URL } from '../utils/api';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { usePackages } from '../context/PackageContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useToast } from '../components/animations/Toast';
import FadeIn from '../components/animations/FadeIn';
import MagneticButton from '../components/animations/MagneticButton';
import {
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
  Mail,
  Phone,
  ExternalLink,
  Share2,
  Plane,
  Train
} from 'lucide-react';

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Enquiry() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { packages } = usePackages();
  const { user } = useAuth();
  const { addToast } = useToast();

  // Form states
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    destination: '',
    travelDate: '',
    travelers: '2',
    budget: '₹50k–₹1L',
    modeOfTravel: '',
    message: ''
  });

  // Sync user info if user changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || ''
      }));
    }
  }, [user]);

  const [submitted, setSubmitted] = useState(false);

  // Check query parameters to pre-fill package information
  useEffect(() => {
    const packageParam = searchParams.get('package');
    if (packageParam) {
      const matchedPkg = packages.find(p => p.name === packageParam || p.id === packageParam);
      if (matchedPkg) {
        setFormData(prev => ({
          ...prev,
          destination: matchedPkg.destination,
          message: `Interested in booking the "${matchedPkg.name}" package.`
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          destination: packageParam
        }));
      }
    }
  }, [searchParams, packages]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Build inquiry template message
  const buildEnquiryMessage = () => {
    return `Hello Snowcat Holidays,

I would like to enquire about a journey. Here are my details:
• Name: ${formData.name}
• Phone: ${formData.phone}
• Email: ${formData.email}
• Destination: ${formData.destination}
• Travel Date: ${formData.travelDate}
• Number of Travelers: ${formData.travelers}
• Budget: ${formData.budget}
• Mode of Travel: ${formData.modeOfTravel}
• Custom Message: ${formData.message || 'No additional message.'}`;
  };

  // Sends the enquiry to the Django backend so it's saved permanently,
  // regardless of whether the visitor actually completes the WhatsApp/email handoff.
  const saveEnquiryToBackend = async () => {
    try {
      await fetch(`${API_URL}/api/enquiries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          destination: formData.destination,
          travel_date: formData.travelDate || null,
          travelers: formData.travelers,
          budget: formData.budget,
          mode_of_travel: formData.modeOfTravel,
          message: formData.message,
        }),
      });
    } catch (err) {
      console.error('Failed to save enquiry to backend', err);
      // Deliberately not blocking the WhatsApp/email handoff below if this fails.
    }
  };

  const handleWhatsAppSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.destination) {
      addToast('Please fill in your Name, Phone, and Destination.', 'error');
      return;
    }
    if (!formData.modeOfTravel) {
      addToast('Please select a mode of travel.', 'error');
      return;
    }

    await saveEnquiryToBackend();

    const messageText = buildEnquiryMessage();
    const url = `https://wa.me/917887778652?text=${encodeURIComponent(messageText)}`;
    addToast('Opening WhatsApp with your enquiry...', 'success');
    window.open(url, '_blank');
    setSubmitted(true);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.destination) {
      addToast('Please fill in your Name, Email, and Destination.', 'error');
      return;
    }
    if (!formData.modeOfTravel) {
      addToast('Please select a mode of travel.', 'error');
      return;
    }

    await saveEnquiryToBackend();

    const messageText = buildEnquiryMessage();
    const subject = `Enquiry: Custom Trip to ${formData.destination} - ${formData.name}`;
    const url = `mailto:snowcatholidays@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageText)}`;
    addToast('Opening Email application...', 'success');
    window.location.href = url;
    setSubmitted(true);
  };

  return (
    <div className="enquiry-page container mobile-nav-padding">
      <div className="form-card-container">

        {/* Back Button Link */}
        <motion.button
          onClick={() => navigate(-1)}
          className="back-btn-link"
          aria-label="Go back"
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </motion.button>

        {!submitted ? (
          <FadeIn direction="up" delay={0.05} className="form-wrapper">
            <div className="form-header">
              <span className="section-pre-title">LET'S MAKE A PLAN</span>
              <h2 className="form-title">Start your enquiry</h2>
              <p className="form-subtitle">
                Share details of your ideal holiday and our travel designers will tailor a curated journey around you.
              </p>
            </div>

            <form className="enquiry-form">
              {/* Form Grid */}
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder=""
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. name@example.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="destination">Where will you go? *</label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    required
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="e.g. Himachal Pradesh, Swiss Alps"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="travelDate">Approximate Travel Date</label>
                  <input
                    type="date"
                    id="travelDate"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="travelers">Number of Travelers</label>
                  <select
                    id="travelers"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    className="form-input select-input"
                  >
                    <option value="1">1 Traveler</option>
                    <option value="2">2 Travelers (Couple/Friends)</option>
                    <option value="3-5">3–5 (Small Family)</option>
                    <option value="6-10">6–10 (Group Escape)</option>
                    <option value="10+">10+ Travelers</option>
                  </select>
                </div>

                <div className="form-group duration-full-width">
                  <label className="form-label">Estimated Budget (per person)</label>
                  <div className="budget-radios">
                    {['Under ₹50k', '₹50k–₹1L', 'Above ₹1L'].map((opt) => (
                      <motion.label
                        key={opt}
                        className={`budget-radio-label ${formData.budget === opt ? 'checked' : ''}`}
                        whileTap={{ scale: 0.97 }}
                      >
                        <input
                          type="radio"
                          name="budget"
                          value={opt}
                          checked={formData.budget === opt}
                          onChange={handleChange}
                          className="budget-radio-input"
                        />
                        <span>{opt}</span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                <div className="form-group duration-full-width">
                  <label className="form-label">Mode of Travel *</label>
                  <div className="budget-radios">
                    {[
                      { value: 'Flight', label: 'Flight', icon: <Plane size={15} /> },
                      { value: 'Train', label: 'Train', icon: <Train size={15} /> }
                    ].map((opt) => (
                      <motion.label
                        key={opt.value}
                        className={`budget-radio-label ${formData.modeOfTravel === opt.value ? 'checked' : ''}`}
                        whileTap={{ scale: 0.97 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <input
                          type="radio"
                          name="modeOfTravel"
                          value={opt.value}
                          checked={formData.modeOfTravel === opt.value}
                          onChange={handleChange}
                          className="budget-radio-input"
                        />
                        {opt.icon}
                        <span>{opt.label}</span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                <div className="form-group duration-full-width">
                  <label className="form-label" htmlFor="message">Message / Special Requests</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about the kind of hotels you prefer, places you want to visit, or any special celebration."
                    className="form-input textarea-input"
                  ></textarea>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="form-actions">
                <motion.button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  className="btn-whatsapp-submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <MessageSquare size={18} />
                  <span>Enquire via WhatsApp</span>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleEmailSubmit}
                  className="btn-email-submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Mail size={18} />
                  <span>Enquire via Email</span>
                </motion.button>
              </div>
            </form>
          </FadeIn>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="success-wrapper text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 20 }}
              className="success-icon-container"
            >
              <CheckCircle2 size={48} className="success-icon" />
            </motion.div>
            <h2 className="form-title">Enquiry Sent!</h2>
            <p className="form-subtitle">
              Thank you for reaching out to Snowcat Holidays. We have initiated your enquiry request. Our travel designer will get in touch with you shortly.
            </p>
            <MagneticButton onClick={() => navigate('/')} className="btn-primary mt-20">
              Return to Website
            </MagneticButton>
          </motion.div>
        )}
      </div>

      {/* Social Media & Official Connect Handles Showcase Card */}
      <FadeIn direction="up" delay={0.15}>
        <div className="social-connect-card shadow-realistic-lg">
          <div className="social-card-header">
            <div className="social-title-badge shadow-realistic-sm">
              <Share2 size={14} className="social-badge-icon" />
              <span>OFFICIAL SOCIAL HANDLES</span>
            </div>
            <h3 className="social-card-heading">Connect With Snowcat Holidays</h3>
            <p className="social-card-desc">
              Follow our official channels for real-time travel stories, guest reviews, trip photos, and exclusive seasonal offers.
            </p>
          </div>

          <div className="social-handles-grid">
            {/* Instagram Primary Handle */}
            <a
              href="https://instagram.com/snowcat_holidays"
              target="_blank"
              rel="noopener noreferrer"
              className="social-tile instagram-tile shadow-interactive"
            >
              <div className="social-tile-icon-wrapper instagram-gradient">
                <InstagramIcon size={24} />
              </div>
              <div className="social-tile-info">
                <div className="social-platform">Instagram</div>
                <div className="social-handle-name">@snowcat_holidays</div>
                <span className="social-tagline">Photos & Reel Stories</span>
              </div>
              <ExternalLink size={16} className="tile-arrow" />
            </a>

            {/* WhatsApp Direct Line */}
            <a
              href="https://wa.me/917887778652"
              target="_blank"
              rel="noopener noreferrer"
              className="social-tile whatsapp-tile shadow-interactive"
            >
              <div className="social-tile-icon-wrapper whatsapp-bg">
                <MessageSquare size={24} />
              </div>
              <div className="social-tile-info">
                <div className="social-platform">WhatsApp Support</div>
                <div className="social-handle-name">+91 7887778652</div>
                <span className="social-tagline">Instant Chat & Quotes</span>
              </div>
              <ExternalLink size={16} className="tile-arrow" />
            </a>

            {/* Direct Phone Call */}
            <a
              href="tel:+917887778652"
              className="social-tile phone-tile shadow-interactive"
            >
              <div className="social-tile-icon-wrapper phone-bg">
                <Phone size={24} />
              </div>
              <div className="social-tile-info">
                <div className="social-platform">Call Support</div>
                <div className="social-handle-name">+91 78877 78652</div>
                <span className="social-tagline">Speak With Trip Expert</span>
              </div>
              <ExternalLink size={16} className="tile-arrow" />
            </a>

            {/* Email Support */}
            <a
              href="mailto:snowcatholidays@gmail.com"
              className="social-tile email-tile shadow-interactive"
            >
              <div className="social-tile-icon-wrapper email-bg">
                <Mail size={24} />
              </div>
              <div className="social-tile-info">
                <div className="social-platform">Email Us</div>
                <div className="social-handle-name">snowcatholidays@gmail.com</div>
                <span className="social-tagline">Custom Enquiries</span>
              </div>
              <ExternalLink size={16} className="tile-arrow" />
            </a>
          </div>
        </div>
      </FadeIn>

      <style>{`
        .enquiry-page {
          padding-top: 20px;
          padding-bottom: 40px;
          max-width: 840px;
        }

        .back-btn-link {
          background: none;
          border: none;
          color: var(--text-secondary);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 24px;
          padding: 0;
          transition: color var(--transition-fast);
        }
        .back-btn-link:hover {
          color: var(--text-primary);
        }

        .form-card-container {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          padding: 30px 20px;
          box-shadow: var(--shadow-medium);
          border: 1px solid rgba(226, 236, 239, 0.6);
        }

        .form-header {
          margin-bottom: 28px;
          text-align: left;
        }

        .form-title {
          font-size: 28px;
          font-weight: 800;
          margin-top: 4px;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .form-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        .enquiry-form {
          display: flex;
          flex-direction: column;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4px;
        }

        .select-input {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23587084' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 18px;
          padding-right: 48px;
        }

        .textarea-input {
          resize: vertical;
          line-height: 1.5;
        }

        /* Budget Custom Radio styling */
        .budget-radios {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 4px;
        }

        .budget-radio-label {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 10px 18px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
          user-select: none;
          flex-grow: 1;
        }

        .budget-radio-input {
          display: none;
        }

        .budget-radio-label:hover {
          border-color: var(--text-muted);
          color: var(--text-primary);
        }

        .budget-radio-label.checked {
          background-color: var(--accent-turquoise-light);
          border-color: var(--accent-teal);
          color: var(--accent-teal);
        }

        /* Submit Buttons */
        .form-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 32px;
          border-top: 1px solid var(--border-color);
          padding-top: 24px;
        }

        .btn-whatsapp-submit {
          background-color: var(--accent-green);
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-weight: 700;
          padding: 14px 28px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 15px;
          transition: all var(--transition-fast);
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.15);
        }
        
        .btn-whatsapp-submit:hover {
          background-color: var(--accent-green-hover);
        }

        .btn-email-submit {
          background-color: var(--accent-teal);
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-weight: 700;
          padding: 14px 28px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 15px;
          transition: all var(--transition-fast);
          box-shadow: 0 4px 12px rgba(8, 124, 141, 0.15);
        }

        .btn-email-submit:hover {
          background-color: var(--accent-teal-hover);
        }

        /* Success screen styling */
        .success-wrapper {
          padding: 40px 10px;
        }

        .success-icon-container {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: var(--accent-turquoise-light);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .success-icon {
          color: var(--accent-teal);
        }

        .mt-20 { margin-top: 20px; }
        .text-center { text-align: center; }

        @media (min-width: 768px) {
          .form-card-container {
            padding: 40px;
          }

          .form-title {
            font-size: 32px;
          }

          .form-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .duration-full-width {
            grid-column: span 2;
          }

          .budget-radio-label {
            flex-grow: 0;
            width: auto;
          }

          .form-actions {
            flex-direction: row;
            justify-content: center;
          }
        }

        /* Social Handles Connect Card */
        .social-connect-card {
          margin-top: 32px;
          background: var(--bg-secondary);
          border-radius: var(--radius-xl);
          padding: 30px 24px;
          border: 1px solid rgba(226, 236, 239, 0.9);
        }
        @media (min-width: 768px) {
          .social-connect-card {
            padding: 36px 40px;
          }
        }

        .social-card-header {
          margin-bottom: 24px;
        }

        .social-title-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--accent-turquoise-light);
          color: var(--accent-teal);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 6px 14px;
          border-radius: 50px;
          margin-bottom: 10px;
        }

        .social-card-heading {
          font-size: 24px;
          font-weight: 800;
          margin: 0 0 6px 0;
          color: var(--text-primary);
        }

        .social-card-desc {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.5;
        }

        .social-handles-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .social-handles-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .social-tile {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: var(--bg-primary);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          text-decoration: none;
          color: var(--text-primary);
          position: relative;
        }

        .social-tile-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          flex-shrink: 0;
        }

        .instagram-gradient {
          background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);
        }
        .whatsapp-bg {
          background-color: var(--accent-green);
        }
        .phone-bg {
          background-color: #0284C7;
        }
        .email-bg {
          background-color: var(--accent-teal);
        }

        .social-tile-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .social-platform {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .social-handle-name {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .social-tagline {
          font-size: 11px;
          color: var(--text-secondary);
        }

        .tile-arrow {
          color: var(--text-muted);
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .social-tile:hover .tile-arrow {
          color: var(--accent-teal);
          transform: translate(2px, -2px);
        }
      `}</style>
    </div>
  );
}