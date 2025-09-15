export interface Post {
  _id: string;
  user_id: string;
  type: string;
  attributes: {
    trends: boolean;
    category: string[];
    tags: string[];
    authors: string[];
    title: string;
    slug: string;
    content: string;
    seo: {
      metaTitle: string;
      canonicalURL: string;
      metaDescription: string;
    };
    desc: string;
    img: string;
  };
  lang: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
}

// Mevcut DiscoverCard interface'ini Post ile uyumlu hale getirmek için
export interface DiscoverCard {
  image: string;
  avatar: string;
  name: string;
  date: string;
  title: string;
  subtitle: string;
  slug?: string;
  tags?: string[];
  category?: string[];
}
