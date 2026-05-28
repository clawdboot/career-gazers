import React, { useState } from 'react';
import { College } from '../data/colleges';

interface CompareShelfProps {
  selectedColleges: College[];
  onRemoveCollege: (collegeId: string) => void;
  onClearAll: () => void;
  onApplyDirect: (collegeName: string) => void;
}

export const CompareShelf: React.FC<CompareShelfProps> = ({
  selectedColleges,
  onRemoveCollege,
  onClearAll,
  onApplyDirect
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  if (selectedColleges.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Comparison Dock */}
      <div className="compare-dock-container animate-slideUp">
        <div className="compare-dock-inner">
          <div className="compare-dock-left">
            <span className="compare-dock-title">Comparison Drawer</span>
            <span className="compare-dock-count">({selectedColleges.length}/3 selected)</span>
          </div>

          <div className="compare-dock-items">
            {selectedColleges.map((college) => (
              <div key={college.id} className="compare-dock-item">
                <span className="item-name" title={college.name}>{college.name.split(',')[0]}</span>
                <button className="remove-item-btn" onClick={() => onRemoveCollege(college.id)}>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            {selectedColleges.length < 3 && (
              <div className="compare-dock-slot-empty">
                <span>Add college to compare</span>
              </div>
            )}
          </div>

          <div className="compare-dock-actions">
            <button className="clear-all-btn" onClick={onClearAll}>Clear</button>
            <button
              className="compare-now-btn"
              disabled={selectedColleges.length < 2}
              onClick={() => setModalOpen(true)}
              title={selectedColleges.length < 2 ? 'Select at least 2 colleges to compare' : 'Compare side by side'}
            >
              Compare Now ({selectedColleges.length})
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen Detailed Comparison Modal Overlay */}
      {modalOpen && (
        <div className="compare-modal-backdrop animate-fadeIn">
          <div className="compare-modal-content animate-scaleUp">
            <div className="compare-modal-header">
              <h3>College Comparison Report</h3>
              <button className="close-modal-btn" onClick={() => setModalOpen(false)}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="compare-modal-body">
              <div className="compare-grid" style={{ gridTemplateColumns: `150px repeat(${selectedColleges.length}, 1fr)` }}>
                {/* Headers / Logos Row */}
                <div className="compare-row header-row">
                  <div className="compare-cell label-cell">Parameters</div>
                  {selectedColleges.map((college) => (
                    <div key={college.id} className="compare-cell value-cell card-cell">
                      <div className="college-header-avatar" style={{ backgroundColor: college.logoColor }}>
                        {college.name.split('(').pop()?.substring(0,3).toUpperCase() || college.name.substring(0,3).toUpperCase()}
                      </div>
                      <h4>{college.name.split(',')[0]}</h4>
                      <p>{college.location}, {college.state}</p>
                      <button className="compare-apply-btn" onClick={() => { onApplyDirect(college.name); setModalOpen(false); }}>
                        Apply Now
                      </button>
                    </div>
                  ))}
                </div>

                {/* Stream / Ownership Type */}
                <div className="compare-row">
                  <div className="compare-cell label-cell font-bold">Category & Type</div>
                  {selectedColleges.map((college) => (
                    <div key={college.id} className="compare-cell value-cell">
                      <span className="badge-pill stream">{college.stream}</span>
                      <span className="badge-pill type">{college.type} Institute</span>
                    </div>
                  ))}
                </div>

                {/* established */}
                <div className="compare-row">
                  <div className="compare-cell label-cell font-bold">Established</div>
                  {selectedColleges.map((college) => (
                    <div key={college.id} className="compare-cell value-cell font-medium">
                      {college.established} ({new Date().getFullYear() - college.established} years old)
                    </div>
                  ))}
                </div>

                {/* Rating & Reviews */}
                <div className="compare-row">
                  <div className="compare-cell label-cell font-bold">Student Reviews</div>
                  {selectedColleges.map((college) => (
                    <div key={college.id} className="compare-cell value-cell">
                      <div className="rating-holder">
                        <span className="rating-value">★ {college.rating}</span>
                        <span className="rating-count">({college.reviewsCount} reviews)</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Annual fees */}
                <div className="compare-row">
                  <div className="compare-cell label-cell font-bold">Average Fees</div>
                  {selectedColleges.map((college) => (
                    <div key={college.id} className="compare-cell value-cell fee-highlight">
                      ₹ {college.avgFees.toLocaleString('en-IN')} / year
                    </div>
                  ))}
                </div>

                {/* Average placement */}
                <div className="compare-row">
                  <div className="compare-cell label-cell font-bold">Average Placement</div>
                  {selectedColleges.map((college) => (
                    <div key={college.id} className="compare-cell value-cell package-highlight">
                      {college.avgPlacement} LPA
                    </div>
                  ))}
                </div>

                {/* Highest placement */}
                <div className="compare-row">
                  <div className="compare-cell label-cell font-bold">Highest Package</div>
                  {selectedColleges.map((college) => (
                    <div key={college.id} className="compare-cell value-cell package-highest">
                      {college.highestPlacement} LPA
                    </div>
                  ))}
                </div>

                {/* Entrance exams accepted */}
                <div className="compare-row">
                  <div className="compare-cell label-cell font-bold">Exams Accepted</div>
                  {selectedColleges.map((college) => (
                    <div key={college.id} className="compare-cell value-cell font-medium">
                      {college.examsAccepted.join(', ')}
                    </div>
                  ))}
                </div>

                {/* Affiliations */}
                <div className="compare-row">
                  <div className="compare-cell label-cell font-bold">Affiliation</div>
                  {selectedColleges.map((college) => (
                    <div key={college.id} className="compare-cell value-cell">
                      {college.affiliation}
                    </div>
                  ))}
                </div>

                {/* Facilities */}
                <div className="compare-row">
                  <div className="compare-cell label-cell font-bold">Facilities</div>
                  {selectedColleges.map((college) => (
                    <div key={college.id} className="compare-cell value-cell">
                      <div className="facility-grid">
                        {college.facilities.slice(0, 4).map((fac, index) => (
                          <span key={index} className="facility-tag">{fac}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Top Recruiters */}
                <div className="compare-row">
                  <div className="compare-cell label-cell font-bold">Key Recruiters</div>
                  {selectedColleges.map((college) => (
                    <div key={college.id} className="compare-cell value-cell font-medium text-xs">
                      {college.topRecruiters.join(', ')}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="compare-modal-footer">
              <p>Values are fetched dynamically from academic audit databases. Always double check cutoffs and placement averages prior to admission.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
