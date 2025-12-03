import React from "react";
import { Link, useLocation } from "react-router-dom";

const CustomerNavbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/browse-services", label: "Browse Services", active: true },
    { path: "/my-bookings", label: "My Bookings", active: false },
    { path: "/reviews", label: "Reviews", active: false },
    { path: "/settings", label: "Settings", active: false },
  ];

  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center space-x-1">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-6 py-3 text-sm font-medium transition ${
                index === 0
                  ? "bg-red-600 text-white"
                  : "text-white hover:bg-gray-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;