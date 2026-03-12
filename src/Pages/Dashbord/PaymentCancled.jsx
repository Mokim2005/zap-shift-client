import React from "react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { Link } from "react-router";

const PaymentCancled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-900">
      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border border-white/40 dark:border-gray-700 shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center space-y-6"
      >
        {/* Cancel Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="flex justify-center"
        >
          <div className="bg-red-100 dark:bg-red-900/40 p-5 rounded-full shadow-lg">
            <XCircle className="text-red-600 dark:text-red-400 w-14 h-14" />
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Payment Cancelled ❌
        </h1>

        <p className="text-gray-600 dark:text-gray-400">
          Your payment was cancelled. Don't worry, you can try again anytime.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link to="/dashboard/my-parcels">
            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg transition">
              Back to My Parcels
            </button>
          </Link>

          <Link to="/">
            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition">
              Go Home
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancled;
