"use client";
import React, { useState } from "react";
import Image from "next/image";
import MusicPlatformsBanner from "./MusicBanner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import FavoriteSwiperItem from "./FavoriteSwiperItem";
import { favSlides } from "@/data/constants";
import Section from "@/components/shared/Section";
import Container from "@/components/shared/Container";
import Title from "@/components/shared/Title";

export default function MonthlyFavorites() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const totalSlides = favSlides.length;

  return (
    <>
      {/* Desktop Layout */}
      <Section className="h-auto relative hidden min-[429px]:block">
        <MusicPlatformsBanner />
        <Container size="main" className="grid grid-cols-7 justify-between">
          <Title
            title="AYIN"
            subtitle="FAVORİLERİ"
            icon=""
            className="col-span-3 mt-12"
          />
          <div className="flex flex-col w-full col-span-4">
            <Swiper
              spaceBetween={30}
              slidesPerView={3}
              centeredSlides={false}
              allowTouchMove={true}
              freeMode={false}
              className="w-full"
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              onProgress={(swiper, progress) => setProgress(progress)}
            >
              {favSlides.map((slide, idx) => (
                <SwiperSlide
                  key={idx}
                  style={{
                    minWidth: "300px",
                  }}
                >
                  <FavoriteSwiperItem slide={slide} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="relative w-full h-2 mt-8 ">
              <div className="absolute left-0 top-0 w-full h-full bg-[#2A2A2A] rounded-full opacity-30" />
              <div
                className="absolute left-0 top-0 h-full bg-[#F0E74D] rounded-full transition-all duration-300"
                style={{
                  width: `${progress * 100}%`,
                }}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Mobile Layout */}
      <div className="hidden max-[428px]:block bg-black text-white px-4 py-6">
        {/* Mobile Music Banner */}
        <div className="mb-6">
          <MusicPlatformsBanner />
        </div>

        {/* Mobile Title */}
        <div className="mb-8 text-center">
          <h2
            className="font-bold text-white"
            style={{
              fontFamily: "Saira Condensed, sans-serif",
              fontWeight: 700,
              fontSize: "40px",
              lineHeight: "104%",
              letterSpacing: "0%",
              textAlign: "center",
            }}
          >
            AYIN
          </h2>
          <h2
            className="font-bold text-white"
            style={{
              fontFamily: "Saira Condensed, sans-serif",
              fontWeight: 700,
              fontSize: "40px",
              lineHeight: "104%",
              letterSpacing: "0%",
              textAlign: "center",
            }}
          >
            FAVORİLERİ
          </h2>
        </div>

        {/* Mobile Swiper */}
        <div className="relative">
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            centeredSlides={false}
            allowTouchMove={true}
            freeMode={false}
            className="w-[90%]"
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            onProgress={(swiper, progress) => setProgress(progress)}
          >
            {favSlides.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-gray-800 rounded-lg p-4 relative overflow-hidden">
                  {/* Album Image */}
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={slide.img || "/Images/Favorites/cover1.png"}
                      fill
                      sizes="(max-width: 428px) 100vw, 300px"
                      alt="Album Cover"
                      className="object-cover"
                    />
                  </div>

                  {/* Rank Badge */}
                  <div className="absolute top-6 right-6 bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {slide.rank}
                  </div>

                  {/* Title and Subtitle */}
                  <div className="text-center">
                    <h3 className="text-white text-lg font-normal mb-1">
                      {slide.title}
                    </h3>
                    <h4 className="text-white text-lg font-bold uppercase">
                      {slide.subtitle}
                    </h4>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile Progress Bar */}
          <div className="relative w-full h-2 mt-6">
            <div className="absolute left-0 top-0 w-full h-full bg-[#2A2A2A] rounded-full opacity-30" />
            <div
              className="absolute left-0 top-0 h-full bg-[#F0E74D] rounded-full transition-all duration-300"
              style={{
                width: `${progress * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
