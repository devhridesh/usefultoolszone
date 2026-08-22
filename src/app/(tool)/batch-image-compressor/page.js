import ImageCompressorContent from "./ImageCompressorContent";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#060609] text-slate-400 text-xs font-bold animate-pulse">
          Loading Batch Image Compressor...
        </div>
      }
    >
      <ImageCompressorContent forcedSlug="" />
    </Suspense>
  );
}