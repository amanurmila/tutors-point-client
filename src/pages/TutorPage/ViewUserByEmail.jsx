import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import UpdateModal from "./UpdateModal";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

const ViewUserByEmail = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  // Fetch materials
  const { data: materials = [], refetch } = useQuery({
    queryKey: ["materials", user.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/materials/${user.email}`);
      return res.data;
    },
  });

  // Handle delete material
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await secureAxios.delete(`/materials/${id}`);
          Swal.fire("Deleted!", "Material has been deleted.", "success");
          refetch();
        } catch (error) {
          Swal.fire("Error!", "Failed to delete material.", "error");
        }
      }
    });
  };

  // Handle update material
  const handleUpdate = (material) => {
    setSelectedMaterial(material); // Open modal
  };

  return (
    <div>
      <h2>User Information</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Session ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material, idx) => (
              <tr key={material._id}>
                <th>{idx + 1}</th>
                <td>{material.title}</td>
                <td>{material.sessionId}</td>
                <td className="flex space-x-2">
                  <button
                    className="btn btn-primary btn-sm flex items-center"
                    onClick={() => handleUpdate(material)}
                  >
                    <FaEdit className="mr-1" /> Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm flex items-center"
                    onClick={() => handleDelete(material._id)}
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Material Modal */}
      {selectedMaterial && (
        <UpdateModal
          material={selectedMaterial}
          onClose={() => setSelectedMaterial(null)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ViewUserByEmail;
