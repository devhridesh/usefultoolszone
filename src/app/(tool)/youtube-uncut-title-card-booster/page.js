import { Suspense } from "react";
import SmartYoutubeCardContent from "./SmartYoutubeCardContent";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const vid = params?.v;

  // 1. Default Metadata when user visits the tool directly
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

  // 2. Dynamic Metadata for Shared Links (?v=VIDEO_ID)
  let fullTitle = "Watch Video in YouTube App";
  let channelName = "YouTube Creator";
  let finalImageUrl = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;

  try {
    // Official YouTube oEmbed Endpoint (Fast & Reliable)
    const oembedRes = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${vid}&format=json`,
      { next: { revalidate: 86400 } }
    );

    if (oembedRes.ok) {
      const data = await oembedRes.json();
      if (data.title) fullTitle = data.title;
      if (data.author_name) channelName = data.author_name;
    } else {
      // Fallback
      const noembedRes = await fetch(
        `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${vid}`
      );
      if (noembedRes.ok) {
        const data = await noembedRes.json();
        if (data.title) fullTitle = data.title;
        if (data.author_name) channelName = data.author_name;
      }
    }

    // Dynamic check: Use MaxRes HD if available, otherwise fallback to HQ without breaking
    const hdUrl = `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`;
    const checkRes = await fetch(hdUrl, { method: "HEAD" });
    if (checkRes.ok) {
      finalImageUrl = hdUrl;
    }
  } catch (err) {
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
  await searchParams;
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-[#060609]" />}>
      <SmartYoutubeCardContent />
    </Suspense>
  );
}