import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { Post } from "@/types/api";

// Sorting types
type SortOption = "latest" | "popular" | "oldest";

// Mock data fetch function (simulating API call)
async function fetchMockPosts(): Promise<Post[]> {
  try {
    console.log("Fetching posts from API...");
    const response = await fetch(
      "https://dummyjson.com/c/a7c4-016a-47aa-8241",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API response status:", response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(
      "API response type:",
      typeof data,
      "Array:",
      Array.isArray(data)
    );

    // Validate that data is an array
    if (!Array.isArray(data)) {
      console.error("API response is not an array:", data);
      return [];
    }

    console.log("API returned", data.length, "posts");

    // Randomize trends for each refresh
    const randomizedData = data.map((post) => {
      // Generate random trends value (30% chance to be trending)
      const isTrending = Math.random() < 0.3;

      return {
        ...post,
        attributes: {
          ...post.attributes,
          trends: isTrending,
        },
      };
    });

    // Log first post structure to debug serialization
    if (randomizedData.length > 0) {
      console.log("First post structure:", {
        _id: randomizedData[0]._id,
        createdAt: randomizedData[0].createdAt,
        hasAttributes: !!randomizedData[0].attributes,
        attributesKeys: randomizedData[0].attributes
          ? Object.keys(randomizedData[0].attributes)
          : [],
      });

      if (randomizedData.length > 1) {
        console.log(
          "Last post date:",
          randomizedData[randomizedData.length - 1].createdAt
        );
        console.log(
          "All post dates with randomized trends:",
          randomizedData.map((post) => ({
            id: post._id.slice(-4),
            date: post.createdAt,
            trends: post.attributes?.trends,
          }))
        );
      }
    }

    // Keep dates as strings to avoid superjson serialization issues
    return randomizedData;
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Fallback to empty array if API fails
    return [];
  }
}

// Helper function to sort posts
function sortPosts(posts: Post[], sortBy: SortOption = "latest"): Post[] {
  console.log(
    "sortPosts called with sortBy:",
    sortBy,
    "posts count:",
    posts.length
  );

  // Create a copy to avoid mutating the original array
  const postsCopy = [...posts];

  // Filter out posts with invalid data
  const validPosts = postsCopy.filter(
    (post) => post && post.createdAt && post.attributes
  );

  console.log("Valid posts count:", validPosts.length);

  switch (sortBy) {
    case "latest":
      const latestSorted = validPosts.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      console.log(
        "Latest sort - first 3 dates:",
        latestSorted.slice(0, 3).map((p) => p.createdAt)
      );
      return latestSorted;
    case "oldest":
      const oldestSorted = validPosts.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA.getTime() - dateB.getTime();
      });
      console.log(
        "Oldest sort - first 3 dates:",
        oldestSorted.slice(0, 3).map((p) => p.createdAt)
      );
      return oldestSorted;
    case "popular":
      // Mock popularity based on trends attribute and creation date
      const popularSorted = validPosts.sort((a, b) => {
        // Trending posts come first
        if (a.attributes?.trends && !b.attributes?.trends) return -1;
        if (!a.attributes?.trends && b.attributes?.trends) return 1;

        // Then sort by date for same trend status
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      console.log(
        "Popular sort - first 3 trends/dates:",
        popularSorted
          .slice(0, 3)
          .map((p) => ({ trends: p.attributes?.trends, date: p.createdAt }))
      );
      return popularSorted;
    default:
      return validPosts;
  }
}

export const postsRouter = router({
  // Test endpoint
  test: publicProcedure.query(() => {
    return { message: "tRPC is working!" };
  }),

  // Test with input
  testWithInput: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { message: `Hello ${input.name}!` };
    }),

  // Simple test endpoint without API call
  testSimple: publicProcedure.query(() => {
    return {
      posts: [
        {
          _id: "test123",
          user_id: "user123",
          type: "posts",
          attributes: {
            trends: true,
            category: ["Test"],
            tags: ["test"],
            authors: ["Test Author"],
            title: "Test Title",
            slug: "test-slug",
            content: "Test content",
            seo: {
              metaTitle: "Test",
              canonicalURL: "test",
              metaDescription: "Test desc",
            },
            desc: "Test description",
            img: "test.jpg",
          },
          lang: "tr",
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z",
          __v: 0,
        },
      ],
      total: 1,
    };
  }),

  // Get all posts
  getAll: publicProcedure
    .input(
      z.object({
        sort: z
          .enum(["latest", "popular", "oldest"])
          .optional()
          .default("latest"),
      })
    )
    .query(async ({ input }) => {
      try {
        console.log("getAll called with input:", input);
        const posts = await fetchMockPosts();
        console.log("Fetched posts count:", posts.length);

        if (posts.length === 0) {
          return {
            posts: [],
            total: 0,
          };
        }

        const sortedPosts = sortPosts(posts, input.sort);
        console.log("Sorted posts count:", sortedPosts.length);

        return {
          posts: sortedPosts,
          total: sortedPosts.length,
        };
      } catch (error) {
        console.error("Error in getAll:", error);
        return {
          posts: [],
          total: 0,
        };
      }
    }),

  // Get trending posts
  getTrending: publicProcedure.query(async () => {
    try {
      const posts = await fetchMockPosts();
      const trendingPosts = posts.filter(
        (post) => post.attributes?.trends === true
      );
      return {
        posts: trendingPosts,
        total: trendingPosts.length,
      };
    } catch (error) {
      console.error("Error in getTrending:", error);
      throw new Error("Failed to fetch trending posts");
    }
  }),

  // Get posts by category
  getByCategory: publicProcedure
    .input(
      z.object({
        category: z.string(),
        sort: z
          .enum(["latest", "popular", "oldest"])
          .optional()
          .default("latest"),
      })
    )
    .query(async ({ input }) => {
      try {
        const posts = await fetchMockPosts();

        // Category mapping
        const categoryMapping: Record<string, string[]> = {
          turkrap: ["Videolar", "Müzik"],
          yabanci: ["Videolar", "Müzik"],
          haberler: ["Videolar"],
          klip: ["Videolar"],
          ayinKlipleri: ["Videolar"],
          rapMix: ["Müzik"],
          spotify: ["Müzik"],
        };

        const mappedCategories = categoryMapping[input.category] || [
          input.category,
        ];

        const filteredPosts = posts.filter((post) =>
          post?.attributes?.category?.some((cat) =>
            mappedCategories.some(
              (mappedCat) =>
                cat.toLowerCase().includes(mappedCat.toLowerCase()) ||
                mappedCat.toLowerCase().includes(cat.toLowerCase())
            )
          )
        );
        const sortedPosts = sortPosts(filteredPosts, input.sort);
        return {
          posts: sortedPosts,
          total: sortedPosts.length,
        };
      } catch (error) {
        console.error("Error in getByCategory:", error);
        throw new Error("Failed to fetch posts by category");
      }
    }),

  // Get posts by tag
  getByTag: publicProcedure
    .input(
      z.object({
        tag: z.string(),
        sort: z
          .enum(["latest", "popular", "oldest"])
          .optional()
          .default("latest"),
      })
    )
    .query(async ({ input }) => {
      try {
        const posts = await fetchMockPosts();
        const filteredPosts = posts.filter((post) =>
          post?.attributes?.tags?.includes(input.tag)
        );
        const sortedPosts = sortPosts(filteredPosts, input.sort);
        return {
          posts: sortedPosts,
          total: sortedPosts.length,
        };
      } catch (error) {
        console.error("Error in getByTag:", error);
        throw new Error("Failed to fetch posts by tag");
      }
    }),

  // Get post by slug
  getBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const posts = await fetchMockPosts();
        const post = posts.find(
          (post) => post?.attributes?.slug === input.slug
        );
        if (!post) {
          throw new Error("Post not found");
        }
        return post;
      } catch (error) {
        console.error("Error in getBySlug:", error);
        throw new Error("Failed to fetch post by slug");
      }
    }),

  // Get paginated posts
  getPaginated: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(10),
        category: z.string().optional(),
        tag: z.string().optional(),
        sort: z
          .enum(["latest", "popular", "oldest"])
          .optional()
          .default("latest"),
        search: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        console.log("getPaginated called with input:", input);
        const posts = await fetchMockPosts();
        console.log("getPaginated - fetched posts:", posts.length);
        let filteredPosts = posts;

        // Filter by category if provided
        if (input.category && input.category !== "all") {
          console.log("Filtering by category:", input.category);
          console.log(
            "Available categories in posts:",
            posts.map((p) => p.attributes?.category).slice(0, 3)
          );

          // Category mapping - frontend ID'lerini backend kategorilerine çeviriyoruz
          // Mock data'da sadece "Videolar" ve "Müzik" kategorileri var
          const categoryMapping: Record<string, string[]> = {
            turkrap: ["Videolar", "Müzik"],
            yabanci: ["Videolar", "Müzik"],
            haberler: ["Videolar"],
            klip: ["Videolar"],
            ayinKlipleri: ["Videolar"],
            rapMix: ["Müzik"],
            spotify: ["Müzik"],
          };

          const mappedCategories = categoryMapping[input.category] || [
            input.category,
          ];
          console.log("Mapped categories:", mappedCategories);

          filteredPosts = filteredPosts.filter((post) =>
            post?.attributes?.category?.some((cat) =>
              mappedCategories.some(
                (mappedCat) =>
                  cat.toLowerCase().includes(mappedCat.toLowerCase()) ||
                  mappedCat.toLowerCase().includes(cat.toLowerCase())
              )
            )
          );
          console.log("After category filter:", filteredPosts.length);
        }

        // Filter by tag if provided
        if (input.tag) {
          filteredPosts = filteredPosts.filter((post) =>
            post?.attributes?.tags?.includes(input.tag!)
          );
        }

        // Filter by search if provided
        if (input.search) {
          const searchTerm = input.search.toLowerCase();
          filteredPosts = filteredPosts.filter(
            (post) =>
              post?.attributes?.title?.toLowerCase().includes(searchTerm) ||
              post?.attributes?.desc?.toLowerCase().includes(searchTerm) ||
              post?.attributes?.tags?.some((tag) =>
                tag.toLowerCase().includes(searchTerm)
              ) ||
              post?.attributes?.category?.some((cat) =>
                cat.toLowerCase().includes(searchTerm)
              )
          );
        }

        // Sort posts
        const sortedPosts = sortPosts(filteredPosts, input.sort);
        console.log("getPaginated - after sorting:", sortedPosts.length);

        // Pagination
        const startIndex = (input.page - 1) * input.limit;
        const endIndex = startIndex + input.limit;
        const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

        console.log("getPaginated - pagination:", {
          startIndex,
          endIndex,
          paginatedCount: paginatedPosts.length,
        });

        return {
          posts: paginatedPosts,
          total: sortedPosts.length,
          page: input.page,
          limit: input.limit,
          totalPages: Math.ceil(sortedPosts.length / input.limit),
          hasNext: endIndex < sortedPosts.length,
          hasPrev: input.page > 1,
        };
      } catch (error) {
        console.error("Error in getPaginated:", error);
        throw new Error("Failed to fetch paginated posts");
      }
    }),
});
