import { useQuery } from "@tanstack/react-query";
import React from "react";
import useSecureAxios from "../../hooks/useSecureAxios";
import ApprovedCard2 from "./ApprovedCard2";

const AllApprovedSessions = () => {
  const secureAxios = useSecureAxios();

  const { data: approved = [], refetch } = useQuery({
    queryKey: ["approved"],
    queryFn: async () => {
      const res = await secureAxios.get("/approvedSessions");
      return res.data;
    },
  });
  console.log(approved);

  return (
    <div>
      <div>
        <div className="text-center">
          <h2 className="text-2xl font-bold pb-3 border-b-2 border-yellow-500 w-3/12 mx-auto">
            Approved Sessions
          </h2>
          <p>Everyone can View the cards</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto gap-6 my-5">
          {approved.map((session, idx) => (
            <ApprovedCard2 session={session} key={session._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllApprovedSessions;
