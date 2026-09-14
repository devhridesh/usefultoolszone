"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";

export default function SmartYoutubeCardContent() {
  const searchParams = useSearchParams();
  const queryVideoId = searchParams.get("v");

  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [autoOpen, setAutoOpen] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // YouTube URL से 11 अंकों की Video ID निकालना
  const extractVideoId = (inputUrl) => {
    if (!inputUrl) return null;
    const cleanUrl = inputUrl.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) return cleanUrl;
    const regExp =
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = cleanUrl.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  // Video Data Fetch करना
  const fetchVideoInfo = async (vid) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${vid}`
      );
      const data = await res.json();
      if (data.error || !data.title) {
        setError("Unable to load video. It might be private or removed.");
        setLoading(false);
        return;
      }
      setVideoData({
        id: vid,
        title: data.title,
        author: data.author_name || "YouTube Creator",
        authorUrl: data.author_url || `https://www.youtube.com`,
        thumbnail: `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`,
      });
    } catch (err) {
      setError("Network error while loading video details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // अगर URL में ?v=VIDEO_ID पास हुआ हो तो तुरंत लोड करें
  useEffect(() => {
    if (queryVideoId) {
      const vid = extractVideoId(queryVideoId);
      if (vid) {
        fetchVideoInfo(vid);
        setAutoOpen(true);
      }
    }
  }, [queryVideoId]);

  // जब इनपुट से सबमिट करें
  const handleGenerate = (e) => {
    e?.preventDefault();
    if (!url.trim()) {
      setError("Please enter a YouTube video link.");
      return;
    }
    const vid = extractVideoId(url);
    if (!vid) {
      setError("Invalid YouTube URL. Supports watch, shorts, and youtu.be links.");
      return;
    }
    fetchVideoInfo(vid);
  };

  // डायरेक्ट ऐप ओपनर लॉजिक (Android Intent + iOS Scheme + Web Fallback)
  const handleOpenInApp = () => {
    if (!videoData?.id) return;
    const vid = videoData.id;
    const isAndroid = /android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isAndroid) {
      window.location.href = `intent://www.youtube.com/watch?v=${vid}#Intent;package=com.google.android.youtube;scheme=https;end`;
    } else if (isIOS) {
      window.location.href = `vnd.youtube://watch?v=${vid}`;
      setTimeout(() => {
        window.location.href = `https://www.youtube.com/watch?v=${vid}`;
      }, 1200);
    } else {
      window.open(`https://www.youtube.com/watch?v=${vid}`, "_blank");
    }
  };

  // ऑटो-ओपन टाइमर (जब कोई शेयर्ड लिंक खोले)
  useEffect(() => {
    if (autoOpen && videoData && countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (autoOpen && videoData && countdown === 0) {
      handleOpenInApp();
    }
  }, [autoOpen, videoData, countdown]);

  // स्मार्ट शेयर लिंक कॉपी करना
  const generatedShareLink = videoData
    ? `${typeof window !== "undefined" ? window.location.origin : "https://usefultoolszone.com"}/smart-youtube-card-opener?v=${videoData.id}`
    : "";

  const handleCopyLink = () => {
    if (!generatedShareLink) return;
    navigator.clipboard.writeText(generatedShareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // मोबाइल डायरेक्ट शेयर (Web Share API)
  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.canShare && videoData) {
      try {
        await navigator.share({
          title: videoData.title,
          text: `${videoData.title}\n\n▶ Watch in YouTube App:\n`,
          url: generatedShareLink,
        });
      } catch (err) {
        if (err.name !== "AbortError") handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-slate-50/60 dark:bg-[#060609] pt-24 pb-12 px-4">
      {/* Top Banner Ad Placeholder */}
      <div className="w-full max-w-4xl mx-auto my-2 py-4 bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 text-center min-h-[90px] shadow-sm rounded-2xl select-none flex flex-col items-center justify-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          [ SPONSORED ADVERTISEMENT AREA ]
        </span>
      </div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] gap-8 mt-4">
        {/* Left PC Sidebar Ad */}
        <div className="hidden lg:flex min-h-[600px] sticky top-24 bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl items-center justify-center text-slate-400 text-xs shadow-sm flex flex-col p-2">
          <span className="text-[10px] font-bold tracking-widest uppercase mb-2 text-center">
            [ PC SIDEBAR AD 1 ]
          </span>
        </div>

        {/* Center Main Content */}
        <main className="w-full flex flex-col items-center justify-start space-y-6">
          {/* Header Section */}
          <div className="text-center space-y-2 max-w-2xl mx-auto animate-fadeIn">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50/80 text-blue-600 dark:bg-blue-950/40 dark:border-blue-800/60 dark:text-blue-400 text-[11px] font-black uppercase tracking-wider shadow-sm mb-1 select-none">
              <span>⚡</span> 100% UNTRUNCATED CARD & DIRECT APP OPENER
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              Smart YouTube Card <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 font-extrabold">
                Full Title Preview & App Opener
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
              Eliminate truncated &apos;...&apos; titles on WhatsApp and Instagram. Generate complete preview cards that launch directly inside the official YouTube App.
            </p>
          </div>

          {/* Interactive Core Box */}
          <div className="relative group rounded-3xl w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur-md opacity-25"></div>
            <GlassCard className="relative w-full p-6 bg-white/90 dark:bg-black/80 border border-slate-200 dark:border-white/10 shadow-xl rounded-3xl z-10 space-y-6 text-left">
              {/* URL Input Form */}
              <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-3 items-center w-full">
                <input
                  type="text"
                  placeholder="Paste YouTube Link (e.g. https://youtu.be/aTTwBdphW64)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 dark:bg-gray-950 border-2 border-slate-200 dark:border-gray-800 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold text-gray-900 dark:text-white outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:brightness-110 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] whitespace-nowrap disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Loading..." : "Generate Card"}
                </button>
              </form>

              {/* Error Alert */}
              {error && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400">
                  {error}
                </div>
              )}

              {/* LIVE CARD PREVIEW CONTAINER */}
              {videoData && (
                <div className="space-y-6 animate-fadeIn pt-2">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Live Full-Title Card Preview
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/40">
                      100% Full Title Visible
                    </span>
                  </div>

                  {/* AUTO-OPEN BANNER (When accessed via direct shared link) */}
                  {autoOpen && (
                    <div className="p-3 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-xl flex items-center justify-between text-xs text-indigo-900 dark:text-indigo-200">
                      <span>
                        Opening in YouTube App in <strong>{countdown}s</strong>...
                      </span>
                      <button
                        type="button"
                        onClick={() => setAutoOpen(false)}
                        className="text-[10px] font-bold underline cursor-pointer text-indigo-600 dark:text-indigo-400"
                      >
                        Cancel Auto-Open
                      </button>
                    </div>
                  )}

                  {/* THE FULL CARD (No Title Cuts) */}
                  <div className="max-w-md mx-auto bg-white dark:bg-[#111116] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
                    {/* Thumbnail with 16:9 ratio and play badge */}
                    <div className="relative aspect-video w-full bg-black overflow-hidden group cursor-pointer" onClick={handleOpenInApp}>
                      <img
                        src={videoData.thumbnail}
                        alt={videoData.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${videoData.id}/hqdefault.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                          ▶
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-bold">
                        YouTube HD
                      </div>
                    </div>

                    {/* Card Content: Title is NEVER Truncated */}
                    <div className="p-4 sm:p-5 space-y-3 text-left">
                      <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug break-words">
                        {videoData.title}
                      </h2>

                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                          🔴 {videoData.author}
                        </span>
                        <span className="text-[11px] font-bold text-red-600 dark:text-red-400">
                          Official Video
                        </span>
                      </div>

                      {/* Open in YouTube App Button */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleOpenInApp}
                          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                        >
                          <span>▶</span>
                          <span>Open in YouTube App</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ACTION CONTROLS & SHARING */}
                  <div className="p-4 bg-slate-50 dark:bg-gray-900/60 rounded-2xl border border-slate-200 dark:border-gray-800 space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Shareable Smart Link (Opens direct app & full title)
                    </span>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        readOnly
                        value={generatedShareLink}
                        className="flex-1 px-3 py-2 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl text-xs font-mono text-slate-700 dark:text-slate-300 outline-none select-all"
                      />
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold rounded-xl shadow-sm transition active:scale-95 cursor-pointer whitespace-nowrap"
                      >
                        {copied ? "✓ Copied!" : "Copy Link"}
                      </button>
                      <button
                        type="button"
                        onClick={handleNativeShare}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition active:scale-95 cursor-pointer whitespace-nowrap"
                      >
                        Share via App
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      💡 <strong>Tip:</strong> Share this link on WhatsApp Status, Instagram Bio, or Telegram. When users tap it on Android or iOS, it bypasses the in-app browser and opens directly inside the YouTube App!
                    </p>
                  </div>
                </div>
              )}
            </GlassCard>
          </div>

          {/* pSEO Info & FAQ Section */}
          <section className="w-full bg-white dark:bg-[#0c0c12] rounded-2xl p-6 sm:p-10 text-xs text-left text-slate-600 dark:text-gray-400 border border-slate-200/60 dark:border-white/5 shadow-sm space-y-8 mt-12">
            <article className="space-y-3">
              <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Why Standard Social Media Previews Truncate YouTube Titles
              </h2>
              <p className="leading-relaxed">
                Platforms like WhatsApp, Instagram, and Telegram enforce strict character caps on link preview cards, often cutting important titles short with &quot;...&quot; ellipsis. Furthermore, clicking on standard links opens them in a limited in-app webview where users are frequently logged out, reducing subscriber conversion and watch time.
              </p>
              <p className="leading-relaxed">
                Our <strong>Smart YouTube Card & App Opener</strong> solves both problems: it displays the 100% full title cleanly and uses deep-linking protocols to route viewers directly into the official YouTube native app.
              </p>
            </article>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-xl">
                <h3 className="font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">
                  100% Free & Serverless
                </h3>
                <p className="text-[11px] leading-relaxed">
                  Fetches data using official open web protocols. Zero database tracking, no subscriptions, and instant client-side execution.
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-xl">
                <h3 className="font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">
                  Native Deep Linking
                </h3>
                <p className="text-[11px] leading-relaxed">
                  Utilizes Android Intents and iOS URL Schemes to trigger the YouTube application directly, ensuring likes and subscribes work smoothly.
                </p>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="border-t border-slate-100 dark:border-white/5 pt-6 space-y-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wide">
                Frequently Asked Questions
              </h3>
              <details className="group border border-slate-100 dark:border-white/[0.04] bg-slate-50/50 dark:bg-black/20 rounded-xl p-4 cursor-pointer">
                <summary className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-xs select-none">
                  <span>How does direct app opening help YouTube creators?</span>
                  <span className="text-blue-500 transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2.5 leading-relaxed text-[11px]">
                  When users open links in native apps instead of in-app browsers, they are already signed into their Google accounts, enabling instant likes, comments, and channel subscriptions with zero friction.
                </p>
              </details>
              <details className="group border border-slate-100 dark:border-white/[0.04] bg-slate-50/50 dark:bg-black/20 rounded-xl p-4 cursor-pointer">
                <summary className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-xs select-none">
                  <span>Does this support YouTube Shorts?</span>
                  <span className="text-blue-500 transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2.5 leading-relaxed text-[11px]">
                  Yes. You can paste standard watch links, mobile youtu.be shortlinks, or YouTube Shorts links. The engine extracts the correct video ID automatically.
                </p>
              </details>
            </div>
          </section>

          {/* Bottom Leaderboard Ad Space */}
          <div className="w-full min-h-[90px] bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-xl flex flex-col items-center justify-center text-slate-400 text-[10px] font-bold p-2 text-center shadow-sm mt-6">
            <span className="uppercase tracking-widest text-slate-400 mb-1">
              [ BOTTOM LEADERBOARD AD SPACE ]
            </span>
          </div>
        </main>

        {/* Right PC Sidebar Ad */}
        <div className="hidden lg:flex min-h-[600px] sticky top-24 bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl items-center justify-center text-slate-400 text-xs shadow-sm flex flex-col p-2">
          <span className="text-[10px] font-bold tracking-widest uppercase mb-2 text-center">
            [ PC SIDEBAR AD 2 ]
          </span>
        </div>
      </div>

      {/* Schema Structured Data for Google Bot */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Smart YouTube Card & App Opener",
            url: "https://usefultoolszone.com/smart-youtube-card-opener",
            operatingSystem: "All",
            applicationCategory: "MultimediaApplication",
            description:
              "Generate full-title preview cards and direct YouTube app-opener links.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </div>
  );
}