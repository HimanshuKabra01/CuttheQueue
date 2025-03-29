import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Clock,
  Settings,
  Sun,
  Moon,
} from "lucide-react";

function Sidebar({ isDark, toggleDarkMode }) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1C1C1C] text-white flex flex-col">
      {/* Profile Section */}
      <div className="p-6 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-3 ring-2 ring-gray-700">
          <img
            src="/profile-placeholder.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-medium mb-2">Louis Carter</h2>
        <button className="px-4 py-1 bg-gray-800 rounded-full text-sm hover:bg-gray-700 transition-colors">
          Edit
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <LayoutDashboard size={20} className="text-gray-400" />
              <span className="text-gray-300">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/activity"
              className="flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Clock size={20} className="text-gray-400" />
              <span className="text-gray-300">Activity</span>
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Settings size={20} className="text-gray-400" />
              <span className="text-gray-300">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Theme Toggle */}
      <div className="p-4">
        <div className="flex items-center justify-between px-4 py-2">
          <span className="text-sm text-gray-400">Light</span>
          <button
            onClick={toggleDarkMode}
            className="relative w-12 h-6 rounded-full bg-gray-700 flex items-center transition-colors"
          >
            <div
              className={`absolute w-5 h-5 rounded-full transition-transform ${
                isDark ? 'translate-x-7 bg-yellow-400' : 'translate-x-1 bg-white'
              }`}
            />
            <Sun className={`absolute left-1 w-4 h-4 text-gray-400 ${isDark ? 'opacity-0' : 'opacity-100'}`} />
            <Moon className={`absolute right-1 w-4 h-4 text-gray-400 ${isDark ? 'opacity-100' : 'opacity-0'}`} />
          </button>
          <span className="text-sm text-gray-400">Dark</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar; 