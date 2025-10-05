import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, TestTube, Clock, FileText, Filter, PlayCircle, CheckCircle } from 'lucide-react';

interface Test {
  id: string;
  testName: string;
  domain: string;
  duration: number;
  questions: any[];
  published: boolean;
  createdAt: string;
}

const CandidateAvailableTests = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState<Test[]>([]);
  const [filteredTests, setFilteredTests] = useState<Test[]>([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [completedTests, setCompletedTests] = useState<string[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<any>(null);

  useEffect(() => {
    // Get current candidate
    const candidate = localStorage.getItem('currentCandidate');
    if (!candidate) {
      alert('Please submit your application first');
      navigate('/candidate/apply');
      return;
    }
    setCurrentCandidate(JSON.parse(candidate));

    // Get published tests
    const storedTests = localStorage.getItem('tests');
    if (storedTests) {
      const allTests = JSON.parse(storedTests);
      const publishedTests = allTests.filter((test: Test) => test.published);
      setTests(publishedTests);
      setFilteredTests(publishedTests);
    }

    // Get completed tests for current candidate
    const results = localStorage.getItem('testResults');
    if (results && candidate) {
      const candidateResults = JSON.parse(results);
      const candidateId = JSON.parse(candidate).id;
      const completed = candidateResults
        .filter((result: any) => result.candidateId === candidateId)
        .map((result: any) => result.testId);
      setCompletedTests(completed);
    }
  }, [navigate]);

  useEffect(() => {
    if (selectedDomain) {
      setFilteredTests(tests.filter(test => test.domain === selectedDomain));
    } else {
      setFilteredTests(tests);
    }
  }, [selectedDomain, tests]);

  const domains = [...new Set(tests.map(test => test.domain))];

  const startTest = (testId: string) => {
    navigate(`/candidate/test/${testId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Available Tests</h1>
              <p className="text-gray-600">
                Welcome {currentCandidate?.name}! Take your assessments below.
              </p>
            </div>
          </div>
          <Link
            to="/candidate/results"
            className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            View Results
          </Link>
        </div>

        {domains.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex items-center mb-4">
              <Filter className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Filter by Domain</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedDomain('')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDomain === ''
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Domains
              </button>
              {domains.map((domain) => (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedDomain === domain
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>
        )}

        {filteredTests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
            <TestTube className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No Tests Available</h3>
            <p className="text-gray-400">
              {selectedDomain 
                ? `No tests available for ${selectedDomain} domain.`
                : 'No tests are currently published. Please check back later.'
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredTests.map((test) => {
              const isCompleted = completedTests.includes(test.id);
              return (
                <div key={test.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <h3 className="text-xl font-semibold text-gray-900 mr-3">{test.testName}</h3>
                          {isCompleted && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center text-gray-600">
                            <FileText className="w-4 h-4 mr-2 text-blue-500" />
                            <span className="text-sm">
                              <span className="font-medium">{test.domain}</span>
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-2 text-emerald-500" />
                            <span className="text-sm">
                              <span className="font-medium">{test.duration}</span> minutes
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <TestTube className="w-4 h-4 mr-2 text-purple-500" />
                            <span className="text-sm">
                              <span className="font-medium">{test.questions.length}</span> questions
                            </span>
                          </div>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 mb-2">Test Instructions</h4>
                          <ul className="text-blue-800 text-sm space-y-1">
                            <li>• You can attempt this test only once</li>
                            <li>• Timer will start automatically when you begin</li>
                            <li>• All questions are multiple choice</li>
                            <li>• Submit before time runs out to save your answers</li>
                          </ul>
                        </div>
                      </div>

                      <div className="ml-6">
                        <button
                          onClick={() => startTest(test.id)}
                          disabled={isCompleted}
                          className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                            isCompleted
                              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Completed
                            </>
                          ) : (
                            <>
                              <PlayCircle className="w-5 h-5 mr-2" />
                              Start Test
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateAvailableTests;