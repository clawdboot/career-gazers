import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Sign Up Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [marks10, setMarks10] = useState('');
  const [marks12, setMarks12] = useState('');
  const [stream, setStream] = useState('Engineering');
  const [exam, setExam] = useState('None');
  const [score, setScore] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Fetch existing registered users
    const storedUsers = localStorage.getItem('careergazers_registered_students');
    const usersList = storedUsers ? JSON.parse(storedUsers) : [];

    if (isSignUp) {
      // Sign Up Validation
      const userExists = usersList.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        setErrorMsg('An account with this email already exists. Try Signing In.');
        return;
      }

      // Create new user profile
      const newUser = {
        fullName,
        email: email.toLowerCase(),
        phone,
        password, // Simulating simple local storage auth
        academics: {
          marks10,
          marks12,
          exam,
          score
        },
        streamPreference: stream,
        dateJoined: new Date().toLocaleDateString('en-IN')
      };

      // Save user to registered list
      usersList.push(newUser);
      localStorage.setItem('careergazers_registered_students', JSON.stringify(usersList));

      // Auto login
      setSuccessMsg('Account registered successfully! Logging in...');
      setTimeout(() => {
        onLoginSuccess(newUser);
        onClose();
        resetForm();
      }, 1500);

    } else {
      // Sign In Validation
      const matchedUser = usersList.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      
      // Default fallback mock user if list is empty (so they can test easily)
      if (!matchedUser && email.toLowerCase() === 'student@careergazers.com' && password === 'student123') {
        const defaultUser = {
          fullName: 'Rahul Sharma',
          email: 'student@careergazers.com',
          phone: '9876543210',
          academics: {
            marks10: '92.4%',
            marks12: '88.5%',
            exam: 'JEE Main',
            score: 'AIR 14200'
          },
          streamPreference: 'Engineering',
          dateJoined: '25/05/2026'
        };
        setSuccessMsg('Logging in with pre-seeded test profile...');
        setTimeout(() => {
          onLoginSuccess(defaultUser);
          onClose();
          resetForm();
        }, 1200);
        return;
      }

      if (matchedUser) {
        setSuccessMsg('Signed in successfully!');
        setTimeout(() => {
          onLoginSuccess(matchedUser);
          onClose();
          resetForm();
        }, 1200);
      } else {
        setErrorMsg('Invalid Email or Password. Try student@careergazers.com / student123');
      }
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setPhone('');
    setMarks10('');
    setMarks12('');
    setStream('Engineering');
    setExam('None');
    setScore('');
    setErrorMsg('');
    setSuccessMsg('');
  };

  return (
    <div className="compare-modal-backdrop animate-fadeIn" style={{ zIndex: 1090 }}>
      <div className="auth-modal-card animate-scaleUp" style={{ maxWidth: isSignUp ? '680px' : '440px' }}>
        
        {/* Header */}
        <div className="auth-modal-header">
          <h3>{isSignUp ? 'Create Student Profile' : 'Student Sign In'}</h3>
          <button className="close-share-btn" onClick={() => { onClose(); resetForm(); }}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="auth-modal-body">
            
            {errorMsg && <div className="admin-login-error animate-slideUp">{errorMsg}</div>}
            {successMsg && <div className="admin-login-success-toast animate-slideUp">{successMsg}</div>}

            {/* TAB SELECTORS */}
            <div className="auth-tabs-row">
              <button 
                type="button" 
                className={`auth-tab-btn ${!isSignUp ? 'active' : ''}`}
                onClick={() => { setIsSignUp(false); setErrorMsg(''); }}
              >
                Sign In
              </button>
              <button 
                type="button" 
                className={`auth-tab-btn ${isSignUp ? 'active' : ''}`}
                onClick={() => { setIsSignUp(true); setErrorMsg(''); }}
              >
                Sign Up (New Candidate)
              </button>
            </div>

            <div className="auth-fields-layout" style={{ display: isSignUp ? 'grid' : 'block', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              
              {/* LEFT COLUMN / GENERAL FIELDS */}
              <div className="auth-fields-column">
                {isSignUp && (
                  <div className="form-group-field mb-4">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="E.g. Rahul Sharma" 
                      required 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                )}

                <div className="form-group-field mb-4">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    placeholder="student@careergazers.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {isSignUp && (
                  <div className="form-group-field mb-4">
                    <label>Phone Number *</label>
                    <input 
                      type="tel" 
                      placeholder="10-Digit Mobile" 
                      required 
                      pattern="[0-9]{10}"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                )}

                <div className="form-group-field mb-4">
                  <label>Password *</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* RIGHT COLUMN / ACADEMICS (Sign Up Only) */}
              {isSignUp && (
                <div className="auth-fields-column academic-box-highlight-auth">
                  <h4>Academic Profiler</h4>
                  <p className="newsletter-subtitle mb-4">Seeding these details enables personalized predictions and CAF pre-fills.</p>

                  <div className="form-grid-inner-2col mb-3">
                    <div className="form-group-field">
                      <label>10th Score (%) *</label>
                      <input 
                        type="text" 
                        placeholder="E.g. 92.4%" 
                        required 
                        value={marks10}
                        onChange={(e) => setMarks10(e.target.value)}
                      />
                    </div>
                    <div className="form-group-field">
                      <label>12th Score (%) *</label>
                      <input 
                        type="text" 
                        placeholder="E.g. 88.5%" 
                        required 
                        value={marks12}
                        onChange={(e) => setMarks12(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group-field mb-3">
                    <label>Preferred Stream</label>
                    <select value={stream} onChange={(e) => setStream(e.target.value)}>
                      <option value="Engineering">Engineering</option>
                      <option value="Management">Management</option>
                      <option value="Medical">Medical</option>
                      <option value="Law">Law</option>
                      <option value="Science">Science</option>
                      <option value="Arts">Arts</option>
                    </select>
                  </div>

                  <div className="form-group-field mb-3">
                    <label>Entrance Exam taken</label>
                    <select value={exam} onChange={(e) => { setExam(e.target.value); setScore(''); }}>
                      <option value="None">None</option>
                      <option value="JEE Main">JEE Main</option>
                      <option value="NEET UG">NEET UG</option>
                      <option value="CAT">CAT</option>
                      <option value="CLAT">CLAT</option>
                      <option value="CUET UG">CUET UG</option>
                    </select>
                  </div>

                  {exam !== 'None' && (
                    <div className="form-group-field mb-3 animate-slideUp">
                      <label>Exam Score / Rank</label>
                      <input 
                        type="text" 
                        placeholder="E.g. AIR 14200" 
                        required 
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              )}

            </div>

            <button type="submit" className="admin-submit-btn mt-6">
              {isSignUp ? 'Register & Log In' : 'Sign In to Portal'}
            </button>

            {!isSignUp && (
              <div className="admin-credentials-helper">
                <h4>💡 Pre-seeded Student Test Profile:</h4>
                <p>Username: <code>student@careergazers.com</code></p>
                <p>Password: <code>student123</code></p>
              </div>
            )}

          </div>
        </form>

      </div>
    </div>
  );
};
