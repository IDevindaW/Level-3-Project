import React from "react";
import { Link } from "react-router-dom";

const Home = ({ user, error }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-500 text-white rounded-md">
              {error}
            </div>
          )}

          {user ? (
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">
                Welcome back, {user.name}!
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Ready to find your next task or connect with clients?
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  to="/browse-tasks"
                  className="px-8 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium"
                >
                  Browse Tasks
                </Link>
                <Link
                  to="/post-task"
                  className="px-8 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition font-medium"
                >
                  Post a Task
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">
                Welcome to TaskMate
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Connect with skilled professionals for all your home and business needs
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  to="/register"
                  className="px-8 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition font-medium"
                >
                  Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How TaskMate Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
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
              <h3 className="text-xl font-semibold mb-2">1. Search</h3>
              <p className="text-gray-600">
                Find the perfect tasker for your needs from our network of skilled professionals
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
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
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Connect</h3>
              <p className="text-gray-600">
                Chat directly with taskers, discuss details, and get quotes
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Get It Done</h3>
              <p className="text-gray-600">
                Book the service, get your task completed, and leave a review
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Plumbing",
              "Electrical",
              "Painting",
              "Carpentry",
              "Cleaning",
              "Moving",
              "Gardening",
              "Handyman",
            ].map((service) => (
              <div
                key={service}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer text-center"
              >
                <h3 className="font-semibold text-lg">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="bg-red-600 text-white py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of satisfied customers and skilled taskers
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-white text-red-600 rounded-md hover:bg-gray-100 transition font-medium"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;