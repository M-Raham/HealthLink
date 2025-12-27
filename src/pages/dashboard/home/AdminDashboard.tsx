import React, { useEffect, useState } from "react";
import {
  Users,
  Calendar,
  UserCheck,
  Activity,
  TrendingUp,
  Clock,
} from "lucide-react";
import { adminService } from "../../../services";
import { AdminStats, Appointment } from "../../../types/api";
import { LoadingSpinner } from "../../../components/common/LoadingSpinner";
import { ErrorMessage } from "../../../components/common/ErrorMessage";

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await adminService.getDashboardStats();
      setStats(data.stats);
      setRecentAppointments(data.recentAppointments);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={loadDashboardData}
        className="m-6"
      />
    );
  }

  const statCards = [
    {
      title: "Total Patients",
      value: stats?.totalPatients || 0,
      icon: Users,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Active Doctors",
      value: `${stats?.activeDoctors || 0}/${stats?.totalDoctors || 0}`,
      icon: UserCheck,
      color: "bg-green-500",
      change: "+5%",
    },
    {
      title: "Total Appointments",
      value: stats?.totalAppointments || 0,
      icon: Calendar,
      color: "bg-purple-500",
      change: "+18%",
    },
    {
      title: "Pending Appointments",
      value: stats?.pendingAppointments || 0,
      icon: Clock,
      color: "bg-orange-500",
      change: "-3%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening at HealthLink.
          </p>
        </div>
        <button
          onClick={loadDashboardData}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Activity className="w-4 h-4 mr-2" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">{card.change}</span>
                  <span className="text-sm text-gray-500 ml-1">
                    from last month
                  </span>
                </div>
              </div>
              <div
                className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}
              >
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Appointments
          </h2>
        </div>
        <div className="p-6">
          {recentAppointments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No recent appointments found.
            </p>
          ) : (
            <div className="space-y-4">
              {recentAppointments.map((appointment) => {
                const status =
                  appointment.patient?.medicalHistory?.length > 0
                    ? "Completed"
                    : "Pending";

                return (
                  <div
                    key={appointment._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {appointment.patient?.name || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          with {appointment.doctor?.name || "N/A"} •{" "}
                          {appointment.doctor?.specialization || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(
                          appointment.appointmentDate
                        ).toLocaleDateString()}{" "}
                        at {appointment.timeSlot}
                      </p>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Create New Doctor
            </button>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
              View All Appointments
            </button>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
              Generate Reports
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            System Health
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Server Status</span>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="text-sm font-medium text-green-600">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Response</span>
              <span className="text-sm font-medium text-green-600">Fast</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="text-gray-900 font-medium">New doctor registered</p>
              <p className="text-gray-500">2 hours ago</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-900 font-medium">5 appointments booked</p>
              <p className="text-gray-500">4 hours ago</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-900 font-medium">
                System backup completed
              </p>
              <p className="text-gray-500">6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
