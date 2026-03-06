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
      <div className="relative min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
