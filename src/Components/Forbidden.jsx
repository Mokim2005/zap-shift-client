import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-to-br from-red-200/25 to-pink-200/25 dark:from-red-900/15 dark:to-pink-900/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Glass Card Container */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 shadow-2xl shadow-black/10 rounded-3xl p-8 md:p-12 transition-all duration-300 hover:shadow-3xl hover:shadow-red-500/10">
          {/* Error Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4v2m0 4v2m0-14a9 9 0 110 18 9 9 0 010-18zm0 0a9 9 0 110 18 9 9 0 010-18z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
              403
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Access Denied
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
              You don't have permission to access this resource. If you believe
              this is an error, please contact support.
            </p>
          </div>

          {/* Button Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Home Button */}
            <Link
              to="/"
              className="py-3 px-4 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v4"
                />
              </svg>
              Home
            </Link>

            {/* Dashboard Button */}
            <Link
              to="/dashboard"
              className="py-3 px-4 bg-white/80 dark:bg-gray-700/80 hover:bg-white/90 dark:hover:bg-gray-700 border border-white/40 dark:border-gray-600/40 text-gray-800 dark:text-gray-100 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-black/5 hover:shadow-xl flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l3-3m0 0l3 3m-3-3v4"
                />
              </svg>
              Dashboard
            </Link>
          </div>

          {/* Support Text */}
          <div className="mt-8 pt-6 border-t border-gray-200/40 dark:border-gray-700/40">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Need help?{" "}
              <a
                href="mailto:support@zapshift.com"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
