import React, { useState, useEffect } from 'react';
import { College, CourseInfo } from '../data/colleges';
import { CollegeImage } from '../components/ImagePlaceholder';

interface DirectoryProps {
  colleges: College[];
  setView: (view: string) => void;
  streamFilter: string;
  setStreamFilter: (stream: string) => void;
  selectedCompare: College[];
  onToggleCompare: (college: College) => void;
  onApplyCollegeDirect: (collegeName: string) => void;
  activeSelectedCollegeId: string | null;
  setActiveSelectedCollegeId: (id: string | null) => void;
}

export const Directory: React.FC<DirectoryProps> = ({
  colleges,
  setView,
  streamFilter,
  setStreamFilter,
  selectedCompare,
  onToggleCompare,
  onApplyCollegeDirect,
  activeSelectedCollegeId,
  setActiveSelectedCollegeId
}) => {
  // Filters State
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [feeRange, setFeeRange] = useState<string>('all');
  const [minPlacement, setMinPlacement] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>('default');
  const [searchWord, setSearchWord] = useState<string>('');
  
  // Details Modal State
  const [detailModalCollege, setDetailModalCollege] = useState<College | null>(null);
  const [modalTab, setModalTab] = useState<'overview' | 'courses' | 'placements' | 'facilities'>('overview');

  // Trigger modal when an external request selects a college (like Header search or Home click)
  useEffect(() => {
    if (activeSelectedCollegeId) {
      const col = colleges.find(c => c.id === activeSelectedCollegeId);
      if (col) {
        setDetailModalCollege(col);
        setModalTab('overview');
      }
    }
  }, [activeSelectedCollegeId, colleges]);

  const handleCloseDetailModal = () => {
    setDetailModalCollege(null);
    setActiveSelectedCollegeId(null);
  };

  // State / Category Data lists
  const states = Array.from(new Set(colleges.map(c => c.state)));
  const types = ['Public', 'Private'];

  const toggleStateFilter = (state: string) => {
    setSelectedStates(prev =>
      prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]
    );
  };

  const toggleTypeFilter = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleClearFilters = () => {
    setStreamFilter('All');
    setSelectedStates([]);
    setSelectedTypes([]);
    setFeeRange('all');
    setMinPlacement(0);
    setSortOption('default');
    setSearchWord('');
  };

  // Filtering Logic
  const filteredColleges = colleges.filter(college => {
    // Stream Filter
    if (streamFilter !== 'All' && college.stream !== streamFilter) return false;
    
    // States Filter
    if (selectedStates.length > 0 && !selectedStates.includes(college.state)) return false;

    // Type Filter (Public/Private)
    if (selectedTypes.length > 0 && !selectedTypes.includes(college.type)) return false;

    // Fees Filter
    if (feeRange !== 'all') {
      if (feeRange === 'under1' && college.avgFees >= 100000) return false;
      if (feeRange === '1to3' && (college.avgFees < 100000 || college.avgFees > 300000)) return false;
      if (feeRange === '3to5' && (college.avgFees < 300000 || college.avgFees > 500000)) return false;
      if (feeRange === 'above5' && college.avgFees <= 500000) return false;
    }

    // Min Placement Filter
    if (college.avgPlacement < minPlacement) return false;

    // Search Keyword
    if (searchWord.trim() !== '') {
      const word = searchWord.toLowerCase();
      const matchName = college.name.toLowerCase().includes(word);
      const matchLoc = college.location.toLowerCase().includes(word);
      const matchExams = college.examsAccepted.some(ex => ex.toLowerCase().includes(word));
      if (!matchName && !matchLoc && !matchExams) return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedColleges = [...filteredColleges].sort((a, b) => {
    if (sortOption === 'placement-high') {
      return b.avgPlacement - a.avgPlacement;
    }
    if (sortOption === 'fees-low') {
      return a.avgFees - b.avgFees;
    }
    if (sortOption === 'fees-high') {
      return b.avgFees - a.avgFees;
    }
    if (sortOption === 'rating-high') {
      return b.rating - a.rating;
    }
    return 0; // default
  });

  const handleCardClick = (college: College) => {
    setDetailModalCollege(college);
    setModalTab('overview');
  };

  return (
    <div className="directory-view-container">
      {/* Header Banner */}
      <section className="directory-header-banner">
        <h1>Institutional Explorer & Finder</h1>
        <p>Browse through India's premier colleges. Compare fees, read placement histories, and apply instantly.</p>
        
        {/* Quick Search bar */}
        <div className="directory-instant-search">
          <input
            type="text"
            placeholder="Type name, city, or entrance exam to filter..."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </div>
      </section>

      <div className="directory-content-layout">
        {/* Left Sidebar Filter Column */}
        <aside className="directory-sidebar-filters">
          <div className="sidebar-header-box">
            <h3>Faceted Filters</h3>
            <button className="clear-all-filter-btn" onClick={handleClearFilters}>Reset All</button>
          </div>

          {/* Stream Filter */}
          <div className="filter-group-block">
            <h4>Study Stream</h4>
            <div className="stream-pills-filters">
              {['All', 'Engineering', 'Management', 'Medical', 'Law', 'Science', 'Arts'].map((stream) => (
                <button
                  key={stream}
                  className={`filter-pill-btn ${streamFilter === stream ? 'active' : ''}`}
                  onClick={() => setStreamFilter(stream)}
                >
                  {stream}
                </button>
              ))}
            </div>
          </div>

          {/* State Location */}
          <div className="filter-group-block">
            <h4>Location (State)</h4>
            <div className="checkbox-filter-list">
              {states.map((state) => (
                <label key={state} className="custom-checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedStates.includes(state)}
                    onChange={() => toggleStateFilter(state)}
                  />
                  <span className="checkbox-box"></span>
                  <span className="checkbox-text">{state}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ownership Type */}
          <div className="filter-group-block">
            <h4>College Type</h4>
            <div className="checkbox-filter-list">
              {types.map((type) => (
                <label key={type} className="custom-checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleTypeFilter(type)}
                  />
                  <span className="checkbox-box"></span>
                  <span className="checkbox-text">{type} Institution</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fees range */}
          <div className="filter-group-block">
            <h4>Annual Fees</h4>
            <div className="radio-filter-list">
              {[
                { value: 'all', label: 'Any Fees range' },
                { value: 'under1', label: 'Under ₹ 1 Lakh' },
                { value: '1to3', label: '₹ 1 Lakh - ₹ 3 Lakhs' },
                { value: '3to5', label: '₹ 3 Lakhs - ₹ 5 Lakhs' },
                { value: 'above5', label: 'Above ₹ 5 Lakhs' }
              ].map((range) => (
                <label key={range.value} className="custom-radio-label">
                  <input
                    type="radio"
                    name="feesRange"
                    value={range.value}
                    checked={feeRange === range.value}
                    onChange={(e) => setFeeRange(e.target.value)}
                  />
                  <span className="radio-dot"></span>
                  <span className="radio-text">{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Placement Min package */}
          <div className="filter-group-block">
            <h4>Min Placement (LPA)</h4>
            <div className="slider-filter-wrapper">
              <input
                type="range"
                min="0"
                max="30"
                step="2"
                value={minPlacement}
                onChange={(e) => setMinPlacement(Number(e.target.value))}
              />
              <div className="slider-labels">
                <span>Any</span>
                <span className="font-bold text-accent">{minPlacement} LPA</span>
                <span>30 LPA</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Directory Results Column */}
        <main className="directory-results-main">
          {/* Controls Bar */}
          <div className="results-controls-header">
            <span className="results-count">Showing <strong>{sortedColleges.length}</strong> Colleges</span>
            
            <div className="results-sorting-widget">
              <label>Sort By:</label>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="default">Popularity Rank</option>
                <option value="placement-high">Placement: High to Low</option>
                <option value="fees-low">Fees: Low to High</option>
                <option value="fees-high">Fees: High to Low</option>
                <option value="rating-high">Rating: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results Grid */}
          {sortedColleges.length > 0 ? (
            <div className="results-cards-grid">
              {sortedColleges.map((college) => {
                const isCompared = selectedCompare.some(c => c.id === college.id);
                return (
                  <div key={college.id} className="college-result-card animate-hover">
                    {/* Image Area */}
                    <div onClick={() => handleCardClick(college)} className="card-image-click">
                      <CollegeImage name={college.name} color={college.logoColor} stream={college.stream} />
                    </div>

                    {/* Content Area */}
                    <div className="result-card-content">
                      <div className="card-header-row">
                        <span className="badge-pill type-pill">{college.type}</span>
                        <label className="compare-checkbox-pill" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isCompared}
                            onChange={() => onToggleCompare(college)}
                            disabled={!isCompared && selectedCompare.length >= 3}
                          />
                          <span className="checkbox-pill-box"></span>
                          Compare
                        </label>
                      </div>

                      <h3 onClick={() => handleCardClick(college)} className="college-card-title">
                        {college.name.split(',')[0]}
                      </h3>
                      <span className="college-card-location">{college.location}, {college.state}</span>
                      
                      <div className="rating-holder-card">
                        <span className="card-rating">★ {college.rating}</span>
                        <span className="card-reviews">({college.reviewsCount} reviews)</span>
                      </div>

                      <div className="college-card-metrics-grid">
                        <div className="metric-box">
                          <span className="metric-lbl">Avg Fees</span>
                          <strong className="fee-val">₹ {college.avgFees.toLocaleString('en-IN')}/yr</strong>
                        </div>
                        <div className="metric-box">
                          <span className="metric-lbl">Avg Placement</span>
                          <strong className="placement-val">{college.avgPlacement} LPA</strong>
                        </div>
                      </div>

                      <p className="card-exams-list">Exams accepted: <strong>{college.examsAccepted.join(', ')}</strong></p>

                      <div className="card-actions-row">
                        <button className="card-secondary-btn" onClick={() => handleCardClick(college)}>Explore Details</button>
                        <button className="card-primary-btn" onClick={() => onApplyCollegeDirect(college.name)}>Apply Now</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-results-box animate-scaleUp">
              <svg className="h-16 w-16 text-muted mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3>No Colleges Match Your Filters</h3>
              <p>Try resetting some parameters or clearing search queries in the sidebar filters.</p>
              <button className="reset-empty-btn" onClick={handleClearFilters}>Reset Filters</button>
            </div>
          )}
        </main>
      </div>

      {/* College Detail Modal Overlay */}
      {detailModalCollege && (
        <div className="compare-modal-backdrop animate-fadeIn" style={{ zIndex: 1050 }}>
          <div className="college-detail-modal animate-scaleUp">
            
            {/* Modal Hero Header */}
            <div className="college-modal-hero" style={{ background: `linear-gradient(135deg, ${detailModalCollege.logoColor}ee, #0b132b)` }}>
              <button className="modal-close-corner-btn" onClick={handleCloseDetailModal}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="modal-hero-title-area">
                <div className="modal-header-avatar" style={{ backgroundColor: detailModalCollege.logoColor }}>
                  {detailModalCollege.name.split('(').pop()?.substring(0,3).toUpperCase() || detailModalCollege.name.substring(0,3).toUpperCase()}
                </div>
                <div>
                  <span className="badge-pill modal-hero-tag">{detailModalCollege.stream} • {detailModalCollege.type}</span>
                  <h2>{detailModalCollege.name}</h2>
                  <p>{detailModalCollege.location}, {detailModalCollege.state} • Estd. {detailModalCollege.established}</p>
                </div>
              </div>
            </div>

            {/* Modal Tabs Bar */}
            <div className="college-modal-tabs">
              <button className={`tab-btn ${modalTab === 'overview' ? 'active' : ''}`} onClick={() => setModalTab('overview')}>Overview</button>
              <button className={`tab-btn ${modalTab === 'courses' ? 'active' : ''}`} onClick={() => setModalTab('courses')}>Courses & Fees</button>
              <button className={`tab-btn ${modalTab === 'placements' ? 'active' : ''}`} onClick={() => setModalTab('placements')}>Placements</button>
              <button className={`tab-btn ${modalTab === 'facilities' ? 'active' : ''}`} onClick={() => setModalTab('facilities')}>Facilities</button>
              
              <button className="modal-apply-btn-tab" onClick={() => { onApplyCollegeDirect(detailModalCollege.name); handleCloseDetailModal(); }}>
                Apply Direct via CAF
              </button>
            </div>

            {/* Modal Tab Body */}
            <div className="college-modal-body">
              {modalTab === 'overview' && (
                <div className="tab-pane-content animate-fadeIn">
                  <h3>About the Institution</h3>
                  <p className="long-description-paragraph">{detailModalCollege.longDesc}</p>
                  
                  <div className="quick-info-highlights">
                    <div className="info-highlight-card">
                      <span>★ Rating Score</span>
                      <strong>{detailModalCollege.rating} / 5.0</strong>
                      <small>from {detailModalCollege.reviewsCount} audited reviews</small>
                    </div>
                    <div className="info-highlight-card">
                      <span>Affiliated Body</span>
                      <strong>{detailModalCollege.affiliation}</strong>
                      <small>Accredited Board</small>
                    </div>
                    <div className="info-highlight-card">
                      <span>Entrance Exams</span>
                      <strong>{detailModalCollege.examsAccepted.join(', ')}</strong>
                      <small>Accepted Scores</small>
                    </div>
                  </div>
                </div>
              )}

              {modalTab === 'courses' && (
                <div className="tab-pane-content animate-fadeIn">
                  <h3>Offered Programs & Fees</h3>
                  <table className="courses-table">
                    <thead>
                      <tr>
                        <th>Course & Program Name</th>
                        <th>Duration</th>
                        <th>Tuition Fees</th>
                        <th>Eligibility Criteria</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailModalCollege.courses.map((course, idx) => (
                        <tr key={idx}>
                          <td className="font-bold text-navy">{course.name}</td>
                          <td className="font-medium text-muted">{course.duration}</td>
                          <td className="font-bold text-accent">{course.fees}</td>
                          <td className="text-xs text-navy font-medium">{course.eligibility}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {modalTab === 'placements' && (
                <div className="tab-pane-content animate-fadeIn">
                  <h3>Placement Statistics (Academic Year 2025)</h3>
                  <div className="placement-metrics-large">
                    <div className="stat-large-box">
                      <span>Average Package</span>
                      <strong className="avg-num">{detailModalCollege.avgPlacement} LPA</strong>
                    </div>
                    <div className="stat-large-box">
                      <span>Highest Salary Package</span>
                      <strong className="highest-num">{detailModalCollege.highestPlacement} LPA</strong>
                    </div>
                  </div>

                  <h4>Key Recruiters & Industry Alliances</h4>
                  <div className="recruiters-chips-container">
                    {detailModalCollege.topRecruiters.map((rec, index) => (
                      <span key={index} className="recruiter-chip">{rec}</span>
                    ))}
                  </div>
                </div>
              )}

              {modalTab === 'facilities' && (
                <div className="tab-pane-content animate-fadeIn">
                  <h3>Infrastructure & Campus Facilities</h3>
                  <div className="facilities-grid-large">
                    {detailModalCollege.facilities.map((fac, idx) => (
                      <div key={idx} className="facility-large-item">
                        <span className="facility-dot-icon">✓</span>
                        <span>{fac}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="college-modal-footer">
              <p>For custom counseling regarding this college, please launch **SaarthiGPT** or submit a Common Application Form.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
