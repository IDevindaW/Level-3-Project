import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-black text-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-red-600">Task</span>
          <span className="text-white">Mate</span>
        </Link>
      </div>

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

      <div className="flex items-center gap-4">
        <Link
          to="/register"
          className="px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
        >
          Log In
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Join as a Tasker
        </Link>
      </div>
    </header>
  );
};

export default Header;