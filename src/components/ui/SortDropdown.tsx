"use client";

import React, { useState, useRef, useEffect } from "react";
import { useBlogFilters } from "@/hooks/useURLState";
import { SortOption } from "@/lib/api";

interface SortDropdownProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

const sortOptions: { value: SortOption; label: string; icon: string }[] = [
  { value: "latest", label: "En Yeni", icon: "📅" },
  { value: "popular", label: "Popüler", icon: "🔥" },
  { value: "oldest", label: "En Eski", icon: "⏰" },
];

export default function SortDropdown({
  className = "",
  size = "medium",
}: SortDropdownProps) {
  const { filters, updateFilters } = useBlogFilters();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentSort = filters.sort || "latest";
  const currentOption =
    sortOptions.find((option) => option.value === currentSort) ||
    sortOptions[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortChange = (sortValue: SortOption) => {
    // console.log("SortDropdown: Changing sort to:", sortValue); // Debug removed
    updateFilters({ sort: sortValue });
    setIsOpen(false);
  };

  const sizeClasses = {
    small: "h-8 text-sm px-3",
    medium: "h-10 text-base px-4",
    large: "h-12 text-lg px-6",
  };

  const iconSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-full
          bg-gray-800 border border-gray-700 rounded-lg
          text-white font-saira-semibold
          transition-all duration-200 ease-in-out
          hover:border-gray-600 hover:bg-gray-750
          focus:outline-none focus:border-[#F0E74D] focus:shadow-lg focus:shadow-[#F0E74D]/20
          ${isOpen ? "border-[#F0E74D] shadow-lg shadow-[#F0E74D]/20" : ""}
          ${sizeClasses[size]}
        `}
        aria-label="Sıralama seçenekleri"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <span className={iconSizes[size]}>{currentOption.icon}</span>
          <span>{currentOption.label}</span>
        </div>

        {/* Arrow Icon */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`
                w-full flex items-center gap-3 px-4 py-3
                text-left font-saira-normal
                transition-all duration-200
                hover:bg-gray-700 hover:text-[#F0E74D]
                ${
                  currentSort === option.value
                    ? "bg-[#F0E74D] bg-opacity-10 text-[#F0E74D] border-r-2 border-[#F0E74D]"
                    : "text-white"
                }
              `}
              aria-label={`${option.label} sıralamasını seç`}
            >
              <span className={iconSizes[size]}>{option.icon}</span>
              <div className="flex-1">
                <div className="font-saira-semibold">{option.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {option.value === "latest" && "Yeni yayınlananlar önce"}
                  {option.value === "popular" && "Trend olan içerikler önce"}
                  {option.value === "oldest" && "Eski yayınlananlar önce"}
                </div>
              </div>
              {currentSort === option.value && (
                <svg
                  className="w-4 h-4 text-[#F0E74D]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Active Sort Indicator */}
      {currentSort !== "latest" && (
        <div className="absolute -top-2 -right-2 bg-[#F0E74D] text-black text-xs px-2 py-0.5 rounded-full font-saira-bold">
          {currentOption.icon}
        </div>
      )}
    </div>
  );
}

// Specialized sort dropdown for different contexts
export function BlogSortDropdown({ className = "" }) {
  return (
    <SortDropdown className={`min-w-[140px] ${className}`} size="medium" />
  );
}

export function CompactSortDropdown({ className = "" }) {
  return <SortDropdown className={`min-w-[120px] ${className}`} size="small" />;
}
