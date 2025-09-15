"use client";

import React from "react";
import { useBlogFilters } from "@/hooks/useURLState";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
  showInfo?: boolean;
  maxVisiblePages?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  showInfo = true,
  maxVisiblePages = 7,
}: PaginationProps) {
  const { updateFilters } = useBlogFilters();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      updateFilters({ page });
      onPageChange?.(page);
    }
  };

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      // Tüm sayfaları göster
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Akıllı sayfalama
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      {/* Page Info */}
      {showInfo && (
        <div className="text-gray-400 text-sm font-saira-normal">
          Sayfa {currentPage} / {totalPages}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`
            px-3 py-2 rounded-lg font-saira-semibold text-sm
            transition-all duration-200
            ${
              currentPage <= 1
                ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700 hover:text-[#F0E74D]"
            }
          `}
          aria-label="Previous page"
        >
          ← Önceki
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {visiblePages.map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="px-3 py-2 text-gray-500">...</span>
              ) : (
                <button
                  onClick={() => handlePageChange(page as number)}
                  className={`
                    px-3 py-2 rounded-lg font-saira-semibold text-sm min-w-[40px]
                    transition-all duration-200
                    ${
                      currentPage === page
                        ? "bg-[#F0E74D] text-black shadow-lg shadow-[#F0E74D]/30"
                        : "bg-gray-800 text-white hover:bg-gray-700 hover:text-[#F0E74D]"
                    }
                  `}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`
            px-3 py-2 rounded-lg font-saira-semibold text-sm
            transition-all duration-200
            ${
              currentPage >= totalPages
                ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700 hover:text-[#F0E74D]"
            }
          `}
          aria-label="Next page"
        >
          Sonraki →
        </button>
      </div>

      {/* Jump to Page (larger datasets için) */}
      {totalPages > 10 && (
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-400 font-saira-normal">Sayfaya git:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (page >= 1 && page <= totalPages) {
                handlePageChange(page);
              }
            }}
            className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-center font-saira-normal"
          />
        </div>
      )}
    </div>
  );
}





