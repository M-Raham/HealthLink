import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  X,
} from "lucide-react";
import { toast } from "sonner";

const DOCTORS = [
  "Dr. Emily Chen",
  "Dr. Alex Johnson",
  "Dr. David Lee",
  "Dr. Sarah Patel",
];

const ACCOMODATION = ["General", "Specialist", "Emergency"];

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  disease: string;
  doctor: string;
  accommodate: string;
}

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: "Alice Wonderland",
      age: 34,
      gender: "Female",
      disease: "Hypertension",
      accommodate: "General",
      doctor: "Dr. Emily Chen",
    },
    {
      id: 2,
      name: "Bob The Builder",
      age: 52,
      gender: "Male",
      disease: "Type 2 Diabetes",
      accommodate: "Spectialist",
      doctor: "Dr. Alex Johnson",
    },
    {
      id: 3,
      name: "Charlie Chaplin",
      age: 28,
      gender: "Male",
      disease: "Asthma",
      accommodate: "Emergency",
      doctor: "Dr. David Lee",
    },
    {
      id: 4,
      name: "Diana Prince",
      age: 45,
      gender: "Female",
      disease: "Osteoarthritis",
      accommodate: "General",
      doctor: "Dr. Emily Chen",
    },
    {
      id: 5,
      name: "Eve Harrington",
      age: 67,
      gender: "Female",
      disease: "Coronary Artery Disease",
      accommodate: "Emergency",
      doctor: "Dr. Alex Johnson",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatientId, setEditingPatientId] = useState<number | null>(null);

  const [formName, setFormName] = useState("");
  const [formAge, setFormAge] = useState<number | "">("");
  const [formGender, setFormGender] = useState("Male");
  const [formDisease, setFormDisease] = useState("To be diagnosed");
  const [formDoctor, setFormDoctor] = useState(DOCTORS[0]);
  const [formAccomodation, setFormAccomodation] = useState(ACCOMODATION[0]);

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
    if (!formName || formAge === "" || !formGender || !formDoctor) {
      toast.error("Please fill all required fields");
      return;
    }

    if (editingPatientId === null) {
      const newPatient: Patient = {
        id: Date.now(),
        name: formName,
        age: Number(formAge),
        gender: formGender,
        disease: formDisease || "To be diagnosed",
        doctor: formDoctor,
        accommodate: formAccomodation,
      };
      setPatients((prev) => [...prev, newPatient]);
      toast.success(`Patient ${formName} added successfully`);
    } else {
      setPatients((prev) =>
        prev.map((p) =>
          p.id === editingPatientId
            ? {
                ...p,
                name: formName,
                age: Number(formAge),
                gender: formGender,
                disease: formDisease,
                doctor: formDoctor,
              }
            : p
        )
      );
      toast.success(`Patient ${formName} updated successfully`);
    }

    closeModal();
  };

  const handleDelete = (patientId: number) => {
    const deletedPatient = patients.find((p) => p.id === patientId);
    if (!deletedPatient) return;

    setPatients((prev) => prev.filter((p) => p.id !== patientId));
    toast.info(`Deleted ${deletedPatient.name}`);
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

      {/* Search + Actions */}
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
                <div className="p-3 space-y-2 text-sm text-gray-700">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Male
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Female
                  </label>
                  <hr className="my-2" />
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Age 18–30
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Age 31–50
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Age 50+
                  </label>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Patient</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {[
                  "Patient Name",
                  "Age",
                  "Gender",
                  "Disease",
                  "Accommodation",
                  "Doctor Assigned",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {patient.gender}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {patient.disease}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {patient.accommodate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {patient.doctor}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(patient)}
                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(patient.id)}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
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
          <div className="text-center py-12 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No patients found</p>
            <p className="text-sm">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <span>
          Showing {filteredPatients.length} of {patients.length} patients
        </span>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
            Previous
          </button>
          <span>Page 1 of 1</span>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />
          <div className="relative bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-4">
            <div className="flex items-start justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingPatientId ? "Edit Patient" : "Add New Patient"}
                </h2>
                <p className="text-sm text-gray-500">
                  {editingPatientId
                    ? "Update patient details below."
                    : "Add patient details below."}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Disease / Issue
                </label>
                <input
                  type="text"
                  value={formDisease}
                  onChange={(e) => setFormDisease(e.target.value)}
                  placeholder="To be diagnosed"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Assigned<span className="text-red-500">*</span>
                </label>
                <select
                  value={formDoctor}
                  onChange={(e) => setFormDoctor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                >
                  {DOCTORS.map((doc) => (
                    <option key={doc} value={doc}>
                      {doc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Accomodation<span className="text-red-500">*</span>
                </label>
                <select
                  value={formAccomodation}
                  onChange={(e) => setFormAccomodation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                >
                  {ACCOMODATION.map((aoc) => (
                    <option key={aoc} value={aoc}>
                      {aoc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePatient}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingPatientId ? "Save Changes" : "Add Patient"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
