import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './animations/Toast';
import {
  X,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Mail,
  Send,
  ExternalLink
} from 'lucide-react';

const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const XIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const TelegramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.941z"/>
  </svg>
);

export default function ShareModal({ isOpen, onClose, packageData }) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !packageData) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const pkgName = packageData.name || 'Curated Tour Package';
  const pkgDest = packageData.destination || '';
  const pkgDuration = `${packageData.days} Days / ${packageData.nights} Nights`;
  const shareText = `Check out the "${pkgName}" (${pkgDuration}) with Snowcat Holidays! ${pkgDest}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = currentUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      addToast('Itinerary link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      addToast('Failed to copy link', 'error');
    }
  };

  // WhatsApp Share URL
  const handleWhatsAppShare = () => {
    const message = `${shareText}\n\nExplore full itinerary details here:\n${currentUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Facebook Share URL
  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  // Twitter / X Share URL
  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  // Telegram Share URL
  const handleTelegramShare = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  // Email Share URL
  const handleEmailShare = () => {
    const subject = `Check out this trip: ${pkgName}`;
    const body = `Hi,\n\nI found this incredible journey on Snowcat Holidays and thought of sharing it with you:\n\n${pkgName} (${pkgDuration})\nDestination: ${pkgDest}\n\nView complete day-by-day itinerary & details here:\n${currentUrl}\n\nWarm regards!`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  // Native Web Share API trigger
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Snowcat Holidays | ${pkgName}`,
          text: shareText,
          url: currentUrl
        });
      } catch (e) {
        if (e.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <AnimatePresence>
      <div className="share-modal-backdrop" onClick={onClose}>
        <motion.div
          className="share-modal-container shadow-realistic-lg"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Modal Header */}
          <div className="share-modal-header">
            <div className="share-modal-title-box">
              <div className="share-icon-wrapper">
                <Share2 size={18} />
              </div>
              <div>
                <h3 className="share-modal-title">Share this Itinerary</h3>
                <p className="share-modal-subtitle">{pkgName}</p>
              </div>
            </div>
            <button onClick={onClose} className="share-close-btn" aria-label="Close share modal">
              <X size={18} />
            </button>
          </div>

          {/* Social Share Channels Grid */}
          <div className="share-channels-grid">
            {/* WhatsApp Share Button */}
            <button
              onClick={handleWhatsAppShare}
              className="share-channel-btn whatsapp-btn shadow-interactive"
            >
              <div className="channel-icon-circle whatsapp-circle">
                <WhatsAppIcon size={20} />
              </div>
              <span className="channel-name">WhatsApp</span>
            </button>

            {/* Telegram Share Button */}
            <button
              onClick={handleTelegramShare}
              className="share-channel-btn telegram-btn shadow-interactive"
            >
              <div className="channel-icon-circle telegram-circle">
                <TelegramIcon size={20} />
              </div>
              <span className="channel-name">Telegram</span>
            </button>

            {/* Facebook Share Button */}
            <button
              onClick={handleFacebookShare}
              className="share-channel-btn facebook-btn shadow-interactive"
            >
              <div className="channel-icon-circle facebook-circle">
                <FacebookIcon size={20} />
              </div>
              <span className="channel-name">Facebook</span>
            </button>

            {/* X / Twitter Share Button */}
            <button
              onClick={handleTwitterShare}
              className="share-channel-btn x-btn shadow-interactive"
            >
              <div className="channel-icon-circle x-circle">
                <XIcon size={18} />
              </div>
              <span className="channel-name">X (Twitter)</span>
            </button>

            {/* Email Share Button */}
            <button
              onClick={handleEmailShare}
              className="share-channel-btn email-btn shadow-interactive"
            >
              <div className="channel-icon-circle email-circle">
                <Mail size={18} />
              </div>
              <span className="channel-name">Email</span>
            </button>

            {/* Native Mobile Share Button */}
            {typeof navigator !== 'undefined' && navigator.share && (
              <button
                onClick={handleNativeShare}
                className="share-channel-btn native-btn shadow-interactive"
              >
                <div className="channel-icon-circle native-circle">
                  <Send size={18} />
                </div>
                <span className="channel-name">More Options</span>
              </button>
            )}
          </div>

          {/* Copy Link Bar */}
          <div className="copy-link-section">
            <span className="copy-link-label">Or copy direct package link:</span>
            <div className="copy-link-box">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="copy-link-input"
              />
              <button
                onClick={handleCopyLink}
                className={`btn-copy-action ${copied ? 'copied' : ''}`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .share-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(11, 45, 72, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .share-modal-container {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          width: 100%;
          max-width: 480px;
          padding: 24px;
          border: 1px solid rgba(226, 236, 239, 0.9);
        }

        .share-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .share-modal-title-box {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .share-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--accent-turquoise-light);
          color: var(--accent-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .share-modal-title {
          font-size: 18px;
          font-weight: 800;
          margin: 0;
          color: var(--text-primary);
        }

        .share-modal-subtitle {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 2px 0 0 0;
          max-width: 280px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .share-close-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .share-close-btn:hover {
          background: var(--danger-bg);
          color: var(--danger-color);
        }

        /* Channels Grid */
        .share-channels-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .share-channel-btn {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 14px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .share-channel-btn:hover {
          background: #FFFFFF;
          transform: translateY(-3px);
        }

        .channel-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
        }

        .whatsapp-circle { background-color: #25D366; }
        .telegram-circle { background-color: #229ED9; }
        .facebook-circle { background-color: #1877F2; }
        .x-circle { background-color: #000000; }
        .email-circle { background-color: var(--accent-teal); }
        .native-circle { background-color: #6C5CE7; }

        .channel-name {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
        }

        /* Copy link section */
        .copy-link-section {
          background: var(--bg-primary);
          padding: 14px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
        }

        .copy-link-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
          margin-bottom: 8px;
          display: block;
        }

        .copy-link-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: 50px;
          padding: 4px 4px 4px 14px;
        }

        .copy-link-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 12px;
          color: var(--text-secondary);
          background: transparent;
          font-family: var(--font-sans);
        }

        .btn-copy-action {
          background: var(--accent-teal);
          color: #FFFFFF;
          border: none;
          font-size: 12px;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 50px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        .btn-copy-action:hover {
          background: var(--accent-teal-hover);
        }
        .btn-copy-action.copied {
          background: #25D366;
        }
      `}</style>
    </AnimatePresence>
  );
}
