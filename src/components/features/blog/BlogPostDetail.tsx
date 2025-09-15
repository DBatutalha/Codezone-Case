"use client";

import React from "react";
import { usePostBySlug } from "@/hooks/usePosts";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import Container from "@/components/shared/Container";
import Section from "@/components/shared/Section";
import { notFound } from "next/navigation";

interface BlogPostDetailProps {
  slug: string;
}

export default function BlogPostDetail({ slug }: BlogPostDetailProps) {
  const { data: post, isLoading, error } = usePostBySlug(slug);

  if (isLoading) {
    return (
      <Section className="py-12">
        <Container size="main">
          <div className="max-w-4xl mx-auto">
            <LoadingSkeleton variant="blog-post" />
          </div>
        </Container>
      </Section>
    );
  }

  if (error || !post) {
    notFound();
  }

  return (
    <Section className="py-12">
      <Container size="main">
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.attributes.category.map((cat, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#F0E74D] bg-opacity-20 text-[#F0E74D] rounded-full text-sm font-saira-semibold"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-saira-bold text-white mb-6 leading-tight">
              {post.attributes.title}
            </h1>

            <p className="text-xl text-gray-300 mb-8 font-saira-normal leading-relaxed">
              {post.attributes.desc}
            </p>

            {/* Author & Date */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-[#F0E74D] font-saira-bold">
                    {post.attributes.authors[0]?.[0] || "R"}
                  </span>
                </div>
                <div>
                  <p className="text-white font-saira-semibold">
                    {post.attributes.authors[0] || "Rapkology"}
                  </p>
                  <p className="text-gray-400 text-sm font-saira-normal">
                    {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.attributes.img && (
            <div className="mb-8">
              <img
                src={post.attributes.img || "/Images/Discover/card-1.png"}
                alt={post.attributes.title}
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <div
              className="text-gray-200 font-saira-normal leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: post.attributes.content.replace(/\n/g, "<br />"),
              }}
            />
          </div>

          {/* Tags */}
          {post.attributes.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-700">
              <h3 className="text-white font-saira-semibold mb-4">Etiketler</h3>
              <div className="flex flex-wrap gap-2">
                {post.attributes.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm font-saira-normal hover:bg-[#F0E74D] hover:text-black transition-all duration-300 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <h3 className="text-white font-saira-semibold mb-4">
              Bu yazıyı paylaş
            </h3>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-saira-semibold">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                Twitter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors duration-300 font-saira-semibold">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 font-saira-semibold">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                </svg>
                Paylaş
              </button>
            </div>
          </div>
        </article>
      </Container>
    </Section>
  );
}
