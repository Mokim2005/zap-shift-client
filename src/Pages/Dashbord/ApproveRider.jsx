import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { Bike } from "lucide-react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Pagination from "../../Components/Pagination";

const ApproveRider = () => {
  const axiosSecure = UseAxiosSecure();
  const tableRef = useRef(null);
  const [selectedRider, setSelectedRider] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

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

  // Pagination Logic
  const totalPages = Math.ceil(riders.length / ITEMS_PER_PAGE);
  const paginatedRiders = riders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            Approve Riders
          </h2>
          <p className="text-gray-100/70 mt-1">
            Pending: {riders.filter((r) => r.status !== "assigned").length}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg drop-shadow-lg"
        >
          <Bike className="w-6 h-6" />
        </motion.div>
      </div>

      {/* Table */}
      <motion.div
        ref={tableRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/15 backdrop-blur-3xl rounded-2xl border border-white/25 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
      >
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-full table-auto">
            <thead className="bg-white/10 border-b border-white/20">
              <tr>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  #
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  Name
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  Email
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  District
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {paginatedRiders.map((rider, i) => (
                <motion.tr
                  key={rider._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{
                    backgroundColor: "rgba(59, 130, 246, 0.15)",
                  }}
                  className="transition-all duration-300 hover:bg-blue-500/10"
                >
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-100">
                    {(currentPage - 1) * ITEMS_PER_PAGE + i + 1}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-white font-medium">
                    {rider.name}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-100">
                    {rider.email}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-100">
                    {rider.district}
                  </td>

                  {/* Status Label */}
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    {rider.status === "assigned" ? (
                      <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-green-500/30 text-green-200 border border-green-500/50">
                        Assigned
                      </span>
                    ) : rider.status === "approve" ? (
                      <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-blue-500/30 text-blue-200 border border-blue-500/50">
                        Approved
                      </span>
                    ) : rider.status === "rejected" ? (
                      <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-red-500/30 text-red-200 border border-red-500/50">
                        Rejected
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-yellow-500/30 text-yellow-200 border border-yellow-500/50">
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex gap-1 sm:gap-2 flex-wrap">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setSelectedRider(rider)}
                        className="p-2 rounded-lg bg-blue-500/30 border border-blue-500/50 text-blue-200 hover:bg-blue-500/50 hover:shadow-md transition-all duration-300"
                      >
                        <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </motion.button>

                      {rider.status !== "assigned" && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() =>
                              confirmUpdateStatus(rider, "approve")
                            }
                            className="p-2 rounded-lg bg-green-500/30 border border-green-500/50 text-green-200 hover:bg-green-500/50 hover:shadow-md transition-all duration-300"
                          >
                            <FaUserCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() =>
                              confirmUpdateStatus(rider, "rejected")
                            }
                            className="p-2 rounded-lg bg-orange-500/30 border border-orange-500/50 text-orange-200 hover:bg-orange-500/50 hover:shadow-md transition-all duration-300"
                          >
                            <IoPersonRemoveSharp className="w-3 h-3 sm:w-4 sm:h-4" />
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => confirmDelete(rider._id)}
                            className="p-2 rounded-lg bg-red-500/30 border border-red-500/50 text-red-200 hover:bg-red-500/50 hover:shadow-md transition-all duration-300"
                          >
                            <FaTrashCan className="w-3 h-3 sm:w-4 sm:h-4" />
                          </motion.button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* PAGINATION */}
      {riders.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Rider Modal */}
      <AnimatePresence>
        {selectedRider && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/15 backdrop-blur-3xl border border-white/25 rounded-2xl p-6 w-96 shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-4 text-white drop-shadow-lg">
                Rider Details
              </h3>

              <div className="space-y-3 text-gray-100">
                <div className="p-3 rounded-lg bg-white/10 border border-white/20">
                  <p className="text-xs text-gray-300 uppercase tracking-wide">
                    Name
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {selectedRider.name}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/10 border border-white/20">
                  <p className="text-xs text-gray-300 uppercase tracking-wide">
                    Email
                  </p>
                  <p className="text-sm text-gray-100 break-all">
                    {selectedRider.email}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/10 border border-white/20">
                  <p className="text-xs text-gray-300 uppercase tracking-wide">
                    District
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {selectedRider.district}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/10 border border-white/20">
                  <p className="text-xs text-gray-300 uppercase tracking-wide">
                    Status
                  </p>
                  <p className="text-lg font-semibold text-blue-200 capitalize">
                    {selectedRider.status}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedRider(null)}
                className="mt-6 w-full bg-gradient-to-r from-blue-500/50 to-cyan-500/50 border border-blue-500/50 text-white py-2 rounded-lg hover:from-blue-500/70 hover:to-cyan-500/70 font-semibold transition-all duration-300"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApproveRider;
