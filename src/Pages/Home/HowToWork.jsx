import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Bike,
  BarChart3,
  CheckCircle,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  MapPin,
  Award,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router";

const HowToWork = () => {
  const [activeRole, setActiveRole] = useState("user");

  const roles = [
    {
      id: "user",
      label: "User",
      icon: Package,
      color: "from-blue-600 to-cyan-600",
      tagColor: "bg-blue-500/30 border-blue-500/50 text-blue-200",
    },
    {
      id: "rider",
      label: "Rider",
      icon: Bike,
      color: "from-orange-600 to-red-600",
      tagColor: "bg-orange-500/30 border-orange-500/50 text-orange-200",
    },
    {
      id: "admin",
      label: "Admin",
      icon: BarChart3,
      color: "from-purple-600 to-pink-600",
      tagColor: "bg-purple-500/30 border-purple-500/50 text-purple-200",
    },
  ];

  const roleData = {
    user: {
      capabilities: [
        {
          icon: Package,
          title: "Send Parcels",
          description: "Ship packages anywhere easily with competitive rates",
        },
        {
          icon: MapPin,
          title: "Track Shipments",
          description:
            "Real-time tracking of your parcels from pickup to delivery",
        },
        {
          icon: Clock,
          title: "Schedule Delivery",
          description: "Choose delivery date and time that works for you",
        },
        {
          icon: Zap,
          title: "Compare Prices",
          description: "Get instant quotes from multiple carriers",
        },
      ],
      benefits: [
        "Affordable shipping rates",
        "Reliable delivery partners",
        "Safe package handling",
        "24/7 customer support",
        "Digital receipts & certificates",
        "Multiple payment options",
      ],
    },
    rider: {
      capabilities: [
        {
          icon: Bike,
          title: "Accept Deliveries",
          description: "Choose delivery requests that match your schedule",
        },
        {
          icon: TrendingUp,
          title: "Earn Commission",
          description: "Make money based on completed deliveries",
        },
        {
          icon: Award,
          title: "Build Rating",
          description: "Get rated by users to earn premium deliveries",
        },
        {
          icon: Clock,
          title: "Flexible Hours",
          description: "Work when you want, as much as you want",
        },
      ],
      benefits: [
        "Flexible work schedule",
        "Competitive earning rates",
        "Performance bonuses",
        "Insurance coverage",
        "Fuel reimbursement",
        "Rating-based rewards",
      ],
    },
    admin: {
      capabilities: [
        {
          icon: BarChart3,
          title: "Manage Operations",
          description: "Oversee all users, riders, and deliveries in real-time",
        },
        {
          icon: Shield,
          title: "Verify Members",
          description: "Approve riders and manage user accounts securely",
        },
        {
          icon: TrendingUp,
          title: "View Analytics",
          description: "Track performance metrics and revenue reports",
        },
        {
          icon: Award,
          title: "Manage Disputes",
          description: "Handle refunds and resolve delivery issues",
        },
      ],
      benefits: [
        "Full system oversight",
        "Advanced analytics dashboard",
        "User & rider verification tools",
        "Payment management system",
        "Comprehensive reporting",
        "System security controls",
      ],
    },
  };

  const currentRole = roleData[activeRole];
  const activeRoleObj = roles.find((r) => r.id === activeRole);
  const RoleIcon = activeRoleObj.icon;
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Show Individual Roles & Benefits
          </h2>
          <p className="text-gray-100/70 text-base sm:text-lg max-w-2xl mx-auto">
            Discover what each role can do and what benefits they receive
          </p>
        </motion.div>

        {/* Role Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <motion.button
                key={role.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveRole(role.id)}
                className={`relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center gap-2 justify-center ${
                  activeRole === role.id
                    ? `text-white shadow-lg shadow-${role.color} bg-linear-to-r ${role.color}`
                    : "text-gray-200 bg-white/10 border border-white/20 hover:bg-white/15"
                }`}
              >
                <Icon className="w-5 h-5" />
                {role.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          >
            {/* Capabilities */}
            <div className="space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
              >
                <div
                  className={`p-3 sm:p-4 rounded-xl bg-linear-to-br ${activeRoleObj.color} text-white shadow-lg`}
                >
                  <RoleIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {activeRoleObj.label}
                  </h3>
                  <p className="text-gray-100/60 text-sm sm:text-base">
                    What they can do
                  </p>
                </div>
              </motion.div>

              <div className="space-y-3 sm:space-y-4">
                {currentRole.capabilities.map((capability, index) => {
                  const CapIcon = capability.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                      className="bg-white/15 backdrop-blur-3xl rounded-xl border border-white/25 p-4 sm:p-5 hover:bg-white/20 hover:border-white/35 transition-all duration-300 group shadow-lg hover:shadow-xl"
                    >
                      <div className="flex gap-3 sm:gap-4">
                        <div className="p-2.5 sm:p-3 bg-white/20 rounded-lg shrink-0 group-hover:bg-white/30 transition-all duration-300">
                          <CapIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-base sm:text-lg mb-1">
                            {capability.title}
                          </h4>
                          <p className="text-gray-100/70 text-xs sm:text-sm">
                            {capability.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
              >
                <div
                  className={`p-3 sm:p-4 rounded-xl bg-linear-to-br ${activeRoleObj.color} text-white shadow-lg`}
                >
                  <Award className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Benefits
                  </h3>
                  <p className="text-gray-100/60 text-sm sm:text-base">
                    What they receive
                  </p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {currentRole.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
                    className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border backdrop-blur-3xl ${activeRoleObj.tagColor} bg-white/10 hover:bg-white/20 transition-all duration-300 group`}
                  >
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-sm sm:text-base font-semibold leading-tight">
                      {benefit}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="bg-linear-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-white/20 rounded-2xl p-8 sm:p-10 md:p-12 backdrop-blur-3xl shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-100/70 text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join our platform and start enjoying the benefits of your role
              today
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                Sign Up as {activeRoleObj.label}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/send-parcel")}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToWork;
