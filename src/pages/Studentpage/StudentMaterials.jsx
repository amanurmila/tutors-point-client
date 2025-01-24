import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBookedSession = async ({ queryKey }) => {
  const [_, id] = queryKey; // queryKey contains the query identifier and parameters
  const response = await axios.get(
    `http://localhost:5000/booked-session/${id}`
  );
  return response.data;
};

const fetchMaterialsByTutorEmail = async ({ queryKey }) => {
  const [_, email] = queryKey;
  const response = await axios.get(`http://localhost:5000/materials/${email}`);
  return response.data;
};

const StudentMaterials = () => {
  const { id } = useParams();

  // Fetch the booked session details
  const {
    data: sessionData,
    isLoading: sessionLoading,
    isError: sessionError,
  } = useQuery({
    queryKey: ["bookedSession", id],
    queryFn: fetchBookedSession,
    enabled: !!id, // Ensure the query only runs when `id` is available
  });

  // Fetch materials by tutor email (only runs if tutorEmail is available)
  const {
    data: materials,
    isLoading: materialsLoading,
    isError: materialsError,
  } = useQuery({
    queryKey: ["materials", sessionData?.tutorEmail],
    queryFn: fetchMaterialsByTutorEmail,
    enabled: !!sessionData?.tutorEmail, // Ensure the query only runs if tutorEmail is available
  });

  if (sessionLoading) return <p>Loading session details...</p>;
  if (sessionError) return <p>Error loading session details.</p>;

  const sessions = sessionData ? [sessionData] : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Study Materials</h1>

      {/* Display booked session details */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Booked Session</h2>
        <ul className="space-y-2">
          {sessions.map((session) => (
            <li key={session._id} className={`p-2 border rounded bg-blue-100`}>
              <p>
                <strong>Session ID:</strong> {session.sessionId || "N/A"}
              </p>
              <p>
                <strong>Tutor Email:</strong> {session.tutorEmail || "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {session.status || "N/A"}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Display materials */}
      <div>
        {materialsLoading ? (
          <p>Loading materials...</p>
        ) : materialsError ? (
          <p>Error loading materials.</p>
        ) : materials?.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Materials by Tutor: {sessionData?.tutorEmail}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {materials.map((material) => (
                <div
                  key={material._id}
                  className="border p-4 rounded shadow-sm"
                >
                  <img
                    src={material.image}
                    alt={material.title}
                    className="w-full h-40 object-cover mb-2"
                  />
                  <h3 className="font-medium mb-2">{material.title}</h3>
                  <div className="flex items-center space-x-4">
                    {/* Download button */}
                    <a
                      href={material.image}
                      download
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Download
                    </a>
                    {/* Link to Google Drive */}
                    <a
                      href={material.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Open Link
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No materials found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentMaterials;
