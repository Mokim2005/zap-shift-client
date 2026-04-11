import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CreditCard, Calendar, Hash } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

gsap.registerPlugin(ScrollTrigger);

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const headerRef = useRef(null);
  const tableRef = useRef(null);

  // React Query
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  // GSAP Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(tableRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  // Date Format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Total Amount
  const totalAmount = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0,
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-blue-300"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
            Payment History
          </h2>

          <p className="text-gray-100 drop-shadow-md">
            Total: {payments.length} transaction
            {payments.length !== 1 ? "s" : ""}
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.08, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg drop-shadow-lg"
        >
          <CreditCard className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/15 backdrop-blur-3xl rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/25 hover:scale-[1.02]"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-200 text-sm font-medium mb-1">
              Total Spent
            </p>

            <p className="text-3xl font-bold text-white">{totalAmount} tk</p>
          </div>

          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="p-4 bg-blue-500/30 rounded-xl backdrop-blur-3xl border border-blue-500/50"
          >
            <CreditCard className="w-8 h-8 text-blue-200" />
          </motion.div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        ref={tableRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/15 backdrop-blur-3xl rounded-2xl border border-white/25 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
      >
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-full table-auto">
            {/* Head */}
            <thead className="bg-white/10 border-b border-white/20">
              <tr>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  #
                </th>

                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  Name
                </th>

                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  Amount
                </th>

                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  Paid Time
                </th>

                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase">
                  Transaction ID
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-white/20">
              {payments.map((payment, i) => (
                <motion.tr
                  key={payment._id || i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{
                    backgroundColor: "rgba(59, 130, 246, 0.15)",
                  }}
                  className="transition-all duration-300 hover:bg-blue-500/10"
                >
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-100">
                    {i + 1}
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-blue-500/30 border border-blue-500/50">
                        <CreditCard className="w-4 h-4 text-blue-200" />
                      </div>

                      <span className="text-xs sm:text-sm text-white font-medium truncate">
                        {user?.displayName || "User"}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-green-500/30 text-green-200 border border-green-500/50"
                    >
                      {payment.amount} tk
                    </motion.span>
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-100">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 flex-shrink-0" />
                      <span className="truncate">
                        {formatDate(payment.paidAt)}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Hash className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 flex-shrink-0" />

                      <code className="text-xs font-mono text-gray-100 bg-white/10 px-2 py-1 rounded border border-white/20 hover:bg-white/20 transition truncate">
                        {payment.transactionId}
                      </code>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {payments.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 mx-auto text-blue-300 mb-4" />

              <p className="text-white text-lg">No payment history</p>

              <p className="text-gray-300 text-sm mt-2">
                Your transactions will appear here
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentHistory;
