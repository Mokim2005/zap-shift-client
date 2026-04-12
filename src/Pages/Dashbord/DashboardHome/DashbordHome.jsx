import React from "react";

import UseRole from "../../../Hooks/UseRole";
import GlassLoading from "../../../Components/GlassLoading";
import AdminDashboardHome from "./AdminDashboardHome";
import RiderDashboardHome from "./RiderDashboardHome";
import UserDashboardHome from "./UserDashboardHome";

const DashbordHome = () => {
  const { role, roleLoading } = UseRole();

  if (roleLoading) {
    return <GlassLoading message="Loading dashboard..." />;
  } else if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  } else if (role === "rider") {
    return <RiderDashboardHome></RiderDashboardHome>;
  } else {
    return <UserDashboardHome></UserDashboardHome>;
  }
};

export default DashbordHome;
