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

  // 📚 Visual Book Grid Generator pSEO Target Presets Array
  const bookGridSlugs = [
    'top-self-help-books',
    'best-fiction-books-2026',
    'books-by-colleen-hoover',
    'naval-ravikant-recommendations',
    'best-sci-fi-novels'
  ];

  // 🌐 Helper Function: Full Multi-Language Alternate URLs (Google SEO Safe)
  const createAlternates = (path: string) => ({
    languages: {
      'x-default': `${baseUrl}${path}`,
      en: `${baseUrl}${path}`,
      es: `${baseUrl}${path}?lang=es`,
      pt: `${baseUrl}${path}?lang=pt`,
      hi: `${baseUrl}${path}?lang=hi`,
    },
  });

  // 🔄 Component 1: Video Compressor Loop
  const compressorRoutes = [
    ...compressSizes.map((size) => ({
      url: `${baseUrl}video-compressor/${size}`,
      lastModified: new Date(),
      priority: 0.8,
      alternates: createAlternates(`video-compressor/${size}`),
    })),
    ...compressPlatforms.map((platform) => ({
      url: `${baseUrl}video-compressor/${platform}`,
      lastModified: new Date(),
      priority: 0.9,
      alternates: createAlternates(`video-compressor/${platform}`),
    })),
  ];

  // 🔄 Component 2: Video Splitter Loop
  const splitterRoutes = splitterPlatforms.map((platform) => ({
    url: `${baseUrl}video-splitter/${platform}`,
    lastModified: new Date(),
    priority: 0.9,
    alternates: createAlternates(`video-splitter/${platform}`),
  }));

  // 🔄 Component 3: Safe Programmatic PDF Conversion Matrix Loop
  const pdfRoutes = pdfSlugs.map((slug) => ({
    url: `${baseUrl}merge-images-compress-pdf-at-one-place/${slug}`,
    lastModified: new Date(),
    priority: 0.95,
    alternates: createAlternates(`merge-images-compress-pdf-at-one-place/${slug}`),
  }));

  // 🔄 Component 4: Social Post Chunker & Hook Generator Loop
  const chunkerRoutes = chunkerSlugs.map((slug) => ({
    url: `${baseUrl}social-media-post-chunker/${slug}`,
    lastModified: new Date(),
    priority: 0.9,
    alternates: createAlternates(`social-media-post-chunker/${slug}`),
  }));

  // 🔄 Component 5: Batch Image Compressor Loop
  const imageRoutes = imageSlugs.map((slug) => ({
    url: `${baseUrl}image-compressor/${slug}`,
    lastModified: new Date(),
    priority: 0.9,
    alternates: createAlternates(`image-compressor/${slug}`),
  }));

  // 🔄 Component 6: Visual Book Grid Generator pSEO Loop
  const bookGridRoutes = bookGridSlugs.map((slug) => ({
    url: `${baseUrl}book-grid-generator/${slug}`,
    lastModified: new Date(),
    priority: 0.9,
    alternates: createAlternates(`book-grid-generator/${slug}`),
  }));

  // 🚀 CORE STATIC MARKETING CHANNELS COMPILATION
  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      priority: 1.0,
      alternates: createAlternates(''),
    },
    
    // ⚡ CORE TOOL MAIN ROUTES
    {
      url: `${baseUrl}video-compressor`,
      lastModified: new Date(),
      priority: 0.95,
      alternates: createAlternates('video-compressor'),
    },
    {
      url: `${baseUrl}video-splitter`,
      lastModified: new Date(),
      priority: 0.95,
      alternates: createAlternates('video-splitter'),
    },
    {
      url: `${baseUrl}merge-images-compress-pdf-at-one-place`,
      lastModified: new Date(),
      priority: 0.95,
      alternates: createAlternates('merge-images-compress-pdf-at-one-place'),
    },
    {
      url: `${baseUrl}social-media-post-chunker`,
      lastModified: new Date(),
      priority: 0.95,
      alternates: createAlternates('social-media-post-chunker'),
    },
    {
      url: `${baseUrl}image-compressor`,
      lastModified: new Date(),
      priority: 0.95,
      alternates: createAlternates('image-compressor'),
    },
    {
      url: `${baseUrl}book-grid-generator`,
      lastModified: new Date(),
      priority: 0.95,
      alternates: createAlternates('book-grid-generator'),
    },

    // 🌟 YOUTUBE TOOLS
    {
      url: `${baseUrl}youtube-thumbnail-and-metadata-extractor`,
      lastModified: new Date(),
      priority: 0.9,
      alternates: createAlternates('youtube-thumbnail-and-metadata-extractor'),
    },
    {
      url: `${baseUrl}youtube-thumbnail-downloader`,
      lastModified: new Date(),
      priority: 0.9,
      alternates: createAlternates('youtube-thumbnail-downloader'),
    },
    {
      url: `${baseUrl}youtube-metadata-extractor`,
      lastModified: new Date(),
      priority: 0.9,
      alternates: createAlternates('youtube-metadata-extractor'),
    },

    // 📜 FOOTER & LEGAL PAGES
    {
      url: `${baseUrl}about`,
      lastModified: new Date(),
      priority: 0.7,
      alternates: createAlternates('about'),
    },
    {
      url: `${baseUrl}privacy-policy`,
      lastModified: new Date(),
      priority: 0.5,
      alternates: createAlternates('privacy-policy'),
    },
    {
      url: `${baseUrl}terms`,
      lastModified: new Date(),
      priority: 0.5,
      alternates: createAlternates('terms'),
    },
    {
      url: `${baseUrl}disclaimer`,
      lastModified: new Date(),
      priority: 0.5,
      alternates: createAlternates('disclaimer'),
    },
    {
      url: `${baseUrl}contact`,
      lastModified: new Date(),
      priority: 0.5,
      alternates: createAlternates('contact'),
    },

    // 🔄 MATRIX SPREADS
    ...compressorRoutes,
    ...splitterRoutes,
    ...pdfRoutes, 
    ...chunkerRoutes,
    ...imageRoutes,
    ...bookGridRoutes,
  ];
}