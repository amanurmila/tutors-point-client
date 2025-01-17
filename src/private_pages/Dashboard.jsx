import React, { useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import useAuth from "../hooks/useAuth";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [users] = useUsers();
  const { user } = useAuth();
  const [foundItem, setFoundItem] = useState(null);
  console.log(users);
  console.log(user);

  useEffect(() => {
    const item = users.find((item) => item.email === user.email);
    setFoundItem(item);
  }, [users, user]);

  return (
    <div className="grid w-11/12 mx-auto grid-cols-12 gap-6">
      <div className="col-span-2 bg-purple-500">
        {foundItem?.role === "admin" ? (
          <section>
            <NavLink to="/dashboard/admin">Admin</NavLink>
          </section>
        ) : foundItem?.role === "tutor" ? (
          <section>
            <NavLink to="/dashboard/tutor">Tutor</NavLink>
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
