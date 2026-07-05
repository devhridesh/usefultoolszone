// Absolute path का इस्तेमाल करें, ये कभी गलत नहीं होंगे
import GlassCard from "@/components/ui/GlassCard";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import CompressorContainer from "@/components/CompressorContainer";
import Navbar from "@/components/Navbar";
import React from 'react'
import Link from 'next/link'

// ✅ इसे ऐसे अपडेट करो:
export default function CompressPage({ initialSize }) {
 
    return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-slate-50 dark:bg-[#060609]">
      {/* Dynamic Navbar Layer */}
      <div className="w-full fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Spacer for Fixed Navbar */}
      <div className="h-20 w-full"></div>

      {/* Main Content Area */}
      <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col items-center justify-center space-y-6 my-auto px-4">
        
        {/* Header Section (Psychologically optimized typography) */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Compress Videos Locally <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
              Looks Exactly Like Original
            </span>
          </h1>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Your videos never leave your device. Fast, secure, and client-side modern encoding that works entirely in your browser memory.
            <span className="block mt-2 font-bold text-slate-900 dark:text-slate-200">
              Saves 100% of your internet bandwidth with zero server data usage!
            </span>
          </p>

          {/* 📉 Premium Data-Saver Trust Badges */}
          <div className="flex flex-wrap justify-center gap-2 pt-1 text-[10px] font-extrabold uppercase tracking-wider">
            <span className="px-2.5 py-1 bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400 rounded-full border border-green-100 dark:border-green-900/30 flex items-center gap-1 shadow-sm">
              🌐 100% Internet Data Saved
            </span>
            <span className="px-2.5 py-1 bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-900/30 flex items-center gap-1 shadow-sm">
              🔒 Zero Cloud Uploads
            </span>
            <span className="px-2.5 py-1 bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400 rounded-full border border-purple-100 dark:border-purple-900/30 flex items-center gap-1 shadow-sm">
              🚀 True Offline Compression
            </span>
          </div>

          {/* ⚡ TOP TRIGGER LINK (Instant Landing Visibility on Mobile) */}
          <div className="pt-2">
            <p className="text-xs text-slate-500">
              Compression running slow?{" "}
              <a
                href="#speed-tips-section"
                className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700 dark:hover:text-blue-300 transition-all inline-block animate-pulse"
              >
                Read our 1-minute speed optimization tips ⚡
              </a>
            </p>
          </div>
        </div>

        {/* 💻 📱 MASTER GRID: Layout for maximum Ad viewability on PC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start mt-4">
          
          {/* LEFT SIDE PC AD - Only visible on Large Screens (PC) */}
          <div className="hidden lg:block lg:col-span-3 h-[600px] sticky top-24 bg-slate-50 dark:bg-white/[0.02] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl flex items-center justify-center text-center">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              [ PC SIDEBAR AD 1 <br/> 300x600 ]
            </span>
          </div>

          {/* CENTER - The Core Compressor Box */}
          <div className="col-span-1 lg:col-span-6 w-full max-w-2xl mx-auto">
            <div className="relative group transition-all duration-500 hover:-translate-y-1 rounded-2xl w-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-25 transition duration-500"></div>
              
              <GlassCard className="relative w-full p-6 z-10 ring-1 ring-slate-200/50 dark:ring-white/5 shadow-xl">
<CompressorContainer initialSize={initialSize} />
              </GlassCard>
            </div>
          </div>

          {/* RIGHT SIDE PC AD - Only visible on Large Screens (PC) */}
          <div className="hidden lg:block lg:col-span-3 h-[600px] sticky top-24 bg-slate-50 dark:bg-white/[0.02] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl flex items-center justify-center text-center">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              [ PC SIDEBAR AD 2 <br/> 300x600 ]
            </span>
          </div>

        </div>
      </div>

      {/* --------------------------------------------------------- */}
      {/* 🎛️ PART 1: FORMAT & CODEC CAPABILITIES GRID */}
      {/* --------------------------------------------------------- */}
      <section className="w-full max-w-3xl mx-auto mt-12 bg-white dark:bg-[#0c0c12] rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] px-4">
        <div className="border-b border-slate-100 dark:border-white/5 pb-4 mb-6">
          <h2 className="text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
            Supported Video Formats & Codecs
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-slate-50 dark:bg-black/40 rounded-xl border border-slate-100 dark:border-white/[0.02] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md cursor-default">
            <span className="text-sm font-black text-blue-500 block mb-1">.MP4</span>
            <span className="text-[11px] text-gray-500 block">H.264 / MPEG-4 Baseline, Main & High Profiles for Universal Web Playback</span>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-black/40 rounded-xl border border-slate-100 dark:border-white/[0.02] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md cursor-default">
            <span className="text-sm font-black text-indigo-500 block mb-1">.WEBM</span>
            <span className="text-[11px] text-gray-500 block">VP8 / VP9 Native Web Stream Optimization for HTML5 Browsers</span>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-black/40 rounded-xl border border-slate-100 dark:border-white/[0.02] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md cursor-default">
            <span className="text-sm font-black text-purple-500 block mb-1">.MOV</span>
            <span className="text-[11px] text-gray-500 block">Apple QuickTime Dynamic Codec Wrappers (Ideal for iOS & Mac)</span>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-black/40 rounded-xl border border-slate-100 dark:border-white/[0.02] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md cursor-default">
            <span className="text-sm font-black text-pink-500 block mb-1">.MKV</span>
            <span className="text-[11px] text-gray-500 block">Matroska Multimedia Containers for High-Quality Multi-track Audio/Video</span>
          </div>
        </div>
      </section>

      {/* 🚀 MID-PAGE AD ZONE (The Waiting Ad) */}
      <div className="w-full max-w-3xl mx-auto mt-10 py-6 bg-slate-100 dark:bg-white/[0.02] border border-dashed border-slate-300 dark:border-white/10 rounded-2xl text-center flex items-center justify-center min-h-[120px] shadow-sm">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase animate-pulse">
          [ Mid-Article Auto-Ads Zone ]
        </span>
      </div>

      {/* --------------------------------------------------------- */}
      {/* 📚 PART 2: 500+ WORDS SEO & Content Block (Adjusted Width) */}
      {/* --------------------------------------------------------- */}
      <section className="w-full max-w-3xl mx-auto mt-8 bg-white dark:bg-[#0c0c12] rounded-2xl p-6 md:p-10 space-y-12 text-sm leading-relaxed text-slate-500 dark:text-gray-400 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] px-4">        
        <article className="space-y-4">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            How to Compress Videos Online Without Losing Quality?
          </h2>
          <p>
            In today's digital era, high-definition recording devices, 4K smartphone cameras, and advanced DSLR lenses have made capturing high-quality video easier than ever. However, this massive leap in visual clarity comes with a significant drawback: massive file sizes. Uncompressed or high-bitrate video files consume enormous amounts of storage space on your hard drive, exhaust your monthly cloud storage quotas, and make sharing media across email or social networks nearly impossible. This is exactly where our advanced online video compressor steps in to solve the problem efficiently and securely.
          </p>
          <p>
            Traditional methods of shrinking video sizes often result in a heavily pixelated, blurry, or unwatchable output. Useful Tools Zone utilizes a next-generation hybrid encoding algorithm that intelligently analyzes the spatial and temporal redundancy within your media. By dynamically adjusting the bitrate and stripping away unnecessary background data bits while preserving the core visual frames, our tool ensures that the compressed output looks exactly like the original. You can easily reduce a 500MB video down to 50MB without any noticeable drop in visual fidelity.
          </p>
        </article>

        <article className="space-y-4">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            The Ultimate Privacy Advantage: 100% Local Browser Processing
          </h2>
          <p>
            The biggest hidden danger of using conventional free online video compressors is data privacy. When you use standard web tools, they force you to upload your personal, confidential, or sensitive corporate videos to their remote cloud servers. This exposes your private data to potential network interception, unauthorized server-side storage, and third-party data logging. You lose total control over your files the moment you hit the upload button.
          </p>
          <p>
            Useful Tools Zone completely revolutionizes this workflow by utilizing cutting-edge Client-Side WebAssembly (Wasm) architecture. When you select a video on our platform, it is never uploaded to the internet. Instead, the video is securely loaded directly into your web browser's isolated memory sandbox. The entire compression process—from frame decoding to bitrate reduction and final encoding—happens locally using your device's own CPU and GPU power. Once the compression is complete, the temporary memory is instantly wiped clean. Zero uploads, zero server storage, and absolute 100% privacy for your digital assets.
          </p>
        </article>

        <article className="space-y-4">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            Lightning-Fast Speeds with Multi-Format Support
          </h2>
          <p>
            Because our utility bypasses the need for internet uploads and downloads, the compression process starts instantaneously. You are no longer restricted by slow internet connections or bandwidth throttling. Whether you are dealing with standard .MP4 files encoded in H.264, web-optimized .WEBM streams (VP8/VP9), Apple's native .MOV QuickTime formats, or high-density .MKV Matroska containers, our versatile local engine handles them all flawlessly. 
          </p>
          <p>
            This platform is designed to be the ultimate universally compatible utility hub. It works seamlessly across Windows, macOS, Linux, and modern mobile operating systems without requiring any software installations or browser extensions. By offering professional-grade media shrinking capabilities entirely within the browser interface, we empower creators, marketers, educators, and everyday users to optimize their media workflows with unprecedented speed, total security, and uncompromising quality.
          </p>
        </article>

        {/* ❓ PART 3: FAQ SECTION (AdSense Loves This) */}
        <div className="border-t border-slate-100 dark:border-white/5 pt-8 mt-8 space-y-4">
          <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-3">
            <details className="group border border-slate-100 dark:border-white/[0.02] bg-transparent hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
              <summary className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">
                <span>Is it safe to compress private videos here?</span>
                <span className="text-blue-500 transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Yes, it is 100% safe. Our tool runs locally in your browser. Your video is never uploaded to any server, meaning nobody else can ever see or access your files.
              </p>
            </details>

            <details className="group border border-slate-100 dark:border-white/[0.02] bg-transparent hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
              <summary className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">
                <span>Are there any file size limits or hidden fees?</span>
                <span className="text-blue-500 transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                The service is completely free to use. Because the compression relies on your device's hardware rather than our cloud servers, you can compress files as large as your device's memory can handle without any paywalls.
              </p>
            </details>

            <details className="group border border-slate-100 dark:border-white/[0.02] bg-transparent hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
              <summary className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">
                <span>Which video format should I choose for social media?</span>
                <span className="text-blue-500 transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                For platforms like Instagram, YouTube, or Facebook, the <strong>.MP4</strong> format is universally recommended. It offers the best balance between small file sizes and high compatibility across all devices.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- */}
      {/* ⚡ PART 3.5: SPEED OPTIMIZATION & CACHE INFO (Simple English) */}
      {/* --------------------------------------------------------- */}
      <div id="speed-tips-section" className="w-full max-w-xl mx-auto mt-12 mb-12 p-6 bg-white dark:bg-[#0c0c12] rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm scroll-mt-24 px-4">
        
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          ⚡ How to Compress Videos Faster?
        </h3>

        <div className="space-y-4 text-left">
          <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">1. Use Google Chrome or Microsoft Edge</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">These browsers make video compression 2x faster than Safari or Firefox.</p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">2. Turn ON Hardware Acceleration in PC or Laptop</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Go to Browser Settings → System → Turn on "Use graphics acceleration when available". This gives heavy power to the tool.</p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">3. Close Other Tabs & Apps</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Close extra tabs (like YouTube, Facebook, or Games) before starting. This gives full machine speed to your video processing.</p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">4. Connect Charger & Turn Off Battery Saver</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">If using a laptop or phone, plug in your charger. Low battery mode slows down the processing speed.</p>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-xl">
            <h4 className="text-sm font-bold text-amber-800 dark:text-amber-400">⚠️ Important: Do Not Clear Browser Cache</h4>
            <p className="text-xs text-amber-700 dark:text-amber-500 mt-1">The core compression engine is safely stored in your browser memory for offline use. If you clear cache/history, it will download again next time.</p>
          </div>
        </div>

        {/* Return to Top Button & Ad Unit inside the box */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex flex-col items-center gap-4">
          <div className="text-[10px] text-slate-400 tracking-wider">[ MID-ARTICLE AUTO-ADS ZONE ]</div>
          <a
            href="#"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-black font-medium text-xs rounded-xl shadow-sm transition-all flex items-center gap-1 inline-block text-center"
          >
            ⬆️ Return to Compression
          </a>
        </div>
      </div>

      {/* 🚀 BOTTOM AD ZONE (The Exit Ad) */}
      <div className="w-full max-w-3xl mx-auto mb-10 py-6 bg-slate-100 dark:bg-white/[0.02] border border-dashed border-slate-300 dark:border-white/10 rounded-2xl text-center flex items-center justify-center min-h-[120px] shadow-sm">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase animate-pulse">
          [ Bottom Auto-Ads Zone ]
        </span>
      </div>

      {/* --------------------------------------------------------- */}
      {/* 🏢 PART 4: PREMIUM FOOTER (Legal & Trust Links) */}
      {/* --------------------------------------------------------- */}
      <footer className="w-full border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#060609] mt-10 px-4">
        <div className="max-w-6xl mx-auto py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Brand Copyright */}
          <div className="text-center md:text-left">
            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-2 py-0.5 rounded-md text-xs font-bold shadow-sm">CS</span>
              Useful Tools Zone
            </span>
            <p className="text-xs text-slate-500 mt-1">
              © 2026 Useful Tools Zone. All rights reserved.
            </p>
          </div>
          
          {/* Legal & Navigation Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <a href="/about" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">About Us</a>
            <a href="/privacy-policy" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Terms</a>
            <a href="/disclaimer" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Disclaimer</a>
            <a href="/contact" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Contact</a>
          </div>
          
        </div>
      </footer>

      {/* 🤖 GOOGLE STRUCTURED DATA SCHEMA (AdSense & SEO Booster) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Useful Tools Zone",
            "url": "https://usefultoolszone.com/",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "All",
            "browserRequirements": "Requires HTML5 and WebAssembly support.",
            "mainEntity": {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is it safe to compress private videos here?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "name": "Yes, it is 100% safe. Our tool runs locally in your browser via WebAssembly. Your video is never uploaded to any server, ensuring absolute privacy."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are there any file size limits or hidden fees?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "name": "The service is completely free to use. Because the compression relies on your device's hardware rather than cloud infrastructure, you can process files without constraints."
                  }
                }
              ]
            }
          })
        }}
      />

    </div>
  );
}