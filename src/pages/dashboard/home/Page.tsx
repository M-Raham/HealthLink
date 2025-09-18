import { Users, Calendar, UserCheck, DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Page = () => {
  const appointmentData = [
    { name: "Cardiology", appointments: 120 },
    { name: "Pediatrics", appointments: 95 },
    { name: "Neurology", appointments: 80 },
    { name: "Dermatology", appointments: 110 },
    { name: "Orthopedics", appointments: 68 },
  ];

  const patientGrowthData = [
    { month: "Jan", newPatients: 45, totalPatients: 420 },
    { month: "Feb", newPatients: 52, totalPatients: 472 },
    { month: "Mar", newPatients: 48, totalPatients: 520 },
    { month: "Apr", newPatients: 61, totalPatients: 581 },
    { month: "May", newPatients: 55, totalPatients: 636 },
    { month: "Jun", newPatients: 68, totalPatients: 704 },
  ];

  const revenueData = [
    { name: "Consultations", value: 38, color: "#3B82F6" },
    { name: "Treatments", value: 25, color: "#10B981" },
    { name: "Pharmacy", value: 21, color: "#374151" },
    { name: "Diagnostics", value: 16, color: "#F59E0B" },
  ];
  return (
    <main className="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Quick Stats */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Stats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Patients
                </p>
                <p className="text-2xl font-bold text-gray-900">2,456</p>
                <p className="text-xs text-green-600 mt-1">
                  +12% from last month
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Today's Appointments
                </p>
                <p className="text-2xl font-bold text-gray-900">134</p>
                <p className="text-xs text-red-600 mt-1">-5% from yesterday</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Available Doctors
                </p>
                <p className="text-2xl font-bold text-gray-900">28</p>
                <p className="text-xs text-gray-600 mt-1">7 Doctors on leave</p>
              </div>
              <UserCheck className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Monthly Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">$128,450</p>
                <p className="text-xs text-green-600 mt-1">
                  +18% from last month
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Data Visualizations */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Data Visualizations
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appointments by Department */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-md font-semibold text-gray-900 mb-2">
              Appointments by Department
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Distribution of scheduled appointments across departments.
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Bar
                    dataKey="appointments"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Patient Growth Over Time */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-md font-semibold text-gray-900 mb-2">
              Patient Growth Over Time
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Monthly new patient registrations and total patient count.
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={patientGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Line
                    type="monotone"
                    dataKey="totalPatients"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="Total Patients"
                  />
                  <Line
                    type="monotone"
                    dataKey="newPatients"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="New Patients"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Sources Distribution */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-md font-semibold text-gray-900 mb-2">
          Revenue Sources Distribution
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Breakdown of revenue generated from different hospital services.
        </p>
        <div className="flex justify-center">
          <div className="h-64 w-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {revenueData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">
                {item.name} {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
