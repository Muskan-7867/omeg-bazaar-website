"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

interface PaginationProps {
  totalProducts: number;
  productPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalProducts,
  productPerPage,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get current page from query params (default to 1)
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? Number(pageParam) : 1;

  const totalPages = Math.ceil(totalProducts / productPerPage);

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const getVisiblePages = () => {
    const visiblePages: (number | string)[] = [];

    // Always show first page
    visiblePages.push(1);

    // Calculate range around current page
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if we're at the beginning or end
    if (currentPage <= 3) {
      end = Math.min(4, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      start = Math.max(totalPages - 3, 2);
    }

    // Add ellipsis after first page if needed
    if (start > 2) {
      visiblePages.push("...");
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      visiblePages.push("...");
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      visiblePages.push(totalPages);
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  const handleNext = () => {
    if (currentPage < totalPages) {
      updatePage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      updatePage(currentPage - 1);
    }
  };

  return (
    <div className="w-full flex justify-center mt-10 scrollbar-hide">
      <div className="flex gap-2 px-4 py-2 rounded-md items-center overflow-x-auto scrollbar-hide">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md shrink-0 ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          Prev
        </button>

        {visiblePages.map((pageItem, index) => {
          if (pageItem === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 py-1">
                ...
              </span>
            );
          }

          const isCurrent = currentPage === pageItem;

          return (
            <button
              key={pageItem}
              onClick={() => updatePage(Number(pageItem))}
              className={`px-4 py-2 rounded-md shrink-0 ${
                isCurrent
                  ? "bg-white text-primary shadow-xl font-bold"
                  : "bg-primary text-white hover:bg-primary-dark"
              }`}
            >
              {pageItem}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md shrink-0 ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
