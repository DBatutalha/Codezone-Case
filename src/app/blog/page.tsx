import Blog from "@/components/features/blog/Blog";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div className="pt-20">
      <Suspense fallback={<LoadingSpinner />}>
        <Blog />
      </Suspense>
    </div>
  );
}
