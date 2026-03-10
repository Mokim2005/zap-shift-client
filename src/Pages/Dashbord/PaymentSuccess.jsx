import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [paymentInfo, setPaymentInfo] = useState({});
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-950 dark:to-black">

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border border-white/40 dark:border-gray-700 shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center space-y-6"
      >

        {/* Success Icon Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="flex justify-center"
        >
          <div className="bg-green-100 dark:bg-green-900/40 p-5 rounded-full shadow-lg">
            <CheckCircle className="text-green-600 dark:text-green-400 w-14 h-14" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-gray-800 dark:text-white"
        >
          Payment Successful 🎉
        </motion.h1>

        <p className="text-gray-600 dark:text-gray-400">
          Your payment has been completed successfully. Your parcel is now being processed.
        </p>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-4"
        >

          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600 dark:text-gray-400">
              Transaction ID
            </span>

            <span className="font-semibold text-gray-900 dark:text-white text-sm break-all">
              {paymentInfo.transactionId}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600 dark:text-gray-400">
              Tracking ID
            </span>

            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              #{paymentInfo.trackingId}
            </span>
          </div>

        </motion.div>

        {/* Button */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/dashboard/my-parcels">
            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg">
              View My Parcels
            </button>
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default PaymentSuccess;