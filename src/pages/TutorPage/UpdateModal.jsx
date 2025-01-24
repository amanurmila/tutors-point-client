import React, { useState } from "react";
import Swal from "sweetalert2";

const UpdateModal = ({ material, onClose, refetch }) => {
  const [formData, setFormData] = useState({
    title: material.title,
    driveLink: material.driveLink || "", // Default value for Google Drive link
    image: material.image || "", // Default image URL
  });
  const [imageFile, setImageFile] = useState(null); // Store the selected image file

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  // Upload image to ImgBB
  const uploadImageToImgBB = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=4d465516c095ecc05e82aee3d6e55a48`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        return data.data.url; // Return the image URL from ImgBB
      } else {
        throw new Error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      Swal.fire("Error", "Image upload failed. Try again.", "error");
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = formData.image;

    // If a new image is selected, upload it to ImgBB
    if (imageFile) {
      imageUrl = await uploadImageToImgBB();
      if (!imageUrl) return; // Exit if image upload fails
    }

    try {
      // Send update request to backend
      const response = await fetch(
        `https://tutors-point-server.vercel.app/materials/${material._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            driveLink: formData.driveLink,
            image: imageUrl,
          }),
        }
      );

      if (response.ok) {
        Swal.fire("Success!", "Material updated successfully!", "success");
        refetch(); // Refresh the data
        onClose(); // Close the modal
      } else {
        Swal.fire("Error!", "Failed to update material.", "error");
      }
    } catch (error) {
      console.error("Error updating material:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <h3 className="text-lg font-bold mb-4">Update Material</h3>
        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Google Drive Link Field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Google Drive Link</span>
            </label>
            <input
              type="text"
              name="driveLink"
              value={formData.driveLink}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter Google Drive link"
            />
          </div>

          {/* Image Upload Field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
