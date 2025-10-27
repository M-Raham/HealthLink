import { useState } from "react";
import { Search, Plus, Mail, Phone, MapPin, Edit, X } from "lucide-react";
import { toast } from "sonner";

interface Doctor {
  id: number;
  name: string;
  specialty: string; // domain
  email: string;
  phone: string;
  address: string;
}

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // doctor list in state so we can modify it
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Cardiology",
      email: "sarah.chen@healthlink.com",
      phone: "+1 (555) 123-4567",
      address: "123 Heartbeat Ave, Metroville",
    },
    {
      id: 2,
      name: "Dr. Michael Lee",
      specialty: "Pediatrics",
      email: "michael.lee@healthlink.com",
      phone: "+1 (555) 234-5678",
      address: "456 Tiny Steps Rd, Kidtown, N",
    },
    {
      id: 3,
      name: "Dr. Emily White",
      specialty: "Dermatology",
      email: "emily.white@healthlink.com",
      phone: "+1 (555) 345-6789",
      address: "789 Skin Glow St, Beauty City",
    },
    {
      id: 4,
      name: "Dr. David Kim",
      specialty: "Orthopedics",
      email: "david.kim@healthlink.com",
      phone: "+1 (555) 456-7890",
      address: "101 Bone Health Blvd, Sports",
    },
    {
      id: 5,
      name: "Dr. Olivia Martinez",
      specialty: "Neurology",
      email: "olivia.martinez@healthlink.com",
      phone: "+1 (555) 567-8901",
      address: "202 Brain Wave Rd, Neuroville",
    },
    {
      id: 6,
      name: "Dr. John Davis",
      specialty: "Oncology",
      email: "john.davis@healthlink.com",
      phone: "+1 (555) 678-9012",
      address: "303 Hope Ln, Survivortown, C",
    },
  ]);

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState<number | null>(null);

  // form fields
  const [formName, setFormName] = useState("");
  const [formSpecialty, setFormSpecialty] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAddress, setFormAddress] = useState("");

  const resetForm = () => {
    setEditingDoctorId(null);
    setFormName("");
    setFormSpecialty("");
    setFormEmail("");
    setFormPhone("");
    setFormAddress("");
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (doctor: Doctor) => {
    setEditingDoctorId(doctor.id);
    setFormName(doctor.name);
    setFormSpecialty(doctor.specialty);
    setFormEmail(doctor.email);
    setFormPhone(doctor.phone);
    setFormAddress(doctor.address);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSaveDoctor = () => {
    // basic required check
    if (!formName || !formSpecialty || !formEmail || !formPhone || !formAddress) {
      toast.error("Please fill all fields");
      return;
    }

    if (editingDoctorId === null) {
      // add new
      const newDoctor: Doctor = {
        id: Date.now(),
        name: formName,
        specialty: formSpecialty,
        email: formEmail,
        phone: formPhone,
        address: formAddress,
      };

      setDoctors((prev) => [...prev, newDoctor]);
      toast.success(`Doctor ${formName} added successfully`);
    } else {
      // edit existing
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.id === editingDoctorId
            ? {
                ...doc,
                name: formName,
                specialty: formSpecialty,
                email: formEmail,
                phone: formPhone,
                address: formAddress,
              }
            : doc
        )
      );
      toast.success(`Doctor ${formName} updated successfully`);
    }

    closeModal();
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
          Doctor Management
        </h1>

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
            onClick={openAddModal}
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
          <div
            key={doctor.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            {/* Basic Info (no avatar now) */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {doctor.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{doctor.specialty}</p>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="truncate">{doctor.email}</span>
              </div>

              <div className="flex items-start text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>{doctor.phone}</span>
              </div>

              <div className="flex items-start text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="truncate">{doctor.address}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => openEditModal(doctor)}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <span className="text-sm font-medium text-gray-700">Edit</span>
                <Edit className="w-4 h-4 text-gray-700" />
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
            <p className="text-sm">
              Try adjusting your search criteria or add a new doctor
            </p>
          </div>
        </div>
      )}

      {/* Results Summary */}
      {filteredDoctors.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-600">
          Showing {filteredDoctors.length} of {doctors.length} doctors
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeModal}
          />

          {/* card */}
          <div className="relative bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-4">
            {/* header */}
            <div className="flex items-start justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingDoctorId === null ? "Add Doctor" : "Edit Doctor"}
                </h2>
                <p className="text-sm text-gray-500">
                  {editingDoctorId === null
                    ? "Add doctor details below."
                    : "Update doctor details below."}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* body */}
            <div className="px-6 py-4 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Dr. Jane Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Specialty / Domain */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Domain / Specialty<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formSpecialty}
                  onChange={(e) => setFormSpecialty(e.target.value)}
                  placeholder="Cardiology, Pediatrics, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="doctor@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  placeholder="123 Clinic Rd, City"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDoctor}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingDoctorId === null ? "Add Doctor" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
