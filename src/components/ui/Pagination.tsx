"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (showEllipsisStart) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (showEllipsisEnd) {
        pages.push("...");
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-8"
      aria-label="Paginacion"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg
          transition-colors duration-200
          ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
          }
        `}
        aria-label="Pagina anterior"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Anterior
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-gray-500"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`
                min-w-[40px] px-3 py-2 text-sm font-medium rounded-lg
                transition-colors duration-200
                ${
                  currentPage === page
                    ? "bg-orange-600 text-white"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }
              `}
              aria-label={`Pagina ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg
          transition-colors duration-200
          ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
          }
        `}
        aria-label="Pagina siguiente"
      >
        Siguiente
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </nav>
  );
}
