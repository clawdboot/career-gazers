import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CompareShelf } from './components/CompareShelf';
import { SaarthiGPT } from './components/SaarthiGPT';
import { ShareModal } from './components/ShareModal';
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
  const [streamFilter, setStreamFilter] = useState<string>('All');
  const [selectedCompare, setSelectedCompare] = useState<College[]>([]);
  const [shortlistedColleges, setShortlistedColleges] = useState<College[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [preselectedCollegeName, setPreselectedCollegeName] = useState<string | null>(null);
  const [activeSelectedCollegeId, setActiveSelectedCollegeId] = useState<string | null>(null);
  const [saarthiOpen, setSaarthiOpen] = useState<boolean>(false);
  const [shareOpen, setShareOpen] = useState<boolean>(false);

  // Switch to directory and load college modal
  const handleSelectCollege = (collegeId: string) => {
    setActiveSelectedCollegeId(collegeId);
    setStreamFilter('All');
    setView('directory');
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
    setView('caf');
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

  // Append new application from CAF submissions
  const handleSubmitCAF = (newApp: any) => {
    setApplications(prev => [newApp, ...prev]);
  };

  const handleOpenChat = () => setSaarthiOpen(true);
  const handleCloseChat = () => setSaarthiOpen(false);

  return (
    <div className="app-layout">
      {/* Global Navbar */}
      <Header
        currentView={currentView}
        setView={setView}
        colleges={collegesData}
        onSelectCollege={handleSelectCollege}
        openChat={handleOpenChat}
        onShareOpen={() => setShareOpen(true)}
      />

      {/* Main View Portals */}
      <main className="main-content-scroll">
        {currentView === 'home' && (
          <Home
            setView={setView}
            setStreamFilter={setStreamFilter}
            colleges={collegesData}
            onSelectCollege={handleSelectCollege}
            openChat={handleOpenChat}
          />
        )}
        {currentView === 'directory' && (
          <Directory
            colleges={collegesData}
            setView={setView}
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
            colleges={collegesData}
            onApplyCollegeDirect={handleApplyCollegeDirect}
          />
        )}
        {currentView === 'compass' && (
          <CompassView
            setView={setView}
            setStreamFilter={setStreamFilter}
          />
        )}
        {currentView === 'caf' && (
          <CafView
            colleges={collegesData}
            setView={setView}
            preselectedCollegeName={preselectedCollegeName}
            clearPreselectedCollege={handleClearPreselectedCollege}
            onSubmitCAF={handleSubmitCAF}
          />
        )}
        {currentView === 'dashboard' && (
          <DashboardView
            applications={applications}
            colleges={collegesData}
            setView={setView}
            onSelectCollege={handleSelectCollege}
            onRemoveShortlist={handleRemoveShortlist}
            shortlistedColleges={shortlistedColleges}
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
        setView={setView}
        onSelectCollege={handleSelectCollege}
      />

      {/* Floating Share Link modal */}
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
      />

      {/* Sitemap Footer */}
      <Footer setView={setView} />
    </div>
  );
}

export default App;
