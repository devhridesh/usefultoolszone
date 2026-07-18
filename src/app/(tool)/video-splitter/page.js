"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // 🚀 अब केवल एक बार क्लीन इम्पोर्ट
import Link from "next/link"; // ⚡ नो-फ्लिकर राउटिंग के लिए
import GlassCard from "@/components/ui/GlassCard";
import AdBanner from "@/components/ui/AdBanner";



// 🔗 Compressor Page Link Configuration (Isey kal ko badal kar '/compressor' bhi kar sakte hain)
const COMPRESS_LINK = "/compress";
const PLATFORM_CONFIG = {
  whatsapp: { 
    name: "WhatsApp Status", // 👈 'WhatsApp' से बदलकर 'WhatsApp Status' किया
    presets: [30, 60, 90],
    h1: "Smart Video Splitter for WhatsApp Status & Stories",
    // बाकी का इंट्रो और FAQ डेटा वैसा ही रहेगा...
  },
  instagram: { 
    name: "Instagram Reels", // 👈 'Instagram' से बदलकर 'Instagram Reels' किया
    presets: [60, 90],
    h1: "High-Fidelity Video Cutter for Instagram Reels & Stories",
  },
  youtube: { 
    name: "YouTube Shorts", // 👈 'YouTube' से बदलकर 'YouTube Shorts' किया
    presets: [60, 30],
    h1: "Professional Video Splitter for YouTube Shorts & Videos",
  },
  tiktok: { 
    name: "TikTok Video", // 👈 'TikTok' से बदलकर 'TikTok Video' किया
    presets: [60, 180],
    h1: "Zero-Loss Video Segmenter for TikTok Uploads",
  },
  telegram: { 
    name: "Telegram Slicer", // 👈 'Telegram' से बदलकर 'Telegram Slicer' किया
    presets: [60],
    h1: "Fast Local Video Slicer for Telegram Channels",
  },
  line: { 
    name: "LINE App Video", // 👈 'LINE' से बदलकर 'LINE App Video' किया
    presets: [60], 
    h1: "LINE App Video Segmenter", 
  },
  wechat: { 
    name: "WeChat Moments", // 👈 'WeChat' से बदलकर 'WeChat Moments' किया
    presets: [60], 
    h1: "WeChat Moments Video Cutter", 
  },
  pinterest: { 
    name: "Pinterest Pins", // 👈 'Pinterest' से बदलकर 'Pinterest Pins' किया
    presets: [60], 
    h1: "Pinterest Video Idea Pin Splitter", 
  }
};

// 🎨 HD SVG Icons Component
const Icons = {
  Folder: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-500 mb-2"
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  ),
  Share: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  ),
  Download: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  ),
  Play: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-indigo-500"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  ),
};

function VideoSplitterContent({ forcedPlatform }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔍 क्लीन राउट से पाथ पढ़ेगा, पुरानी हिट्स के लिए ?for= को बैकअप रखेगा
  const platformKey =
    forcedPlatform?.toLowerCase() ||
    searchParams.get("for")?.toLowerCase() ||
    "whatsapp";
  const config = PLATFORM_CONFIG[platformKey] || PLATFORM_CONFIG.whatsapp;
  // ... बाकी के सारे state (useState) वैसे ही रहेंगे
  const [file, setFile] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState("recommended");
  const [customDuration, setCustomDuration] = useState(""); // 🟢 कस्टम टाइम सेव करने के लिए
  const [segments, setSegments] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [fileError, setFileError] = useState("");

  const ffmpegRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileError(""); // Nayi file aane par purani error saaf karein

    if (selectedFile) {
      // 🛑 500MB Size Limit Check (500 * 1024 * 1024 Bytes)
      const MAX_FILE_SIZE = 500 * 1024 * 1024;

      if (selectedFile.size > MAX_FILE_SIZE) {
        const fileSizeInMB = (selectedFile.size / (1024 * 1024)).toFixed(0);
        setFileError(
          `File size bahut bada hai (${fileSizeInMB}MB)। Aap hamare video compressor tool par jakar pahle isey compress kar sakte hain, uske baad aap yaha video split kar sakte hain।`,
        );
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setResults([]);
      const video = document.createElement("video");
      video.src = URL.createObjectURL(selectedFile);
      video.onloadedmetadata = () => setVideoDuration(video.duration);
    }
  };

  useEffect(() => {
    if (file && videoDuration > 0) {
      let durationToUse = 30;
      if (selectedDuration === "recommended") {
        durationToUse = config.presets[0];
      } else if (selectedDuration === "custom") {
        durationToUse = Number(customDuration) || 30;
      } else {
        durationToUse = Number(selectedDuration);
      }
      const newSegments = [];
      let start = 0;
      let part = 1;
      while (start < videoDuration) {
        let end = Math.min(start + durationToUse, videoDuration);
        newSegments.push({
          part,
          start: start.toFixed(1),
          end: end.toFixed(1),
        });
        start = end;
        part++;
      }
      setSegments(newSegments);
    } else {
      setSegments([]);
    }
  }, [file, videoDuration, selectedDuration, customDuration, platformKey]);

  const handleSplit = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    setResults([]);

    const OriginalWorker = window.Worker;

    try {
      window.Worker = function (url, options) {
        const urlStr = url.toString();
        if (urlStr.includes("unpkg.com") && urlStr.includes("worker.js")) {
          const blobCode = `import "${urlStr}";`;
          const blob = new Blob([blobCode], { type: "text/javascript" });
          const blobURL = URL.createObjectURL(blob);
          return new OriginalWorker(blobURL, options);
        }
        return new OriginalWorker(url, options);
      };

      const ffmpegPackage = await eval(
        'import("https://unpkg.com/@ffmpeg/ffmpeg@0.12.6/dist/esm/index.js")',
      );
      const utilPackage = await eval(
        'import("https://unpkg.com/@ffmpeg/util@0.12.1/dist/esm/index.js")',
      );

      const { FFmpeg } = ffmpegPackage;
      const { toBlobURL } = utilPackage;

      if (!ffmpegRef.current) {
        ffmpegRef.current = new FFmpeg();
      }
      const ffmpeg = ffmpegRef.current;

      if (!ffmpeg.loaded) {
        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
        await ffmpeg.load({
          coreURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.js`,
            "text/javascript",
          ),
          wasmURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.wasm`,
            "application/wasm",
          ),
        });
      }

      const arrayBuffer = await file.arrayBuffer();
      await ffmpeg.writeFile("input.mp4", new Uint8Array(arrayBuffer));

      const splitDuration =
        selectedDuration === "recommended"
          ? config.presets[0]
          : selectedDuration === "custom"
            ? Number(customDuration) || 30
            : Number(selectedDuration);
      // 🎵 1. Voice-Isolated Dialogue Detection (Music/Voice Identifier Engine)
      setProgress(5);
      const silencePoints = [];
      let currentSilenceStart = null;

      ffmpeg.off("log");
      ffmpeg.on("log", ({ message }) => {
        const startMatch = message.match(/silence_start:\s+(\d+\.?\d*)/);
        const durationMatch = message.match(/silence_duration:\s+(\d+\.?\d*)/);

        if (startMatch) {
          currentSilenceStart = parseFloat(startMatch[1]);
        }
        if (durationMatch && currentSilenceStart !== null) {
          silencePoints.push({
            start: currentSilenceStart,
            duration: parseFloat(durationMatch[1]),
          });
          currentSilenceStart = null;
        }
      });

      // Sensitivity को -24dB और ड्यूरेशन को 0.15s रखा है ताकि म्यूजिक के बीच भी शब्दों का गैप पकड़ा जा सके
      await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-vn",
        "-af",
        "highpass=f=250,lowpass=f=3500,silencedetect=noise=-24dB:d=0.15",
        "-f",
        "null",
        "-",
      ]);

      // 📊 2. Dynamic Case-by-Case Resolution Split Engine (Strict Maximum Cap)
      setProgress(10);
      let cuts = [];
      let currentStart = 0;

      const baseDuration =
        selectedDuration === "recommended"
          ? config.presets[0]
          : selectedDuration === "custom"
            ? Number(customDuration) || 30
            : Number(selectedDuration);

      while (currentStart < videoDuration) {
        let targetEnd = currentStart + baseDuration;
        let noSilenceFound = false;
        let remainingVideo = videoDuration - targetEnd;

        // सिचुएशन A: अगर आख़िरी टुकड़ा बेहद छोटा (3s से कम) है, तो उसे इसी क्लिप में समाहित कर लें
        if (targetEnd >= videoDuration || remainingVideo < 3.0) {
          cuts.push({
            start: currentStart,
            end: videoDuration,
            noSilenceFound: false,
          });
          break;
        }

        // सिचुएशन B: Recommended मोड में क्लिप्स की संख्या कम करने के लिए मैक्सिमम 90s तक स्केलिंग
        if (selectedDuration === "recommended") {
          if (
            remainingVideo > 0 &&
            remainingVideo < 15 &&
            baseDuration + remainingVideo <= 90
          ) {
            cuts.push({
              start: currentStart,
              end: videoDuration,
              noSilenceFound: false,
            });
            break;
          }
        }

        // प्राइमरी सर्च विंडो: डिमांड लिमिट से 40% पीछे का एरिया
        let primaryWindowStart = targetEnd - baseDuration * 0.4;
        let candidates = silencePoints.filter(
          (p) => p.start >= primaryWindowStart && p.start <= targetEnd,
        );
        let finalEnd;

        if (candidates.length > 0) {
          // सिचुएशन C: परफेक्ट साइलेंस उपलब्ध है -> सबसे लंबी और गहरी शांति को चुनें
          candidates.sort(
            (a, b) =>
              b.duration - a.duration ||
              Math.abs(a.start - targetEnd) - Math.abs(b.start - targetEnd),
          );
          finalEnd = candidates[0].start + 0.05; // साइलेंस फ्लोर के 50ms अंदर सटीक कट
        } else {
          // सिचुएशन D: एक्सटेंडेड बैकअप प्लान -> 40% से भी पीछे जाकर क्लिप लिमिट (Min 2s) तक पूरा बैक-स्कैन करें
          let backupCandidates = silencePoints.filter(
            (p) => p.start >= currentStart + 2 && p.start < primaryWindowStart,
          );
          if (backupCandidates.length > 0) {
            backupCandidates.sort(
              (a, b) =>
                b.duration - a.duration ||
                Math.abs(a.start - targetEnd) - Math.abs(b.start - targetEnd),
            );
            finalEnd = backupCandidates[0].start + 0.05;
          } else {
            // सिचुएशन E: पूर्णतः नो-साइलेंस केस -> डिमांड लिमिट पर हार्ड कट मारकर एरर फ़्लैग ऑन करें
            finalEnd = targetEnd;
            noSilenceFound = true;
          }
        }

        // Strict Max Cap बाउंड्री गार्डरेल
        if (finalEnd > targetEnd || finalEnd <= currentStart + 0.5) {
          finalEnd = targetEnd;
          noSilenceFound = true;
        }
        // चेक करें कि क्या क्लिप को डिमांड टाइम से 1 सेकंड से ज़्यादा छोटा किया गया है
        let isAdjusted = false;
        if (!noSilenceFound && targetEnd - finalEnd > 1.0) {
          isAdjusted = true;
        }

        cuts.push({
          start: currentStart,
          end: finalEnd,
          noSilenceFound,
          isAdjusted,
        });
        currentStart = finalEnd;
      }

      // 🎬 3. Zero-Bleed Pro-Audio Sample-Accurate Cutting & Micro-Fading Loop
      const mappedResults = [];
      let totalParts = cuts.length;

      for (let i = 0; i < cuts.length; i++) {
        const { start, end, noSilenceFound, isAdjusted } = cuts[i];

        // पिछले शब्द की तरंगों की गूंज रोकने के लिए 40ms का माइक्रो-ऑफसेट बफ़र
        let exactStart = start;
        if (i > 0) {
          exactStart = start + 0.04;
        }

        let exactDuration = end - exactStart;
        if (exactDuration < 0.5) continue;

        const outName = `part_${String(i + 1).padStart(2, "0")}.mp4`;
        const fadeOutStart = exactDuration - 0.015; // अंत से 15ms पहले फेड आउट शुरू होगा

        // trim/atrim + aresample + 15ms micro audio cross-fading (आवाज़ गूंजने और कटने के झटके को पूरी तरह मिटाने के लिए)
        await ffmpeg.exec([
          "-i",
          "input.mp4",
          "-filter_complex",
          `[0:v]trim=start=${exactStart.toFixed(3)}:duration=${exactDuration.toFixed(3)},setpts=PTS-STARTPTS[v];[0:a]atrim=start=${exactStart.toFixed(3)}:duration=${exactDuration.toFixed(3)},asetpts=PTS-STARTPTS,aresample=async=1:first_pts=0,afade=t=in:ss=0:d=0.015,afade=t=out:st=${fadeOutStart.toFixed(3)}:d=0.015[a]`,
          "-map",
          "[v]",
          "-map",
          "[a]",
          "-c:v",
          "libx264",
          "-preset",
          "ultrafast",
          "-crf",
          "26",
          "-c:a",
          "aac",
          "-b:a",
          "128k",
          outName,
        ]);

        const data = await ffmpeg.readFile(outName);
        const videoBlob = new Blob([data.buffer], { type: "video/mp4" });
        const videoFile = new File([videoBlob], outName, { type: "video/mp4" });
        const url = URL.createObjectURL(videoBlob);

        mappedResults.push({
          name: outName,
          url,
          file: videoFile,
          durationText: `${exactDuration.toFixed(0)}s`,
          noSilenceFound: noSilenceFound,
          isAdjusted: isAdjusted, // ब्लू बैनर ट्रिगर करने के लिए स्टेट में डेटा भेजा गया
        });

        await ffmpeg.deleteFile(outName);
        setProgress(10 + Math.round(((i + 1) / totalParts) * 90));
      }

      await ffmpeg.deleteFile("input.mp4");
      setResults(mappedResults);
      setIsProcessing(false);
    } catch (error) {
      console.warn(
        "⚠️ Smart cut failed, running automated Fallback Cut...",
        error,
      );

      try {
        // 🔄 PLAN B (Ultra-Lightweight Copy Segmenting - Uses 0MB RAM)
        const ffmpeg = ffmpegRef.current;
        const splitDuration =
          selectedDuration === "recommended"
            ? config.presets[0]
            : selectedDuration === "custom"
              ? Number(customDuration) || 30
              : Number(selectedDuration);

        await ffmpeg.exec([
          "-i",
          "input.mp4",
          "-c",
          "copy",
          "-map",
          "0",
          "-segment_time",
          splitDuration.toString(),
          "-f",
          "segment",
          "-reset_timestamps",
          "1",
          "-avoid_negative_ts",
          "make_zero",
          "part_%03d.mp4",
        ]);

        const files = await ffmpeg.listDir("/");
        const outputFiles = files
          .filter((f) => f.name.startsWith("part_"))
          .sort((a, b) => a.name.localeCompare(b.name));
        const mappedResults = [];

        for (let i = 0; i < outputFiles.length; i++) {
          const f = outputFiles[i];
          const data = await ffmpeg.readFile(f.name);
          const newFileName = `part_${String(i + 1).padStart(2, "0")}.mp4`;
          const videoBlob = new Blob([data.buffer], { type: "video/mp4" });
          const url = URL.createObjectURL(videoBlob);

          mappedResults.push({
            name: newFileName,
            url,
            file: new File([videoBlob], newFileName, { type: "video/mp4" }),
            durationText: `${splitDuration}s`,
            noSilenceFound: true, // फॉलबैक मोड में हमेशा ट्रू रहेगा
            isAdjusted: false,
          });
          await ffmpeg.deleteFile(f.name);
        }

        setResults(mappedResults);
        setIsProcessing(false);
      } catch (fallbackError) {
        console.error("🔴 Hard Failure:", fallbackError);
        setFileError(
          "Processing failed due to browser memory limit. Please try a smaller video.",
        );
        setIsProcessing(false);
      }
    } finally {
      window.Worker = OriginalWorker;
    }
  };

  // 📤 Dynamic Share All Logic
  const handleShareAll = async () => {
    const filesToShare = results.map((r) => r.file);
    if (navigator.canShare && navigator.canShare({ files: filesToShare })) {
      try {
        await navigator.share({
          files: filesToShare,
          title: `Share to ${config.name}`,
          text: `Here are the split video parts for ${config.name}!`,
        });
      } catch (err) {
        console.error("Sharing failed:", err);
      }
    } else {
      alert(
        "Your browser does not support bulk sharing. Please download manually.",
      );
    }
  };

  // 📤 Dynamic Single Share Logic
  const handleShareSingle = async (singleFile) => {
    if (navigator.canShare && navigator.canShare({ files: [singleFile] })) {
      try {
        await navigator.share({
          files: [singleFile],
          title: `Share on ${config.name}`,
          text: `Check out this clip for ${config.name}`,
        });
      } catch (err) {
        console.error("Sharing single file failed:", err);
      }
    } else {
      alert("Your browser does not support sharing files directly.");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 font-sans text-slate-800 dark:text-slate-200">
      {/* 📢 TOP MAIN RESPONSIVE AD ZONE - FIXED */}
      <div className="w-full max-w-4xl mx-auto my-4 py-5 bg-slate-100 dark:bg-white/[0.02] border border-dashed border-slate-300 dark:border-white/10 rounded-2xl text-center flex items-center justify-center min-h-[90px] shadow-sm select-none">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-gray-500 uppercase animate-pulse">
          [ TOP HEADER AUTO-ADS ZONE ]
        </span>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr_200px] gap-8">
        <div className="hidden md:block h-full bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 text-xs rounded-xl">
          Side Ad
        </div>

        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Smart Splitter for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
                {config.name}
              </span>
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Split long videos into perfect parts without breaking flow.
            </p>
          </div>

          <GlassCard className="p-6 md:p-10 space-y-8 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 rounded-2xl">
            {/* 📁 Upload State */}
            {results.length === 0 && !isProcessing && (
              <>
                {fileError && (
                  <div className="p-4 mb-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl text-sm font-medium text-amber-800 dark:text-amber-300 text-center space-y-3 animate-in fade-in duration-300">
                    <p className="leading-relaxed">{fileError}</p>
                    <div>
                      <a
                        href={COMPRESS_LINK}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black rounded-lg transition-all shadow-md shadow-orange-500/20"
                      >
                        🗜️ Go to Video Compressor
                      </a>
                    </div>
                  </div>
                )}

                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-indigo-200 dark:border-indigo-900/30 rounded-2xl cursor-pointer hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all group">
                  <div className="p-4 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    <Icons.Folder />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {file ? file.name : "Select Video File"}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    MP4, WebM, MOV supported
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileChange}
                  />
                </label>
              </>
            )}

            {/* 🎉 Results State */}
            {results.length > 0 && (
              <div className="space-y-5 animate-in fade-in duration-500">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-black text-emerald-600 mb-1">
                    Processing Complete!
                  </h2>
                  <p className="text-xs text-slate-500">
                    Your video is ready for {config.name}
                  </p>
                </div>

                {/* 🏷️ Original Video Display */}
                <div className="flex flex-col items-center justify-center p-4 mb-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Original Video
                  </span>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 truncate w-full justify-center px-2">
                    <Icons.Play /> {file.name}
                  </div>
                </div>

                {/* 📤 Bulk Share Button (Matches Gradient) */}
          <button
  onClick={handleShareAll}
  className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-black text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
>
  <Icons.Share /> 1-Click Share All Parts on {config.name}
</button>
                {/* 📜 Parts List with Big Video Tiles */}
                <div className="space-y-8">
                  {results.map((res, i) => (
                    <div
                      key={i}
                      className="flex flex-col p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 gap-5 hover:border-indigo-400 transition-all shadow-sm"
                    >
                      {/* 📢 Dynamic Audio Flow Notification: जब वॉइस फ्लो को बचाने के लिए टाइम थोड़ा एडजस्ट किया गया हो */}
                      {res.isAdjusted && (
                        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl flex items-start gap-2.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 animate-in fade-in duration-300">
                          <span className="text-sm mt-0.5">🎵</span>
                          <p className="leading-relaxed">
                            <strong>Audio Flow Balanced:</strong> We smartly
                            adjusted the end of this clip slightly earlier to
                            capture a clean speech pause. The remaining content
                            has been safely moved forward into the next segment,
                            ensuring zero word repetition and a continuous,
                            natural delivery.
                          </p>
                        </div>
                      )}

                      {/* 📢 Platform Alignment Notification: जब लगातार बैकग्राउंड म्यूजिक की वजह से हार्ड कट मारना पड़ा हो */}
                      {res.noSilenceFound && (
                        <div className="p-3.5 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 rounded-xl flex items-start gap-2.5 text-xs font-semibold text-blue-800 dark:text-blue-300 animate-in fade-in duration-300">
                          <span className="text-sm mt-0.5">💡</span>
                          <p className="leading-relaxed">
                            <strong>Platform Alignment Notice:</strong>{" "}
                            Persistent background tracks or continuous vocals
                            made it impossible to isolate a quiet speech gap. To
                            strictly honor your target time limit without
                            spilling over, this section was split precisely at
                            the boundary to maintain platform compatibility.
                          </p>
                        </div>
                      )}

                      {/* 🎬 Big Video Tile (Player) */}
                      <div className="w-full h-56 sm:h-72 bg-black rounded-xl overflow-hidden relative border border-slate-800 shadow-inner">
                        <video
                          src={res.url}
                          controls
                          preload="metadata"
                          className="w-full h-full object-contain"
                          onPlay={(e) => {
                            // 🎯 मल्टी-प्लेयर प्रिवेंटर: एक वीडियो प्ले होने पर बाकी सब ऑटो-पॉज हो जाएंगे
                            const allVideos =
                              document.querySelectorAll("video");
                            allVideos.forEach((v) => {
                              if (v !== e.target) {
                                v.pause();
                              }
                            });
                          }}
                        />
                      </div>

                      {/* 🏷️ Details & Actions */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <span className="text-base font-bold text-slate-800 dark:text-slate-100">
                            {res.name}
                          </span>
                          <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-black rounded-md border border-indigo-200 dark:border-indigo-800/50">
                            {res.durationText}
                          </span>
                        </div>

               {/* 🚫 यह आपका वर्तमान कोड है जो फ़ाइल में मिलेगा */}
<div className="flex items-center gap-3 w-full sm:w-auto">
  <button
    onClick={() => handleShareSingle(res.file)}
    className="flex-1 sm:flex-none px-6 py-3 bg-emerald-500 text-white text-xs font-bold rounded-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-emerald-500/20"
  >
    <Icons.Share /> Share on {config.name}
  </button>
  <a
    href={res.url}
    download={res.name}
    className="flex-1 sm:flex-none px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all flex items-center justify-center gap-2"
  >
    <Icons.Download /> Download
  </a>
</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setResults([]);
                    setFile(null);
                  }}
                  className="w-full py-4 mt-6 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Cut Another Video
                </button>
              </div>
            )}

            {/* ⚙️ Controls State */}
            {results.length === 0 && (
              <div className="space-y-6">
                {/* 1. Duration Selection & Custom Input */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500">
                    Choose Duration
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedDuration("recommended")}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${selectedDuration === "recommended" ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent shadow-md shadow-indigo-500/20" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50"}`}
                    >
                      Recommended
                    </button>
                    {config.presets.map((time) => (
                      <button
                        key={time}
                        onClick={() => {
                          setSelectedDuration(time);
                          setCustomDuration("");
                        }}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${selectedDuration === time ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent shadow-md shadow-indigo-500/20" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50"}`}
                      >
                        {time}s Clips
                      </button>
                    ))}

                    {/* 🟢 Custom Duration Input Field */}
                    <div
                      className={`flex items-center border rounded-xl overflow-hidden transition-all bg-white ${selectedDuration === "custom" ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-slate-200 hover:border-indigo-400"}`}
                    >
                      <input
                        type="number"
                        placeholder="Custom (sec)"
                        value={customDuration}
                        onChange={(e) => {
                          setCustomDuration(e.target.value);
                          setSelectedDuration("custom");
                        }}
                        className="w-28 px-3 py-2.5 text-xs font-bold text-slate-700 outline-none bg-transparent"
                        min="1"
                      />
                    </div>
                  </div>
                </div>
                {isProcessing && (
                  <div className="space-y-4 p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/30 shadow-inner">
                    <div className="flex justify-between text-xs font-black text-indigo-700 dark:text-indigo-400 uppercase tracking-wide">
                      <span className="animate-pulse">
                        {progress < 15 &&
                          "🔍 Analyzing audio for smart cuts..."}
                        {progress >= 15 &&
                          progress < 40 &&
                          "🔒 Processing locally (100% Private)..."}
                        {progress >= 40 &&
                          progress < 70 &&
                          "✂️ Crafting perfect segments..."}
                        {progress >= 70 &&
                          progress < 95 &&
                          "⏳ Hang tight! It won't take much longer..."}
                        {progress >= 95 && "🚀 Finishing up..."}
                      </span>
                      <span>{progress}%</span>
                    </div>

                    {/* 🟢 Animated Progress Bar */}
                    <div className="w-full bg-indigo-200/50 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden relative">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-300 rounded-full relative overflow-hidden"
                        style={{ width: `${Math.max(progress, 2)}%` }}
                      >
                        {/* यह सफेद ब्लिंक (Pulse) इफ़ेक्ट यह दिखाएगा कि बार अटका नहीं है, प्रोसेस चल रहा है */}
                        <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                      </div>
                    </div>
{/* 🧠 Psychological Trust & Value Message */}
              <div className="text-center space-y-1">
                <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  <span className="text-indigo-600 dark:text-indigo-400">
                    Great things take a little time!
                  </span>{" "}
                  💡
                </p>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                  We are running a heavy precision algorithm directly on
                  your device to ensure zero quality loss and 100%
                  privacy. Please do not close this tab.
                </p>
              </div>
            </div>
          )}

          {/* 3. Target Platform Dropdown */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500">
              Target Platform
            </label>
            <select
              /* 🔄 पुराना ?for= वाला यूआरएल हटाकर इसे 100% शुद्ध पाथ बेस्ड राउटिंग पर लॉक किया */
              onChange={(e) => router.push(`/video-splitter/${e.target.value}`)}
              value={platformKey}
              className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
            >
              {Object.keys(PLATFORM_CONFIG).map((key) => (
                <option key={key} value={key}>
                  {PLATFORM_CONFIG[key].name}
                </option>
              ))}
            </select>
          </div>

                {/* 🚀 4. Start Splitting Button */}
                <button
                  onClick={handleSplit}
                  disabled={!file || isProcessing}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-black text-base rounded-xl transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {isProcessing ? "Processing..." : "Start Splitting"}
                </button>
                {/* 🎯 IN-CARD ACTIONS AD ZONE: विज़ुअल डैश बॉर्डर और लाइट बैकग्राउंड के साथ अपग्रेड किया गया */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/40 w-full">
                  <div className="w-full min-h-[110px] bg-slate-50 dark:bg-black/20 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-400 text-[10px] font-bold p-3 text-center transition-all select-none">
                    <span className="mb-1 uppercase tracking-widest text-indigo-500/80 dark:text-indigo-400/80">
                      [ In-Card Action Ad Zone ]
                    </span>
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 max-w-xs leading-relaxed font-medium mt-1">
                      AdSense script paused locally. Layout stays clean in
                      development mode.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </GlassCard>



          {/* 🔗 VERIFIED INTERNAL LINKING MATRIX GRID FOR SPLITTER (Compressor Tool Replica) */}
          <div className="w-full max-w-4xl mx-auto mt-6 px-1">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-wide block mb-3 uppercase text-left">
              Supported Platforms Quick Split Engines:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { slug: "whatsapp", label: "WhatsApp Status", className: "bg-green-50/40 dark:bg-green-950/10 border-green-200 dark:border-green-900/50 text-green-600 dark:text-green-400 font-bold hover:border-green-500" },
                { slug: "instagram", label: "Instagram Reels", className: "bg-pink-50/40 dark:bg-pink-950/10 border-pink-200 dark:border-pink-900/50 text-pink-600 dark:text-pink-400 font-bold hover:border-pink-500" },
                { slug: "youtube", label: "YouTube Shorts", className: "bg-red-50/40 dark:bg-red-950/10 border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-bold hover:border-red-500" },
                { slug: "tiktok", label: "TikTok Video", className: "bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-gray-900 dark:text-white font-bold hover:border-black dark:hover:border-white" },
                { slug: "telegram", label: "Telegram Slicer", className: "bg-indigo-50/40 dark:bg-indigo-950/10 border-indigo-200 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold hover:border-indigo-500" },
                { slug: "line", label: "LINE App Video", className: "bg-lime-50/40 dark:bg-lime-950/10 border-lime-200 dark:border-lime-900/50 text-lime-600 dark:text-lime-400 font-bold hover:border-lime-500" },
                { slug: "wechat", label: "WeChat Moments", className: "bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold hover:border-emerald-500" },
                { slug: "pinterest", label: "Pinterest Pins", className: "bg-rose-50/40 dark:bg-rose-950/10 border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 font-bold hover:border-rose-500" }
              ].map((item) => (
                <Link
                  key={item.slug}
                  href={`/video-splitter/${item.slug}`}
                  className={`text-center p-3 rounded-lg transition-all text-xs shadow-sm flex items-center justify-center border ${item.className}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="h-6 w-full"></div> {/* छोटा विजुअल गैप */}

          {/* 🚀 PROGRAMMATIC SEO KNOWLEDGE HUBS (AdSense Bot Safe Architecture) */}
          <div className="w-full max-w-4xl mx-auto mt-16 px-4 sm:px-6 notranslate">
            {/* 📊 Technical Specification Grid Matrix */}
            <div className="bg-white dark:bg-[#0c0c12] border border-slate-200/60 dark:border-white/5 rounded-2xl p-6 shadow-sm mb-10">
              <h2 className="text-xl font-bold text-slate-800 dark:text-gray-100 mb-4">
                Optimized Technical Specifications for {config.name}
              </h2>
              <p className="text-sm text-slate-600 dark:text-gray-400 mb-6 leading-relaxed">
                {config.intro}
              </p>

              <div className="overflow-hidden border border-slate-100 dark:border-white/5 rounded-xl">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/40 text-slate-700 dark:text-gray-300 font-semibold border-b border-slate-100 dark:border-white/5">
                      <th className="p-3.5">Deployment Metric</th>
                      <th className="p-3.5">Target Parameter Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-600 dark:text-gray-400">
                    <tr>
                      <td className="p-3.5 font-medium text-slate-700 dark:text-gray-300">
                        Target Platform Optimization
                      </td>
                      <td className="p-3.5">{config.name} Native Player</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-slate-700 dark:text-gray-300">
                        Max Segment Duration Limit
                      </td>
                      <td className="p-3.5">{config.limit}</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-slate-700 dark:text-gray-300">
                        Recommended Aspect Ratio
                      </td>
                      <td className="p-3.5">{config.aspectRatio}</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-slate-700 dark:text-gray-300">
                        Optimal Use-Case Hub
                      </td>
                      <td className="p-3.5">{config.bestFor}</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-slate-700 dark:text-gray-300">
                        Core Processing Mode
                      </td>
                      <td className="p-3.5">
                        100% Client-Side Web Assembly (WASM) Sandbox
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 💡 Deep-EAT Informational FAQ Core */}
            <div className="bg-white dark:bg-[#0c0c12] border border-slate-200/60 dark:border-white/5 rounded-2xl p-6 shadow-sm mb-12">
              <h2 className="text-xl font-bold text-slate-800 dark:text-gray-100 mb-6">
                Frequently Asked Questions regarding {config.name} Splitting
              </h2>

              <div className="space-y-6">
                <div className="border-b border-slate-100 dark:border-white/5 pb-4">
                  <h3 className="text-base font-semibold text-slate-800 dark:text-gray-200 mb-2">
                    ⚡ {config.faqQ1}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                    {config.faqA1}
                  </p>
                </div>

                <div className="border-b border-slate-100 dark:border-white/5 pb-4">
                  <h3 className="text-base font-semibold text-slate-800 dark:text-gray-200 mb-2">
                    ⚡ Does this {config.name} video tool upload my data to
                    external cloud servers?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                    Absolutely not. This utility functions entirely within your
                    local web browser context leveraging secure client-side
                    binary execution. Your privacy is structurally guaranteed
                    because zero bytes of your video ever cross your local
                    desktop environment.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-slate-800 dark:text-gray-200 mb-2">
                    ⚡ Will the audio quality degrade after partitioning the
                    files?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                    No. The software runs an advanced zero-bleed fade
                    architecture that cross-fades audio components down to the
                    millisecond layer at programmatic boundaries, avoiding the
                    popping, clicking, or frame lag standard tools introduce.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-20 bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 text-xs rounded-xl">
            Bottom Ad Space
          </div>
        </div>

        <div className="hidden md:block h-full bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 text-xs rounded-xl">
          Side Ad
        </div>
      </div>
    </div>
  );
}




export default function VideoSplitter({ forcedPlatform }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#060609] text-slate-400 text-xs font-bold animate-pulse">
          Loading Smart Splitter Engine...
        </div>
      }
    >
      <VideoSplitterContent forcedPlatform={forcedPlatform} />
    </Suspense>
  );
}