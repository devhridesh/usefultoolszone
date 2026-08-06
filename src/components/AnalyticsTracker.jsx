"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      // URL se tool/page ka slug extract karega (e.g., "video-compressor", "video-splitter", "about")
      const toolSlug = pathname.split("/")[1] || "homepage";

      try {
        sendGAEvent({
          event: "tool_used",
          category: "Automated_Tools_Tracker",
          label: toolSlug, // Exact tool ka URL path GA4 ko bhejega
        });
      } catch (err) {
        console.warn("Central GA Event Skipped:", err);
      }
    }
  }, [pathname]);

  return null; // Background mein chalega, UI par kuch dikhayega nahi
}