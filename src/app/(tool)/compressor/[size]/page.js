import CompressorPageContent from "@/components/CompressorPageContent";

// 1. Helper Function (Platform aur Size ko dynamic filter karne wala optimized logic)
function getSEOData(slug) {
  if (!slug) return { platform: 'Web & Mobile', mbSize: 'Target Size' };
  const lowerSlug = slug.toLowerCase();
  
  // platforms ki unique configuration data matrix
  const matrix = {
    'whatsapp': { platform: 'WhatsApp', mbSize: '16MB' },
    'gmail': { platform: 'Gmail', mbSize: '25MB' },
    'tiktok': { platform: 'TikTok', mbSize: '72MB' },
    'instagram': { platform: 'Instagram', mbSize: '95MB' },
    'youtube-shorts': { platform: 'YouTube Shorts', mbSize: '60MB' },
    'wechat': { platform: 'WeChat', mbSize: '25MB' },
    'line': { platform: 'LINE App', mbSize: '200MB' },
    'discord': { platform: 'Discord', mbSize: '10MB' },
    'pinterest': { platform: 'Pinterest', mbSize: '100MB' }
  };

  // Condition A: Agar user ne exact platform name search kiya hai
  if (matrix[lowerSlug]) {
    return matrix[lowerSlug];
  }

  // Condition B: Agar direct size query hai (e.g., /compress/20mb)
  if (lowerSlug.includes('mb')) {
    return { platform: 'Web & Mobile', mbSize: lowerSlug.toUpperCase() };
  }

  // Fallback state
  return { platform: slug, mbSize: 'Target Size' };
}

// 2. Metadata Function (Thunder ⚡ aur Lock 🔒 Emojis ke sath highly optimized high-CTR rules)
export async function generateMetadata({ params }) {
  const p = await params;
  const size = p?.size || '';
  
  const seoData = getSEOData(size);

  return {
    title: `Compress Video for ${seoData.platform} to ${seoData.mbSize} 🎥 - Free Online | Useful Tools Zone`,
    description: `Compress video size for ${seoData.platform} to ${seoData.mbSize} ⚡ [No Watermark, No signups, 100% cookie-free]. Smart SSIM pixel tuning. 100% offline & 🔒 private.`,
  alternates: {
    // 🟢 FIXED: Pointing perfectly to the new compressor sub-directory
    canonical: `https://usefultoolszone.com/compressor/${size}`,
  },
  };
}

// 3. Main Page Component (Data routing matrix engine)
export default async function Page({ params }) {
  const p = await params;
  const size = p?.size;

  if (!size) return <div>Page not found</div>;

  const lowerSize = size.toLowerCase();
  let targetSize = size.replace(/[^0-9]/g, '');
  let platformLabel = "Video";

  // dynamic platform parsing blocks
  if (lowerSize === 'whatsapp') {
    targetSize = "16";
    platformLabel = "WhatsApp";
  } else if (lowerSize === 'gmail') {
    targetSize = "25";
    platformLabel = "Gmail";
  } else if (lowerSize === 'tiktok') {
    targetSize = "72";
    platformLabel = "TikTok";
  } else if (lowerSize === 'instagram') {
    targetSize = "95";
    platformLabel = "Instagram";
  } else if (lowerSize === 'youtube-shorts') {
    targetSize = "60";
    platformLabel = "YouTube Shorts";
  } else if (lowerSize === 'wechat') {
    targetSize = "25";
    platformLabel = "WeChat";
  } else if (lowerSize === 'line') {
    targetSize = "200";
    platformLabel = "LINE App";
  } else if (lowerSize === 'discord') {
    targetSize = "10";
    platformLabel = "Discord";
  } else if (lowerSize === 'pinterest') {
    targetSize = "100";
    platformLabel = "Pinterest";
  }

  return <CompressorPageContent initialSize={targetSize} platform={platformLabel} />;
}