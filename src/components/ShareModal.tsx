import React, { useState } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  // Since it runs on localhost:5173, let's use the actual window URL,
  // but if it's on localhost, we can also give them a beautiful preview of a production domain!
  const actualUrl = window.location.href;
  const displayUrl = actualUrl.includes('localhost') ? 'https://www.careergazers.com' : actualUrl;
  const shareText = "Find your dream college and shape your career path with Career Gazers! Check out exams, cutoff predictors, and the Common Application Form:";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(displayUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = displayUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator.share !== 'undefined') {
      try {
        await navigator.share({
          title: 'Career Gazers - Premium Admissions Portal',
          text: shareText,
          url: displayUrl,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  // Social share intents
  const socialShares = [
    {
      name: 'WhatsApp',
      color: '#25D366',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.9 9.9 0 00-6.98-2.879c-5.443 0-9.866 4.372-9.87 9.802 0 1.714.457 3.39 1.32 4.892l-.994 3.63 3.72-.94zm11.517-5.695c-.32-.16-1.89-.932-2.181-1.038-.29-.106-.503-.16-.713.16-.21.32-.814.16-.997.32-.181.16-.363.181-.683.02-.32-.16-1.352-.498-2.577-1.59-.953-.85-1.597-1.9-1.784-2.22-.181-.32-.02-.492.14-.652.144-.144.32-.372.48-.559.162-.188.217-.32.324-.533.106-.21.053-.399-.026-.56-.079-.16-.713-1.717-.978-2.356-.258-.622-.52-.538-.713-.538-.184-.002-.396-.002-.609-.002s-.56.079-.853.399c-.294.32-1.12 1.092-1.12 2.663 0 1.57 1.146 3.09 1.306 3.303.16.213 2.256 3.444 5.466 4.828.763.329 1.358.525 1.821.672.767.244 1.465.21 2.017.128.614-.092 1.89-.773 2.157-1.48.267-.706.267-1.312.188-1.439-.079-.128-.291-.21-.611-.37z"/>
        </svg>
      ),
      link: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + displayUrl)}`
    },
    {
      name: 'Twitter',
      color: '#1DA1F2',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(displayUrl)}&text=${encodeURIComponent(shareText)}`
    },
    {
      name: 'LinkedIn',
      color: '#0077B5',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(displayUrl)}`
    },
    {
      name: 'Facebook',
      color: '#1877F2',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
        </svg>
      ),
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(displayUrl)}`
    }
  ];

  return (
    <div className="compare-modal-backdrop animate-fadeIn" style={{ zIndex: 1100 }}>
      <div className="share-modal-card animate-scaleUp">
        
        {/* Header */}
        <div className="share-modal-header">
          <h3>Share Career Gazers</h3>
          <button className="close-share-btn" onClick={onClose}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="share-modal-body">
          <p className="share-intro-text">Spread the word! Share this premium college portal with fellow students, parents, or friends looking for counseling guidelines.</p>

          {/* Copier link box */}
          <div className={`share-link-copier-box ${copied ? 'copied-active' : ''}`}>
            <input 
              type="text" 
              readOnly 
              value={displayUrl} 
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button 
              type="button" 
              className={`copy-action-btn ${copied ? 'success' : ''}`}
              onClick={handleCopyLink}
            >
              {copied ? '✓ Copied!' : 'Copy Link'}
            </button>
          </div>

          {/* Social icons list */}
          <div className="social-sharing-divider">
            <span>Or Share Via</span>
          </div>

          <div className="social-share-buttons-grid">
            {socialShares.map((soc) => (
              <a 
                key={soc.name}
                href={soc.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-share-pill-btn animate-hover"
                style={{ '--brand-color': soc.color } as React.CSSProperties}
              >
                <span className="social-pill-icon">{soc.icon}</span>
                <span className="social-pill-name">{soc.name}</span>
              </a>
            ))}
          </div>

          {/* Web Share API option (mobile native) */}
          {typeof navigator.share !== 'undefined' && (
            <button 
              type="button" 
              className="native-share-action-btn animate-slideUp"
              onClick={handleNativeShare}
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l4.828-2.414m0 0a3 3 0 10-3.62-4.3l-4.828 2.414m6.242 4.3a3 3 0 11-6.242 0 3 3 0 016.242 0zm-6.242 1.436l4.828 2.414a3 3 0 103.62-4.3l-4.828-2.414z" />
              </svg>
              Share via Device Options
            </button>
          )}

        </div>

        {/* Footer */}
        <div className="share-modal-footer">
          <p>Tapping any social link opens the messaging portal in a new tab. Anyone with the copied link can access Career Gazers directly.</p>
        </div>

      </div>
    </div>
  );
};
