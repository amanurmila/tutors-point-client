import React from "react";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import TutorCard from "../../components/TutorCard";

const TutorSection = () => {
  const secureAxios = useSecureAxios();
  const { data: tutors = [], refetch } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const res = await secureAxios.get("/tutors");
      return res.data;
    },
  });

  return (
    <div>
      <div className="text-center my-5">
        <h2 className="text-2xl font-bold pb-3 border-b-2 border-yellow-500 w-3/12 mx-auto">
          All Tutors
        </h2>
        <p>Here is all the tutors list</p>
      </div>
      <div>
        {tutors.map((tutor, idx) => (
          <TutorCard key={idx} tutor={tutor} />
        ))}
      </div>
    </div>
  );
};

export default TutorSection;
