"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

interface SlideData {
  id: number;
  backgroundImage: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

interface FullScreenSwiperProps {
  slides: SlideData[];
  autoplay?: boolean;
  autoplayDelay?: number;
}

export default function FullScreenSwiper({
  slides,
  autoplay = true,
  autoplayDelay = 5000,
}: FullScreenSwiperProps) {
  const swiperRef = useRef<{ swiper: SwiperType }>(null);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="relative w-full h-screen">
      <Swiper
        ref={swiperRef}
        modules={[EffectFade, Navigation, Autoplay]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop={true}
        autoplay={
          autoplay
            ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
              }
            : false
        }
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Image */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-left"
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
                backgroundPosition: "left center",
                backgroundSize: "cover",
              }}
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-end pr-20">
              <div className="text-right max-w-md">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-saira-bold">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-8 font-saira">
                  {slide.subtitle}
                </p>
                <button className="bg-white text-black px-8 py-3 rounded-none font-saira-bold hover:bg-gray-100 transition-colors duration-300">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <span className="text-2xl font-bold">&lt;</span>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <span className="text-2xl font-bold">&gt;</span>
      </button>
    </div>
  );
}
