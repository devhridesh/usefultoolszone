import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://usefultoolszone.com/';
  
  // 🟢 वेरिएबल्स के आगे से कमेंट (//) हटाकर इन्हें पूरी तरह एक्टिव किया
  const compressSizes = ['10mb', '20mb', '40mb', '50mb'];
  const compressPlatforms = [
    'whatsapp', 'gmail', 'tiktok', 'instagram', 'youtube-shorts', 'wechat', 'line', 'discord', 'pinterest'
  ];
  const splitterPlatforms = [
    'whatsapp', 'instagram', 'youtube-shorts', 'tiktok', 'telegram', 'line', 'wechat', 'pinterest'
  ];

  // 1. COMPRESSOR DYNAMIC SUB-ROUTES LOOP (Updated to /compressor/)
  const compressorRoutes = [
    ...compressSizes.map((size) => ({
      url: `${baseUrl}compressor/${size}`,
      lastModified: new Date(),
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}compressor/${size}?lang=es`,
          pt: `${baseUrl}compressor/${size}?lang=pt`,
          hi: `${baseUrl}compressor/${size}?lang=hi`,
        },
      },
    })),
    ...compressPlatforms.map((platform) => ({
      url: `${baseUrl}compressor/${platform}`,
      lastModified: new Date(),
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}compressor/${platform}?lang=es`,
          pt: `${baseUrl}compressor/${platform}?lang=pt`,
          hi: `${baseUrl}compressor/${platform}?lang=hi`,
        },
      },
    })),
  ];

  // 2. VIDEO SPLITTER DYNAMIC SUB-ROUTES LOOP (New Advanced Architecture)
  const splitterRoutes = splitterPlatforms.map((platform) => ({
    url: `${baseUrl}video-splitter/${platform}`,
    lastModified: new Date(),
    priority: 0.9,
    alternates: {
      languages: {
        es: `${baseUrl}video-splitter/${platform}?lang=es`,
        pt: `${baseUrl}video-splitter/${platform}?lang=pt`,
        hi: `${baseUrl}video-splitter/${platform}?lang=hi`,
      },
    },
  }));

  // 3. CORE STATIC PAGES
  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      priority: 1.0,
      alternates: { languages: { es: `${baseUrl}?lang=es`, pt: `${baseUrl}?lang=pt`, hi: `${baseUrl}?lang=hi` } },
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
  ]; // 🟢 आख़िरी ऐरे क्लोजर का कमेंट हटाकर सिंटैक्स को सही किया गया
}