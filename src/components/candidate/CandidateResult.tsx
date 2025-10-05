import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Clock, Trophy, AlertCircle, Star } from 'lucide-react';

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

const CandidateResult = () => {
  const [result, setResult] = useState<TestResult | null>(null);
  const [currentCandidate, setCurrentCandidate] = useState<any>(null);

  useEffect(() => {
    // Get current candidate
    const candidate = localStorage.getItem('currentCandidate');
    if (candidate) {
      setCurrentCandidate(JSON.parse(candidate));
    }

    // Get latest result for current candidate
    const storedResult = localStorage.getItem('currentCandidateResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, []);

  if (!result || !currentCandidate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8">
            <Link to="/candidate/tests" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Test Results</h1>
              <p className="text-gray-600">View your assessment performance</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No Results Available</h3>
            <p className="text-gray-400 mb-6">Complete a test to see your results here.</p>
            <Link
              to="/candidate/tests"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Take a Test
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getSelectionStatus = () => {
    if (result.score >= 80 && result.hasDSASkill) {
      return {
        status: 'Selected',
        message: 'Congratulations! You are selected for Software Development Role',
        color: 'emerald',
        icon: Trophy
      };
    }
    return {
      status: 'Not Selected',
      message: 'Better luck next time! Keep practicing and try again.',
      color: 'red',
      icon: AlertCircle
    };
  };

  const selection = getSelectionStatus();
  const StatusIcon = selection.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/candidate/tests" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Test Results</h1>
            <p className="text-gray-600">Your assessment performance and selection status</p>
          </div>
        </div>

        {/* Selection Status */}
        <div className={`bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 ${
          selection.color === 'emerald' ? 'border-emerald-500' : 'border-red-500'
        }`}>
          <div className="flex items-center mb-4">
            <div className={`p-3 rounded-full mr-4 ${
              selection.color === 'emerald' ? 'bg-emerald-100' : 'bg-red-100'
            }`}>
              <StatusIcon className={`w-8 h-8 ${
                selection.color === 'emerald' ? 'text-emerald-600' : 'text-red-600'
              }`} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${
                selection.color === 'emerald' ? 'text-emerald-900' : 'text-red-900'
              }`}>
                {selection.status}
              </h2>
              <p className={`text-lg ${
                selection.color === 'emerald' ? 'text-emerald-700' : 'text-red-700'
              }`}>
                {selection.message}
              </p>
            </div>
          </div>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
            <div className="bg-blue-100 rounded-full p-3 w-fit mx-auto mb-3">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-1">{result.score}%</p>
            <p className="text-gray-600 text-sm">Overall Score</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
            <div className="bg-emerald-100 rounded-full p-3 w-fit mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-emerald-600 mb-1">{result.correct}</p>
            <p className="text-gray-600 text-sm">Correct Answers</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
            <div className="bg-red-100 rounded-full p-3 w-fit mx-auto mb-3">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600 mb-1">{result.attempted - result.correct}</p>
            <p className="text-gray-600 text-sm">Wrong Answers</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
            <div className="bg-gray-100 rounded-full p-3 w-fit mx-auto mb-3">
              <Clock className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-3xl font-bold text-gray-600 mb-1">{result.totalQuestions - result.attempted}</p>
            <p className="text-gray-600 text-sm">Not Attempted</p>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Test Details</h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Test Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Test Name:</span>
                    <span className="font-medium text-gray-900">{result.testName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Candidate:</span>
                    <span className="font-medium text-gray-900">{result.candidateName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(result.completedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Performance Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Questions:</span>
                    <span className="font-medium text-gray-900">{result.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions Attempted:</span>
                    <span className="font-medium text-gray-900">{result.attempted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">DSA Skills:</span>
                    <span className={`font-medium ${result.hasDSASkill ? 'text-emerald-600' : 'text-gray-500'}`}>
                      {result.hasDSASkill ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Score Progress</span>
                <span>{result.score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    result.score >= 80 ? 'bg-emerald-500' :
                    result.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(result.score, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span className="text-yellow-600">60%</span>
                <span className="text-emerald-600">80%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Next Steps</h4>
              {selection.status === 'Selected' ? (
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Our HR team will contact you within 2-3 business days</li>
                  <li>• Prepare for the technical interview round</li>
                  <li>• Keep your documents ready for verification</li>
                  <li>• Check your email regularly for updates</li>
                </ul>
              ) : (
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Review the test topics and practice more</li>
                  <li>• Strengthen your DSA and technical fundamentals</li>
                  <li>• Apply for other available positions</li>
                  <li>• Consider retaking the test after skill improvement</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/candidate/tests"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold mr-4"
          >
            Back to Tests
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CandidateResult;