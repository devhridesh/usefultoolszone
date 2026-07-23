import YoutubeToolContent from "../youtube-thumbnail-and-metadata-extractor/YoutubeToolContent";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "YouTube Thumbnail Downloader Online | Download 4K & HD 1080p",
  description: "Download high-resolution 4K and Full HD 1080p YouTube thumbnails instantly. 100% free, client-side, and no watermark.",
  alternates: {
    canonical: "https://usefultoolszone.com/youtube-thumbnail-downloader",
  },
  openGraph: {
    title: "YouTube Thumbnail Downloader Online | Download 4K & HD 1080p",
    description: "Download high-resolution 4K and Full HD 1080p YouTube thumbnails instantly.",
    url: "https://usefultoolszone.com/youtube-thumbnail-downloader",
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
      <YoutubeToolContent forcedSlug="youtube-thumbnail-downloader" />
    </Suspense>
  );
}