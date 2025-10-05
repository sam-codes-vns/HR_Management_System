import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, TestTube, BarChart3, Download, Eye, ArrowLeft, Trash2, AlertTriangle } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  degree: string;
  experience: string;
  resumeFile: string;
  appliedAt: string;
}

const HRDashboard = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [showClearModal, setShowClearModal] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('candidates');
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  const downloadResume = (candidate: Candidate) => {
    const resumeData = localStorage.getItem(`resume_${candidate.id}`);
    if (resumeData) {
      const link = document.createElement('a');
      link.href = resumeData;
      link.download = `${candidate.name}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const clearAllData = async () => {
    setIsClearing(true);
    
    try {
      // Clear candidates data
      localStorage.removeItem('candidates');
      
      // Clear all resume files
      candidates.forEach(candidate => {
        localStorage.removeItem(`resume_${candidate.id}`);
      });
      
      // Clear test results
      localStorage.removeItem('testResults');
      
      // Clear current candidate session
      localStorage.removeItem('currentCandidate');
      localStorage.removeItem('currentCandidateResult');
      
      // Update state
      setCandidates([]);
      setShowClearModal(false);
      
      alert('All candidate data has been cleared successfully! Ready for new recruitment cycle.');
    } catch (error) {
      alert('Error clearing data. Please try again.');
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">HR Dashboard</h1>
              <p className="text-gray-600">Manage candidates, tests, and recruitment process</p>
            </div>
          </div>
          
          {candidates.length > 0 && (
            <button
              onClick={() => setShowClearModal(true)}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Data
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Link to="/hr/create-test" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <TestTube className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Create Test</h3>
                  <p className="text-gray-600 text-sm">Build new assessments</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/hr/tests" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <div className="flex items-center">
                <div className="bg-emerald-100 rounded-lg p-3 mr-4">
                  <FileText className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Manage Tests</h3>
                  <p className="text-gray-600 text-sm">View & publish tests</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/hr/results" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-lg p-3 mr-4">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">View Results</h3>
                  <p className="text-gray-600 text-sm">Candidate scores</p>
                </div>
              </div>
            </div>
          </Link>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-lg p-3 mr-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Candidates</h3>
                <p className="text-2xl font-bold text-orange-600">{candidates.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Candidate Applications</h2>
                <p className="text-gray-600 mt-1">Review all submitted applications</p>
              </div>
              {candidates.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                  <p className="text-blue-800 text-sm font-medium">
                    Current Recruitment Cycle: {candidates.length} applications
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            {candidates.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">No Applications Yet</h3>
                <p className="text-gray-400">Candidates will appear here once they submit their applications.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Degree</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Experience</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Applied Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Resume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {candidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{candidate.name}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{candidate.degree}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {candidate.experience}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(candidate.appliedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => downloadResume(candidate)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Clear Data Confirmation Modal */}
        {showClearModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 rounded-full p-3 mr-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Clear All Data</h3>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  This action will permanently delete:
                </p>
                <ul className="text-sm text-gray-600 space-y-2 bg-red-50 border border-red-200 rounded-lg p-4">
                  <li>• All candidate applications ({candidates.length} records)</li>
                  <li>• All uploaded resume files</li>
                  <li>• All test results and scores</li>
                  <li>• Current candidate sessions</li>
                </ul>
                <p className="text-red-600 font-medium mt-4 text-sm">
                  ⚠️ This action cannot be undone!
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">Use Case</h4>
                <p className="text-blue-800 text-sm">
                  Use this feature to start a fresh recruitment cycle for the new year or new hiring season.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowClearModal(false)}
                  disabled={isClearing}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={clearAllData}
                  disabled={isClearing}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isClearing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Clearing...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All Data
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRDashboard;