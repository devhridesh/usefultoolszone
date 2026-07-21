import ImageCompressorContent from "../ImageCompressorContent";

function parseSlugMetadata(slug) {
  if (!slug) return { 
    title: "⚡ Batch Image Compressor Online - 100% Private", 
    desc: "🔒 Compress multiple images to exact KB/MB sizes offline inside your browser memory." 
  };
  
  const lower = slug.toLowerCase();

  // 1. Dynamic Match for any custom KB or MB URL
  const match = lower.match(/(?:compress-image-to-|compress-)?(\d+)\s*[-_]?\s*(kb|mb)/i);
  if (match) {
    const val = match[1];
    const unit = match[2].toUpperCase();
    return {
      title: `⚡ Compress Image to ${val}${unit} Online - Free & 100% Private`,
      desc: `🔒 Compress image file sizes down to ${val}${unit} instantly inside your browser memory. No signups, zero quality loss, 100% cookie-free.`
    };
  }

  // 2. Specialized Exam & App Slugs Match
  const presetDict = {
    "ssc-photo-compressor": {
      title: "⚡ SSC Photo Compressor Online (50KB Ceiling)",
      desc: "🔒 Compress and resize applicant photos under 50KB strictly for SSC CGL, CHSL, and MTS application portals."
    },
    "upsc-photo-compressor": {
      title: "⚡ UPSC Photo & Signature Compressor (20KB Limit)",
      desc: "🔒 Scale signature and candidate photographs strictly under 20KB for IAS, NDA, and CDS online registration forms."
    },
    "image-compressor-for-whatsapp": {
      title: "⚡ Image Compressor for WhatsApp - High Visual Clarity",
      desc: "🔒 Shrink large camera photos for fast WhatsApp sharing without blurriness or chat bandwidth delay."
    }
  };

  if (presetDict[lower]) return presetDict[lower];

  const cleanName = slug.replace(/-/g, " ").toUpperCase();
  return {
    title: `⚡ ${cleanName} - Free Online Image Compressor`,
    desc: `🔒 Optimize and reduce photo sizes for ${cleanName} offline in your browser memory sandbox.`
  };
}

export async function generateMetadata({ params }) {
  const p = await params;
  const slug = p?.slug || "";
  const meta = parseSlugMetadata(slug);
  const targetUrl = `https://usefultoolszone.com/image-compressor/${slug}`;

  return {
    title: meta.title,
    description: meta.desc,
    metadataBase: new URL("https://usefultoolszone.com"),
    alternates: {
      canonical: targetUrl,
      languages: {
        "en": targetUrl,
        "es": `${targetUrl}?lang=es`,
        "pt": `${targetUrl}?lang=pt`,
        "hi": `${targetUrl}?lang=hi`,
        "x-default": targetUrl,
      },
    },

    // 💬 DYNAMIC WHATSAPP LINK PREVIEW FOR EACH pSEO PAGE
    openGraph: {
      title: meta.title,
      description: meta.desc,
      url: targetUrl,
      siteName: "Useful Tools Zone",
      type: "website",
      images: [
        {
          url: "https://usefultoolszone.com/og-cards/image-compressor-main.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.desc,
      images: ["https://usefultoolszone.com/og-cards/image-compressor-main.png"],
    },
  };
}

import { Suspense } from "react";

export default async function Page({ params }) {
  const p = await params;
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#060609] text-slate-400 text-xs font-bold animate-pulse">
          Loading Batch Image Compressor...
        </div>
      }
    >
      <ImageCompressorContent forcedSlug={p?.slug} />
    </Suspense>
  );
}