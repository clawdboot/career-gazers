import React, { useState } from 'react';
import { LogoImage } from './ImagePlaceholder';

interface FooterProps {
  setView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setView }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="global-footer">
      <div className="footer-top">
        <div className="footer-brand-section">
          <LogoImage className="h-10 w-auto mb-4" />
          <p className="footer-brand-desc">
            Career Grazers is India's leading digital higher education counselor. We assist students in finding the right colleges, courses, and preparatory entrance exams through state-of-the-art interactive engines and artificial intelligence.
          </p>
          <div className="footer-social-links">
            <a href="#social" className="social-icon" aria-label="Facebook">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
            </a>
            <a href="#social" className="social-icon" aria-label="Twitter">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#social" className="social-icon" aria-label="LinkedIn">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-column">
            <h4>Explore Streams</h4>
            <ul>
              <li><button onClick={() => setView('directory')}>Engineering Colleges</button></li>
              <li><button onClick={() => setView('directory')}>Management B-Schools</button></li>
              <li><button onClick={() => setView('directory')}>Medical Academies</button></li>
              <li><button onClick={() => setView('directory')}>Law Universities</button></li>
              <li><button onClick={() => setView('directory')}>Science & Arts Colleges</button></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Admissions & Tools</h4>
            <ul>
              <li><button onClick={() => setView('predictor')}>College Admission Predictor</button></li>
              <li><button onClick={() => setView('caf')}>Common Application Form (CAF)</button></li>
              <li><button onClick={() => setView('compass')}>Career Compass Quiz</button></li>
              <li><button onClick={() => setView('dashboard')}>Student Application Dashboard</button></li>
              <li><button onClick={() => setView('home')}>Entrance Exams Directory</button></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Stay Connected</h4>
            <p className="newsletter-subtitle">Subscribe for real-time exam notifications & placement updates.</p>
            <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email ID"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">
                {subscribed ? 'Subscribed!' : 'Join'}
              </button>
            </form>
            {subscribed && <span className="newsletter-success animate-slideUp">✓ You have successfully subscribed to alerts.</span>}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Career Grazers. All Rights Reserved. Premium Admissions & Counseling Portal.</p>
        <div className="footer-bottom-links">
          <a href="#privacy">Privacy Policy</a>
          <span>•</span>
          <a href="#terms">Terms & Conditions</a>
          <span>•</span>
          <a href="#sitemap">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};
