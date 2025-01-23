import React from "react";
import useAuth from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";
import Swal from "sweetalert2";

const CreateNotes = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userEmail = form.email.value;
    const title = form.title.value;
    const description = form.description.value;

    const formData = { userEmail, title, description };

    const res = await secureAxios.post("/notes", formData);
    if (res.data.insertedId) {
      form.reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Session is added to the Database`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Add Note
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-secondary">Email</span>
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              readOnly
              className="input input-bordered input-primary bg-base-100 cursor-not-allowed"
            />
          </div>

          {/* Title Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-secondary">Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter a title"
              className="input input-bordered input-primary bg-base-100"
              required
            />
          </div>

          {/* Description Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-secondary">Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Write your notes here"
              className="textarea textarea-bordered textarea-primary bg-base-100"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateNotes;
