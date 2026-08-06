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
// WhatsApp Authentic Unique Status Colors (No Repeats)
const SLIDE_THEMES = [
  { id: "sky-blue", name: "Sky Blue", color: "#00a8f3" },
  { id: "deep-magenta", name: "Deep Magenta", color: "#6b1539" },
  { id: "crimson-wine", name: "Wine Red", color: "#741928" },
  { id: "slate-dark", name: "Dark Slate", color: "#374247" },
  { id: "whatsapp-green", name: "WhatsApp Green", color: "#25d366" },
  { id: "soft-lavender", name: "Soft Lavender", color: "#9770b0" },
  { id: "warm-taupe", name: "Warm Taupe", color: "#7b675e" },
  { id: "bright-cyan", name: "Bright Cyan", color: "#00a2db" },
  { id: "coral-pink", name: "Coral Pink", color: "#d75065" },
  { id: "deep-violet", name: "Deep Violet", color: "#512160" },
  { id: "dark-teal", name: "Dark Teal", color: "#075e54" },
  { id: "mustard-gold", name: "Mustard Gold", color: "#8d781e" },
  { id: "royal-blue", name: "Royal Blue", color: "#3761a1" },
  { id: "slate-grey", name: "Slate Grey", color: "#637075" },
  { id: "vibrant-pink", name: "Vibrant Pink", color: "#e54a7b" },
  { id: "olive-green", name: "Olive Green", color: "#4c5d33" },
  { id: "ice-blue", name: "Ice Blue", color: "#5aa4c7" },
  { id: "deep-purple", name: "Deep Purple", color: "#391a48" },
  { id: "dusty-plum", name: "Dusty Plum", color: "#7a547b" },
  { id: "yellow-green", name: "Yellow Green", color: "#a7b32f" },
  { id: "aqua-teal", name: "Aqua Teal", color: "#4ba4b4" },
  { id: "steel-blue", name: "Steel Blue", color: "#516877" },
  { id: "burgundy", name: "Burgundy", color: "#4a1424" },
];

// Smart Auto-Fit PNG Slide Generator (Auto Scales Font to Fit 100% Text)
async function generatePngSlideBlob(
  textChunk,
  slideNumber,
  totalSlides,
  theme = SLIDE_THEMES[0]
) {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");

    const bgColor = theme?.color || "#25d366";

    // 1. Background Solid Fill
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Geometric Frame Border
    const frameMargin = 36;
    const frameWidth = canvas.width - frameMargin * 2;
    const frameHeight = canvas.height - frameMargin * 2;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 14;
    ctx.strokeRect(frameMargin, frameMargin, frameWidth, frameHeight);

    // ---------------- TOP HEADER ROW ----------------
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.beginPath();
    ctx.roundRect(75, 75, 210, 54, 16);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`SLIDE ${slideNumber}/${totalSlides}`, 180, 110);

    const wmWidth = 640;
    const wmX = canvas.width - 75 - wmWidth;

    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.beginPath();
    ctx.roundRect(wmX, 75, wmWidth, 54, 16);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 19px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      "chunked on www.usefultoolszone.com/social-media-post-chunker",
      wmX + wmWidth / 2,
      108
    );

    // ---------------- MAIN CONTENT AREA (Smart Auto-Fit Scaling) ----------------

    let cleanText = (textChunk || "")
      .replace(/\[\d+\/\d+\]/g, "")
      .replace(/\u200B{10,}\n\.\.\.Read More/g, "")
      .replace(/\.\.\.Read More/g, "")
      .trim();

    const maxWidth = canvas.width - 180; // 900px line width
    const startY = 190;
    const maxTextY = 1780; // Safe bottom boundary
    const availableHeight = maxTextY - startY;

    const words = cleanText ? cleanText.split(/\s+/) : [];

    // 🟢 DYNAMIC FONT SCALING: 42px से शुरू करेगा और टेक्स्ट लंबा होने पर ऑटोमैटिक एडजस्ट करेगा
    let fontSize = 42;
    let lineHeight = fontSize + 20;
    let lines = [];

    for (let currentFont = 42; currentFont >= 30; currentFont -= 1) {
      fontSize = currentFont;
      lineHeight = fontSize + 16; // Tighter line height when text is long
      ctx.font = `500 ${fontSize}px system-ui, -apple-system, sans-serif`;

      lines = [];
      let line = "";

      for (let n = 0; n < words.length; n++) {
        let word = words[n];

        // Long URL auto character break
        if (ctx.measureText(word).width > maxWidth) {
          if (line.trim()) {
            lines.push(line.trim());
            line = "";
          }
          let subWord = "";
          for (let c = 0; c < word.length; c++) {
            if (ctx.measureText(subWord + word[c]).width > maxWidth) {
              lines.push(subWord);
              subWord = word[c];
            } else {
              subWord += word[c];
            }
          }
          if (subWord) line = subWord + " ";
          continue;
        }

        const testLine = line + word + " ";
        if (ctx.measureText(testLine).width > maxWidth && n > 0) {
          lines.push(line.trim());
          line = word + " ";
        } else {
          line = testLine;
        }
      }
      if (line.trim()) lines.push(line.trim());

      // अगर सारी लाइनें Available Height के अंदर आ गई हैं, तो लूप यही रोक दें
      if (lines.length * lineHeight <= availableHeight) {
        break;
      }
    }

    // 🔴 100% Guaranteed Line Drawing (No text omitted!)
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.font = `500 ${fontSize}px system-ui, -apple-system, sans-serif`;

    lines.forEach((l, idx) => {
      const currentY = startY + idx * lineHeight + fontSize;
      ctx.fillText(l.trim(), 90, currentY);
    });

    // ---------------- DECORATIVE EMBEDDED BOTTOM BORDER ----------------
    const borderY = canvas.height - frameMargin;

    if (totalSlides > 1 && slideNumber < totalSlides) {
      const ctaW = 580;
      const ctaX = (canvas.width - ctaW) / 2;

      ctx.fillStyle = bgColor;
      ctx.fillRect(ctaX - 10, borderY - 26, ctaW + 20, 52);

      ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
      ctx.beginPath();
      ctx.roundRect(ctaX, borderY - 26, ctaW, 52, 16);
      ctx.fill();

      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 22px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        `👉 READ NEXT SLIDE FOR PART ${slideNumber + 1} 📲`,
        canvas.width / 2,
        borderY + 8
      );
    } else {
      const endText = "✦ USEFUL TOOLS ZONE ✦";
      const tagW = 380;
      const tagX = (canvas.width - tagW) / 2;

      ctx.fillStyle = bgColor;
      ctx.fillRect(tagX - 10, borderY - 22, tagW + 20, 44);

      ctx.fillStyle = "rgba(0, 0, 0, 0.68)";
      ctx.beginPath();
      ctx.roundRect(tagX, borderY - 22, tagW, 44, 14);
      ctx.fill();

      ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 4;
      ctx.font = "bold 18px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(endText, canvas.width / 2, borderY + 6);
      ctx.shadowBlur = 0;
    }

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      resolve({ blob, url });
    }, "image/png");
  });
}


export default function SocialMediaTextChunkerContent({ forcedSlug }) {
  // 1. Media Upload Handler
  const handleMediaUpload = (file) => {
    if (!file) return;
    setMediaFile(file);
    setMediaType(file.type.startsWith("video/") ? "video" : "image");
    setMediaPreviewUrl(URL.createObjectURL(file));
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSlug = forcedSlug || searchParams.get("preset") || "";

  // Device Recognition State
  const [isMobile, setIsMobile] = useState(false);

  // Core States
// 🟢 Persistent Input Text (Platform switch karne par bhi text save rahega)
  const [inputText, setInputText] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("utz_saved_chunker_text") || "";
    }
    return "";
  });

  // Auto-save text to localStorage on every change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("utz_saved_chunker_text", inputText);
    }
  }, [inputText]);
  
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

  const [enableBoldKeywords, setEnableBoldKeywords] = useState(false);
  const [selectedHook, setSelectedHook] = useState(DEFAULT_HOOKS[0]);
  const [enableHoldToRead, setEnableHoldToRead] = useState(true);
const [includeMediaCaption, setIncludeMediaCaption] = useState(true);
const [shortTeaserText, setShortTeaserText] = useState("");
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

  // Media & PNG Memory States
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [pngSlides, setPngSlides] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewMode, setViewMode] = useState("png_slides"); // Default: PNG Slides Mode

  // Device System Recognition Engine
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent,
      );
      setIsMobile(checkMobile);
    }
  }, []);

  // Ctrl + F Search Interceptor (Naya Code - Paste Here)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "f") {
        e.preventDefault(); // Browser ka default search bar rokne ke liye

        setViewMode("text_copy");
        setTimeout(() => {
          const searchInput = document.getElementById("slideSearchInput");
          if (searchInput) {
            searchInput.focus();
          }
        }, 50);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
  

// Main Chunker Logic (Full Capacity Fill + 5-10% Spill Logic + No Last Slide Trigger)
  useEffect(() => {
    if (!inputText.trim()) {
      setChunks([]);
      setNextSerialIndex(0);
      return;
    }

    // 1. Cleaning: Input text se old hooks aur triggers ki safai
    let cleanInput = inputText;

    DEFAULT_HOOKS.forEach((h) => {
      cleanInput = cleanInput.replaceAll(h, "");
      cleanInput = cleanInput.replaceAll(toUnicodeBold(h), "");
    });
    if (customHooks && customHooks.length > 0) {
      customHooks.forEach((h) => {
        cleanInput = cleanInput.replaceAll(h, "");
        cleanInput = cleanInput.replaceAll(toUnicodeBold(h), "");
      });
    }

    cleanInput = cleanInput.replace(/⏸️\s*\(Hold screen to pause & read full text\)/g, "");
    cleanInput = cleanInput.replace(new RegExp(toUnicodeBold("(Hold screen to pause & read full text)"), "g"), "");
    cleanInput = cleanInput.replace(/\u200B{10,}\n\.\.\.Read More/g, "");
    cleanInput = cleanInput.replace(/\[\d+\/\d+\]\n?/g, "");
    cleanInput = cleanInput.trim();

    if (enableBoldKeywords) {
      cleanInput = cleanInput.replace(/\b[A-Z0-9]{2,}\b/g, (match) =>
        toUnicodeBold(match)
      );
    }

    // 🟢 Desktop vs Mobile Separate PNG Limit Logic
// 🟢 Mobile = 1050 Chars (~1100 Chars Total: 100% full height without cutting the hold line)
    // Desktop = 660 Chars
    const pngLimit = isMobile ? 1020 : 660;
    const effectiveLimit = viewMode === "png_slides" ? pngLimit : (Number(customLimit) || 700);


    const words = cleanInput.split(/\s+/);
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

 // 2. Ultra-Tight 3% Spill & Second-Last Slide Auto-Merge Logic
    if (rawChunks.length > 1) {
      const lastChunk = rawChunks[rawChunks.length - 1];
      const previousChunk = rawChunks[rawChunks.length - 2];

      // Agar last slide ka content <= 100 chars (below 3%) hai 
      // YA second-last slide me absorb ho sakta hai (up to 1180 chars)
      if (
        lastChunk.length <= 100 ||
(previousChunk + " " + lastChunk).length <= 1400      ) {
        const removedLast = rawChunks.pop();
        rawChunks[rawChunks.length - 1] = (previousChunk + "\n\n" + removedLast).trim();
      }
    }

    const total = rawChunks.length;

    // 3. Final Formatting (NO Hold Trigger on Last Slide!)
    const finalChunks = rawChunks.map((chunk, index) => {
      let result = chunk;

      // Primary Attention Hook ONLY on Slide 1
      if (index === 0 && selectedHook && selectedHook !== "none") {
        result = `${toUnicodeBold(selectedHook)}\n\n${result}`;
      }

      // 🔴 Hold Trigger ONLY on Intermediate Slides (NOT on Last Slide!)
      if (enableHoldToRead && index < total - 1) {
        result += `\n\n⏸️ ${toUnicodeBold("(Hold screen to pause & read full text)")}`;
      }

      // Slide Badge Prefix
      if (total > 1) {
        result = `[${index + 1}/${total}]\n${result}`;
      }

      // Read More Trigger (WhatsApp only in Text Copy Mode on Last Slide)
      if (
        selectedPlatform === "whatsapp" &&
        enableReadMore &&
        index === total - 1 &&
        viewMode === "text_copy"
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
    customHooks,
    viewMode,
    isMobile,
  ]);

  // Helper logic to split text into array chunks
  const generateChunksFromText = (textToChunk) => {
    const effectiveLimit = Number(customLimit) || 300;
    const words = textToChunk.split(/\s+/);
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
      if (selectedPlatform === "whatsapp" && enableReadMore && index === total - 1) {
        result += "\u200B".repeat(3500) + "\n...Read More";
      }
      return result;
    });

    setChunks(finalChunks);
  };

  // Current Selected Theme State
  const [themeIndex, setThemeIndex] = useState(0);
  const [selectedSlideTheme, setSelectedSlideTheme] = useState(SLIDE_THEMES[0]);

  // WhatsApp Palette Click -> Cycle to Next Color & Auto-Regenerate
  const handleNextTheme = () => {
    const nextIdx = (themeIndex + 1) % SLIDE_THEMES.length;
    setThemeIndex(nextIdx);
    const newTheme = SLIDE_THEMES[nextIdx];
    setSelectedSlideTheme(newTheme);

    if (chunks.length > 0) {
      handleGeneratePngSlides(newTheme);
    }
  };
// Direct Swatch Click Handler
  const handleSelectTheme = (theme, idx) => {
    setThemeIndex(idx);
    setSelectedSlideTheme(theme);

    if (chunks.length > 0) {
      handleGeneratePngSlides(theme);
    }
  };

// Generate PNG Slides Handler
  const handleGeneratePngSlides = async (targetTheme) => {
    if (chunks.length === 0 && !mediaFile) return;
    setIsProcessing(true);

    const activeTheme =
      targetTheme && typeof targetTheme === "object" && targetTheme.color
        ? targetTheme
        : selectedSlideTheme;

    pngSlides.forEach((s) => URL.revokeObjectURL(s.url));
    setPngSlides([]);

    const slides = [];
    const totalSlidesCount = chunks.length;

    for (let i = 0; i < chunks.length; i++) {
      const res = await generatePngSlideBlob(
        chunks[i],
        i + 1,
        totalSlidesCount,
        activeTheme
      );
      slides.push({
        index: i + 1,
        text: chunks[i],
        blob: res.blob,
        url: res.url,
      });
    }

    setPngSlides(slides);
    setIsProcessing(false);

    // Auto-scroll to results
    setTimeout(() => {
      const resultsSection = document.getElementById("pngResultsArea");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  }; // 👈 YAHAN SIRF EK HI '};' RAHEGA (Extra }; hata diya gaya hai)

  // 1-Click Color Swatch Click -> Auto Re-Generate Slides Live
  const handleThemeChange = (theme) => {
    setSelectedSlideTheme(theme);
    if (chunks.length > 0) {
      handleGeneratePngSlides(theme);
    }
  };

  // Clipboard Paste Handler (For Textarea Image/Video Paste)
  const handlePaste = (e) => {
    const clipboardItems = e.clipboardData?.items;
    if (!clipboardItems) return;

    for (const item of clipboardItems) {
      if (item.type.startsWith("image/") || item.type.startsWith("video/")) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          handleMediaUpload(file);
        }
        break;
      }
    }
  };
// 🟢 Helper: Generates Clean Short Teaser Caption (Zero Full-Text Leak)
  const getTeaserCaption = () => {
    if (chunkMode !== "video-hooks" || !includeMediaCaption) return "";

    const hookPrefix = selectedHook && selectedHook !== "none" ? `${selectedHook}\n\n` : "";

    let teaser = shortTeaserText.trim();
    if (!teaser) {
      const firstLine = inputText.trim().split("\n")[0] || "";
      teaser = firstLine.length > 110 ? firstLine.slice(0, 110).trim() + "..." : firstLine;
    }

    return `${hookPrefix}${teaser}\n\n👉 Read full story in next slides 📲`.trim();
  };

  // Master 1-Click Multi-File Share
  const handleShareAll = async () => {
    const cleanTopic = inputText.trim().split(/\s+/)[0]?.replace(/[^a-zA-Z0-9]/g, "") || "Post";
    const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const timeStamp = Math.floor(Date.now() / 1000).toString().slice(-4);
    const baseName = `UTZ_${cleanTopic}_${dateStamp}_${timeStamp}`;

    const filesToShare = [];

    if (mediaFile) {
      const ext = mediaFile.name.split(".").pop() || "jpg";
      filesToShare.push(new File([mediaFile], `${baseName}_Media.${ext}`, { type: mediaFile.type }));
    }

    pngSlides.forEach((slide) => {
      filesToShare.push(new File([slide.blob], `${baseName}_Slide_${slide.index}.png`, { type: "image/png" }));
    });

    if (filesToShare.length === 0) return;

    let finalShareCaption = "";
    if (chunkMode === "video-hooks" && includeMediaCaption) {
      finalShareCaption = getTeaserCaption();
    }

    if (isMobile && typeof navigator !== "undefined" && navigator.canShare) {
      try {
        if (navigator.canShare({ files: filesToShare })) {
          await navigator.share({
            files: filesToShare,
            title: `${currentPlatformName} Multi-Slide Post`,
            text: finalShareCaption,
          });
          return;
        }
      } catch (err) {
        if (err.name === "AbortError") return;
      }
    }

    filesToShare.forEach((file, idx) => {
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, idx * 220);
    });
  };

  // Single File Share Helper (For Attached Media)
  const handleShareFile = async (file, textCaption = "", isSlide1Media = false) => {
    let finalCaption = textCaption;
    
    if (isSlide1Media && chunkMode === "video-hooks" && includeMediaCaption) {
      finalCaption = getTeaserCaption();
    }

    if (typeof navigator !== "undefined" && navigator.canShare && file && isMobile) {
      try {
        await navigator.share({ files: [file], text: finalCaption });
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    } else {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = file.name || "UTZ_Media.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // PNG Slide Share Handler (Fixed Teaser & URL Extractor Logic)
  const handleShareSlide = async (slideIndex) => {
    const currentSlide = pngSlides[slideIndex];
    if (!currentSlide) return;

    try {
      const file = new File([currentSlide.blob], `Slide_${slideIndex + 1}.png`, { type: "image/png" });

      let shareCaption = "";
      const total = pngSlides.length;

      // 🌐 Slide 1 gets the short Hook/Teaser
      if (slideIndex === 0 && chunkMode === "video-hooks" && includeMediaCaption) {
        shareCaption = getTeaserCaption();
      } 
      // 🌐 Last Slide gets clickable links (if any exist)
      else if (slideIndex === total - 1) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const extractedUrls = inputText.match(urlRegex) || [];
        const uniqueUrls = [...new Set(extractedUrls)];

        if (uniqueUrls.length > 0) {
          shareCaption = `🌐 OFFICIAL SOURCE & DIRECT LINKS:\n\n` +
            uniqueUrls.map((url) => `🔗 ${url}`).join("\n\n") +
            `\n\n📌 Tap the link above to visit or download app!`;
        }
      }

      if (typeof navigator !== "undefined" && navigator.canShare && isMobile && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: shareCaption });
      } else {
        const link = document.createElement("a");
        link.href = currentSlide.url;
        link.download = `UTZ_Slide_${slideIndex + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      if (err.name !== "AbortError") console.error("Share failed:", err);
    }
  };

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
  // 💻 PC / DESKTOP BANNER (Unchanged - Original Setup)
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
  // 📱 MOBILE BANNER (Dynamic & Optimized for Mobile)
  <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-800 dark:text-emerald-300 animate-fadeIn">
    <span className="text-base shrink-0">📱</span>
    <div className="leading-relaxed">
      <strong className="font-extrabold block text-emerald-900 dark:text-emerald-200">
        Mobile Device Detected:
      </strong>
      {viewMode === "png_slides" ? (
        <span>
          1-Tap Direct Native Sharing active! Easily post HD PNG slides and media directly to your WhatsApp Status or Social Apps.
        </span>
      ) : (
        <span>
          Direct App Share & 1-Tap Serial Copy active! Copy parts sequentially or share text chunks directly to apps.
        </span>
      )}
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

{/* 🟢 Conditional Teaser Checkbox: Only visible when Video/Photo Storyboard Mode is selected */}
{chunkMode === "video-hooks" && (
  <div className="col-span-full space-y-2 mt-1 animate-fadeIn">
    <label className="flex items-center gap-2 cursor-pointer select-none bg-indigo-100/60 dark:bg-indigo-950/60 p-2 rounded-xl border border-indigo-300 dark:border-indigo-800">
      <input
        type="checkbox"
        checked={includeMediaCaption}
        onChange={(e) => setIncludeMediaCaption(e.target.checked)}
        className="rounded text-indigo-600 focus:ring-0 cursor-pointer w-4 h-4 shrink-0"
      />
      <span className="text-indigo-950 dark:text-indigo-200 font-extrabold text-[11px] leading-tight">
        Attach Short Teaser & &quot;Read full story in next slides 📲&quot; Caption
      </span>
    </label>

    {/* ⚠️ Warning Info Box (Appears instantly when UNCHECKED) */}
    {!includeMediaCaption && (
      <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl flex items-start gap-2 text-[11px] text-amber-900 dark:text-amber-200 animate-fadeIn">
        <span className="text-sm shrink-0">⚠️</span>
        <div className="leading-snug font-semibold">
          <strong className="font-extrabold block text-amber-950 dark:text-amber-100 mb-0.5">
            Pure PNG Mode Active:
          </strong>
          Captions will stay completely empty when sharing. Your full text will convert directly into clean PNG slides starting from Slide 1 without any teaser cuts.
        </div>
      </div>
    )}
  </div>
)}

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
                      {showCustomInput
                        ? "✕ Cancel"
                        : "✨ + Create Your Own Hook"}
                    </button>
                  </div>

                  {/* Custom Hook Creation Input Field */}
                  {showCustomInput && (
                    <form
                      onSubmit={handleAddCustomHook}
                      className="flex items-center gap-2 animate-fadeIn"
                    >
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
                            <span className="truncate max-w-[180px]">
                              {hook}
                            </span>
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

              {/* MEDIA ATTACH & PNG PROCESS CONTROL WITH COLOR THEME & PREVIEW TILE */}
              <div className="p-4 bg-slate-100 dark:bg-gray-900/80 rounded-2xl border border-slate-200 dark:border-gray-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label className="cursor-pointer text-xs font-bold bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 hover:border-indigo-500 px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-sm">
                    <span>📁 Attach Photo / Video</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleMediaUpload(file);
                        }
                      }}
                    />
                  </label>

                  {/* 👇 YE NAYA BUTTON YAHAN ADD KAREIN 👇 */}
                  {mediaFile && (
                    <button
                      type="button"
                      onClick={() =>
                        handleGeneratePngSlides(selectedSlideTheme, true)
                      }
                      className="text-xs font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      Want to generate slide for this also? Click here
                    </button>
                  )}
                  {/* HD WHATSAPP PALETTE SWITCHER & STABLE PAGINATED DOTS */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* HD Interactive Palette Button */}
                    <button
                      type="button"
                      onClick={handleNextTheme}
                      className="relative group flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-900 text-white rounded-2xl text-xs font-black shadow-lg hover:shadow-indigo-500/20 border border-indigo-500/40 hover:border-indigo-400 transition-all active:scale-95 cursor-pointer overflow-hidden"
                      title="Click to cycle next background color"
                    >
                      {/* Subtle Animated Gradient Glow Effect */}
                      <span className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-emerald-400 opacity-20 group-hover:opacity-40 blur-sm transition-opacity"></span>

                      {/* Animated Palette Icon */}
                      <span className="relative flex items-center justify-center w-6 h-6 rounded-lg bg-white/10 group-hover:scale-110 transition-transform">
                        <span className="text-sm">🎨</span>
                      </span>

                      <div className="relative text-left">
                        <span className="text-[9px] uppercase tracking-wider text-indigo-300 font-extrabold block leading-none mb-0.5">
                          Click to Switch ⚡
                        </span>
                        <span className="text-xs font-black text-white block leading-none">
                          {selectedSlideTheme.name}
                        </span>
                      </div>

                      {/* Cycle Arrow Symbol */}
                      <span className="relative text-indigo-300 group-hover:rotate-180 transition-transform duration-300 text-xs ml-1">
                        🔄
                      </span>
                    </button>

                    {/* STABLE 5-DOT PAGINATED SWATCH CONTAINER (Zero Jumpiness) */}
                    <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-gray-950 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-inner">
                      {(() => {
                        // Page calculation: Keeps 5 dots locked in place until cycling past the 5th dot
                        const pageSize = 5;
                        const pageStart =
                          Math.floor(themeIndex / pageSize) * pageSize;
                        const currentWindow = SLIDE_THEMES.slice(
                          pageStart,
                          pageStart + pageSize,
                        );

                        return currentWindow.map((theme) => {
                          const realIdx = SLIDE_THEMES.findIndex(
                            (t) => t.id === theme.id,
                          );
                          const isActive = selectedSlideTheme.id === theme.id;
                          return (
                            <button
                              key={theme.id}
                              type="button"
                              onClick={() => handleSelectTheme(theme, realIdx)}
                              className={`w-6 h-6 rounded-full transition-all duration-200 cursor-pointer relative ${
                                isActive
                                  ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-950 scale-125 shadow-md z-10"
                                  : "opacity-60 hover:opacity-100 hover:scale-110"
                              }`}
                              style={{ backgroundColor: theme.color }}
                              title={`${theme.name} (Click to select)`}
                            >
                              {isActive && (
                                <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-black drop-shadow-md">
                                  ✓
                                </span>
                              )}
                            </button>
                          );
                        });
                      })()}

                      {/* Page Counter Badge */}
                      <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 px-1 select-none">
                        {Math.floor(themeIndex / 5) + 1}/
                        {Math.ceil(SLIDE_THEMES.length / 5)}
                      </span>
                    </div>
                  </div>
       {chunks.length > 0 && (
  <button
    type="button"
    disabled={isProcessing}
    onClick={() => handleGeneratePngSlides(selectedSlideTheme)}
    className="relative group overflow-hidden px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white rounded-2xl text-xs font-black shadow-lg hover:shadow-indigo-500/30 border border-white/20 transition-all duration-300 active:scale-95 cursor-pointer disabled:opacity-50 shrink-0"
  >
    {/* Background Shine Effect */}
    <span className="absolute -inset-full top-0 block w-1/2 h-full bg-white/20 transform -skew-x-12 group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out"></span>

    <span className="relative flex items-center justify-center gap-2">
      {isProcessing ? (
        <>
          <span className="animate-spin text-sm">⏳</span>
         <span>Generating HD Slides...</span>
            </>
          ) : (
            <>
              <span className="text-sm">🖼️</span>
              <span>Generate PNG Slides</span>
            </>
          )}
        </span>
      </button>
    )}
  </div>
                {/* VISUAL ATTACHED MEDIA PREVIEW TILE */}
                {mediaPreviewUrl && (
                  <div className="flex items-center gap-3 p-2.5 bg-white dark:bg-gray-950 rounded-2xl border border-emerald-500/40 shadow-sm relative animate-fadeIn max-w-sm">
                    <div className="w-14 h-14 bg-black rounded-xl overflow-hidden shrink-0 border border-slate-300 dark:border-gray-800">
                      {mediaType === "video" ? (
                        <video
                          src={mediaPreviewUrl}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={mediaPreviewUrl}
                          alt="Attached Preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pr-6">
                      <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                        ✓ Media Attached
                      </span>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                        {mediaFile?.name}
                      </p>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                        {mediaType === "video"
                          ? "📹 Video File"
                          : "🖼️ Image File"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setMediaFile(null);
                        setMediaPreviewUrl(null);
                        setMediaType(null);
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center font-black cursor-pointer shadow-sm transition-all"
                      title="Remove Media"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* TEXT INPUT AREA */}
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>
                    Paste Your Full Text Below (Or Paste Image Directly)
                  </span>
                  {mediaFile && (
                    <span className="text-emerald-500 font-bold text-[11px]">
                      ✓ Media Attached: {mediaFile.name}
                    </span>
                  )}
                </label>
                <textarea
                  rows="6"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onPaste={handlePaste}
                  placeholder="Paste text here, OR press Ctrl + V / long-press to paste an Image/Video directly into this box..."
                  className="w-full p-4 bg-slate-50 dark:bg-gray-950 border-2 border-slate-200 dark:border-gray-800 focus:border-blue-500 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white outline-none resize-none transition-all"
                ></textarea>
              </div>
{/* OUTPUT CHUNKS GRID WITH SERIAL QUEUE BUTTON */}
              {chunks.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-900/40">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    View Mode:
                  </span>
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="viewMode"
                        value="png_slides"
                        checked={viewMode === "png_slides"}
                        onChange={() => setViewMode("png_slides")}
                        className="accent-indigo-600 cursor-pointer"
                      />
                      <span
                        className={
                          viewMode === "png_slides"
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-slate-500"
                        }
                      >
                        🖼️ Photo/Video + PNG Slides
                      </span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="viewMode"
                        value="text_copy"
                        checked={viewMode === "text_copy"}
                        onChange={() => setViewMode("text_copy")}
                        className="accent-indigo-600 cursor-pointer"
                      />
                      <span
                        className={
                          viewMode === "text_copy"
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-slate-500"
                        }
                      >
                        📝 Text Only (Serial Copy)
                      </span>
                    </label>
                  </div>
                </div>
              )}

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

                  {/* PNG SLIDES MODE DISPLAY */}
                  {viewMode === "png_slides" &&
                    (pngSlides.length > 0 || mediaFile) && (
                      <div className="space-y-3 pt-2">
                        {/* MASTER 1-CLICK MULTI-SHARE & PRO INFO BANNER */}
                        <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                          <div className="space-y-1 text-left">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-white flex items-center gap-1.5">
                                🚀 1-Click Master Multi-Export
                              </span>
                              <span className="px-2 py-0.5 text-[9px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 rounded-full uppercase">
                                UTZ Auto-Naming Enabled
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-300 font-medium">
                              {isMobile ? (
                                <span>
                                  📲 <strong>Mobile Share:</strong> Opens native
                                  app menu to share all{" "}
                                  {pngSlides.length + (mediaFile ? 1 : 0)}{" "}
                                  slides with caption instantly.
                                </span>
                              ) : (
                                <span>
                                  💻 <strong>Desktop Download:</strong>{" "}
                                  Auto-saves structured slides directly to your
                                  PC downloads folder. Ready to drag & drop into
                                  WhatsApp Web!
                                </span>
                              )}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={handleShareAll}
                            className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer shrink-0 flex items-center justify-center gap-2"
                          >
                            <span>📲</span>
                            <span>
                              {isMobile
                                ? "Share All via App"
                                : "Download All Slides (UTZ)"}
                            </span>
                          </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {/* SLIDE 1 (Media + Hook) */}
                          <div className="col-span-full p-3 bg-slate-100 dark:bg-gray-900 rounded-xl border border-indigo-500/30 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              {mediaPreviewUrl && (
                                <div className="w-16 h-20 bg-black rounded-lg overflow-hidden shrink-0 border border-slate-700">
                                  {mediaType === "video" ? (
                                    <video
                                      src={mediaPreviewUrl}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <img
                                      src={mediaPreviewUrl}
                                      alt="Preview"
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                              )}
                              <div>
                                <span className="text-[10px] font-bold text-indigo-500 uppercase block">
                                  Slide 1 (Media + Hook)
                                </span>
                                <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2">
                                  {chunks[0]}
                                </p>
                              </div>
                            </div>

                            {mediaFile && (
                              <button
                                type="button"
                                onClick={() => handleShareFile(mediaFile, "", true)}
                                className="px-3 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-lg shrink-0 cursor-pointer"
                              >
                                🚀 Share
                              </button>
                            )}
                          </div>

                          {/* GENERATED PNG SLIDES */}
                          {pngSlides.map((slide) => (
                            <div
                              key={slide.index}
                              className="p-2 bg-slate-100 dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-800 flex flex-col items-center space-y-2"
                            >
                              <img
                                src={slide.url}
                                alt={`Slide ${slide.index}`}
                                className="w-full aspect-[9/16] object-contain bg-slate-900/10 dark:bg-black/50 rounded-xl shadow-sm border border-slate-200/60 dark:border-white/10"
                              />
                              <button
                                type="button"
                                onClick={() => handleShareSlide(slide.index - 1)}
                                className="w-full py-1 text-[10px] font-bold bg-slate-800 hover:bg-indigo-600 text-white rounded-lg cursor-pointer"
                              >
                                🚀 Share Slide {slide.index}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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
          </section>z

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
