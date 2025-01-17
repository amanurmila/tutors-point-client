import React, { useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import useAuth from "../hooks/useAuth";
import { NavLink, Outlet } from "react-router-dom";
import { FaEye, FaRegEdit, FaRegEye, FaUpload } from "react-icons/fa";

const Dashboard = () => {
  const [users] = useUsers();
  const { user } = useAuth();
  const [foundItem, setFoundItem] = useState(null);

  useEffect(() => {
    const item = users.find((item) => item.email === user.email);
    setFoundItem(item);
  }, [users, user]);

  return (
    <div className="grid w-11/12 mx-auto grid-cols-12 gap-6">
      <div className="col-span-2 bg-purple-600 h-screen text-white text-center">
        {foundItem?.role === "admin" ? (
          <section>
            <NavLink to="/dashboard/admin">Admin</NavLink>
          </section>
        ) : foundItem?.role === "tutor" ? (
          <section className="my-5 mx-1 flex flex-col gap-3">
            <NavLink
              className="btn btn-sm flex justify-center items-center gap-1"
              to="/dashboard/createSession"
            >
              <FaRegEdit /> Create Session
            </NavLink>
            <NavLink
              className="btn btn-sm flex justify-center items-center gap-1"
              to="/dashboard/viewAllSession"
            >
              <FaEye /> View All Session
            </NavLink>
            <NavLink
              className="btn btn-sm flex justify-center items-center gap-1"
              to="/dashboard/uploadMaterials"
            >
              <FaUpload /> Upload Materials
            </NavLink>
            <NavLink
              className="btn btn-sm flex justify-center items-center gap-1"
              to="/dashboard/viewAllMaterials"
            >
              <FaRegEye /> View All Materials
            </NavLink>
          </section>
        ) : (
          <section className="flex flex-col">
            <NavLink to="/dashboard/student">student</NavLink>
            <NavLink to="/dashboard/student2">student 2</NavLink>
          </section>
        )}
      </div>
      <div className="col-span-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
