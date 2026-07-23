"use client";
import React, { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

// 1. Dynamic pSEO Dictionary (Complete Unique SEO Articles & FAQs for 100% Anti-Duplicate Protection)
const PSEO_CONTENT_DICTIONARY = {
  "youtube-thumbnail-downloader": {
    h1: "YouTube Thumbnail Downloader Online",
    sub: "Download Full HD 1080p & 4K Video Cover Images Instantly",
    desc: "Extract original maximum resolution cover images directly from official YouTube CDN servers in one click. 100% free with zero quality loss.",
    topBadge: "4K & 1080p HD Image Source",
    seoSection: {
      title1: "How to Download High-Resolution YouTube Cover Images Online?",
      para1: "Finding high-resolution cover graphics for creative benchmarking is essential for modern content creators and visual designers. YouTube thumbnail artwork serves as a video's primary digital storefront, directly controlling audience click-through rates (CTR) across mobile home feeds and desktop search results.",
      para2: "Our dedicated YouTube Thumbnail Downloader interfaces directly with official YouTube image Content Delivery Networks (CDNs). By pulling uncompressed artwork straight from the source, you can save original 1080p Full HD or 4K cover images without third-party quality drops or watermark overlays.",

      title2: "Technical Breakdown of YouTube Thumbnail Resolution Tiers",
      para2_intro: "When creators publish a video, YouTube automatically processes and stores multiple thumbnail image sizes to accommodate various screen sizes and network bandwidth conditions:",
      boxes: [
        {
          title: "Maximum Resolution (1080p / 4K)",
          desc: "1920 × 1080 pixels (16:9 Aspect Ratio). Represents the original uncompressed cover photo uploaded by the creator. Best for visual redesigns and high-density retina displays."
        },
        {
          title: "Standard Definition (SD)",
          desc: "640 × 480 pixels (4:3 Aspect Ratio). A balanced, medium-footprint image suitable for blog article embeds and fast mobile previews."
        },
        {
          title: "High Quality (HQ)",
          desc: "480 × 360 pixels. Lightweight mobile preview tile designed to minimize cellular data usage."
        }
      ],

      title3: "Why High-Quality Cover Images Directly Drive Video CTR",
      points: [
        {
          title: "1. Visual Contrast Benchmarking",
          desc: "Downloading top-performing competitor thumbnails allows designers to analyze color saturation, focal points, and typography scaling."
        },
        {
          title: "2. Direct CDN Source Retrieval",
          desc: "Retrieve raw image files directly from YouTube servers without compression artifacts or pixel distortion."
        },
        {
          title: "3. Serverless Local Processing",
          desc: "Extract image assets instantly inside your secure browser sandbox with 100% privacy and zero cloud server logs."
        }
      ],

      faqs: [
        {
          q: "Is downloading YouTube video thumbnail graphics legal?",
          a: "Yes, downloading thumbnail images for personal reference, visual research, design benchmarking, or educational analysis is completely legal under fair use guidelines."
        },
        {
          q: "Why do some older videos not display Full HD 1080p cover images?",
          a: "Full HD (1080p) thumbnails are only accessible if the original creator uploaded a high-resolution custom thumbnail. For older videos or auto-generated previews, YouTube defaults to Standard (640x480) quality."
        },
        {
          q: "Does this thumbnail downloader impose daily download limits?",
          a: "No. Useful Tools Zone operates entirely client-side, meaning you can extract and save unlimited high-definition cover photos for free without registration."
        }
      ]
    }
  },

  "youtube-metadata-extractor": {
    h1: "YouTube Video Metadata Extractor",
    sub: "Extract Titles, Channel Details & Competitor Video Info",
    desc: "Copy clean video titles, author links, and metadata logs instantly to analyze competitor CTR and optimize your YouTube SEO strategy.",
    topBadge: "One-Click Title Copy Engine",
    seoSection: {
      title1: "How to Extract YouTube Video Titles and Competitor Metadata?",
      para1: "Video metadata—including exact title phrasing, channel attribution, and structured tags—forms the backbone of YouTube's algorithmic discovery engine. Analyzing top-ranking videos in your niche provides actionable insights into keyword placement, emotional triggers, and audience retention hooks.",
      para2: "Our specialized Metadata Extractor parses official oEmbed protocols to isolate clean video titles and channel metadata instantly. This allows social media managers, SEO specialists, and media researchers to analyze competitor strategies without manual web scraping.",

      title2: "Key Components of Competitor Video Metadata Analysis",
      para2_intro: "Examining published video metadata offers crucial data points for crafting high-CTR titles and optimizing YouTube search performance:",
      boxes: [
        {
          title: "Exact Title Phrasing",
          desc: "Analyze character counts, front-loaded keywords, and curiosity gaps used by top-performing channel niches."
        },
        {
          title: "Channel Attribution",
          desc: "Inspect official channel names, creator profiles, and direct author URLs for competitor tracking."
        },
        {
          title: "Clean One-Click Copying",
          desc: "Strip hidden HTML formatting artifacts and copy video titles cleanly to your system clipboard for content calendar logging."
        }
      ],

      title3: "Strategic Advantages of Metadata Analysis for YouTube SEO",
      points: [
        {
          title: "1. Keyword & CTR Benchmarking",
          desc: "Compare title formulations against competitor thumbnails to identify visual and textual gaps in YouTube search feeds."
        },
        {
          title: "2. Rapid Content Calendar Logging",
          desc: "Extract and paste competitor title logs directly into research spreadsheets with one-click clipboard copying."
        },
        {
          title: "3. Privacy-First Search Execution",
          desc: "Perform video metadata queries locally within your browser sandbox without saving history or tracking queries."
        }
      ],

      faqs: [
        {
          q: "What specific metadata fields can I extract using this tool?",
          a: "You can extract the full official video title, author/channel name, channel profile URL, and direct high-resolution cover image links."
        },
        {
          q: "How does the One-Click 'Copy Title' engine benefit content managers?",
          a: "It automatically strips unwanted formatting characters, line breaks, or HTML entities, placing a clean text string directly onto your clipboard."
        },
        {
          q: "Does metadata extraction require YouTube API keys or credentials?",
          a: "No. Our tool uses open web oEmbed standards to fetch video details instantly without API keys or account sign-ups."
        }
      ]
    }
  },

  "youtube-thumbnail-and-metadata-extractor": {
    h1: "YouTube Thumbnail & Metadata Extractor",
    sub: "Download HD Thumbnails & Extract Video Metadata at One Place",
    desc: "Extract Full HD 1080p thumbnails and video titles instantly. 100% free, client-side, and private.",
    topBadge: "100% Private Browser Sandbox",
    seoSection: {
      title1: "How to Download YouTube Thumbnails and Extract Metadata Online?",
      para1: "In today's competitive creator economy, visual branding and title phrasing are the primary drivers of a YouTube video's Click-Through Rate (CTR). High-performing video thumbnails act as digital storefronts, while optimized titles tell the algorithm how to categorize your content.",
      para2: "Useful Tools Zone provides an all-in-one serverless YouTube Thumbnail & Metadata Extractor. By combining direct CDN image retrieval with instant title metadata copying at one place locally, content creators can benchmark competitors and gather design inspiration in seconds.",

      title2: "Technical Specifications of YouTube Assets & Metadata Tiers",
      para2_intro: "Our extraction engine processes both visual artwork and textual metadata simultaneously using open protocol layers:",
      boxes: [
        {
          title: "Maximum Resolution (1080p / 4K)",
          desc: "1920 × 1080 pixels (16:9). Direct original upload file from YouTube servers, perfect for redesigning."
        },
        {
          title: "Standard Definition (SD)",
          desc: "640 × 480 pixels (4:3). Medium resolution optimized for blog embeds and fast attachments."
        },
        {
          title: "Structured Video Metadata",
          desc: "Clean title string extraction paired with author channel attribution and direct CDN media endpoints."
        }
      ],

      title3: "Why Combining Thumbnail & Metadata Analysis Boosts Channel Growth",
      points: [
        {
          title: "1. Complete CTR Analysis",
          desc: "Evaluate how thumbnail visual contrast pairs with video title text to create irresistible click triggers."
        },
        {
          title: "2. All-in-One Local Workflow",
          desc: "Extract both graphics and text metadata simultaneously without switching between separate online utilities."
        },
        {
          title: "3. Zero-Upload Privacy Guarantee",
          desc: "Every query is processed locally in your browser RAM without tracking cookies or remote database storage."
        }
      ],

      faqs: [
        {
          q: "Is it safe and private to extract YouTube data here?",
          a: "Yes, 100% safe. All requests run locally inside your web browser sandbox. No video links, titles, or images are saved to any cloud server."
        },
        {
          q: "Does this tool support YouTube Shorts and mobile share links?",
          a: "Yes! Our algorithm parses standard watch URLs (`youtube.com/watch?v=...`), mobile short links (`youtu.be/...`), and YouTube Shorts (`youtube.com/shorts/...`)."
        },
        {
          q: "Are there any hidden fees or subscription paywalls?",
          a: "No. Useful Tools Zone provides all media optimization and extraction tools completely free to the public."
        }
      ]
    }
  }
};

export default function YoutubeToolContent({ forcedSlug }) {
  const activeSlug = forcedSlug || "youtube-thumbnail-and-metadata-extractor";
  const content = PSEO_CONTENT_DICTIONARY[activeSlug] || PSEO_CONTENT_DICTIONARY["youtube-thumbnail-and-metadata-extractor"];

  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("📋 Copy Title");

  const extractVideoId = (link) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = link.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const handleFetch = async () => {
    setError("");
    setVideoData(null);
    setCopyStatus("📋 Copy Title");

    if (!url.trim()) {
      setError("Please paste a valid YouTube video link.");
      return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError("Invalid YouTube URL format. Please paste a full watch link or Short URL.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
      const data = await response.json();

      if (data.error) {
        setError("Unable to extract data. The video might be private, age-restricted, or removed.");
        setLoading(false);
        return;
      }

      const thumbnails = {
        maxRes: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        sd: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
        hq: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      };

      setVideoData({
        id: videoId,
        title: data.title,
        author: data.author_name,
        authorUrl: data.author_url,
        thumbnails,
      });
    } catch (err) {
      setError("Network error occurred while fetching video details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async (imgUrl, qualityName) => {
    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `UTZ_YT_Thumbnail_${qualityName}_${videoData?.id || 'video'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      alert("Direct download blocked by browser security. Please right-click or long-press the thumbnail and choose 'Save Image As'.");
    }
  };

  const handleCopyTitle = () => {
    if (!videoData?.title) return;
    navigator.clipboard.writeText(videoData.title);
    setCopyStatus("✓ Copied!");
    setTimeout(() => {
      setCopyStatus("📋 Copy Title");
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-slate-50/60 dark:bg-[#060609] pt-24 pb-12 px-4">
      
      {/* TOP HEADER AD ZONE - PLAIN PLACEHOLDER */}
      <div className="w-full max-w-4xl mx-auto my-2 py-4 bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 text-center min-h-[90px] shadow-sm rounded-2xl select-none flex flex-col items-center justify-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">[ SPONSORED ADVERTISEMENT AREA ]</span>
      </div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] gap-8 mt-4">
        
        {/* LEFT PC SIDEBAR AD - PLAIN PLACEHOLDER */}
        <div className="hidden lg:flex min-h-[600px] sticky top-24 bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl items-center justify-center text-slate-400 text-xs shadow-sm flex flex-col p-2">
          <span className="text-[10px] font-bold tracking-widest uppercase mb-2 text-center">[ PC SIDEBAR AD 1 <br /> SKYSCRAPER ]</span>
        </div>

        {/* CENTER MAIN CONTENT MODULE */}
        <main className="w-full flex flex-col items-center justify-start space-y-6">
          
          {/* Header Section (Dynamic pSEO Headings) */}
          <div className="text-center space-y-2 max-w-2xl mx-auto animate-fadeIn">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              {content.h1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-extrabold">
                {content.sub}
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
              {content.desc}
            </p>

            {/* Dynamic Badges */}
            <div className="flex flex-wrap justify-center gap-2 pt-2 text-[10px] font-extrabold uppercase tracking-wider select-none">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-1 shadow-sm">
                {content.topBadge}
              </span>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-900/30 flex items-center gap-1 shadow-sm">
                Direct YouTube CDN Source
              </span>
            </div>
          </div>

          {/* Core Interactive Card */}
          <div className="relative group rounded-3xl w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur-md opacity-25"></div>
            <GlassCard className="relative w-full p-6 bg-white/90 dark:bg-black/80 border border-slate-200 dark:border-white/10 shadow-xl rounded-3xl z-10">
              
              {/* URL Input Form */}
              <div className="flex flex-col sm:flex-row gap-3 items-center w-full">
                <input
                  type="text"
                  placeholder="Paste YouTube Link (e.g., https://www.youtube.com/watch?v=...)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 dark:bg-gray-950 border-2 border-slate-200 dark:border-gray-800 focus:border-blue-500 rounded-xl text-sm font-bold text-gray-900 dark:text-white outline-none transition-all"
                />
                <button
                  onClick={handleFetch}
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] whitespace-nowrap disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Extracting..." : "Extract Data"}
                </button>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400 text-left">
                  {error}
                </div>
              )}

              {/* Extraction Results */}
              {videoData && (
                <div className="mt-8 space-y-6 animate-fadeIn">
                  
                  {/* Video Metadata Panel */}
                  <div className="p-4 bg-slate-50 dark:bg-gray-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 text-left space-y-2">
                    <h3 className="text-[10px] font-black tracking-widest text-blue-600 dark:text-blue-400 uppercase">Video Metadata Details</h3>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {videoData.title}
                    </h2>
                    <a href={videoData.authorUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-indigo-500 hover:underline block">
                      Channel: {videoData.author}
                    </a>
                    
                    {/* Copy Title Action Button */}
                    <button
                      type="button"
                      onClick={handleCopyTitle}
                      className="mt-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[11px] font-bold rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-all cursor-pointer inline-flex items-center gap-1 shadow-sm"
                    >
                      {copyStatus}
                    </button>
                  </div>

                  {/* IN-CARD MOBILE AD PLACEHOLDER */}
                  <div className="block lg:hidden w-full py-3 bg-slate-50 dark:bg-gray-950/40 rounded-xl border border-dashed border-slate-200 dark:border-gray-800 text-center">
                    <span className="text-[9px] text-slate-400 font-bold uppercase">[ Sponsored Mobile Content Zone ]</span>
                  </div>

                  {/* Thumbnail Cards Grid */}
                  <div className="space-y-4 text-left">
                    <h3 className="text-[10px] font-black tracking-widest text-blue-600 dark:text-blue-400 uppercase">Available Thumbnails</h3>
                    
                    {/* Full HD / 4K Primary Card */}
                    <div className="p-4 bg-white dark:bg-[#0c0c12] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 items-center">
                      <div className="w-full sm:w-1/2 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800 bg-black">
                        <img src={videoData.thumbnails.maxRes} alt="Full HD YouTube Thumbnail" className="w-full h-auto object-cover" />
                      </div>
                      <div className="w-full sm:w-1/2 space-y-3 text-center sm:text-left">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Full HD / 4K Quality (1080p)</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Original maximum resolution upload file from YouTube servers.</p>
                        </div>
                        <button 
                          onClick={() => downloadImage(videoData.thumbnails.maxRes, "Full_HD_1080p")}
                          className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                        >
                          Download HD Image
                        </button>
                      </div>
                    </div>

                    {/* Standard & Medium Quality Sub-grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3 bg-white dark:bg-[#0c0c12] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
                        <div className="overflow-hidden rounded-lg bg-black">
                          <img src={videoData.thumbnails.sd} alt="Standard Quality Thumbnail" className="w-full h-auto" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700 dark:text-gray-300">Standard Quality (640x480)</span>
                          <button onClick={() => downloadImage(videoData.thumbnails.sd, "SD_640p")} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-[10px] font-bold rounded-lg transition-all cursor-pointer">
                            Download
                          </button>
                        </div>
                      </div>

                      <div className="p-3 bg-white dark:bg-[#0c0c12] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
                        <div className="overflow-hidden rounded-lg bg-black">
                          <img src={videoData.thumbnails.hq} alt="Medium Quality Thumbnail" className="w-full h-auto" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700 dark:text-gray-300">Normal Quality (480x360)</span>
                          <button onClick={() => downloadImage(videoData.thumbnails.hq, "HQ_480p")} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-[10px] font-bold rounded-lg transition-all cursor-pointer">
                            Download
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </GlassCard>
          </div>

          {/* DYNAMIC 100% UNIQUE pSEO LONG-FORM ARTICLE SECTION */}
          <section className="w-full bg-white dark:bg-[#0c0c12] rounded-2xl p-6 sm:p-10 text-xs text-left text-slate-600 dark:text-gray-400 border border-slate-200/60 dark:border-white/5 shadow-sm space-y-10 mt-12">
            
            {/* Dynamic Article 1 */}
            <article className="space-y-4">
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                {content.seoSection.title1}
              </h2>
              <p className="leading-relaxed">
                {content.seoSection.para1}
              </p>
              <p className="leading-relaxed">
                {content.seoSection.para2}
              </p>
            </article>

            {/* Dynamic Article 2 Grid */}
            <article className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                {content.seoSection.title2}
              </h2>
              <p className="leading-relaxed">
                {content.seoSection.para2_intro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {content.seoSection.boxes.map((box, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-xl">
                    <h3 className="font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">
                      {box.title}
                    </h3>
                    <p className="text-[11px] leading-relaxed">
                      {box.desc}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* Dynamic Article 3 Bullet Points */}
            <article className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                {content.seoSection.title3}
              </h2>
              <div className="space-y-3">
                {content.seoSection.points.map((pt, idx) => (
                  <div key={idx} className="border-l-2 border-blue-500 pl-4 py-1">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200">
                      {pt.title}
                    </h3>
                    <p className="mt-1 leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* Dynamic In-Depth FAQ Accordion */}
            <div className="border-t border-slate-100 dark:border-white/5 pt-8 space-y-4">
              <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Frequently Asked Questions (FAQ)
              </h2>
              <div className="space-y-3">
                {content.seoSection.faqs.map((faq, idx) => (
                  <details key={idx} className="group border border-slate-100 dark:border-white/[0.04] bg-slate-50/50 dark:bg-black/20 transition-colors duration-200 rounded-xl p-4 cursor-pointer">
                    <summary className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wide select-none">
                      <span>{faq.q}</span>
                      <span className="text-blue-500 transition group-open:rotate-180">▲</span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-[11px]">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>

          </section>

          {/* BOTTOM LEADERBOARD AD - PLAIN PLACEHOLDER */}
          <div className="w-full min-h-[90px] bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-xl flex flex-col items-center justify-center text-slate-400 text-[10px] font-bold p-2 text-center shadow-sm mt-6">
             <span className="uppercase tracking-widest text-slate-400 mb-1">[ BOTTOM LEADERBOARD AD SPACE ]</span>
          </div>

        </main>

        {/* RIGHT PC SIDEBAR AD - PLAIN PLACEHOLDER */}
        <div className="hidden lg:flex min-h-[600px] sticky top-24 bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl items-center justify-center text-slate-400 text-xs shadow-sm flex flex-col p-2">
          <span className="text-[10px] font-bold tracking-widest uppercase mb-2 text-center">[ PC SIDEBAR AD 2 <br /> SKYSCRAPER ]</span>
        </div>

      </div>

      {/* SCHEMA JSON-LD STRUCTURED DATA FOR GOOGLE BOT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: content.h1,
              url: `https://usefultoolszone.com/${activeSlug}`,
              operatingSystem: "All",
              applicationCategory: "MultimediaApplication",
              description: content.desc,
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
          ]),
        }}
      />

    </div>
  );
}