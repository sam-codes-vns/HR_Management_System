import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Plus, Trash2, Save, TestTube } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
}

interface TestForm {
  testName: string;
  domain: string;
  duration: number;
}

const TestCreation = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A'
  });

  const { register, handleSubmit, formState: { errors } } = useForm<TestForm>();

  const addQuestion = () => {
    if (!currentQuestion.question.trim()) return;

    const newQuestion: Question = {
      id: Date.now().toString(),
      ...currentQuestion
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion({
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 'A'
    });
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const onSubmit = (data: TestForm) => {
    if (questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    const test = {
      id: Date.now().toString(),
      ...data,
      questions,
      published: false,
      createdAt: new Date().toISOString()
    };

    const existingTests = JSON.parse(localStorage.getItem('tests') || '[]');
    localStorage.setItem('tests', JSON.stringify([...existingTests, test]));

    alert('Test created successfully!');
    navigate('/hr/tests');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/hr/dashboard" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Test</h1>
            <p className="text-gray-600">Build a new assessment for candidates</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <TestTube className="w-5 h-5 mr-2 text-blue-600" />
              Test Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Test Name *
                </label>
                <input
                  type="text"
                  {...register('testName', { required: 'Test name is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., React Basics Assessment"
                />
                {errors.testName && (
                  <p className="text-red-500 text-sm mt-1">{errors.testName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Domain *
                </label>
                <select
                  {...register('domain', { required: 'Domain is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Domain</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="DevOps">DevOps</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Quality Assurance">Quality Assurance</option>
                </select>
                {errors.domain && (
                  <p className="text-red-500 text-sm mt-1">{errors.domain.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  {...register('duration', { 
                    required: 'Duration is required',
                    min: { value: 5, message: 'Minimum duration is 5 minutes' },
                    max: { value: 180, message: 'Maximum duration is 180 minutes' }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="30"
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Questions</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Question Text *
                </label>
                <textarea
                  value={currentQuestion.question}
                  onChange={(e) => setCurrentQuestion({...currentQuestion, question: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows={3}
                  placeholder="Enter your question here..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['A', 'B', 'C', 'D'].map((option) => (
                  <div key={option}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Option {option} *
                    </label>
                    <input
                      type="text"
                      value={currentQuestion[`option${option}` as keyof typeof currentQuestion]}
                      onChange={(e) => setCurrentQuestion({
                        ...currentQuestion, 
                        [`option${option}`]: e.target.value
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={`Option ${option}`}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Correct Answer *
                </label>
                <select
                  value={currentQuestion.correctAnswer}
                  onChange={(e) => setCurrentQuestion({...currentQuestion, correctAnswer: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="A">Option A</option>
                  <option value="B">Option B</option>
                  <option value="C">Option C</option>
                  <option value="D">Option D</option>
                </select>
              </div>

              <button
                type="button"
                onClick={addQuestion}
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </button>
            </div>

            {questions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Questions Added ({questions.length})
                </h3>
                <div className="space-y-4">
                  {questions.map((q, index) => (
                    <div key={q.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-2">
                            {index + 1}. {q.question}
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            <span>A: {q.optionA}</span>
                            <span>B: {q.optionB}</span>
                            <span>C: {q.optionC}</span>
                            <span>D: {q.optionD}</span>
                          </div>
                          <p className="text-sm text-emerald-600 mt-2 font-medium">
                            Correct Answer: Option {q.correctAnswer}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeQuestion(q.id)}
                          className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <Save className="w-5 h-5 mr-2" />
              Create Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestCreation;