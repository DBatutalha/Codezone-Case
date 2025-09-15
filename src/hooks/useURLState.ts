"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

/**
 * URL state management hook for handling query parameters
 * Provides type-safe URL parameter management with browser history support
 */
export function useURLState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get current URL parameters as an object
  const params = useMemo(() => {
    const current: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      current[key] = value;
    });
    return current;
  }, [searchParams]);

  /**
   * Get a specific parameter value with optional default
   */
  const getParam = useCallback(
    (key: string, defaultValue = ""): string => {
      return searchParams.get(key) || defaultValue;
    },
    [searchParams]
  );

  /**
   * Get a parameter as number
   */
  const getParamAsNumber = useCallback(
    (key: string, defaultValue = 0): number => {
      const value = searchParams.get(key);
      const parsed = value ? parseInt(value, 10) : defaultValue;
      return isNaN(parsed) ? defaultValue : parsed;
    },
    [searchParams]
  );

  /**
   * Get a parameter as boolean
   */
  const getParamAsBoolean = useCallback(
    (key: string, defaultValue = false): boolean => {
      const value = searchParams.get(key);
      if (!value) return defaultValue;
      return value === "true" || value === "1";
    },
    [searchParams]
  );

  /**
   * Update URL parameters without page reload
   * @param updates - Object with key-value pairs to update
   * @param options - Additional options
   */
  const updateURL = useCallback(
    (
      updates: Record<string, string | number | boolean | null | undefined>,
      options: {
        scroll?: boolean;
        replace?: boolean;
        resetPage?: boolean; // Reset page to 1 when other filters change
      } = {}
    ) => {
      const { scroll = false, replace = false, resetPage = false } = options;

      // Create new URLSearchParams from current params
      const newParams = new URLSearchParams(searchParams);

      // Apply updates
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      // Reset page to 1 if resetPage is true and we're not updating page specifically
      if (resetPage && !updates.hasOwnProperty("page")) {
        newParams.delete("page");
      }

      // Build new URL
      const queryString = newParams.toString();
      const newURL = queryString ? `${pathname}?${queryString}` : pathname;

      // Navigate to new URL
      if (replace) {
        router.replace(newURL, { scroll });
      } else {
        router.push(newURL, { scroll });
      }
    },
    [searchParams, router, pathname]
  );

  /**
   * Clear all parameters
   */
  const clearParams = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  /**
   * Remove specific parameters
   */
  const removeParams = useCallback(
    (keys: string[]) => {
      const updates: Record<string, null> = {};
      keys.forEach((key) => {
        updates[key] = null;
      });
      updateURL(updates);
    },
    [updateURL]
  );

  /**
   * Check if a parameter exists
   */
  const hasParam = useCallback(
    (key: string): boolean => {
      return searchParams.has(key);
    },
    [searchParams]
  );

  /**
   * Get current URL with all parameters
   */
  const getCurrentURL = useCallback((): string => {
    const queryString = searchParams.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  }, [pathname, searchParams]);

  return {
    // Parameter getters
    params,
    getParam,
    getParamAsNumber,
    getParamAsBoolean,
    hasParam,

    // URL manipulation
    updateURL,
    clearParams,
    removeParams,
    getCurrentURL,

    // Raw access (for advanced use cases)
    searchParams,
    pathname,
  };
}

// Type definitions for common blog parameters
export interface BlogFilters {
  category?: string;
  tag?: string;
  search?: string;
  sort?: "latest" | "popular" | "oldest";
  view?: "grid" | "list";
  page?: number;
  limit?: number;
}

/**
 * Specialized hook for blog filtering
 */
export function useBlogFilters(): {
  filters: BlogFilters;
  updateFilters: (updates: Partial<BlogFilters>) => void;
  clearFilters: () => void;
  resetToDefaults: () => void;
} {
  const { getParam, getParamAsNumber, updateURL, clearParams } = useURLState();

  const filters: BlogFilters = useMemo(
    () => ({
      category: getParam("cat") || undefined,
      tag: getParam("tag") || undefined,
      search: getParam("q") || undefined,
      sort: (getParam("sort") as BlogFilters["sort"]) || "latest",
      view: (getParam("view") as BlogFilters["view"]) || "grid",
      page: getParamAsNumber("page", 1),
      limit: getParamAsNumber("limit", 12),
    }),
    [getParam, getParamAsNumber]
  );

  const updateFilters = useCallback(
    (updates: Partial<BlogFilters>) => {
      const urlUpdates: Record<string, string | number | null> = {};

      Object.entries(updates).forEach(([key, value]) => {
        if (key === "category") {
          urlUpdates.cat = value || null;
        } else if (key === "search") {
          urlUpdates.q = value || null;
        } else {
          urlUpdates[key] = value || null;
        }
      });

      updateURL(urlUpdates, {
        resetPage:
          !updates.hasOwnProperty("page") && Object.keys(updates).length > 0,
      });
    },
    [updateURL]
  );

  const clearFilters = useCallback(() => {
    clearParams();
  }, [clearParams]);

  const resetToDefaults = useCallback(() => {
    updateURL(
      {
        cat: null,
        tag: null,
        q: null,
        sort: "latest",
        view: "grid",
        page: null,
        limit: null,
      },
      { replace: true }
    );
  }, [updateURL]);

  return {
    filters,
    updateFilters,
    clearFilters,
    resetToDefaults,
  };
}

export default useURLState;
