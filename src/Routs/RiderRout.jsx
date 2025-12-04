import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import UseRole from '../Hooks/UseRole';
import Loading from '../Components/Loading';
import Forbidden from '../Components/Forbidden';

const RiderRout = ({children}) => {
  const { loading } = UseAuth();

  const { role, roleLoading } = UseRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "rider") {
    return <Forbidden></Forbidden>;
  }
  return children;
};


export default RiderRout;