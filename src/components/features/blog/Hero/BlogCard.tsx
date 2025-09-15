import React from "react";
import Link from "next/link";

export default function BlogCard({
  card,
}: {
  card: {
    image: string;
    title: string;
    description?: string;
    slug?: string;
  };
}) {
  return (
    <Link href={card.slug ? `/blog/${card.slug}` : "/blog"}>
      <div className="flex gap-6 hover:bg-white/10 rounded-lg p-2 transition-colors duration-300 cursor-pointer group">
        {/* Card Image */}
        <div className="w-32 h-16 flex-shrink-0">
          <img
            className="w-full h-full object-cover rounded group-hover:scale-105 transition-transform duration-300"
            src={card.image}
            alt={`Blog card ${card.title}`}
          />
        </div>

        {/* Card Text */}
        <div className="flex-1 min-w-0">
          <p className="text-black font-saira-bold text-lg leading-tight uppercase truncate group-hover:text-[#F0E74D] transition-colors duration-300 mb-2">
            {card.title}
          </p>
          {card.description && (
            <p className="text-black text-sm font-saira-normal leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
              {card.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
