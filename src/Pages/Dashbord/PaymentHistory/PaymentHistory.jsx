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
    0
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Payment History
          </h2>

          <p className="text-gray-600 dark:text-gray-400">
            Total: {payments.length} transaction
            {payments.length !== 1 ? "s" : ""}
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.08, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg"
        >
          <CreditCard className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
      >
        <div className="flex items-center justify-between">

          <div>
            <p className="text-indigo-100 text-sm font-medium mb-1">
              Total Spent
            </p>

            <p className="text-3xl font-bold">{totalAmount} tk</p>
          </div>

          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="p-4 bg-white/20 rounded-xl backdrop-blur-sm"
          >
            <CreditCard className="w-8 h-8" />
          </motion.div>

        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        ref={tableRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-xl overflow-hidden"
      >

        <div className="overflow-x-auto">

          <table className="w-full">

            {/* Head */}
            <thead className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800/50 dark:to-green-900/30 border-b border-gray-200 dark:border-gray-700">
              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                  #
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                  Amount
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                  Paid Time
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                  Transaction ID
                </th>

              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

              {payments.map((payment, i) => (
                <motion.tr
                  key={payment._id || i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{
                    scale: 1.01,
                    backgroundColor: "rgba(16,185,129,0.05)",
                  }}
                  className="transition-all duration-300 cursor-pointer"
                >

                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {i + 1}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">

                      <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                        <CreditCard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>

                      <span className="text-sm text-gray-900 dark:text-white font-medium">
                        {user?.displayName || "User"}
                      </span>

                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    >
                      {payment.amount} tk
                    </motion.span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {formatDate(payment.paidAt)}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">

                      <Hash className="w-4 h-4 text-gray-400" />

                      <code className="text-xs font-mono text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
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

              <CreditCard className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />

              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No payment history
              </p>

              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
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