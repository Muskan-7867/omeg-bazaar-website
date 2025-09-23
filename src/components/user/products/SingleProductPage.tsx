"use client";
import React from "react";
import { Product } from "@/lib/types/Product";
import Cookies from "js-cookie";
import useProductReviews from "@/hooks/useProductReviews";
import ProductImages from "./ProductImages";
import ProductDetails from "./ProductDetailes";
import ReviewsSection from "./ReviewSection";
import RelatedProducts from "./RelatedProducts";

interface Props {
  product: Product;
}

export default function SingleProductPage({ product }: Props) {
  const token = Cookies.get("authToken");
  const { reviews, loading, error } = useProductReviews(product._id);

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="w-full bg-white p-4 lg:mt-4 mt-14 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 ">
          <ProductImages images={product.images} productName={product.name} />

          <ProductDetails
            product={product}
            averageRating={averageRating}
            reviewCount={reviews.length}
          />
        </div>

        <ReviewsSection
          productId={product._id}
          reviews={reviews}
          loading={loading}
          error={error}
          token={token}
          averageRating={averageRating}
        />
      </div>

        <RelatedProducts
          categorySlug={product.category?.slug}
          currentProductId={product._id}
        />

    </div>
  );
}
