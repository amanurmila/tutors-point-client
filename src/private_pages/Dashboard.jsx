import React, { useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import useAuth from "../hooks/useAuth";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaBookDead,
  FaEye,
  FaNotesMedical,
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
    <div className="grid w-11/12 mx-auto grid-cols-12 gap-6">
      <div className="col-span-2 bg-purple-600 h-screen text-white text-center">
        {foundItem?.role === "admin" ? (
          <section className="my-5 mx-1 flex flex-col gap-3">
            <NavLink
              className="btn btn-sm flex justify-center items-center gap-1"
              to="/dashboard/admin/allUsers"
            >
              <FaUsers /> All Users
            </NavLink>
            <NavLink
              className="btn btn-sm flex justify-center items-center gap-1"
              to="/dashboard/admin/allStudySessions"
            >
              <SiEducative />
              All Sessions
            </NavLink>
            <NavLink
              className="btn btn-sm flex justify-center items-center gap-1"
              to="/dashboard/admin/allMaterials"
            >
              <SiBookstack />
              All materials
            </NavLink>
          </section>
        ) : foundItem?.role === "tutor" ? (
          <section className="my-5 mx-1 flex flex-col gap-3">
            <NavLink
              className="btn btn-sm flex justify-center items-center gap-1"
              to="/dashboard/tutor/createSession"
            >
              <FaRegEdit /> Create Session
            </NavLink>
            <NavLink
              className="btn btn-sm flex justify-center items-center gap-1"
              to="/dashboard/tutor/viewAllSession"
            >
              <FaEye /> View All Session
            </NavLink>
            <NavLink
              className="btn btn-sm flex justify-center items-center gap-1"
              to="/dashboard/tutor/uploadMaterials"
            >
              <FaUpload /> Upload Materials
            </NavLink>
            <NavLink
              className="btn btn-sm flex justify-center items-center gap-1"
              to="/dashboard/tutor/viewAllMaterials"
            >
              <FaRegEye /> View All Materials
            </NavLink>
          </section>
        ) : (
          <section className="my-5 mx-1 flex flex-col gap-3">
            <NavLink
              className="btn btn-sm flex justify-center items-center gap-1"
              to="/dashboard/student/viewBookedSessions"
            >
              <FaBookDead /> Booked Sessions
            </NavLink>
            <NavLink
              className="btn btn-sm flex justify-center items-center gap-1"
              to="/dashboard/student/createNotes"
            >
              <FaSave /> Create Notes
            </NavLink>
            <NavLink
              className="btn btn-sm flex justify-center items-center gap-1"
              to="/dashboard/student/manageNotes"
            >
              <FaBookDead /> Study Materials
            </NavLink>
            <NavLink
              className="btn btn-sm flex justify-center items-center gap-1"
              to="/dashboard/student/studyMaterials"
            >
              <FaRegSave /> Manage Notes
            </NavLink>
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
