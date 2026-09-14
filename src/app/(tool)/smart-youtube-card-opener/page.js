import { Suspense } from "react";
import SmartYoutubeCardContent from "./SmartYoutubeCardContent";

export const dynamic = "force-dynamic";

// सर्वर पर ही WhatsApp और सोशल मीडिया के लिए डायनामिक कार्ड जनरेट करना
export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const vid = params?.v;

  if (!vid) {
    return {
      title: "Smart YouTube Card & App Opener",
      description: "Open YouTube links directly inside native app with full titles.",
    };
  }

  try {
    const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${vid}`);
    const data = await res.json();
    const fullTitle = data.title || "Watch Video in YouTube App";

    return {
      title: fullTitle,
      description: `🔴 ${data.author_name || "YouTube"} - Tap to open directly in YouTube App`,
      openGraph: {
        title: fullTitle,
        description: `▶ Tap to open full video directly in YouTube App`,
        images: [
          {
            url: `https://img.youtube.com/vi/${vid}/hqdefault.jpg`,
            width: 1200,
            height: 630,
            alt: fullTitle,
          },
        ],
      },
    };
  } catch (e) {
    return {
      title: "Watch in YouTube App",
    };
  }
}

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