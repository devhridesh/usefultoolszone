import PdfContent from "./PdfContent";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#060609] text-slate-400 text-xs font-bold animate-pulse">
          Loading PDF Compiler Engine...
        </div>
      }
    >
      <PdfContent />
    </Suspense>
  );
}