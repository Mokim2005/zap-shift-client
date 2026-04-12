import { useEffect, useRef, useState } from "react";
import { Package, CreditCard } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import gsap from "gsap";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Pagination from "../../Components/Pagination";
import { FaTrashCan } from "react-icons/fa6";

const MyParcels = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const headerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myparcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  /* ANIMATION */
  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
      });
    }
  }, []);

  /* DELETE */
  const handleParcelDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/parcels/${id}`);

      if (res.data.deletedCount) {
        refetch();
        Swal.fire("Deleted!", "Parcel has been removed.", "success");
      }
    }
  };

  /* PAYMENT FIXED */
  const handlePayment = async (parcel) => {
    try {
      const paymentInfo = {
        cost: parcel.cost,
        parcelId: parcel._id,
        senderEmail: parcel.senderEmail,
        parcelName: parcel.parcelName,
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo,
      );

      if (res.data?.url) {
        window.location.replace(res.data.url);
      } else {
        Swal.fire("Error", "Payment session failed", "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Payment failed", "error");
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(parcels.length / ITEMS_PER_PAGE);
  const paginatedParcels = parcels.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="min-h-screen space-y-6 p-4 sm:p-6 md:p-8 relative pt-6">
      {/* HEADER */}
      {/* <div
        ref={headerRef}
        className="flex flex-col items-center justify-center text-center relative z-20 
  bg-gradient-to-r from-blue-700/60 via-indigo-700/60 to-purple-700/60 
  backdrop-blur-xl p-8 rounded-2xl border border-white/30 shadow-xl"
      >
        <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">
          My Parcels
        </h2>

        <p className="text-white mt-2 font-semibold">
          Total Parcels :
          <span className="text-yellow-300 font-bold ml-2 text-lg">
            {parcels.length}
          </span>
        </p>

        <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md">
          <Package className="w-6 h-6" />
        </div>
      </div> */}

      {/* TABLE */}
      <div className="bg-white/15 dark:bg-white/15 backdrop-blur-3xl rounded-2xl border border-white/25 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/10 border-b border-white/20">
              <tr>
                {[
                  "#",
                  "Name",
                  "Cost",
                  "Payment",
                  "Tracking",
                  "Status",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-5 py-4 text-left font-semibold text-white"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-white/20">
              {paginatedParcels.map((parcel, i) => (
                <tr key={parcel._id} className="hover:bg-white/10 transition">
                  <td className="px-5 py-4 text-gray-100">
                    {(currentPage - 1) * ITEMS_PER_PAGE + i + 1}
                  </td>

                  <td className="px-5 py-4 font-medium text-white">
                    {parcel.parcelName}
                  </td>

                  <td className="px-5 py-4 font-semibold text-blue-300">
                    {parcel.cost} tk
                  </td>

                  {/* PAYMENT */}
                  <td className="px-5 py-4">
                    {parcel.paymentStatus === "paid" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-500/30 text-green-200 border border-green-500/50">
                        <CreditCard className="w-3 h-3" />
                        Paid
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePayment(parcel)}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xs font-semibold shadow-md transition"
                      >
                        Pay Now
                      </button>
                    )}
                  </td>

                  {/* TRACK */}
                  <td className="px-5 py-4 text-blue-300 font-medium">
                    <Link
                      to={`/parcel-track/${parcel.trackingId}`}
                      className="hover:text-blue-200 hover:underline transition"
                    >
                      #{parcel.trackingId}
                    </Link>
                  </td>

                  {/* STATUS */}
                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        parcel.deliveryStatus?.toLowerCase() === "delivered"
                          ? "bg-green-500/30 text-green-200 border border-green-500/50"
                          : parcel.deliveryStatus?.toLowerCase() === "pending"
                            ? "bg-yellow-500/30 text-yellow-200 border border-yellow-500/50"
                            : parcel.deliveryStatus?.toLowerCase() ===
                                "in transit"
                              ? "bg-blue-500/30 text-blue-200 border border-blue-500/50"
                              : "bg-gray-500/30 text-gray-200 border border-gray-500/50"
                      }`}
                    >
                      {parcel.deliveryStatus}
                    </span>
                  </td>

                  {/* DELETE */}
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleParcelDelete(parcel._id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/30 text-red-200 hover:bg-red-500/50 transition border border-red-500/50"
                    >
                      <FaTrashCan className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {parcels.length === 0 && (
          <div className="text-center py-20">
            <Package className="w-10 h-10 text-blue-300 mx-auto mb-3" />
            <h3 className="font-semibold text-lg text-white">
              No parcels found
            </h3>
          </div>
        )}
      </div>

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

export default MyParcels;
