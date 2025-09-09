import React from 'react';
import { Calendar, Search, Stethoscope, FileText, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const HealthLinkDMS: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-blue-600 text-2xl font-bold">
                ✱ HealthLinkDMS
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Services</a>
            </nav>
            
            {/* Auth Buttons */}
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">
                Login
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-gray-300 opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Empowering Healthcare Operations
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Streamline patient management, doctor scheduling, and billing with 
              HealthLink DMS. Your comprehensive solution for efficient hospital 
              administration.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-200">
              Login to Dashboard
            </button>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-30"></div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Key Features
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Appointment Management */}
            <div className="text-center group hover:transform hover:scale-105 transition duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition duration-300">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Appointment Management
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Effortlessly schedule, track, and manage patient appointments. 
                Reduce wait times and improve patient flow.
              </p>
            </div>

            {/* Patient Records */}
            <div className="text-center group hover:transform hover:scale-105 transition duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition duration-300">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Patient Records
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Securely store and access comprehensive patient histories, 
                diagnoses, and treatment plans in one place.
              </p>
            </div>

            {/* Doctor Portal */}
            <div className="text-center group hover:transform hover:scale-105 transition duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition duration-300">
                <Stethoscope className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Doctor Portal
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Empower doctors with tools for patient interaction, 
                record updates, and schedule management.
              </p>
            </div>

            {/* Integrated Billing */}
            <div className="text-center group hover:transform hover:scale-105 transition duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition duration-300">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Integrated Billing
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Simplify invoicing, payment processing, and financial 
                reporting with automated billing solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">
                Streamlining hospital operations for better patient care.
              </h3>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 hover:text-blue-200 cursor-pointer" />
                <Twitter className="w-5 h-5 hover:text-blue-200 cursor-pointer" />
                <Linkedin className="w-5 h-5 hover:text-blue-200 cursor-pointer" />
                <Youtube className="w-5 h-5 hover:text-blue-200 cursor-pointer" />
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-200">About Us</a></li>
                <li><a href="#" className="hover:text-blue-200">Careers</a></li>
                <li><a href="#" className="hover:text-blue-200">Blog</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-200">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-200">FAQ</a></li>
                <li><a href="#" className="hover:text-blue-200">Help Center</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-200">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-200">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-blue-500 mt-8 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-blue-100 mb-2 sm:mb-0">
                Made with ❤️ Visily
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HealthLinkDMS;