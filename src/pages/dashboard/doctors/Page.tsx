import { useState } from 'react';
import { Search, Plus, Mail, Phone, MapPin, Eye, Edit } from 'lucide-react';

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');

    interface Doctor {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
}

  const doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      specialty: 'Cardiology',
      email: 'sarah.chen@healthlink.com',
      phone: '+1 (555) 123-4567',
      address: '123 Heartbeat Ave, Metroville',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Dr. Michael Lee',
      specialty: 'Pediatrics',
      email: 'michael.lee@healthlink.com',
      phone: '+1 (555) 234-5678',
      address: '456 Tiny Steps Rd, Kidtown, N',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Dr. Emily White',
      specialty: 'Dermatology',
      email: 'emily.white@healthlink.com',
      phone: '+1 (555) 345-6789',
      address: '789 Skin Glow St, Beauty City',
      avatar: 'https://images.unsplash.com/photo-1594824475914-3e0c3cd5e749?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Dr. David Kim',
      specialty: 'Orthopedics',
      email: 'david.kim@healthlink.com',
      phone: '+1 (555) 456-7890',
      address: '101 Bone Health Blvd, Sports',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Dr. Olivia Martinez',
      specialty: 'Neurology',
      email: 'olivia.martinez@healthlink.com',
      phone: '+1 (555) 567-8901',
      address: '202 Brain Wave Rd, Neuroville',
      avatar: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 6,
      name: 'Dr. John Davis',
      specialty: 'Oncology',
      email: 'john.davis@healthlink.com',
      phone: '+1 (555) 678-9012',
      address: '303 Hope Ln, Survivortown, C',
      avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewProfile = (doctorId: number) => {
    console.log('View profile for doctor:', doctorId);
  };

  const handleEditDoctor = (doctorId: number) => {
    console.log('Edit doctor:', doctorId);
  };

  const handleAddDoctor = () => {
    console.log('Add new doctor');
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Doctor Management</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={handleAddDoctor}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add Doctor</span>
          </button>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            {/* Doctor Avatar and Basic Info */}
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-3 bg-gray-200">
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
                  }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{doctor.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{doctor.specialty}</p>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-3 text-blue-600 flex-shrink-0" />
                <span className="truncate">{doctor.email}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-3 text-blue-600 flex-shrink-0" />
                <span>{doctor.phone}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-3 text-blue-600 flex-shrink-0" />
                <span className="truncate">{doctor.address}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => handleViewProfile(doctor.id)}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <Eye className="w-4 h-4" />
                <span>View Profile</span>
              </button>
              
              <button
                onClick={() => handleEditDoctor(doctor.id)}
                className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="Edit Doctor"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No doctors found</p>
            <p className="text-sm">Try adjusting your search criteria or add a new doctor</p>
          </div>
        </div>
      )}

      {/* Results Summary */}
      {filteredDoctors.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-600">
          Showing {filteredDoctors.length} of {doctors.length} doctors
        </div>
      )}
    </div>
  );
};

export default Page;