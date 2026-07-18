// 🌐 MASTER MULTI-LANGUAGE SEO & TWITTER CARD SHIELD FOR VIDEO SPLITTER
export const metadata = {
  title: "Smart Video Splitter Online | 100% Private & Fast | Useful Tools Zone",
  description: "🌟 Split long videos into perfect, seamless parts for WhatsApp, Instagram, YouTube, TikTok, Telegram, LINE, WeChat, and Pinterest without breaking voice flow. No Sign Up, No Watermark, 100% Cookies Free!",
  keywords: [
    // 🟢 स्क्रीनशॉट बटनों के डायरेक्ट कीवर्ड्स को सर्च क्रॉलिंग के लिए डाला
    "whatsapp status video splitter",
    "instagram reels video cutter",
    "youtube shorts splitter online",
    "tiktok video segmenter",
    "telegram slicer for videos",
    "line app video splitter free",
    "wechat moments media cutter",
    "pinterest pins video looper"
  ],
  
  // 🗺️ GOOGLE BOT MULTI-LANGUAGE INDEXING SHIELD
  alternates: {
    canonical: "https://usefultoolszone.com/video-splitter",
    languages: {
      "en": "https://usefultoolszone.com/video-splitter",
      "es": "https://usefultoolszone.com/video-splitter?lang=es",
      "pt": "https://usefultoolszone.com/video-splitter?lang=pt",
      "hi": "https://usefultoolszone.com/video-splitter?lang=hi",
      "x-default": "https://usefultoolszone.com/video-splitter",
    },
  },
  
  // 👥 Open Graph Matrix (WhatsApp & Facebook Sharing)
  openGraph: {
    title: "Smart Video Splitter Online - Zero Voice Cuts | Useful Tools Zone",
    description: "🌟 Precision-cut long video assets for WhatsApp, Instagram, YouTube, TikTok, Telegram, LINE, WeChat, & Pinterest instantly. No Sign Up, No Watermark, 100% Cookies Free!",
    url: "https://usefultoolszone.com/video-splitter",
    siteName: "Useful Tools Zone",
    type: "website",
    images: [
      {
        url: "https://usefultoolszone.com/og-cards/video-splitter-main.png",
        width: 1200,
        height: 630,
        alt: "Useful Tools Zone - Next-Gen 8-Platform Video Splitter Suite",
      },
    ],
  },

  // 🐦 TWITTER CARD ENGINE (X Feed Dynamic High-CTR Card)
  twitter: {
    card: "summary_large_image", // 🚀 इससे ट्विटर पर बड़े साइज का सुंदर बैनर दिखेगा
    title: "Smart Video Splitter Online - 100% Private | Useful Tools Zone",
    description: "🌟 Split long videos into perfect seamless parts for WhatsApp Status, Reels & Shorts entirely offline in your browser memory! No cloud uploads.",
    images: ["https://usefultoolszone.com/og-cards/video-splitter-main.png"], // आपका सोशल कार्ड इमेज पाथ
  },
};

export default function VideoSplitterLayout({ children }) {
  return <>{children}</>;
}