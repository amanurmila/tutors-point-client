import React from "react";
import { FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";
import Swal from "sweetalert2";

const CreateSession = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const sessionTitle = form.sessionTitle.value;
    const tutorName = form.tutorName.value;
    const tutorEmail = form.tutorEmail.value;
    const sessionDescription = form.sessionDescription.value;
    const registrationStartDate = form.registrationStartDate.value;
    const registrationEndDate = form.registrationEndDate.value;
    const classStartDate = form.classStartDate.value;
    const classEndDate = form.classEndDate.value;
    const sessionDuration = form.sessionDuration.value;
    const registrationFee = form.registrationFee.value;
    const status = form.status.value;

    const sessionInfo = {
      sessionTitle,
      tutorName,
      tutorEmail,
      sessionDescription,
      registrationStartDate,
      registrationEndDate,
      classStartDate,
      classEndDate,
      sessionDuration,
      registrationFee,
      status,
    };

    const session = await secureAxios.post("/sessions", sessionInfo);
    if (session.data.insertedId) {
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
    <div>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create Study Session
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Session Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Session Title
            </label>
            <input
              type="text"
              name="sessionTitle"
              placeholder="Enter session title"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Tutor Name (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tutor Name
            </label>
            <input
              type="text"
              name="tutorName"
              defaultValue={user?.displayName}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Tutor Email (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tutor Email
            </label>
            <input
              type="email"
              name="tutorEmail"
              defaultValue={user?.email}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Session Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Session Description
            </label>
            <textarea
              name="sessionDescription"
              placeholder="Enter session description"
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          {/* Registration Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Registration Start Date
            </label>
            <input
              type="date"
              name="registrationStartDate"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Registration End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Registration End Date
            </label>
            <input
              type="date"
              name="registrationEndDate"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Class Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Class Start Date
            </label>
            <input
              type="date"
              name="classStartDate"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Class End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Class End Date
            </label>
            <input
              type="date"
              name="classEndDate"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Session Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Session Duration (hours)
            </label>
            <input
              type="number"
              name="sessionDuration"
              placeholder="Enter session duration"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Registration Fee (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Registration Fee
            </label>
            <input
              type="number"
              name="registrationFee"
              readOnly
              defaultValue={0}
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <input
              type="text"
              name="status"
              defaultValue="pending"
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center"
            >
              <FaCalendarAlt className="mr-2" />
              Create Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSession;
