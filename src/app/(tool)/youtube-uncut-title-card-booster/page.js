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
// जब लिंक में ?v=VIDEO_ID हो (WhatsApp / Social Media Card Preview)
  let fullTitle = "Watch Video in YouTube App";
  let channelName = "YouTube Creator";
  let finalImageUrl = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;

  try {
    // 🎯 1. Direct YouTube Scraper: Fetches the EXACT unblurred, cropped 16:9 thumbnail YouTube generates
    const ytRes = await fetch(`https://www.youtube.com/shorts/${vid}`, {
      headers: {
        "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 3600 },
    });

    if (ytRes.ok) {
      const html = await ytRes.text();

      // Extract real og:image (has the official clean 16:9 crop for Shorts, no blurred wings)
      const imgMatch =
        html.match(/<meta\s+(?:property|name)=["']og:image["']\s+content=["']([^"']+)["']/i) ||
        html.match(/<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']og:image["']/i);
      
      if (imgMatch && imgMatch[1]) {
        finalImageUrl = imgMatch[1].replace(/&amp;/g, "&");
      }

      // Extract full official title
      const titleMatch =
        html.match(/<meta\s+(?:property|name)=["']og:title["']\s+content=["']([^"']+)["']/i) ||
        html.match(/<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']og:title["']/i);
      
      if (titleMatch && titleMatch[1]) {
        fullTitle = titleMatch[1]
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, "&");
      }
    } else {
      throw new Error("Direct scrape fallback");
    }
  } catch (err) {
    // Fallback if YouTube blocks request
    try {
      const res = await fetch(
        `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${vid}`
      );
      const data = await res.json();
      if (data.title) fullTitle = data.title;
      if (data.author_name) channelName = data.author_name;
    } catch {}
  }

  const previewDesc = `🔴 ${channelName} • via UsefulToolsZone • Tap to watch in App`;

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