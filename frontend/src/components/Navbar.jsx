import React from 'react';
import { Building2 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">MediConnect</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Dashboard</a>
            <a href="#" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Hospitals</a>
            <a href="#" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Doctors</a>
            <a href="#" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">About</a>
          </div>
          
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;