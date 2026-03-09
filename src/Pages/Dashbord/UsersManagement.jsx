import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import { Users, Search, AlertCircle, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";

const UsersManagement = () => {
  const axiosSecure = UseAxiosSecure();
  const { user, loading: authLoading } = UseAuth();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search to avoid too many requests
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const {
    data: users = [],
    isLoading,
    refetch,
    error,
    isFetching
  } = useQuery({
    queryKey: ["users", debouncedSearch],
    queryFn: async () => {
      try {
        // Ensure user is authenticated before making request
        if (!user) {
          throw new Error("User not authenticated");
        }

        // Fetch all users with optional search parameter
        // Token is automatically added by UseAxiosSecure interceptor
        const res = await axiosSecure.get("/users", {
          params: debouncedSearch ? { searchText: debouncedSearch } : {}
        });
        
        return res.data || [];
      } catch (err) {
        console.error("Error fetching users:", err);
        
        // Handle specific error cases
        if (err.response?.status === 401) {
          throw new Error("Authentication failed. Please login again.");
        } else if (err.response?.status === 403) {
          throw new Error("Access denied. Admin privileges required.");
        } else if (err.response?.status === 404) {
          throw new Error("Users endpoint not found.");
        } else if (err.message === "User not authenticated") {
          throw err;
        } else {
          throw new Error(err.response?.data?.message || "Failed to fetch users");
        }
      }
    },
    enabled: !!user && !authLoading, // Only run query when user is authenticated
    staleTime: 30000, // Data stays fresh for 30 seconds
    cacheTime: 300000, // Cache for 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on auth errors
      if (error.message.includes("Authentication") || error.message.includes("Access denied")) {
        return false;
      }
      // Retry other errors up to 2 times
      return failureCount < 2;
    },
    refetchOnWindowFocus: false, // Don't refetch on window focus
    onError: (error) => {
      console.error("Query error:", error);
    }
  });

  const handleMakeAdmin = async (user) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Make ${user.displayName} an admin?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, make admin!'
      });

      if (result.isConfirmed) {
        const response = await axiosSecure.patch(`/users/${user._id}/role`, { 
          role: "admin" 
        });
        
        if (response.data) {
          Swal.fire("Success!", `${user.displayName} is now admin.`, "success");
          refetch();
        }
      }
    } catch (error) {
      console.error("Error making admin:", error);
      Swal.fire(
        "Error!", 
        error.response?.data?.message || "Failed to update user role.", 
        "error"
      );
    }
  };

  const handleRemoveAdmin = async (user) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Remove admin privileges from ${user.displayName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, remove admin!'
      });

      if (result.isConfirmed) {
        const response = await axiosSecure.patch(`/users/${user._id}/role`, { 
          role: "user" 
        });
        
        if (response.data) {
          Swal.fire("Updated!", `${user.displayName} removed from admin.`, "success");
          refetch();
        }
      }
    } catch (error) {
      console.error("Error removing admin:", error);
      Swal.fire(
        "Error!", 
        error.response?.data?.message || "Failed to update user role.", 
        "error"
      );
    }
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent"></div>
        <p className="mt-4 text-xl font-semibold text-gray-600 dark:text-gray-400">
          Authenticating...
        </p>
      </div>
    );
  }

  // Show loading state while fetching users
  if (isLoading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent"></div>
        <p className="mt-4 text-xl font-semibold text-gray-600 dark:text-gray-400">
          Loading Users...
        </p>
      </div>
    );
  }

  // Show error state with retry option
  if (error) {
    const isAuthError = error.message.includes("Authentication") || error.message.includes("Access denied");
    
    return (
      <div className="space-y-6 p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
          <div className="text-red-500 dark:text-red-400 mb-4">
            {isAuthError ? (
              <AlertCircle className="w-16 h-16 mx-auto" />
            ) : (
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {isAuthError ? "Authentication Error" : "Error Loading Users"}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error.message}
          </p>
          {!isAuthError && (
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}
          {isAuthError && (
            <button
              onClick={() => window.location.href = '/login'}
              className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              Go to Login
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Users Management
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Total Users: {users?.length || 0}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg">
          <Users className="w-6 h-6" />
        </div>
      </div>

      {/* Search */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-lg border p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by name, email, or role..."
            className="w-full pl-12 pr-12 py-3 rounded-xl border bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all"
            disabled={isFetching}
          />
          
          {isFetching && (
            <div className="absolute right-12 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-indigo-500 border-r-transparent"></div>
            </div>
          )}
          
          {searchText && !isFetching && (
            <button
              onClick={() => setSearchText("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <span className="text-xl">×</span>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users?.map((user, i) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {i + 1}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=random`}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full border-2 border-indigo-100 dark:border-indigo-900 object-cover"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=random`;
                        }}
                      />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {user.displayName}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {user.email}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors font-medium text-sm"
                      >
                        <FiShieldOff className="inline w-4 h-4 mr-1" />
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="px-4 py-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 transition-colors font-medium text-sm"
                      >
                        <FaUserShield className="inline w-4 h-4 mr-1" />
                        Make Admin
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {(!users || users.length === 0) && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {searchText ? "No users found matching your search" : "No users found"}
              </p>
              {searchText && (
                <button
                  onClick={() => setSearchText("")}
                  className="mt-4 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
