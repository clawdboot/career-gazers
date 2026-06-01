import React, { useState } from 'react';
import { College } from '../data/colleges';

interface AdminViewProps {
  applications: any[];
  leads: any[];
  onUpdateAppStatus: (appId: string, collegeId: string, newStatus: string) => void;
  onUpdateLeadStatus: (leadId: string, newStatus: string) => void;
  colleges: College[];
  onAddCollege: (newCol: College) => void;
  onDeleteCollege: (collegeId: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  applications,
  leads,
  onUpdateAppStatus,
  onUpdateLeadStatus,
  colleges,
  onAddCollege,
  onDeleteCollege
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'applications' | 'candidates' | 'institutions' | 'stats'>('leads');

  // Load dynamically registered candidate accounts from student Sign Up portal
  const [registeredCandidates, setRegisteredCandidates] = useState<any[]>([]);

  // Add College Form States
  const [newColName, setNewColName] = useState('');
  const [newColStream, setNewColStream] = useState('Engineering');
  const [newColFees, setNewColFees] = useState('');
  const [newColPlacement, setNewColPlacement] = useState('');
  const [newColEstablished, setNewColEstablished] = useState('');
  const [newColLocation, setNewColLocation] = useState('');
  const [newColState, setNewColState] = useState('');
  const [newColExams, setNewColExams] = useState('JEE Main');
  const [newColDesc, setNewColDesc] = useState('');
  const [newColLogoColor, setNewColLogoColor] = useState('#6a1b9a');
  
  const [colFormSuccess, setColFormSuccess] = useState('');
  const [colFormError, setColFormError] = useState('');

  // Predefined credentials
  const ADMIN_USERNAME = 'admin@careergazers.com';
  const ADMIN_PASSWORD = 'admin123';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError('');
      // Load registered candidates list upon successful login
      const stored = localStorage.getItem('careergazers_registered_students');
      setRegisteredCandidates(stored ? JSON.parse(stored) : []);
    } else {
      setLoginError('Invalid Username or Password. Use admin@careergazers.com / admin123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleSaveCollege = (e: React.FormEvent) => {
    e.preventDefault();
    setColFormSuccess('');
    setColFormError('');

    if (!newColName || !newColFees || !newColPlacement || !newColLocation || !newColState) {
      setColFormError('Please fill in all required fields *');
      return;
    }

    const newId = newColName.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const exists = colleges.some(c => c.id === newId);
    if (exists) {
      setColFormError('A college with this exact name already exists in the system.');
      return;
    }

    const newCollege: College = {
      id: newId,
      name: newColName,
      logoColor: newColLogoColor,
      location: newColLocation,
      state: newColState,
      stream: newColStream as any,
      type: 'Private',
      established: Number(newColEstablished) || 2012,
      rating: 4.5,
      reviewsCount: 120,
      avgFees: Number(newColFees.replace(/,/g, '')) || 150000,
      avgPlacement: Number(newColPlacement) || 6.8,
      highestPlacement: Math.round((Number(newColPlacement) || 6.8) * 2.2 * 10) / 10,
      examsAccepted: newColExams.split(',').map(ex => ex.trim()).filter(Boolean),
      affiliation: 'Autonomous affiliated',
      topRecruiters: ['Microsoft', 'Amazon', 'Cognizant', 'TCS', 'Infosys'],
      shortDesc: `${newColName} is a premium educational institution located in ${newColLocation}, ${newColState}.`,
      longDesc: newColDesc || `${newColName} is a premium educational institution located in ${newColLocation}, ${newColState}, recognized for high placement statistics and world-class faculty.`,
      facilities: ['Library', 'Hostel', 'Computer Labs', 'Auditorium', 'Sports Complex'],
      courses: [
        { name: 'Bachelor Degree', duration: '3-4 Years', fees: `₹ ${newColFees} / year`, eligibility: `12th standard with PCM + ${newColExams.split(',')[0] || 'Entrance Exam'}` },
        { name: 'Master Degree', duration: '2 Years', fees: `₹ ${Math.round((Number(newColFees.replace(/,/g, '')) || 150000) * 0.8).toLocaleString('en-IN')} / year`, eligibility: 'Graduation + entrance scorecard' }
      ]
    };

    onAddCollege(newCollege);
    setColFormSuccess(`🎉 "${newColName}" has been successfully added to the live directory!`);
    
    // Reset Form Fields
    setNewColName('');
    setNewColFees('');
    setNewColPlacement('');
    setNewColEstablished('');
    setNewColLocation('');
    setNewColState('');
    setNewColExams(newColStream === 'Management' ? 'CAT' : newColStream === 'Medical' ? 'NEET UG' : newColStream === 'Law' ? 'CLAT' : 'JEE Main');
    setNewColDesc('');

    setTimeout(() => {
      setColFormSuccess('');
    }, 4000);
  };

  // Stats calculation
  const totalLeads = leads.length;
  const totalApps = applications.reduce((acc, app) => acc + app.appliedColleges.length, 0);
  const totalCandidatesCount = registeredCandidates.length;
  
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
                placeholder="admin@careergazers.com"
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
            <p>Username: <code>admin@careergazers.com</code></p>
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
      <div className="admin-metrics-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="metric-box-admin">
          <span>Callback Requests</span>
          <strong>{totalLeads}</strong>
          <small>Interactive lead forms</small>
        </div>
        <div className="metric-box-admin">
          <span>CAF Applications</span>
          <strong>{totalApps}</strong>
          <small>Submitted unified forms</small>
        </div>
        <div className="metric-box-admin">
          <span>Registered Candidates</span>
          <strong>{totalCandidatesCount}</strong>
          <small>Student sign ups</small>
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
        <button className={`admin-tab-btn ${activeTab === 'candidates' ? 'active' : ''}`} onClick={() => setActiveTab('candidates')}>
          Registered Candidates ({totalCandidatesCount})
        </button>
        <button className={`admin-tab-btn ${activeTab === 'institutions' ? 'active' : ''}`} onClick={() => setActiveTab('institutions')}>
          Manage Colleges ({colleges.length})
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

        {/* CANDIDATES TAB */}
        {activeTab === 'candidates' && (
          <div className="admin-table-wrapper animate-fadeIn">
            <h3>Registered Student Candidate Accounts</h3>
            {registeredCandidates.length > 0 ? (
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Candidate Name</th>
                    <th>Email Address</th>
                    <th>Mobile Phone</th>
                    <th>Preferred Stream</th>
                    <th>Academic Scores (10th/12th)</th>
                    <th>Entrance Exam Score</th>
                    <th>Registration Date</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredCandidates.map((cand, idx) => (
                    <tr key={idx}>
                      <td className="font-bold text-navy">{cand.fullName}</td>
                      <td className="font-medium text-accent">{cand.email}</td>
                      <td>{cand.phone}</td>
                      <td><span className="badge-pill stream">{cand.streamPreference || cand.stream}</span></td>
                      <td>
                        10th: <strong>{cand.academics?.marks10 || cand.marks10}</strong> | 
                        12th: <strong>{cand.academics?.marks12 || cand.marks12}</strong>
                      </td>
                      <td>
                        {cand.academics?.exam && cand.academics.exam !== 'None' ? (
                          <span><strong>{cand.academics.exam}</strong>: {cand.academics.score}</span>
                        ) : (
                          <span className="text-muted text-xs">Board Merit Only</span>
                        )}
                      </td>
                      <td className="text-muted text-sm">{cand.dateJoined || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="admin-empty-table-prompt">
                <p>No registered candidates found. Sign up as a new candidate in the student portal to populate this directory.</p>
              </div>
            )}
          </div>
        )}

        {/* MANAGE COLLEGES TAB */}
        {activeTab === 'institutions' && (
          <div className="admin-institutions-panel animate-fadeIn" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', alignItems: 'start' }}>
            
            {/* Left Side: Colleges List Table */}
            <div className="admin-table-wrapper" style={{ margin: 0 }}>
              <h3>Current Institutions Directory ({colleges.length})</h3>
              <p className="newsletter-subtitle mb-4">You can delete any college. Deletions will instantly reflect in directory filters, predictor, and CAF preferences.</p>
              
              <div style={{ maxHeight: '580px', overflowY: 'auto' }}>
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>College / Location</th>
                      <th>Stream</th>
                      <th>Fees / Yr</th>
                      <th>Avg Package</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {colleges.map((col) => (
                      <tr key={col.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="bullet-logo" style={{ backgroundColor: col.logoColor, width: '28px', height: '28px', fontSize: '0.7rem' }}>
                              {col.name.substring(0, 2).toUpperCase()}
                            </span>
                            <div>
                              <strong className="text-navy" style={{ fontSize: '0.8rem', display: 'block' }}>{col.name.split(',')[0]}</strong>
                              <span className="text-muted" style={{ fontSize: '0.7rem' }}>{col.location}, {col.state}</span>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge-pill stream" style={{ fontSize: '0.7rem', padding: '2px 6px' }}>{col.stream}</span></td>
                        <td className="font-bold text-navy" style={{ fontSize: '0.78rem' }}>₹{col.avgFees.toLocaleString('en-IN')}</td>
                        <td className="font-bold text-accent" style={{ fontSize: '0.78rem' }}>{col.avgPlacement} LPA</td>
                        <td>
                          <button 
                            className="admin-logout-btn" 
                            onClick={() => {
                              if (confirm(`Are you sure you want to completely delete "${col.name}" from the system?`)) {
                                onDeleteCollege(col.id);
                              }
                            }}
                            style={{ padding: '4px 8px', fontSize: '0.7rem', color: '#f44336', borderColor: 'rgba(244, 67, 54, 0.3)' }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Side: Add New College Form */}
            <div className="admin-table-wrapper" style={{ margin: 0, padding: '24px' }}>
              <h3>➕ Add New Institution</h3>
              <p className="newsletter-subtitle mb-4">Input specifications to append a new accredited public or private university to the live directory.</p>
              
              <form onSubmit={handleSaveCollege}>
                {colFormError && <div className="admin-login-error animate-slideUp" style={{ padding: '8px 12px', fontSize: '0.8rem', marginBottom: '16px' }}>{colFormError}</div>}
                {colFormSuccess && <div className="admin-login-success-toast animate-slideUp" style={{ padding: '8px 12px', fontSize: '0.8rem', marginBottom: '16px', borderLeft: '4px solid #4caf50' }}>{colFormSuccess}</div>}

                <div className="form-group-field mb-3">
                  <label style={{ fontSize: '0.75rem' }}>College/University Name *</label>
                  <input
                    type="text"
                    placeholder="E.g., Indian Institute of Technology (IIT), Delhi"
                    required
                    value={newColName}
                    onChange={(e) => setNewColName(e.target.value)}
                    style={{ height: '36px', fontSize: '0.82rem' }}
                  />
                </div>

                <div className="form-grid-inner-2col mb-3">
                  <div className="form-group-field">
                    <label style={{ fontSize: '0.75rem' }}>Preferred Stream *</label>
                    <select 
                      value={newColStream} 
                      onChange={(e) => {
                        const str = e.target.value;
                        setNewColStream(str);
                        setNewColExams(str === 'Management' ? 'CAT' : str === 'Medical' ? 'NEET UG' : str === 'Law' ? 'CLAT' : 'JEE Main');
                      }}
                      style={{ height: '36px', fontSize: '0.82rem', padding: '0 8px' }}
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Management">Management</option>
                      <option value="Medical">Medical</option>
                      <option value="Law">Law</option>
                      <option value="Science">Science</option>
                      <option value="Arts">Arts</option>
                    </select>
                  </div>
                  <div className="form-group-field">
                    <label style={{ fontSize: '0.75rem' }}>Average Fees / Yr (INR) *</label>
                    <input
                      type="text"
                      placeholder="E.g., 2,20,000"
                      required
                      value={newColFees}
                      onChange={(e) => setNewColFees(e.target.value)}
                      style={{ height: '36px', fontSize: '0.82rem' }}
                    />
                  </div>
                </div>

                <div className="form-grid-inner-2col mb-3">
                  <div className="form-group-field">
                    <label style={{ fontSize: '0.75rem' }}>Avg Placement Package (LPA) *</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="E.g., 8.5"
                      required
                      value={newColPlacement}
                      onChange={(e) => setNewColPlacement(e.target.value)}
                      style={{ height: '36px', fontSize: '0.82rem' }}
                    />
                  </div>
                  <div className="form-group-field">
                    <label style={{ fontSize: '0.75rem' }}>Established Year</label>
                    <input
                      type="number"
                      placeholder="E.g., 1961"
                      value={newColEstablished}
                      onChange={(e) => setNewColEstablished(e.target.value)}
                      style={{ height: '36px', fontSize: '0.82rem' }}
                    />
                  </div>
                </div>

                <div className="form-grid-inner-2col mb-3">
                  <div className="form-group-field">
                    <label style={{ fontSize: '0.75rem' }}>Campus Location (City) *</label>
                    <input
                      type="text"
                      placeholder="E.g., New Delhi"
                      required
                      value={newColLocation}
                      onChange={(e) => setNewColLocation(e.target.value)}
                      style={{ height: '36px', fontSize: '0.82rem' }}
                    />
                  </div>
                  <div className="form-group-field">
                    <label style={{ fontSize: '0.75rem' }}>State *</label>
                    <input
                      type="text"
                      placeholder="E.g., Delhi"
                      required
                      value={newColState}
                      onChange={(e) => setNewColState(e.target.value)}
                      style={{ height: '36px', fontSize: '0.82rem' }}
                    />
                  </div>
                </div>

                <div className="form-group-field mb-3">
                  <label style={{ fontSize: '0.75rem' }}>Entrance Exams Accepted (Comma separated) *</label>
                  <input
                    type="text"
                    placeholder="E.g., JEE Main, JEE Advanced"
                    required
                    value={newColExams}
                    onChange={(e) => setNewColExams(e.target.value)}
                    style={{ height: '36px', fontSize: '0.82rem' }}
                  />
                </div>

                <div className="form-group-field mb-3">
                  <label style={{ fontSize: '0.75rem' }}>Logo Theme Color (Hex Code) *</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={newColLogoColor}
                      onChange={(e) => setNewColLogoColor(e.target.value)}
                      style={{ width: '44px', height: '36px', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={newColLogoColor}
                      onChange={(e) => setNewColLogoColor(e.target.value)}
                      placeholder="#6a1b9a"
                      style={{ height: '36px', fontSize: '0.82rem', flex: 1 }}
                    />
                  </div>
                </div>

                <div className="form-group-field mb-4">
                  <label style={{ fontSize: '0.75rem' }}>Institution Description / Details</label>
                  <textarea
                    placeholder="E.g., premier B.Tech center providing premium lab infrastructures..."
                    rows={3}
                    value={newColDesc}
                    onChange={(e) => setNewColDesc(e.target.value)}
                    style={{ fontSize: '0.82rem', padding: '8px 12px', border: '1px solid rgba(12, 23, 48, 0.15)', borderRadius: 'var(--border-radius-sm)', width: '100%' }}
                  />
                </div>

                <button type="submit" className="admin-submit-btn" style={{ height: '40px', fontSize: '0.85rem' }}>
                  Save University to live DB
                </button>
              </form>
            </div>
            
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
