import SocialMediaTextChunkerContent from "../SocialMediaTextChunkerContent";
import { Suspense } from "react";

// 1. Static Params Generator
export async function generateStaticParams() {
  return [
    { slug: "whatsapp-status-formatter" },
    { slug: "twitter-thread-generator" },
    { slug: "threads-post-generator" },
    { slug: "instagram-reels-text-hooks" },
    { slug: "linkedin-post-splitter" },
    { slug: "telegram-message-chunker" },
  ];
}

// 2. Dynamic Metadata Generator (Next.js 15 Async Props)
export async function generateMetadata(props) {
  const params = await props.params;
  const slug = params?.slug || "";
  const formattedTitle = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  const targetUrl = `https://usefultoolszone.com/social-media-text-chunker/${slug}`;

  const metaDesc = `⚡ Split long text into attention-grabbing ${formattedTitle} posts! Inject high-CTR viral hook presets, create custom hooks & auto-bold key phrases instantly.`;

  return {
    title: `${formattedTitle} - Long Text Chunker | Useful Tools Zone`,
    description: metaDesc,
    alternates: {
      canonical: targetUrl,
    },
    openGraph: {
      title: `${formattedTitle} - Long Text Chunker | Useful Tools Zone`,
      description: metaDesc,
      url: targetUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${formattedTitle} - Long Text Chunker | Useful Tools Zone`,
      description: metaDesc,
    },
  };
}

// 3. Main Page Component
export default async function Page(props) {
  const params = await props.params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#060609] text-slate-400 text-xs font-bold animate-pulse">
          Loading Text Chunker Engine...
        </div>
      }
    >
      <SocialMediaTextChunkerContent forcedSlug={params?.slug} />
    </Suspense>
  );
}