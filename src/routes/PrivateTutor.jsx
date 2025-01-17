import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../pages/Loading";
import { AuthContext } from "../providers/AuthProvider";
import useRole from "../hooks/useRole";

// eslint-disable-next-line react/prop-types
const PrivateTutor = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [userData,, isLoading] = useRole();

  const role = userData?.role;

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (role === "tutor") {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateTutor;
