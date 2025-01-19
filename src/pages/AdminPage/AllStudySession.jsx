import React, { useState, useEffect } from "react";
import useSecureAxios from "../../hooks/useSecureAxios";
import { FaCheck, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const AllStudySession = () => {
  const secureAxios = useSecureAxios();
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isFree, setIsFree] = useState(true);
  const [amount, setAmount] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [feedback, setFeedback] = useState("");

  // Fetch all sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await secureAxios.get("/sessions");
        setSessions(res.data);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch sessions.", "error");
      }
    };

    fetchSessions();
  }, [secureAxios]);

  // Approve a session
  const handleApprove = async (sessionId) => {
    try {
      const res = await secureAxios.patch(`/sessions/approve/${sessionId}`);
      if (res.data.message) {
        const updatedSessions = sessions.map((session) =>
          session._id === sessionId
            ? { ...session, status: "approved" }
            : session
        );
        setSessions(updatedSessions);
        Swal.fire("Approved!", "The session has been approved.", "success");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to approve session.", "error");
    }
  };

  // Reject a session
  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      Swal.fire("Error", "Please provide a rejection reason.", "error");
      return;
    }
    if (!feedback.trim()) {
      Swal.fire("Error", "Please provide feedback.", "error");
      return;
    }

    try {
      const res = await secureAxios.patch(
        `/sessions/reject/${selectedSession._id}`,
        {
          rejectionReason,
          feedback,
        }
      );
      if (res.data.message) {
        const updatedSessions = sessions.filter(
          (session) => session._id !== selectedSession._id
        );
        setSessions(updatedSessions);
        Swal.fire("Rejected!", "The session has been rejected.", "success");
        setSelectedSession(null);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to reject session.", "error");
    }
  };

  // Update session details
  const handleUpdate = async () => {
    const fee = isFree ? 0 : parseFloat(amount) || 0; // Fallback to 0 if amount is invalid
    if (!isFree && fee <= 0) {
      Swal.fire(
        "Error",
        "Please enter a valid amount greater than 0.",
        "error"
      );
      return;
    }

    try {
      const res = await secureAxios.patch(`/sessions/${selectedSession._id}`, {
        registrationFee: fee,
        // Do not include `status` in the payload, as we don't want to reset it
      });
      if (res.data.session) {
        const updatedSessions = sessions.map((session) =>
          session._id === selectedSession._id
            ? { ...session, registrationFee: fee } // Only update the fee
            : session
        );
        setSessions(updatedSessions);
        Swal.fire("Updated!", "The session has been updated.", "success");
        setSelectedSession(null); // Close modal
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update session.", "error");
    }
  };

  // Delete a session
  const handleDelete = async (sessionId) => {
    if (!sessionId) {
      Swal.fire("Error", "Invalid session ID.", "error");
      return;
    }

    try {
      const res = await secureAxios.delete(`/sessions/${sessionId}`);
      if (res.data.message) {
        setSessions((prev) =>
          prev.filter((session) => session._id !== sessionId)
        );
        Swal.fire("Deleted!", "The session has been deleted.", "success");
      } else {
        Swal.fire("Error", "Session not found.", "error");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.error || "Failed to delete session.",
        "error"
      );
    }
  };

  const showApproveModal = (session) => {
    setSelectedSession(session);
    setIsFree(session.registrationFee === 0);
    setAmount(session.registrationFee?.toString() || "");
  };

  const showRejectModal = (session) => {
    setSelectedSession(session);
    setRejectionReason("");
    setFeedback("");
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold">All Study Sessions</h2>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Session Name</th>
            <th>Tutor Name</th>
            <th>Status</th>
            <th>Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, idx) => (
            <tr key={session._id}>
              <td>{idx + 1}</td>
              <td>{session.sessionTitle}</td>
              <td>{session.tutorName}</td>
              <td>{session.status}</td>
              <td>${session.registrationFee}</td>
              <td>
                {session.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(session._id)}
                      className="btn btn-success"
                    >
                      <FaCheck /> Approve
                    </button>
                    <button
                      onClick={() => showRejectModal(session)}
                      className="btn btn-danger"
                    >
                      <FaTimes /> Reject
                    </button>
                  </>
                )}
                {session.status === "approved" && (
                  <>
                    <button
                      onClick={() => showApproveModal(session)}
                      className="btn btn-warning"
                    >
                      <FaEdit /> Update
                    </button>
                    <button
                      onClick={() => handleDelete(session._id)}
                      className="btn btn-danger"
                    >
                      <FaTrash /> Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            {selectedSession.status === "pending" ? (
              <>
                <h3 className="text-xl font-bold mb-4">
                  Reject Session: {selectedSession.sessionTitle}
                </h3>
                <div className="mb-4">
                  <label className="block font-bold mb-2">
                    Rejection Reason
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="textarea textarea-bordered w-full"
                    placeholder="Enter reason for rejection"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2">Feedback</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="textarea textarea-bordered w-full"
                    placeholder="Provide additional feedback"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setSelectedSession(null)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button onClick={handleReject} className="btn btn-primary">
                    Reject Session
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4">
                  Update Session: {selectedSession.sessionTitle}
                </h3>
                <div className="mb-4">
                  <label className="block font-bold mb-2">
                    Is this session free?
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sessionType"
                        checked={isFree}
                        onChange={() => setIsFree(true)}
                      />
                      <span className="ml-2">Free</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sessionType"
                        checked={!isFree}
                        onChange={() => setIsFree(false)}
                      />
                      <span className="ml-2">Paid</span>
                    </label>
                  </div>
                </div>
                {!isFree && (
                  <div className="mb-4">
                    <label className="block font-bold mb-2">Amount ($)</label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter fee amount"
                    />
                  </div>
                )}
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setSelectedSession(null)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button onClick={handleUpdate} className="btn btn-primary">
                    Update Session
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllStudySession;
