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

  // ✍️ Social Media Post Chunker pSEO Target Presets Array
  const chunkerSlugs = [
    'whatsapp-status-formatter',
    'twitter-thread-generator',
    'threads-post-generator',
    'instagram-reels-text-hooks',
    'linkedin-post-splitter',
    'telegram-message-chunker'
  ];

  // 🖼️ Batch Image Compressor Presets Array
  const imageSlugs = [
    'compress-image-to-20kb',
    'compress-image-to-50kb',
    'compress-image-to-100kb',
    'compress-image-to-200kb',
    'compress-image-to-500kb',
    'compress-image-to-1mb',
    'compress-image-to-2mb',
    'compress-image-to-5mb',
    'compress-image-to-10mb',
    'ssc-photo-compressor',
    'upsc-photo-compressor',
    'image-compressor-for-whatsapp'
  ];

  // 🔄 Component 1: Video Compressor Loop (Updated to /video-compressor)
  const compressorRoutes = [
    ...compressSizes.map((size) => ({
      url: `${baseUrl}video-compressor/${size}`,
      lastModified: new Date(),
      priority: 0.8,
      alternates: { languages: { es: `${baseUrl}video-compressor/${size}?lang=es`, pt: `${baseUrl}video-compressor/${size}?lang=pt`, hi: `${baseUrl}video-compressor/${size}?lang=hi` } },
    })),
    ...compressPlatforms.map((platform) => ({
      url: `${baseUrl}video-compressor/${platform}`,
      lastModified: new Date(),
      priority: 0.9,
      alternates: { languages: { es: `${baseUrl}video-compressor/${platform}?lang=es`, pt: `${baseUrl}video-compressor/${platform}?lang=pt`, hi: `${baseUrl}video-compressor/${platform}?lang=hi` } },
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
    priority: 0.95,
    alternates: {
      languages: {
        es: `${baseUrl}merge-images-compress-pdf-at-one-place/${slug}?lang=es`,
        pt: `${baseUrl}merge-images-compress-pdf-at-one-place/${slug}?lang=pt`,
        hi: `${baseUrl}merge-images-compress-pdf-at-one-place/${slug}?lang=hi`,
      },
    },
  }));

  // 🔄 Component 4: Social Post Chunker & Hook Generator Loop (Updated to /social-media-post-chunker)
  const chunkerRoutes = chunkerSlugs.map((slug) => ({
    url: `${baseUrl}social-media-post-chunker/${slug}`,
    lastModified: new Date(),
    priority: 0.9,
    alternates: {
      languages: {
        es: `${baseUrl}social-media-post-chunker/${slug}?lang=es`,
        pt: `${baseUrl}social-media-post-chunker/${slug}?lang=pt`,
        hi: `${baseUrl}social-media-post-chunker/${slug}?lang=hi`,
      },
    },
  }));

  // 🔄 Component 5: Batch Image Compressor Loop
  const imageRoutes = imageSlugs.map((slug) => ({
    url: `${baseUrl}image-compressor/${slug}`,
    lastModified: new Date(),
    priority: 0.9,
    alternates: {
      languages: {
        es: `${baseUrl}image-compressor/${slug}?lang=es`,
        pt: `${baseUrl}image-compressor/${slug}?lang=pt`,
        hi: `${baseUrl}image-compressor/${slug}?lang=hi`,
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
    
    // ⚡ CORE TOOL MAIN ROUTES
    {
      url: `${baseUrl}video-compressor`,
      lastModified: new Date(),
      priority: 0.95,
      alternates: { languages: { es: `${baseUrl}video-compressor?lang=es`, pt: `${baseUrl}video-compressor?lang=pt`, hi: `${baseUrl}video-compressor?lang=hi` } },
    },
    {
      url: `${baseUrl}video-splitter`,
      lastModified: new Date(),
      priority: 0.95,
      alternates: { languages: { es: `${baseUrl}video-splitter?lang=es`, pt: `${baseUrl}video-splitter?lang=pt`, hi: `${baseUrl}video-splitter?lang=hi` } },
    },
    {
      url: `${baseUrl}merge-images-compress-pdf-at-one-place`,
      lastModified: new Date(),
      priority: 0.95,
      alternates: { languages: { es: `${baseUrl}merge-images-compress-pdf-at-one-place?lang=es`, pt: `${baseUrl}merge-images-compress-pdf-at-one-place?lang=pt`, hi: `${baseUrl}merge-images-compress-pdf-at-one-place?lang=hi` } },
    },
    {
      url: `${baseUrl}social-media-post-chunker`,
      lastModified: new Date(),
      priority: 0.95,
      alternates: { 
        languages: { 
          es: `${baseUrl}social-media-post-chunker?lang=es`, 
          pt: `${baseUrl}social-media-post-chunker?lang=pt`, 
          hi: `${baseUrl}social-media-post-chunker?lang=hi` 
        } 
      },
    },
    {
      url: `${baseUrl}image-compressor`,
      lastModified: new Date(),
      priority: 0.95,
      alternates: { languages: { es: `${baseUrl}image-compressor?lang=es`, pt: `${baseUrl}image-compressor?lang=pt`, hi: `${baseUrl}image-compressor?lang=hi` } },
    },

    // 🌟 YOUTUBE TOOLS
    {
      url: `${baseUrl}youtube-thumbnail-and-metadata-extractor`,
      lastModified: new Date(),
      priority: 0.9,
      alternates: { 
        languages: { 
          es: `${baseUrl}youtube-thumbnail-and-metadata-extractor?lang=es`, 
          pt: `${baseUrl}youtube-thumbnail-and-metadata-extractor?lang=pt`, 
          hi: `${baseUrl}youtube-thumbnail-and-metadata-extractor?lang=hi` 
        } 
      },
    },
    {
      url: `${baseUrl}youtube-thumbnail-downloader`,
      lastModified: new Date(),
      priority: 0.9,
      alternates: { 
        languages: { 
          es: `${baseUrl}youtube-thumbnail-downloader?lang=es`, 
          pt: `${baseUrl}youtube-thumbnail-downloader?lang=pt`, 
          hi: `${baseUrl}youtube-thumbnail-downloader?lang=hi` 
        } 
      },
    },
    {
      url: `${baseUrl}youtube-metadata-extractor`,
      lastModified: new Date(),
      priority: 0.9,
      alternates: { 
        languages: { 
          es: `${baseUrl}youtube-metadata-extractor?lang=es`, 
          pt: `${baseUrl}youtube-metadata-extractor?lang=pt`, 
          hi: `${baseUrl}youtube-metadata-extractor?lang=hi` 
        } 
      },
    },

    // 📜 FOOTER & LEGAL PAGES
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

    // 🔄 MATRIX SPREADS
    ...compressorRoutes,
    ...splitterRoutes,
    ...pdfRoutes, 
    ...chunkerRoutes,
    ...imageRoutes,
  ];
}