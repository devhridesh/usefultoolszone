import { Suspense } from "react";
import SmartYoutubeCardContent from "./SmartYoutubeCardContent";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const vid = params?.v;

  // अगर लिंक में कोई वीडियो ID नहीं है (टूल का मुख्य लैंडिंग पेज)
  if (!vid) {
    return {
      title: "YouTube Uncut Title & Card Booster | Useful Tools Zone",
      description:
        "Display 100% full unclipped video titles on WhatsApp Status cards and launch viewers directly inside the official YouTube mobile app.",
      alternates: {
        canonical: "https://usefultoolszone.com/youtube-uncut-title-card-booster",
      },
      openGraph: {
        title: "YouTube Uncut Title & Card Booster | Useful Tools Zone",
        description:
          "Zero-truncation WhatsApp Status preview cards with 0ms instant native app launch.",
        url: "https://usefultoolszone.com/youtube-uncut-title-card-booster",
        siteName: "Useful Tools Zone",
        type: "website",
        images: [
          {
            url: "https://usefultoolszone.com/og-image.png",
            width: 1200,
            height: 630,
            alt: "Useful Tools Zone Logo",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "YouTube Uncut Title & Card Booster | Useful Tools Zone",
        description:
          "Zero-truncation WhatsApp Status preview cards with 0ms instant native app launch.",
        images: ["https://usefultoolszone.com/og-image.png"],
      },
    };
  }

// जब लिंक में ?v=VIDEO_ID मौजूद हो (WhatsApp / Social Card Preview)
  try {
    const res = await fetch(
      `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${vid}`
    );
    const data = await res.json();
    const fullTitle = data.title || "Watch Video in YouTube App";
    const channelName = data.author_name || "YouTube";
    const previewDesc = `🔴 ${channelName} • via UsefulToolsZone • Tap to watch in App`;

    // 🚀 Dynamic Thumbnail Fallback Logic (Fixing Blur Issue)
    // 1st Priority: Try fetching MaxRes HD Thumbnail (1280x720) without black bars
    let finalImageUrl = `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`;
    
    try {
      // Check if MaxRes actually exists (especially important for Shorts or old videos)
      const imageCheck = await fetch(finalImageUrl, { method: 'HEAD' });
      if (!imageCheck.ok) {
        // Fallback to HQ default if MaxRes is 404
        finalImageUrl = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
      }
    } catch (err) {
      // Network error during check, safe fallback
      finalImageUrl = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
    }

    return {
      title: fullTitle,
      description: previewDesc,
      alternates: {
        canonical: `https://usefultoolszone.com/youtube-uncut-title-card-booster?v=${vid}`,
      },
      openGraph: {
        title: fullTitle,
        description: previewDesc,
        url: `https://usefultoolszone.com/youtube-uncut-title-card-booster?v=${vid}`,
        siteName: "Useful Tools Zone",
        type: "video.other",
        images: [
          {
            url: finalImageUrl,
            width: 1280, // Set to true 16:9 aspect ratio width
            height: 720, // Set to true 16:9 aspect ratio height
            alt: fullTitle,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: fullTitle,
        description: previewDesc,
        images: [finalImageUrl],
      },
    };
  } catch (e) {
    return {
      title: "Watch in YouTube App | Useful Tools Zone",
      description: "Tap to launch video directly inside the official YouTube mobile app.",
    };
  }
}

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const vid = params?.v;

  return (
    <>
      {/* 0ms मिली-सेकंड इंस्टेंट रीडायरेक्ट: React लोड होने से पहले ही सीधे YouTube App खोलेगा */}
      {vid && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var v = "${vid}";
                var ua = navigator.userAgent || "";
                var isAndroid = /android/i.test(ua);
                var isIOS = /iPad|iPhone|iPod/.test(ua);
                
                if (isAndroid) {
                  window.location.replace("intent://www.youtube.com/watch?v=" + v + "#Intent;package=com.google.android.youtube;scheme=https;end");
                } else if (isIOS) {
                  window.location.replace("vnd.youtube://watch?v=" + v);
                  setTimeout(function() {
                    window.location.replace("https://www.youtube.com/watch?v=" + v);
                  }, 300);
                } else {
                  window.location.replace("https://www.youtube.com/watch?v=" + v);
                }
              })();
            `,
          }}
        />
      )}

      <Suspense
        fallback={
          <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#060609] text-slate-400 text-xs font-bold gap-3 animate-pulse">
            <span className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-950/50 text-red-600 flex items-center justify-center text-lg">
              ▶️
            </span>
            <span>Launching YouTube App...</span>
          </div>
        }
      >
        <SmartYoutubeCardContent />
      </Suspense>
    </>
  );
}