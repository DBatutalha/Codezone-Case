import ContentDiscovery from "@/components/features/main/Discover/ContentDiscovery";
import MonthlyFavorites from "@/components/features/main/Favorites/MonthlyFavorites";
import HeroSection from "@/components/features/main/HeroSection";
import TrendingNews from "@/components/features/main/Trends/TrendingNews";
import LiveStreamPromo from "@/components/features/main/LiveStreamPromo";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import React, { Suspense } from "react";

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      <div className="max-[428px]:flex max-[428px]:flex-col max-[428px]:space-y-2 mobile-flex-col">
        <LiveStreamPromo />
        <TrendingNews />
        <MonthlyFavorites />
        <Suspense fallback={<LoadingSpinner />}>
          <ContentDiscovery />
        </Suspense>
      </div>
    </div>
  );
}
