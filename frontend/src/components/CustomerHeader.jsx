// components/CustomerHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const CustomerHeader = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/browse-services", label: "Browse Services" },
    { path: "/my-bookings", label: "My Bookings" },
    { path: "/reviews", label: "Reviews" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <header className="bg-black text-white">
      {/* TOP BAR */}
      <div className="py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-red-600">Task</span>
            <span className="text-white">Mate</span>
          </Link>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for handyman services..."
              className="w-full py-2 px-4 pl-10 rounded-md text-white"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Icons + Profile + Logout */}
        <div className="flex items-center gap-6">
          {/* Messages icon */}
          <button className="relative hover:text-gray-300 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>

          {/* Notification icon */}
          <button className="relative hover:text-gray-300 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-600 text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile + Logout */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden flex items-center justify-center">
              {user?.profileImage ? (
                <img src={user.profileImage} className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg font-semibold">{user?.name?.charAt(0).toUpperCase()}</span>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-transparent text-white hover:text-gray-300 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* NAV BAR */}
      <nav className="bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-6 py-3 text-sm font-medium transition ${isActive(item.path) ? "bg-red-600 text-white" : "hover:bg-gray-800 text-white"}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default CustomerHeader;
