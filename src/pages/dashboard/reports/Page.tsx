import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Page = () => {
  // Appointments per Week Data
  const appointmentsWeeklyData = [
    { week: 'Week 1', generalCheckup: 140, specialistConsultation: 85, emergencyCases: 45 },
    { week: 'Week 2', generalCheckup: 160, specialistConsultation: 95, emergencyCases: 55 },
    { week: 'Week 3', generalCheckup: 150, specialistConsultation: 80, emergencyCases: 40 },
    { week: 'Week 4', generalCheckup: 170, specialistConsultation: 110, emergencyCases: 65 },
    { week: 'Week 5', generalCheckup: 155, specialistConsultation: 90, emergencyCases: 50 },
    { week: 'Week 6', generalCheckup: 180, specialistConsultation: 120, emergencyCases: 70 }
  ];

  // Patient Growth Data
  const patientGrowthData = [
    { month: 'Jan', patients: 145 },
    { month: 'Feb', patients: 152 },
    { month: 'Mar', patients: 168 },
    { month: 'Apr', patients: 158 },
    { month: 'May', patients: 175 },
    { month: 'Jun', patients: 182 },
    { month: 'Jul', patients: 195 },
    { month: 'Aug', patients: 188 },
    { month: 'Sep', patients: 210 },
    { month: 'Oct', patients: 225 },
    { month: 'Nov', patients: 240 },
    { month: 'Dec', patients: 255 }
  ];

  // Billing Summary Data
  const billingSummaryData = [
    { name: 'Consultations', value: 41, color: '#3B82F6' },
    { name: 'Procedures', value: 27, color: '#10B981' },
    { name: 'Pharmacy', value: 18, color: '#60A5FA' },
    { name: 'Lab Tests', value: 14, color: '#FCD34D' }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reports Overview</h1>
      </div>

      {/* Appointments per Week Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Appointments per Week</h2>
          <p className="text-sm text-gray-600">Weekly breakdown of different appointment types.</p>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={appointmentsWeeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Bar dataKey="generalCheckup" stackId="a" fill="#3B82F6" name="General Check-up" />
              <Bar dataKey="specialistConsultation" stackId="a" fill="#10B981" name="Specialist Consultation" />
              <Bar dataKey="emergencyCases" stackId="a" fill="#F97316" name="Emergency Cases" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>General Check-up</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Specialist Consultation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span>Emergency Cases</span>
          </div>
        </div>
      </div>

      {/* Bottom Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Patient Growth Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Patient Growth Trends</h2>
            <p className="text-sm text-gray-600">Monthly patient registration over the last year.</p>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={patientGrowthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  domain={['dataMin - 20', 'dataMax + 20']}
                  tickCount={6}
                />
                <Line 
                  type="monotone" 
                  dataKey="patients" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Total Patients</span>
            </div>
          </div>
        </div>

        {/* Billing Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Billing Summary</h2>
            <p className="text-sm text-gray-600">Revenue distribution by service category.</p>
          </div>
          
          <div className="flex justify-center">
            <div className="h-64 w-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={billingSummaryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {billingSummaryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart Labels with Percentages */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
            {billingSummaryData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-600">{item.name}</span>
                <span className="font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">1,847</div>
          <div className="text-sm text-gray-600">Total Appointments</div>
          <div className="text-xs text-green-600 mt-1">+12% vs last month</div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">255</div>
          <div className="text-sm text-gray-600">New Patients</div>
          <div className="text-xs text-green-600 mt-1">+6% vs last month</div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-orange-600">325</div>
          <div className="text-sm text-gray-600">Emergency Cases</div>
          <div className="text-xs text-red-600 mt-1">+3% vs last month</div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-purple-600">$45.2K</div>
          <div className="text-sm text-gray-600">Monthly Revenue</div>
          <div className="text-xs text-green-600 mt-1">+15% vs last month</div>
        </div>
      </div>
    </div>
  );
};

export default Page;