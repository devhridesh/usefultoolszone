import { Suspense } from "react";
import SmartYoutubeCardContent from "./SmartYoutubeCardContent";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const vid = params?.v;

  // 1. जब कोई यूज़र सामान्य तौर पर टूल पर आता है
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

  // 2. जब शेयर्ड लिंक खोला जाए (?v=VIDEO_ID)
  let fullTitle = "Watch Video in YouTube App";
  let channelName = "YouTube Creator";

  // टाइटल और चैनल का नाम फ़ेच करें
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

  // 🚀 DYNAMIC ENGINE: Shorts vs Regular Video Detector
  let isShort = false;
  try {
    const checkShort = await fetch(`https://www.youtube.com/shorts/${vid}`, {
      method: "HEAD",
      redirect: "manual",
      signal: AbortSignal.timeout(1500),
    });
    // Shorts होने पर YouTube 200 देता है, साधारण वीडियो पर 303/302 रीडायरेक्ट करता है
    if (checkShort.status === 200) {
      isShort = true;
    }
  } catch (e) {
    isShort = false;
  }

  let finalImageUrl = "";
  let imageConfig = [];

  if (isShort) {
    // 🎯 SHORTS MODE: maxresdefault का घटिया ब्लर बायपास करें।
    // hqdefault में असली ओरिजिनल लिंक की तरह क्लीन सॉलिड ब्लैक बॉर्डर रहता है।
    finalImageUrl = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
    imageConfig = [
      {
        url: finalImageUrl,
        alt: fullTitle,
      },
    ];
  } else {
    // 🎯 REGULAR VIDEO MODE: 16:9 True HD 1080p/720p (कोई ब्लैक बार्स नहीं)
    finalImageUrl = `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`;
    try {
      const hdCheck = await fetch(finalImageUrl, {
        method: "HEAD",
        signal: AbortSignal.timeout(1500),
      });
      if (!hdCheck.ok) {
        finalImageUrl = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
      }
    } catch (e) {
      finalImageUrl = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
    }

    imageConfig = [
      {
        url: finalImageUrl,
        width: 1280,
        height: 720,
        alt: fullTitle,
      },
    ];
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
      images: imageConfig,
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
  await searchParams;
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-[#060609]" />}>
      <SmartYoutubeCardContent />
    </Suspense>
  );
}