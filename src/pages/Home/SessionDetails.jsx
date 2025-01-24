import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const SessionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const { data: session = {} } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const res = await secureAxios.get(`/session/${id}`);
      return res.data;
    },
  });

  const {
    _id,
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
    reviews = [],
  } = session;

  console.log(tutorEmail)

  const isRegistrationClosed = new Date(registrationEndDate) < new Date();

  // Calculate the average rating from reviews
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "No ratings yet";

  // Disable the "Book Now" button if registration is closed or user is admin/tutor
  const isBookDisabled =
    isRegistrationClosed || user?.role === "admin" || user?.role === "tutor";

  const handleBooking = async () => {
    setLoading(true);

    try {
      // Convert registrationFee to a number
      const fee = Number(registrationFee);

      const response = await secureAxios.post("/book-session", {
        sessionId: id,
        studentEmail: user?.email,
        registrationFee: fee,
      });

      const { clientSecret, message } = response.data;

      if (fee === 0) {
        const bookingData = {
          sessionId: _id,
          studentEmail: user.email,
          tutorEmail,
          registrationFee: registrationFee,
          status: "Booked",
          bookedAt: new Date(),
        };

        const res = await axios.post(
          "https://tutors-point-server.vercel.app/book-session",
          bookingData
        );
        // Free session booked, show SweetAlert
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: message || "Session booked successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      } else {
        // Paid session: Redirect to payment page
        navigate(`/payment/${id}`, { state: { clientSecret, session } });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to book session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card w-full lg:w-96 bg-base-100 shadow-xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-primary text-2xl font-bold">
          {sessionTitle}
        </h2>
        <p className="text-gray-600">
          <span className="font-medium">Tutor:</span> {tutorName}
        </p>

        <div className="flex items-center mt-2">
          <p className="flex items-center text-yellow-500">
            <FaStar className="mr-1" /> {averageRating}
          </p>
        </div>

        <p className="text-gray-800 mt-4">{sessionDescription}</p>

        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <p>
            <span className="font-semibold">Registration Start:</span>{" "}
            {registrationStartDate}
          </p>
          <p>
            <span className="font-semibold">Registration End:</span>{" "}
            {registrationEndDate}
          </p>
          <p>
            <span className="font-semibold">Class Start:</span> {classStartDate}
          </p>
          <p>
            <span className="font-semibold">Class End:</span> {classEndDate}
          </p>
          <p>
            <span className="font-semibold">Duration:</span> {sessionDuration}{" "}
            hours
          </p>
          <p>
            <span className="font-semibold">Fee:</span>{" "}
            {registrationFee === 0 ? "Free" : `$${registrationFee}`}
          </p>
        </div>

        <h3 className="mt-6 font-bold text-lg">Reviews:</h3>
        {reviews.length > 0 ? (
          <ul className="list-disc ml-6 mt-2 text-sm">
            {reviews.map((review, index) => (
              <li key={index}>
                <strong>{review.user}</strong>: {review.comment} (⭐{" "}
                {review.rating})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        <div className="mt-6">
          <button
            onClick={handleBooking}
            className={`btn ${
              isBookDisabled || loading ? "btn-disabled" : "btn-primary"
            }`}
            disabled={isBookDisabled || loading}
          >
            {loading
              ? "Processing..."
              : isRegistrationClosed
              ? "Registration Closed"
              : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
