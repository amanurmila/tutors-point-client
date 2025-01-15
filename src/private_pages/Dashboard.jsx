import React from "react";
import useUsers from "../hooks/useUsers";

const Dashboard = () => {
  const users = useUsers();
  console.log(users);

  return <div></div>;
};

export default Dashboard;
