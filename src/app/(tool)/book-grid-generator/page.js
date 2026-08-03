import { Suspense } from "react";
import BookGridContent from "./BookGridContent";

// 📌 Metadata for Google Search
export const metadata = {
  title: "Visual Book Grid & 3x3 Tier List Generator | Useful Tools Zone",
  description:
    "Create aesthetic 3x3 book grid cards, auto-fetch covers via ISBN or Title, choose royal themes, and download HD images for Instagram & Twitter.",
};

export default function Page() {
  // 🧠 Schema Markup (JSON-LD) Object
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Visual Book Grid Generator",
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
      {/* 🚀 SEO Schema Markup for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#060609] text-slate-500 font-bold text-sm">
            Loading Book Grid Engine...
          </div>
        }
      >
        <BookGridContent />
      </Suspense>
    </>
  );
}