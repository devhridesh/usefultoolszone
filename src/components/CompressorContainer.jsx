"use client";

import { useState, useRef, useEffect } from "react";
import useVideoCompressor from "../hooks/useVideoCompressor";
import NoSleep from "nosleep.js"; // 🎯 अल्टीमेट वेक लॉक ब्रह्मास्त्र

export default function CompressorContainer({ initialSize, platform }) {
  const {
    compressVideo,
    isCompressing,
    progress,
    statusText,
    compressedBlob,
    isStuck,
    setIsStuck,
    isTechnicalFreeze,
    setIsTechnicalFreeze,
  } = useVideoCompressor();

  const [targetSize, setTargetSize] = useState(initialSize || "10");
  const [selectedPreset, setSelectedPreset] = useState("");
  const [isUltrafast, setIsUltrafast] = useState(false); // ⚡ Default mode is unchecked (veryfast active)
  const [selectedFPS, setSelectedFPS] = useState("recommended"); // 🚀 Defaults to smart recommended mode
  const [lockFPS, setLockFPS] = useState(true); // 🚀 Recommended fast mode checked by default
  // 🎥 वीडियो प्रीव्यू स्टेट और ऑटो-क्लीनअप इंजन
  const [previewUrl, setPreviewUrl] = useState("");
  const [originalFileName, setOriginalFileName] = useState("video");
  const [validationError, setValidationError] = useState(null); // 👈 Custom banner state
  useEffect(() => {
    if (compressedBlob) {
      const url = URL.createObjectURL(compressedBlob);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url); // मेमोरी लीक रोकने के लिए
    } else {
      setPreviewUrl("");
    }
  }, [compressedBlob]);

  const handleShare = async () => {
    if (!compressedBlob) return;

    // 🛑 Browser Security Check: Agar HTTP ya unsecure connection hai
    if (!navigator.share) {
      alert(
        "Native sharing strictly requires an HTTPS (Secure) connection! Please test via HTTPS or Ngrok.",
      );
      return;
    }

    try {
      const file = new File(
        [compressedBlob],
        `${originalFileName}_compressed_UTZ.mp4`,
        { type: "video/mp4" },
      );

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Compressed Video",
          text: "Check out this fast, cookie-free compressed video from Useful Tools Zone! 🚀",
        });
      } else {
        await navigator.share({
          title: "Useful Tools Zone",
          text: "I just compressed my video instantly using the 100% private offline compressor!",
          url: window.location.origin,
        });
      }
    } catch (error) {
      console.log("Sharing cancelled or not supported:", error);
    }
  };

  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  const noSleepRef = useRef(null);

  // 🔄 🧠 राउटिंग प्रॉप-सिंक इंजन: जब भी नीचे ग्रिड से URL बदलेगा, यह स्टेट्स को ज़बरदस्ती री-सिंक करेगा
  useEffect(() => {
    // ✂️ "40mb" या "20mb" में से अक्षरों को हटाकर सिर्फ शुद्ध संख्या (10, 20, 40, 50, 60) निकालने का फ़िल्टर
    const cleanSize = initialSize
      ? initialSize.toString().replace(/[^0-9]/g, "")
      : "10";

    // 1. इनपुट बॉक्स का साइज तुरंत URL के अनुसार बदलें
    if (
      platform &&
      (platform.toLowerCase().includes("youtube") ||
        platform.toLowerCase().includes("shorts"))
    ) {
      setTargetSize("60");
    } else {
      setTargetSize(cleanSize); // 🎯 इनपुट बॉक्स में हमेशा शुद्ध नंबर जाएगा
    }

    // 2. ड्रॉपडाउन Preset को URL और स्लग के अनुसार फ्लैट चेन में सटीक सिलेक्ट करें
    const p = platform ? platform.toLowerCase() : "";

    if (p.includes("whatsapp")) {
      setSelectedPreset("whatsapp");
    } else if (p.includes("gmail")) {
      setSelectedPreset("gmail");
    } else if (p.includes("tiktok")) {
      setSelectedPreset("tiktok");
    } else if (p.includes("instagram")) {
      setSelectedPreset("instagram");
    } else if (p.includes("youtube") || p.includes("shorts")) {
      setSelectedPreset("youtube-shorts");
    } else if (p.includes("wechat")) {
      setSelectedPreset("wechat");
    } else if (p.includes("line")) {
      setSelectedPreset("line");
    } else if (p.includes("discord")) {
      setSelectedPreset("discord");
    } else if (cleanSize === "60") {
      setSelectedPreset("youtube-shorts"); // 🎯 अगर डायरेक्ट यूआरएल स्लग 60mb हो
    } else if (["10", "20", "40", "50"].includes(cleanSize)) {
      setSelectedPreset(cleanSize); // 🎯 स्टैंडर्ड 10, 20, 40, 50 MB ग्रिड लिंक्स
    } else if (p.includes("pinterest")) {
      // 📌 Pinterest URL Router Sync
      setSelectedPreset("pinterest");
    } else if (cleanSize === "60") {
    } else {
      setSelectedPreset("");
    }
  }, [initialSize, platform]);

  // 1. NoSleep को इनिशियलाइज़ करें
  useEffect(() => {
    noSleepRef.current = new NoSleep();
    return () => {
      if (noSleepRef.current) {
        noSleepRef.current.disable();
      }
    };
  }, []);

  // 2. जब कम्प्रेशन पूरा हो जाए, तो लॉक हटा दें
  useEffect(() => {
    if (!isCompressing && noSleepRef.current) {
      noSleepRef.current.disable();
      console.log("NoSleep Lock Disabled 🔓");
    }
  }, [isCompressing]);

  // 📥 4. Auto-Download Trigger when compression finishes
  useEffect(() => {
    if (compressedBlob && !isCompressing) {
      downloadFile();
    }
  }, [compressedBlob, isCompressing]);

  // 3. ऑटो-स्क्रॉलिंग इंजन (Engine 1: कम्प्रेशन शुरू होने पर)
  useEffect(() => {
    if (isCompressing && containerRef.current) {
      const headerOffset = 140;
      const elementPosition = containerRef.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [isCompressing]);

  // 3. ऑटो-स्क्रॉलिंग इंजन (Engine 2: पूरा होने पर स्मार्ट स्लाइड)
  useEffect(() => {
    if (!isCompressing && compressedBlob && containerRef.current) {
      // ⚡ 200ms का छोटा सा डिले ताकि dynamic वीडियो प्लेयर रेंडर होकर अपनी असली हाइट ले सके
      const scrollTimer = setTimeout(() => {
        const rect = containerRef.current.getBoundingClientRect();
        const elementBottom = rect.bottom + window.pageYOffset;
        const viewportHeight = window.innerHeight;

        // पूरे बॉक्स और नीचे के शेयर/डाउनलोड बटन्स को बिना कटे स्क्रीन के निचले हिस्से में फिट करने का गणित
        const targetScrollTop = elementBottom - viewportHeight + 30;

        window.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: "smooth",
        });
      }, 200);

      return () => clearTimeout(scrollTimer);
    }
  }, [isCompressing, compressedBlob]);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✂️ फाइल का असली नाम एक्सटेंशन हटाकर निकालने का लॉजिक
    const cleanName =
      file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
    setOriginalFileName(cleanName);

    const MAX_SIZE_MB = 1024;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(
        `File size too large! Please select a file under ${MAX_SIZE_MB}MB.`,
      );
      if (noSleepRef.current) {
        noSleepRef.current.disable();
      }
      return;
    }

    // 🛑 Strict English Headroom Validation Banner Shield
    const uploadedSizeMB = file.size / (1024 * 1024);
    if (uploadedSizeMB <= parseFloat(targetSize)) {
      setValidationError(
        `The uploaded video (${uploadedSizeMB.toFixed(1)} MB) is already smaller than or equal to your targeted size (${targetSize} MB). Please upload a larger video file to compress.`,
      );
      if (noSleepRef.current) noSleepRef.current.disable();
      return; // ✋ Stop execution completely
    } else {
      setValidationError(null); // Clear error if valid
    }

    // ⚡ Passed explicit selected FPS token to core execution engine
    await compressVideo(file, parseFloat(targetSize), isUltrafast, selectedFPS);
    // 🧼 Reset engine state to false for subsequent new video selections as requested
    setIsUltrafast(false);
  };

  const downloadFile = () => {
    if (!compressedBlob) return;
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement("a");
    a.href = url;

    // 🎯 आउटपुट ब्रांडिंग नाम: [OriginalName]_compressed_UTZ.mp4
    a.download = `${originalFileName}_compressed_UTZ.mp4`;

    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl mx-auto p-5 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md dark:shadow-lg text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 flex flex-col justify-between transition-all duration-300 min-h-[420px]"
    >
      {/* 📊 Title Container */}
      <h2 className="text-xl sm:text-2xl font-bold mb-5 text-center text-blue-600 dark:text-blue-400">
        {platform ? platform : "Video"} Compressor{" "}
        {isCompressing && (
          <span className="text-gray-700 dark:text-white ml-2 text-lg sm:text-xl font-extrabold animate-pulse">
            ({progress}%)
          </span>
        )}
      </h2>

      {/* 🎛️ Input Mode Layout */}
      {!isCompressing && !compressedBlob && (
        <div className="space-y-5 w-full flex-1 flex flex-col justify-between">
          {/* 🎛️ 100% रेस्पॉन्सिव इनपुट और प्रेसेट्स ग्रिड इंजन */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/60 p-4 rounded-xl border border-gray-200 dark:border-gray-700 w-full">
            {/* Target Size Box */}
            <div className="flex items-center justify-between sm:justify-start gap-3 w-full">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">
                Target Size:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={targetSize}
                  onChange={(e) => {
                    setTargetSize(e.target.value);
                    setSelectedPreset("");
                    setValidationError(null); // 👈 Target change hote hi warning clear
                  }}
                  className="w-20 px-3 py-1.5 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-600 rounded-lg text-center font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm"
                  min="1"
                  max="500"
                />
                <span className="notranslate text-sm font-bold text-gray-500 dark:text-gray-400">
                  MB
                </span>
              </div>
            </div>

            {/* Presets Dropdown Box */}
            <div className="flex items-center justify-between sm:justify-start gap-3 w-full">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">
                Presets:
              </label>
              <select
                value={selectedPreset}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedPreset(val);

                  const sizeMap = {
                    10: "10",
                    20: "20",
                    40: "40",
                    50: "50",
                    whatsapp: "16",
                    gmail: "25",
                    tiktok: "72",
                    instagram: "95",
                    "youtube-shorts": "60",
                    wechat: "25",
                    line: "200",
                    discord: "10",
                    pinterest: "100", // 📌 Pinterest targeting locked to 100MB
                  };

                  if (sizeMap[val]) {
                    setTargetSize(sizeMap[val]);
                  }
                }}
                className="w-full max-w-[220px] sm:max-w-none px-3 py-1.5 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 truncate"
              >
                <option value="">Select a Preset</option>
                {/* 📦 Standard Target Sizes */}
                <option value="10">Compress to 10 MB</option>
                <option value="20">Compress to 20 MB</option>
                <option value="40">Compress to 40 MB</option>
                <option value="50">Compress to 50 MB</option>

                {/* 📱 Global Social & Chat Apps Verified Unique Slugs */}
                <option value="tiktok">TikTok Video (Max 72 MB)</option>
                <option value="instagram">
                  Instagram Reels / Post (95 MB)
                </option>
                <option value="youtube-shorts">YouTube Shorts (60 MB)</option>
                <option value="whatsapp">
                  WhatsApp Status/Message (16 MB)
                </option>
                <option value="wechat">WeChat Sharing (25 MB)</option>
                <option value="line">LINE App Video Transfer (200 MB)</option>
                <option value="discord">Discord Free Upload (10 MB)</option>
                <option value="gmail">Gmail Attachment (25 MB)</option>
                <option value="pinterest">Pinterest Video (Max 100 MB)</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 text-left space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              🚀 Why Choose Our Tool?
            </h4>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1.5 list-none">
              <li>
                🔒 <strong>100% Safe & Private:</strong> Your video is processed
                purely on-device via local WebAssembly infrastructure.
              </li>
              <li>
                ⚡ <strong>Pure Fast & Offline:</strong> Runs completely
                isolated within your browser memory sandbox.
              </li>
            </ul>
          </div>

          {/* ⚡ PREMIUM STYLIZED CHECKBOX INTERFACE (Focus ring aur outlines ko completely disable kiya) */}
          <div
            className={`mb-5 flex items-center gap-2.5 px-3.5 py-2 rounded-xl border transition-all duration-300 pointer-events-auto outline-none focus:outline-none select-none ${isUltrafast ? "bg-amber-500/5 border-amber-500/20 dark:bg-amber-500/10" : "bg-white dark:bg-gray-950 border-slate-200 dark:border-slate-800"}`}
            onClick={(e) => e.stopPropagation()} // 🛡️ Fixes accidental native file selector open triggers
          >
            <input
              type="checkbox"
              id="ultrafast-checkbox"
              checked={isUltrafast}
              onChange={(e) => setIsUltrafast(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-950 border-slate-300 dark:border-slate-700 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none outline-none cursor-pointer transition-all"
            />
            <label
              htmlFor="ultrafast-checkbox"
              className="text-xs font-bold text-slate-700 dark:text-gray-300 cursor-pointer select-none tracking-wide flex items-center gap-1"
            >
              ⚡ Ultrafast Mode
              <span
                className={`font-medium transition-colors ${
                  isUltrafast
                    ? "text-amber-600 dark:text-amber-400 font-bold"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                (Increases speed up to 3x, but may lower pixel quality slightly)
              </span>
            </label>
          </div>
          {/* 🚀 PERMANENT STRATEGIC RECOMMENDED BENEFITS CARD WITH SSIM HIGHLIGHT */}
          <div className="p-3.5 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 rounded-xl text-left shadow-sm">
            <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 flex-wrap">
              <span>🚀 Smart Recommended Mode (Active by Default)</span>
              <span className="bg-emerald-600 dark:bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded-md uppercase tracking-wider font-extrabold shadow-sm select-none animate-pulse">
                SSIM Clarity Tuned
              </span>
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-gray-300 font-medium mt-1.5 leading-relaxed">
              <span className="font-bold text-blue-600 dark:text-blue-400">
                Benefits:
              </span>{" "}
              Integrates advanced SSIM (Structural Similarity) matrix tuning to
              preserve sharp object edges and prevent text blurring at low MB
              targets. Features up to 2x encoding speed boost, dynamic
              pixel-tearing shield, and absolute device thermal protection.
            </p>
          </div>

          {/* 🎛️ DYNAMIC FRAMERATE TICK SELECTOR GRID */}
          <div className="mt-1 text-left">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-wide block mb-2 uppercase">
              ⚙️ Custom Framerate Override Configuration:
            </label>

            <div className="flex flex-wrap gap-2 w-full">
              {[
                { id: "recommended", label: "Recommended (30 FPS) ✨" },
                { id: "24", label: "24 FPS" },
                { id: "45", label: "45 FPS" },
                { id: "60", label: "60 FPS" },
              ].map((fps) => (
                <div
                  key={fps.id}
                  onClick={() => setSelectedFPS(fps.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-extrabold transition-all duration-200 cursor-pointer select-none flex-1 min-w-[130px] sm:flex-initial ${
                    fps.id === "recommended"
                      ? "min-w-[195px] sm:min-w-[210px]"
                      : ""
                  } ${
                    selectedFPS === fps.id
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25"
                      : "bg-slate-50 dark:bg-gray-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-gray-200 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <span className="pr-2 select-none tracking-wide text-left block leading-tight">
                    {fps.label}
                  </span>
                  <input
                    type="checkbox"
                    checked={selectedFPS === fps.id}
                    onChange={() => setSelectedFPS(fps.id)}
                    className={`w-4 h-4 rounded-full border cursor-pointer pointer-events-none transition-all shrink-0 ${
                      selectedFPS === fps.id
                        ? "bg-white text-blue-600 border-white"
                        : "bg-white dark:bg-gray-900 border-slate-300 dark:border-slate-700"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* 📊 DYNAMIC PROS & CONS INTELLIGENT DISPATCHER BAR */}
            <div className="mt-2.5 p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 rounded-xl text-[11px] leading-relaxed animate-fadeIn">
              {selectedFPS === "recommended" && (
                <p className="text-slate-600 dark:text-gray-300">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ✓ Pros:
                  </span>{" "}
                  Auto hardware-calibrated compression. Balance parameters
                  maintain visual quality automatically.
                  <br />
                  <span className="font-bold text-rose-600 dark:text-rose-400">
                    ✗ Cons:
                  </span>{" "}
                  None. Perfect for regular operations.
                </p>
              )}
              {selectedFPS === "24" && (
                <p className="text-slate-600 dark:text-gray-300">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ✓ Pros:
                  </span>{" "}
                  Protects pixels from distortion on ultra-low bitrate targets.
                  Minimizes file size overhead.
                  <br />
                  <span className="font-bold text-rose-600 dark:text-rose-400">
                    ✗ Cons:
                  </span>{" "}
                  Fluidity might feel slightly lower in high-motion clips or
                  fast gaming captures due to cinematic limits.
                </p>
              )}
              {selectedFPS === "45" && (
                <p className="text-slate-600 dark:text-gray-300">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ✓ Pros:
                  </span>{" "}
                  Increases visual fluidity. Smooth rendering for screencasts
                  and fast-paced software logs.
                  <br />
                  <span className="font-bold text-rose-600 dark:text-rose-400">
                    ✗ Cons:
                  </span>{" "}
                  Spreading the limited MB size budget across more frames can
                  cause a slight soft pixel blur in dynamic scenes.
                </p>
              )}
              {selectedFPS === "60" && (
                <p className="text-slate-600 dark:text-gray-300">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ✓ Pros:
                  </span>{" "}
                  Maximum motion smoothness. Highly suitable for matching
                  high-end action cameras and gaming clips.
                  <br />
                  <span className="font-bold text-rose-600 dark:text-rose-400">
                    ✗ Cons:
                  </span>{" "}
                  Heavy CPU encoding burden. High distortion risk on low MB
                  selections. Higher mobile heating risk.
                </p>
              )}
            </div>
          </div>

          {/* 💡 SPEED TIP CARD */}
          <div className="mb-4 p-3 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 dark:border-blue-500/20 rounded-xl text-left select-none">
            <p className="text-[11px] text-slate-600 dark:text-gray-300 font-medium leading-relaxed">
              <span className="font-bold text-blue-600 dark:text-blue-400">
                ⚡ Speed Tip:
              </span>{" "}
              Larger video files naturally require more processing power and
              time. For the fastest compression, keep this tab open and active.
              You can also check "Ultrafast Mode" above to speed up the process
              by up to 3x!
            </p>
          </div>

          {/* ⚠️ Premium Stylized English Warning Banner */}
          {validationError && (
            <div className="w-full p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-left animate-fadeIn flex items-start gap-3 shadow-sm select-none">
              <span className="text-base mt-0.5">⚠️</span>
              <div className="flex-1">
                <h5 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Compression Skipped
                </h5>
                <p className="text-[11px] text-slate-600 dark:text-gray-300 font-semibold mt-0.5 leading-relaxed">
                  {validationError}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setValidationError(null)}
                className="text-[11px] text-amber-600 dark:text-amber-400 font-bold hover:underline cursor-pointer px-2 py-0.5 bg-amber-500/5 rounded-md border border-amber-500/10"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* 🔥 CLEAN DASHED DROPZONE */}
          <div
            className="text-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-black/20 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer flex flex-col justify-center items-center min-h-[120px]"
            onClick={() => {
              if (noSleepRef.current) noSleepRef.current.enable();
              fileInputRef.current.click();
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept="video/*"
            />
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-sm shadow-blue-500/20"
            >
              Select Video to Start
            </button>
            <p className="mt-3 text-slate-500 dark:text-gray-400 text-xs font-medium max-w-md px-4 leading-relaxed">
              Fully optimized for ultra-smooth operation on mobile devices.
              <span className="block mt-1 text-blue-600 dark:text-blue-400 font-bold select-none">
                🚀 Want 3x multi-core encoding speeds? Switch to Desktop PC for
                maximum performance!
              </span>
            </p>
          </div>
        </div>
      )}

      {/* ⏳ ACTIVE COMPRESSION & PROGRESS LAYER */}
      {isCompressing && (
        <div className="w-full flex-1 flex flex-col justify-center items-center space-y-5 my-auto min-h-[220px] animate-fadeIn">
          <div className="w-full max-w-md text-center space-y-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 shadow-sm">
              Target Size:{" "}
              <span className="font-bold text-gray-900 dark:text-white ml-1">
                {targetSize} MB
              </span>
            </span>

            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 min-h-[36px] flex items-center justify-center px-2 transition-all">
              {statusText}
            </p>

            {/* PROGRESS BAR CONTAINER */}
            <div className="w-full bg-slate-100 dark:bg-slate-900 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-800 shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* 🌐 ALERT A: NETWORK TIMEOUT NOTIFICATION */}
          {isStuck && !isTechnicalFreeze && (
            <div className="w-full max-w-md p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-left select-none animate-fadeIn">
              <p className="text-[11px] text-red-700 dark:text-red-400 font-medium leading-relaxed">
                <span className="font-bold">🌐 Network Notice:</span> The secure
                core engine download is taking longer than expected. Please
                check your internet connection or reload the tab.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg transition-all shadow-sm"
                >
                  Reload Tab
                </button>
              </div>
            </div>
          )}

          {/* ⚙️ ALERT B: TECHNICAL FREEZE NOTIFICATION */}
          {isTechnicalFreeze && (
            <div className="w-full max-w-md p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-left select-none animate-fadeIn">
              <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium leading-relaxed">
                <span className="font-bold">⚙️ Technical Notice:</span> The core
                engine has successfully initialized, but a temporary browser
                processing loop glitch occurred. Please reload the tab and
                re-select your file.
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] px-4 py-1.5 rounded-lg transition-all shadow-sm"
                >
                  🔄 Reload and Restart
                </button>
              </div>
            </div>
          )}

          {/* 📱 HIGH-REVENUE DYNAMIC AD BANNER ZONE */}
          <div className="w-full min-h-[140px] p-4 bg-gray-50 dark:bg-gray-950/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center space-y-2 transition-all duration-500 mt-4">
            <span className="text-[10px] font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase bg-blue-500/10 px-2 py-0.5 rounded shadow-sm">
              🎯 SPONSORED ADVERTISEMENT AREA 🎯
            </span>
            <p className="text-[11px] text-gray-400 max-w-xs leading-relaxed">
              Place your AdSense/Adsterra layout responsive code here to unlock
              extreme vertical CTR rates.
            </p>
          </div>
        </div>
      )}

      {/* 🏆 Result Output Mode with Immersive Gallery Video Tile */}
      {compressedBlob && !isCompressing && (
        <div className="text-center py-4 space-y-5 flex-1 flex flex-col justify-center items-center animate-fadeIn w-full">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2">
              <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md text-xs font-bold border border-blue-200/60 dark:border-blue-800/50 shadow-sm">
                ✓ Ready
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Compression Complete!
              </span>
            </h3>
          </div>

          {previewUrl && (
            <div className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-black flex items-center justify-center relative p-0.5">
              <video
                src={previewUrl}
                controls
                playsInline
                webkit-playsinline="true"
                preload="metadata"
                className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] md:max-h-[65vh] object-contain rounded-2xl block relative z-10 pointer-events-auto"
              />
            </div>
          )}

          <p className="text-xs text-blue-500 dark:text-blue-400 font-bold animate-pulse">
            ⚡ Your file downloaded automatically! You can also save or share it
            below.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full max-w-md mx-auto px-2">
            <button
              type="button"
              onClick={downloadFile}
              className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-md shadow-indigo-500/20 flex items-center justify-center gap-1.5"
            >
              📥 Download Video
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="w-full sm:flex-1 bg-indigo-50/60 hover:bg-indigo-100/80 dark:bg-indigo-950/30 dark:hover:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 border border-indigo-200/80 dark:border-indigo-800 flex items-center justify-center gap-1.5"
            >
              🚀 Share Directly to Apps
            </button>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-gray-400 font-semibold max-w-xs sm:max-w-sm mx-auto leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3.5 mt-2 select-none">
            <span className="hidden sm:inline">
              🎉 Loved the speed? Press{" "}
              <kbd className="bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-slate-700 px-1 py-0.5 rounded text-[10px] font-black shadow-sm mx-0.5">
                Ctrl + D
              </kbd>{" "}
              (Mac:{" "}
              <kbd className="bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-slate-700 px-1 py-0.5 rounded text-[10px] font-black shadow-sm mx-0.5">
                Cmd + D
              </kbd>
              ) to bookmark this page for instant access next time!
            </span>
            <span className="sm:hidden">
              🎉 Loved the speed? Tap{" "}
              <span className="font-black text-blue-600 dark:text-blue-400">
                ⋮
              </span>{" "}
              or{" "}
              <span className="font-black text-blue-600 dark:text-blue-400">
                Share
              </span>{" "}
              and select <span className="font-bold">Add to Home Screen</span>{" "}
              for instant offline access anytime!
            </span>
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white underline text-xs pt-1 transition-all font-medium"
          >
            Compress Another Video
          </button>
        </div>
      )}
    </div>
  );
}
