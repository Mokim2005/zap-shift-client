import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);

  // Parcels
  const { data: parcels = [], refetch: parcelRefetch } = useQuery({
    queryKey: ["parcels", "pending-pikup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pikup"
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
        `/riders?status=approve&district=${selectedParcel.senderDistrict}&workStatus=available`
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
    <div className="space-y-6">

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        Assign Riders: {parcels.length}
      </h2>

      {/* ===== Parcel Card ===== */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Cost</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Created</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">District</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

              {parcels.map((parcel, i) => (
                <motion.tr
                  key={parcel._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    backgroundColor: "rgba(59,130,246,0.06)",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                  }}
                  className="transition-all duration-300"
                >
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{parcel.parcelName}</td>
                  <td className="px-6 py-4">${parcel.cost}</td>
                  <td className="px-6 py-4">{parcel.createdAt}</td>
                  <td className="px-6 py-4">{parcel.senderDistrict}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openAssignRiderModal(parcel)}
                      className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 hover:shadow-md transition-all duration-300"
                    >
                      Find Rider
                    </button>
                  </td>
                </motion.tr>
              ))}

            </tbody>

          </table>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      <AnimatePresence>
        {selectedParcel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-[500px] max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Available Riders ({riders.length})
              </h3>

              <div className="space-y-3">

                {riders.map((rider) => (
                  <motion.div
                    key={rider._id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/40 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {rider.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {rider.email}
                      </p>
                    </div>

                    <button
                      onClick={() => handleAssignRider(rider)}
                      className="px-3 py-1 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 hover:shadow-md transition-all duration-300"
                    >
                      Assign
                    </button>
                  </motion.div>
                ))}

              </div>

              <button
                onClick={() => setSelectedParcel(null)}
                className="mt-6 w-full py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
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

export default AssignRiders;