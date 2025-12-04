import React from "react";
import UseAuth from "../Hooks/UseAuth";
import UseRole from "../Hooks/UseRole";
import Forbidden from "../Components/Forbidden";
import Loading from "../Components/Loading";

const AdminRout = ({ children }) => {
  const { loading } = UseAuth();

  const { role, roleLoading } = UseRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default AdminRout;
