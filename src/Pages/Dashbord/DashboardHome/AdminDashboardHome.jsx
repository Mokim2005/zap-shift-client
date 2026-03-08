import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Package, TrendingUp, Clock, CheckCircle } from "lucide-react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import {
  Legend,
  Pie,
  PieChart,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboardHome = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: deliveryStatus = [] } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data || [];
    },
  });

  // Safe Pie Data
  const getPieChartData = (data) => {
    if (!Array.isArray(data)) return [];
    return data.map((item) => ({
      name: item?._id || "Unknown",
      value: item?.count || 0,
    }));
  };

  // Safe Status Check
  const getSafeStatus = (status) => {
    if (!status) return "default";
    return status.toLowerCase();
  };

  const getStatusIcon = (status) => {
    const safeStatus = getSafeStatus(status);

    switch (safeStatus) {
      case "pending":
        return <Clock className="w-6 h-6" />;
      case "delivered":
        return <CheckCircle className="w-6 h-6" />;
      case "in transit":
        return <TrendingUp className="w-6 h-6" />;
      default:
        return <Package className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status) => {
    const safeStatus = getSafeStatus(status);

    switch (safeStatus) {
      case "pending":
        return "from-yellow-500 to-orange-500";
      case "delivered":
        return "from-green-500 to-emerald-500";
      case "in transit":
        return "from-blue-500 to-cyan-500";
      default:
        return "from-indigo-500 to-violet-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of delivery statistics and performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deliveryStatus.map((state, index) => (
          <motion.div
            key={state?._id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative overflow-hidden bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300"
          >
            {/* Gradient Background */}
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getStatusColor(
                state?._id
              )} opacity-10 rounded-full -mr-16 -mt-16`}
            ></div>

            {/* Content */}
            <div className="relative">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${getStatusColor(
                  state?._id
                )} text-white inline-flex`}
              >
                {getStatusIcon(state?._id)}
              </div>

              <h3 className="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
                {state?._id || "Unknown"}
              </h3>

              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {state?.count || 0}
              </p>

              <p className="text-xs text-gray-500 mt-2">
                Total parcels
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Delivery Status Distribution
        </h3>

        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={getPieChartData(deliveryStatus)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              />
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboardHome;