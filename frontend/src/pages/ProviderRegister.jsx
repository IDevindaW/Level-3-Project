import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const ProviderRegister = ({ setUser }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    yearsOfExperience: "",
    serviceCategory: "",
    serviceSubCategory: "",
    serviceDescription: "",
    serviceAddress: "",
    workingDays: "",
    preferredTime: "",
    serviceCharge: "",
    consultationIncluded: false,
    followupSupportIncluded: false,
    warrantyIncluded: false,
    contactNumber: "",
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/services/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (form.serviceCategory) {
        try {
          const res = await axios.get(
            `/api/services/categories/${form.serviceCategory}/subcategories`
          );
          setSubcategories(res.data);
        } catch (err) {
          console.error("Failed to fetch subcategories:", err);
        }
      } else {
        setSubcategories([]);
      }
    };
    fetchSubcategories();
  }, [form.serviceCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate required fields
    if (!form.serviceCategory || !form.serviceSubCategory) {
      setError("Please select service category and subcategory");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/auth/register/provider", {
        name: form.name,
        email: form.email,
        password: form.password,
        yearsOfExperience: form.yearsOfExperience || null,
        serviceCategory: form.serviceCategory,
        serviceSubCategory: form.serviceSubCategory,
        serviceDescription: form.serviceDescription,
        serviceAddress: form.serviceAddress,
        workingDays: form.workingDays,
        preferredTime: form.preferredTime,
        serviceCharge: form.serviceCharge,
        consultationIncluded: form.consultationIncluded,
        followupSupportIncluded: form.followupSupportIncluded,
        warrantyIncluded: form.warrantyIncluded,
        contactNumber: form.contactNumber,
      });

      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Join TaskMate</h1>
          <div className="h-1 w-20 bg-red-600"></div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Icon and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
              <span className="text-3xl">🔧</span>
            </div>
            <h2 className="text-2xl font-bold">Create your Professional account</h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-gray-50"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-gray-50"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Create a password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-gray-50"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-gray-50"
                      value={form.confirmPassword}
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Service Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Category
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-gray-50"
                    value={form.serviceCategory}
                    onChange={(e) => setForm({ ...form, serviceCategory: e.target.value, serviceSubCategory: "" })}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Sub Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Sub Category
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-gray-50"
                    value={form.serviceSubCategory}
                    onChange={(e) => setForm({ ...form, serviceSubCategory: e.target.value })}
                    required
                    disabled={!form.serviceCategory}
                  >
                    <option value="">Select subcategory</option>
                    {subcategories.map((subcat) => (
                      <option key={subcat.id} value={subcat.id}>
                        {subcat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Description
                  </label>
                  <textarea
                    placeholder="Please describe the work"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-gray-50 resize-none"
                    rows="4"
                    value={form.serviceDescription}
                    onChange={(e) => setForm({ ...form, serviceDescription: e.target.value })}
                  />
                </div>

                {/* Profile Photo - Placeholder */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded border border-gray-300 hover:bg-gray-200"
                    >
                      Choose file
                    </button>
                    <span className="text-sm text-gray-500">No file chosen</span>
                  </div>
                </div>

                {/* Service Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Address
                  </label>
                  <input
                    type="text"
                    placeholder="No: ...."
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-gray-50"
                    value={form.serviceAddress}
                    onChange={(e) => setForm({ ...form, serviceAddress: e.target.value })}
                  />
                </div>

                {/* Upload Verification Files - Placeholder */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Verification Files(optional)
                  </label>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4">
                        <button
                          type="button"
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded border border-gray-300 hover:bg-gray-200"
                        >
                          Choose file
                        </button>
                        <span className="text-sm text-gray-500">No file chosen</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Years of Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience(Optional)
                  </label>
                  <input
                    type="number"
                    placeholder="Years"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-gray-50"
                    value={form.yearsOfExperience}
                    onChange={(e) => setForm({ ...form, yearsOfExperience: e.target.value })}
                  />
                </div>

                {/* Images to Display - Placeholder */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Images to Display in the Profile (Previous jobs or Business)
                  </label>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="flex items-center gap-4">
                        <button
                          type="button"
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded border border-gray-300 hover:bg-gray-200"
                        >
                          Choose file
                        </button>
                        <span className="text-sm text-gray-500">No file chosen</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Working Days */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Working Days(optional)
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-gray-50"
                      value={form.workingDays}
                      onChange={(e) => setForm({ ...form, workingDays: e.target.value })}
                    >
                      <option value="">Week Days</option>
                      <option value="weekdays">Weekdays Only</option>
                      <option value="weekends">Weekends Only</option>
                      <option value="all">All Days</option>
                    </select>
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-gray-50"
                      value={form.preferredTime}
                      onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                    >
                      <option value="">Select time</option>
                      <option value="morning">Morning (6AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 6PM)</option>
                      <option value="evening">Evening (6PM - 10PM)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                {/* Service Charge */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Charge (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="0/Hourly"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-gray-50"
                    value={form.serviceCharge}
                    onChange={(e) => setForm({ ...form, serviceCharge: e.target.value })}
                  />
                </div>

                {/* Special Benefits */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Benefits included
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <span className="mr-2 text-green-600">+</span>
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={form.consultationIncluded}
                        onChange={(e) => setForm({ ...form, consultationIncluded: e.target.checked })}
                      />
                      <span className="text-gray-700">Consultation</span>
                      <span className="ml-2 text-gray-400">-</span>
                    </label>
                    <label className="flex items-center">
                      <span className="mr-2 text-green-600">+</span>
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={form.followupSupportIncluded}
                        onChange={(e) => setForm({ ...form, followupSupportIncluded: e.target.checked })}
                      />
                      <span className="text-gray-700">Follow up support</span>
                      <span className="ml-2 text-gray-400">-</span>
                    </label>
                    <label className="flex items-center">
                      <span className="mr-2 text-green-600">+</span>
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={form.warrantyIncluded}
                        onChange={(e) => setForm({ ...form, warrantyIncluded: e.target.checked })}
                      />
                      <span className="text-gray-700">1 Year of Warrenty</span>
                      <span className="ml-2 text-gray-400">-</span>
                    </label>
                  </div>
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter contact number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-gray-50"
                    value={form.contactNumber}
                    onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>

            {/* Sign In Link */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-red-600 hover:text-red-700 font-medium">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProviderRegister;