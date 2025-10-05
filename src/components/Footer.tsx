import { Code, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600 mb-4 md:mb-0">
            <Code className="w-5 h-5 text-blue-600" />
            <span className="text-sm">
              Created with <Heart className="w-4 h-4 inline text-red-500 mx-1" /> by{' '}
              <span className="font-semibold text-gray-900">Samriddhi Jaiswal</span>
            </span>
          </div>
          
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} HR Management System. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;