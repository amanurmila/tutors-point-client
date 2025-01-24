import React, { useState } from "react";
import { MdStar, MdRateReview } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const ReviewSection = ({ sessionId }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [studentId, setStudentId] = useState("Anonymous"); // Default value, change it if you have a studentId system

  // Submit a new review
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!reviewText.trim() || rating === 0) {
      toast.error("Please provide both a review and a rating");
      return;
    }

    const newReview = {
      sessionId,
      studentId, // Include the studentId if it's available
      reviewText,
      rating,
    };

    try {
      const response = await axios.post(
        "https://tutors-point-server.vercel.app/reviews",
        newReview
      ); // Adjust URL based on your backend
      setReviewText("");
      setRating(0);
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error(error); // Log the error to the console
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
        <MdRateReview className="text-secondary" />
        Submit Your Review
      </h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          className="textarea textarea-bordered w-full h-24"
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-gray-700 font-medium">Your Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <MdStar
              key={star}
              className={`text-2xl cursor-pointer ${
                rating >= star ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <button type="submit" className="btn btn-primary mt-4 w-full">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewSection;
