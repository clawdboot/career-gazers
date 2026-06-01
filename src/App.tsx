import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CompareShelf } from './components/CompareShelf';
import { SaarthiGPT } from './components/SaarthiGPT';
import { ShareModal } from './components/ShareModal';
import { AuthModal } from './components/AuthModal';
import { AdminView } from './views/AdminView';
import { Home } from './views/Home';
import { Directory } from './views/Directory';
import { PredictorView } from './views/PredictorView';
import { CompassView } from './views/CompassView';
import { CafView } from './views/CafView';
import { DashboardView } from './views/DashboardView';
import { collegesData, College } from './data/colleges';
import './App.css';

function App() {
  const [currentView, setView] = useState<string>('home');
  const [viewHistory, setViewHistory] = useState<string[]>(['home']);
  const [streamFilter, setStreamFilter] = useState<string>('All');
  const [selectedCompare, setSelectedCompare] = useState<College[]>([]);
  const [shortlistedColleges, setShortlistedColleges] = useState<College[]>([]);
  
  // Student auth states
  const [studentUser, setStudentUser] = useState<any | null>(() => {
    const stored = localStorage.getItem('careergazers_active_student');
    return stored ? JSON.parse(stored) : null;
  });
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  // Persistent localStorage applications & leads states
  const [applications, setApplications] = useState<any[]>(() => {
    const stored = localStorage.getItem('careergazers_applications');
    return stored ? JSON.parse(stored) : [];
  });
  const [leads, setLeads] = useState<any[]>(() => {
    const stored = localStorage.getItem('careergazers_leads');
    return stored ? JSON.parse(stored) : [];
  });

  // Dynamic colleges database state
  const [colleges, setColleges] = useState<College[]>(() => {
    const stored = localStorage.getItem('careergazers_colleges');
    return stored ? JSON.parse(stored) : collegesData;
  });

  const handleAddCollege = (newCol: College) => {
    setColleges(prev => {
      const updated = [...prev, newCol];
      localStorage.setItem('careergazers_colleges', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteCollege = (collegeId: string) => {
    setColleges(prev => {
      const updated = prev.filter(col => col.id !== collegeId);
      localStorage.setItem('careergazers_colleges', JSON.stringify(updated));
      return updated;
    });
  };

  const [preselectedCollegeName, setPreselectedCollegeName] = useState<string | null>(null);
  const [activeSelectedCollegeId, setActiveSelectedCollegeId] = useState<string | null>(null);
  const [saarthiOpen, setSaarthiOpen] = useState<boolean>(false);
  const [shareOpen, setShareOpen] = useState<boolean>(false);

  // Custom navigation wrapper to record history
  const navigateToView = (newView: string) => {
    setViewHistory(prev => {
      if (prev[prev.length - 1] === newView) return prev;
      return [...prev, newView];
    });
    setView(newView);
  };

  const handleGoBack = () => {
    if (viewHistory.length > 1) {
      const updatedHistory = [...viewHistory];
      updatedHistory.pop(); // remove current view
      const prevView = updatedHistory[updatedHistory.length - 1];
      setViewHistory(updatedHistory);
      setView(prevView);
    } else {
      setView('home');
    }
  };

  const handleStudentLogin = (user: any) => {
    setStudentUser(user);
    localStorage.setItem('careergazers_active_student', JSON.stringify(user));
  };

  const handleStudentLogout = () => {
    setStudentUser(null);
    localStorage.removeItem('careergazers_active_student');
    navigateToView('home');
  };

  // Switch to directory and load college modal
  const handleSelectCollege = (collegeId: string) => {
    setActiveSelectedCollegeId(collegeId);
    setStreamFilter('All');
    navigateToView('directory');
  };

  // Toggle college selection in bottom compare shelf
  const handleToggleCompare = (college: College) => {
    setSelectedCompare(prev => {
      const exists = prev.some(c => c.id === college.id);
      if (exists) {
        return prev.filter(c => c.id !== college.id);
      } else {
        if (prev.length >= 3) return prev; // Limit comparison to max 3
        return [...prev, college];
      }
    });
  };

  const handleRemoveCompare = (collegeId: string) => {
    setSelectedCompare(prev => prev.filter(c => c.id !== collegeId));
  };

  const handleClearCompareAll = () => {
    setSelectedCompare([]);
  };

  // Pre-fills a college and redirects to CAF form
  const handleApplyCollegeDirect = (collegeName: string) => {
    setPreselectedCollegeName(collegeName);
    navigateToView('caf');
  };

  const handleClearPreselectedCollege = () => {
    setPreselectedCollegeName(null);
  };

  // Student dashboard bookmarks manager
  const handleRemoveShortlist = (collegeId: string) => {
    setShortlistedColleges(prev => prev.filter(c => c.id !== collegeId));
  };

  const handleToggleShortlist = (college: College) => {
    setShortlistedColleges(prev => {
      const exists = prev.some(c => c.id === college.id);
      if (exists) {
        return prev.filter(c => c.id !== college.id);
      } else {
        return [...prev, college];
      }
    });
  };

  // Sync new application from CAF submissions
  const handleSubmitCAF = (newApp: any) => {
    setApplications(prev => {
      const updated = [newApp, ...prev];
      localStorage.setItem('careergazers_applications', JSON.stringify(updated));
      return updated;
    });
  };

  // Sync new counseling lead registration
  const handleAddLead = (newLead: any) => {
    setLeads(prev => {
      const updated = [newLead, ...prev];
      localStorage.setItem('careergazers_leads', JSON.stringify(updated));
      return updated;
    });
  };

  // Admin portal update callbacks
  const handleUpdateAppStatus = (appId: string, collegeId: string, newStatus: string) => {
    setApplications(prev => {
      const updated = prev.map(app => {
        if (app.id === appId) {
          return {
            ...app,
            appliedColleges: app.appliedColleges.map((col: any) => {
              if (col.id === collegeId) {
                return { ...col, status: newStatus };
              }
              return col;
            })
          };
        }
        return app;
      });
      localStorage.setItem('careergazers_applications', JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: string) => {
    setLeads(prev => {
      const updated = prev.map(lead => {
        if (lead.id === leadId) {
          return { ...lead, status: newStatus };
        }
        return lead;
      });
      localStorage.setItem('careergazers_leads', JSON.stringify(updated));
      return updated;
    });
  };

  const handleOpenChat = () => setSaarthiOpen(true);
  const handleCloseChat = () => setSaarthiOpen(false);

  return (
    <div className="app-layout">
      {/* Global Navbar */}
      <Header
        currentView={currentView}
        setView={navigateToView}
        colleges={colleges}
        onSelectCollege={handleSelectCollege}
        openChat={handleOpenChat}
        onShareOpen={() => setShareOpen(true)}
        studentUser={studentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogoutStudent={handleStudentLogout}
      />

      {/* Floating In-App Back Navigation Button */}
      {currentView !== 'home' && (
        <button className="global-back-btn animate-fadeIn" onClick={handleGoBack} title="Go Back">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back</span>
        </button>
      )}

      {/* Main View Portals */}
      <main className="main-content-scroll">
        {currentView === 'home' && (
          <Home
            setView={navigateToView}
            setStreamFilter={setStreamFilter}
            colleges={colleges}
            onSelectCollege={handleSelectCollege}
            openChat={handleOpenChat}
            onAddLead={handleAddLead}
          />
        )}
        {currentView === 'directory' && (
          <Directory
            colleges={colleges}
            setView={navigateToView}
            streamFilter={streamFilter}
            setStreamFilter={setStreamFilter}
            selectedCompare={selectedCompare}
            onToggleCompare={handleToggleCompare}
            onApplyCollegeDirect={handleApplyCollegeDirect}
            activeSelectedCollegeId={activeSelectedCollegeId}
            setActiveSelectedCollegeId={setActiveSelectedCollegeId}
          />
        )}
        {currentView === 'predictor' && (
          <PredictorView
            colleges={colleges}
            onApplyCollegeDirect={handleApplyCollegeDirect}
            studentUser={studentUser}
          />
        )}
        {currentView === 'compass' && (
          <CompassView
            setView={navigateToView}
            setStreamFilter={setStreamFilter}
          />
        )}
        {currentView === 'caf' && (
          <CafView
            colleges={colleges}
            setView={navigateToView}
            preselectedCollegeName={preselectedCollegeName}
            clearPreselectedCollege={handleClearPreselectedCollege}
            onSubmitCAF={handleSubmitCAF}
            studentUser={studentUser}
          />
        )}
        {currentView === 'dashboard' && (
          <DashboardView
            applications={applications}
            colleges={colleges}
            setView={navigateToView}
            onSelectCollege={handleSelectCollege}
            onRemoveShortlist={handleRemoveShortlist}
            shortlistedColleges={shortlistedColleges}
            studentUser={studentUser}
          />
        )}
        {currentView === 'admin' && (
          <AdminView
            applications={applications}
            leads={leads}
            onUpdateAppStatus={handleUpdateAppStatus}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            colleges={colleges}
            onAddCollege={handleAddCollege}
            onDeleteCollege={handleDeleteCollege}
          />
        )}
      </main>

      {/* Floating Bottom Compare Dock Shelf */}
      <CompareShelf
        selectedColleges={selectedCompare}
        onRemoveCollege={handleRemoveCompare}
        onClearAll={handleClearCompareAll}
        onApplyDirect={handleApplyCollegeDirect}
      />

      {/* Floating AI counselor drawer */}
      <SaarthiGPT
        isOpen={saarthiOpen}
        onClose={handleCloseChat}
        setView={navigateToView}
        onSelectCollege={handleSelectCollege}
      />

      {/* Floating Share Link modal */}
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
      />

      {/* Student Authorization Modal (Sign In / Sign Up) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleStudentLogin}
      />

      {/* Sitemap Footer */}
      <Footer setView={navigateToView} />
    </div>
  );
}

export default App;
