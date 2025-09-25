"use client";
import React, { useState } from "react";
import {
  FaEdit,
  FaStar,
  FaUserCircle,
  FaChevronDown,
  FaChevronUp,
  FaComment
} from "react-icons/fa";

import ProductReviewForm from "./ProductReviewForm";
import Modal from "@/components/common/Modal";

interface Review {
  _id: string;
  rating: number;
  comment: string;
  name: string;
}

interface ReviewsSectionProps {
  productId: string;
  review: Review[];
  loading: boolean;
  error: string | null;
  token: string | undefined;
  averageRating: string;
  refetch: () => void;
}

export default function ReviewsSection({
  productId,
  review = [],
  loading,
  error,
  token,
  refetch

}: ReviewsSectionProps) {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleReview = (reviewId: string) => {
    setExpandedReview(expandedReview === reviewId ? null : reviewId);
  };

  const toggleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const toggleReviewsVisibility = () => {
    setShowReviews(!showReviews);
  };

  const displayedReviews = showAllReviews ? review : review.slice(0, 3);

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-medium text-gray-900">Customer Reviews</h2>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {/* Show/Hide Reviews Button */}
          <button
            onClick={toggleReviewsVisibility}
            className="text-sm sm:text-md bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
          >
            <FaComment size={16} className="hidden sm:block" />
        {showReviews ? "Hide Reviews" : `Show Reviews (${review?.length || 0})`}

          </button>

          {/* Write Review Button */}
          {token && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm sm:text-md bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
            >
              <FaEdit size={16} className="hidden sm:block" /> Write a Review
            </button>
          )}
        </div>
      </div>

      {/* Reviews */}
      {showReviews && (
        <>
          {!token && (
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center mb-4 sm:mb-6">
              <p className="text-gray-600 text-sm sm:text-base">
                Please{" "}
                <button className="text-blue-600 hover:underline font-medium">
                  log in
                </button>{" "}
                to leave a review.
              </p>
            </div>
          )}

          {loading && (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 p-3 sm:p-4 rounded-lg text-red-700 mb-4 sm:mb-6 text-sm sm:text-base">
              <p>Error loading reviews: {error}</p>
            </div>
          )}

          {review.length > 0 ? (
            <>
              <div className="space-y-4 sm:space-y-6">
                {displayedReviews.map((review) => (
                  <div
                    key={review._id}
                    className="border border-gray-200 rounded-lg p-4 sm:p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start flex-col sm:flex-row gap-2 sm:gap-0">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <FaUserCircle className="text-gray-500 text-lg sm:text-xl" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm sm:text-base">
                            {review.name}
                          </p>
                          <div className="flex items-center gap-1 text-yellow-400 text-sm sm:text-base">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                                size={12}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {review.comment.length > 150 && (
                        <button
                          onClick={() => toggleReview(review._id)}
                          className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm flex items-center gap-1 mt-1 sm:mt-0"
                        >
                          {expandedReview === review._id ? (
                            <>
                              <span>Show less</span>
                              <FaChevronUp size={10} />
                            </>
                          ) : (
                            <>
                              <span>Read more</span>
                              <FaChevronDown size={10} />
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    <p className="text-gray-700 text-sm sm:text-base mt-2">
                      {expandedReview === review._id
                        ? review.comment
                        : review.comment.slice(0, 150) + (review.comment.length > 150 ? "..." : "")}
                    </p>

                    <div className="flex items-center gap-2 mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500">
                      <span>Helpful?</span>
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm">
                        Yes
                      </button>
                      <span className="text-gray-400">•</span>
                      <button className="text-gray-600 hover:text-gray-800 text-xs sm:text-sm">
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {review.length > 3 && (
                <div className="mt-4 sm:mt-6 text-center">
                  <button
                    onClick={toggleShowAllReviews}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors text-sm sm:text-base"
                  >
                    {showAllReviews ? (
                      <>
                        <FaChevronUp size={12} />
                        Show Less Reviews
                      </>
                    ) : (
                      <>
                        <FaChevronDown size={12} />
                        Show All Reviews ({review.length})
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            !loading && (
              <div className="bg-gray-50 p-6 sm:p-8 rounded-lg text-center">
                <FaStar className="text-gray-300 text-3xl sm:text-4xl mx-auto mb-2 sm:mb-3" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                  No reviews yet
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
                  Be the first to review this product!
                </p>
                {token && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2 rounded-lg inline-flex items-center gap-2 text-sm sm:text-base"
                  >
                    <FaEdit size={14} /> Write the First Review
                  </button>
                )}
              </div>
            )
          )}
        </>
      )}

      {/* Review Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProductReviewForm productId={productId} token={token} refetch={refetch}   onSuccess={() => setIsModalOpen(false)}/>
      </Modal>
    </div>
  );
}
