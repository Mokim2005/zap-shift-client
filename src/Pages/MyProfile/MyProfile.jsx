import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Zap,
  CheckCircle,
  X,
} from "lucide-react";
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
        bgColor: "bg-purple-500/30",
        textColor: "text-purple-200",
        borderColor: "border-purple-500/50",
      },
      rider: {
        icon: "🏍️",
        label: "Rider",
        bgColor: "bg-orange-500/30",
        textColor: "text-orange-200",
        borderColor: "border-orange-500/50",
      },
      user: {
        icon: "👤",
        label: "User",
        bgColor: "bg-blue-500/30",
        textColor: "text-blue-200",
        borderColor: "border-blue-500/50",
      },
    };
    return roleStyles[role?.toLowerCase()] || roleStyles.user;
  };

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4">
      {/* Loading State */}
      {loading && <GlassLoading message="Loading your profile..." />}

      {loading ? null : (
        <>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
          >
            <div>
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                My Profile
              </h2>
              <p className="text-gray-100/70 mt-1">
                Manage your account information
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-4 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 text-white shadow-lg drop-shadow-lg"
            >
              <User className="w-6 h-6" />
            </motion.div>
          </motion.div>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mb-4"
            >
              <div className="px-6 py-4 bg-green-500/30 border border-green-500/50 text-green-200 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-3xl">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">{success}</span>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 px-6 py-4 bg-red-500/30 border border-red-500/50 rounded-2xl text-red-200 font-semibold backdrop-blur-3xl flex items-center gap-3"
            >
              <X className="w-5 h-5" />
              {error}
            </motion.div>
          )}

          {!isEditing ? (
            // Display Mode
            <div className="space-y-6">
              {/* Profile Header Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/15 backdrop-blur-3xl rounded-2xl border border-white/25 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Background Gradient */}
                <div className="h-32 bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500 relative shadow-lg">
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
                </div>

                {/* Profile Info */}
                <div className="px-4 sm:px-6 md:px-8 pb-6 relative -mt-16">
                  <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
                    {/* Avatar */}
                    <div className="shrink-0">
                      <div className="relative w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32">
                        {profileData?.photoURL ? (
                          <img
                            src={profileData.photoURL}
                            alt={profileData.displayName}
                            className="w-full h-full rounded-2xl object-cover border-4 border-white/60 shadow-2xl"
                          />
                        ) : (
                          <div
                            className="w-full h-full rounded-2xl bg-linear-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center text-white font-bold border-4 border-white/60 shadow-2xl"
                            style={{ fontSize: "3rem" }}
                          >
                            {profileData?.displayName
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}
                          </div>
                        )}
                        <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="grow pt-2 md:pt-4">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                        {profileData?.displayName || "User Profile"}
                      </h3>
                      <p className="text-gray-100/80 mb-3 text-sm sm:text-base">
                        {profileData?.email}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(() => {
                          const roleInfo = getRoleBadgeInfo(profileData?.role);
                          return (
                            <span
                              className={`px-4 py-2 text-xs sm:text-sm ${roleInfo.bgColor} ${roleInfo.textColor} rounded-full font-bold border ${roleInfo.borderColor} backdrop-blur-3xl shadow-md`}
                            >
                              {roleInfo.icon} {roleInfo.label}
                            </span>
                          );
                        })()}
                        {profileData?.city && (
                          <span className="px-4 py-2 text-xs sm:text-sm bg-green-500/30 text-green-200 rounded-full font-semibold border border-green-500/50 backdrop-blur-3xl shadow-md flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {profileData.city}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Edit Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="px-5 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                      <Zap className="w-4 h-4" />
                      Edit Profile
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Email Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white/15 backdrop-blur-3xl rounded-2xl border border-white/25 shadow-xl hover:shadow-2xl p-4 sm:p-6 transition-all duration-300 hover:bg-white/20"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-blue-500/30 rounded-lg">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-200" />
                    </div>
                    <div className="grow">
                      <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                        Email
                      </p>
                      <p className="text-sm sm:text-base font-bold text-white break-all">
                        {profileData?.email || "Not provided"}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Phone Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="bg-white/15 backdrop-blur-3xl rounded-2xl border border-white/25 shadow-xl hover:shadow-2xl p-4 sm:p-6 transition-all duration-300 hover:bg-white/20"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-green-500/30 rounded-lg">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-200" />
                    </div>
                    <div className="grow">
                      <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                        Phone
                      </p>
                      <p className="text-sm sm:text-base font-bold text-white">
                        {profileData?.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* City Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white/15 backdrop-blur-3xl rounded-2xl border border-white/25 shadow-xl hover:shadow-2xl p-4 sm:p-6 transition-all duration-300 hover:bg-white/20"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-orange-500/30 rounded-lg">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-orange-200" />
                    </div>
                    <div className="grow">
                      <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                        City
                      </p>
                      <p className="text-sm sm:text-base font-bold text-white">
                        {profileData?.city || "Not provided"}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Address Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="sm:col-span-2 lg:col-span-1 bg-white/15 backdrop-blur-3xl rounded-2xl border border-white/25 shadow-xl hover:shadow-2xl p-4 sm:p-6 transition-all duration-300 hover:bg-white/20"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-purple-500/30 rounded-lg">
                      <Home className="w-5 h-5 sm:w-6 sm:h-6 text-purple-200" />
                    </div>
                    <div className="grow">
                      <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                        Address
                      </p>
                      <p className="text-sm sm:text-base font-bold text-white">
                        {profileData?.address || "Not provided"}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Zip Code Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="sm:col-span-2 lg:col-span-1 bg-white/15 backdrop-blur-3xl rounded-2xl border border-white/25 shadow-xl hover:shadow-2xl p-4 sm:p-6 transition-all duration-300 hover:bg-white/20"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-pink-500/30 rounded-lg">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-pink-200" />
                    </div>
                    <div className="grow">
                      <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                        Zip Code
                      </p>
                      <p className="text-sm sm:text-base font-bold text-white">
                        {profileData?.zipCode || "Not provided"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            // Edit Mode
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/15 backdrop-blur-3xl rounded-2xl border border-white/25 shadow-xl p-4 sm:p-6 md:p-8"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 sm:w-7 sm:h-7" />
                Edit Profile
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Display Name */}
                <div className="md:col-span-2">
                  <label className="block text-xs sm:text-sm font-bold text-gray-200 mb-2 sm:mb-3 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-white/20 border-2 border-white/30 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-white/50 transition-all font-semibold text-sm sm:text-base"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email (Read-only) */}
                <div className="md:col-span-2">
                  <label className="block text-xs sm:text-sm font-bold text-gray-200 mb-2 sm:mb-3 uppercase tracking-wider">
                    Email (Cannot be changed)
                  </label>
                  <input
                    type="email"
                    value={profileData?.email || ""}
                    disabled
                    className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-white/10 border-2 border-white/20 rounded-xl text-gray-300 cursor-not-allowed opacity-60 text-sm sm:text-base"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-200 mb-2 sm:mb-3 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-white/20 border-2 border-white/30 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-white/50 transition-all font-semibold text-sm sm:text-base"
                    placeholder="Enter your phone"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-200 mb-2 sm:mb-3 uppercase tracking-wider">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-white/20 border-2 border-white/30 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-white/50 transition-all font-semibold text-sm sm:text-base"
                    placeholder="Enter your city"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-xs sm:text-sm font-bold text-gray-200 mb-2 sm:mb-3 uppercase tracking-wider">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-white/20 border-2 border-white/30 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-white/50 transition-all font-semibold text-sm sm:text-base"
                    placeholder="Enter your address"
                  />
                </div>

                {/* Zip Code */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-200 mb-2 sm:mb-3 uppercase tracking-wider">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-white/20 border-2 border-white/30 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-white/50 transition-all font-semibold text-sm sm:text-base"
                    placeholder="Enter your zip code"
                  />
                </div>

                {/* Photo URL */}
                <div className="md:col-span-2">
                  <label className="block text-xs sm:text-sm font-bold text-gray-200 mb-2 sm:mb-3 uppercase tracking-wider">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    name="photoURL"
                    value={formData.photoURL || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-white/20 border-2 border-white/30 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-white/50 transition-all font-semibold text-sm sm:text-base"
                    placeholder="Enter photo URL"
                  />
                </div>

                {/* Preview */}
                {formData.photoURL && (
                  <div className="md:col-span-2">
                    <p className="text-xs sm:text-sm font-semibold text-gray-200 mb-3">
                      Preview:
                    </p>
                    <img
                      src={formData.photoURL}
                      alt="Preview"
                      className="w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 rounded-xl object-cover border-2 border-white/50"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 sm:gap-4 mt-8 sm:mt-10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUpdateProfile}
                  disabled={updating}
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {updating ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      Save Changes
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancel}
                  disabled={updating}
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-red-500/30 hover:bg-red-500/50 border-2 border-red-500/50 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default MyProfile;
