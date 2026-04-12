import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Package, CheckCircle, AlertCircle, Truck } from "lucide-react";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Pagination from "../../Components/Pagination";
import Swal from "sweetalert2";

const AssignDeliveries = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Fetch parcels assigned to this rider
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`,
      );
      return res.data;
    },
  });

  // Confirm + Update parcel status
  const confirmStatusUpdate = (parcel, status) => {
    const statusText = status.split("_").join(" ");
    Swal.fire({
      title: `Are you sure?`,
      text: `Parcel status will be updated to "${statusText}"`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, update it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleStatusUpdate(parcel, status);
      }
    });
  };

  // Update parcel status
  const handleStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };

    const message = `Parcel status is updated to ${status.split("_").join(" ")}`;

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong.",
        });
      });
  };

  // Pagination Logic
  const totalPages = Math.ceil(parcels.length / ITEMS_PER_PAGE);
  const paginatedParcels = parcels.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

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
            Parcels Pending Pickup
          </h2>
          <p className="text-gray-100/70 mt-1">
            Total: {parcels.length} parcels assigned
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg drop-shadow-lg"
        >
          <Truck className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Table Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/15 backdrop-blur-3xl rounded-2xl border border-white/25 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-full table-auto">
            <thead className="bg-white/10 border-b border-white/20">
              <tr>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  #
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  Parcel Name
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  Confirm
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {paginatedParcels.map((parcel, i) => (
                <motion.tr
                  key={parcel._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.15)" }}
                  className="transition-all duration-300 hover:bg-blue-500/10"
                >
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-100">
                    {(currentPage - 1) * ITEMS_PER_PAGE + i + 1}
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-white font-medium">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-300" />
                      {parcel.parcelName}
                    </div>
                  </td>

                  {/* Confirm / Accept / Reject */}
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    {parcel.deliveryStatus === "driver_assigned" ? (
                      <div className="flex gap-1 sm:gap-2 flex-wrap">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() =>
                            confirmStatusUpdate(parcel, "rider_arriving")
                          }
                          className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg bg-green-500/30 border border-green-500/50 text-green-200 hover:bg-green-500/50 hover:shadow-md transition-all duration-300 font-medium"
                        >
                          Accept
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() =>
                            confirmStatusUpdate(parcel, "driver_rejected")
                          }
                          className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg bg-red-500/30 border border-red-500/50 text-red-200 hover:bg-red-500/50 hover:shadow-md transition-all duration-300 font-medium"
                        >
                          Reject
                        </motion.button>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full bg-green-500/30 text-green-200 border border-green-500/50 font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Accepted
                      </span>
                    )}
                  </td>

                  {/* Other actions */}
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex gap-1 sm:gap-2 flex-wrap">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() =>
                          confirmStatusUpdate(parcel, "parcel_picked_up")
                        }
                        className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg bg-blue-500/30 border border-blue-500/50 text-blue-200 hover:bg-blue-500/50 hover:shadow-md transition-all duration-300 font-medium"
                      >
                        Picked Up
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() =>
                          confirmStatusUpdate(parcel, "parcel_delivered")
                        }
                        className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg bg-purple-500/30 border border-purple-500/50 text-purple-200 hover:bg-purple-500/50 hover:shadow-md transition-all duration-300 font-medium"
                      >
                        Delivered
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* PAGINATION */}
      {parcels.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AssignDeliveries;
