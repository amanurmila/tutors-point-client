import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      Swal.fire({
        icon: "error",
        title: "Initialization Error",
        text: "Stripe is not properly initialized. Please try again.",
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch client secret and session details
      const {
        data: { clientSecret, sessionDetails },
      } = await axios.post("http://localhost:5000/get-session-details", {
        sessionId,
      });

      const cardElement = elements.getElement(CardElement);

      // Confirm payment
      const { error: paymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

      if (paymentError) {
        setError(`Payment failed: ${paymentError.message}`);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // Save booking after successful payment
        const bookingData = {
          sessionId: sessionDetails._id,
          studentEmail: user.email,
          tutorEmail: sessionDetails.tutorEmail,
          registrationFee: sessionDetails.registrationFee,
          status: "Booked",
          bookedAt: new Date(),
        };

        await axios.post("http://localhost:5000/book-session", bookingData);

        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "Session booked successfully!",
        });

        // Navigate to the home page
        navigate("/");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Payment Page</h2>
      <form onSubmit={handlePayment}>
        <div className="border p-4 rounded mb-4">
          <CardElement />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading || !stripe || !elements}
        >
          {loading ? "Processing..." : "Pay and Book"}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
