import React, { useState } from 'react';
import { College } from '../data/colleges';
import { examsData, examNotifications } from '../data/exams';
import { newsArticles } from '../data/mockData';
import { CollegeImage, CategoryIllustration } from '../components/ImagePlaceholder';

interface HomeProps {
  setView: (view: string) => void;
  setStreamFilter: (stream: string) => void;
  colleges: College[];
  onSelectCollege: (collegeId: string) => void;
  openChat: () => void;
}

export const Home: React.FC<HomeProps> = ({ setView, setStreamFilter, colleges, onSelectCollege, openChat }) => {
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadStream, setLeadStream] = useState('Engineering');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadName.trim() && leadPhone.trim()) {
      setLeadSubmitted(true);
      setLeadName('');
      setLeadPhone('');
      setTimeout(() => setLeadSubmitted(false), 6000);
    }
  };

  const handleStreamClick = (streamName: string) => {
    setStreamFilter(streamName);
    setView('directory');
  };

  const stats = [
    { value: '35,000+', label: 'Partner Colleges' },
    { value: '2,00,000+', label: 'Detailed Courses' },
    { value: '350+', label: 'Entrance Exams' },
    { value: '2.5 Million', label: 'Counselings Done' }
  ];

  const categories = [
    { name: 'Engineering', count: '14,200+ Colleges', bg: 'var(--card-overlay)' },
    { name: 'Management', count: '9,800+ Colleges', bg: 'var(--card-overlay)' },
    { name: 'Medical', count: '3,400+ Colleges', bg: 'var(--card-overlay)' },
    { name: 'Law', count: '1,200+ Colleges', bg: 'var(--card-overlay)' },
    { name: 'Science', count: '4,500+ Colleges', bg: 'var(--card-overlay)' },
    { name: 'Arts', count: '6,200+ Colleges', bg: 'var(--card-overlay)' }
  ];

  // Get some high-rating featured colleges
  const featuredColleges = colleges.filter(c => c.rating >= 4.8).slice(0, 4);

  return (
    <div className="home-view-container">
      {/* Hero Banner Section */}
      <section className="hero-section">
        <div className="hero-content animate-fadeIn">
          <span className="hero-badge-live">⚡ Admission Portal 2026 Live</span>
          <h1>Find Your Dream College. <br />Shape Your <span className="gradient-text">Infinite Career</span>.</h1>
          <p className="hero-tagline">
            Explore fees, cutoffs, placements, and eligibility. Secure admission in India's leading institutions using our Common Application Form (CAF) system.
          </p>

          {/* Core Tools Quick Buttons */}
          <div className="hero-cta-group">
            <button className="primary-cta-btn" onClick={() => setView('caf')}>
              Apply via Common App (CAF)
              <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button className="secondary-cta-btn" onClick={() => setView('predictor')}>
              Predict My College
            </button>
          </div>

          {/* Stats Bar */}
          <div className="hero-stats-row">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore By Study Streams */}
      <section className="home-section-wrapper">
        <div className="section-header">
          <h2>Explore Colleges by Stream</h2>
          <p>Find the best colleges offering top-tier training in your specific field of study.</p>
        </div>
        <div className="streams-grid">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="stream-card animate-hover"
              onClick={() => handleStreamClick(cat.name)}
            >
              <div className="stream-icon-holder">
                <CategoryIllustration type={cat.name} className="h-10 w-10" />
              </div>
              <h3>{cat.name}</h3>
              <p>{cat.count}</p>
              <span className="explore-link">Explore Now →</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured/Recommended Colleges Slider */}
      <section className="home-section-wrapper colleges-showcase-section">
        <div className="section-header">
          <h2>Premium Featured Colleges</h2>
          <p>Top-rated and highly affiliated universities recommended by Career Grazers counselors.</p>
        </div>
        <div className="colleges-grid-scroll">
          {featuredColleges.map((college) => (
            <div key={college.id} className="featured-college-card animate-hover" onClick={() => onSelectCollege(college.id)}>
              <CollegeImage name={college.name} color={college.logoColor} stream={college.stream} />
              <div className="featured-card-body">
                <h3>{college.name.split(',')[0]}</h3>
                <div className="rating-pill">★ {college.rating} ({college.reviewsCount} reviews)</div>
                <p className="college-card-short-desc">{college.shortDesc}</p>
                <div className="featured-card-metrics">
                  <div>
                    <span>Avg Fees</span>
                    <strong>₹ {college.avgFees.toLocaleString('en-IN')} / yr</strong>
                  </div>
                  <div>
                    <span>Avg Package</span>
                    <strong>{college.avgPlacement} LPA</strong>
                  </div>
                </div>
                <div className="featured-card-footer">
                  <span className="footer-accepted-exams">Exams: {college.examsAccepted.slice(0, 2).join(', ')}</span>
                  <button className="view-detail-btn">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Triple Widget (Predictor, CAF, Compass) Promo Area */}
      <section className="home-section-wrapper tools-promo-section">
        <div className="tools-promo-container">
          <div className="tool-promo-box c-predictor" onClick={() => setView('predictor')}>
            <span className="promo-badge">Cutoff Tool</span>
            <h3>College Admission Predictor</h3>
            <p>Input your entrance exam rank (JEE, NEET, CAT, CLAT) to instantly estimate matching public & private universities.</p>
            <span className="promo-action">Calculate Probability →</span>
          </div>

          <div className="tool-promo-box c-quiz" onClick={() => setView('compass')}>
            <span className="promo-badge">Personality</span>
            <h3>Career Compass Test</h3>
            <p>Unsure which course to pick? Take our 10-minute psychometric test to analyze your strengths and match corresponding careers.</p>
            <span className="promo-action">Start Free Test →</span>
          </div>

          <div className="tool-promo-box c-chat" onClick={openChat}>
            <span className="promo-badge">Counselor AI</span>
            <h3>SaarthiGPT Companion</h3>
            <p>Got custom questions about admissions, fees, or exam syllabus? Talk to our online counselor robot for immediate insights.</p>
            <span className="promo-action">Chat Live Now →</span>
          </div>
        </div>
      </section>

      {/* Notifications & Entrance Exam Calendars */}
      <section className="home-section-wrapper split-grid-section">
        <div className="news-and-updates">
          <h2>Latest Educational News</h2>
          <div className="news-feed-list">
            {newsArticles.map((art) => (
              <div key={art.id} className="news-feed-item">
                <span className="news-tag" style={{
                  backgroundColor: art.imageUrl === 'engineering' ? '#00b4d822' : art.imageUrl === 'management' ? '#ff451d22' : '#7a00ff22',
                  color: art.imageUrl === 'engineering' ? '#0077b6' : art.imageUrl === 'management' ? '#ff451d' : '#7a00ff'
                }}>{art.imageUrl.toUpperCase()}</span>
                <h4>{art.title}</h4>
                <p className="news-summary">{art.summary}</p>
                <div className="news-meta-row">
                  <span>{art.source} • {art.date}</span>
                  <span className="read-time">{art.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="exam-deadlines-panel">
          <h2>Important Entrance Exams</h2>
          <p className="exams-panel-subtitle">Stay tracked on registrations and exam schedules.</p>
          <div className="exam-dates-list">
            {examsData.slice(0, 5).map((exam) => (
              <div key={exam.id} className="exam-date-card">
                <div className="exam-name-block">
                  <h4>{exam.name}</h4>
                  <p>{exam.stream}</p>
                </div>
                <div className="exam-status-block">
                  <span className={`exam-status-tag ${exam.applicationStatus.toLowerCase()}`}>
                    {exam.applicationStatus}
                  </span>
                  <span className="exam-calendar-date">Exam: {new Date(exam.examDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Banner / Counseling CTA */}
      <section className="lead-capture-banner">
        <div className="lead-banner-inner">
          <div className="lead-left">
            <h2>Need Personalized College Guidance?</h2>
            <p>Enter your details and our expert academic advisors will call you back within 24 hours for a 1-on-1 counseling session, absolutely free.</p>
            <div className="lead-benefits">
              <span>✓ Free Expert Advice</span>
              <span>✓ Direct Admission Guidelines</span>
              <span>✓ Fee Waivers Assistance</span>
            </div>
          </div>
          <div className="lead-right">
            {leadSubmitted ? (
              <div className="lead-success-card animate-scaleUp">
                <div className="success-icon">✓</div>
                <h3>Request Registered Successfully!</h3>
                <p>An expert advisor has been assigned to you. We will call you on the registered mobile number shortly.</p>
              </div>
            ) : (
              <form className="lead-form-box" onSubmit={handleLeadSubmit}>
                <h3>Request Free Counseling</h3>
                <div className="form-group-lead">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                  />
                </div>
                <div className="form-group-lead">
                  <input
                    type="tel"
                    placeholder="10-Digit Mobile Number"
                    required
                    pattern="[0-9]{10}"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                  />
                </div>
                <div className="form-group-lead">
                  <select
                    value={leadStream}
                    onChange={(e) => setLeadStream(e.target.value)}
                  >
                    <option value="Engineering">Engineering (B.Tech)</option>
                    <option value="Management">Management (MBA/BBA)</option>
                    <option value="Medical">Medical (MBBS)</option>
                    <option value="Law">Law (LL.B.)</option>
                    <option value="Science">Sciences & Humanities</option>
                  </select>
                </div>
                <button type="submit" className="submit-lead-btn">Connect with Advisors</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
