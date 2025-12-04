import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>

        {/* Animated Ring */}
        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  );
};

export default Loading;
