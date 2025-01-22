import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../hooks/useSecureAxios";

const ViewBookedSessions = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();

  const { data: booked = [], refetch } = useQuery({
    queryKey: ["booked", user.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/booked-sessions/${user.email}`);
      return res.data;
    },
  });

  console.log(booked);

  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-bold pb-3 border-b-2 border-yellow-500 w-3/12 mx-auto">
          Your Booked Sessions
        </h2>
        <p>Only you can view your booked sessions</p>
      </div>
      <div></div>
    </div>
  );
};

export default ViewBookedSessions;
