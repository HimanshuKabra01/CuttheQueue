import { useState } from "react";
import Sidebar from "./Sidebar";
import NewsSection from "./NewsSection";
import { Bell, Calendar, Users, Activity } from "lucide-react";

function Dashboard({ isDark, toggleDarkMode }) {
  const [stats] = useState([
    {
      title: "Appointments Today",
      value: "12",
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
      change: "+2.5%",
      positive: true
    },
    {
      title: "Queue Length",
      value: "24",
      icon: <Users className="w-6 h-6 text-green-500" />,
      change: "-5%",
      positive: true
    },
    {
      title: "Average Wait Time",
      value: "18 min",
      icon: <Activity className="w-6 h-6 text-purple-500" />,
      change: "+1.2%",
      positive: false
    }
  ]);

  return (
    <div className="min-h-screen bg-[#121212]">
      <Sidebar isDark={isDark} toggleDarkMode={toggleDarkMode} />
      
      {/* Main Content */}
      <main className="ml-64 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            Dashboard
          </h1>
          <button className="relative p-2 text-gray-400 hover:text-gray-300 transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#1C1C1C] rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-gray-800">
                  {stat.icon}
                </div>
                <span
                  className={`text-sm font-semibold ${
                    stat.positive
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <div className="bg-[#1C1C1C] rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-white">
                Upcoming Appointments
              </h2>
              <div className="space-y-4">
                {/* Add appointment items here */}
                <p className="text-gray-400">
                  No upcoming appointments
                </p>
              </div>
            </div>

            {/* Queue Status */}
            <div className="bg-[#1C1C1C] rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-white">
                Current Queue Status
              </h2>
              <div className="space-y-4">
                {/* Add queue status information here */}
                <p className="text-gray-400">
                  Queue is currently empty
                </p>
              </div>
            </div>
          </div>

          {/* News Section */}
          <div className="lg:col-span-1">
            <NewsSection />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard; 