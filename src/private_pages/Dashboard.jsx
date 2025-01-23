import React, { useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import useAuth from "../hooks/useAuth";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaBookDead,
  FaEye,
  FaRegEdit,
  FaRegEye,
  FaRegSave,
  FaSave,
  FaUpload,
  FaUsers,
} from "react-icons/fa";
import { SiBookstack, SiEducative } from "react-icons/si";

const Dashboard = () => {
  const [users] = useUsers();
  const { user } = useAuth();
  const [foundItem, setFoundItem] = useState(null);

  useEffect(() => {
    const item = users.find((item) => item.email === user.email);
    setFoundItem(item);
  }, [users, user]);

  return (
    <div className="md:grid w-11/12 mx-auto md:grid-cols-12 gap-6">
      <div className="md:col-span-2 bg-purple-600 h-full my-20 py-10 md:py-0 md:my-0 md:h-screen text-white text-center">
        {foundItem?.role === "admin" ? (
          <section className="my-5 mx-1 flex flex-col gap-3">
            <NavLink
              className={({ isActive }) =>
                `btn btn-sm flex justify-center items-center gap-1 ${
                  isActive ? "bg-blue-500 text-white" : ""
                }`
              }
              to="/dashboard/admin/allUsers"
            >
              <FaUsers /> All Users
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `btn btn-sm flex justify-center items-center gap-1 ${
                  isActive ? "bg-green-500 text-white" : ""
                }`
              }
              to="/dashboard/admin/allStudySessions"
            >
              <SiEducative />
              All Sessions
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `btn btn-sm flex justify-center items-center gap-1 ${
                  isActive ? "bg-red-500 text-white" : ""
                }`
              }
              to="/dashboard/admin/allMaterials"
            >
              <SiBookstack />
              All Materials
            </NavLink>
          </section>
        ) : foundItem?.role === "tutor" ? (
          <section className="my-5 mx-1 flex flex-col gap-3">
            <NavLink
              className={({ isActive }) =>
                `btn btn-sm flex justify-center items-center gap-1 ${
                  isActive ? "bg-blue-500 text-white" : ""
                }`
              }
              to="/dashboard/tutor/createSession"
            >
              <FaRegEdit /> Create Session
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `btn btn-sm flex justify-center items-center gap-1 ${
                  isActive ? "bg-green-500 text-white" : ""
                }`
              }
              to="/dashboard/tutor/viewAllSession"
            >
              <FaEye /> View All Sessions
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `btn btn-sm flex justify-center items-center gap-1 ${
                  isActive ? "bg-red-500 text-white" : ""
                }`
              }
              to="/dashboard/tutor/uploadMaterials"
            >
              <FaUpload /> Upload Materials
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `btn btn-sm flex justify-center items-center gap-1 ${
                  isActive ? "bg-yellow-500 text-white" : ""
                }`
              }
              to="/dashboard/tutor/viewAllMaterials"
            >
              <FaRegEye /> View All Materials
            </NavLink>
          </section>
        ) : (
          <section className="my-5 mx-1 flex flex-col gap-3">
            <NavLink
              className={({ isActive }) =>
                `btn btn-sm flex justify-center items-center gap-1 ${
                  isActive ? "bg-blue-500 text-white" : ""
                }`
              }
              to="/dashboard/student/viewBookedSessions"
            >
              <FaBookDead /> Booked Sessions
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `btn btn-sm flex justify-center items-center gap-1 ${
                  isActive ? "bg-green-500 text-white" : ""
                }`
              }
              to="/dashboard/student/createNotes"
            >
              <FaSave /> Create Notes
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `btn btn-sm flex justify-center items-center gap-1 ${
                  isActive ? "bg-red-500 text-white" : ""
                }`
              }
              to="/dashboard/student/manageNotes"
            >
              <FaBookDead /> Manage Notes
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `btn btn-sm flex justify-center items-center gap-1 ${
                  isActive ? "bg-yellow-500 text-white" : ""
                }`
              }
              to="/dashboard/student/studyMaterials"
            >
              <FaRegSave /> Study Materials
            </NavLink>
          </section>
        )}
      </div>
      <div className="md:col-span-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
