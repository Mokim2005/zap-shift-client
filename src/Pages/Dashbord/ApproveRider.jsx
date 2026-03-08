import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { Bike } from "lucide-react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const ApproveRider = () => {
  const axiosSecure = UseAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  // Update rider status
  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}/role`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider has been ${status}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  const handleApproval = (rider) => updateRiderStatus(rider, "approve");
  const handleRejection = (rider) => updateRiderStatus(rider, "rejected");

  // Delete rider
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Rider request will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Rider request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approve":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "rejected":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Approve Riders
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Pending Approval: {riders.length} rider{riders.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
          <Bike className="w-6 h-6" />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">District</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Application Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Work Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {riders.map((rider, i) => (
                <motion.tr
                  key={rider._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  className="transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/40 hover:shadow-md cursor-pointer"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">{i + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{rider.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{rider.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{rider.district}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(rider.status)}`}>
                      {rider.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{rider.workStatus}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110">
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleApproval(rider)}
                        className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 hover:scale-110"
                      >
                        <FaUserCheck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRejection(rider)}
                        className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 hover:scale-110"
                      >
                        <IoPersonRemoveSharp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(rider._id)}
                        className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 hover:scale-110"
                      >
                        <FaTrashCan className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {riders.length === 0 && (
            <div className="text-center py-12">
              <Bike className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No pending rider approvals
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                All riders have been processed
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ApproveRider;