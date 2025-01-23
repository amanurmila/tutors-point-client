import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../hooks/useSecureAxios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const ViewBookedSessions = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  const { data: booked = [], refetch } = useQuery({
    queryKey: ["booked", user.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/booked-sessions/${user.email}`);
      return res.data;
    },
  });

  // Pagination calculations
  const pageCount = Math.ceil(booked.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentItems = booked.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-bold pb-3 border-b-2 border-yellow-500 w-4/12 mx-auto">
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
              {currentItems.map((item, idx) => (
                <tr key={item._id}>
                  <th>{startIndex + idx + 1}</th>
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

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center my-5">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"pagination flex gap-3"}
            pageClassName={"px-3 py-1 border border-gray-300 rounded-md"}
            previousClassName={"px-3 py-1 border border-gray-300 rounded-md"}
            nextClassName={"px-3 py-1 border border-gray-300 rounded-md"}
            activeClassName={
              "bg-primary text-white font-bold px-3 py-1 rounded-md"
            }
            disabledClassName={"btn-disabled"}
          />
        </div>
      )}
    </div>
  );
};

export default ViewBookedSessions;
