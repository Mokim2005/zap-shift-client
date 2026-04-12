import React from "react";
import UseAuth from "../Hooks/UseAuth";
import UseRole from "../Hooks/UseRole";
import GlassLoading from "../Components/GlassLoading";
import Forbidden from "../Components/Forbidden";

const RiderRout = ({ children }) => {
  const { loading } = UseAuth();

  const { role, roleLoading } = UseRole();

  if (loading || roleLoading) {
    return <GlassLoading message="Verifying rider status..." />;
  }

  if (role !== "rider") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default RiderRout;
