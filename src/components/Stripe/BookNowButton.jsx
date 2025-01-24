import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookNowButton = ({ sessionId, registrationFee }) => {
  const navigate = useNavigate();

  const handleBooking = async () => {
    if (registrationFee === 0) {
      // Free booking
      try {
        const response = await axios.post(
          "https://tutors-point-server.vercel.app/book-session",
          {
            sessionId,
            studentEmail: "loggedInUser@example.com", // Replace with actual logged-in user's email
          }
        );

        alert(response.data.message);
      } catch (error) {
        console.error(error);
        alert("Failed to book session.");
      }
    } else {
      // Redirect to payment page for paid booking
      navigate(`/payment/${sessionId}`);
    }
  };

  return (
    <button
      onClick={handleBooking}
      className="btn btn-primary"
      disabled={registrationFee < 0}
    >
      Book Now
    </button>
  );
};

export default BookNowButton;
