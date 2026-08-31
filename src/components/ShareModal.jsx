import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './animations/Toast';
import {
  X,
  Share2,
  Copy,
  Check,
  Mail,
  Send
} from 'lucide-react';

const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
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
    } catch {
      addToast('Failed to copy link', 'error');
    }
  };

  // WhatsApp Share URL
  const handleWhatsAppShare = () => {
    const message = `${shareText}\n\nExplore full itinerary details here:\n${currentUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
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
    const subject = `Check out this trip to ${pkgDest}: ${pkgName}`;
    const body = `Hello,\n\nI found this incredible trip with Snowcat Holidays:\n\n${pkgName}\nDuration: ${pkgDuration}\nDestination: ${pkgDest}\n\nView complete itinerary here:\n${currentUrl}\n\nAll prices are negotiable with Snowcat Holidays!`;
    const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  // Native Share
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: pkgName,
          text: shareText,
          url: currentUrl,
        });
      } catch {
        // Share cancelled or dismissed
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="share-modal-backdrop" onClick={onClose}>
        <motion.div
          className="share-modal-card shadow-realistic-lg"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="share-modal-header">
            <div className="share-header-left">
              <div className="share-icon-circle">
                <Share2 size={18} />
              </div>
              <div>
                <h3 className="share-modal-title">Share Itinerary</h3>
                <span className="share-modal-subtitle">{pkgName}</span>
              </div>
            </div>
            <button onClick={onClose} className="share-close-btn" aria-label="Close share modal">
              <X size={18} />
            </button>
          </div>

          {/* Social Channels List */}
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
                className="share-channel-btn native-share-btn shadow-interactive"
              >
                <div className="channel-icon-circle native-circle">
                  <Send size={18} />
                </div>
                <span className="channel-name">More Options</span>
              </button>
            )}
          </div>

          {/* Copy Link Row */}
          <div className="share-copy-section">
            <span className="copy-label">Or copy itinerary web link:</span>
            <div className="copy-input-group shadow-realistic-sm">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="copy-url-input"
              />
              <motion.button
                onClick={handleCopyLink}
                className={`btn-copy-action ${copied ? 'copied' : ''}`}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy Link</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Footer note */}
          <div className="share-modal-footer">
            <span>Prices are negotiable for all destinations with Snowcat Holidays</span>
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
          background-color: rgba(11, 45, 72, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }

        .share-modal-card {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          width: 100%;
          max-width: 480px;
          padding: 24px;
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .share-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .share-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .share-icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--accent-turquoise-light);
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
          display: block;
          max-width: 280px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .share-close-btn {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.2s ease;
        }
        .share-close-btn:hover {
          background: var(--accent-turquoise-light);
          color: var(--accent-teal);
        }

        /* Channels Grid */
        .share-channels-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .share-channel-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 14px 6px;
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .share-channel-btn:hover {
          transform: translateY(-3px);
          border-color: var(--accent-teal);
        }

        .channel-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          transition: transform 0.2s ease;
        }
        .share-channel-btn:hover .channel-icon-circle {
          transform: scale(1.08);
        }

        .whatsapp-circle { background-color: #25D366; }
        .telegram-circle { background-color: #0088CC; }
        .x-circle { background-color: #000000; }
        .email-circle { background-color: var(--accent-teal); }
        .native-circle { background-color: #6366F1; }

        .channel-name {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-primary);
        }

        /* Copy link section */
        .share-copy-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .copy-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .copy-input-group {
          display: flex;
          background: var(--bg-primary);
          border-radius: 50px;
          padding: 4px;
          border: 1px solid var(--border-color);
        }

        .copy-url-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 8px 14px;
          font-size: 13px;
          color: var(--text-secondary);
          outline: none;
          font-family: inherit;
        }

        .btn-copy-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--accent-teal);
          color: #FFFFFF;
          border: none;
          padding: 8px 18px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .btn-copy-action.copied {
          background: var(--accent-green);
        }
        .btn-copy-action:hover {
          background: var(--accent-teal-hover);
        }

        .share-modal-footer {
          text-align: center;
          font-size: 11px;
          color: var(--accent-teal);
          font-weight: 600;
          padding-top: 4px;
        }
      `}</style>
    </AnimatePresence>
  );
}
