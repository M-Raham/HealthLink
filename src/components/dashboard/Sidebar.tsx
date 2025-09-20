import {
  Users,
  Calendar,
  UserCheck,
  BarChart3,
  FileText,
  CreditCard,
  LogOut,
  SettingsIcon,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Patients", path: "/dashboard/patients" },
  { icon: UserCheck, label: "Doctors", path: "/dashboard/doctors" },
  { icon: Calendar, label: "Appointments", path: "/dashboard/appointments" },
  { icon: CreditCard, label: "Billing", path: "/dashboard/billing" },
  { icon: FileText, label: "Reports", path: "/dashboard/reports" },
  { icon: SettingsIcon, label: "Settings", path: "/dashboard/settings" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // later you can also clear auth tokens here
    navigate("/"); // redirect to landing Home
    onClose(); // close sidebar on mobile
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-full md:h-auto w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={onClose} // auto-close on mobile after navigation
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}

          {/* Logout button (only mobile) */}
          <button
            onClick={handleLogout}
            className="lg:hidden w-full mt-6 flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
