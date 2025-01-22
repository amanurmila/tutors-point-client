import React from "react";
import { Link } from "react-router-dom";

const ApprovedCard2 = ({ session }) => {
  // Determine if registration is ongoing
  const isOngoing = new Date(session.registrationEndDate) >= new Date();

  return (
    <div className="card bg-base-100 shadow-xl max-w-sm">
      <div className="card-body">
        <h2 className="card-title text-primary">{session.sessionTitle}</h2>
        <p className="text-gray-600">{session.sessionDescription}</p>
        <div className="flex justify-between items-center mt-4">
          <button
            className={`btn ${
              isOngoing ? "btn-success" : "btn-error"
            } btn-sm capitalize`}
          >
            {isOngoing ? "Ongoing" : "Closed"}
          </button>
          <Link to={`/approvedSessions/${session._id}`}>
            <button className="btn btn-primary btn-sm capitalize">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApprovedCard2;
