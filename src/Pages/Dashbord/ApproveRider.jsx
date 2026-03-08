import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { Bike } from "lucide-react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const ApproveRider = () => {
  const axiosSecure = UseAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  // Fetch riders
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  // Confirm + Update rider status
  const confirmUpdateStatus = (rider, status) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `Rider will be ${status}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: status === "approve" ? "#22c55e" : "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${status} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateRiderStatus(rider, status);
      }
    });
  };

  // Update rider status (approve/reject)
  const updateRiderStatus = async (rider, status) => {
    try {
      const res = await axiosSecure.patch(`/riders/${rider._id}/role`, {
        status,
        email: rider.email,
      });

      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider has been ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong.",
      });
    }
  };

  // Confirm + Delete rider
  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This rider request will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  // Delete rider
  const handleDelete = (id) => {
    axiosSecure.delete(`/riders/${id}`).then((res) => {
      if (res.data.deletedCount) {
        refetch();
        Swal.fire("Deleted!", "Rider request removed.", "success");
      }
    });
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Approve Riders
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Pending: {riders.filter(r => r.status !== "assigned").length}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
          <Bike className="w-6 h-6" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">District</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

              {riders.map((rider, i) => (
                <motion.tr
                  key={rider._id}
                  whileHover={{ backgroundColor: "rgba(59,130,246,0.06)" }}
                  transition={{ duration: 0.2 }}
                  className="transition-all duration-300"
                >
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{rider.name}</td>
                  <td className="px-6 py-4">{rider.email}</td>
                  <td className="px-6 py-4">{rider.district}</td>

                  {/* Status Label */}
                  <td className="px-6 py-4">
                    {rider.status === "assigned" ? (
                      <span className="px-3 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                        Assigned
                      </span>
                    ) : rider.status === "approve" ? (
                      <span className="px-3 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                        Approved
                      </span>
                    ) : rider.status === "rejected" ? (
                      <span className="px-3 py-1 rounded-full text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                        Rejected
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => setSelectedRider(rider)}
                        className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 hover:shadow-md transition-all duration-300"
                      >
                        <FaEye />
                      </button>

                      {rider.status !== "assigned" && (
                        <>
                          <button
                            onClick={() => confirmUpdateStatus(rider, "approve")}
                            className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 hover:shadow-md transition-all duration-300"
                          >
                            <FaUserCheck />
                          </button>

                          <button
                            onClick={() => confirmUpdateStatus(rider, "rejected")}
                            className="p-2 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-200 hover:shadow-md transition-all duration-300"
                          >
                            <IoPersonRemoveSharp />
                          </button>

                          <button
                            onClick={() => confirmDelete(rider._id)}
                            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 hover:shadow-md transition-all duration-300"
                          >
                            <FaTrashCan />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      {/* Rider Modal */}
      <AnimatePresence>
        {selectedRider && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-96 shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Rider Details
              </h3>

              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p><strong>Name:</strong> {selectedRider.name}</p>
                <p><strong>Email:</strong> {selectedRider.email}</p>
                <p><strong>District:</strong> {selectedRider.district}</p>
                <p><strong>Status:</strong> {selectedRider.status}</p>
              </div>

              <button
                onClick={() => setSelectedRider(null)}
                className="mt-6 w-full bg-gray-200 dark:bg-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ApproveRider;