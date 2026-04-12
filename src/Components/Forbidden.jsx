import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ShieldX, Home, LayoutDashboard, ArrowRight } from "lucide-react";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-96 h-96 bg-red-500/10 blur-3xl rounded-full"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Glass Card */}
        <div className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/20 dar:border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 text-center hover:shadow-3xl transition-all duration-300">
          {/* Icon with Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-red-500/30 blur-2xl rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative p-6 bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-full">
                <ShieldX className="w-16 h-16 text-red-400" />
              </div>
            </div>
          </motion.div>

          {/* Error Code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-red-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-4">
              403
            </h1>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Access Forbidden
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-lg max-w-xl mx-auto mb-2">
              You don't have permission to access this resource.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Your current role doesn't grant access to this section.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
          >
            {/* Go Home */}
            <Link
              to="/"
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
              <Home size={20} />
              <span className="relative">Home</span>
              <motion.div
                className="relative"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </Link>

            {/* Go to Dashboard */}
            <Link
              to="/dashboard"
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
              <LayoutDashboard size={20} />
              <span className="relative">Dashboard</span>
              <motion.div
                className="relative"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </Link>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
          />

          {/* Support Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-3"
          >
            <p className="text-gray-300">Need assistance?</p>
            <a
              href="mailto:support@swiftparcel.com"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 font-semibold group"
            >
              <span>Contact our support team</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </a>
          </motion.div>
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 text-center text-gray-400 text-sm"
        >
          <p>
            Error Code:{" "}
            <span className="text-cyan-400 font-mono">403_FORBIDDEN</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Forbidden;
