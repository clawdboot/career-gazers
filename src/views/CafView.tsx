import React, { useState, useEffect } from 'react';
import { College } from '../data/colleges';

interface CafViewProps {
  colleges: College[];
  setView: (view: string) => void;
  preselectedCollegeName: string | null;
  clearPreselectedCollege: () => void;
  onSubmitCAF: (app: any) => void;
}

export const CafView: React.FC<CafViewProps> = ({
  colleges,
  setView,
  preselectedCollegeName,
  clearPreselectedCollege,
  onSubmitCAF
}) => {
  const [step, setStep] = useState(1);

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  
  const [marks10, setMarks10] = useState('');
  const [marks12, setMarks12] = useState('');
  const [entranceExam, setEntranceExam] = useState('JEE Main');
  const [entranceScore, setEntranceScore] = useState('');

  const [stream, setStream] = useState('Engineering');
  const [chosenColleges, setChosenColleges] = useState<string[]>([]);
  
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Pre-fill college preference if the user clicked "Apply Now" from another view
  useEffect(() => {
    if (preselectedCollegeName) {
      const targetCol = colleges.find(c => c.name.toLowerCase() === preselectedCollegeName.toLowerCase());
      if (targetCol) {
        setStream(targetCol.stream);
        setChosenColleges([targetCol.id]);
      }
      setStep(3); // Direct user to Preferences step
    }
  }, [preselectedCollegeName, colleges]);

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Drag and Drop simulation
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files).map(file => ({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      }));
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      }));
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (idx: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate unique Application ID
    const refId = `CAF-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Get selected college details
    const selectedCollegeObjects = colleges.filter(c => chosenColleges.includes(c.id));

    const applicationDetails = {
      id: refId,
      fullName,
      email,
      phone,
      city,
      state,
      academicSummary: {
        marks10,
        marks12,
        exam: entranceExam,
        score: entranceScore
      },
      streamPreference: stream,
      appliedColleges: selectedCollegeObjects.map(c => ({
        id: c.id,
        name: c.name,
        location: c.location,
        logoColor: c.logoColor,
        status: 'Under Review',
        date: new Date().toLocaleDateString('en-IN')
      })),
      filesCount: uploadedFiles.length,
      dateSubmitted: new Date().toLocaleDateString('en-IN')
    };

    // Pass details to parent to save in dashboard
    onSubmitCAF(applicationDetails);
    
    // Clear preselected college
    clearPreselectedCollege();
    
    // Move to step 5 (success page)
    setStep(5);
  };

  const toggleCollegeSelection = (collegeId: string) => {
    setChosenColleges(prev => {
      if (prev.includes(collegeId)) {
        return prev.filter(id => id !== collegeId);
      } else {
        if (prev.length >= 3) return prev; // Limit to max 3
        return [...prev, collegeId];
      }
    });
  };

  // Filter colleges based on selected stream preference for step 3 selection
  const preferencesFilteredColleges = colleges.filter(c => c.stream === stream);

  const stepLabels = ['Personal Details', 'Academic Records', 'Target Preferences', 'Upload Transcripts'];

  return (
    <div className="caf-view-container">
      {/* Intro Header */}
      <section className="caf-intro-banner">
        <h1>Common Application Form (CAF)</h1>
        <p>Apply to multiple accredited public and private universities through a single, secure digital interface.</p>
      </section>

      {/* Step Wizard Track */}
      {step <= 4 && (
        <div className="caf-step-wizard">
          {stepLabels.map((lbl, idx) => {
            const currentStepNum = idx + 1;
            const isCompleted = step > currentStepNum;
            const isActive = step === currentStepNum;
            return (
              <div key={idx} className={`wizard-step-node ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                <div className="step-circle">{isCompleted ? '✓' : currentStepNum}</div>
                <span className="step-label">{lbl}</span>
                {idx < 3 && <div className="step-connector" />}
              </div>
            );
          })}
        </div>
      )}

      {/* Main Form Box */}
      <div className="caf-form-wrapper">
        <form onSubmit={handleSubmit}>
          
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <div className="form-step-panel animate-fadeIn">
              <h3>Step 1: Student Information</h3>
              <p className="step-subtitle">Provide your primary contact data. Notifications on counselor matching will be sent here.</p>

              <div className="form-grid-2col">
                <div className="form-group-field">
                  <label>Full Student Name *</label>
                  <input
                    type="text"
                    placeholder="E.g., Rahul Sharma"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="form-group-field">
                  <label>Contact Phone Number (Mobile) *</label>
                  <input
                    type="tel"
                    placeholder="10-Digit Mobile Number"
                    required
                    pattern="[0-9]{10}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group-field">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    placeholder="rahul@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-grid-inner-2col">
                  <div className="form-group-field">
                    <label>City *</label>
                    <input
                      type="text"
                      placeholder="New Delhi"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="form-group-field">
                    <label>State *</label>
                    <input
                      type="text"
                      placeholder="Delhi"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-navigation-row">
                <div />
                <button type="button" className="btn-next-step" disabled={!fullName || !email || !phone || !city || !state} onClick={handleNextStep}>
                  Next Step: Academic Records →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Academics */}
          {step === 2 && (
            <div className="form-step-panel animate-fadeIn">
              <h3>Step 2: Academic Achievements</h3>
              <p className="step-subtitle">Provide your school boards performance and competitive exam marks.</p>

              <div className="form-grid-2col">
                <div className="form-group-field">
                  <label>10th Class Percentage / CGPA *</label>
                  <input
                    type="text"
                    placeholder="E.g., 92% or 9.5 CGPA"
                    required
                    value={marks10}
                    onChange={(e) => setMarks10(e.target.value)}
                  />
                </div>
                <div className="form-group-field">
                  <label>12th Class Percentage / Projected Score *</label>
                  <input
                    type="text"
                    placeholder="E.g., 88%"
                    required
                    value={marks12}
                    onChange={(e) => setMarks12(e.target.value)}
                  />
                </div>
                <div className="form-group-field">
                  <label>Competitive Entrance Exam taken</label>
                  <select value={entranceExam} onChange={(e) => setEntranceExam(e.target.value)}>
                    <option value="JEE Main">JEE Main</option>
                    <option value="JEE Advanced">JEE Advanced</option>
                    <option value="BITSAT">BITSAT</option>
                    <option value="NEET UG">NEET UG</option>
                    <option value="CAT">CAT (Management)</option>
                    <option value="XAT">XAT (Management)</option>
                    <option value="CLAT">CLAT (Law)</option>
                    <option value="CUET UG">CUET UG</option>
                    <option value="None">None / Board Merit Only</option>
                  </select>
                </div>
                {entranceExam !== 'None' && (
                  <div className="form-group-field animate-slideUp">
                    <label>Entrance Score / All India Rank (AIR)</label>
                    <input
                      type="text"
                      placeholder="E.g., AIR 4500 or 98.4 Percentile"
                      required={entranceExam !== 'None'}
                      value={entranceScore}
                      onChange={(e) => setEntranceScore(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="form-navigation-row">
                <button type="button" className="btn-prev-step" onClick={handlePrevStep}>← Previous Step</button>
                <button type="button" className="btn-next-step" disabled={!marks10 || !marks12} onClick={handleNextStep}>
                  Next Step: College Preferences →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Preferences */}
          {step === 3 && (
            <div className="form-step-panel animate-fadeIn">
              <h3>Step 3: College Preferences</h3>
              <p className="step-subtitle">Select your stream and pick up to 3 target universities to direct your CAF application.</p>

              <div className="form-group-field">
                <label>Target Academic Stream</label>
                <select value={stream} onChange={(e) => { setStream(e.target.value); setChosenColleges([]); }}>
                  <option value="Engineering">Engineering & Technology</option>
                  <option value="Management">Management (MBA/BBA)</option>
                  <option value="Medical">Medical Science & Nursing</option>
                  <option value="Law">Legal Studies (LL.B.)</option>
                  <option value="Science">Sciences</option>
                  <option value="Arts">Arts & Liberal Humanities</option>
                </select>
              </div>

              <div className="preference-colleges-selector-panel">
                <label>Select Target Colleges (Select up to 3) *</label>
                <div className="preference-colleges-list">
                  {preferencesFilteredColleges.map((college) => {
                    const selected = chosenColleges.includes(college.id);
                    return (
                      <div
                        key={college.id}
                        className={`pref-college-item-row ${selected ? 'selected' : ''}`}
                        onClick={() => toggleCollegeSelection(college.id)}
                      >
                        <div className="pref-checkbox">
                          {selected && <span className="pref-checkbox-check">✓</span>}
                        </div>
                        <div className="pref-meta-info">
                          <h4>{college.name}</h4>
                          <p>{college.location}, {college.state} • Avg Package: {college.avgPlacement} LPA</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {chosenColleges.length === 0 && <span className="pref-error-text">Please choose at least 1 college to submit applications.</span>}
                <div className="selected-counter">Selected: <strong>{chosenColleges.length} / 3</strong> colleges</div>
              </div>

              <div className="form-navigation-row">
                <button type="button" className="btn-prev-step" onClick={() => { handlePrevStep(); clearPreselectedCollege(); }}>← Previous Step</button>
                <button type="button" className="btn-next-step" disabled={chosenColleges.length === 0} onClick={handleNextStep}>
                  Next Step: Upload Transcripts →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Documents Upload */}
          {step === 4 && (
            <div className="form-step-panel animate-fadeIn">
              <h3>Step 4: Supporting Documents Upload</h3>
              <p className="step-subtitle">Upload simulated transcripts (10th/12th marksheets, competitive scorecards) to complete verification audits.</p>

              <div
                className={`drag-and-drop-container ${dragActive ? 'active' : ''}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="caf-file-upload"
                  multiple
                  className="hidden-file-input"
                  onChange={handleFileChange}
                />
                
                <svg className="h-12 w-12 text-muted mb-2 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                
                <h4>Drag & Drop files here or <label htmlFor="caf-file-upload" className="browse-files-lbl">browse files</label></h4>
                <p>Accepts simulated marksheets and ID proof files (.pdf, .jpg, .png)</p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="uploaded-files-list-box animate-fadeIn">
                  <h4>Uploaded Files ({uploadedFiles.length})</h4>
                  <div className="files-items-grid">
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="file-item-card">
                        <div className="file-icon-block">📄</div>
                        <div className="file-details-block">
                          <span className="file-name-span">{file.name}</span>
                          <span className="file-size-span">{file.size}</span>
                        </div>
                        <button type="button" className="remove-file-btn" onClick={() => removeFile(idx)}>×</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="form-navigation-row">
                <button type="button" className="btn-prev-step" onClick={handlePrevStep}>← Previous Step</button>
                <button type="submit" className="btn-submit-caf">
                  Submit Common Application Form
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Success Receipt */}
          {step === 5 && (
            <div className="caf-success-card animate-scaleUp">
              <div className="success-lottie-icon">✓</div>
              <h2>Common Application Submitted Successfully!</h2>
              <p>Your unified CAF profile has been audited and transmitted directly to the admissions cells of your selected colleges.</p>

              <div className="receipt-ref-code-box">
                <span>Unified Registration Number</span>
                <h3>CAF-2026-{Math.random().toString(36).substring(2, 8).toUpperCase()}</h3>
              </div>

              <div className="receipt-details-table">
                <div className="receipt-row">
                  <span>Student Name:</span>
                  <strong>{fullName}</strong>
                </div>
                <div className="receipt-row">
                  <span>Contact Mobile:</span>
                  <strong>{phone}</strong>
                </div>
                <div className="receipt-row">
                  <span>Registered Email:</span>
                  <strong>{email}</strong>
                </div>
                <div className="receipt-row">
                  <span>Stream Preferred:</span>
                  <strong>{stream}</strong>
                </div>
                <div className="receipt-row">
                  <span>Selected Institutions:</span>
                  <strong>{colleges.filter(c => chosenColleges.includes(c.id)).map(c => c.name.split(',')[0]).join(', ')}</strong>
                </div>
              </div>

              <p className="success-dashboard-hint">You can track real-time application reviews, counselor comments, and college shortlist statuses under your dashboard.</p>

              <button type="button" className="go-to-dashboard-btn" onClick={() => setView('dashboard')}>
                Go to Application Dashboard
              </button>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};
