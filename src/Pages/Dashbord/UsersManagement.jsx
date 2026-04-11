import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import { Users, Search, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";

const UsersManagement = () => {
  const axiosSecure = UseAxiosSecure();
  const { user, loading: authLoading } = UseAuth();

  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users", debouncedSearch],
    enabled: !!user && !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: debouncedSearch ? { searchText: debouncedSearch } : {},
      });

      return res.data || [];
    },
  });

  const handleMakeAdmin = async (selectedUser) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Make ${selectedUser.displayName} admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/${selectedUser._id}/role`, {
        role: "admin",
      });

      if (res.data?.modifiedCount) {
        Swal.fire("Success!", "User is now Admin", "success");
        refetch();
      }
    } catch {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  const handleRemoveAdmin = async (selectedUser) => {
    const result = await Swal.fire({
      title: "Remove Admin?",
      text: `${selectedUser.displayName} will become normal user`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes Remove",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/${selectedUser._id}/role`, {
        role: "user",
      });

      if (res.data?.modifiedCount) {
        Swal.fire("Updated!", "Admin removed", "success");
        refetch();
      }
    } catch {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-r-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-lg text-white drop-shadow-lg">
          Loading users...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/30 border border-red-500/50 p-6 rounded-2xl text-center backdrop-blur-3xl"
        >
          <AlertCircle className="mx-auto mb-3 text-red-300" size={40} />
          <p className="mb-4 text-red-100">{error.message}</p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={refetch}
            className="px-5 py-2 bg-gradient-to-r from-blue-500/50 to-cyan-500/50 border border-blue-500/50 text-white rounded-lg hover:from-blue-500/70 hover:to-cyan-500/70 transition-all duration-300 font-semibold"
          >
            Retry
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:justify-between md:items-center gap-4"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            Users Management
          </h2>
          <p className="text-gray-100/70 mt-1">Total Users: {users.length}</p>
        </div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg drop-shadow-lg w-fit"
        >
          <Users size={24} />
        </motion.div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white/15 backdrop-blur-3xl rounded-2xl p-4 border border-white/25 shadow-lg"
      >
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
            size={20}
          />

          <input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search user by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/15 backdrop-blur-3xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/25 overflow-x-auto"
      >
        <table className="min-w-full w-full">
          <thead className="bg-white/10 text-sm border-b border-white/20">
            <tr>
              <th className="p-3 sm:p-4 text-left text-xs font-semibold text-white uppercase">
                #
              </th>
              <th className="p-3 sm:p-4 text-left text-xs font-semibold text-white uppercase">
                User
              </th>
              <th className="p-3 sm:p-4 text-left text-xs font-semibold text-white uppercase">
                Email
              </th>
              <th className="p-3 sm:p-4 text-left text-xs font-semibold text-white uppercase">
                Role
              </th>
              <th className="p-3 sm:p-4 text-left text-xs font-semibold text-white uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/20">
            {users.map((u, i) => (
              <motion.tr
                key={u._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{
                  backgroundColor: "rgba(59, 130, 246, 0.15)",
                }}
                className="transition-all duration-300 hover:bg-blue-500/10"
              >
                <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium text-gray-100">
                  {i + 1}
                </td>

                <td className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-[150px] sm:min-w-[200px]">
                  <img
                    src={
                      u.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        u.displayName || "User",
                      )}`
                    }
                    alt="user"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-white/30"
                  />

                  <span className="truncate text-xs sm:text-sm text-white font-medium">
                    {u.displayName || "Unknown"}
                  </span>
                </td>

                <td className="p-3 sm:p-4 text-xs sm:text-sm break-all text-gray-100">
                  {u.email}
                </td>

                <td className="p-3 sm:p-4">
                  <span
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full font-semibold border ${
                      u.role === "admin"
                        ? "bg-blue-500/30 text-blue-200 border-blue-500/50"
                        : "bg-gray-500/30 text-gray-200 border-gray-500/50"
                    }`}
                  >
                    {u.role || "user"}
                  </span>
                </td>

                <td className="p-3 sm:p-4">
                  {u.role === "admin" ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleRemoveAdmin(u)}
                      className="flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm bg-red-500/30 border border-red-500/50 text-red-200 rounded-lg hover:bg-red-500/50 transition-all duration-300 font-medium"
                    >
                      <FiShieldOff className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Remove</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleMakeAdmin(u)}
                      className="flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm bg-green-500/30 border border-green-500/50 text-green-200 rounded-lg hover:bg-green-500/50 transition-all duration-300 font-medium"
                    >
                      <FaUserShield className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Make Admin</span>
                    </motion.button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-10 text-gray-300">No users found</div>
        )}
      </motion.div>
    </div>
  );
};

export default UsersManagement;
