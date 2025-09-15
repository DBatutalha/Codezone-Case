"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination, Parallax } from "swiper/modules";
import Section from "@/components/shared/Section";
import WaveEffect from "@/components/shared/WaveEffect";

interface Slide {
  id: number;
  backgroundImage: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

const slides = [
  {
    id: 1,
    backgroundImage: "/Images/HomeSinger.png",
    title: "TÜRKÇE RAP VE\nDÜNYA MÜZİK\nHABERLERİNİ TAKİP ET",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
    buttonText: "Devamını Oku",
    buttonLink: "/link",
  },
  {
    id: 2,
    backgroundImage: "/Images/HomeSinger2.png",
    title: "DÜNYA RAP\nTRENDLERİNİ\nKONUŞUYORUZ.",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
    buttonText: "Explore",
    buttonLink: "/explore",
  },
];

export default function HeroSection(): React.ReactElement {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Manual navigation handlers
  const goToPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const goToNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex);
  };

  return (
    <Section className="relative w-screen overflow-hidden h-[800px] max-[428px]:h-[800px] max-[428px]:mt-16">
      <button
        ref={prevRef}
        onClick={goToPrev}
        className="absolute left-[4.24vw] top-1/2 -translate-y-1/2 z-[60] w-[1.39vw] h-[1.39vw] mobile-swiper-nav max-[428px]:hidden"
        aria-label="Previous Slide"
      >
        <Image src="/vectors/left.svg" alt="Previous" width={24} height={24} />
      </button>

      <button
        ref={nextRef}
        onClick={goToNext}
        className="absolute right-[4.24vw] top-1/2 -translate-y-1/2 z-[60] w-[1.39vw] h-[1.39vw] mobile-swiper-nav max-[428px]:hidden"
        aria-label="Next Slide"
      >
        <Image src="/vectors/right.svg" alt="Next" width={24} height={24} />
      </button>

      {/* Desktop Swiper */}
      <div className="hidden min-[429px]:block w-full h-full relative z-20">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          modules={[Autoplay, Pagination, Parallax]}
          slidesPerView={1}
          loop={true}
          speed={900}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          allowTouchMove={true}
          threshold={5}
          longSwipesMs={300}
          longSwipesRatio={0.2}
          resistanceRatio={0.85}
          touchRatio={1}
          parallax={true}
          className="w-full h-full"
        >
          {slides.map((slide: Slide, idx: number) => (
            <SwiperSlide
              key={idx}
              className={idx === 1 ? "max-[428px]:hidden" : ""}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 w-full h-full overflow-hidden ">
                  {slide.id === 2 ? (
                    <Image
                      src={slide.backgroundImage}
                      alt="Hero Background"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain object-left transition-opacity duration-500 mobile-image-center max-[428px]:object-center max-[428px]:hidden"
                      style={{ objectPosition: "left center" }}
                      priority={idx === 0}
                    />
                  ) : (
                    <Image
                      src={slide.backgroundImage}
                      alt="Hero Background"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-left transition-opacity duration-500 mobile-image-center max-[428px]:object-center"
                      style={{ objectPosition: "-500px 25%" }}
                      priority={idx === 0}
                    />
                  )}
                </div>

                <div className="absolute top-0 left-[50vw] w-full h-full px-16 max-[428px]:left-0 max-[428px]:px-4 max-[428px]:z-30 max-[428px]:top-20 max-[428px]:h-[calc(100%-80px)]">
                  <div
                    className="w-[33vw] flex flex-col justify-center h-full text-left max-[428px]:w-full max-[428px]:items-center max-[428px]:text-center max-[428px]:justify-start max-[428px]:-mt-32 mobile-flex-col"
                    data-swiper-parallax="-50"
                  >
                    <h1
                      className={`text-[3vw] font-saira-bold mb-6 leading-16 whitespace-pre-line ml-[-50px] mobile-hero-title max-[428px]:ml-0 max-[428px]:text-xl max-[428px]:text-center ${
                        slide.id === 2 ? "text-[#121212]" : "text-white"
                      }`}
                    >
                      {slide.title}
                    </h1>
                    <p
                      className={`text-[1vw] mb-8 max-w-sm drop-shadow font-saira-normal ml-[-50px] mobile-hero-subtitle max-[428px]:ml-0 max-[428px]:text-xs max-[428px]:max-w-none max-[428px]:text-center ${
                        slide.id === 2 ? "text-[#121212]" : "text-gray-200"
                      }`}
                    >
                      {slide.subtitle}
                    </p>
                    <Link href="/blog">
                      <button className="w-fit bg-[#F0E74D] text-black font-saira-bold text-lg px-10 py-3 shadow-xl button-custom-shape ml-[-50px] mobile-hero-button max-[428px]:ml-0 max-[428px]:text-sm max-[428px]:px-6 max-[428px]:py-2 hover:bg-[#E6D444] transition-colors duration-300">
                        Devamını Oku
                      </button>
                    </Link>
                    <div className="mt-6 ml-[-50px] flex items-center gap-2 max-[428px]:ml-0 max-[428px]:hidden">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            if (swiperRef.current) {
                              swiperRef.current.slideTo(i);
                            }
                          }}
                          aria-label={`Go to slide ${i + 1}`}
                          className="relative flex items-center justify-center"
                        >
                          <span
                            className={`block rounded-full ${
                              i === currentSlide
                                ? "bg-[#F0E74D] w-2.5 h-2.5"
                                : "bg-[#1E1E1E] w-2 h-2"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile Static Content */}
      <div className="hidden max-[428px]:block w-full h-full relative z-20">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <Image
              src="/Images/HomeSinger.png"
              alt="Hero Background"
              fill
              sizes="100vw"
              className="object-cover object-center"
              style={{ objectPosition: "52% 25.3vw" }}
              priority={true}
            />
          </div>

          <div className="absolute top-0 left-0 w-full h-full px-4 z-30 top-35 h-[calc(100%-8px)] ">
            <div className="w-full flex flex-col justify-start items-center text-center -mt-28 ">
              <h1 className="text-lg font-saira-bold mb-3 leading-tight whitespace-pre-line text-white max-[428px]:max-w-[100%] max-[428px]:mx-auto">
                TÜRKÇE RAP VE{"\n"}DÜNYA MÜZİK{"\n"}HABERLERİNİ TAKİP ET
              </h1>

              <p className="text-xs mb-4 drop-shadow font-saira-normal text-gray-200 max-[428px]:text-sm max-[428px]:w-[70%]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud
              </p>
              <Link href="/blog">
                <button className="w-fit bg-[#F0E74D] text-black font-saira-bold text-xs px-5 py-2 shadow-xl button-custom-shape hover:bg-[#E6D444] transition-colors duration-300">
                  Devamını Oku
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <WaveEffect height={200} />
    </Section>
  );
}
