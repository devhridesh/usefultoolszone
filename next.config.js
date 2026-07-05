/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Webpack block को क्लीन रखा गया है ताकि Next.js स्वतः बंडलिंग कर सके
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // COOP: यह पेज को एक अलग सिक्योर कॉन्टेक्स्ट देता है
          { 
            key: 'Cross-Origin-Opener-Policy', 
            value: 'same-origin' 
          },
          
          // COEP: 'require-corp' करने से ब्राउज़र आपके कंप्यूटर के सभी CPU Cores (SharedArrayBuffer) को पूरी तरह एक्टिव कर देता है
          { 
            key: 'Cross-Origin-Embedder-Policy', 
            value: 'require-corp' 
          }, 
          
          // CORP: लोकल और क्रॉस-ओरिजिन रिसोर्सेज को बिना ब्लॉक किए स्मूथली लोड होने देता है
          { 
            key: 'Cross-Origin-Resource-Policy', 
            value: 'cross-origin' 
          }, 
        ],
      },
    ];
  },
};

module.exports = nextConfig;