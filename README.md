# Rapkology - Modern Rap Kültürü Blog Platformu

LINK: https://codezonecase.netlify.app/

Rapkology, Next.js 15 ve TypeScript kullanılarak geliştirilmiş modern bir rap kültürü blog platformudur. Proje, tRPC ile API yönetimi, Swiper ile carousel/slider işlevselliği, Tailwind CSS v4 ile stil yönetimi içerir.

## 🚀 Teknoloji Stack

- **Framework:** Next.js 15.4.4 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **State Management:** TanStack Query (React Query)
- **API Management:** tRPC (Type-safe API)
- **Carousel/Slider:** Swiper.js 11.2.10
- **Serialization:** SuperJSON
- **Runtime:** React 19

## 📋 Özellikler

### 🎯 Ana Özellikler

- **Dinamik Blog Sistemi:** Mock data ile çalışan blog yazıları
- **Kategori/Tag Filtreleme:** İçerik filtreleme sistemi
- **Arama Fonksiyonu:** Gerçek zamanlı arama
- **Sıralama:** Latest, Popular, Oldest seçenekleri
- **Sayfalama:** Pagination sistemi
- **URL State Management:** Browser history ile durum korunması
- **SEO Optimizasyonu:** Dinamik meta tags
- **Responsive Tasarım:** 428px breakpoint ile mobile-first

### 🎨 UI/UX Özellikleri

- **Modern Tasarım:** Siyah tema ile rap kültürüne uygun
- **Animasyonlar:** Hover efektleri ve geçişler
- **Loading States:** Skeleton ve spinner bileşenleri
- **Error Handling:** Kullanıcı dostu hata mesajları
- **Interactive Elements:** Swiper carousel'lar

## 🏗️ Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Ana sayfa
│   ├── blog/              # Blog sayfaları
│   └── layout.tsx          # Root layout
├── components/            # React bileşenleri
│   ├── features/          # Özellik bazlı bileşenler
│   │   ├── main/          # Ana sayfa bileşenleri
│   │   └── blog/          # Blog bileşenleri
│   ├── shared/            # Paylaşılan bileşenler
│   ├── ui/                # UI bileşenleri
│   └── layout/            # Layout bileşenleri
├── hooks/                 # Custom React hooks
│   ├── useURLState.ts     # URL state management
│   └── usePostsMock.ts    # Mock API hooks
├── lib/                   # Utility fonksiyonları
├── types/                 # TypeScript type definitions
└── data/                  # Mock data ve constants
```

## 🔧 Teknik Detaylar

### URL State Management

Proje, browser history ile entegre çalışan URL state management sistemi kullanır:

```typescript
// src/hooks/useURLState.ts
export function useURLState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Query parametreleri: cat, sort, page, q, view
  // Geri/ileri ile durum korunur
}
```

### Mock API Sistemi

Gerçek API entegrasyonu için hazırlanmış mock data sistemi:

```typescript
// src/hooks/usePostsMock.ts
export const usePaginatedPosts = (params: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  sort?: string;
  search?: string;
}) => {
  // Mock API ile filtreleme, arama, sayfalama
};
```

### Dinamik SEO

Blog detay sayfalarında dinamik SEO metadata:

```typescript
// src/app/blog/[slug]/page.tsx
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  // Dinamik meta tags, Open Graph, Twitter Card
}
```

### Responsive Design

428px breakpoint ile mobile-first tasarım:

```css
/* Tailwind CSS v4 */
max-[428px]:text-sm
max-[428px]:px-6
max-[428px]:py-2
```

## 🎯 Gereksinimler Karşılama

### ✅ Teknik Gereksinimler

- **Next.js 15:** ✅ App Router ile modern yapı
- **TypeScript:** ✅ Tam type safety
- **Swiper:** ✅ Carousel/slider implementasyonu
- **Mock Data/API:** ✅ tRPC altyapısı + mock data
- **Dinamik Query:** ✅ cat, sort, page, q, view parametreleri
- **URL State:** ✅ Browser history entegrasyonu
- **Dinamik SEO:** ✅ generateMetadata ile
- **Animasyonlar:** ✅ Tailwind transitions
- **Loading/Error:** ✅ Comprehensive state management

### 🎨 UI/UX Gereksinimler

- **Pixel Perfect:** Figma dökümüne uygun tasarım
- **Responsive:** Mobile-first yaklaşım
- **Modern UI:** Rap kültürüne uygun tema
- **Interactive:** Hover efektleri ve animasyonlar

## 🚀 Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Development server başlat
npm run dev

# Production build
npm run build

# Production server başlat
npm start
```

## 🌐 Deploy

Proje Netlify için optimize edilmiştir:

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NEXT_TELEMETRY_DISABLED = "1"
```

## 📱 Responsive Breakpoints

- **Mobile:** < 428px
- **Tablet:** 428px - 768px
- **Desktop:** > 768px

## 🎨 Tasarım Sistemi

### Renkler

- **Primary:** #F0E74D (Sarı)
- **Background:** #000000 (Siyah)
- **Secondary:** #121212, #181818 (Koyu gri)
- **Text:** #FFFFFF (Beyaz), #9CA3AF (Gri)

### Typography

- **Font:** Saira Condensed (Google Fonts)
- **Weights:** 100-900
- **Responsive:** vw units ile scalable

## 🔍 Öne Çıkan Özellikler

### 1. URL State Management

```typescript
// Filtreleme, arama, sıralama URL ile senkronize
const { filters, updateFilters } = useBlogFilters();
// ?cat=Videolar&sort=popular&page=2&q=rap&view=grid
```

### 2. Mock API Sistemi

```typescript
// Gerçek API'ye kolay geçiş için hazırlanmış
const { data, isLoading, error } = usePaginatedPosts({
  page: 1,
  limit: 12,
  category: "Videolar",
  sort: "popular",
  search: "rap",
});
```

### 3. Dinamik SEO

```typescript
// Her blog yazısı için özel meta tags
export async function generateMetadata({ params }) {
  return {
    title: `${post.title} | Rapkology`,
    description: post.description,
    openGraph: {
      /* ... */
    },
    twitter: {
      /* ... */
    },
  };
}
```

### 4. Loading States

```typescript
// Comprehensive loading ve error handling
if (isLoading) return <LoadingSkeleton variant="card" />;
if (error) return <ErrorMessage error={error} />;
```

## 🛠️ Geliştirme Notları

### Suspense Boundaries

Next.js 15 uyumluluğu için Suspense boundaries eklendi:

```typescript
// src/app/page.tsx
<Suspense fallback={<LoadingSpinner />}>
  <ContentDiscovery />
</Suspense>
```

### Image Optimization

Netlify deploy için image optimization devre dışı:

```typescript
// next.config.ts
images: {
  unoptimized: true;
}
```

### Type Safety

Tam TypeScript desteği ile type-safe API:

```typescript
interface Post {
  _id: string;
  attributes: {
    title: string;
    slug: string;
    category: string[];
    tags: string[];
    // ...
  };
}
```

## 📊 Performans

- **Build Time:** ~4s
- **Bundle Size:** Optimized chunks
- **Lighthouse Score:** 90+ (estimated)
- **Core Web Vitals:** Optimized
