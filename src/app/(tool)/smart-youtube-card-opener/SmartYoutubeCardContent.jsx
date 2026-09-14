"use client";

import React, { useState } from "react";
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

  const extractVideoId = (inputUrl) => {
    if (!inputUrl) return null;
    const cleanUrl = inputUrl.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) return cleanUrl;
    const regExp =
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = cleanUrl.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  const handleGenerate = async (e) => {
    e?.preventDefault();
    setError("");
    setVideoData(null);

    if (!url.trim()) {
      setError("Please paste a valid YouTube video link.");
      return;
    }
    const vid = extractVideoId(url);
    if (!vid) {
      setError("Invalid YouTube URL. Supports watch, shorts, and youtu.be links.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${vid}`
      );
      const data = await res.json();
      if (data.error || !data.title) {
        setError("Unable to load video details. The video might be private or removed.");
        setLoading(false);
        return;
      }
      setVideoData({
        id: vid,
        title: data.title,
        author: data.author_name || "YouTube Creator",
        thumbnail: `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`,
      });
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generatedShareLink = videoData
    ? `${typeof window !== "undefined" ? window.location.origin : "https://usefultoolszone.com"}/smart-youtube-card-opener?v=${videoData.id}`
    : "";

  const handleCopyLink = () => {
    if (!generatedShareLink) return;
    navigator.clipboard.writeText(generatedShareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

  // अगर कोई यूजर सीधे ?v= लिंक पर PC से आया हो और रीडायरेक्ट न हुआ हो
  if (queryVideoId) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#060609] p-4 text-center">
        <div className="p-6 bg-white dark:bg-[#111116] border border-slate-200 dark:border-white/10 rounded-2xl max-w-sm w-full shadow-lg space-y-4">
          <div className="text-3xl animate-bounce">▶️</div>
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Redirecting to YouTube App...
          </h2>
          <a
            href={`https://www.youtube.com/watch?v=${queryVideoId}`}
            className="block py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl"
          >
            Click here if not redirected
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-slate-50/60 dark:bg-[#060609] pt-24 pb-12 px-4">
      <div className="w-full max-w-4xl mx-auto my-2 py-4 bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 text-center min-h-[90px] shadow-sm rounded-2xl select-none flex flex-col items-center justify-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          [ SPONSORED ADVERTISEMENT AREA ]
        </span>
      </div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] gap-8 mt-4">
        <div className="hidden lg:flex min-h-[600px] sticky top-24 bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl items-center justify-center text-slate-400 text-xs shadow-sm flex flex-col p-2">
          <span className="text-[10px] font-bold tracking-widest uppercase mb-2 text-center">
            [ PC SIDEBAR AD 1 ]
          </span>
        </div>

        <main className="w-full flex flex-col items-center justify-start space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto animate-fadeIn">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border border-red-200/60 dark:border-red-800/40 shadow-sm mb-1 select-none">
              <span>⚡</span> 0ms INSTANT YOUTUBE APP OPENER
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              Smart YouTube Link <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 font-extrabold">
                Full Title Card &amp; Instant App Opener
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
              Generate links that display full video titles on WhatsApp and immediately launch the native YouTube mobile application in milliseconds.
            </p>
          </div>

          <div className="relative group rounded-3xl w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur-md opacity-25"></div>
            <GlassCard className="relative w-full p-6 bg-white/90 dark:bg-black/80 border border-slate-200 dark:border-white/10 shadow-xl rounded-3xl z-10 space-y-6 text-left">
              <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-3 items-center w-full">
                <input
                  type="text"
                  placeholder="Paste YouTube Link (e.g., https://youtu.be/aTTwBdphW64)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 dark:bg-gray-950 border-2 border-slate-200 dark:border-gray-800 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold text-gray-900 dark:text-white outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:brightness-110 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] whitespace-nowrap disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Extracting..." : "Generate Smart Link"}
                </button>
              </form>

              {error && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400">
                  {error}
                </div>
              )}

              {videoData && (
                <div className="space-y-6 animate-fadeIn pt-2">
                  <div className="p-4 bg-slate-50 dark:bg-gray-900/60 rounded-2xl border border-slate-200 dark:border-gray-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        ✓ Smart Deep Link Ready (0ms Instant App Opener)
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        Full Title Guaranteed
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        readOnly
                        value={generatedShareLink}
                        className="flex-1 px-3 py-2.5 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl text-xs font-mono text-slate-700 dark:text-slate-300 outline-none select-all"
                      />
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold rounded-xl shadow-sm transition active:scale-95 cursor-pointer whitespace-nowrap"
                      >
                        {copied ? "✓ Copied!" : "Copy Link"}
                      </button>
                      <button
                        type="button"
                        onClick={handleNativeShare}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition active:scale-95 cursor-pointer whitespace-nowrap"
                      >
                        Share Link
                      </button>
                    </div>

              
                  </div>
                </div>
              )}
            </GlassCard>
          </div>
        </main>

        <div className="hidden lg:flex min-h-[600px] sticky top-24 bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl items-center justify-center text-slate-400 text-xs shadow-sm flex flex-col p-2">
          <span className="text-[10px] font-bold tracking-widest uppercase mb-2 text-center">
            [ PC SIDEBAR AD 2 ]
          </span>
        </div>
      </div>
    </div>
  );
}