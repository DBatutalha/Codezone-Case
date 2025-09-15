import { trpc } from "@/lib/trpc";
import {
  postToDiscoverCard,
  postsToDiscoverCards,
  SortOption,
} from "@/lib/api";

// Test hook
export const useTestTRPC = () => {
  return trpc.posts.test.useQuery();
};

// Test simple hook
export const useTestSimple = () => {
  return trpc.posts.testSimple.useQuery();
};

// Test with input hook
export const useTestWithInput = (name: string) => {
  return trpc.posts.testWithInput.useQuery({ name });
};

// Get all posts (without sorting - for backward compatibility)
export const useAllPosts = () => {
  return trpc.posts.getAll.useQuery({ sort: "latest" });
};

// Get all posts with sorting
export const useAllPostsWithSort = (sort: SortOption = "latest") => {
  return trpc.posts.getAll.useQuery({ sort });
};

// Get trending posts
export const useTrendingPosts = () => {
  return trpc.posts.getTrending.useQuery();
};

// Get posts by category with sorting
export const usePostsByCategory = (
  category: string,
  sort: SortOption = "latest"
) => {
  return trpc.posts.getByCategory.useQuery({ category, sort });
};

// Get posts by tag with sorting
export const usePostsByTag = (tag: string, sort: SortOption = "latest") => {
  return trpc.posts.getByTag.useQuery({ tag, sort });
};

// Get post by slug
export const usePostBySlug = (slug: string) => {
  return trpc.posts.getBySlug.useQuery({ slug });
};

// Get paginated posts with all filters including sorting
export const usePaginatedPosts = (params: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  sort?: SortOption;
  search?: string;
}) => {
  return trpc.posts.getPaginated.useQuery(params);
};

// Custom hooks that return DiscoverCard format
export const useDiscoverCards = () => {
  const { data, ...rest } = useAllPosts();

  return {
    ...rest,
    data:
      data && data.posts
        ? {
            ...data,
            cards: postsToDiscoverCards(data.posts),
          }
        : undefined,
  };
};

// Custom hooks with sorting
export const useDiscoverCardsWithSort = (sort: SortOption = "latest") => {
  const { data, ...rest } = useAllPostsWithSort(sort);

  return {
    ...rest,
    data:
      data && data.posts
        ? {
            ...data,
            cards: postsToDiscoverCards(data.posts),
          }
        : undefined,
  };
};

export const useTrendingDiscoverCards = () => {
  const { data, ...rest } = useTrendingPosts();

  return {
    ...rest,
    data:
      data && data.posts
        ? {
            ...data,
            cards: postsToDiscoverCards(data.posts),
          }
        : undefined,
  };
};

export const useDiscoverCardsByCategory = (
  category: string,
  sort: SortOption = "latest"
) => {
  const { data, ...rest } = usePostsByCategory(category, sort);

  return {
    ...rest,
    data:
      data && data.posts
        ? {
            ...data,
            cards: postsToDiscoverCards(data.posts),
          }
        : undefined,
  };
};

export const usePaginatedDiscoverCards = (params: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  sort?: SortOption;
  search?: string;
}) => {
  const { data, ...rest } = usePaginatedPosts(params);

  return {
    ...rest,
    data:
      data && data.posts
        ? {
            ...data,
            cards: postsToDiscoverCards(data.posts),
          }
        : undefined,
  };
};
