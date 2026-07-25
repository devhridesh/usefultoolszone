"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";

const PLATFORM_LIMITS = {
  whatsapp: {
    name: "WhatsApp Status / Msg",
    limit: 700,
    icon: "💬",
    slug: "whatsapp-status-formatter",
    desc: "Optimized 700-character chunks for clean WhatsApp status & chat delivery.",
  },
  twitter: {
    name: "Twitter / X Thread",
    limit: 280,
    icon: "🐦",
    slug: "twitter-thread-generator",
    desc: "Split long text into 280-character numbered Twitter/X threads cleanly.",
  },
  threads: {
    name: "Threads (Meta)",
    limit: 500,
    icon: "🧵",
    slug: "threads-post-generator",
    desc: "Split long posts into 500-character Meta Threads posts cleanly.",
  },
  instagram: {
    name: "Instagram Reels & Slides",
    limit: 150,
    icon: "📸",
    slug: "instagram-reels-text-hooks",
    desc: "Short 150-character bite-sized chunks for high-CTR Reels text overlays.",
  },
  linkedin: {
    name: "LinkedIn Post",
    limit: 3000,
    icon: "💼",
    slug: "linkedin-post-splitter",
    desc: "Format & chunk professional LinkedIn articles with high readability.",
  },
  telegram: {
    name: "Telegram Channel",
    limit: 4096,
    icon: "✈️",
    slug: "telegram-message-chunker",
    desc: "Large 4096-character telegram channel post formatting.",
  },
};

const SLUG_MAP = {
  whatsapp: "whatsapp",
  "whatsapp-status-formatter": "whatsapp",
  twitter: "twitter",
  "twitter-thread-generator": "twitter",
  threads: "threads",
  "threads-post-generator": "threads",
  instagram: "instagram",
  "instagram-reels-text-hooks": "instagram",
  linkedin: "linkedin",
  "linkedin-post-splitter": "linkedin",
  telegram: "telegram",
  "telegram-message-chunker": "telegram",
  "read-more-text-generator": "whatsapp",
};

const HOOK_PRESETS = [
  "🚨 STOP SCROLLING! READ THIS 👇",
  "💡 3 Harsh Truths Nobody Tells You About This:",
  "🔥 Save This Video Before It Gets Deleted!",
  "👀 If You Are Doing This, STOP Immediately:",
  "⚡ The Secret Strategy Revealed in 30 Seconds:",
];

export default function SocialMediaTextChunkerContent({ forcedSlug }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSlug = forcedSlug || searchParams.get("preset") || "";

  // Device Recognition State
  const [isMobile, setIsMobile] = useState(false);

  // Core States
  const [inputText, setInputText] = useState("");
  const [chunkMode, setChunkMode] = useState("text-only");
  const [selectedPlatform, setSelectedPlatform] = useState("whatsapp");
  const [customLimit, setCustomLimit] = useState(700);
// High-CTR Feature Toggles
  const DEFAULT_HOOKS = [
    "🚨 STOP SCROLLING! READ THIS 👇",
    "💡 3 Harsh Truths Nobody Tells You About This:",
    "🔥 Save This Video Before It Gets Deleted!",
    "👀 If You Are Doing This, STOP Immediately:",
    "⚡ The Secret Strategy Revealed in 30 Seconds:",
  ];

  const [enableBoldKeywords, setEnableBoldKeywords] = useState(true);
  const [selectedHook, setSelectedHook] = useState(DEFAULT_HOOKS[0]);
  const [enableHoldToRead, setEnableHoldToRead] = useState(true);
  const [enableReadMore, setEnableReadMore] = useState(true);

  // Custom Saved Hooks State with LocalStorage Sync
  const [customHooks, setCustomHooks] = useState([]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [newHookText, setNewHookText] = useState("");

  // Load Custom Hooks from LocalStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("utz_saved_custom_hooks");
      if (saved) {
        try {
          setCustomHooks(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse saved hooks:", e);
        }
      }
    }
  }, []);

  // Save new custom hook
  const handleAddCustomHook = (e) => {
    e.preventDefault();
    if (!newHookText.trim()) return;

    const updated = [...customHooks, newHookText.trim()];
    setCustomHooks(updated);
    localStorage.setItem("utz_saved_custom_hooks", JSON.stringify(updated));

    // Auto select the new custom hook
    setSelectedHook(newHookText.trim());
    setNewHookText("");
    setShowCustomInput(false);
  };

  // Delete custom hook
  const handleDeleteCustomHook = (hookToDelete, e) => {
    e.stopPropagation();
    const updated = customHooks.filter((h) => h !== hookToDelete);
    setCustomHooks(updated);
    localStorage.setItem("utz_saved_custom_hooks", JSON.stringify(updated));
    if (selectedHook === hookToDelete) {
      setSelectedHook(DEFAULT_HOOKS[0]);
    }
  };

  // Output Chunks & Queue Tracking State
  const [chunks, setChunks] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [nextSerialIndex, setNextSerialIndex] = useState(0);

  // Device System Recognition Engine
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent,
      );
      setIsMobile(checkMobile);
    }
  }, []);

  // URL Dynamic Slug Router & Preset Sync Engine
  useEffect(() => {
    if (activeSlug) {
      const lower = activeSlug.toLowerCase();
      const matchedKey = SLUG_MAP[lower];
      if (matchedKey && PLATFORM_LIMITS[matchedKey]) {
        setSelectedPlatform(matchedKey);
        setCustomLimit(PLATFORM_LIMITS[matchedKey].limit);
      }
    }
  }, [activeSlug]);

  // Dynamic Platform Details
  const currentPlatformObj =
    PLATFORM_LIMITS[selectedPlatform] || PLATFORM_LIMITS.whatsapp;
  const currentPlatformName = currentPlatformObj.name;

  // Handle Dropdown Change with URL Navigation
  const handlePlatformDropdownChange = (newKey) => {
    setSelectedPlatform(newKey);
    setCustomLimit(PLATFORM_LIMITS[newKey].limit);

    if (newKey !== "whatsapp") {
      setEnableReadMore(false);
    }

    const targetSlug = PLATFORM_LIMITS[newKey].slug;
    const langParam = searchParams.get("lang");
    const langQuery = langParam ? `?lang=${langParam}` : "";
    router.push(`/social-media-text-chunker/${targetSlug}${langQuery}`);
  };

  // Unicode Bold Transformer Engine
  const toUnicodeBold = (text) => {
    return text.replace(/[A-Za-z0-9]/g, (char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90)
        return String.fromCodePoint(0x1d400 + code - 65);
      if (code >= 97 && code <= 122)
        return String.fromCodePoint(0x1d41a + code - 97);
      if (code >= 48 && code <= 57)
        return String.fromCodePoint(0x1d7ce + code - 48);
      return char;
    });
  };

  // Main Chunker Logic
  useEffect(() => {
    if (!inputText.trim()) {
      setChunks([]);
      setNextSerialIndex(0);
      return;
    }

    let processedText = inputText;

    // Apply Unicode Bold if Toggled
    if (enableBoldKeywords) {
      processedText = processedText.replace(/\b[A-Z0-9]{2,}\b/g, (match) =>
        toUnicodeBold(match),
      );
    }

    const effectiveLimit = Number(customLimit) || 300;
    const words = processedText.split(/\s+/);
    let currentChunk = "";
    let rawChunks = [];

    words.forEach((word) => {
      if ((currentChunk + " " + word).trim().length <= effectiveLimit) {
        currentChunk += (currentChunk ? " " : "") + word;
      } else {
        if (currentChunk) rawChunks.push(currentChunk);
        currentChunk = word;
      }
    });
    if (currentChunk) rawChunks.push(currentChunk);

    const total = rawChunks.length;

    const finalChunks = rawChunks.map((chunk, index) => {
      let result = chunk;
      if (index === 0 && selectedHook && selectedHook !== "none") {
        result = `${toUnicodeBold(selectedHook)}\n\n${result}`;
      }
      if (enableHoldToRead) {
        result += `\n\n⏸️ ${toUnicodeBold("(Hold screen to pause & read full text)")}`;
      }

      if (total > 1) {
        result = `[${index + 1}/${total}]\n${result}`;
      }

      if (
        selectedPlatform === "whatsapp" &&
        enableReadMore &&
        index === total - 1
      ) {
        result += "\u200B".repeat(3500) + "\n...Read More";
      }

      return result;
    });

    setChunks(finalChunks);
    setNextSerialIndex(0);
  }, [
    inputText,
    chunkMode,
    selectedPlatform,
    customLimit,
    enableBoldKeywords,
    selectedHook,
    enableHoldToRead,
    enableReadMore,
  ]);

  // Copy Single Specific Chunk
  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setNextSerialIndex(index + 1 < chunks.length ? index + 1 : 0);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // SERIAL QUEUE: Copy Next Part Automatically
  const handleCopyNextSerialPart = () => {
    if (chunks.length === 0) return;
    const currentIndex = nextSerialIndex >= chunks.length ? 0 : nextSerialIndex;
    const targetChunk = chunks[currentIndex];

    navigator.clipboard.writeText(targetChunk);
    setCopiedIndex(currentIndex);

    setNextSerialIndex((prev) => (prev + 1 < chunks.length ? prev + 1 : 0));
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Web Share API Single Part Share
  const handleShareSingle = async (textChunk, index) => {
    await navigator.clipboard.writeText(textChunk);
    setCopiedIndex(index);

    if (typeof navigator !== "undefined" && navigator.share && isMobile) {
      try {
        await navigator.share({
          title: `${currentPlatformName} - Part ${index + 1}`,
          text: textChunk,
        });
      } catch (err) {
        console.log("Share canceled or bypassed:", err);
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-slate-50/60 dark:bg-[#060609] pt-24 pb-12 px-4">
      {/* Sponsored Header Ad */}
      <div className="w-full max-w-4xl mx-auto my-2 py-4 bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 text-center min-h-[90px] shadow-sm select-none rounded-2xl flex flex-col items-center justify-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          [ SPONSORED ADVERTISEMENT AREA ]
        </span>
      </div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] gap-8 mt-4">
        {/* Left Sidebar Ad */}
        <div className="hidden lg:flex min-h-[600px] sticky top-24 bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl items-center justify-center text-slate-400 text-xs shadow-sm flex flex-col p-2">
          <span className="text-[10px] font-bold tracking-widest uppercase text-center">
            [ PC SIDEBAR AD 1 ]
          </span>
        </div>

        {/* Main Content Area */}
        <main className="w-full flex flex-col items-center justify-start space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 max-w-2xl mx-auto animate-fadeIn">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              Chunk Text for {currentPlatformName} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-extrabold">
                Target Limit: {customLimit} Chars
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
              {currentPlatformObj.desc}
            </p>
          </div>

          {/* Interactive Card */}
          <div className="relative group rounded-3xl w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur-md opacity-25"></div>
            <GlassCard className="relative w-full p-6 bg-white/90 dark:bg-black/80 border border-slate-200 dark:border-white/10 shadow-xl rounded-3xl z-10 space-y-6 text-left">
              {/* AUTOMATIC DEVICE SYSTEM DETECTOR BANNER */}
              {!isMobile ? (
                <div className="p-3 bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-2xl flex items-start gap-2.5 text-xs text-blue-800 dark:text-blue-300 animate-fadeIn">
                  <span className="text-base shrink-0">💻</span>
                  <div className="leading-relaxed">
                    <strong className="font-extrabold block text-blue-900 dark:text-blue-200">
                      PC / Desktop System Detected
                    </strong>
                    {selectedPlatform === "whatsapp"
                      ? 'WhatsApp PC App does not support direct Web Status sharing. Use the "Serial Copy" button below to copy parts sequentially and press Ctrl + V to paste in WhatsApp Status.'
                      : `${currentPlatformName} web/desktop mode detected. Use the "Serial Copy" button below to copy parts sequentially and press Ctrl + V to paste.`}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300 animate-fadeIn">
                  <span className="text-base shrink-0">📱</span>
                  <div className="leading-relaxed">
                    <strong className="font-extrabold">
                      Mobile Device Detected:
                    </strong>{" "}
                    You can use direct native sharing or 1-click serial copying!
                  </div>
                </div>
              )}

              {/* RADIO BUTTON MODE SELECTOR */}
              <div className="bg-slate-100 dark:bg-gray-950 p-2 rounded-2xl border border-slate-200 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label
                  onClick={() => setChunkMode("text-only")}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all select-none ${
                    chunkMode === "text-only"
                      ? "bg-white dark:bg-gray-900 border-blue-500 shadow-sm"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="chunkMode"
                    checked={chunkMode === "text-only"}
                    onChange={() => setChunkMode("text-only")}
                    className="w-4 h-4 text-blue-600 cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-black text-slate-900 dark:text-white">
                      Pure Text Chunking Mode
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Splits long text for Status, Threads & Messages
                    </div>
                  </div>
                </label>

                <label
                  onClick={() => setChunkMode("video-hooks")}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all select-none ${
                    chunkMode === "video-hooks"
                      ? "bg-white dark:bg-gray-900 border-indigo-500 shadow-sm"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="chunkMode"
                    checked={chunkMode === "video-hooks"}
                    onChange={() => setChunkMode("video-hooks")}
                    className="w-4 h-4 text-indigo-600 cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-black text-slate-900 dark:text-white">
                      Video/Photo Storyboard Mode
                    </div>
                    <div className="text-[10px] text-indigo-500 font-bold">
                      Injects Attention Hooks & Hold-To-Read
                    </div>
                  </div>
                </label>
              </div>

              {/* PLATFORM PRESET & CHARACTER LIMIT SELECTOR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                    Choose Social Media Platform
                  </label>
                  <select
                    value={selectedPlatform}
                    onChange={(e) =>
                      handlePlatformDropdownChange(e.target.value)
                    }
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {Object.keys(PLATFORM_LIMITS).map((key) => (
                      <option key={key} value={key}>
                        {PLATFORM_LIMITS[key].icon} {PLATFORM_LIMITS[key].name}{" "}
                        ({PLATFORM_LIMITS[key].limit} Chars)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                    Custom Character Limit Per Chunk
                  </label>
                  <input
                    type="number"
                    value={customLimit}
                    onChange={(e) => setCustomLimit(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white outline-none focus:border-blue-500"
                    min="10"
                    max="10000"
                  />
                </div>
              </div>

              {/* HIGH-CTR TEXT ENHANCEMENTS (Active in All Modes, Default Checked) */}
              <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 rounded-2xl space-y-3 animate-fadeIn">
                <span className="text-[10px] font-black tracking-widest text-indigo-600 dark:text-indigo-400 uppercase block">
                  ⚡ High-CTR Video & Text Enhancements
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={enableBoldKeywords}
                      onChange={(e) => setEnableBoldKeywords(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-0 cursor-pointer"
                    />
                    <span>Auto Unicode Heavy Bold Keywords</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={enableHoldToRead}
                      onChange={(e) => setEnableHoldToRead(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-0 cursor-pointer"
                    />
                    <span>Add &quot;Hold Screen to Read&quot; Trigger</span>
                  </label>
                </div>
       {/* CHOOSE ATTENTION GRABBING HOOK WITH CUSTOM HOOK CREATOR */}
              <div className="pt-2 border-t border-indigo-100 dark:border-indigo-900/40 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Choose Your Attention Grabbing Hook:
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(!showCustomInput)}
                    className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {showCustomInput ? "✕ Cancel" : "✨ + Create Your Own Hook"}
                  </button>
                </div>

                {/* Custom Hook Creation Input Field */}
                {showCustomInput && (
                  <form onSubmit={handleAddCustomHook} className="flex items-center gap-2 animate-fadeIn">
                    <input
                      type="text"
                      value={newHookText}
                      onChange={(e) => setNewHookText(e.target.value)}
                      placeholder="Type your custom hook text (e.g. 🎯 Don't Miss This!)..."
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-gray-950 border-2 border-indigo-400 rounded-xl text-xs font-bold text-slate-900 dark:text-white outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all shrink-0 cursor-pointer"
                    >
                      Save & Use
                    </button>
                  </form>
                )}

                {/* Main Hook Dropdown Select */}
                <select
                  value={selectedHook}
                  onChange={(e) => setSelectedHook(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-950 border border-indigo-200 dark:border-indigo-800 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 outline-none cursor-pointer"
                >
                  <option value="" disabled>
                    Choose your attention grabbing hook...
                  </option>
                  <option value="none">🚫 None (No Hook)</option>

                  {/* Saved Custom Hooks Group */}
                  {customHooks.length > 0 && (
                    <optgroup label="⭐ Your Saved Custom Hooks">
                      {customHooks.map((hook, idx) => (
                        <option key={`custom-${idx}`} value={hook}>
                          ★ {hook}
                        </option>
                      ))}
                    </optgroup>
                  )}

                  {/* Standard Default Presets */}
                  <optgroup label="🔥 Default Attention Hooks">
                    {DEFAULT_HOOKS.map((hook, idx) => (
                      <option key={`default-${idx}`} value={hook}>
                        {hook}
                      </option>
                    ))}
                  </optgroup>
                </select>

                {/* Saved Custom Hooks Delete Manager List */}
                {customHooks.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      Manage Saved Hooks:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {customHooks.map((hook, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-lg text-[10px] font-bold text-indigo-700 dark:text-indigo-300"
                        >
                          <span className="truncate max-w-[180px]">{hook}</span>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteCustomHook(hook, e)}
                            className="text-red-500 hover:text-red-700 ml-1 font-black cursor-pointer"
                            title="Delete Saved Hook"
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              </div>

              {/* READ MORE TRICK TOGGLE (WhatsApp Only) */}
              {selectedPlatform === "whatsapp" && (
                <div className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-gray-900/50 rounded-xl border border-slate-200 dark:border-gray-800 animate-fadeIn">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    WhatsApp &quot;Read More&quot; Zero-Width Space Trigger
                  </span>
                  <input
                    type="checkbox"
                    checked={enableReadMore}
                    onChange={(e) => setEnableReadMore(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                  />
                </div>
              )}

              {/* TEXT INPUT AREA */}
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                  Paste Your Full Text Below
                </label>
                <textarea
                  rows="6"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your long article, script, or post text here..."
                  className="w-full p-4 bg-slate-50 dark:bg-gray-950 border-2 border-slate-200 dark:border-gray-800 focus:border-blue-500 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white outline-none resize-none transition-all"
                ></textarea>
              </div>

              {/* OUTPUT CHUNKS GRID WITH SERIAL QUEUE BUTTON */}
              {chunks.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-gray-800 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Generated Text Chunks ({chunks.length} Parts)
                    </h3>

                    <button
                      type="button"
                      onClick={handleCopyNextSerialPart}
                      className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>📋</span>
                      <span>
                        {copiedIndex !== null
                          ? `✓ Part ${copiedIndex + 1} Copied!`
                          : `Copy Part ${nextSerialIndex + 1} of ${chunks.length} (Serial)`}
                      </span>
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                    {chunks.map((chunk, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl space-y-2 relative group transition-all border ${
                          copiedIndex === idx
                            ? "bg-green-50/60 dark:bg-green-950/20 border-green-500/50"
                            : "bg-slate-50 dark:bg-gray-950 border-slate-200 dark:border-gray-800"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-400 border-b border-slate-200/60 dark:border-gray-800 pb-1">
                          <span>
                            PART {idx + 1} OF {chunks.length}
                          </span>
                          <span>{chunk.length} Characters</span>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                          {chunk}
                        </p>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => copyToClipboard(chunk, idx)}
                            className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer shadow-sm border ${
                              copiedIndex === idx
                                ? "bg-green-600 text-white border-green-600"
                                : "bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-700 hover:border-blue-500 text-slate-700 dark:text-gray-300"
                            }`}
                          >
                            {copiedIndex === idx ? "✓ Copied!" : "📋 Copy Part"}
                          </button>

                          {isMobile && (
                            <button
                              type="button"
                              onClick={() => handleShareSingle(chunk, idx)}
                              className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold rounded-lg transition-all cursor-pointer shadow-sm flex items-center gap-1"
                            >
                              <span>📤 Share Part {idx + 1}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </GlassCard>
          </div>

          {/* QUICK PLATFORM LINKING MATRIX GRID */}
          <div className="w-full max-w-4xl mx-auto mt-6 text-left space-y-3">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Supported Social Media Platform Quick Presets:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[
                {
                  key: "whatsapp",
                  slug: "whatsapp-status-formatter",
                  label: "WhatsApp (700)",
                  color: "text-green-600 border-green-200 bg-green-50/40",
                },
                {
                  key: "twitter",
                  slug: "twitter-thread-generator",
                  label: "Twitter / X (280)",
                  color: "text-sky-600 border-sky-200 bg-sky-50/40",
                },
                {
                  key: "threads",
                  slug: "threads-post-generator",
                  label: "Threads (500)",
                  color: "text-purple-600 border-purple-200 bg-purple-50/40",
                },
                {
                  key: "instagram",
                  slug: "instagram-reels-text-hooks",
                  label: "Instagram (150)",
                  color: "text-pink-600 border-pink-200 bg-pink-50/40",
                },
                {
                  key: "linkedin",
                  slug: "linkedin-post-splitter",
                  label: "LinkedIn (3000)",
                  color: "text-blue-600 border-blue-200 bg-blue-50/40",
                },
                {
                  key: "telegram",
                  slug: "telegram-message-chunker",
                  label: "Telegram (4096)",
                  color: "text-indigo-600 border-indigo-200 bg-indigo-50/40",
                },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handlePlatformDropdownChange(item.key)}
                  className={`p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                    selectedPlatform === item.key
                      ? "ring-2 ring-blue-500 shadow-md bg-white dark:bg-gray-900 border-blue-500"
                      : `${item.color} hover:shadow-sm`
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* pSEO KNOWLEDGE & FAQ SECTION */}
          <section className="w-full bg-white dark:bg-[#0c0c12] rounded-2xl p-6 sm:p-10 text-xs text-left text-slate-600 dark:text-gray-400 border border-slate-200/60 dark:border-white/5 shadow-sm space-y-8 mt-8">
            <article className="space-y-3">
              <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Why Chunking Social Media Text & Adding Video Hooks Boosts
                Engagement
              </h2>
              <p className="leading-relaxed">
                Social media algorithms prioritize retention and watch time.
                When posting long stories, text statuses, or video captions,
                dumping dense walls of text causes users to quickly swipe away.
              </p>
              <p className="leading-relaxed">
                Our <strong>Social Media Text Chunker</strong> breaks text into
                bite-sized slides and auto-injects psychological triggers like{" "}
                <strong>Hold-to-Read prompts</strong> and{" "}
                <strong>Unicode heavy bolding</strong>, increasing video watch
                time and audience retention naturally.
              </p>
            </article>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-xl">
                <h3 className="font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">
                  100% Client-Side Privacy
                </h3>
                <p className="text-[11px] leading-relaxed">
                  Your text is processed locally inside your browser virtual
                  memory RAM. No data is sent to external servers.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-xl">
                <h3 className="font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">
                  Zero Word-Clipped Splitting
                </h3>
                <p className="text-[11px] leading-relaxed">
                  Smart boundary splitting ensures sentences and words are
                  preserved without awkward cuts mid-word.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom Leaderboard Ad */}
          <div className="w-full min-h-[90px] bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-xl flex flex-col items-center justify-center text-slate-400 text-[10px] font-bold p-2 text-center shadow-sm mt-6">
            <span className="uppercase tracking-widest text-slate-400 mb-1">
              [ BOTTOM LEADERBOARD AD SPACE ]
            </span>
          </div>
        </main>

        {/* Right Sidebar Ad */}
        <div className="hidden lg:flex min-h-[600px] sticky top-24 bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl items-center justify-center text-slate-400 text-xs shadow-sm flex flex-col p-2">
          <span className="text-[10px] font-bold tracking-widest uppercase text-center">
            [ PC SIDEBAR AD 2 ]
          </span>
        </div>
      </div>
    </div>
  );
}
