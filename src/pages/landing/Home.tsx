import React from 'react';
import { Calendar, Search, Stethoscope, FileText } from 'lucide-react';
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';

const HealthLinkDMS: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar/>

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
      <Footer/>
    </div>
  );
};

export default HealthLinkDMS;