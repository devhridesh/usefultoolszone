import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // जो साइज़ आप सपोर्ट करते हैं उनकी लिस्ट
  const compressSizes = ['20mb', '40mb', '50mb'];
  const platforms = ['whatsapp', 'gmail'];

  // डायनामिक पेजेस के लिए मैप (Programmatic SEO)
  const compressRoutes = [
    ...compressSizes.map((size) => ({
      url: `https://usefultoolszone.com/compress/${size}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
    ...platforms.map((platform) => ({
      url: `https://usefultoolszone.com/compress/${platform}`,
      lastModified: new Date(),
      priority: 0.9,
    })),
  ];

  // स्टैटिक पेजेस
  return [
    {
      url: 'https://usefultoolszone.com/',
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: 'https://usefultoolszone.com/compress',
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: 'https://usefultoolszone.com/about',
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: 'https://usefultoolszone.com/privacy-policy',
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: 'https://usefultoolszone.com/disclaimer',
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: 'https://usefultoolszone.com/contact',
      lastModified: new Date(),
      priority: 0.5,
    },
    ...compressRoutes,
  ];
}