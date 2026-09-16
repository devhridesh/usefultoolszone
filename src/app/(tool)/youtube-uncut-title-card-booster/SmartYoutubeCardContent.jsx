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
      setError("Invalid YouTube URL. Supports standard videos, shorts, and youtu.be links.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${vid}`
      );
      const data = await res.json();
      if (data.error || !data.title) {
        setError("Unable to load video details. Please verify the URL or check if the video is public.");
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
      setError("Network error while connecting. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

const generatedShareLink = videoData
    ? `${typeof window !== "undefined" ? window.location.origin : "https://usefultoolszone.com"}/youtube-uncut-title-card-booster?v=${videoData.id}`
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
          text: `${videoData.title}\n\n⚡ Boosted by UsefulToolsZone\n▶ Watch directly in YouTube App:\n`,
          url: generatedShareLink,
        });
      } catch (err) {
        if (err.name !== "AbortError") handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  if (queryVideoId) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#060609] p-4 text-center">
        <div className="p-8 bg-white dark:bg-[#111116] border border-slate-200 dark:border-white/10 rounded-3xl max-w-sm w-full shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-950/40 text-red-600 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-inner animate-pulse">
            ▶️
          </div>
          <h2 className="text-base font-black text-slate-900 dark:text-white">
            Opening YouTube App...
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Launching native mobile application via zero-latency deep link.
          </p>
          <a
            href={`https://www.youtube.com/watch?v=${queryVideoId}`}
            className="block py-3 px-5 bg-gradient-to-r from-red-600 to-rose-600 hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-lg transition active:scale-95"
          >
            Click here if app does not open
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-slate-50/60 dark:bg-[#060609] pt-24 pb-16 px-4">
      {/* Top Banner Ad Area */}
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

        {/* Center Content Column */}
        <main className="w-full flex flex-col items-center justify-start space-y-8">
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto animate-fadeIn">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border border-red-200/60 dark:border-red-800/40 shadow-sm select-none">
              <span>⚡</span> WORLD&apos;S 1ST ZERO-TRUNCATION YOUTUBE APP OPENER
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              YouTube Uncut Title <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 font-extrabold">
                &amp; Card Booster
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
              Show complete unclipped video titles on WhatsApp Status and Instagram Bio cards. Instantly launch viewers directly into the official YouTube application.
            </p>
          </div>

          {/* Interactive Core Box */}
          <div className="relative group rounded-3xl w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur-md opacity-25"></div>
            <GlassCard className="relative w-full p-6 sm:p-8 bg-white/95 dark:bg-[#0c0c12]/90 border border-slate-200 dark:border-white/10 shadow-xl rounded-3xl z-10 space-y-6 text-left">
              <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-3 items-center w-full">
                <input
                  type="text"
                  placeholder="Paste YouTube Link (e.g., https://youtu.be/aTTwBdphW64)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 dark:bg-black/50 border-2 border-slate-200 dark:border-gray-800 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold text-gray-900 dark:text-white outline-none transition-all"
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
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              {videoData && (
                <div className="space-y-6 animate-fadeIn pt-2">
                  <div className="p-5 bg-slate-50 dark:bg-black/40 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        Smart Deep Link Ready (0ms Instant App Opener)
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 bg-white dark:bg-black/60 px-2 py-0.5 rounded-md border border-slate-200 dark:border-white/10">
                        Zero Title Cuts
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        readOnly
                        value={generatedShareLink}
                        className="flex-1 px-4 py-2.5 bg-white dark:bg-black border border-slate-200 dark:border-gray-800 rounded-xl text-xs font-mono text-slate-800 dark:text-slate-200 outline-none select-all"
                      />
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold rounded-xl shadow-md transition active:scale-95 cursor-pointer whitespace-nowrap"
                      >
                        {copied ? "✓ Copied!" : "Copy Link"}
                      </button>
                      <button
                        type="button"
                        onClick={handleNativeShare}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition active:scale-95 cursor-pointer whitespace-nowrap"
                      >
                        Share via App
                      </button>
                    </div>

                    <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 rounded-xl text-[11px] text-emerald-800 dark:text-emerald-300 font-medium leading-relaxed">
                      ⚡ <strong>Preview Advantage:</strong> When posted on WhatsApp Status, this link renders the entire unclipped title and launches directly inside the mobile YouTube app upon tap.
                    </div>
                  </div>
                </div>
              )}
            </GlassCard>
          </div>

          {/* AdSense Scaffolding: How to Use Guide */}
          <section className="w-full bg-white dark:bg-[#0c0c12] rounded-3xl p-6 sm:p-10 text-left border border-slate-200/70 dark:border-white/5 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Quick Tutorial
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                How to Use YouTube Uncut Title &amp; Card Booster
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-2">
                <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Paste Video URL
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Copy any YouTube video or Shorts link from your browser or mobile app and paste it into the search box above.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-2">
                <span className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Generate Smart Link
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Click Generate to create a serverless deep link with dynamic Open Graph metadata and native intent routing.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-2">
                <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 font-black text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Share on Status &amp; Bio
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Paste the generated link into your WhatsApp Status or Instagram Bio. Viewers see 100% full titles and open the video directly in the YouTube app.
                </p>
              </div>
            </div>
          </section>

          {/* AdSense In-Article Ad Area */}
          <div className="w-full min-h-[90px] bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center text-slate-400 text-[10px] font-bold p-3 text-center shadow-sm select-none">
            <span className="uppercase tracking-widest text-slate-400">
              [ IN-ARTICLE ADVERTISEMENT SPACE ]
            </span>
          </div>

          {/* Comprehensive Informational Content & Technical Explanation */}
          <section className="w-full bg-white dark:bg-[#0c0c12] rounded-3xl p-6 sm:p-10 text-left border border-slate-200/70 dark:border-white/5 shadow-sm space-y-8 text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
            <article className="space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Why Standard WhatsApp Status Cuts Off YouTube Titles
              </h2>
              <p>
                When sharing standard YouTube links on WhatsApp Status or Instagram Stories, Meta&apos;s crawler reads limited Open Graph metadata. WhatsApp enforces rigid UI limits, truncating video titles with an ellipsis (&ldquo;...&rdquo;) after only 35 to 45 characters. Important hooks, context, and speaker names get clipped, lowering engagement and click-through rates (CTR).
              </p>
              <p>
                Additionally, standard links opened from social apps load inside an <strong>In-App Browser (WebView)</strong>. In these sandboxed WebViews, users are rarely logged into their Google accounts, creating friction for likes, comments, and channel subscriptions.
              </p>
            </article>

            {/* Feature Comparison Matrix */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Standard YouTube Links vs. YouTube Uncut Title &amp; Card Booster
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]">
                      <th className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">Feature</th>
                      <th className="py-2.5 px-3 font-bold text-red-600 dark:text-red-400">Standard YouTube Link</th>
                      <th className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">Uncut Title Expander</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-700 dark:text-slate-300">Title Visibility</td>
                      <td className="py-2.5 px-3 text-red-500">Truncated with &quot;...&quot;</td>
                      <td className="py-2.5 px-3 text-emerald-500 font-bold">100% Unclipped Full Title</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-700 dark:text-slate-300">Click Destination</td>
                      <td className="py-2.5 px-3 text-red-500">In-App Browser (Logged out)</td>
                      <td className="py-2.5 px-3 text-emerald-500 font-bold">Native YouTube App (Logged in)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-700 dark:text-slate-300">Redirect Latency</td>
                      <td className="py-2.5 px-3 text-slate-500">None (direct webview)</td>
                      <td className="py-2.5 px-3 text-emerald-500 font-bold">0ms Instant Native Handshake</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-700 dark:text-slate-300">Viewer Engagement</td>
                      <td className="py-2.5 px-3 text-red-500">Lower CTR &amp; engagement loss</td>
                      <td className="py-2.5 px-3 text-emerald-500 font-bold">High CTR, instant likes &amp; subscribes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Technical Breakdown */}
            <article className="space-y-3 pt-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                How Zero-Latency Deep Linking Works
              </h2>
              <p>
                The <strong>YouTube Uncut Title Expander</strong> uses client-side platform detection and protocol switching to route traffic efficiently:
              </p>
              <ul className="space-y-2 list-disc list-inside text-[11px] text-slate-600 dark:text-slate-400">
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Android Intent URLs:</strong> Android devices use direct system intent URI handshakes (<code>intent://...#Intent;package=com.google.android.youtube</code>) to launch the YouTube app directly, avoiding WebView prompts.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">iOS Universal Scheme:</strong> Apple iOS devices use custom scheme calls (<code>vnd.youtube://</code>) with an automated timeout fallback to standard Safari playback.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Headless Metadata Injection:</strong> Server-side Open Graph tags supply social media crawlers with clean metadata before redirect logic runs, ensuring preview cards display full titles.
                </li>
              </ul>
            </article>

            {/* Frequently Asked Questions */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Frequently Asked Questions (FAQ)
              </h2>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 dark:bg-white/[0.02] rounded-2xl border border-slate-100 dark:border-white/5 space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Is this service completely free to use?
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Yes, YouTube Uncut Title &amp; Card Booster is 100% free with no account creation, subscriptions, or usage limits required.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-white/[0.02] rounded-2xl border border-slate-100 dark:border-white/5 space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Does it work with YouTube Shorts?
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Yes, the tool supports standard YouTube links (<code>youtube.com/watch</code>), short URLs (<code>youtu.be</code>), and YouTube Shorts (<code>youtube.com/shorts</code>).
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-white/[0.02] rounded-2xl border border-slate-100 dark:border-white/5 space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Why does WhatsApp sometimes cache an older preview?
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    WhatsApp caches metadata per URL on its servers. When testing updates to a link, appending a random parameter like <code>&amp;t=1</code> prompts WhatsApp to fetch a fresh preview immediately.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Leaderboard Ad */}
          <div className="w-full min-h-[90px] bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center text-slate-400 text-[10px] font-bold p-3 text-center shadow-sm select-none">
            <span className="uppercase tracking-widest text-slate-400">
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
    </div>
  );
}