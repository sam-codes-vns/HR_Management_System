import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TestTube, Clock, FileText, Globe, Eye } from 'lucide-react';

interface Test {
  id: string;
  testName: string;
  domain: string;
  duration: number;
  questions: any[];
  published: boolean;
  createdAt: string;
}

const AvailableTests = () => {
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    const storedTests = localStorage.getItem('tests');
    if (storedTests) {
      setTests(JSON.parse(storedTests));
    }
  }, []);

  const togglePublish = (testId: string) => {
    const updatedTests = tests.map(test => 
      test.id === testId ? { ...test, published: !test.published } : test
    );
    setTests(updatedTests);
    localStorage.setItem('tests', JSON.stringify(updatedTests));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/hr/dashboard" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Tests</h1>
            <p className="text-gray-600">View and publish your created assessments</p>
          </div>
        </div>

        {tests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
            <TestTube className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No Tests Created</h3>
            <p className="text-gray-400 mb-6">Create your first test to get started with candidate assessments.</p>
            <Link
              to="/hr/create-test"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <TestTube className="w-5 h-5 mr-2" />
              Create Your First Test
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {tests.map((test) => (
              <div key={test.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 mr-3">{test.testName}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          test.published 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {test.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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
                        <div className="flex items-center text-gray-600">
                          <Globe className="w-4 h-4 mr-2 text-orange-500" />
                          <span className="text-sm">
                            Created {new Date(test.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Questions Preview</h4>
                        <div className="space-y-2">
                          {test.questions.slice(0, 2).map((question, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              <span className="font-medium">{index + 1}.</span> {question.question}
                            </div>
                          ))}
                          {test.questions.length > 2 && (
                            <div className="text-sm text-gray-500">
                              ... and {test.questions.length - 2} more questions
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 flex flex-col space-y-3">
                      <button
                        onClick={() => togglePublish(test.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          test.published
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        }`}
                      >
                        {test.published ? 'Unpublish' : 'Publish'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/hr/create-test"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <TestTube className="w-5 h-5 mr-2" />
            Create New Test
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AvailableTests;