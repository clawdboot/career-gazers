import React, { useState, useEffect, useRef } from 'react';
import { LogoImage } from './ImagePlaceholder';
import { College } from '../data/colleges';

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  colleges: College[];
  onSelectCollege: (collegeId: string) => void;
  openChat: () => void;
  onShareOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView, colleges, onSelectCollege, openChat, onShareOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<College[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = colleges.filter(college =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.stream.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, colleges]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (collegeId: string) => {
    onSelectCollege(collegeId);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'directory', label: 'Colleges' },
    { id: 'predictor', label: 'Predictor' },
    { id: 'compass', label: 'Career Quiz' },
    { id: 'caf', label: 'Apply Now (CAF)' },
    { id: 'dashboard', label: 'Dashboard' }
  ];

  return (
    <header className={`global-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand Logo */}
        <div className="header-logo" onClick={() => setView('home')}>
          <LogoImage className="h-10 w-auto" />
        </div>

        {/* Global Live Search Bar */}
        <div className="header-search-container" ref={searchRef}>
          <div className="search-input-wrapper">
            <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search colleges, exams, streams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions-dropdown">
              {suggestions.map((college) => (
                <div
                  key={college.id}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(college.id)}
                >
                  <div className="suggestion-logo" style={{ backgroundColor: college.logoColor }}>
                    {college.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="suggestion-text">
                    <span className="suggestion-name">{college.name}</span>
                    <span className="suggestion-meta">{college.stream} • {college.location}, {college.state}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showSuggestions && suggestions.length === 0 && (
            <div className="search-suggestions-dropdown empty-suggestions">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link-btn ${currentView === item.id ? 'active' : ''} ${item.id === 'caf' ? 'caf-glow-btn' : ''}`}
              onClick={() => {
                setView(item.id);
                setMobileMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Utility / Right Section */}
        <div className="header-utilities">
          <button className="utility-btn share-trigger-btn" onClick={onShareOpen} title="Share Website Link">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l4.828-2.414m0 0a3 3 0 10-3.62-4.3l-4.828 2.414m6.242 4.3a3 3 0 11-6.242 0 3 3 0 016.242 0zm-6.242 1.436l4.828 2.414a3 3 0 103.62-4.3l-4.828-2.414z" />
            </svg>
            <span className="share-btn-label">Share</span>
          </button>

          <button className="utility-btn saarthi-trigger-btn" onClick={openChat} title="Chat with SaarthiGPT">
            <span className="live-indicator"></span>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="saarthi-btn-label">SaarthiGPT</span>
          </button>
          
          <button className="utility-btn notification-btn">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="badge">3</span>
          </button>

          {/* Hamburger Menu Icon (Mobile) */}
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay animate-fadeIn">
          <nav className="mobile-nav-menu">
            <div className="mobile-search-wrapper">
              <input
                type="text"
                placeholder="Search colleges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-nav-link ${currentView === item.id ? 'active' : ''}`}
                onClick={() => {
                  setView(item.id);
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
            <button className="mobile-saarthi-btn" onClick={() => { openChat(); setMobileMenuOpen(false); }}>
              Talk to SaarthiGPT
            </button>
            <button className="mobile-saarthi-btn" onClick={() => { onShareOpen(); setMobileMenuOpen(false); }} style={{ marginTop: '8px', background: 'linear-gradient(135deg, var(--accent-coral), var(--accent-purple))' }}>
              Share Website Link
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
