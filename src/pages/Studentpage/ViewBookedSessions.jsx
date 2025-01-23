import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../hooks/useSecureAxios";
import { Link } from "react-router-dom";

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

  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-bold pb-3 border-b-2 border-yellow-500 w-3/12 mx-auto">
          Your Booked Sessions
        </h2>
        <p>Only you can view your booked sessions</p>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Session Id</th>
                <th>Tutor Email</th>
                <th>Fees Paid</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {booked.map((item, idx) => (
                <tr key={item._id}>
                  <th>1</th>
                  <td>{item.sessionId}</td>
                  <td>{item.tutorEmail}</td>
                  <td>{item.registrationFee}</td>
                  <td>
                    <Link
                      to={`/dashboard/sessionDetailsPage/${item.sessionId}`}
                      className="btn btn-success btn-sm"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewBookedSessions;
