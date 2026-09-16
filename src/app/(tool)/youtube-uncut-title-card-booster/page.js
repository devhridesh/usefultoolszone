import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SmartYoutubeCardContent from "./SmartYoutubeCardContent";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const vid = params?.v;
  const isShort = params?.type === "short";

  // 1. साधारण विज़िटर
  if (!vid) {
    return {
      title: "YouTube Uncut Title & Card Booster | Useful Tools Zone",
      description:
        "Stop WhatsApp Status from truncating video titles with '...'. Boost your social preview cards with 100% uncut headlines and instant 0ms app launch.",
      alternates: {
        canonical: "https://usefultoolszone.com/youtube-uncut-title-card-booster",
      },
    };
  }

  // 2. अगर Shorts है, तो सीधे YouTube का ओरिजिनल कार्ड URL पॉइंट करें
  if (isShort) {
    return {
      title: "Watch Short in YouTube App",
      description: "Tap to launch video directly inside the official YouTube mobile app.",
      alternates: {
        canonical: `https://www.youtube.com/shorts/${vid}`,
      },
      openGraph: {
        url: `https://www.youtube.com/shorts/${vid}`,
      },
    };
  }

  // 3. रेगुलर वीडियो: 16:9 MaxRes HD कार्ड इंजन (छोटे कार्ड को बड़ा बनाने के लिए)
  let fullTitle = "Watch Video in YouTube App";
  let channelName = "YouTube Creator";

  try {
    const oembedRes = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${vid}&format=json`,
      { next: { revalidate: 86400 } }
    );
    if (oembedRes.ok) {
      const data = await oembedRes.json();
      if (data.title) fullTitle = data.title;
      if (data.author_name) channelName = data.author_name;
    }
  } catch (e) {}

  let finalImageUrl = `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`;
  try {
    const hdCheck = await fetch(finalImageUrl, { method: "HEAD" });
    if (!hdCheck.ok) {
      finalImageUrl = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
    }
  } catch (e) {
    finalImageUrl = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
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
          width: 1280,
          height: 720,
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
}

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const vid = params?.v;
  const isShort = params?.type === "short";

  // 🚀 CRAWLER BYPASS FOR SHORTS:
  // जब WhatsApp बॉट Shorts का लिंक पढ़ेगा, तो उसे सीधे ओरिजिनल YouTube Shorts पर भेज दिया जाएगा
  // ताकि बिना किसी ब्लर के ओरिजिनल 100% HD कार्ड लोड हो, जबकि स्टेटस में हमारा ही लिंक दिखेगा!
  if (vid && isShort) {
    const headerList = await headers();
    const userAgent = headerList.get("user-agent") || "";
    const isBot = /WhatsApp|facebookexternalhit|Twitterbot|TelegramBot/i.test(userAgent);

    if (isBot) {
      redirect(`https://www.youtube.com/shorts/${vid}`);
    }
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-[#060609]" />}>
      <SmartYoutubeCardContent />
    </Suspense>
  );
}