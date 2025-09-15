import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TrendRow({ trend }: { trend: any }) {
  return (
    <div
      key={trend.number}
      className="relative bg-transparent flex flex-row gap-x-12 justify-start group"
    >
      <span className="flex text-[64px] font-saira-bold text-[#2A2A2A] opacity-60 select-none group-hover:text-[#f0e74d] group-hover:opacity-100 transition-colors duration-300">
        {trend.number}
      </span>
      <div className="w-full space-y-4">
        <div className="flex items-center gap-3 mb-2 mt-2">
          <Image
            src={trend.avatar || "/Images/Trends/avatar1.png"}
            alt={trend.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover border-2 border-gray-700"
          />
          <span className="text-white font-saira-normal text-[1.11vw]">
            {trend.name}
          </span>
        </div>
        <div className="text-white font-saira-bold text-[1.74vw] leading-tight mb-2 uppercase">
          {trend.title}
        </div>
        <Image
          src="/vectors/Trends/vertical-line.svg"
          alt="Divider"
          width={1000}
          height={10}
        />
        <Link
          href="/blog"
          className="text-white text-[1.11vw] font-saira-normal hover:text-[#F0E74D] hover:underline transition-colors duration-300"
        >
          {trend.link}
        </Link>
      </div>
    </div>
  );
}
