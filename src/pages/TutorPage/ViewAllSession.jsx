import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";

const ViewAllSession = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();

  const { data: tutorSessions = [] } = useQuery({
    queryKey: ["tutorSessions", user.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/sessions/${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2>Sessions: {tutorSessions.length}</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Session Name</th>
                <th>Reg Deadline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tutorSessions.map((item, idx) => (
                <tr key={item._id}>
                  <th>{idx + 1}</th>
                  <td>{item.sessionTitle}</td>
                  <td>{item.registrationEndDate}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAllSession;
