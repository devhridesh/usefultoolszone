import GlobalTranslationBar from '../components/GlobalTranslationBar';
import { Suspense } from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Script from 'next/script';
import AnalyticsTracker from '../components/AnalyticsTracker'; // 👈 Auto Route Tracker Import

// 🎯 टेक्स्ट से बना इनलाइन SVG Favicon (Useful Tools Zone के लिए)
export const metadata = {
  icons: {
    icon: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22><rect width=%2232%22 height=%2232%22 rx=%228%22 fill=%22%233b82f6%22/><text x=%2250%%22 y=%2255%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22sans-serif%22 font-weight=%22900%22 font-size=%2212%22>UTZ</text></svg>`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* body में flex-col लगाया है ताकि फुटर हमेशा स्क्रीन के सबसे नीचे चिपका रहे */}
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#060609] antialiased">
        <ThemeProvider>
          
          {/* 🎯 ऑटोमैटिक सेंट्रल रूट व टूल ट्रैकर */}
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>

          {/* 1. यूनिवर्सल नेविगेशन */}
          <Navbar />
          
          {/* 🌐 ग्लोबल ट्रांसलेशन बार */}
          <Suspense fallback={<div className="h-9 w-full bg-white dark:bg-[#0c0c12] animate-pulse"></div>}>
            <GlobalTranslationBar />
          </Suspense>
          
          {/* 2. कंटेंट AREA */}
          <div className="flex-1 flex flex-col pt-16">
            {children}
          </div>
          
          {/* 3. यूनिवर्सल फुटर */}
          <Footer />

        </ThemeProvider>
        
        {/* 🎯 गूगल एनालिटिक्स 4 (100% EXACT MATCH MEASUREMENT ID) */}
        <GoogleAnalytics gaId="G-G3YFNH41P3" />

        {/* 🎯 SAFE ASYNCHRONOUS ADSENSE CORE ENGINE */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" // 👈 XXXXX की जगह अपना Publisher ID डालें
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}