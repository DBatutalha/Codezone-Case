import { useState, useEffect } from "react";
import { Post } from "@/types/api";
import { DiscoverCard } from "@/types/Discover";
import { postsToDiscoverCards } from "@/lib/api";

// Mock data
const mockPosts: Post[] = [
  {
    _id: "1",
    user_id: "user1",
    type: "posts",
    attributes: {
      trends: true,
      category: ["Videolar"],
      tags: ["rap", "türkçe"],
      authors: ["Enes Alper"],
      title: "Türk Rap Sahnesinde Yeni Dönem",
      slug: "turk-rap-sahnesinde-yeni-donem",
      content: "Lorem ipsum dolor sit amet...",
      seo: {
        metaTitle: "Türk Rap Sahnesinde Yeni Dönem",
        canonicalURL: "/blog/turk-rap-sahnesinde-yeni-donem",
        metaDescription: "Türk rap sahnesindeki son gelişmeler",
      },
      desc: "Türk rap sahnesindeki son gelişmeler ve genç sanatçıların yükselişi",
      img: "/Images/Discover/card-1.png",
    },
    lang: "tr",
    createdAt: "2024-12-15T10:00:00.000Z",
    updatedAt: "2024-12-15T10:00:00.000Z",
    __v: 0,
  },
  {
    _id: "2",
    user_id: "user2",
    type: "posts",
    attributes: {
      trends: false,
      category: ["Müzik"],
      tags: ["drill", "müzik"],
      authors: ["Merve Kaya"],
      title: "Drill Müzik Türü Türkiye'de Nasıl Gelişiyor",
      slug: "drill-muzik-turu-turkiyede-nasil-gelisiyor",
      content: "Lorem ipsum dolor sit amet...",
      seo: {
        metaTitle: "Drill Müzik Türü Türkiye'de Nasıl Gelişiyor",
        canonicalURL: "/blog/drill-muzik-turu-turkiyede-nasil-gelisiyor",
        metaDescription: "Drill müziğin Türkiye'deki gelişimi",
      },
      desc: "Drill müziğin Türkiye'deki serüveni ve popüler sanatçılar",
      img: "/Images/Discover/card-2.png",
    },
    lang: "tr",
    createdAt: "2024-12-12T10:00:00.000Z",
    updatedAt: "2024-12-12T10:00:00.000Z",
    __v: 0,
  },
  {
    _id: "3",
    user_id: "user3",
    type: "posts",
    attributes: {
      trends: true,
      category: ["Videolar"],
      tags: ["underground", "kültür"],
      authors: ["Can Özdemir"],
      title: "Underground Rap Kültürü ve Türk Gençliğine Etkisi",
      slug: "underground-rap-kulturu-ve-turk-gencligine-etkisi",
      content: "Lorem ipsum dolor sit amet...",
      seo: {
        metaTitle: "Underground Rap Kültürü ve Türk Gençliğine Etkisi",
        canonicalURL: "/blog/underground-rap-kulturu-ve-turk-gencligine-etkisi",
        metaDescription: "Underground rap kültürünün etkisi",
      },
      desc: "Underground rap'in Türkiye'deki gelişimi ve gençlik üzerindeki sosyal etkisi",
      img: "/Images/Discover/card-3.png",
    },
    lang: "tr",
    createdAt: "2024-12-10T10:00:00.000Z",
    updatedAt: "2024-12-10T10:00:00.000Z",
    __v: 0,
  },
  {
    _id: "4",
    user_id: "user1",
    type: "posts",
    attributes: {
      trends: false,
      category: ["Müzik"],
      tags: ["sosyal medya", "viral"],
      authors: ["Enes Alper"],
      title: "Rap Müziğin Sosyal Medya Etkisi",
      slug: "rap-muzigin-sosyal-medya-etkisi",
      content: "Lorem ipsum dolor sit amet...",
      seo: {
        metaTitle: "Rap Müziğin Sosyal Medya Etkisi",
        canonicalURL: "/blog/rap-muzigin-sosyal-medya-etkisi",
        metaDescription: "Rap müziğin sosyal medya etkisi",
      },
      desc: "Sosyal medya platformlarının rap müziğin popülaritesine katkısı",
      img: "/Images/Discover/card-4.png",
    },
    lang: "tr",
    createdAt: "2024-12-08T10:00:00.000Z",
    updatedAt: "2024-12-08T10:00:00.000Z",
    __v: 0,
  },
  {
    _id: "5",
    user_id: "user2",
    type: "posts",
    attributes: {
      trends: true,
      category: ["Videolar"],
      tags: ["2024", "albüm"],
      authors: ["Merve Kaya"],
      title: "Türkçe Rap'in Altın Çağı: 2024'ün En Çok Dinlenen Albümleri",
      slug: "turkce-rapin-altin-cagi-2024un-en-cok-dinlenen-albumleri",
      content: "Lorem ipsum dolor sit amet...",
      seo: {
        metaTitle:
          "Türkçe Rap'in Altın Çağı: 2024'ün En Çok Dinlenen Albümleri",
        canonicalURL:
          "/blog/turkce-rapin-altin-cagi-2024un-en-cok-dinlenen-albumleri",
        metaDescription: "2024'ün en başarılı Türkçe rap albümleri",
      },
      desc: "Bu yılın en başarılı Türkçe rap albümleri ve sanatçılarının analizi",
      img: "/Images/Discover/card-5.png",
    },
    lang: "tr",
    createdAt: "2024-12-05T10:00:00.000Z",
    updatedAt: "2024-12-05T10:00:00.000Z",
    __v: 0,
  },
];

// Mock API functions
const mockApi = {
  getAllPosts: async (
    sort: string = "latest"
  ): Promise<{ posts: Post[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay

    const sortedPosts = [...mockPosts].sort((a, b) => {
      if (sort === "latest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sort === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (sort === "popular") {
        // Trending posts first, then by date
        if (a.attributes.trends && !b.attributes.trends) return -1;
        if (!a.attributes.trends && b.attributes.trends) return 1;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return 0;
    });

    return { posts: sortedPosts, total: sortedPosts.length };
  },

  getTrendingPosts: async (): Promise<{ posts: Post[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const trendingPosts = mockPosts.filter((post) => post.attributes.trends);
    return { posts: trendingPosts, total: trendingPosts.length };
  },

  getPaginatedPosts: async (params: {
    page?: number;
    limit?: number;
    category?: string;
    tag?: string;
    sort?: string;
    search?: string;
  }): Promise<{
    posts: Post[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    let filteredPosts = [...mockPosts];

    // Filter by category
    if (params.category && params.category !== "all") {
      filteredPosts = filteredPosts.filter((post) =>
        post.attributes.category.some((cat) =>
          cat.toLowerCase().includes(params.category!.toLowerCase())
        )
      );
    }

    // Filter by tag
    if (params.tag) {
      filteredPosts = filteredPosts.filter((post) =>
        post.attributes.tags.includes(params.tag!)
      );
    }

    // Filter by search
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.attributes.title.toLowerCase().includes(searchTerm) ||
          post.attributes.desc.toLowerCase().includes(searchTerm) ||
          post.attributes.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm)
          )
      );
    }

    // Sort posts
    const sort = params.sort || "latest";
    filteredPosts.sort((a, b) => {
      if (sort === "latest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sort === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (sort === "popular") {
        if (a.attributes.trends && !b.attributes.trends) return -1;
        if (!a.attributes.trends && b.attributes.trends) return 1;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return 0;
    });

    // Pagination
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return {
      posts: paginatedPosts,
      total: filteredPosts.length,
      page,
      limit,
      totalPages: Math.ceil(filteredPosts.length / limit),
      hasNext: endIndex < filteredPosts.length,
      hasPrev: page > 1,
    };
  },
};

// Custom hooks using mock data
export const useAllPosts = () => {
  const [data, setData] = useState<
    { posts: Post[]; total: number } | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await mockApi.getAllPosts("latest");
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};

export const useTrendingPosts = () => {
  const [data, setData] = useState<
    { posts: Post[]; total: number } | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await mockApi.getTrendingPosts();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};

export const usePaginatedPosts = (params: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  sort?: string;
  search?: string;
}) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await mockApi.getPaginatedPosts(params);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    params.page,
    params.limit,
    params.category,
    params.tag,
    params.sort,
    params.search,
  ]);

  return { data, isLoading, error };
};

// DiscoverCard format hooks
export const useDiscoverCards = () => {
  const { data, isLoading, error } = useAllPosts();

  return {
    data: data
      ? { ...data, cards: postsToDiscoverCards(data.posts) }
      : undefined,
    isLoading,
    error,
  };
};

export const useTrendingDiscoverCards = () => {
  const { data, isLoading, error } = useTrendingPosts();

  return {
    data: data
      ? { ...data, cards: postsToDiscoverCards(data.posts) }
      : undefined,
    isLoading,
    error,
  };
};

export const usePaginatedDiscoverCards = (params: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  sort?: string;
  search?: string;
}) => {
  const { data, isLoading, error } = usePaginatedPosts(params);

  return {
    data: data
      ? { ...data, cards: postsToDiscoverCards(data.posts) }
      : undefined,
    isLoading,
    error,
  };
};

// Legacy hooks for compatibility
export const useTestTRPC = () => ({
  data: { message: "Mock API working!" },
  isLoading: false,
  error: null,
});
export const useTestSimple = () => ({
  data: { posts: [], total: 0 },
  isLoading: false,
  error: null,
});
export const useTestWithInput = (name: string) => ({
  data: { message: `Hello ${name}!` },
  isLoading: false,
  error: null,
});
export const useAllPostsWithSort = (sort: string = "latest") => useAllPosts();
export const usePostsByCategory = (category: string, sort: string = "latest") =>
  useAllPosts();
export const usePostsByTag = (tag: string, sort: string = "latest") =>
  useAllPosts();
export const usePostBySlug = (slug: string) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Find post by slug in mock data
        const post = mockPosts.find((p) => p.attributes.slug === slug);
        if (post) {
          setData(post);
        } else {
          setError(new Error("Post not found"));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { data, isLoading, error };
};
export const useDiscoverCardsWithSort = (sort: string = "latest") =>
  useDiscoverCards();
export const useDiscoverCardsByCategory = (
  category: string,
  sort: string = "latest"
) => useDiscoverCards();
