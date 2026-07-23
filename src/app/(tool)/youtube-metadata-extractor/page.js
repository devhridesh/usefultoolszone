import YoutubeToolContent from "../youtube-thumbnail-and-metadata-extractor/YoutubeToolContent";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "YouTube Video Metadata Extractor | Copy Title & Channel Info",
  description: "Extract video titles, channel details, and competitor metadata instantly. One-click title copy tool for YouTube creators.",
  alternates: {
    canonical: "https://usefultoolszone.com/youtube-metadata-extractor",
  },
  openGraph: {
    title: "YouTube Video Metadata Extractor | Copy Title & Channel Info",
    description: "Extract video titles, channel details, and competitor metadata instantly.",
    url: "https://usefultoolszone.com/youtube-metadata-extractor",
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
      <YoutubeToolContent forcedSlug="youtube-metadata-extractor" />
    </Suspense>
  );
}