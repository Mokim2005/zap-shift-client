import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import GlobalBackground from "./GlobalBackground";

const RootLayout = () => {
  return (
    <>
      {/* Global animated background */}
      <GlobalBackground />
      
      {/* Main content wrapper */}
      <div className="relative min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
