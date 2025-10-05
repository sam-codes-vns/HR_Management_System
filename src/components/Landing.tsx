import { Award, Briefcase, CheckCircle, Code, Timer, UserCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-800">
      <div className="container mx-auto px-6 py-12">
        {/* Header with creator credit */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-sm">
            <Code className="w-4 h-4 mr-2" />
            Crafted by <span className="font-semibold ml-1">Samriddhi Jaiswal</span>
          </div>
        </div>

        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Briefcase className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            HR Management
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              System
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Streamline your hiring process with our comprehensive platform for test creation, 
            candidate evaluation, and result management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <div className="group">
            <Link 
              to="/hr/dashboard" 
              className="block bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 rounded-full p-3 mr-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">HR Portal</h2>
              </div>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Manage candidates, create tests, publish assessments, and review results with comprehensive analytics.
              </p>
              <div className="flex items-center text-white group-hover:text-yellow-300 transition-colors">
                <span className="font-semibold">Access HR Dashboard</span>
                <CheckCircle className="w-5 h-5 ml-2" />
              </div>
            </Link>
          </div>

          <div className="group">
            <Link 
              to="/candidate/apply" 
              className="block bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex items-center mb-6">
                <div className="bg-emerald-500 rounded-full p-3 mr-4">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Candidate Portal</h2>
              </div>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Apply for positions, take assessments, and track your application status with real-time updates.
              </p>
              <div className="flex items-center text-white group-hover:text-yellow-300 transition-colors">
                <span className="font-semibold">Start Application</span>
                <CheckCircle className="w-5 h-5 ml-2" />
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Platform Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-500 rounded-full p-3 w-fit mx-auto mb-4">
                <Timer className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Timed Assessments</h4>
              <p className="text-blue-100 text-sm">Customizable test durations with real-time countdown timers</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-500 rounded-full p-3 w-fit mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Smart Scoring</h4>
              <p className="text-blue-100 text-sm">Automated evaluation with intelligent selection criteria</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500 rounded-full p-3 w-fit mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Resume Management</h4>
              <p className="text-blue-100 text-sm">Secure file upload with automatic validation and storage</p>
            </div>
          </div>
        </div>

        {/* Bottom signature */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-medium shadow-lg">
            <Code className="w-5 h-5 mr-2" />
            Engineered with precision by Samriddhi Jaiswal
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;