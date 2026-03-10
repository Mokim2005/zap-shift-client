import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ShieldX, Home, LayoutDashboard } from "lucide-react";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-black relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-red-300/30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-300/30 blur-3xl rounded-full animate-pulse"></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-xl"
      >
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/40 dark:border-gray-700 rounded-3xl shadow-2xl p-10 text-center">

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="p-6 bg-red-100 dark:bg-red-900/30 rounded-full">
              <ShieldX className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
          </motion.div>

          {/* Error Code */}
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
            403
          </h1>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-3">
            Access Forbidden
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-md mx-auto">
            You do not have permission to access this page. Please go back to
            the homepage or your dashboard.
          </p>

          {/* Buttons */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Home */}
            <Link
              to="/"
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Home size={18} />
              Home
            </Link>

            {/* Dashboard */}
            <Link
              to="/dashboard"
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need help?{" "}
              <a
                href="mailto:support@zapshift.com"
                className="text-blue-600 hover:underline"
              >
                Contact Support
              </a>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Forbidden;