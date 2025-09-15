"use client";
import React from "react";
import { useBlogFilters } from "@/hooks/useURLState";
import DiscoverCategoryRow from "@/components/shared/Discover/DiscoverCategoryRow";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const categories = [
  { id: "turkrap", name: "Türk Rap" },
  { id: "yabanci", name: "Yabancı Rap" },
  { id: "haberler", name: "Rap Haberleri" },
  { id: "haftaninKlipleri", name: "Haftanın Klipleri" },
  { id: "ayinKlipleri", name: "Ayın Klipleri" },
  { id: "rapSohbetleri", name: "Rap Sohbetleri" },
  { id: "rapMusabakalari", name: "Rap Müsabakaları" },
];

export default function Categories() {
  const { filters, updateFilters } = useBlogFilters();

  const handleCategoryClick = (categoryId: string) => {
    if (filters.category === categoryId) {
      // Aynı kategoriye tıklanırsa filtreyi temizle
      updateFilters({ category: undefined });
    } else {
      updateFilters({ category: categoryId });
    }
  };

  const isActive = (categoryId: string) => {
    return filters.category === categoryId;
  };

  return (
    <>
      <h2 className="text-white text-3xl font-saira-bold uppercase tracking-wide relative mb-8">
        Ne Görmek İstersin?
      </h2>

      {/* Desktop Layout - Grid */}
      <div className="hidden min-[429px]:block">
        <div className="flex flex-row gap-2 mb-4 w-full text-xs">
          <DiscoverCategoryRow
            title="Türk Rap"
            isSelected={isActive("turkrap")}
            onClick={() => handleCategoryClick("turkrap")}
          />
          <DiscoverCategoryRow
            title="Yabancı Rap"
            isSelected={isActive("yabanci")}
            onClick={() => handleCategoryClick("yabanci")}
          />
          <DiscoverCategoryRow
            title="Rap Haberleri"
            isSelected={isActive("haberler")}
            onClick={() => handleCategoryClick("haberler")}
          />
        </div>
        <div className="flex flex-row gap-2 mb-4 w-full text-xs">
          <DiscoverCategoryRow
            title="Haftanın Klipleri"
            isSelected={isActive("haftaninKlipleri")}
            onClick={() => handleCategoryClick("haftaninKlipleri")}
          />
          <DiscoverCategoryRow
            title="Ayın Klipleri"
            isSelected={isActive("ayinKlipleri")}
            onClick={() => handleCategoryClick("ayinKlipleri")}
          />
        </div>
        <div className="flex flex-row gap-2 w-full text-xs">
          <DiscoverCategoryRow
            title="Rap Sohbetleri"
            isSelected={isActive("rapSohbetleri")}
            onClick={() => handleCategoryClick("rapSohbetleri")}
          />
          <DiscoverCategoryRow
            title="Rap Müsabakaları"
            isSelected={isActive("rapMusabakalari")}
            onClick={() => handleCategoryClick("rapMusabakalari")}
          />
        </div>
      </div>

      {/* Mobile Layout - Swiper */}
      <div className="block max-[428px]:block min-[429px]:hidden">
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={5}
          spaceBetween={80}
          grabCursor={true}
          className="w-full"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <DiscoverCategoryRow
                title={category.name}
                isSelected={isActive(category.id)}
                onClick={() => handleCategoryClick(category.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
