import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { CreditCard, Package } from "lucide-react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = UseAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-error w-16"></span>
      </div>
    );
  }

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };

    const res = await axiosSecure.post(
      "/create-cheakout-session",
      paymentInfo
    );

    window.location.href = res.data.url;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-6">
          <Package className="mx-auto text-primary mb-2" size={40} />
          <h2 className="text-2xl font-bold">Complete Your Payment</h2>
          <p className="text-gray-500 text-sm">
            Secure payment for your parcel delivery
          </p>
        </div>

        <div className="bg-base-100 rounded-xl p-4 mb-6 border">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Parcel Name</span>
            <span>{parcel.parcelName}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="font-medium">Sender</span>
            <span className="text-sm">{parcel.senderEmail}</span>
          </div>

          <div className="flex justify-between text-lg font-bold text-primary">
            <span>Total Cost</span>
            <span>${parcel.cost}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
          className="btn btn-primary w-full text-black flex items-center justify-center gap-2"
        >
          <CreditCard size={18} />
          Pay Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Payment;