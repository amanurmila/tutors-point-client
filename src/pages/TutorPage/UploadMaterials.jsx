import React, { useState } from "react";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const UploadMaterials = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const [selectedSession, setSelectedSession] = useState(null);
  const [materialTitle, setMaterialTitle] = useState("");
  const [image, setImage] = useState(null);
  const [googleDriveLink, setGoogleDriveLink] = useState("");

  const { data: approvedSessions = [], isLoading } = useQuery({
    queryKey: ["approvedSessions", user.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/sessions/approved/${user.email}`);
      return res.data;
    },
  });

  const handleUploadMaterial = async (e) => {
    e.preventDefault();

    if (!materialTitle.trim() || !googleDriveLink.trim() || !image) {
      Swal.fire("Error", "Please fill out all fields.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      // Step 1: Upload image to ImgBB
      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=4d465516c095ecc05e82aee3d6e55a48`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imgData = await imgRes.json();

      if (!imgData.success) {
        Swal.fire("Error", "Failed to upload image.", "error");
        return;
      }

      const imageUrl = imgData.data.display_url;

      // Step 2: Save material data to the database
      const materialData = {
        title: materialTitle,
        sessionId: selectedSession._id,
        tutorEmail: user.email,
        image: imageUrl,
        link: googleDriveLink,
      };

      const res = await secureAxios.post("/materials", materialData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Material uploaded successfully!", "success");
        setMaterialTitle("");
        setImage(null);
        setGoogleDriveLink("");
        setSelectedSession(null);
        closeModal(); // Close the modal after successful submission
      }
    } catch (error) {
      Swal.fire("Error", "Failed to upload materials.", "error");
    }
  };

  const openModal = (session) => {
    setSelectedSession(session);
    document.getElementById("uploadModal").showModal();
  };

  const closeModal = () => {
    document.getElementById("uploadModal").close();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-bold pb-3 border-b-2 border-yellow-500 w-3/12 mx-auto">
          Upload Materials
        </h2>
        <p>Tutor Can Update Materials</p>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Session Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvedSessions.map((app, idx) => (
                <tr key={app._id}>
                  <th>{idx + 1}</th>
                  <td>{app.sessionTitle}</td>
                  <td>{app.status}</td>
                  <td>
                    <button
                      className="btn btn-primary text-white"
                      onClick={() => openModal(app)}
                    >
                      Upload Material
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Material Upload */}
      <dialog id="uploadModal" className="modal">
        <div className="modal-box">
          {selectedSession && (
            <div>
              <h3 className="text-xl font-bold mb-4">
                Upload Material for: {selectedSession.sessionTitle}
              </h3>
              <form onSubmit={handleUploadMaterial}>
                <div className="mb-4">
                  <label className="block font-bold mb-2">Title</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={materialTitle}
                    onChange={(e) => setMaterialTitle(e.target.value)}
                    placeholder="Enter material title"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2">Session ID</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={selectedSession._id}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2">Tutor Email</label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    value={user.email}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2">Image Upload</label>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2">
                    Google Drive Link
                  </label>
                  <input
                    type="url"
                    className="input input-bordered w-full"
                    value={googleDriveLink}
                    onChange={(e) => setGoogleDriveLink(e.target.value)}
                    placeholder="Enter Google Drive link"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">
                    Submit Material
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ml-4"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default UploadMaterials;
