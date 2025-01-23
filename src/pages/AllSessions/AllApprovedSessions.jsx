import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useSecureAxios from "../../hooks/useSecureAxios";
import ApprovedCard2 from "./ApprovedCard2";
import ReactPaginate from "react-paginate";

const AllApprovedSessions = () => {
  const secureAxios = useSecureAxios();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;

  const { data: approved = [] } = useQuery({
    queryKey: ["approved"],
    queryFn: async () => {
      const res = await secureAxios.get("/approvedSessions");
      return res.data;
    },
  });

  // Pagination calculations
  const pageCount = Math.ceil(approved.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = approved.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <div>
        <div className="text-center">
          <h2 className="text-2xl font-bold pb-3 border-b-2 border-yellow-500 w-3/12 mx-auto">
            Approved Sessions
          </h2>
          <p>Everyone can view the cards</p>
        </div>

        {/* No Data State */}
        {approved.length === 0 && (
          <p className="text-center text-gray-500 my-5">
            No approved sessions to display at the moment.
          </p>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-11/12 mx-auto gap-6 my-5">
          {currentItems.map((session) => (
            <ApprovedCard2 session={session} key={session._id} />
          ))}
        </div>

        {/* Page Information */}
        {approved.length > 0 && (
          <div className="text-center my-3">
            Page {currentPage + 1} of {pageCount}
          </div>
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="flex justify-center my-5">
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName={"pagination flex gap-2"}
              pageClassName={"btn btn-outline"}
              previousClassName={"btn btn-outline"}
              nextClassName={"btn btn-outline"}
              activeClassName={"btn btn-primary text-white font-bold"}
              disabledLinkClassName={"btn-disabled"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllApprovedSessions;
