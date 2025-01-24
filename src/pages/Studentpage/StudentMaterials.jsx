import React from "react";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const StudentMaterials = () => {
  const secureAxios = useSecureAxios();
  const { id } = useParams();

  const { data: materials = [] } = useQuery({
    queryKey: ["materials", id],
    queryFn: async () => {
      const res = await secureAxios.get(`/materialDetails/${id}`);
      return res.data;
    },
  });

  return (
    <div>
      <div>
        <div className="text-center">
          <h2 className="text-2xl font-bold pb-3 border-b-2 border-yellow-500 w-3/12 mx-auto">
            All Materials for this Session
          </h2>
          <p>Get the Materials and start Study!</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Materials Name</th>
              <th>Download Image</th>
              <th>Drive Link</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((mate, idx) => (
              <tr key={mate._id}>
                <th>{idx + 1}</th>
                <td>{mate.title}</td>
                <td>
                  <a
                    href={mate.image}
                    download={mate.title}
                    target="_blank"
                    className="btn btn-success"
                  >
                    View Image
                  </a>
                </td>
                <td>
                  <a
                    href={mate.link}
                    target="_blank"
                    className="btn btn-primary"
                  >
                    Visit Link
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentMaterials;
