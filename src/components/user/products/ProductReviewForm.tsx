"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "@/lib/services/api/fetchers";
import { FaStar } from "react-icons/fa";

const ProductReviewForm = ({
  productId,
  token,
  refetch,
    onSuccess, 
}: {
  token: string | undefined;
  productId: string;
  refetch: () => void;
   onSuccess: () => void;
}) => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment) {
      toast.error("Please enter a comment!");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/v1/product/${productId}/reviews`,
        { rating, comment },
        config
      );
     
      toast.success("Review added successfully!");
      setComment("");
      setRating(0);
      refetch();
       onSuccess();
      console.log(data);
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-full mx-auto p-4">
      <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>

      {/* ⭐ Star Rating Section */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Rating</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              className="focus:outline-none"
            >
              <FaStar
                size={28}
                className={`cursor-pointer transition-colors ${
                  (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ✍ Comment Section */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 rounded w-full"
          rows={4}
          placeholder="Write your review..."
          required
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </form>
  );
};

export default ProductReviewForm;
