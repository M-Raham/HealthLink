import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onMenuClick: () => void; // callback to toggle sidebar
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // later you can also clear auth tokens here
    navigate("/"); // redirect to landing Home
  };

  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <span className="text-xl font-bold text-gray-800">HealthLink</span>

        {/* Desktop logout */}
        <button
          onClick={handleLogout}
          className="hidden lg:flex items-center text-gray-600 hover:text-gray-900"
        >
          <LogOut className="w-5 h-5 cursor-pointer" />
          <span className="ml-2 text-sm">Logout</span>
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
