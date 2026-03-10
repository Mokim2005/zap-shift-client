import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/25 to-pink-200/25 dark:from-purple-900/15 dark:to-pink-900/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Glass Card Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Loading Spinner Card */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 shadow-2xl shadow-black/10 rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center">
          {/* Spinner Container */}
          <div className="relative w-24 h-24 mb-8">
            {/* Static Background Ring */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              fill="none"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="3"
                className="text-gray-200 dark:text-gray-700"
              />
            </svg>

            {/* Rotating Gradient Ring */}
            <svg
              className="absolute inset-0 w-full h-full animate-spin"
              style={{ animationDuration: "2s" }}
              viewBox="0 0 100 100"
              fill="none"
            >
              <defs>
                <linearGradient
                  id="spinner-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                  <stop offset="50%" stopColor="rgb(34, 197, 94)" />
                  <stop offset="100%" stopColor="rgb(14, 165, 233)" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#spinner-gradient)"
                strokeWidth="3"
                strokeDasharray="141 282"
                strokeLinecap="round"
              />
            </svg>

            {/* Center Dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-linear-to-br from-blue-600 to-cyan-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
              Loading
            </h2>
            <div className="flex items-center justify-center gap-1">
              <p className="text-gray-600 dark:text-gray-400">Please wait</p>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                <span
                  className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></span>
                <span
                  className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <p className="mt-6 text-center text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xs">
          We're preparing everything for you...
        </p>
      </div>
    </div>
  );
};

export default Loading;
