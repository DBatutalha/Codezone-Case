"use client";

import React, { useState, useEffect, useRef } from "react";
import { useBlogFilters } from "@/hooks/useURLState";
import { useRouter } from "next/navigation";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  size?: "small" | "medium" | "large";
  showIcon?: boolean;
  autoFocus?: boolean;
  onSearch?: (query: string) => void;
}

export default function SearchInput({
  placeholder = "Ara...",
  className = "",
  size = "medium",
  showIcon = true,
  autoFocus = false,
  onSearch,
}: SearchInputProps) {
  const { filters, updateFilters } = useBlogFilters();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [isFocused, setIsFocused] = useState(false);

  // URL'den gelen search parametresini input'a yansıt
  useEffect(() => {
    if (filters.search !== searchQuery) {
      setSearchQuery(filters.search || "");
    }
  }, [filters.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      // Hangi sayfada olursa olsun, o sayfada arama yap
      updateFilters({ search: searchQuery.trim() });
      onSearch?.(searchQuery.trim());
    } else {
      // Boş arama - search parametresini temizle
      updateFilters({ search: undefined });
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    updateFilters({ search: undefined });
    onSearch?.("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClear();
      inputRef.current?.blur();
    }
  };

  const sizeClasses = {
    small: "h-8 text-sm px-3",
    medium: "h-10 text-base px-4",
    large: "h-12 text-lg px-6",
  };

  const iconSizes = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-6 h-6",
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div
        className={`
        relative flex items-center
        bg-gray-800 border border-gray-700 rounded-lg
        transition-all duration-200 ease-in-out
        ${
          isFocused
            ? "border-[#F0E74D] shadow-lg shadow-[#F0E74D]/20"
            : "hover:border-gray-600"
        }
        ${sizeClasses[size]}
      `}
      >
        {/* Search Icon */}
        {showIcon && (
          <div className={`text-gray-400 mr-3 ${iconSizes[size]}`}>
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-full h-full"
            >
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </div>
        )}

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none font-saira-normal"
          aria-label="Search"
        />

        {/* Clear Button */}
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className={`text-gray-400 hover:text-white transition-colors duration-200 ml-2 ${iconSizes[size]}`}
            aria-label="Clear search"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-full h-full"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}

        {/* Search Button */}
        <button
          type="submit"
          className={`
            bg-[#F0E74D] text-black rounded-md ml-2 px-3
            hover:bg-[#E6D843] transition-colors duration-200
            font-saira-semibold
            ${iconSizes[size]}
          `}
          aria-label="Search"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-full h-full"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button>
      </div>

      {/* Search Suggestions (isteğe bağlı) */}
      {isFocused && searchQuery.length > 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
          <div className="p-4">
            <div className="text-gray-400 text-sm font-saira-normal mb-2">
              Önerilen aramalar:
            </div>
            <div className="space-y-2">
              {["Türk Rap", "Drill", "Trap", "Freestyle"]
                .filter((tag) =>
                  tag.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      updateFilters({ search: suggestion });
                      inputRef.current?.blur();
                    }}
                    className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded transition-colors duration-200 font-saira-normal"
                  >
                    {suggestion}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
