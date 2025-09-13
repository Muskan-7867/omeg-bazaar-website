"use client";

import { useSearchParams, useRouter } from "next/navigation";

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

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.max(1, Math.ceil(totalProducts / productPerPage));

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const getVisiblePages = () => {
    const visiblePages: (number | "...")[] = [];

    visiblePages.push(1); // always show first

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      end = Math.min(4, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      start = Math.max(totalPages - 3, 2);
    }

    if (start > 2) visiblePages.push("...");
    for (let i = start; i <= end; i++) visiblePages.push(i);
    if (end < totalPages - 1) visiblePages.push("...");
    if (totalPages > 1) visiblePages.push(totalPages);

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="w-full flex justify-center mt-10 scrollbar-hide">
      <div className="flex gap-2 px-4 py-2 rounded-md items-center overflow-x-auto scrollbar-hide">
        {/* Prev Button */}
        <button
          onClick={() => updatePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md shrink-0 ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
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
              onClick={() => updatePage(pageItem)}
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

        {/* Next Button */}
        <button
          onClick={() => updatePage(currentPage + 1)}
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
