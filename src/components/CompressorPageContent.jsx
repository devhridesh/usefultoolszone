"use client";

import React from "react";
import GlassCard from "@/components/ui/GlassCard";
import CompressorContainer from "@/components/CompressorContainer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function CompressPage({ initialSize, platform }) {





  // 🌐 Safe Client-Side Language Link Preserver
  const [currentLang, setCurrentLang] = React.useState("en");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const syncInternalLinks = () => {
        const params = new URLSearchParams(window.location.search);
        setCurrentLang(params.get("lang") || "en");
      };

      syncInternalLinks(); // Initial track

      // Listen to navigation and custom state switches seamlessly
      window.addEventListener("popstate", syncInternalLinks);
      const fallbackPoll = setInterval(syncInternalLinks, 500);

      return () => {
        window.removeEventListener("popstate", syncInternalLinks);
        clearInterval(fallbackPoll);
      };
    }
  }, []);
  
// 🎯 Top Ribbon ke liye States
  const [showBookmarkBar, setShowBookmarkBar] = React.useState(false);
  const [isEngineDownloaded, setIsEngineDownloaded] = React.useState(false);

  // 🎯 Cache detect karne ke liye effect
  React.useEffect(() => {
    const isDismissed = localStorage.getItem("utz_bookmark_dismissed");
    if (!isDismissed) {
      setShowBookmarkBar(true);
    }

    const isCached = localStorage.getItem("utz_engine_cached");
    if (isCached === "true") {
      setIsEngineDownloaded(true);
    }
  }, []);




  // 🧠 स्मार्ट पेज डिटेक्शन और कम्पलीट एसईओ वैरिएबल्स (Missing dynamicParagraph Engine Re-injected)
  const isHomepage = !platform && !initialSize;

  const currentSlug = isHomepage
    ? ""
    : platform
      ? platform.toLowerCase() === "youtube shorts"
        ? "youtube-shorts"
        : platform.toLowerCase()
      : `${initialSize.toString().replace(/[^0-9]/g, "")}mb`;

  const dynamicUrl = `https://usefultoolszone.com/compress/${currentSlug}`;

  const dynamicName = isHomepage
    ? "Free Video Compressor Online - 100% Private & Fast"
    : platform && platform !== "Video"
      ? `${platform} Video Compressor Online`
      : `Compress Video to ${initialSize}MB Online`;

  // 🧠 यूजर साइकोलॉजी और एसईओ बूस्टर डिक्शनरी
  const descriptionDict = {
    "10mb":
      "⚡ Instant 10MB compression with pixel-perfect clarity. Ideal for quick Discord free-tier sharing and standard email attachments without losing high-density details. [100% Cookies Free]",
    "20mb":
      "✨ Shrink your videos down to exactly 20MB in seconds. Maintained via local hyper-precision algorithms to fit standard chat pipelines flawlessly with zero quality drops.",
    "40mb":
      "🎬 Heavy camera footage or raw clips? Compress down to 40MB cleanly. Strips unnecessary background data while keeping frames sharp and 100% watermark-free.",
    "50mb":
      "🚀 The perfect choice to scale high-definition files down to 50MB. Engineered for smooth web distribution and lightning-fast cloud transfers with zero server overhead.",
    whatsapp:
      "🟢 Share smooth HD media on WhatsApp instantly! Safely optimizes your clips to under 16MB to match the official status and chat limit without annoying blurriness. [Zero Data Logging]",
    gmail:
      "📧 Skip the 'Google Drive link' hassle. Compress video bitrates down to exactly 25MB to easily clear Gmail's official attachment limit with full audio-video sync.",
    tiktok:
      "🎵 Keep your TikTok views high with crisp quality! Intelligently resizes and compresses high-framerate clips to fit mobile constraints perfectly with zero pixelation drops.",
    instagram:
      "📸 Scale your clips down to 95MB to stay safely under Instagram's recommended upload cap. Perfect for crisp, fast-loading Reels and posts that grab attention.",
    "youtube-shorts":
      "🔴 Maximize your Shorts processing speed! Compresses files to the optimal 60MB threshold for instant HD rendering and high-retention streaming on mobile feeds.",
    wechat:
      "💬 Shrink heavy video files to exactly 25MB for WeChat chats. Bypasses file transfer blocks locally while preserving high-fidelity audio and original aspect ratios.",
    line: "🇯🇵 Max out your sharing capacity on the LINE app! Compresses files smoothly up to 200MB locally, ensuring rapid delivery and clear presentation inside your chat windows.",
    discord:
      "👾 Free tier upload limit slowing you down? Smash your video files under 10MB locally. Fits Discord's strict size constraints perfectly with crisp text and clean visuals.",
  pinterest:
      "📌 Optimize your pins with high visual retention! Intelligently compresses your video files down to the official 100MB threshold locally with smart SSIM pixel tuning to prevent text or border blurring on active boards.",
    };

  const dynamicParagraph = isHomepage
    ? "Looking for a secure way to shrink heavy files? Our advanced client-side core engine optimizes your video clips instantly inside your browser memory sandbox with pixel-perfect clarity, 100% offline processing, and zero tracking cookies."
    : descriptionDict[currentSlug.toLowerCase()] ||
      "Process, scale, and compress your high-density video clips directly inside your web browser secure memory sandboxes.";

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-slate-50 dark:bg-[#060609]">
      <div className="w-full fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="h-20 w-full"></div>


      {/* Main Content Area */}
      <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col items-center justify-center space-y-6 my-auto px-4">
        {/* Header Section (Psychologically optimized typography) */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {platform ? (
              <>
                Compress for {platform} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
                  Target Size: {initialSize} MB
                </span>
              </>
            ) : (
              <>
                Compress Videos Locally <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
                  Looks Exactly Like Original
                </span>
              </>
            )}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Your videos never leave your device. Fast, secure, and client-side
            modern encoding that works entirely in your browser memory.
            <span className="block mt-2 font-bold text-slate-900 dark:text-slate-200">
              Saves 100% of your internet bandwidth with zero server data usage!
            </span>
          </p>

          {/* dynamic text block hook for unique SEO value */}
          <div className="bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 dark:border-blue-500/20 rounded-xl p-3 max-w-xl mx-auto">
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium leading-relaxed">
              ℹ️ {dynamicParagraph}
            </p>
          </div>

          {/* Premium Data-Saver Trust Badges */}
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

          {/* TOP TRIGGER LINK (Instant Landing Visibility on Mobile) */}
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


{/* ⭐️ PRO-LEVEL DYNAMIC DISMISSIBLE BOOKMARK WIDGET */}
        {showBookmarkBar && (
          <div className="w-full max-w-2xl mx-auto bg-gradient-to-r from-blue-500/5 to-indigo-500/5 dark:from-blue-500/10 dark:to-indigo-500/10 border border-blue-500/20 dark:border-blue-500/30 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm relative animate-fadeIn px-5 mb-4">
            <div className="flex items-start sm:items-center gap-3 text-left">
              <span className="text-xl sm:text-2xl mt-0.5 sm:mt-0">
                {isEngineDownloaded ? "⚡" : "⭐️"}
              </span>
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                  {isEngineDownloaded ? (
                    "Core engine is already downloaded on your device! 🚀"
                  ) : (
                    "Bookmark Useful Tools Zone for Instant Access!"
                  )}
                </h4>
         <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                  {isEngineDownloaded ? (
                    <span>You can now compress videos instantly and completely offline. Bookmark this page so you never lose this super fast setup!</span>
                  ) : (
                    <span>First-time setup will download a one-time secure video engine (~9MB). Bookmark this page so you don't lose it!</span>
                  )}
                  <span className="block mt-1.5 hidden sm:inline text-[11px] text-slate-400">
                    💻 <strong>PC Shortcut:</strong> Press <kbd className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-700 px-1 py-0.5 rounded text-[10px] font-bold shadow-sm mx-0.5">Ctrl + D</kbd> (Mac: <kbd className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-700 px-1 py-0.5 rounded text-[10px] font-bold shadow-sm mx-0.5">Cmd + D</kbd>)
                  </span>
                  <span className="block mt-1.5 sm:hidden text-[11px] text-slate-400">
                    📱 <strong>Mobile Guide:</strong> Tap <span className="font-bold">⋮</span> or <span className="font-bold">Share</span> → <span className="text-blue-600 dark:text-blue-400 font-bold">Add to Home Screen</span>
                  </span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                localStorage.setItem("utz_bookmark_dismissed", "true");
                setShowBookmarkBar(false);
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all text-sm p-1 hover:bg-slate-200/50 dark:hover:bg-white/10 rounded-lg cursor-pointer"
              title="Don't show again"
            >
              ✕
            </button>
          </div>
        )}


        {/* MASTER GRID: Layout for maximum Ad viewability on PC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start mt-4">
          {/* LEFT SIDE PC AD - Only visible on Large Screens (PC) */}
          <div className="hidden lg:block lg:col-span-3 h-[600px] sticky top-24 bg-slate-50 dark:bg-white/[0.02] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl flex items-center justify-center text-center">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              [ PC SIDEBAR AD 1 <br /> 300x600 ]
            </span>
          </div>

          {/* CENTER - The Core Compressor Box */}
          <div className="col-span-1 lg:col-span-6 w-full max-w-2xl mx-auto">
            <div className="relative group transition-all duration-500 hover:-translate-y-1 rounded-2xl w-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-25 transition duration-500"></div>

              <GlassCard className="relative w-full p-6 z-10 ring-1 ring-slate-200/50 dark:ring-white/5 shadow-xl">
                <CompressorContainer
                  initialSize={initialSize}
                  platform={platform}
                />
              </GlassCard>
            </div>
          </div>

          {/* RIGHT SIDE PC AD - Only visible on Large Screens (PC) */}
          <div className="hidden lg:block lg:col-span-3 h-[600px] sticky top-24 bg-slate-50 dark:bg-white/[0.02] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl flex items-center justify-center text-center">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              [ PC SIDEBAR AD 2 <br /> 300x600 ]
            </span>
          </div>
        </div>
      </div>

      {/* 🌐 VERIFIED INTERNAL LINKING MATRIX GRID */}
      <div className="w-full max-w-3xl mx-auto mt-10 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            {
              slug: "10mb",
              label: "Compress 10MB",
              className:
                "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 text-gray-700 dark:text-gray-300 font-semibold",
            },
            {
              slug: "20mb",
              label: "Compress 20MB",
              className:
                "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 text-gray-700 dark:text-gray-300 font-semibold",
            },
            {
              slug: "40mb",
              label: "Compress 40MB",
              className:
                "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 text-gray-700 dark:text-gray-300 font-semibold",
            },
            {
              slug: "50mb",
              label: "Compress 50MB",
              className:
                "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 text-gray-700 dark:text-gray-300 font-semibold",
            },
            {
              slug: "tiktok",
              label: "TikTok Video",
              className:
                "bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-black dark:hover:border-white text-gray-900 dark:text-white font-bold",
            },
            {
              slug: "instagram",
              label: "Instagram (95MB)",
              className:
                "bg-pink-50/40 dark:bg-pink-950/10 border border-pink-200 dark:border-pink-900/50 hover:border-pink-500 text-pink-600 dark:text-pink-400 font-bold",
            },
            {
              slug: "youtube-shorts",
              label: "YouTube Shorts (60MB)",
              className:
                "bg-red-50/40 dark:bg-red-950/10 border border-red-200 dark:border-red-900/50 hover:border-red-500 text-red-600 dark:text-red-400 font-bold",
            },
            {
              slug: "whatsapp",
              label: "WhatsApp (16MB)",
              className:
                "bg-green-50/40 dark:bg-green-950/10 border border-green-200 dark:border-green-900/50 hover:border-green-500 text-green-600 dark:text-green-400 font-bold",
            },
            {
              slug: "wechat",
              label: "WeChat (25MB)",
              className:
                "bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold",
            },
            {
              slug: "line",
              label: "LINE App (200MB)",
              className:
                "bg-lime-50/40 dark:bg-lime-950/10 border border-lime-200 dark:border-lime-900/50 hover:border-lime-500 text-lime-600 dark:text-lime-400 font-bold",
            },
            {
              slug: "discord",
              label: "Discord (10MB)",
              className:
                "bg-indigo-50/40 dark:bg-indigo-950/10 border border-indigo-200 dark:border-indigo-900/50 hover:border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold",
            },
            
            {
              slug: "gmail",
              label: "Gmail (25MB)",
              className:
                "bg-rose-50/40 dark:bg-rose-950/10 border border-rose-200 dark:border-rose-900/50 hover:border-rose-500 text-rose-600 dark:text-rose-400 font-bold",
            },
            
            { // 📌 PINTEREST GRID BUTTON ADDED HERE
              slug: "pinterest",
              label: "Pinterest (100MB)",
              className:
                "bg-rose-50/40 dark:bg-rose-950/10 border border-rose-200 dark:border-rose-900/50 hover:border-rose-500 text-rose-600 dark:text-rose-400 font-bold",
            },
          ].map((item) => (
            <Link
              key={item.slug}
              href={`/compressor/${item.slug}?lang=${currentLang}`}
              className={`text-center p-3 rounded-lg transition-all text-sm shadow-sm flex items-center justify-center border ${item.className}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* 🎬 FFmpeg Supported Video Formats & Codecs Ultimate Immersive Grid */}
      <section className="w-full max-w-3xl mx-auto mt-12 bg-white dark:bg-[#0c0c12] rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] px-4">
        <div className="border-b border-slate-100 dark:border-white/5 pb-4 mb-6">
          <h2 className="text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
            Supported Video Formats & Codecs
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {/* 1. MP4 */}
          <div className="p-4 bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-blue-300 dark:hover:border-blue-900 group">
            <span className="text-sm font-black text-blue-600 dark:text-blue-400 tracking-wide group-hover:animate-pulse">
              .MP4
            </span>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">
              H.264 / MPEG-4 Baseline, Main & High Profiles for Universal Web
              Playback.
            </p>
          </div>

          {/* 2. WEBM */}
          <div className="p-4 bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-cyan-300 dark:hover:border-cyan-900 group">
            <span className="text-sm font-black text-cyan-600 dark:text-cyan-400 tracking-wide group-hover:animate-pulse">
              .WEBM
            </span>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">
              VP8 / VP9 Native Web Stream Optimization for Modern HTML5
              Browsers.
            </p>
          </div>

          {/* 3. MOV */}
          <div className="p-4 bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-purple-300 dark:hover:border-purple-900 group">
            <span className="text-sm font-black text-purple-600 dark:text-purple-400 tracking-wide group-hover:animate-pulse">
              .MOV
            </span>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">
              Apple QuickTime Dynamic Codec Wrappers (Ideal for iOS, Mac &
              ProRes).
            </p>
          </div>

          {/* 4. MKV */}
          <div className="p-4 bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-rose-300 dark:hover:border-rose-900 group">
            <span className="text-sm font-black text-rose-600 dark:text-rose-400 tracking-wide group-hover:animate-pulse">
              .MKV
            </span>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">
              Matroska Containers for High-Quality Multi-track Audio, Video &
              Subtitles.
            </p>
          </div>

          {/* 5. AVI */}
          <div className="p-4 bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-teal-300 dark:hover:border-teal-900 group">
            <span className="text-sm font-black text-teal-600 dark:text-teal-400 tracking-wide group-hover:animate-pulse">
              .AVI
            </span>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">
              Audio Video Interleave (Classic high-compatibility Windows legacy
              container).
            </p>
          </div>

          {/* 6. FLV */}
          <div className="p-4 bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-orange-300 dark:hover:border-orange-900 group">
            <span className="text-sm font-black text-orange-600 dark:text-orange-400 tracking-wide group-hover:animate-pulse">
              .FLV
            </span>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">
              Flash Video Stream formats widely used in older streaming legacy
              ecosystems.
            </p>
          </div>

          {/* 7. WMV */}
          <div className="p-4 bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-900 group">
            <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 tracking-wide group-hover:animate-pulse">
              .WMV
            </span>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">
              Windows Media Video codec architecture optimized for PC software
              frameworks.
            </p>
          </div>

          {/* 8. 3GP */}
          <div className="p-4 bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-900 group">
            <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 tracking-wide group-hover:animate-pulse">
              .3GP
            </span>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">
              3GPP Multimedia mobile stream architecture designed for compact
              compression.
            </p>
          </div>

          {/* 9. MPEG */}
          <div className="p-4 bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-violet-300 dark:hover:border-violet-900 group">
            <span className="text-sm font-black text-violet-600 dark:text-violet-400 tracking-wide group-hover:animate-pulse">
              .MPEG
            </span>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">
              Moving Picture Experts Group format used in digital TV and media
              broadcast.
            </p>
          </div>

          {/* 10. M4V */}
          <div className="p-4 bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-fuchsia-300 dark:hover:border-fuchsia-900 group">
            <span className="text-sm font-black text-fuchsia-600 dark:text-fuchsia-400 tracking-wide group-hover:animate-pulse">
              .M4V
            </span>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">
              Apple iTunes layout container wrapper mapping enhanced safe
              chapter options.
            </p>
          </div>

          {/* 11. TS */}
          <div className="p-4 bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-sky-300 dark:hover:border-sky-900 group">
            <span className="text-sm font-black text-sky-600 dark:text-sky-400 tracking-wide group-hover:animate-pulse">
              .TS
            </span>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">
              MPEG Transport Stream utilized primarily for real-time live IPTV
              streaming pipelines.
            </p>
          </div>

          {/* 12. Web Audio / M4A */}
          <div className="p-4 bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-amber-300 dark:hover:border-amber-900 group">
            <span className="text-sm font-black text-amber-600 dark:text-amber-400 tracking-wide group-hover:animate-pulse">
              Web Audio
            </span>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">
              Advanced FFmpeg demuxing arrays supporting structural multi-codec
              streams flawlessly.
            </p>
          </div>
        </div>
      </section>

      {/* MID-PAGE AD ZONE */}
      <div className="w-full max-w-3xl mx-auto mt-10 py-6 bg-slate-100 dark:bg-white/[0.02] border border-dashed border-slate-300 dark:border-white/10 rounded-2xl text-center flex items-center justify-center min-h-[120px] shadow-sm">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase animate-pulse">
          [ Mid-Article Auto-Ads Zone ]
        </span>
      </div>

      {/* 500+ WORDS SEO & Content Block */}
      <section className="w-full max-w-3xl mx-auto mt-8 bg-white dark:bg-[#0c0c12] rounded-2xl p-6 md:p-10 space-y-12 text-sm leading-relaxed text-slate-500 dark:text-gray-400 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] px-4">
        <article className="space-y-4">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            How to Compress Videos Online Without Losing Quality?
          </h2>
          <p>
            In today's digital era, high-definition recording devices, 4K
            smartphone cameras, and advanced DSLR lenses have made capturing
            high-quality video easier than ever. However, this massive leap in
            visual clarity comes with a significant drawback: massive file
            sizes. Uncompressed or high-bitrate video files consume enormous
            amounts of storage space on your hard drive, exhaust your monthly
            cloud storage quotas, and make sharing media across email or social
            networks nearly impossible. This is exactly where our advanced
            online video compressor steps in to solve the problem efficiently
            and securely.
          </p>
          <p>
            Traditional methods of shrinking video sizes often result in a
            heavily pixelated, blurry, or unwatchable output. Useful Tools Zone
            utilizes a next-generation hybrid encoding algorithm that
            intelligently analyzes the spatial and temporal redundancy within
            your media. By dynamically adjusting the bitrate and stripping away
            unnecessary background data bits while preserving the core visual
            frames, our tool ensures that the compressed output looks exactly
            like the original. You can easily reduce a 500MB video down to 50MB
            without any noticeable drop in visual fidelity.
          </p>
        </article>

        <article className="space-y-4">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            The Ultimate Privacy Advantage: 100% Local Browser Processing
          </h2>
          <p>
            The biggest hidden danger of using conventional free online video
            compressors is data privacy. When you use standard web tools, they
            force you to upload your personal, confidential, or sensitive
            corporate videos to their remote cloud servers. This exposes your
            private data to potential network interception, unauthorized
            server-side storage, and third-party data logging. You lose total
            control over your files the moment you hit the upload button.
          </p>
          <p>
            Useful Tools Zone completely revolutionizes this workflow by
            utilizing cutting-edge Client-Side WebAssembly (Wasm) architecture.
            When you select a video on our platform, it is never uploaded to the
            internet. Instead, the video is securely loaded directly into your
            web browser's isolated memory sandbox. The entire compression
            process—from frame decoding to bitrate reduction and final
            encoding—happens locally using your device's own CPU and GPU power.
            Once the compression is complete, the temporary memory is instantly
            wiped clean. Zero uploads, zero server storage, and absolute 100%
            privacy for your digital assets.
          </p>
        </article>

        {/* FAQ SECTION */}
        <div className="border-t border-slate-100 dark:border-white/5 pt-8 mt-8 space-y-4">
          <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            <details className="group border border-slate-100 dark:border-white/[0.02] bg-transparent hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
              <summary className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">
                <span>Is it safe to compress private videos here?</span>
                <span className="text-blue-500 transition group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Yes, it is 100% safe. Our tool runs locally in your browser.
                Your video is never uploaded to any server, meaning nobody else
                can ever see or access your files.
              </p>
            </details>

            <details className="group border border-slate-100 dark:border-white/[0.02] bg-transparent hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
              <summary className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">
                <span>Are there any file size limits or hidden fees?</span>
                <span className="text-blue-500 transition group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                The service is completely free to use. Because the compression
                relies on your device's hardware rather than our cloud servers,
                you can compress files as large as your device's memory can
                handle without any paywalls.
              </p>
            </details>
          </div>
        </div>
      </section>

{/* SPEED OPTIMIZATION TIPS */}
      <div
        id="speed-tips-section"
        className="w-full max-w-xl mx-auto mt-12 mb-12 p-6 bg-white dark:bg-[#0c0c12] rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm scroll-mt-24 px-4"
      >
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          ⚡ How to Compress Videos Faster?
        </h3>
        <div className="space-y-4 text-left">
          {/* Point 1 */}
          <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">
              1. Use Google Chrome or Microsoft Edge
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              These browsers make video compression 2x faster than Safari or
              Firefox due to advanced WebAssembly multi-threading execution.
            </p>
          </div>
          
          {/* Point 2 */}
          <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">
              2. Turn ON Hardware Acceleration in PC or Laptop
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Go to Browser Settings → System → Turn on &quot;Use graphics
              acceleration when available&quot; to utilize your local GPU hardware cores.
            </p>
          </div>

          {/* Point 3 */}
          <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">
              3. Keep this Browser Tab Active & Open
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Modern browsers aggressively freeze or throttle background processing to save power. If you switch tabs, compression slows down significantly.
            </p>
          </div>

          {/* Point 4 */}
          <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">
              4. Keep Mobile Screen Awake & Free Up RAM
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              On smartphones, prevent the screen from sleeping and close heavy background apps so the browser can capture maximum native CPU processing power.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex flex-col items-center gap-4">
          <div className="text-[10px] text-slate-400 tracking-wider">
            [ MID-ARTICLE AUTO-ADS ZONE ]
          </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-black font-medium text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 inline-block text-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-3.5 h-3.5 inline-block align-middle notranslate"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
            <span className="align-middle">Click here to return to compression</span>
          </a>
        </div>
      </div>

      {/* BOTTOM AD ZONE */}
      <div className="w-full max-w-3xl mx-auto mb-10 py-6 bg-slate-100 dark:bg-white/[0.02] border border-dashed border-slate-300 dark:border-white/10 rounded-2xl text-center flex items-center justify-center min-h-[120px] shadow-sm">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase animate-pulse">
          [ Bottom Auto-Ads Zone ]
        </span>
      </div>

      {/* PREMIUM FOOTER */}
      <footer className="w-full border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#060609] mt-10 px-4">
        <div className="max-w-6xl mx-auto py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-2 py-0.5 rounded-md text-xs font-bold shadow-sm">
                UTZ
              </span>
              Useful Tools Zone
            </span>
            <p className="text-xs text-slate-500 mt-1">
              © 2026 Useful Tools Zone. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <a
              href="/about"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              About Us
            </a>
            <a
              href="/privacy-policy"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Terms
            </a>
            <a
              href="/disclaimer"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Disclaimer
            </a>
            <a
              href="/contact"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* SCHEMA ENGINE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: dynamicName,
              url: dynamicUrl,
              operatingSystem: "All",
              applicationCategory: "MultimediaApplication",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
          ]),
        }}
      />
    </div>
  );
}
