"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import WaveEffect from "@/components/shared/WaveEffect";
import BgEffect from "./BgEffect";

import Section from "@/components/shared/Section";
import Container from "@/components/shared/Container";
import Title from "@/components/shared/Title";
import BlogCard from "./BlogCard";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { blogCards, heroSlides } from "@/data/constants";
import Image from "next/image";

export default function Hero() {
  return (
    <Section className="h-full bg-[#F0E74D] relative mt-20 pb-32! overflow-hidden max-[428px]:mt-0">
      <BgEffect />

      <Container className="overflow-hidden">
        {/* Desktop Breadcrumb - Hidden on mobile */}
        <ul className="flex flex-row gap-x-4 text-[0.97vw] hidden min-[429px]:flex">
          <li className="text-[#121212] after:content-['>'] after:ml-4 after:text-[#121212] after:inline-block cursor-pointer">
            ANA SAYFA
          </li>
          <li className="text-[#121212] after:content-['>'] after:ml-4 after:text-[#121212] after:inline-block cursor-pointer">
            BLOG
          </li>
          <li className="text-[#121212] ">LOREM IPSUM DOLOR</li>
        </ul>

        {/* Desktop Title - Hidden on mobile */}
        <Title
          titleClassName="text-black"
          title="Blog"
          icon="false"
          className="hidden min-[429px]:block"
        />

        {/* Desktop Layout */}
        <div className="grid grid-cols-5 gap-4 mt-4 hidden min-[429px]:grid">
          <div className="relative col-span-3">
            <div className="relative w-full overflow-hidden">
              <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                effect="coverflow"
                grabCursor={true}
                slidesPerView="auto"
                loop={true}
                className="w-full h-full"
              >
                {heroSlides.map((slide) => (
                  <SwiperSlide key={slide.id} className="w-full h-full">
                    <div className="relative w-full h-full">
                      <div
                        className="relative w-full"
                        style={{
                          aspectRatio: "73/40",
                          maxWidth: "100%",
                          height: "auto",
                        }}
                      >
                        <VideoPlayer
                          key={`desktop-${slide.id}`}
                          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                          poster={slide.image}
                          title={slide.title}
                          className="w-full h-full rounded-lg"
                          autoPlay={false}
                          muted={true}
                          showControls={true}
                          onPlay={() => console.log("Hero video play clicked")}
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-black text-lg font-saira-bold">
                        LOREM IPSUM DOLOR SIT AMET CONSECTETUR ADIPISCING ELIT
                        UT ET MASSA MI. MAURIS NEC LEO NON LIBERO SODALES
                        LOBORTIS. QUISQUE A NEQUE PRETI ...
                      </p>
                      <div className="flex gap-2 mt-4"></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="w-full flex flex-col gap-8 col-span-2">
            {blogCards.map((card, index) => (
              <BlogCard key={index} card={card} />
            ))}
          </div>
        </div>

        {/* Mobile Layout - Single Column */}
        <div className="block max-[428px]:block min-[429px]:hidden px-4">
          {/* Mobile Carousel */}
          <div className="mb-4">
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              grabCursor={true}
              slidesPerView={1}
              loop={true}
              className="w-full"
            >
              {heroSlides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="relative w-full mb-4">
                    <div
                      className="relative w-full"
                      style={{
                        aspectRatio: "16/9",
                        height: "180px",
                      }}
                    >
                      <VideoPlayer
                        key={`mobile-${slide.id}`}
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        poster={slide.image}
                        title={slide.title}
                        className="w-full h-full rounded-lg"
                        autoPlay={false}
                        muted={true}
                        showControls={true}
                        onPlay={() =>
                          console.log("Hero mobile video play clicked")
                        }
                      />

                      {/* Mobile Title - Sol alt köşe */}
                      <div className="absolute bottom-2 left-2 z-5 pointer-events-none">
                        <h2 className="text-white text-lg font-saira-black uppercase mb-1 drop-shadow-lg">
                          LOREM FT - IPSUM
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Description */}
                  <div className="mb-3">
                    <p className="text-black text-xs font-saira-bold uppercase leading-relaxed">
                      LOREM IPSUM DOLOR SIT AMET CONSECTETUR ADIPISCING ELIT UT
                      ET MASSA MI.
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Mobile Blog Cards - Stacked Vertically */}
          <div className="space-y-3">
            {blogCards.map((card, index) => (
              <div
                key={index}
                className="flex gap-3 bg-white/10 rounded-lg p-3"
              >
                {/* Image Thumbnail - 35% width */}
                <div className="w-[35%] flex-shrink-0">
                  <img
                    className="w-full h-16 object-cover rounded"
                    src={card.image}
                    alt={`Blog card ${card.title}`}
                  />
                </div>

                {/* Content - 65% width */}
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <h3 className="text-black text-xs font-saira-black uppercase leading-tight mb-1 truncate">
                    {card.title}
                  </h3>
                  <p className="text-black text-[10px] font-saira-bold uppercase leading-relaxed line-clamp-2">
                    {card.description ||
                      "LOREM IPSUM DOLOR SIT AMET CONSECTETUR ADIPISCING ELIT UT ET MASSA MI."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <WaveEffect height={140} />
    </Section>
  );
}
