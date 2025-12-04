import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
