import React from "react";
import useSecureAxios from "../../hooks/useSecureAxios";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const ManageNotes = () => {
  const { user } = useAuth();

  const secureAxios = useSecureAxios();

  const { data: notes = [] } = useQuery({
    queryKey: ["notes", user.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/notes/${user.email}`);
      return res.data;
    },
  });

  console.log(notes);

  return <div></div>;
};

export default ManageNotes;
