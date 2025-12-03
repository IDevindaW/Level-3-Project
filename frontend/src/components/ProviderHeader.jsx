// components/ProviderHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProviderHeader = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="bg-black text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LEFT SIDE - LOGO */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-red-600">Task</span>
            <span className="text-white">Mate</span>
          </Link>
        </div>

        {/* CENTER TEXT */}
        <div className="text-center hidden md:block">
          <h2 className="text-lg text-yellow-400 font-semibold">
            Service Provider Portal
          </h2>
          <p className="text-gray-300 text-sm">
            Manage your jobs and grow your business
          </p>
        </div>

        {/* RIGHT SIDE - Profile + Logout */}
        <div className="flex items-center gap-4">
          {/* Profile Picture */}
          <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden flex items-center justify-center">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                className="w-full h-full object-cover"
                alt="profile"
              />
            ) : (
              <span className="text-lg font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* Logout Btn */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-transparent border border-gray-700 rounded-md hover:bg-gray-800 transition"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* ICON ROW — BELOW PROFILE + LOGOUT */}
      <div className="max-w-7xl mx-auto px-6 pb-3 flex justify-end gap-6">

        {/* Messages Icon */}
        <button className="relative hover:text-gray-300 transition">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>

        {/* Notifications Icon */}
        <button className="relative hover:text-gray-300 transition">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
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

        {/* Settings Icon */}
        <button className="hover:text-gray-300 transition">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>

      </div>
    </header>
  );
};

export default ProviderHeader;


