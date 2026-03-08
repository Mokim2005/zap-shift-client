import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import { Users, Search } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const UsersManagement = () => {
  const axiosSecure = UseAxiosSecure();

  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [searchText]);

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users", debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: debouncedSearch ? { searchText: debouncedSearch } : {},
      });
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });

  const users = useMemo(() => data || [], [data]);

  // make admin
  const handleMakeAdmin = async (user) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Make ${user.displayName} an admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/users/${user._id}/role`, {
        role: "admin",
      });

      Swal.fire("Success!", `${user.displayName} is now admin`, "success");
      refetch();
    } catch {
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };

  // remove admin
  const handleRemoveAdmin = async (user) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Remove admin from ${user.displayName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/users/${user._id}/role`, {
        role: "user",
      });

      Swal.fire("Updated!", "Admin removed", "success");
      refetch();
    } catch {
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };

  // initial loading
  if (isLoading && !users.length) {
    return (
      <div className="text-center py-20">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-r-transparent"></div>
        <p className="mt-4 text-xl font-semibold text-gray-600 dark:text-gray-400">
          Loading Users...
        </p>
      </div>
    );
  }

  // error state
  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-semibold mb-4">
          Failed to load users
        </p>

        <button
          onClick={() => refetch()}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">

      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Users Management
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Total Users: {users.length}
            {isFetching && (
              <span className="ml-2 text-xs text-indigo-500">
                Searching...
              </span>
            )}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg">
          <Users className="w-6 h-6" />
        </div>
      </div>

      {/* search */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-lg border p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
          />

          {searchText && (
            <button
              onClick={() => setSearchText("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* table */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-lg border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b">

              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold">Actions</th>
              </tr>

            </thead>

            <tbody className="divide-y">

              {users.map((user, i) => (

                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20"
                >

                  <td className="px-6 py-4">{i + 1}</td>

                  <td className="px-6 py-4 flex items-center gap-3">

                    <img
                      src={
                        user.photoURL ||
                        `https://ui-avatars.com/api/?name=${user.displayName}`
                      }
                      className="w-10 h-10 rounded-full"
                    />

                    <span>{user.displayName}</span>

                  </td>

                  <td className="px-6 py-4">{user.email}</td>

                  <td className="px-6 py-4">
                    {user.role || "user"}
                  </td>

                  <td className="px-6 py-4">

                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg"
                      >
                        <FiShieldOff className="inline mr-1" />
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="px-3 py-2 bg-green-100 text-green-600 rounded-lg"
                      >
                        <FaUserShield className="inline mr-1" />
                        Make Admin
                      </button>
                    )}

                  </td>

                </motion.tr>

              ))}

            </tbody>

          </table>

          {!users.length && (
            <div className="text-center py-16 text-gray-500">
              No users found
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default UsersManagement;