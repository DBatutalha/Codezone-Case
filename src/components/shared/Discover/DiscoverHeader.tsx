"use client";
import Image from "next/image";
import React, { useState } from "react";
import Title from "../Title";
import CategoryFilters from "@/components/ui/CategoryFilters";
import SearchInput from "@/components/ui/SearchInput";
import { BlogSortDropdown } from "@/components/ui/SortDropdown";
import Categories from "@/components/features/main/Discover/Sidebar/Categories";

export default function DiscoverHeader({
  setView,
}: {
  setView?: (view: "row" | "grid") => void;
}) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        {/* Desktop Layout */}
        <div className="hidden min-[429px]:flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 w-full">
          <Title title="KEŞFET" icon="/vectors/Discover/compass.svg" />

          <div className="flex flex-row items-center gap-x-4">
            {/* Sort Dropdown */}
            <div className="hidden sm:block">
              <BlogSortDropdown />
            </div>

            {/* Desktop Search */}
            <div className="hidden md:block">
              <SearchInput
                placeholder="İçerik ara..."
                size="small"
                className="w-64"
              />
            </div>

            {/* View Toggle Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setView && setView("row")}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                aria-label="Liste görünümü"
              >
                <Image
                  src="/vectors/Discover/burger.svg"
                  alt="list view"
                  width={23}
                  height={23}
                />
              </button>
              <button
                onClick={() => setView && setView("grid")}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                aria-label="Kart görünümü"
              >
                <Image
                  src="/vectors/Discover/card.svg"
                  alt="grid view"
                  width={23}
                  height={23}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="hidden max-[428px]:flex justify-between items-start w-full">
          <Title title="KEŞFET" icon="/vectors/Discover/compass.svg" />

          <div className="flex items-center gap-1">
            {/* Mobile Search Toggle */}
            <button onClick={() => setShowMobileSearch(!showMobileSearch)}>
              <Image
                src="/vectors/Discover/search.svg"
                alt="search"
                width={23}
                height={23}
              />
            </button>

            {/* View Toggle Buttons */}
            <button
              onClick={() => setView && setView("row")}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              aria-label="Liste görünümü"
            >
              <Image
                src="/vectors/Discover/burger.svg"
                alt="list view"
                width={23}
                height={23}
              />
            </button>
            <button
              onClick={() => setView && setView("grid")}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              aria-label="Kart görünümü"
            >
              <Image
                src="/vectors/Discover/card.svg"
                alt="grid view"
                width={23}
                height={23}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Categories - Only visible on mobile, below KEŞFET */}
      <div className="hidden max-[428px]:block">
        <Categories />
      </div>

      {/* Mobile Search & Sort */}
      {showMobileSearch && (
        <div className="md:hidden space-y-3">
          <SearchInput
            placeholder="İçerik ara..."
            size="medium"
            className="w-full"
            autoFocus
          />
        </div>
      )}

      {/* Mobile Sort Dropdown */}
      <div className="sm:hidden">
        <BlogSortDropdown className="w-full" />
      </div>

      {/* Category Filters */}
      {/* <CategoryFilters
        className="mt-6"
        layout="horizontal"
        showCounts={false}
      /> */}
    </div>
  );
}
