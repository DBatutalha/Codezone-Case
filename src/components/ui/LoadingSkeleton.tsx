import React from "react";

interface LoadingSkeletonProps {
  variant?: "card" | "text" | "circle" | "rectangle" | "list" | "blog-post";
  className?: string;
  count?: number;
  animate?: boolean;
}

export default function LoadingSkeleton({
  variant = "rectangle",
  className = "",
  count = 1,
  animate = true,
}: LoadingSkeletonProps) {
  const baseClasses = `bg-gray-700 ${animate ? "animate-pulse" : ""}`;

  const variants = {
    card: (
      <div className={`${baseClasses} rounded-lg overflow-hidden ${className}`}>
        <div className="h-48 bg-gray-600"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-600 rounded w-3/4"></div>
          <div className="h-3 bg-gray-600 rounded w-1/2"></div>
          <div className="h-3 bg-gray-600 rounded w-2/3"></div>
        </div>
      </div>
    ),

    text: (
      <div className={`space-y-2 ${className}`}>
        <div className={`h-4 ${baseClasses} rounded w-3/4`}></div>
        <div className={`h-4 ${baseClasses} rounded w-1/2`}></div>
        <div className={`h-4 ${baseClasses} rounded w-5/6`}></div>
      </div>
    ),

    circle: <div className={`${baseClasses} rounded-full ${className}`}></div>,

    rectangle: <div className={`${baseClasses} rounded ${className}`}></div>,

    list: (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className={`w-12 h-12 ${baseClasses} rounded-full`}></div>
            <div className="flex-1 space-y-2">
              <div className={`h-4 ${baseClasses} rounded w-3/4`}></div>
              <div className={`h-3 ${baseClasses} rounded w-1/2`}></div>
            </div>
          </div>
        ))}
      </div>
    ),

    "blog-post": (
      <div className={`space-y-6 ${className}`}>
        {/* Header */}
        <div className="space-y-4">
          <div className={`h-8 ${baseClasses} rounded w-3/4`}></div>
          <div className={`h-4 ${baseClasses} rounded w-1/2`}></div>
        </div>

        {/* Featured Image */}
        <div className={`h-64 ${baseClasses} rounded-lg`}></div>

        {/* Content */}
        <div className="space-y-3">
          <div className={`h-4 ${baseClasses} rounded`}></div>
          <div className={`h-4 ${baseClasses} rounded w-5/6`}></div>
          <div className={`h-4 ${baseClasses} rounded w-4/6`}></div>
          <div className={`h-4 ${baseClasses} rounded w-3/4`}></div>
        </div>

        {/* Author */}
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 ${baseClasses} rounded-full`}></div>
          <div className="space-y-2">
            <div className={`h-3 ${baseClasses} rounded w-24`}></div>
            <div className={`h-2 ${baseClasses} rounded w-16`}></div>
          </div>
        </div>
      </div>
    ),
  };

  if (count > 1 && variant !== "list") {
    return (
      <div className="space-y-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i}>{variants[variant]}</div>
        ))}
      </div>
    );
  }

  return <>{variants[variant]}</>;
}

// Specialized skeleton components
export function BlogCardSkeleton({ count = 1, className = "" }) {
  return (
    <LoadingSkeleton
      variant="card"
      count={count}
      className={`w-full ${className}`}
    />
  );
}

export function BlogPostSkeleton({ className = "" }) {
  return (
    <LoadingSkeleton
      variant="blog-post"
      className={`max-w-4xl mx-auto ${className}`}
    />
  );
}

export function SidebarSkeleton({ className = "" }) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-32 mb-4"></div>
        <LoadingSkeleton variant="list" count={5} />
      </div>
    </div>
  );
}

export function TrendsSkeleton({ className = "" }) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse flex items-start space-x-4">
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}





