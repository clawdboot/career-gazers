import React from 'react';
import { College } from '../data/colleges';

interface DashboardViewProps {
  applications: any[];
  colleges: College[];
  setView: (view: string) => void;
  onSelectCollege: (collegeId: string) => void;
  onRemoveShortlist: (collegeId: string) => void;
  shortlistedColleges: College[];
  studentUser?: any | null;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  applications,
  colleges,
  setView,
  onSelectCollege,
  onRemoveShortlist,
  shortlistedColleges,
  studentUser
}) => {
  // If there are no custom submitted applications, let's create a beautiful mock application so the dashboard doesn't look completely empty, or show a clear prompt.
  // We will show a premium clean interface. If applications list is empty, we will present a beautiful welcome prompt to fill CAF, but we will also seed a default realistic application (e.g. Rahul Sharma applied to VIT Vellore) to showcase what it looks like!

  const defaultMockApps = [
    {
      id: 'CAF-2026-X8F9P2',
      fullName: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '9876543210',
      city: 'New Delhi',
      state: 'Delhi',
      appliedColleges: [
        {
          id: 'vit-vellore',
          name: 'Vellore Institute of Technology (VIT), Vellore',
          location: 'Vellore',
          logoColor: '#008080',
          status: 'Shortlisted',
          date: '25/05/2026'
        },
        {
          id: 'dtu-delhi',
          name: 'Delhi Technological University (DTU), Delhi',
          location: 'New Delhi',
          logoColor: '#6a1b9a',
          status: 'Under Review',
          date: '25/05/2026'
        }
      ],
      dateSubmitted: '25/05/2026'
    }
  ];

  const userApps = studentUser
    ? applications.filter(app => app.email.toLowerCase() === studentUser.email.toLowerCase())
    : applications;

  const activeApps = userApps.length > 0 ? userApps : (studentUser ? [] : defaultMockApps);

  return (
    <div className="dashboard-view-container">
      {/* Dashboard Top Banner */}
      <section className="dashboard-intro-banner">
        <div className="profile-badge-row">
          <div className="profile-avatar-circle animate-hover">
            {studentUser 
              ? studentUser.fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2)
              : 'RS'
            }
          </div>
          <div>
            <h1>Student Portal Dashboard</h1>
            <p>Track your Common Application Form (CAF) admissions status, shortlists, and expert counseling bookings.</p>
          </div>
        </div>
      </section>

      <div className="dashboard-body-layout">
        {/* Left Column: Applications Tracker */}
        <div className="dashboard-main-column">
          <h2>Active College Applications ({activeApps.reduce((acc, app) => acc + app.appliedColleges.length, 0)})</h2>
          
          <div className="applications-timeline-list">
            {activeApps.map((app) => (
              <div key={app.id} className="app-card-wrapper animate-fadeIn">
                <div className="app-card-header">
                  <div>
                    <span className="app-id-tag">{app.id}</span>
                    <span className="app-date-meta">Submitted on {app.dateSubmitted}</span>
                  </div>
                  <span className="app-student-name">Applicant: <strong>{app.fullName}</strong></span>
                </div>

                <div className="applied-colleges-status-list">
                  {app.appliedColleges.map((col: any) => {
                    // Determine step for visual timeline
                    let stepNum = 1;
                    if (col.status === 'Shortlisted') stepNum = 3;
                    if (col.status === 'Offer Letter Issued') stepNum = 4;

                    return (
                      <div key={col.id} className="applied-college-row animate-hover">
                        <div className="row-left">
                          <div className="college-row-logo" style={{ backgroundColor: col.logoColor }}>
                            {col.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h4>{col.name.split(',')[0]}</h4>
                            <p>{col.location} • Applied via CAF</p>
                          </div>
                        </div>

                        {/* Interactive Status Timeline */}
                        <div className="row-center-timeline">
                          <div className={`timeline-node ${stepNum >= 1 ? 'active' : ''}`}>
                            <div className="circle">1</div>
                            <span>Applied</span>
                          </div>
                          <div className="timeline-line fill-half"></div>
                          <div className={`timeline-node ${stepNum >= 2 ? 'active' : ''}`}>
                            <div className="circle">2</div>
                            <span>Audited</span>
                          </div>
                          <div className="timeline-line fill-half"></div>
                          <div className={`timeline-node ${stepNum >= 3 ? 'active' : ''}`}>
                            <div className="circle">3</div>
                            <span>Shortlisted</span>
                          </div>
                          <div className="timeline-line"></div>
                          <div className={`timeline-node ${stepNum >= 4 ? 'active' : ''}`}>
                            <div className="circle">4</div>
                            <span>Admission</span>
                          </div>
                        </div>

                        <div className="row-right-status">
                          <span className={`status-pill ${col.status.toLowerCase().replace(' ', '-')}`}>
                            {col.status}
                          </span>
                          <button className="track-details-btn" onClick={() => onSelectCollege(col.id)}>View College</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {applications.length === 0 && (
            <div className="dashboard-caf-promo-alert animate-scaleUp">
              <h4>⚡ Pro-Tip: You are viewing simulated sample records!</h4>
              <p>You can submit your custom academic transcripts and college preferences in the Common Application Form. Any form submitted will instantly populate this tracking board.</p>
              <button className="promo-apply-now-btn" onClick={() => setView('caf')}>Fill Live Common Form (CAF)</button>
            </div>
          )}
        </div>

        {/* Right Column: Shortlists & Counselings */}
        <div className="dashboard-sidebar-column">
          {/* Student Profile Card */}
          <div className="student-profile-summary-card">
            <h3>Registered Candidate</h3>
            <div className="profile-specs-table">
              <div className="profile-row-spec">
                <span>10th Score:</span>
                <strong>{studentUser?.academics?.marks10 || studentUser?.marks10 || '92.4%'}</strong>
              </div>
              <div className="profile-row-spec">
                <span>12th Score:</span>
                <strong>{studentUser?.academics?.marks12 || studentUser?.marks12 || '88.5%'}</strong>
              </div>
              <div className="profile-row-spec">
                <span>Target Stream:</span>
                <strong>{studentUser ? (studentUser.streamPreference || studentUser.stream) : 'Engineering'}</strong>
              </div>
              <div className="profile-row-spec">
                <span>Entrance Exam:</span>
                <strong>
                  {studentUser?.academics?.exam && studentUser.academics.exam !== 'None'
                    ? `${studentUser.academics.exam} (${studentUser.academics.score})`
                    : studentUser?.academics?.marks12 
                    ? 'Board Merit'
                    : 'JEE Main (AIR 14,200)'}
                </strong>
              </div>
            </div>
          </div>

          {/* Bookmarked Colleges Shortlist */}
          <div className="shortlisted-colleges-panel">
            <h3>My Bookmarked Shortlist ({shortlistedColleges.length})</h3>
            {shortlistedColleges.length > 0 ? (
              <div className="shortlists-cards-list">
                {shortlistedColleges.map((college) => (
                  <div key={college.id} className="shortlist-item-card animate-hover" onClick={() => onSelectCollege(college.id)}>
                    <div className="shortlist-left">
                      <div className="shortlist-avatar" style={{ backgroundColor: college.logoColor }}>
                        {college.name.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                        <h4>{college.name.split(',')[0]}</h4>
                        <p>{college.location} • {college.stream}</p>
                      </div>
                    </div>
                    <button
                      className="delete-shortlist-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveShortlist(college.id);
                      }}
                      title="Remove Bookmark"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="shortlist-empty-box">
                <svg className="h-10 w-10 text-muted mb-2 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <p>No bookmarked colleges yet. Browse the college directories to shortlist target universities.</p>
                <button className="browse-coll-btn" onClick={() => setView('directory')}>Browse Colleges</button>
              </div>
            )}
          </div>

          {/* Counselors Sessions Status */}
          <div className="counseling-sessions-panel">
            <h3>Counseling Sessions</h3>
            <div className="sessions-list">
              <div className="session-item-row status-scheduled">
                <div>
                  <h4>1-on-1 Counseling Call</h4>
                  <p>Assigned Advisor: Priya Mehta</p>
                  <small>Scheduled: Within 24 hours</small>
                </div>
                <span className="session-status-badge">Allocated</span>
              </div>
              <div className="session-item-row status-completed">
                <div>
                  <h4>AI Chat Counsel Session</h4>
                  <p>Assigned Assistant: SaarthiGPT</p>
                  <small>Completed: Real-time queries</small>
                </div>
                <span className="session-status-badge">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
