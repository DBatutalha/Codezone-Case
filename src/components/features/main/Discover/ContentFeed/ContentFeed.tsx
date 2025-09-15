"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import DiscoverCardRow from "./DiscoverCardRow";
import DiscoverCardGrid from "./DiscoverCardGrid";
import DiscoverHeader from "@/components/shared/Discover/DiscoverHeader";
import { usePaginatedDiscoverCards } from "@/hooks/usePostsMock";
import { postsToDiscoverCards } from "@/lib/api";
import { useBlogFilters } from "@/hooks/useURLState";

export default function ContentFeed() {
  const [view, setView] = useState<"row" | "grid">("row");
  const [displayCount, setDisplayCount] = useState(6);

  // Get URL parameters for sorting
  const { filters } = useBlogFilters();

  // Use paginated posts with filters (same as blog page)
  const { data, isLoading, error } = usePaginatedDiscoverCards({
    page: 1,
    limit: 50,
    category: filters.category,
    sort: filters.sort || "latest",
    search: filters.search,
  });

  const cards = useMemo(() => {
    if (!data?.cards) return [];
    return data.cards;
  }, [data?.cards]);

  const displayedCards = useMemo(() => {
    return cards.slice(0, displayCount);
  }, [cards, displayCount]);

  const hasMore = displayCount < cards.length;

  const handleMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <p className="text-red-500 font-saira-semibold mb-2">
            Veriler yüklenirken bir hata oluştu
          </p>
          <p className="text-gray-400 text-sm">
            Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DiscoverHeader setView={setView} />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="inline-block w-8 h-8 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
          <span className="ml-2 text-white">Yükleniyor...</span>
        </div>
      ) : (
        <>
          {/* Search Results Info */}
          {filters.search && (
            <div className="mb-6 mt-8">
              <p className="text-[#F0E74D] text-sm font-saira-semibold">
                "{filters.search}" için arama sonuçları ({cards.length} sonuç
                bulundu)
              </p>
            </div>
          )}

          <div
            className={` gap-6 mt-12 ${
              view === "row"
                ? "flex flex-col"
                : "grid grid-cols-2 max-[428px]:grid-cols-1"
            }`}
          >
            {displayedCards.length > 0 ? (
              displayedCards.map((card, idx) =>
                view === "row" ? (
                  <DiscoverCardRow
                    key={`${card.slug || `card-${idx}`}-${idx}`}
                    card={card}
                  />
                ) : (
                  <DiscoverCardGrid
                    key={`${card.slug || `card-${idx}`}-${idx}`}
                    card={card}
                  />
                )
              )
            ) : (
              <div className="col-span-2 text-center text-gray-400 py-8">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-white font-saira-semibold text-lg mb-2">
                  {filters.search
                    ? "Arama sonucu bulunamadı"
                    : "İçerik bulunamadı"}
                </h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  {filters.search
                    ? `"${filters.search}" araması için sonuç bulunamadı. Farklı anahtar kelimeler deneyin.`
                    : filters.category
                    ? "Seçilen kategoride içerik bulunamadı. Farklı bir kategori deneyin."
                    : "Henüz içerik bulunamadı."}
                </p>
              </div>
            )}
          </div>

          {hasMore && displayedCards.length > 0 && (
            <div className="mt-16 z-10 flex justify-center">
              <button
                className="bg-white text-black font-saira-bold text-lg px-10 py-3 shadow-xl button-custom-shape flex items-center justify-center gap-2 relative min-w-[140px] max-[428px]:min-w-[100px] max-[428px]:px-4 max-[428px]:py-2 max-[428px]:text-sm hover:bg-gray-100 transition-colors duration-300"
                onClick={handleMore}
              >
                Daha Fazla Gör
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
