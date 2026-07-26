import SocialMediaTextChunkerContent from "./SocialMediaTextChunkerContent";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#060609] text-slate-400 text-xs font-bold animate-pulse">
          Loading Text Chunker Engine...
        </div>
      }
    >
      <SocialMediaTextChunkerContent forcedSlug="" />
    </Suspense>
  );
}