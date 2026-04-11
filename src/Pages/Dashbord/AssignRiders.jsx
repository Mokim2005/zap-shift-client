import { useQuery } from "@tanstack/react-query";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package } from "lucide-react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const tableRef = useRef(null);
  const [selectedParcel, setSelectedParcel] = useState(null);

  // Parcels
  const { data: parcels = [], refetch: parcelRefetch } = useQuery({
    queryKey: ["parcels", "pending-pikup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pikup",
      );
      return res.data;
    },
  });

  // Riders
  const { data: riders = [], refetch: riderRefetch } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel?.senderDistrict,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approve&district=${selectedParcel.senderDistrict}&workStatus=available`,
      );
      return res.data;
    },
  });

  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
  };

  const handleAssignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.name,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.trackingId,
    };

    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          setSelectedParcel(null);
          parcelRefetch();
          riderRefetch();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Rider has been assigned.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            Assign Riders: {parcels.length}
          </h2>
          <p className="text-gray-100/70 mt-1">Pending pickups available</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg drop-shadow-lg"
        >
          <Package className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* ===== Parcel Card ===== */}
      <motion.div
        ref={tableRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/15 backdrop-blur-3xl rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/25"
      >
        <div className="overflow-x-auto">
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
                  Cost
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  Created
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  District
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/20">
              {parcels.map((parcel, i) => (
                <motion.tr
                  key={parcel._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{
                    backgroundColor: "rgba(59, 130, 246, 0.15)",
                  }}
                  className="transition-all duration-300 hover:bg-blue-500/10"
                >
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-100">
                    {i + 1}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-white font-medium">
                    {parcel.parcelName}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-100">
                    <span className="bg-green-500/30 text-green-200 border border-green-500/50 px-2 py-1 rounded-full text-xs">
                      \${parcel.cost}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-100">
                    {parcel.createdAt}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-100">
                    {parcel.senderDistrict}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => openAssignRiderModal(parcel)}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-blue-500/30 border border-blue-500/50 text-blue-200 hover:bg-blue-500/50 hover:shadow-md transition-all duration-300 text-xs sm:text-sm font-medium"
                    >
                      Find Rider
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ===== MODAL ===== */}
      <AnimatePresence>
        {selectedParcel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/15 backdrop-blur-3xl border border-white/25 rounded-2xl p-6 w-full max-w-[500px] max-h-[80vh] overflow-y-auto shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-4 text-white drop-shadow-lg">
                Available Riders ({riders.length})
              </h3>

              <div className="space-y-3">
                {riders.map((rider) => (
                  <motion.div
                    key={rider._id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/10 border border-white/20 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div>
                      <p className="font-semibold text-white">{rider.name}</p>
                      <p className="text-xs sm:text-sm text-gray-100">
                        {rider.email}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleAssignRider(rider)}
                      className="px-3 py-1.5 rounded-lg bg-green-500/30 border border-green-500/50 text-green-200 hover:bg-green-500/50 hover:shadow-md transition-all duration-300 text-xs sm:text-sm font-medium whitespace-nowrap"
                    >
                      Assign
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedParcel(null)}
                className="mt-6 w-full py-2 rounded-lg bg-gradient-to-r from-red-500/50 to-orange-500/50 border border-red-500/50 text-white hover:from-red-500/70 hover:to-orange-500/70 transition-all duration-300 font-semibold"
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

export default AssignRiders;
