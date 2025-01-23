import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import useSecureAxios from "../../hooks/useSecureAxios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ReactPaginate from "react-paginate";

const AllUsers = () => {
  const [search, setSearch] = useState(""); // Search input state
  const [currentPage, setCurrentPage] = useState(0); // Current page for pagination
  const itemsPerPage = 10; // Number of items per page
  const secureAxios = useSecureAxios();
  const axiosPublic = useAxiosPublic();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users?search=${search}`);
      return res.data;
    },
  });

  // Pagination calculations
  const pageCount = Math.ceil(users.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = users.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleMakeAdmin = async (item) => {
    try {
      const response = await secureAxios.patch(`/users/${item._id}`);
      if (response.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${item.name} is an Admin Now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to promote user. Please try again later.",
      });
    }
  };

  const handleSearch = () => {
    refetch(); // Trigger a refetch with the updated search query
    setCurrentPage(0); // Reset to the first page after search
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-bold pb-3 border-b-2 border-yellow-500 w-3/12 mx-auto">
          All Users
        </h2>
        <p>Only admin can view All Users</p>
      </div>
      <div className="my-6">
        {/* Search Bar */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full max-w-md"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            {/* Table Head */}
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {currentItems.map((item, idx) => (
                <tr key={item._id}>
                  <th>{startIndex + idx + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    {item.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(item)}
                        className="btn bg-yellow-600 text-white text-lg"
                      >
                        <FaUsers />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Page Information */}
        {users.length > 0 && (
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

export default AllUsers;
