import React from "react";
import Link from "next/link";
import { DiscoverCard } from "@/types/Discover";
import Image from "next/image";

export default function DiscoverCardGrid({ card }: { card: DiscoverCard }) {
  return (
    <div className="flex flex-col gap-4 h-full w-full max-[428px]:gap-3">
      <Image
        src={card.image || "/Images/Discover/card-1.png"}
        alt="discover-card"
        width={500} // Varsayılan genişlik
        height={300} // Varsayılan yükseklik
        className="h-48 w-48 object-cover max-[428px]:h-48 max-[428px]:object-cover max-[428px]:w-auto"
        priority
        unoptimized={true}
      />
      <div className="text-[#3B3B3B] text-sm font-normal leading-tight max-[428px]:text-xs">
        {card.date}
      </div>
      <div className="flex flex-col gap-y-4 flex-1 max-[428px]:gap-y-3">
        <div className="flex flex-row gap-x-5 items-center max-[428px]:gap-x-3">
          <img
            src={card.avatar || "/Images/Trends/avatar1.png"}
            alt="discover-play"
            className="w-10 h-10 rounded-lg max-[428px]:w-8 max-[428px]:h-8"
          />
          <div className="flex flex-col gap-y-1">
            <h1 className="text-white text-[1.11vw] leading-tight font-saira-normal max-[428px]:text-sm">
              {card.name}
            </h1>
          </div>
        </div>
        <h2 className="text-white text-[1.15vw] leading-tight font-saira-bold max-[428px]:text-sm max-[428px]:line-clamp-3 flex-1">
          {card.title}
        </h2>
        <div className="w-full h-[1px] bg-[#3B3B3B]" />
        <Link href={card.slug ? `/blog/${card.slug}` : "/blog"}>
          <div className="group cursor-pointer text-white text-[1.20vw] font-saira-normal leading-tight flex items-center gap-2 w-fit max-[428px]:text-xs hover:text-[#F0E74D] transition-colors duration-300">
            <span>Devamını Oku</span>
            <svg
              className="w-4 h-4 text-[#F0E74D] opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 max-[428px]:w-3 max-[428px]:h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}
