import { Suspense } from "react";
import BookGridContent from "../BookGridContent";

// Helper to format slug into readable Title
function formatSlug(slug) {
  if (!slug) return "";
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// 1. Dynamic Metadata Generator for pSEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params; // Next.js 15 Async Params Fix
  const formattedTitle = formatSlug(resolvedParams.slug);

  return {
    title: `Top 9 ${formattedTitle} Grid & Tier List | Useful Tools Zone`,
    description: `Create and customize your 3x3 book grid card for ${formattedTitle}. Auto-fetch covers and download HD images for Instagram & Twitter.`,
    keywords: [
      `${formattedTitle.toLowerCase()} book grid`,
      `${formattedTitle.toLowerCase()} reading list`,
      `best ${formattedTitle.toLowerCase()} books`,
      "3x3 book tier list",
    ],
    openGraph: {
      title: `Top 9 ${formattedTitle} - Visual Book Grid`,
      description: `Custom 3x3 book grid card for ${formattedTitle}. Free HD download.`,
      url: `https://usefultoolszone.com/book-grid-generator/${resolvedParams.slug}`,
    },
    alternates: {
      canonical: `https://usefultoolszone.com/book-grid-generator/${resolvedParams.slug}`,
    },
  };
}

// 2. Pre-render Top Popular Slugs for Fast Indexing (SSG)
export async function generateStaticParams() {
  return [
    { slug: "top-self-help-books" },
    { slug: "best-fiction-books-2026" },
    { slug: "books-by-colleen-hoover" },
    { slug: "naval-ravikant-recommendations" },
    { slug: "best-sci-fi-novels" },
  ];
}

// 3. Dynamic Page Component (Must for Rendering)
export default async function DynamicBookGridPage({ params }) {
  const resolvedParams = await params;
  const initialCardTitle = formatSlug(resolvedParams.slug);

  // Schema Markup for Dynamic pSEO Page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `Visual Book Grid - ${initialCardTitle}`,
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#060609] text-slate-500 font-bold text-sm">
            Loading {initialCardTitle} Grid...
          </div>
        }
      >
        {/* Pass Dynamic Title so the page content is unique */}
        <BookGridContent initialTitle={initialCardTitle.toUpperCase()} />
      </Suspense>
    </>
  );
}