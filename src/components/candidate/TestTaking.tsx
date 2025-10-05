import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, AlertCircle, Send } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
}

interface Test {
  id: string;
  testName: string;
  domain: string;
  duration: number;
  questions: Question[];
}

const TestTaking = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState<Test | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    // Get test details
    const storedTests = localStorage.getItem('tests');
    if (storedTests) {
      const tests = JSON.parse(storedTests);
      const foundTest = tests.find((t: Test) => t.id === testId);
      if (foundTest) {
        setTest(foundTest);
        setTimeLeft(foundTest.duration * 60); // Convert minutes to seconds
      } else {
        alert('Test not found');
        navigate('/candidate/tests');
      }
    }
  }, [testId, navigate]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitting) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && test) {
      // Auto-submit when time is up
      handleSubmit();
    }
  }, [timeLeft, test, isSubmitting]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    if (!test || !currentCandidate) return;

    setIsSubmitting(true);

    // Calculate results
    let correct = 0;
    let attempted = 0;

    test.questions.forEach(question => {
      if (answers[question.id]) {
        attempted++;
        if (answers[question.id] === question.correctAnswer) {
          correct++;
        }
      }
    });

    const score = Math.round((correct / test.questions.length) * 100);

    // For demo purposes, randomly assign DSA skill
    const hasDSASkill = Math.random() > 0.5;

    const result = {
      id: Date.now().toString(),
      candidateId: currentCandidate.id,
      candidateName: currentCandidate.name,
      testId: test.id,
      testName: test.testName,
      totalQuestions: test.questions.length,
      attempted,
      correct,
      score,
      hasDSASkill,
      answers,
      completedAt: new Date().toISOString()
    };

    // Store result
    const existingResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    localStorage.setItem('testResults', JSON.stringify([...existingResults, result]));

    // Store current candidate result for quick access
    localStorage.setItem('currentCandidateResult', JSON.stringify(result));

    alert('Test submitted successfully!');
    navigate('/candidate/results');
  };

  if (!test || !currentCandidate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = test.questions[currentQuestionIndex];
  const isTimeRunningOut = timeLeft <= 300; // Less than 5 minutes

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{test.testName}</h1>
              <p className="text-gray-600">{test.domain} • {currentCandidate.name}</p>
            </div>
            <div className={`flex items-center px-4 py-2 rounded-lg font-semibold ${
              isTimeRunningOut ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              <Clock className="w-5 h-5 mr-2" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Palette */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-4">Question Palette</h3>
              <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                {test.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      index === currentQuestionIndex
                        ? 'bg-blue-600 text-white'
                        : answers[test.questions[index].id]
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
                  <span className="text-gray-600">Current</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-emerald-100 border border-emerald-300 rounded mr-2"></div>
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded mr-2"></div>
                  <span className="text-gray-600">Not Visited</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Question {currentQuestionIndex + 1} of {test.questions.length}
                  </h2>
                  {answers[currentQuestion.id] && (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  )}
                </div>
                <p className="text-gray-800 text-lg leading-relaxed mb-6">
                  {currentQuestion.question}
                </p>

                <div className="space-y-3">
                  {['A', 'B', 'C', 'D'].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        answers[currentQuestion.id] === option
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={option}
                        checked={answers[currentQuestion.id] === option}
                        onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                        answers[currentQuestion.id] === option
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {answers[currentQuestion.id] === option && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="text-gray-800">
                        <strong>{option}.</strong> {currentQuestion[`option${option}` as keyof Question]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentQuestionIndex(Math.min(test.questions.length - 1, currentQuestionIndex + 1))}
                    disabled={currentQuestionIndex === test.questions.length - 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Test
                    </>
                  )}
                </button>
              </div>
            </div>

            {isTimeRunningOut && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  <p className="text-red-800 font-medium">
                    Warning: Less than 5 minutes remaining! Please submit your test soon.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTaking;