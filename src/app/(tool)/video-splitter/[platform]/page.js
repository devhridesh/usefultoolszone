import VideoSplitter from "../page";

function getSplitterSEO(slug) {
  if (!slug) return { platform: 'Social Media', timeLimit: 'Custom' };
  const lowerSlug = slug.toLowerCase();
  
const matrix = {
    // 🟢 UI के बटनों के अनुसार SEO टाइटल्स को 1:1 री-मैप किया
    'whatsapp': { platform: 'WhatsApp Status', timeLimit: '30 Sec' },
    'instagram': { platform: 'Instagram Reels', timeLimit: '60 Sec' },
    'youtube-shorts': { platform: 'YouTube Shorts', timeLimit: '60 Sec' },
    'tiktok': { platform: 'TikTok Video', timeLimit: '60 Sec' },
    'telegram': { platform: 'Telegram Slicer', timeLimit: 'Any' },
    'line': { platform: 'LINE App Video', timeLimit: '5 Min' },
    'wechat': { platform: 'WeChat Moments', timeLimit: '30 Sec' },
    'pinterest': { platform: 'Pinterest Pins', timeLimit: '5 Min' }
  };
  
  return matrix[lowerSlug] || { platform: slug, timeLimit: 'Seamless' };
}

export async function generateMetadata({ params }) {
  const p = await params;
  const platformSlug = p?.platform || '';
  const seoData = getSplitterSEO(platformSlug);
  const targetUrl = `https://usefultoolszone.com/video-splitter/${platformSlug}`;

  return {
    title: `Smart Video Splitter for ${seoData.platform} (${seoData.timeLimit}) - Free Online | Useful Tools Zone`,
    description: `Split long video files for ${seoData.platform} into perfect ${seoData.timeLimit} seamless parts. 🌟 No Watermark, No Signups, 100% Cookie-free browser processing.`,
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
  };
}

export default async function Page({ params }) {
  const p = await params;
  // 🚀 FIXED: Dynamic platform slug value directly passed to the core engine
  return <VideoSplitter forcedPlatform={p?.platform} />;
}