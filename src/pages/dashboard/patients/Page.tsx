import { useState } from "react";
import { Search, Plus, Edit, Trash2, X } from "lucide-react";

const DOCTORS = [
  "Dr. Emily Chen",
  "Dr. Alex Johnson",
  "Dr. David Lee",
  "Dr. Sarah Patel",
];

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  disease: string;
  doctor: string;
}

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // patients state so we can add/edit
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: "Alice Wonderland",
      age: 34,
      gender: "Female",
      disease: "Hypertension",
      doctor: "Dr. Emily Chen",
    },
    {
      id: 2,
      name: "Bob The Builder",
      age: 52,
      gender: "Male",
      disease: "Type 2 Diabetes",
      doctor: "Dr. Alex Johnson",
    },
    {
      id: 3,
      name: "Charlie Chaplin",
      age: 28,
      gender: "Male",
      disease: "Asthma",
      doctor: "Dr. David Lee",
    },
    {
      id: 4,
      name: "Diana Prince",
      age: 45,
      gender: "Female",
      disease: "Osteoarthritis",
      doctor: "Dr. Emily Chen",
    },
    {
      id: 5,
      name: "Eve Harrington",
      age: 67,
      gender: "Female",
      disease: "Coronary Artery Disease",
      doctor: "Dr. Alex Johnson",
    },
  ]);

  // --- Modal state ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatientId, setEditingPatientId] = useState<number | null>(null);

  // form fields
  const [formName, setFormName] = useState("");
  const [formAge, setFormAge] = useState<number | "">("");
  const [formGender, setFormGender] = useState("Male");
  const [formDisease, setFormDisease] = useState("To be diagnosed");
  const [formDoctor, setFormDoctor] = useState(DOCTORS[0]);

  const resetForm = () => {
    setEditingPatientId(null);
    setFormName("");
    setFormAge("");
    setFormGender("Male");
    setFormDisease("To be diagnosed");
    setFormDoctor(DOCTORS[0]);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (patient: Patient) => {
    setEditingPatientId(patient.id);
    setFormName(patient.name);
    setFormAge(patient.age);
    setFormGender(patient.gender);
    setFormDisease(patient.disease);
    setFormDoctor(patient.doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSavePatient = () => {
    // basic validation
    if (!formName || formAge === "" || !formGender || !formDoctor) {
      alert("Please fill required fields.");
      return;
    }

    if (editingPatientId === null) {
      // create new patient
      const newPatient: Patient = {
        id: Date.now(), // temp id
        name: formName,
        age: Number(formAge),
        gender: formGender,
        disease: formDisease || "To be diagnosed",
        doctor: formDoctor,
      };
      setPatients((prev) => [...prev, newPatient]);
    } else {
      // update existing
      setPatients((prev) =>
        prev.map((p) =>
          p.id === editingPatientId
            ? {
                ...p,
                name: formName,
                age: Number(formAge),
                gender: formGender,
                disease: formDisease || "To be diagnosed",
                doctor: formDoctor,
              }
            : p
        )
      );
    }

    closeModal();
  };

  const handleDelete = (patientId: number) => {
    // temporary delete logic
    if (window.confirm("Are you sure you want to delete this patient?")) {
      setPatients((prev) => prev.filter((p) => p.id !== patientId));
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.disease.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <button
            onClick={openAddModal}
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
                <tr
                  key={patient.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {patient.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.age}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient.gender}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient.disease}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient.doctor}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(patient)}
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

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* overlay */}
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />

          {/* modal card */}
          <div className="relative bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-4">
            {/* header */}
            <div className="flex items-start justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingPatientId === null
                    ? "Add New Patient"
                    : "Edit Patient"}
                </h2>
                <p className="text-sm text-gray-500">
                  {editingPatientId === null
                    ? "Add patient details below."
                    : "Update patient details below."}
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
                  placeholder="Enter full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Age + Gender in a row */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formAge}
                    onChange={(e) =>
                      setFormAge(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    placeholder="Age"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Disease */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Disease / Issue
                </label>
                <input
                  type="text"
                  value={formDisease}
                  onChange={(e) => setFormDisease(e.target.value)}
                  placeholder="To be diagnosed"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Doctor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Assigned<span className="text-red-500">*</span>
                </label>
                <select
                  value={formDoctor}
                  onChange={(e) => setFormDoctor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                >
                  {DOCTORS.map((doc) => (
                    <option key={doc} value={doc}>
                      {doc}
                    </option>
                  ))}
                </select>
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
                onClick={handleSavePatient}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingPatientId === null ? "Add Patient" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
