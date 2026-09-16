import { Suspense } from "react";
import { notFound } from "next/navigation";
import SmartYoutubeCardContent from "../SmartYoutubeCardContent";
import { PLATFORMS_DATA } from "../platformData";

export async function generateStaticParams() {
  return Object.keys(PLATFORMS_DATA).map((platform) => ({
    platform,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const platformKey = resolvedParams?.platform;
  const platformInfo = PLATFORMS_DATA[platformKey];

  if (!platformInfo) {
    return notFound();
  }

  const pageUrl = `https://usefultoolszone.com/youtube-uncut-title-card-booster/${platformKey}`;

  return {
    title: `${platformInfo.metaTitle} | Useful Tools Zone`,
    description: platformInfo.metaDesc,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${platformInfo.metaTitle} | Useful Tools Zone`,
      description: platformInfo.metaDesc,
      url: pageUrl,
      siteName: "Useful Tools Zone",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: platformInfo.metaTitle,
      description: platformInfo.metaDesc,
    },
  };
}

export default async function PlatformPseoPage({ params }) {
  const resolvedParams = await params;
  const platformKey = resolvedParams?.platform;
  const platformInfo = PLATFORMS_DATA[platformKey];

  if (!platformInfo) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-[#060609]" />}>
      <SmartYoutubeCardContent
        platformConfig={platformInfo}
        initialPlatform={platformInfo.id}
      />
    </Suspense>
  );
}