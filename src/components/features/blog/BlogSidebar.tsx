"use client";

import React from "react";
import { useTrendingPosts } from "@/hooks/usePosts";
import { postsToDiscoverCards } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

interface BlogSidebarProps {
  className?: string;
}

export default function BlogSidebar({ className = "" }: BlogSidebarProps) {
  const { data, isLoading } = useTrendingPosts();

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-32 mb-4"></div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4 mb-6">
              <div className="w-20 h-20 bg-gray-700 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data?.posts || data.posts.length === 0) {
    return null;
  }

  const featuredPosts = postsToDiscoverCards(data.posts).slice(0, 5);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Section Title */}
      <div className="border-b border-gray-700 pb-4">
        <h2 className="text-[#F0E74D] text-xl font-saira-bold">
          ÖZEL İÇERİKLER
        </h2>
        <p className="text-gray-400 text-sm font-saira-normal mt-1">
          En popüler yazılarımız
        </p>
      </div>

      {/* Featured Posts List */}
      <div className="space-y-6">
        {featuredPosts.map((post, index) => (
          <Link
            key={`sidebar-${index}`}
            href={`/blog/${post.slug || "#"}`}
            className="group block"
          >
            <article className="flex gap-4 hover:bg-gray-800 hover:bg-opacity-30 rounded-lg p-3 transition-all duration-300">
              {/* Thumbnail */}
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={post.image || "/Images/Discover/card-1.png"}
                  alt={post.title}
                  fill
                  sizes="80px"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Play Overlay for Video Posts */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-0.5"></div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Meta Info */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#F0E74D] text-xs font-saira-semibold">
                    #{index + 1}
                  </span>
                  <span className="text-gray-500 text-xs">•</span>
                  <span className="text-gray-500 text-xs font-saira-normal">
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white font-saira-semibold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-[#F0E74D] transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Author */}
                <div className="flex items-center gap-2">
                  <div className="relative w-4 h-4 rounded-full overflow-hidden">
                    <Image
                      src={post.avatar || "/Images/Trends/avatar1.png"}
                      alt={post.name}
                      fill
                      sizes="16px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-gray-400 text-xs font-saira-normal">
                    {post.name}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-[#F0E74D] to-[#E6D843] rounded-lg p-6 text-black">
        <h3 className="font-saira-bold text-lg mb-2">RAPKOLOGY BÜLTENI</h3>
        <p className="text-sm font-saira-normal mb-4 opacity-80">
          En güncel rap haberleri doğrudan e-postanızda!
        </p>

        <div className="space-y-3">
          <input
            type="email"
            placeholder="E-posta adresiniz"
            className="w-full px-4 py-2 bg-white bg-opacity-20 border border-black border-opacity-20 rounded text-sm placeholder-black placeholder-opacity-60 font-saira-normal"
          />
          <button className="w-full bg-black text-[#F0E74D] py-2 rounded font-saira-bold text-sm hover:bg-gray-800 transition-colors duration-300">
            ABONE OL
          </button>
        </div>
      </div>

      {/* Popular Tags */}
      <div>
        <h3 className="text-white font-saira-semibold text-lg mb-4">
          POPÜLER ETİKETLER
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Türk Rap",
            "Drill",
            "Trap",
            "Old School",
            "Battle",
            "Freestyle",
            "Beat",
            "Lyrics",
          ].map((tag, index) => (
            <Link
              key={index}
              href={`/blog?tag=${encodeURIComponent(tag.toLowerCase())}`}
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-saira-normal hover:bg-[#F0E74D] hover:text-black transition-all duration-300"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
