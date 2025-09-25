import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/lib/services/api/fetchers";

interface Review {
  _id: string;
  name: string;
  comment: string;
  rating: number;
}

export default function useProductReviews(productId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/product/${productId}/reviews`);
      if (res.data.success) {
        setReviews(res.data.reviews || []);
      }
    } catch {
      setError("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!productId) return;
    fetchReviews();
  }, [productId]);

  return { reviews, loading, error, setReviews, refetch: fetchReviews };
}

