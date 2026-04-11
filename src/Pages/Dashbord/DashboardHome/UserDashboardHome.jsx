import { motion } from "framer-motion";
import { Package, Clock, TrendingUp } from "lucide-react";

const UserDashboardHome = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 min-h-screen relative"
      style={{
        backgroundImage: `url('https://t3.ftcdn.net/jpg/02/61/05/22/360_F_261052228_JWWd2a1m0bahg7IKqigyS6k2059oSqVc.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/25 backdrop-blur-sm"></div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pt-8">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-100 drop-shadow-md">
            Manage your parcels and track deliveries
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/15 dark:bg-gray-900/20 backdrop-blur-3xl rounded-2xl border border-white/25 dark:border-white/15 p-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-200 text-sm">Total Parcels</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/15 dark:bg-gray-900/20 backdrop-blur-3xl rounded-2xl border border-white/25 dark:border-white/15 p-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-200 text-sm">Pending</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/15 dark:bg-gray-900/20 backdrop-blur-3xl rounded-2xl border border-white/25 dark:border-white/15 p-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-200 text-sm">Delivered</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/15 dark:bg-gray-900/20 backdrop-blur-3xl rounded-2xl border border-white/25 dark:border-white/15 p-6 mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Getting Started
          </h3>
          <p className="text-gray-100 mb-4">
            Start sending parcels and track your deliveries in real-time.
            Navigate to "My Parcels" to view all your shipments.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserDashboardHome;
