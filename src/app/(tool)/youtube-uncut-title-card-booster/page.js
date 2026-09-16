import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SmartYoutubeCardContent from "./SmartYoutubeCardContent";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const vid = params?.v;
  const mode = params?.mode; // "full" | "sharp"

  // 1. सामान्य विज़िटर
  if (!vid) {
    return {
      title: "YouTube Uncut Title & Card Booster | Useful Tools Zone",
      description:
        "Stop WhatsApp Status from truncating video titles with '...'. Boost your social preview cards with 100% uncut headlines and instant 0ms app launch.",
      alternates: {
        canonical: "https://usefultoolszone.com/youtube-uncut-title-card-booster",
      },
      openGraph: {
        title: "YouTube Uncut Title & Card Booster | Useful Tools Zone",
        description:
          "Stop WhatsApp Status from truncating video titles with '...'. Boost your social preview cards with 100% uncut headlines and instant 0ms app launch.",
        url: "https://usefultoolszone.com/youtube-uncut-title-card-booster",
        siteName: "Useful Tools Zone",
        type: "website",
      },
    };
  }

  // 2. जब मोड 'sharp' हो: YouTube का नेटिव कार्ड डायरेक्ट पास करें
  if (mode === "sharp") {
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

  // 3. 'full' मोड या सामान्य 16:9 वीडियो: अनकट टाइटल + फुल फ्रेम
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
    const checkRes = await fetch(finalImageUrl, { method: "HEAD" });
    if (!checkRes.ok) {
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
  const mode = params?.mode;

  // 🚀 CRAWLER BYPASS FOR SHARP SHORTS:
  // अगर यूज़र ने 'sharp' चुना है, तो WhatsApp बॉट ओरिजिनल YouTube शॉर्ट्स का कार्ड फेच करेगा
  if (vid && mode === "sharp") {
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