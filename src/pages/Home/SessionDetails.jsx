import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";

const SessionDetails = () => {
  const { id } = useParams();
  const secureAxios = useSecureAxios();

  const { data: session = {} } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const res = await secureAxios.get(`/session/${id}`);
      return res.data;
    },
  });

  console.log(session)

  return <div></div>;
};

export default SessionDetails;
