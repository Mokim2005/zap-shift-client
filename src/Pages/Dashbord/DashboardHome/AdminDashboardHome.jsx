import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Package, TrendingUp, Clock, CheckCircle } from "lucide-react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { Legend, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboardHome = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: deliveryStatus = [] } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data;
    },
  });

  const GetPiechartData = (data) => {
    return data.map((item) => {
      return { name: item._id, value: item.count };
    });
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
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
    switch (status.toLowerCase()) {
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
            key={state._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative overflow-hidden bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow"
          >
            {/* Gradient Background */}
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getStatusColor(
                state._id
              )} opacity-10 rounded-full -mr-16 -mt-16`}
            ></div>

            {/* Content */}
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${getStatusColor(
                    state._id
                  )} text-white`}
                >
                  {getStatusIcon(state._id)}
                </div>
              </div>

              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                {state._id}
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {state.count}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
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

        <div className="w-full h-[400px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={GetPiechartData(deliveryStatus)}
                cx="50%"
                cy="100%"
                outerRadius="120%"
                fill="#6366f1"
                label
                isAnimationActive={true}
              />
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboardHome;
