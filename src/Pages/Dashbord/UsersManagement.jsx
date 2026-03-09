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
      const res = await axiosSecure.patch(
        `/users/${selectedUser._id}/role`,
        { role: "admin" }
      );

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
      const res = await axiosSecure.patch(
        `/users/${selectedUser._id}/role`,
        { role: "user" }
      );

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
        <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-r-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-300 p-6 rounded-xl text-center">
          <AlertCircle className="mx-auto mb-3 text-red-500" size={40} />
          <p className="mb-4">{error.message}</p>

          <button
            onClick={refetch}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Users Management
          </h2>
          <p className="text-gray-500">
            Total Users: {users.length}
          </p>
        </div>

        <div className="p-4 bg-indigo-600 text-white rounded-xl shadow-md w-fit">
          <Users size={24} />
        </div>
      </div>

      {/* Search */}
      <div className="bg-white shadow-md rounded-xl p-4">
        <div className="relative">

          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search user..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

        <table className="min-w-[700px] w-full">

          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {users.map((u, i) => (

              <motion.tr
                key={u._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{
                  backgroundColor: "rgba(99,102,241,0.06)"
                }}
                className="border-b"
              >

                <td className="p-3">{i + 1}</td>

                <td className="p-3 flex items-center gap-3 min-w-[200px]">

                  <img
                    src={
                      u.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        u.displayName || "User"
                      )}`
                    }
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover border"
                  />

                  <span className="truncate">
                    {u.displayName || "Unknown"}
                  </span>

                </td>

                <td className="p-3 text-sm break-all">
                  {u.email}
                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      u.role === "admin"
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {u.role || "user"}
                  </span>

                </td>

                <td className="p-3">

                  {u.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(u)}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      <FiShieldOff />
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(u)}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                    >
                      <FaUserShield />
                      Make Admin
                    </button>
                  )}

                </td>

              </motion.tr>

            ))}

          </tbody>

        </table>

        {users.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No users found
          </div>
        )}

      </div>
    </div>
  );
};

export default UsersManagement;