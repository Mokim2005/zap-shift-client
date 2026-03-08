import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import { Users, Search } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const UsersManagement = () => {
  const axiosSecure = UseAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["/users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/${user._id}/role`, { role: "admin" }).then(() => {
      refetch();
      Swal.fire("Success!", `${user.displayName} is now admin.`, "success");
    });
  };

  const handleRemoveAdmin = (user) => {
    axiosSecure.patch(`/users/${user._id}/role`, { role: "user" }).then(() => {
      refetch();
      Swal.fire("Updated!", `${user.displayName} removed from admin.`, "success");
    });
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Users Management
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Total: {users.length}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg">
          <Users className="w-6 h-6" />
        </div>
      </div>

      {/* Search Card */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

              {users.map((user, i) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  whileHover={{
                    backgroundColor: "rgba(99,102,241,0.05)",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                  }}
                  className="transition-all duration-300"
                >
                  <td className="px-6 py-4">{i + 1}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.photoURL}
                        alt=""
                        className="w-10 h-10 rounded-full border"
                      />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {user.displayName}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">{user.email}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 flex gap-2">

                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300"
                      >
                        <FiShieldOff className="inline w-4 h-4 mr-1" />
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="px-4 py-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-all duration-300"
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
        </div>
      </div>

    </div>
  );
};

export default UsersManagement;