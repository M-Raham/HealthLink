import { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, ChevronDown } from 'lucide-react';

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  disease: string;
  doctor: string;
}

  const patients: Patient[] = [
    {
      id: 1,
      name: 'Alice Wonderland',
      age: 34,
      gender: 'Female',
      disease: 'Hypertension',
      doctor: 'Dr. Emily Chen'
    },
    {
      id: 2,
      name: 'Bob The Builder',
      age: 52,
      gender: 'Male',
      disease: 'Type 2 Diabetes',
      doctor: 'Dr. Alex Johnson'
    },
    {
      id: 3,
      name: 'Charlie Chaplin',
      age: 28,
      gender: 'Male',
      disease: 'Asthma',
      doctor: 'Dr. David Lee'
    },
    {
      id: 4,
      name: 'Diana Prince',
      age: 45,
      gender: 'Female',
      disease: 'Osteoarthritis',
      doctor: 'Dr. Emily Chen'
    },
    {
      id: 5,
      name: 'Eve Harrington',
      age: 67,
      gender: 'Female',
      disease: 'Coronary Artery Disease',
      doctor: 'Dr. Alex Johnson'
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.disease.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (patientId: number) => {
    console.log('Edit patient:', patientId);
  };

  const handleDelete = (patientId: number) => {
    console.log('Delete patient:', patientId);
  };

  const handleAddNewPatient = () => {
    console.log('Add new patient');
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="p-3">
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Male</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Female</span>
                    </label>
                    <hr className="my-2" />
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Age 18-30</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Age 31-50</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Age 50+</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={handleAddNewPatient}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Patient</span>
          </button>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disease
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor Assigned
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.age}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.gender}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.disease}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.doctor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(patient.id)}
                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                        title="Edit Patient"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(patient.id)}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                        title="Delete Patient"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No patients found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          </div>
        )}
      </div>

      {/* Table Footer with Pagination Info */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div>
          Showing {filteredPatients.length} of {patients.length} patients
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
            Previous
          </button>
          <span className="px-3 py-1">Page 1 of 1</span>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;