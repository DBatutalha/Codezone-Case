import DiscoverCardGrid from "@/components/features/main/Discover/ContentFeed/DiscoverCardGrid";
import DiscoverCardRow from "@/components/features/main/Discover/ContentFeed/DiscoverCardRow";
import Pagination from "@/components/ui/Pagination";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { useBlogFilters } from "@/hooks/useURLState";
import { usePaginatedDiscoverCards } from "@/hooks/usePostsMock";
import React from "react";

export default function DiscoverBody({ view }: { view: "row" | "grid" }) {
  const { filters } = useBlogFilters();

  // console.log("DiscoverBody filters:", filters); // Debug removed

  const { data, isLoading, error } = usePaginatedDiscoverCards({
    page: filters.page || 1,
    limit: 12,
    category: filters.category,
    tag: filters.tag,
    sort: filters.sort,
    search: filters.search,
  });

  if (isLoading) {
    return (
      <div className="relative mt-12">
        {view === "row" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingSkeleton key={i} variant="card" className="h-64" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <LoadingSkeleton key={i} variant="card" className="h-64" />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12 mt-12">
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

  const cards = data?.cards || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.page || 1;

  return (
    <div className="relative">
      {/* Results Info */}
      {data && (
        <div className="flex items-center justify-between mb-6 mt-8">
          <p className="text-gray-400 text-sm font-saira-normal">
            {data.total} sonuçtan {(currentPage - 1) * 12 + 1}-
            {Math.min(currentPage * 12, data.total)} arası gösteriliyor
          </p>
          {filters.search && (
            <p className="text-[#F0E74D] text-sm font-saira-semibold">
              "{filters.search}" için arama sonuçları
            </p>
          )}
        </div>
      )}

      {/* Content Grid */}
      {cards.length > 0 ? (
        <>
          {view === "row" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {cards.map((card, index) => (
                <DiscoverCardRow
                  key={`discover-row-${card.slug || index}`}
                  card={card}
                />
              ))}
            </div>
          )}
          {view === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
              {cards.map((card, index) => (
                <DiscoverCardGrid
                  key={`discover-grid-${card.slug || index}`}
                  card={card}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                showInfo={true}
                className="py-8"
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center py-12 mt-12">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-white font-saira-semibold text-lg mb-2">
              Sonuç bulunamadı
            </h3>
            <p className="text-gray-400 text-sm max-w-md">
              {filters.search
                ? `"${filters.search}" araması için sonuç bulunamadı. Farklı anahtar kelimeler deneyin.`
                : "Seçilen filtrelere uygun içerik bulunamadı. Filtreleri değiştirerek tekrar deneyin."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
