import React from "react";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import ApprovedCard from "./ApprovedCard";
import { Link } from "react-router-dom";

const ApprovedSession = () => {
  const secureAxios = useSecureAxios();

  const { data: sessions = [], refetch } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await secureAxios.get("/homeSessions");
      return res.data;
    },
  });

  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-bold pb-3 border-b-2 border-yellow-500 w-3/12 mx-auto">
          Approved Sessions
        </h2>
        <p>Everyone can View the cards</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto gap-6 my-5">
        {sessions.map((session, idx) => (
          <ApprovedCard session={session} key={session._id} />
        ))}
      </div>
      <div className="text-center">
        <Link to="/approvedSessions" className="btn btn-success">View All Approved Sessions</Link>
      </div>
    </div>
  );
};

export default ApprovedSession;
