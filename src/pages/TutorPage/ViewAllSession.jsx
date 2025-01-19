import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";
import Swal from "sweetalert2";

const ViewAllSession = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();

  // Fetch tutor sessions
  const { data: tutorSessions = [], refetch } = useQuery({
    queryKey: ["tutorSessions", user.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/sessions/${user.email}`);
      return res.data;
    },
  });

  // Handle "Try Again" button click
  const handleTryAgain = async (sessionId) => {
    try {
      const res = await secureAxios.patch(`/sessions/statusChange/${sessionId}`, {
        status: "pending", // Change the status to pending
      });

      if (res.status === 200) {
        Swal.fire("Success!", "Session status updated to pending.", "success");
        refetch(); // Refresh the sessions list
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update session status.", "error");
    }
  };

  return (
    <div>
      <h2>Sessions: {tutorSessions.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Session Name</th>
              <th>Reg Deadline</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tutorSessions.map((item, idx) => (
              <tr key={item._id}>
                <th>{idx + 1}</th>
                <td>{item.sessionTitle}</td>
                <td>{item.registrationEndDate}</td>
                <td>{item.status}</td>
                <td>
                  {item.status === "rejected" && (
                    <button
                      onClick={() => handleTryAgain(item._id)}
                      className="btn btn-primary"
                    >
                      Try Again
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllSession;
