import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostDetail from "@/components/features/blog/BlogPostDetail";
import { usePostBySlug } from "@/hooks/usePostsMock";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Dinamik SEO metadata
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    // tRPC server-side kullanımı için mock data
    const mockPost = {
      title: "Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit ut et massa mi. Mauris nec leo non libero sodales lobortis.",
      image: "/Images/Blog/hero.png",
      author: "Rapkology",
      publishedAt: "2024-01-15",
    };

    return {
      title: `${mockPost.title} | Rapkology`,
      description: mockPost.description,
      openGraph: {
        title: mockPost.title,
        description: mockPost.description,
        type: "article",
        publishedTime: mockPost.publishedAt,
        authors: [mockPost.author],
        images: [
          {
            url: mockPost.image,
            width: 1200,
            height: 630,
            alt: mockPost.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: mockPost.title,
        description: mockPost.description,
        images: [mockPost.image],
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    return {
      title: "Post Bulunamadı | Rapkology",
      description: "Aradığınız blog yazısı bulunamadı.",
    };
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <main className="flex-1">
      <BlogPostDetail slug={params.slug} />
    </main>
  );
}
