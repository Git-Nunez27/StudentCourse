import { Link } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Student Course</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Dashboard</Link>
              <Link to="/students" className="text-gray-700 hover:text-blue-600 transition">Students</Link>
              <Link to="/courses" className="text-gray-700 hover:text-blue-600 transition">Courses</Link>
              <Link to="/enrollments" className="text-gray-700 hover:text-blue-600 transition">Enrollments</Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded">Dashboard</Link>
              <Link to="/students" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded">Students</Link>
              <Link to="/courses" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded">Courses</Link>
              <Link to="/enrollments" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded">Enrollments</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">About</h3>
              <p className="text-gray-400 text-sm">Student Course Management System</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Features</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>Manage Students</li>
                <li>Manage Courses</li>
                <li>Track Enrollments</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">API</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>REST API</li>
                <li>Supabase Backend</li>
                <li>Express.js</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>Documentation</li>
                <li>GitHub</li>
                <li>Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Student Course Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
