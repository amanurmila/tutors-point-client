import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../hooks/useSecureAxios";
import {
  MdEmail,
  MdDateRange,
  MdSchedule,
  MdCheckCircle,
} from "react-icons/md";
import ReviewSection from "./ReviewSection";

const SessionDetailsPage = () => {
  const secureAxios = useSecureAxios();
  const { id } = useParams();

  const {
    data: sessionDetails = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sessionDetails", id],
    queryFn: async () => {
      const res = await secureAxios.get(`/sessionDetails/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading session details...</div>;
  if (isError)
    return <div>Error loading session details. Please try again later.</div>;

  return (
    <div className="card w-full max-w-lg mx-auto shadow-xl bg-base-100">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold text-primary">
          Tutor Name: {sessionDetails.tutorName}
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <MdEmail className="text-lg text-secondary" />
          <span className="text-base text-gray-600">
            {sessionDetails.tutorEmail}
          </span>
        </div>
        <p className="mt-4 text-gray-700">
          <strong>Description:</strong> {sessionDetails.sessionDescription}
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <MdDateRange className="inline-block mr-2 text-secondary" />
            <strong>Registration Start:</strong>
            <p>{sessionDetails.registrationStartDate}</p>
          </div>
          <div>
            <MdDateRange className="inline-block mr-2 text-secondary" />
            <strong>Registration End:</strong>
            <p>{sessionDetails.registrationEndDate}</p>
          </div>
          <div>
            <MdDateRange className="inline-block mr-2 text-secondary" />
            <strong>Class Start:</strong>
            <p>{sessionDetails.classStartDate}</p>
          </div>
          <div>
            <MdDateRange className="inline-block mr-2 text-secondary" />
            <strong>Class End:</strong>
            <p>{sessionDetails.classEndDate}</p>
          </div>
        </div>
        <div className="mt-4">
          <MdSchedule className="inline-block mr-2 text-secondary" />
          <strong>Session Duration:</strong> {sessionDetails.sessionDuration}
        </div>
        <div className="mt-2">
          <strong>Registration Fee:</strong> {sessionDetails.registrationFee}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <MdCheckCircle className="text-green-500" />
          <span className="text-sm font-bold text-green-600">
            Status: {sessionDetails.status}
          </span>
        </div>
      </div>

      <div className="my-10 px-6">
        <ReviewSection sessionId={sessionDetails._id} />
      </div>
    </div>
  );
};

export default SessionDetailsPage;
