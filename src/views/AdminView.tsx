import React, { useState } from 'react';

interface AdminViewProps {
  applications: any[];
  leads: any[];
  onUpdateAppStatus: (appId: string, collegeId: string, newStatus: string) => void;
  onUpdateLeadStatus: (leadId: string, newStatus: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  applications,
  leads,
  onUpdateAppStatus,
  onUpdateLeadStatus
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'applications' | 'stats'>('leads');

  // Predefined credentials
  const ADMIN_USERNAME = 'admin@careergrazers.com';
  const ADMIN_PASSWORD = 'admin123';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Username or Password. Use admin@careergrazers.com / admin123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  // Stats calculation
  const totalLeads = leads.length;
  const totalApps = applications.reduce((acc, app) => acc + app.appliedColleges.length, 0);
  
  const streamCounts = leads.reduce((acc: { [key: string]: number }, lead) => {
    acc[lead.stream] = (acc[lead.stream] || 0) + 1;
    return acc;
  }, {});

  if (!isLoggedIn) {
    return (
      <div className="admin-login-view-container animate-fadeIn">
        <div className="admin-login-card animate-scaleUp">
          <div className="admin-lock-icon">
            <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2>Admin Portal Gateway</h2>
          <p className="admin-subtitle">Secure authorization is required to review student leads and CAF submissions.</p>

          <form onSubmit={handleLogin}>
            {loginError && <div className="admin-login-error animate-slideUp">{loginError}</div>}
            
            <div className="form-group-field mb-4">
              <label>Admin Username (Email)</label>
              <input
                type="text"
                placeholder="admin@careergrazers.com"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group-field mb-4">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="admin-submit-btn mt-6">
              Authorize Credentials
            </button>
          </form>

          <div className="admin-credentials-helper">
            <h4>💡 Pre-seeded Credentials:</h4>
            <p>Username: <code>admin@careergrazers.com</code></p>
            <p>Password: <code>admin123</code></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container animate-fadeIn">
      {/* Banner */}
      <section className="admin-banner-row">
        <div>
          <h1>Admin Control Panel</h1>
          <p>Authorized access logged in as: <strong>{ADMIN_USERNAME}</strong></p>
        </div>
        <button className="admin-logout-btn" onClick={handleLogout}>Close Session</button>
      </section>

      {/* Metrics Row */}
      <div className="admin-metrics-row">
        <div className="metric-box-admin">
          <span>Callback Requests</span>
          <strong>{totalLeads}</strong>
          <small>Interactive lead forms</small>
        </div>
        <div className="metric-box-admin">
          <span>Total CAF Applications</span>
          <strong>{totalApps}</strong>
          <small>Submitted unified forms</small>
        </div>
        <div className="metric-box-admin">
          <span>Target Stream Preferred</span>
          <strong>{Object.keys(streamCounts).length > 0 ? Object.entries(streamCounts).sort((a,b) => b[1]-a[1])[0][0] : 'None'}</strong>
          <small>Highest volume sector</small>
        </div>
      </div>

      {/* Tab bar selector */}
      <div className="admin-tab-bar">
        <button className={`admin-tab-btn ${activeTab === 'leads' ? 'active' : ''}`} onClick={() => setActiveTab('leads')}>
          Leads Callbacks ({totalLeads})
        </button>
        <button className={`admin-tab-btn ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>
          CAF Submissions ({totalApps})
        </button>
        <button className={`admin-tab-btn ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>
          Distribution stats
        </button>
      </div>

      {/* Tab Panels */}
      <div className="admin-panel-body">
        
        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <div className="admin-table-wrapper animate-fadeIn">
            <h3>Registered Counseling Callback Requests</h3>
            {leads.length > 0 ? (
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Lead ID</th>
                    <th>Candidate Name</th>
                    <th>Mobile Phone</th>
                    <th>Stream Preference</th>
                    <th>Registration Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td className="font-bold text-accent">{lead.id}</td>
                      <td className="font-bold text-navy">{lead.name}</td>
                      <td className="font-medium">{lead.phone}</td>
                      <td><span className="badge-pill stream">{lead.stream}</span></td>
                      <td className="text-muted">{lead.date}</td>
                      <td>
                        <span className={`status-pill ${lead.status.toLowerCase().replace(' ', '-')}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td>
                        <select
                          value={lead.status}
                          onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value)}
                          className="admin-action-select"
                        >
                          <option value="Allocated">Allocated</option>
                          <option value="Called: Pending">Called: Pending</option>
                          <option value="Counsel Completed">Counsel Completed</option>
                          <option value="Unreachable">Unreachable</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="admin-empty-table-prompt">
                <p>No callback requests registered. Submit a guide request form from the homepage to check syncs.</p>
              </div>
            )}
          </div>
        )}

        {/* APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <div className="admin-table-wrapper animate-fadeIn">
            <h3>Unified Common Application Forms (CAF)</h3>
            {applications.length > 0 ? (
              <div className="admin-apps-cards-list">
                {applications.map((app) => (
                  <div key={app.id} className="admin-app-profile-card">
                    <div className="app-profile-card-header">
                      <div>
                        <span className="app-id-tag">{app.id}</span>
                        <strong className="text-navy text-lg ml-2">{app.fullName}</strong>
                      </div>
                      <span className="text-muted text-xs">Submitted on {app.dateSubmitted}</span>
                    </div>

                    <div className="app-profile-card-academics">
                      <div><span>Email:</span> <strong>{app.email}</strong></div>
                      <div><span>Phone:</span> <strong>{app.phone}</strong></div>
                      <div><span>City/State:</span> <strong>{app.city}, {app.state}</strong></div>
                      <div><span>10th/12th Marks:</span> <strong>10th: {app.academicSummary.marks10} | 12th: {app.academicSummary.marks12}</strong></div>
                      {app.academicSummary.exam !== 'None' && (
                        <div><span>Exam / Score:</span> <strong>{app.academicSummary.exam} ({app.academicSummary.score})</strong></div>
                      )}
                    </div>

                    <div className="app-profile-colleges-list">
                      <h4>Applied Institutions & Status reviews:</h4>
                      {app.appliedColleges.map((col: any) => (
                        <div key={col.id} className="admin-app-college-row">
                          <div className="college-title-block">
                            <span className="bullet-logo" style={{ backgroundColor: col.logoColor }}>
                              {col.name.substring(0,2).toUpperCase()}
                            </span>
                            <span>{col.name}</span>
                          </div>
                          
                          <div className="college-status-selector-block">
                            <span className={`status-pill ${col.status.toLowerCase().replace(' ', '-')}`}>
                              {col.status}
                            </span>
                            <select
                              value={col.status}
                              onChange={(e) => onUpdateAppStatus(app.id, col.id, e.target.value)}
                              className="admin-action-select"
                            >
                              <option value="Under Review">Under Review</option>
                              <option value="Documents Verified">Documents Verified</option>
                              <option value="Shortlisted">Shortlisted</option>
                              <option value="Offer Letter Issued">Offer Letter Issued</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="admin-empty-table-prompt">
                <p>No CAF submissions found. Complete a Common Application Form in the student view to review profiles.</p>
              </div>
            )}
          </div>
        )}

        {/* STATS TAB */}
        {activeTab === 'stats' && (
          <div className="admin-table-wrapper animate-fadeIn">
            <h3>Academic Interest Distributions</h3>
            <div className="admin-stats-charts-row">
              <div className="chart-item-box">
                <h4>Stream Preference Volume</h4>
                {Object.keys(streamCounts).length > 0 ? (
                  <div className="simple-bar-chart-container">
                    {Object.entries(streamCounts).map(([stream, val]) => {
                      const percent = ((val as number) / totalLeads) * 100;
                      return (
                        <div key={stream} className="bar-chart-row">
                          <span className="bar-label">{stream}</span>
                          <div className="bar-track">
                            <div className="bar-fill" style={{ width: `${percent}%`, backgroundColor: 'var(--accent-purple)' }}></div>
                          </div>
                          <span className="bar-value">{val} ({Math.round(percent)}%)</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-muted text-sm mt-4">Awaiting metrics database accumulation.</p>
                )}
              </div>
              
              <div className="chart-item-box highlight-specs">
                <h4>Admin Access Policies</h4>
                <p className="text-muted text-xs leading-relaxed mt-2">
                  All synchronization data is cached directly in the local sandbox browser container utilizing the <code>localStorage</code> database interface. 
                  Admins can simulate seat blocking audits, verify student marksheets, and update candidate stages (which automatically binds to the timelines of corresponding applicant dashboards).
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
