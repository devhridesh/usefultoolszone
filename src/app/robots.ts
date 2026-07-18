import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',           // आपके बैकएंड API रूट्स को बोट्स से सुरक्षित रखने के लिए
        '/_next/',         // Next.js की इंटरनल फाइलों को क्रॉल होने से रोकने के लिए
        '/static/',        // स्टैटिक एसेट्स को अननेसेसरी क्रॉलिंग से बचाने के लिए
      ],
    },
    // 🚀 यह ऑटोमैटिकली आपके जनरेटेड साइटमैप को गूगल सर्च कंसोल से लिंक कर देगा
    sitemap: 'https://usefultoolszone.com/sitemap.xml',
  };
}