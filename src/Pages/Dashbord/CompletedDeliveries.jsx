import React, { useState } from "react";
import { motion } from "framer-motion";
import { Package, DollarSign, CalendarIcon, MapPin } from "lucide-react";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../Components/Pagination";

const CompletedDeliveries = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const { data: Parcels = [] } = useQuery({
    queryKey: ["parcels", user.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`,
      );
      return res.data;
    },
  });

  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    } else {
      return parcel.cost * 0.6;
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(Parcels.length / ITEMS_PER_PAGE);
  const paginatedParcels = Parcels.slice(
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
            Completed Deliveries
          </h2>
          <p className="text-gray-100/70 mt-1">
            Total: {Parcels.length} deliveries completed
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg drop-shadow-lg"
        >
          <Package className="w-6 h-6" />
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
                  Date
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  District
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  Cost
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  Payout
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  Action
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
                  whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.15)" }}
                  className="transition-all duration-300 hover:bg-green-500/10"
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

                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-100">
                      <CalendarIcon className="w-3 h-3 text-gray-300" />
                      {new Date(parcel.createdAt).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-100">
                      <MapPin className="w-3 h-3 text-orange-300" />
                      {parcel.senderDistrict}
                    </div>
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full bg-blue-500/30 text-blue-200 border border-blue-500/50 font-semibold">
                      <DollarSign className="w-3 h-3" />
                      {parcel.cost}
                    </span>
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full bg-green-500/30 text-green-200 border border-green-500/50 font-semibold">
                      <DollarSign className="w-3 h-3" />
                      {calculatePayout(parcel).toFixed(2)}
                    </span>
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 text-xs sm:text-sm rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Cash Out
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* PAGINATION */}
      {Parcels.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default CompletedDeliveries;
