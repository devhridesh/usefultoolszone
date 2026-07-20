import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://usefultoolszone.com/';

  // 📈 Video Compressor Parameters Matrix Array
  const compressSizes = ['10mb', '20mb', '40mb', '50mb'];
  const compressPlatforms = [
    'whatsapp', 'gmail', 'tiktok', 'instagram', 'youtube-shorts', 'wechat', 'line', 'discord', 'pinterest'
  ];

  // ✂️ Video Splitter Optimization Targets Array
  const splitterPlatforms = [
    'whatsapp', 'instagram', 'youtube-shorts', 'tiktok', 'telegram', 'line', 'wechat', 'pinterest'
  ];

  // 📄 Niche PDF Target Presets Integration Loop
  const pdfSlugs = [
    'upsc-sign', 'ssc-photo', 'sarkari-doc-100kb', 'pan-card-200kb', 
    'whatsapp-doc', 'gmail-25mb', 'compress-50kb', 'compress-100kb', 
    'compress-200kb', 'compress-500kb', 'compress-1mb', 'compress-2mb', 
    'compress-5mb', 'compress-10mb'
  ];

  // 🔄 Component 1: Video Compressor Loop
  const compressorRoutes = [
    ...compressSizes.map((size) => ({
      url: `${baseUrl}compressor/${size}`,
      lastModified: new Date(),
      priority: 0.8,
      alternates: { languages: { es: `${baseUrl}compressor/${size}?lang=es`, pt: `${baseUrl}compressor/${size}?lang=pt`, hi: `${baseUrl}compressor/${size}?lang=hi` } },
    })),
    ...compressPlatforms.map((platform) => ({
      url: `${baseUrl}compressor/${platform}`,
      lastModified: new Date(),
      priority: 0.9,
      alternates: { languages: { es: `${baseUrl}compressor/${platform}?lang=es`, pt: `${baseUrl}compressor/${platform}?lang=pt`, hi: `${baseUrl}compressor/${platform}?lang=hi` } },
    })),
  ];

  // 🔄 Component 2: Video Splitter Loop
  const splitterRoutes = splitterPlatforms.map((platform) => ({
    url: `${baseUrl}video-splitter/${platform}`,
    lastModified: new Date(),
    priority: 0.9,
    alternates: { languages: { es: `${baseUrl}video-splitter/${platform}?lang=es`, pt: `${baseUrl}video-splitter/${platform}?lang=pt`, hi: `${baseUrl}video-splitter/${platform}?lang=hi` } },
  }));

  // 🔄 Component 3: Safe Programmatic PDF Conversion Matrix Loop
  const pdfRoutes = pdfSlugs.map((slug) => ({
    url: `${baseUrl}merge-images-compress-pdf-at-one-place/${slug}`,
    lastModified: new Date(),
    priority: 0.95, // High authority priority assignment
    alternates: {
      languages: {
        es: `${baseUrl}merge-images-compress-pdf-at-one-place/${slug}?lang=es`,
        pt: `${baseUrl}merge-images-compress-pdf-at-one-place/${slug}?lang=pt`,
        hi: `${baseUrl}merge-images-compress-pdf-at-one-place/${slug}?lang=hi`,
      },
    },
  }));

  // 🚀 CORE STATIC MARKETING CHANNELS COMPILATION
  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      priority: 1.0,
      alternates: { languages: { es: `${baseUrl}?lang=es`, pt: `${baseUrl}?lang=pt`, hi: `${baseUrl}?lang=hi` } },
    },
    {
      url: `${baseUrl}merge-images-compress-pdf-at-one-place`,
      lastModified: new Date(),
      priority: 0.95,
      alternates: { languages: { es: `${baseUrl}merge-images-compress-pdf-at-one-place?lang=es`, pt: `${baseUrl}merge-images-compress-pdf-at-one-place?lang=pt`, hi: `${baseUrl}merge-images-compress-pdf-at-one-place?lang=hi` } },
    },
    {
      url: `${baseUrl}about`,
      lastModified: new Date(),
      priority: 0.7,
      alternates: { languages: { es: `${baseUrl}about?lang=es`, pt: `${baseUrl}about?lang=pt`, hi: `${baseUrl}about?lang=hi` } },
    },
    {
      url: `${baseUrl}privacy-policy`,
      lastModified: new Date(),
      priority: 0.5,
      alternates: { languages: { es: `${baseUrl}privacy-policy?lang=es`, pt: `${baseUrl}privacy-policy?lang=pt`, hi: `${baseUrl}privacy-policy?lang=hi` } },
    },
    {
      url: `${baseUrl}terms`,
      lastModified: new Date(),
      priority: 0.5,
      alternates: { languages: { es: `${baseUrl}terms?lang=es`, pt: `${baseUrl}terms?lang=pt`, hi: `${baseUrl}terms?lang=hi` } },
    },
    {
      url: `${baseUrl}disclaimer`,
      lastModified: new Date(),
      priority: 0.5,
      alternates: { languages: { es: `${baseUrl}disclaimer?lang=es`, pt: `${baseUrl}disclaimer?lang=pt`, hi: `${baseUrl}disclaimer?lang=hi` } },
    },
    {
      url: `${baseUrl}contact`,
      lastModified: new Date(),
      priority: 0.5,
      alternates: { languages: { es: `${baseUrl}contact?lang=es`, pt: `${baseUrl}contact?lang=pt`, hi: `${baseUrl}contact?lang=hi` } },
    },
    ...compressorRoutes,
    ...splitterRoutes,
    ...pdfRoutes, // Seamless injection of all 14 programmatic optimization paths
  ];
}