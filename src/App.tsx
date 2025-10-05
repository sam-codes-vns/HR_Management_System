import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing';
import HRDashboard from './components/hr/HRDashboard';
import TestCreation from './components/hr/TestCreation';
import AvailableTests from './components/hr/AvailableTests';
import HRResult from './components/hr/HRResult';
import Apply from './components/candidate/Apply';
import CandidateAvailableTests from './components/candidate/CandidateAvailableTests';
import CandidateResult from './components/candidate/CandidateResult';
import TestTaking from './components/candidate/TestTaking';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/hr/dashboard" element={<HRDashboard />} />
            <Route path="/hr/create-test" element={<TestCreation />} />
            <Route path="/hr/tests" element={<AvailableTests />} />
            <Route path="/hr/results" element={<HRResult />} />
            <Route path="/candidate/apply" element={<Apply />} />
            <Route path="/candidate/tests" element={<CandidateAvailableTests />} />
            <Route path="/candidate/test/:testId" element={<TestTaking />} />
            <Route path="/candidate/results" element={<CandidateResult />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;