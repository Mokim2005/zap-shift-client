import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import GlassCard from "../../Components/GlassCard";
import GlassLoading from "../../Components/GlassLoading";

const MyProfile = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchProfileData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      try {
        const response = await axiosSecure.get(`/user/${user.email}`);
        setProfileData(response.data);
        setFormData(response.data);
      } catch (err) {
        // If user doesn't exist in database (404), create a default profile from Firebase user
        if (err.response?.status === 404) {
          const defaultProfile = {
            email: user.email,
            displayName: user.displayName || "User",
            photoURL: user.photoURL || "",
            phone: "",
            address: "",
            city: "",
            zipCode: "",
            role: "user",
            createdAt: new Date().toISOString(),
          };
          setProfileData(defaultProfile);
          setFormData(defaultProfile);
          console.log(
            "User profile not found in database. Using Firebase user data.",
          );
        } else {
          throw err;
        }
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile data. Please try again.");

      // Fallback: Use basic Firebase user data
      if (user) {
        const fallbackProfile = {
          email: user.email,
          displayName: user.displayName || "User",
          photoURL: user.photoURL || "",
          phone: "",
          address: "",
          city: "",
          zipCode: "",
          role: "user",
        };
        setProfileData(fallbackProfile);
        setFormData(fallbackProfile);
        setError("");
      }
    } finally {
      setLoading(false);
    }
  }, [user, axiosSecure]);

  useEffect(() => {
    if (user?.email) {
      fetchProfileData();
    }
  }, [user, fetchProfileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);
      setError("");

      const updateData = {
        email: user.email,
        displayName: formData.displayName || user.displayName,
        phone: formData.phone || "",
        address: formData.address || "",
        city: formData.city || "",
        zipCode: formData.zipCode || "",
        photoURL: formData.photoURL || user.photoURL || "",
        role: profileData?.role || "user",
      };

      let response;
      try {
        // Try to update existing profile
        response = await axiosSecure.put(`/user/${user.email}`, updateData);
      } catch (err) {
        // If profile doesn't exist (404), create it instead
        if (err.response?.status === 404) {
          response = await axiosSecure.post("/user", updateData);
        } else {
          throw err;
        }
      }

      setProfileData(response.data);
      setFormData(response.data);
      setSuccess("Profile updated successfully!");
      setIsEditing(false);

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again.",
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
    setError("");
  };

  // Helper function to get role badge info
  const getRoleBadgeInfo = (role) => {
    const roleStyles = {
      admin: {
        icon: "👑",
        label: "Admin",
        bgColor: "from-purple-500/20 to-pink-500/20",
        textColor: "text-purple-700 dark:text-purple-300",
        borderColor: "border-purple-300/50 dark:border-purple-500/50",
      },
      rider: {
        icon: "🏍️",
        label: "Rider",
        bgColor: "from-orange-500/20 to-red-500/20",
        textColor: "text-orange-700 dark:text-orange-300",
        borderColor: "border-orange-300/50 dark:border-orange-500/50",
      },
      user: {
        icon: "👤",
        label: "User",
        bgColor: "from-blue-500/20 to-cyan-500/20",
        textColor: "text-blue-700 dark:text-blue-300",
        borderColor: "border-blue-300/50 dark:border-blue-500/50",
      },
    };
    return roleStyles[role?.toLowerCase()] || roleStyles.user;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="relative z-10">
          <GlassLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-3">
              My Profile
            </h1>
            <p className="text-gray-100 drop-shadow-md text-lg">
              Manage your account information and personal details
            </p>
          </div>
        </motion.div>

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10, x: "-50%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="px-6 py-4 bg-green-500/30 border border-green-500/50 text-green-200 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-3xl">
              <span className="text-2xl">✓</span>
              <span className="font-semibold">{success}</span>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/30 border border-red-500/50 rounded-xl text-red-200 font-semibold backdrop-blur-3xl"
          >
            ⚠️ {error}
          </motion.div>
        )}

        {!isEditing ? (
          // Display Mode
          <div className="space-y-6">
            {/* Profile Header Card */}
            <GlassCard className="p-0 overflow-hidden bg-white/15 backdrop-blur-3xl border-2 border-white/25">
              {/* Background Gradient */}
              <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 relative shadow-lg">
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent"></div>
              </div>

              {/* Profile Info */}
              <div className="px-6 pb-6 relative -mt-16">
                <div className="flex flex-col md:flex-row md:items-end gap-6">
                  {/* Avatar */}
                  <div className="shrink-0">
                    <div className="relative w-32 h-32">
                      {profileData?.photoURL ? (
                        <img
                          src={profileData.photoURL}
                          alt={profileData.displayName}
                          className="w-full h-full rounded-2xl object-cover border-4 border-white/60 shadow-2xl dark:border-white/30"
                        />
                      ) : (
                        <div className="w-full h-full rounded-2xl bg-linear-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center text-white text-5xl font-bold border-4 border-white/60 shadow-2xl dark:border-white/30">
                          {profileData?.displayName?.charAt(0)?.toUpperCase() ||
                            "U"}
                        </div>
                      )}
                      <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="grow pt-4">
                    <h2 className="text-3xl font-bold text-white mb-1">
                      {profileData?.displayName || "User Profile"}
                    </h2>
                    <p className="text-gray-100 mb-2 text-lg">
                      {profileData?.email}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(() => {
                        const roleInfo = getRoleBadgeInfo(profileData?.role);
                        return (
                          <span
                            className={`px-5 py-2 bg-linear-to-r ${roleInfo.bgColor} ${roleInfo.textColor} rounded-full text-sm font-bold border ${roleInfo.borderColor} backdrop-blur-md shadow-md`}
                          >
                            {roleInfo.icon} {roleInfo.label.toUpperCase()}
                          </span>
                        );
                      })()}
                      {profileData?.city && (
                        <span className="px-5 py-2 bg-green-500/30 text-green-200 rounded-full text-sm font-semibold border border-green-500/50 backdrop-blur-md shadow-md">
                          📍 {profileData.city}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Edit Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 text-center flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    ✏️ Edit Profile
                  </motion.button>
                </div>
              </div>
            </GlassCard>

            {/* Details Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Card */}
              <div>
                <GlassCard className="p-6 h-full bg-white/15 backdrop-blur-3xl border-2 border-white/25 shadow-xl hover:shadow-2xl">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">✉️</div>
                    <div className="grow">
                      <p className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-1">
                        Email Address
                      </p>
                      <p className="text-lg font-bold text-white break-all">
                        {profileData?.email || "Not provided"}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Phone Card */}
              <div>
                <GlassCard className="p-6 h-full bg-white/15 backdrop-blur-3xl border-2 border-white/25 shadow-xl hover:shadow-2xl">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">📱</div>
                    <div className="grow">
                      <p className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-1">
                        Phone Number
                      </p>
                      <p className="text-lg font-bold text-white">
                        {profileData?.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Address Card */}
              <div>
                <GlassCard className="p-6 md:col-span-2 lg:col-span-1 bg-white/15 backdrop-blur-3xl border-2 border-white/25 shadow-xl hover:shadow-2xl">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🏠</div>
                    <div className="grow">
                      <p className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-1">
                        Address
                      </p>
                      <p className="text-lg font-bold text-white">
                        {profileData?.address || "Not provided"}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* City Card */}
              <div>
                <GlassCard className="p-6 md:col-span-2 lg:col-span-1 bg-white/15 backdrop-blur-3xl border-2 border-white/25 shadow-xl hover:shadow-2xl">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🌆</div>
                    <div className="grow">
                      <p className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-1">
                        City
                      </p>
                      <p className="text-lg font-bold text-white">
                        {profileData?.city || "Not provided"}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Zip Code Card */}
              <div>
                <GlassCard className="p-6 md:col-span-2 lg:col-span-1 bg-white/15 backdrop-blur-3xl border-2 border-white/25 shadow-xl hover:shadow-2xl">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">📮</div>
                    <div className="grow">
                      <p className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-1">
                        Zip Code
                      </p>
                      <p className="text-lg font-bold text-white">
                        {profileData?.zipCode || "Not provided"}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        ) : (
          // Edit Mode
          <div>
            <GlassCard className="p-8 bg-white/15 backdrop-blur-3xl border-2 border-white/25 shadow-2xl\">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-4xl">✏️</span>
                Edit Profile Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Display Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName || ""}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 bg-white/20 border-2 border-white/30 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-white/50 transition-all font-semibold"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email (Read-only) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider">
                    Email (Cannot be changed)
                  </label>
                  <input
                    type="email"
                    value={profileData?.email || ""}
                    disabled
                    className="w-full px-5 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-gray-300 cursor-not-allowed opacity-60 font-semibold"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 bg-white/20 border-2 border-white/30 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-white/50 transition-all font-semibold"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 bg-white/20 border-2 border-white/30 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-white/50 transition-all font-semibold"
                    placeholder="Enter your city"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 bg-white/20 border-2 border-white/30 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-white/50 transition-all font-semibold"
                    placeholder="Enter your address"
                  />
                </div>

                {/* Zip Code */}
                <div>
                  <label className="block text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode || ""}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 bg-white/20 border-2 border-white/30 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-white/50 transition-all font-semibold"
                    placeholder="Enter your zip code"
                  />
                </div>

                {/* Photo URL */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    name="photoURL"
                    value={formData.photoURL || ""}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 bg-white/20 border-2 border-white/30 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-white/50 transition-all font-semibold"
                    placeholder="Enter photo URL"
                  />
                </div>

                {/* Preview */}
                {formData.photoURL && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-semibold text-gray-200 mb-3">
                      Preview:
                    </p>
                    <img
                      src={formData.photoURL}
                      alt="Preview"
                      className="w-32 h-32 rounded-xl object-cover border-2 border-white/50"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-10">
                <button
                  onClick={handleUpdateProfile}
                  disabled={updating}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                >
                  {updating ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Saving...
                    </>
                  ) : (
                    <>✓ Save Changes</>
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={updating}
                  className="flex-1 px-6 py-4 bg-red-500/50 hover:bg-red-600/50 border border-red-500/50 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                >
                  ✕ Cancel
                </button>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
