import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show a subset of pages with ellipsis if needed
      let startPage, endPage;

      if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxVisiblePages / 2);
        endPage = currentPage + Math.floor(maxVisiblePages / 2);
      }

      // Always include first page
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      // Middle pages
      for (let i = startPage; i <= endPage; i++) {
        if (i > 0 && i <= totalPages) {
          pages.push(i);
        }
      }

      // Always include last page
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <span
            key={`ellipsis-${index}`}
            className="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700"
          >
            ...
          </span>
        );
      }

      return (
        <button
          key={page}
          onClick={() => onPageChange(page as number)}
          className={`px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium ${
            currentPage === page
              ? "text-primary bg-primary bg-opacity-10"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="flex justify-center mt-6">
      <nav className="inline-flex rounded-md shadow">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;