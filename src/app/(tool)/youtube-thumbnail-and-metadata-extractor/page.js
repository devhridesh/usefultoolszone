import YoutubeToolContent from "./YoutubeToolContent";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "YouTube Thumbnail & Metadata Extractor Online | 100% Free",
  description: "Extract Full HD 1080p / 4K YouTube thumbnails and copy video titles & channel metadata instantly. 100% free, private tool.",
  alternates: {
    canonical: "https://usefultoolszone.com/youtube-thumbnail-and-metadata-extractor",
  },
  openGraph: {
    title: "YouTube Thumbnail & Metadata Extractor Online | 100% Free",
    description: "Extract Full HD 1080p / 4K YouTube thumbnails and copy video titles instantly.",
    url: "https://usefultoolszone.com/youtube-thumbnail-and-metadata-extractor",
    siteName: "Useful Tools Zone",
    type: "website",
  },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#060609] text-slate-400 text-xs font-bold animate-pulse">
          Loading Extractor Engine...
        </div>
      }
    >
      <YoutubeToolContent forcedSlug="youtube-thumbnail-and-metadata-extractor" />
    </Suspense>
  );
}