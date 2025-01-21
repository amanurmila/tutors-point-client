import React from "react";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllMaterials = () => {
  const secureAxios = useSecureAxios();

  const { data: materials = [], refetch } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const res = await secureAxios.get("/materials");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const res = await secureAxios.delete(`/material/${id}`);
    if (res.data.deletedCount > 0) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Material is deleted successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  console.log(materials);

  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-bold pb-3 border-b-2 border-yellow-500 w-3/12 mx-auto">
          All Materials
        </h2>
        <p>Here is your all materials</p>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Image</th>
                <th>Drive Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material, idx) => (
                <tr key={material._id}>
                  <th>{idx + 1}</th>
                  <td>{material.title}</td>
                  <td>
                    <a
                      href={material.image}
                      target="_blank"
                      className="btn btn-success btn-sm text-white"
                    >
                      Image Link
                    </a>
                  </td>
                  <td>
                    <a
                      href={material.link}
                      target="_blank"
                      className="btn btn-success btn-sm text-white"
                    >
                      Drive Link
                    </a>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(material._id)}
                      className="btn btn-warning btn-sm"
                    >
                      Delete
                    </button>
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

export default AllMaterials;
