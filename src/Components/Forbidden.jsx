import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ShieldX, Home, LayoutDashboard, ArrowRight } from "lucide-react";

const Forbidden = () => {
  return (
    <div
      className="fixed inset-0 w-screen h-screen flex items-center justify-center px-4 overflow-hidden z-50"
      style={{
        backgroundImage: `url('https://thumbs.dreamstime.com/b/damaged-delivery-box-package-shipping-to-customer-178274705.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Animated Glass Overlay */}
      <motion.div
        className="absolute inset-0 backdrop-blur-md"
        animate={{ opacity: [0.4, 0.5, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.7), rgba(88, 28, 135, 0.6), rgba(30, 41, 59, 0.7))",
        }}
      />

      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl px-4"
      >
        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative group"
        >
          {/* Animated Glass Card Background */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.2), transparent), radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.2), transparent)",
            }}
          />

          <div className="relative bg-white/15 backdrop-blur-3xl border border-white/30 rounded-3xl shadow-2xl p-6 md:p-10 text-center hover:shadow-3xl transition-all duration-300 hover:bg-white/20 hover:border-white/40">
            {/* Icon with Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="flex justify-center mb-4 md:mb-6"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-red-500/40 blur-2xl rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="relative p-4 md:p-6 bg-gradient-to-br from-red-500/30 to-pink-500/30 border border-red-500/50 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(239, 68, 68, 0.5)",
                      "0 0 40px rgba(239, 68, 68, 0.8)",
                      "0 0 20px rgba(239, 68, 68, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ShieldX className="w-10 h-10 md:w-16 md:h-16 text-red-300" />
                </motion.div>
              </div>
            </motion.div>

            {/* Error Code */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-red-300 via-pink-300 to-orange-300 bg-clip-text text-transparent mb-2 md:mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                403
              </motion.h1>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
                Access Forbidden
              </h2>

              {/* Description */}
              <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-1 md:mb-2">
                You don't have permission to access this resource.
              </p>
              <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6">
                Your current role doesn't grant access to this section.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6"
            >
              {/* Go Home */}
              <Link
                to="/"
                className="group relative inline-flex items-center justify-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
                <Home size={16} className="hidden sm:block" />
                <span className="relative">Home</span>
                <motion.div
                  className="relative hidden sm:block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight size={14} />
                </motion.div>
              </Link>

              {/* Go to Dashboard */}
              <Link
                to="/dashboard"
                className="group relative inline-flex items-center justify-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
                <LayoutDashboard size={16} className="hidden sm:block" />
                <span className="relative">Dashboard</span>
                <motion.div
                  className="relative hidden sm:block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                >
                  <ArrowRight size={14} />
                </motion.div>
              </Link>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4 md:mb-6"
            />

            {/* Support Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-1 md:space-y-2"
            >
              <p className="text-gray-300 text-xs md:text-sm">
                Need assistance?
              </p>
              <a
                href="mailto:support@swiftparcel.com"
                className="inline-flex items-center gap-1 md:gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 font-semibold group text-xs md:text-sm"
              >
                <span className="hidden sm:inline">Contact support</span>
                <span className="sm:hidden">Support</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-4 md:mt-6 text-center text-gray-400 text-xs md:text-sm"
        >
          <p>
            Error Code: <span className="text-cyan-400 font-mono">403</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Forbidden;
