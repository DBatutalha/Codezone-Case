import axios from "axios";
import { Post, DiscoverCard } from "@/types/api";

// API Base URL
const API_BASE_URL = "https://dummyjson.com/c/a7c4-016a-47aa-8241";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Sorting types
export type SortOption = "latest" | "popular" | "oldest";

// Helper function to sort posts
export function sortPosts(
  posts: Post[],
  sortBy: SortOption = "latest"
): Post[] {
  switch (sortBy) {
    case "latest":
      return [...posts].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "oldest":
      return [...posts].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    case "popular":
      // Mock popularity based on trends attribute and creation date
      return [...posts].sort((a, b) => {
        // Trending posts come first
        if (a.attributes.trends && !b.attributes.trends) return -1;
        if (!a.attributes.trends && b.attributes.trends) return 1;

        // Then sort by date for same trend status
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    default:
      return posts;
  }
}

// API functions
export const apiClient = {
  // Posts API with sorting
  getPosts: async (sortBy: SortOption = "latest"): Promise<Post[]> => {
    const response = await api.get("");
    const posts = response.data;
    return sortPosts(posts, sortBy);
  },

  // Trending posts
  getTrendingPosts: async (sortBy: SortOption = "latest"): Promise<Post[]> => {
    const response = await api.get("");
    const posts = response.data;
    const trendingPosts = posts.filter(
      (post: Post) => post.attributes.trends === true
    );
    return sortPosts(trendingPosts, sortBy);
  },

  // Posts by category with sorting
  getPostsByCategory: async (
    category: string,
    sortBy: SortOption = "latest"
  ): Promise<Post[]> => {
    const response = await api.get("");
    const posts = response.data;
    const filteredPosts = posts.filter((post: Post) =>
      post.attributes.category.includes(category)
    );
    return sortPosts(filteredPosts, sortBy);
  },

  // Posts by tags with sorting
  getPostsByTag: async (
    tag: string,
    sortBy: SortOption = "latest"
  ): Promise<Post[]> => {
    const response = await api.get("");
    const posts = response.data;
    const filteredPosts = posts.filter((post: Post) =>
      post.attributes.tags.includes(tag)
    );
    return sortPosts(filteredPosts, sortBy);
  },

  // Get single post by slug
  getPostBySlug: async (slug: string): Promise<Post | null> => {
    const response = await api.get("");
    const posts = response.data;
    return posts.find((post: Post) => post.attributes.slug === slug) || null;
  },
};

// Helper function to convert Post to DiscoverCard format
export const postToDiscoverCard = (post: Post): DiscoverCard => {
  // Random avatar selection - only use existing avatars
  const avatarOptions = [
    "/Images/Trends/avatar1.png",
    "/Images/Trends/avatar2.png",
    "/Images/Trends/avatar3.png",
  ];
  const randomAvatar =
    avatarOptions[Math.floor(Math.random() * avatarOptions.length)];

  return {
    image: post.attributes.img,
    avatar: randomAvatar,
    name: post.attributes.authors[0] || "Rapkology",
    date: new Date(post.createdAt).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    title: post.attributes.title,
    subtitle: post.attributes.desc,
    slug: post.attributes.slug,
    tags: post.attributes.tags,
    category: post.attributes.category,
  };
};

// Helper function to convert multiple posts
export const postsToDiscoverCards = (
  posts: Post[] | undefined
): DiscoverCard[] => {
  if (!posts || !Array.isArray(posts)) {
    return [];
  }
  return posts.map(postToDiscoverCard);
};

export default api;
