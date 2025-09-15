"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/shared/Section";
import Container from "@/components/shared/Container";
import Title from "@/components/shared/Title";
import TrendRow from "./TrendRow";
import { useTrendingDiscoverCards } from "@/hooks/usePosts";

export default function TrendingNews() {
  const { data, isLoading, error } = useTrendingDiscoverCards();

  if (error) {
    return (
      <Section className="h-auto relative">
        <Container size="main" className="flex flex-col h-full">
          <Title title="Trendler" icon="/vectors/Trends/right-up-icon.svg" />
          <div className="flex items-center justify-center py-8">
            <p className="text-red-500">
              Trend verileri yüklenirken bir hata oluştu.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      {/* Desktop Layout */}
      <Section className="h-auto relative hidden min-[429px]:block">
        <Container size="main" className="flex flex-col h-full">
          <Title title="Trendler" icon="/vectors/Trends/right-up-icon.svg" />
          <div className="flex-1 flex flex-col justify-between">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="inline-block w-8 h-8 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
                <span className="ml-2 text-white">Yükleniyor...</span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 grid-rows-2 gap-x-12 gap-y-8 mt-12 mb-8">
                  {data?.cards && data.cards.length > 0 ? (
                    data.cards.slice(0, 6).map((card, index) => (
                      <TrendRow
                        key={card.slug || `trend-${index}`}
                        trend={{
                          number: String(index + 1).padStart(2, "0"),
                          name: card.name,
                          avatar: card.avatar,
                          title: card.title.toUpperCase(),
                          link: "Daha Fazla Oku",
                        }}
                      />
                    ))
                  ) : (
                    <div className="col-span-3 text-center text-gray-400">
                      Henüz trend veri bulunamadı.
                    </div>
                  )}
                </div>
                <div className="flex justify-center pb-8">
                  <Link href="/blog">
                    <button className="bg-white text-black font-saira-bold text-lg px-10 py-3 shadow-xl button-custom-shape hover:bg-gray-100 transition-colors duration-300">
                      Tümünü Gör
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </Container>
      </Section>

      {/* Mobile Layout */}
      <div className="hidden max-[428px]:block bg-black text-white px-4 py-6 max-w-[428px] mx-auto">
        {/* Mobile Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <h2
            className="font-bold"
            style={{
              fontFamily: "Saira Condensed, sans-serif",
              fontWeight: 700,
              fontSize: "40px",
              lineHeight: "104%",
              letterSpacing: "0%",
            }}
          >
            TRENDLER
          </h2>
          <Image
            src="/vectors/Trends/right-up-icon.svg"
            alt="Trending"
            width={82}
            height={24}
            className="w-12 h-12"
          />
        </div>

        {/* Mobile Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="inline-block w-6 h-6 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
            <span className="ml-2 text-white text-sm">Yükleniyor...</span>
          </div>
        ) : (
          <>
            {/* Mobile News Cards */}
            <div className="space-y-6">
              {data?.cards && data.cards.length > 0 ? (
                data.cards.slice(0, 4).map((card, index) => (
                  <div
                    key={card.slug || `mobile-trend-${index}`}
                    className="flex items-start gap-3 mb-6 border-b border-neutral-800 pb-4"
                  >
                    {/* Ranking Number */}
                    <span className="text-neutral-600 font-bold text-xl flex-shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Content */}
                    <div className="flex-1">
                      {/* Author Info */}
                      <div className="flex items-center gap-2 mb-2">
                        <Image
                          src={card.avatar || "/Images/Trends/avatar1.png"}
                          alt={card.name}
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-lg object-cover"
                        />
                        <span className="text-xs text-neutral-300">
                          {card.name}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-bold leading-snug mb-2 line-clamp-2">
                        {card.title.toUpperCase()}
                      </h3>

                      {/* Read More Link */}
                      <Link
                        href="/blog"
                        className="text-xs text-neutral-400 hover:text-[#F0E74D] underline mt-1 block transition-colors duration-300"
                      >
                        Daha Fazla Oku
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 text-sm">
                  Henüz trend veri bulunamadı.
                </div>
              )}
            </div>

            {/* Mobile View All Button */}
            <div className="flex justify-center mt-6">
              <Link href="/blog">
                <button className="bg-white text-black px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition-colors duration-300">
                  Tümünü Gör
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
