import { useEffect, useRef } from "react";
import { Package, CreditCard } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import gsap from "gsap";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { FaTrashCan } from "react-icons/fa6";

const MyParcels = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const headerRef = useRef(null);

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
        paymentInfo
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

  /* STATUS COLOR */
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "in transit":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen space-y-6 p-4 md:p-8 bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 dark:from-gray-900 dark:via-gray-950 dark:to-black">

      {/* HEADER */}
      <div ref={headerRef} className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            My Parcels
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Total Parcels :
            <span className="text-indigo-600 font-bold ml-1">
              {parcels.length}
            </span>
          </p>
        </div>

        <div className="p-3 rounded-xl bg-indigo-600 text-white shadow-lg">
          <Package className="w-6 h-6" />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-slate-100 dark:bg-gray-800">
              <tr>
                {["#", "Name", "Cost", "Payment", "Tracking", "Status", "Actions"].map(
                  (head) => (
                    <th
                      key={head}
                      className="px-5 py-4 text-left font-semibold text-slate-700 dark:text-gray-300"
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {parcels.map((parcel, i) => (
                <tr
                  key={parcel._id}
                  className="hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition"
                >
                  <td className="px-5 py-4">{i + 1}</td>

                  <td className="px-5 py-4 font-medium">
                    {parcel.parcelName}
                  </td>

                  <td className="px-5 py-4 font-semibold text-indigo-600">
                    {parcel.cost} tk
                  </td>

                  {/* PAYMENT */}
                  <td className="px-5 py-4">
                    {parcel.paymentStatus === "paid" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CreditCard className="w-3 h-3" />
                        Paid
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePayment(parcel)}
                        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition"
                      >
                        Pay Now
                      </button>
                    )}
                  </td>

                  {/* TRACK */}
                  <td className="px-5 py-4 text-indigo-600 font-medium">
                    <Link
                      to={`/parcel-track/${parcel.trackingId}`}
                      className="hover:underline"
                    >
                      #{parcel.trackingId}
                    </Link>
                  </td>

                  {/* STATUS */}
                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        parcel.deliveryStatus
                      )}`}
                    >
                      {parcel.deliveryStatus}
                    </span>
                  </td>

                  {/* DELETE */}
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleParcelDelete(parcel._id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
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
            <Package className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
            <h3 className="font-semibold text-lg">No parcels found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyParcels;