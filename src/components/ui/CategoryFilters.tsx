"use client";

import React from "react";
import { useBlogFilters } from "@/hooks/useURLState";

interface Category {
  id: string;
  name: string;
  count?: number;
}

interface CategoryFiltersProps {
  categories?: Category[];
  className?: string;
  layout?: "horizontal" | "vertical";
  showCounts?: boolean;
}

const defaultCategories: Category[] = [
  { id: "all", name: "Tümü", count: 0 },
  { id: "turkrap", name: "Türk Rap", count: 0 },
  { id: "yabanci", name: "Yabancı Rap", count: 0 },
  { id: "haberler", name: "Haberler", count: 0 },
  { id: "klip", name: "Haftanın Klipleri", count: 0 },
  { id: "ayinKlipleri", name: "Ayın Klipleri", count: 0 },
  { id: "rapMix", name: "Rap Mix", count: 0 },
  { id: "spotify", name: "Spotify Hot", count: 0 },
];

export default function CategoryFilters({
  categories = defaultCategories,
  className = "",
  layout = "horizontal",
  showCounts = false,
}: CategoryFiltersProps) {
  const { filters, updateFilters } = useBlogFilters();

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "all") {
      // "Tümü" seçilirse category'yi temizle
      updateFilters({ category: undefined });
    } else {
      updateFilters({ category: categoryId });
    }
  };

  const isActive = (categoryId: string) => {
    if (categoryId === "all") {
      return !filters.category;
    }
    return filters.category === categoryId;
  };

  const layoutClasses = {
    horizontal: "flex flex-wrap gap-3",
    vertical: "flex flex-col space-y-2",
  };

  return (
    <div className={`${className}`}>
      <div className={layoutClasses[layout]}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`
              px-4 py-2 rounded-full font-saira-semibold text-sm
              transition-all duration-300 ease-in-out
              hover:scale-105 hover:shadow-lg
              ${
                isActive(category.id)
                  ? "bg-[#F0E74D] text-black shadow-lg shadow-[#F0E74D]/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600 hover:border-gray-500"
              }
            `}
            aria-pressed={isActive(category.id)}
            aria-label={`Filter by ${category.name}`}
          >
            <span>{category.name}</span>
            {showCounts && category.count !== undefined && (
              <span
                className={`
                  ml-2 px-2 py-0.5 rounded-full text-xs
                  ${
                    isActive(category.id)
                      ? "bg-black bg-opacity-20 text-black"
                      : "bg-gray-700 text-gray-400"
                  }
                `}
              >
                {category.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Active Filter Indicator */}
      {filters.category && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-gray-400 text-sm font-saira-normal">
            Aktif filtre:
          </span>
          <span className="px-3 py-1 bg-[#F0E74D] bg-opacity-20 text-[#F0E74D] rounded-full text-sm font-saira-semibold">
            {categories.find((cat) => cat.id === filters.category)?.name ||
              filters.category}
          </span>
          <button
            onClick={() => updateFilters({ category: undefined })}
            className="text-gray-400 hover:text-white transition-colors duration-200 ml-1"
            aria-label="Clear category filter"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}





