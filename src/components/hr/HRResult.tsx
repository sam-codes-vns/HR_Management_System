import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, CheckCircle, XCircle, User, Trophy, Clock } from 'lucide-react';

interface TestResult {
  id: string;
  candidateName: string;
  testName: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  score: number;
  completedAt: string;
  hasDSASkill: boolean;
}

const HRResult = () => {
  const [results, setResults] = useState<TestResult[]>([]);

  useEffect(() => {
    const storedResults = localStorage.getItem('testResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  const getSelectionStatus = (result: TestResult) => {
    if (result.score >= 80 && result.hasDSASkill) {
      return {
        status: 'Selected',
        message: 'You are selected for Software Development Role',
        color: 'emerald'
      };
    }
    return {
      status: 'Not Selected',
      message: 'Better luck next time!',
      color: 'red'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/hr/dashboard" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Test Results</h1>
            <p className="text-gray-600">Review candidate performance and selection status</p>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No Results Available</h3>
            <p className="text-gray-400">Test results will appear here once candidates complete their assessments.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-lg p-3 mr-4">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Attempts</p>
                    <p className="text-2xl font-bold text-blue-600">{results.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="bg-emerald-100 rounded-lg p-3 mr-4">
                    <Trophy className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Selected</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {results.filter(r => r.score >= 80 && r.hasDSASkill).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="bg-orange-100 rounded-lg p-3 mr-4">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Score</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {results.length > 0 ? Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length) : 0}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-lg p-3 mr-4">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">This Week</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {results.filter(r => {
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return new Date(r.completedAt) > weekAgo;
                      }).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Detailed Results</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Candidate</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Test</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Performance</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Score</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">DSA Skill</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {results.map((result) => {
                      const selection = getSelectionStatus(result);
                      return (
                        <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{result.candidateName}</div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{result.testName}</td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-1" />
                                  <span className="text-emerald-600 font-medium">{result.correct}</span>
                                </div>
                                <div className="flex items-center">
                                  <XCircle className="w-4 h-4 text-red-500 mr-1" />
                                  <span className="text-red-600 font-medium">{result.attempted - result.correct}</span>
                                </div>
                                <div className="text-gray-500">
                                  {result.totalQuestions - result.attempted} unattempted
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${
                              result.score >= 80 ? 'bg-emerald-100 text-emerald-800' :
                              result.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {result.score}%
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              result.hasDSASkill ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {result.hasDSASkill ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              selection.color === 'emerald' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {selection.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600 text-sm">
                            {new Date(result.completedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRResult;