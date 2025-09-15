"use client";

import React from "react";
import { useURLState, useBlogFilters } from "@/hooks/useURLState";

/**
 * Demo component to test URL state management
 * This component will be removed after testing
 */
export default function URLStateDemo() {
  const { getParam, updateURL, clearParams } = useURLState();
  const { filters, updateFilters, clearFilters } = useBlogFilters();

  return (
    <div className="p-6 bg-gray-800 rounded-lg m-4">
      <h3 className="text-white text-lg font-bold mb-4">URL State Demo</h3>

      {/* Current Parameters */}
      <div className="mb-4">
        <h4 className="text-white font-semibold mb-2">
          Current URL Parameters:
        </h4>
        <div className="text-sm text-gray-300">
          <p>Category: {getParam("cat") || "None"}</p>
          <p>Search: {getParam("q") || "None"}</p>
          <p>Sort: {getParam("sort") || "latest"}</p>
          <p>View: {getParam("view") || "grid"}</p>
          <p>Page: {getParam("page") || "1"}</p>
        </div>
      </div>

      {/* Blog Filters */}
      <div className="mb-4">
        <h4 className="text-white font-semibold mb-2">Blog Filters:</h4>
        <div className="text-sm text-gray-300">
          <p>Category: {filters.category || "None"}</p>
          <p>Search: {filters.search || "None"}</p>
          <p>Sort: {filters.sort}</p>
          <p>View: {filters.view}</p>
          <p>Page: {filters.page}</p>
        </div>
      </div>

      {/* Test Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() =>
            updateURL({ cat: "turkrap", q: "test" }, { resetPage: true })
          }
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
        >
          Set Category + Search
        </button>

        <button
          onClick={() => updateFilters({ sort: "popular", view: "list" })}
          className="px-3 py-1 bg-green-600 text-white rounded text-sm"
        >
          Change Sort + View
        </button>

        <button
          onClick={() => updateFilters({ page: 2 })}
          className="px-3 py-1 bg-yellow-600 text-white rounded text-sm"
        >
          Go to Page 2
        </button>

        <button
          onClick={clearParams}
          className="px-3 py-1 bg-red-600 text-white rounded text-sm"
        >
          Clear All
        </button>

        <button
          onClick={clearFilters}
          className="px-3 py-1 bg-purple-600 text-white rounded text-sm"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

