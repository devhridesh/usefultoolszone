import { Suspense } from "react";
import SmartYoutubeCardContent from "./SmartYoutubeCardContent";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#060609] text-slate-400 text-xs font-bold animate-pulse">
          Loading Smart Card Engine...
        </div>
      }
    >
      <SmartYoutubeCardContent />
    </Suspense>
  );
}