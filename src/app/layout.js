import GlobalTranslationBar from '../components/GlobalTranslationBar';
import { Suspense } from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import Navbar from '../components/Navbar'; // 🚀 ग्लोबल नेविगेशन बार इंपोर्ट किया
import Footer from '../components/Footer'; // 🚀 ग्लोबल फुटर इंपोर्ट किया
import Script from 'next/script';
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* body में flex-col लगाया है ताकि फुटर हमेशा स्क्रीन के सबसे नीचे चिपका रहे */}
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#060609] antialiased">
        <ThemeProvider>
          
          {/* 1. यूनिवर्सल नेविगेशन: अब यह सभी 05 पेजों पर हैमबर्गर एक्टिव रखेगा */}
          <Navbar />
          
      {/* 🌐 ग्लोबल ट्रांसलेशन बार: इसे यहाँ Suspense के साथ जोड़ दिया गया है ताकि 50ms ऑटो-क्लिक इंजन पूरे ऐप पर काम करे */}
          <Suspense fallback={<div className="h-9 w-full bg-white dark:bg-[#0c0c12] animate-pulse"></div>}>
            <GlobalTranslationBar />
          </Suspense>
          
          {/* 2. कंटेंट एरिया: फिक्स्ड नेवबार से टकराने से बचाने के लिए pt-16 (पैडिंग) दी है */}
          <div className="flex-1 flex flex-col pt-16">
            {children}
          </div>
          
          {/* 3. यूनिवर्सल फुटर: अब यह किसी भी पेज पर जाने पर नीचे बना रहेगा */}
          <Footer />

        </ThemeProvider>
        
        {/* गूगल एनालिटिक्स ट्रैकिंग स्क्रिप्ट */}
        <GoogleAnalytics gaId="G-63YPFNH1P3" />

        {/* 🎯 SAFE ASYNCHRONOUS ADSENSE CORE ENGINE (गूगल एनालिटिक्स के साथ सिंक किया गया) */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" // 👈 यहाँ XXXXX की जगह अपना असली Publisher ID डाल देना भाई
          strategy="afterInteractive" // यह आपके मुख्य टूल्स के लोड होने के बाद बैकग्राउंड में लोड होगा ताकि स्पीड न गिरे
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}