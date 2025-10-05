import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Upload, CheckCircle, User, GraduationCap, Briefcase, FileText } from 'lucide-react';

interface ApplicationForm {
  name: string;
  degree: string;
  experience: string;
}

const Apply = () => {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ApplicationForm>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError('');

    if (!file) return;

    if (file.type !== 'application/pdf') {
      setUploadError('Please upload a PDF file only');
      return;
    }

    if (file.size > 25 * 1024 * 1024) { // 25MB in bytes
      setUploadError('File size must be under 25MB');
      return;
    }

    setResumeFile(file);
  };

  const onSubmit = async (data: ApplicationForm) => {
    if (!resumeFile) {
      setUploadError('Please upload your resume');
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert file to base64 for storage
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const candidate = {
          id: Date.now().toString(),
          ...data,
          resumeFile: resumeFile.name,
          appliedAt: new Date().toISOString()
        };

        // Store candidate data
        const existingCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
        localStorage.setItem('candidates', JSON.stringify([...existingCandidates, candidate]));

        // Store resume file separately
        localStorage.setItem(`resume_${candidate.id}`, fileReader.result as string);

        // Store current candidate session
        localStorage.setItem('currentCandidate', JSON.stringify(candidate));

        alert('Application submitted successfully!');
        navigate('/candidate/tests');
      };

      fileReader.readAsDataURL(resumeFile);
    } catch (error) {
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Apply for Position</h1>
            <p className="text-gray-600">Submit your application to start the assessment process</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <User className="w-4 h-4 mr-2 text-blue-600" />
                Full Name *
              </label>
              <input
                type="text"
                {...register('name', { 
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <GraduationCap className="w-4 h-4 mr-2 text-emerald-600" />
                Educational Qualification *
              </label>
              <select
                {...register('degree', { required: 'Degree is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select your highest qualification</option>
                <option value="Bachelor's in Computer Science">Bachelor's in Computer Science</option>
                <option value="Bachelor's in Information Technology">Bachelor's in Information Technology</option>
                <option value="Bachelor's in Engineering">Bachelor's in Engineering</option>
                <option value="Master's in Computer Science">Master's in Computer Science</option>
                <option value="Master's in Information Technology">Master's in Information Technology</option>
                <option value="Master's in Engineering">Master's in Engineering</option>
                <option value="MBA">MBA</option>
                <option value="Other">Other</option>
              </select>
              {errors.degree && (
                <p className="text-red-500 text-sm mt-1">{errors.degree.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <Briefcase className="w-4 h-4 mr-2 text-purple-600" />
                Work Experience *
              </label>
              <select
                {...register('experience', { required: 'Experience is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select your experience level</option>
                <option value="Fresh Graduate">Fresh Graduate (0 years)</option>
                <option value="0-1 years">0-1 years</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2-3 years">2-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <FileText className="w-4 h-4 mr-2 text-orange-600" />
                Resume Upload *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <div className="mb-3">
                    <label htmlFor="resume" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 font-medium">
                        Click to upload
                      </span>
                      <span className="text-gray-600"> or drag and drop</span>
                    </label>
                    <input
                      id="resume"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-gray-500">PDF only, max 25MB</p>
                </div>
                
                {resumeFile && (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
                      <span className="text-emerald-800 font-medium">{resumeFile.name}</span>
                      <span className="text-emerald-600 text-sm ml-2">
                        ({(resumeFile.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>
                  </div>
                )}
                
                {uploadError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{uploadError}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Next Steps</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Your application will be reviewed by our HR team</li>
                <li>• You'll have access to take available assessments</li>
                <li>• Results will be evaluated based on our selection criteria</li>
                <li>• Selected candidates will be notified accordingly</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting Application...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Apply;