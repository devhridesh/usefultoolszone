"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";

const PLATFORM_LIMITS = {
  whatsapp: {
    name: "WhatsApp Status & Slides",
    limit: 700, // 🟢 700 Chars fills 9:16 Full HD digital screen perfectly
    icon: "💬",
    slug: "whatsapp-status-formatter",
    desc: "Optimized 700-character chunks for clean WhatsApp status & Full HD slides.",
  },
  pinterest: {
    name: "Pinterest Carousel (2:3 Retina HD)",
    limit: 850, // 🟢 850 Chars fills 2:3 Ultra HD pin perfectly with minimal slide count
    icon: "📌",
    slug: "pinterest-carousel-generator",
    desc: "Ultra-crisp 2:3 Retina HD (1600x2400) slides with zero compression blur for Pinterest carousels.",
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
    desc: "Split long posts into 500-character Meta Threads slides cleanly.",
  },
  instagram: {
    name: "Instagram Slides / Reels",
    limit: 450,
    icon: "📸",
    slug: "instagram-reels-text-hooks",
    desc: "450-character bite-sized chunks for high-CTR carousel slides & reels overlays.",
  },
  linkedin: {
    name: "LinkedIn Document Carousel",
    limit: 600,
    icon: "💼",
    slug: "linkedin-post-splitter",
    desc: "Format & chunk 600-character professional LinkedIn document slides.",
  },
  telegram: {
    name: "Telegram Channel Slides",
    limit: 700,
    icon: "✈️",
    slug: "telegram-message-chunker",
    desc: "Large 700-character Telegram slide formatting.",
  },
};

const SLUG_MAP = {
  whatsapp: "whatsapp",
  "whatsapp-status-formatter": "whatsapp",
  pinterest: "pinterest",
  "pinterest-carousel-generator": "pinterest",
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
// Premium Aesthetic Status Colors with Auto Text Color Contrast
// 🟢 20 Handcrafted Themes (Page 1 = 5 Paper/Diary + Pages 2,3,4 = 15 Original Pro Colors)
const SLIDE_THEMES = [
  // ==========================================
  // --- PAGE 1 (1/4): Authentic Paper & Diary Journal Themes ---
  // ==========================================
  {
    id: "old-ruled-diary",
    name: "Old Ruled Diary",
    color: "#F4ECD8",
    textColor: "#1E3A8A", // Vintage Blue Ink
    isPaper: true,
    ruled: true,
    isOld: true,
    marginColor: "rgba(225, 29, 72, 0.45)",
    lineColor: "rgba(30, 58, 138, 0.15)",
  },
  {
    id: "new-ruled-notebook",
    name: "New Ruled Notebook",
    color: "#FCFCF9",
    textColor: "#18181B", // Black Gel Ink
    isPaper: true,
    ruled: true,
    isOld: false,
    marginColor: "rgba(244, 63, 94, 0.4)",
    lineColor: "rgba(71, 85, 105, 0.15)",
  },
  {
    id: "vintage-parchment",
    name: "Old Blank Parchment",
    color: "#EFE3C3",
    textColor: "#3B2219", // Sepia Ink
    isPaper: true,
    ruled: false,
    isOld: true,
  },
  {
    id: "fresh-blank-journal",
    name: "New Blank Journal",
    color: "#FAF8F5",
    textColor: "#0F172A", // Midnight Black Ink
    isPaper: true,
    ruled: false,
    isOld: false,
  },
  {
    id: "vintage-yellow-pad",
    name: "Old Legal Yellow Pad",
    color: "#FEF9C3",
    textColor: "#1E3A8A", // Fountain Blue Ink
    isPaper: true,
    ruled: true,
    isOld: true,
    marginColor: "rgba(239, 68, 68, 0.45)",
    lineColor: "rgba(59, 130, 246, 0.15)",
  },

  // ==========================================
  // --- PAGE 2 (2/4): Executive & Luxury Dark Tones ---
  // ==========================================
  { id: "midnight-navy", name: "Midnight Navy", color: "#0F172A", textColor: "#FFFFFF" },
  { id: "deep-emerald", name: "Deep Emerald", color: "#064E3B", textColor: "#FFFFFF" },
  { id: "royal-sapphire", name: "Royal Sapphire", color: "#1E3A8A", textColor: "#FFFFFF" },
  { id: "rich-burgundy", name: "Rich Burgundy", color: "#4C0519", textColor: "#FFFFFF" },
  { id: "charcoal-matte", name: "Charcoal Matte", color: "#18181B", textColor: "#FFFFFF" },

  // ==========================================
  // --- PAGE 3 (3/4): Earthy, Coffee & Warm Sunset Tones ---
  // ==========================================
  { id: "coffee-espresso", name: "Coffee Espresso", color: "#2C1A14", textColor: "#FEF3C7" },
  { id: "warm-terracotta", name: "Warm Terracotta", color: "#9A3412", textColor: "#FFFFFF" },
  { id: "plum-violet", name: "Plum Violet", color: "#4A1D6D", textColor: "#FFFFFF" },
  { id: "slate-blue", name: "Slate Blue", color: "#1E293B", textColor: "#F8FAFC" },
  { id: "forest-green", name: "Forest Green", color: "#14532D", textColor: "#FFFFFF" },

  // ==========================================
  // --- PAGE 4 (4/4): Vibrant Modern & Editorial Tones ---
  // ==========================================
  { id: "ocean-teal", name: "Ocean Teal", color: "#0E7490", textColor: "#FFFFFF" },
  { id: "steel-indigo", name: "Steel Indigo", color: "#3730A3", textColor: "#FFFFFF" },
  { id: "crimson-velvet", name: "Crimson Velvet", color: "#831843", textColor: "#FFFFFF" },
  { id: "deep-cyan", name: "Deep Cyan", color: "#047857", textColor: "#FFFFFF" },
  { id: "midnight-purple", name: "Midnight Purple", color: "#3B0764", textColor: "#FFFFFF" },
];


// 🟢 HIGH-SPEED FONT CACHE ENGINE (Zero Lag on Mobile)
const fontLoadCache = new Set();

async function ensureHandwritingFonts(fontName = "Kalam") {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (fontLoadCache.has(fontName)) return; // ⚡ Instant skip if already cached!

  try {
    if (!document.getElementById("utz-handwriting-fonts")) {
      const link = document.createElement("link");
      link.id = "utz-handwriting-fonts";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Amita:wght@400;700&family=Caveat:wght@400;500;700&family=Dekko&family=Kalam:wght@300;400;700&family=Tillana:wght@400;600&display=swap";
      document.head.appendChild(link);
    }

    if (document.fonts && document.fonts.load) {
      await Promise.all([
        document.fonts.load(`400 40px "${fontName}"`),
        document.fonts.load(`600 40px "${fontName}"`),
        document.fonts.load(`700 40px "${fontName}"`),
      ]);
      await document.fonts.ready;
    }

    fontLoadCache.add(fontName);
  } catch (e) {
    console.error("Font Load Error:", e);
  }
}



// 🟢 Helper: Convert mathematical unicode bold back to normal chars for handwriting fonts
function normalizeUnicodeText(str = "") {
  return str
    .replace(/[\uD835][\uDC00-\uDC33]/g, (c) =>
      String.fromCharCode(c.codePointAt(0) - 0x1d400 + 65)
    )
    .replace(/[\uD835][\uDC1A-\uDC33]/g, (c) =>
      String.fromCharCode(c.codePointAt(0) - 0x1d41a + 97)
    )
    .replace(/[\uD835][\uDFCE-\uDFD7]/g, (c) =>
      String.fromCharCode(c.codePointAt(0) - 0x1d7ce + 48)
    )
    .replace(/[\uD835][\uDDD4-\uDDFD]/g, (c) =>
      String.fromCharCode(c.codePointAt(0) - 0x1d5d4 + 65)
    )
    .replace(/[\uD835][\uDDEE-\uDE07]/g, (c) =>
      String.fromCharCode(c.codePointAt(0) - 0x1d5ee + 97)
    );
}
async function generatePngSlideBlob(
  textChunk,
  slideNumber,
  totalSlides,
  theme = SLIDE_THEMES[0],
  platform = "whatsapp",
  handwritingFont = "Kalam",
  penThickness = "thin"
) {
  await ensureHandwritingFonts(handwritingFont);

  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const isPaper = Boolean(theme?.isPaper);
    const isPinterest = platform === "pinterest";

    // 🟢 DYNAMIC DPI / RETINA SCALE: Pinterest gets 1.48x high-res scale (1600x2400) for zero blur
    const scaleFactor = isPinterest ? 1.48 : 1.0;

    let canvasWidth = 1080;
    let canvasHeight = 1920;

    if (isPinterest) {
      // 🟢 2:3 Ultra-HD Retina Canvas (1600x2400) - Overcomes Pinterest compression algorithm
      canvasWidth = 1600;
      canvasHeight = 2400;
    } else if (["instagram", "twitter", "threads", "linkedin"].includes(platform) && !isPaper) {
      canvasWidth = 1080;
      canvasHeight = 1350;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");

    const bgColor = theme?.color || "#0F172A";
    const primaryText = theme?.textColor || "#FFFFFF";

    const weightMap = {
      thin: "400",
      medium: "500",
      dark: "700",
    };
    const activeWeight = isPaper ? (weightMap[penThickness] || "400") : "600";

    // ---------------- 1. BACKGROUND RENDERING (Ruled Lines Engine) ----------------
    const startLineY = Math.round(180 * scaleFactor);
    const lineGap = Math.round((isPinterest && isPaper ? 72 : isPaper ? 62 : 58) * scaleFactor); 
    const endLineY = canvas.height - Math.round(95 * scaleFactor);

    if (isPaper) {
      if (theme.isOld) {
        const grad = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          canvas.width * 0.15,
          canvas.width / 2,
          canvas.height / 2,
          canvas.height * 0.8
        );
        grad.addColorStop(0, "#FDF8E8");
        grad.addColorStop(0.7, theme.color);
        grad.addColorStop(1, "#E2CCA2");
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = bgColor;
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (theme.ruled) {
        ctx.strokeStyle = theme.lineColor || "rgba(30, 58, 138, 0.16)";
        ctx.lineWidth = 1.6 * scaleFactor;

        for (let y = startLineY; y <= endLineY; y += lineGap) {
          ctx.beginPath();
          ctx.moveTo(Math.round(40 * scaleFactor), y);
          ctx.lineTo(canvas.width - Math.round(40 * scaleFactor), y);
          ctx.stroke();
        }

        const marginX = Math.round(145 * scaleFactor);
        ctx.strokeStyle = theme.marginColor || "rgba(225, 29, 72, 0.45)";
        ctx.lineWidth = 2 * scaleFactor;
        ctx.beginPath();
        ctx.moveTo(marginX, 0);
        ctx.lineTo(marginX, canvas.height);
        ctx.stroke();
      }
    } else {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const frameMargin = Math.round(36 * scaleFactor);
      const isDarkText =
        primaryText !== "#FFFFFF" &&
        primaryText !== "#F8FAFC" &&
        primaryText !== "#CCFBF1" &&
        primaryText !== "#FEF3C7";

      ctx.strokeStyle = isDarkText ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = Math.round(14 * scaleFactor);
      ctx.strokeRect(frameMargin, frameMargin, canvas.width - frameMargin * 2, canvas.height - frameMargin * 2);
    }

// ---------------- 2. TOP HEADER ROW (High-Visibility Branding) ----------------
    const headerTop = Math.round(75 * scaleFactor);
    const badgeH = Math.round(54 * scaleFactor);

    if (isPaper) {
      // 🟢 Page Number Indicator
      ctx.fillStyle = primaryText;
      ctx.font = `700 ${Math.round(26 * scaleFactor)}px "${handwritingFont}", cursive, sans-serif`;
      ctx.textAlign = "left";
      ctx.fillText(
        `Page ${slideNumber} of ${totalSlides}`,
        Math.round(80 * scaleFactor),
        headerTop + badgeH * 0.58
      );

      // 🟢 Large, Sharp & Highly Visible Watermark
      ctx.font = `600 ${Math.round(22 * scaleFactor)}px system-ui, -apple-system, sans-serif`;
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(15, 23, 42, 0.70)"; // High-contrast readable slate tone
      ctx.fillText(
        "useful tools zone / social media post chunker",
        canvas.width - Math.round(80 * scaleFactor),
        headerTop + badgeH * 0.58
      );

      // Underline Divider
      ctx.strokeStyle = "rgba(0, 0, 0, 0.20)";
      ctx.lineWidth = 1.5 * scaleFactor;
      ctx.beginPath();
      ctx.moveTo(Math.round(60 * scaleFactor), headerTop + badgeH + 6);
      ctx.lineTo(canvas.width - Math.round(60 * scaleFactor), headerTop + badgeH + 6);
      ctx.stroke();
    } else {
      const isDarkText =
        primaryText !== "#FFFFFF" &&
        primaryText !== "#F8FAFC" &&
        primaryText !== "#CCFBF1" &&
        primaryText !== "#FEF3C7";
      const boxBg = isDarkText ? "rgba(0, 0, 0, 0.08)" : "rgba(0, 0, 0, 0.28)";
      const boxBorder = isDarkText ? "rgba(0, 0, 0, 0.16)" : "rgba(255, 255, 255, 0.45)";

      const badgeW = Math.round(210 * scaleFactor);
      const badgeX = Math.round(75 * scaleFactor);

      ctx.fillStyle = boxBg;
      ctx.beginPath();
      ctx.roundRect(badgeX, headerTop, badgeW, badgeH, Math.round(16 * scaleFactor));
      ctx.fill();
      ctx.strokeStyle = boxBorder;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = primaryText;
      ctx.font = `bold ${Math.round(24 * scaleFactor)}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(`SLIDE ${slideNumber}/${totalSlides}`, badgeX + badgeW / 2, headerTop + badgeH * 0.65);

      const wmWidth = Math.round(670 * scaleFactor);
      const wmX = canvas.width - Math.round(75 * scaleFactor) - wmWidth;

      ctx.fillStyle = boxBg;
      ctx.beginPath();
      ctx.roundRect(wmX, headerTop, wmWidth, badgeH, Math.round(16 * scaleFactor));
      ctx.fill();
      ctx.strokeStyle = boxBorder;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = primaryText;
      ctx.font = `bold ${Math.round(20 * scaleFactor)}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(
        "useful tools zone / social media post chunker",
        wmX + wmWidth / 2,
        headerTop + badgeH * 0.63
      );
    }

    // ---------------- 3. MAIN CONTENT (Platform-Aware Sizing & Spacing) ----------------
    let cleanText = (textChunk || "")
      .replace(/\[\d+\/\d+\]/g, "")
      .replace(/\u200B{10,}\n\.\.\.Read More/g, "")
      .replace(/\.\.\.Read More/g, "");

    if (isPaper) {
      cleanText = normalizeUnicodeText(cleanText);
    }
    cleanText = cleanText.trim();

    const textPaddingLeft = Math.round((isPaper && theme.ruled ? 175 : 90) * scaleFactor);
    const maxWidth = canvas.width - textPaddingLeft - Math.round(80 * scaleFactor);
    const words = cleanText ? cleanText.split(/\s+/) : [];

    // 🟢 Auto-Fit Typography Engine (Bigger, natural 42px handwriting text)
    const fontStack = isPaper
      ? `"${handwritingFont}", "Kalam", cursive, sans-serif`
      : `system-ui, -apple-system, sans-serif`;

    let fontSize = isPaper
      ? Math.round(42 * scaleFactor) // 🟢 42px bold clear diary handwriting
      : Math.round((platform === "pinterest" ? 44 : 42) * scaleFactor);

    let activeLineGap = lineGap;
    let currentLineHeight = isPaper && theme.ruled 
      ? activeLineGap 
      : fontSize + Math.round(22 * scaleFactor);

    // Initial Line Wrap Calculation
    const calculateLines = (fSize) => {
      ctx.font = `${activeWeight} ${fSize}px ${fontStack}`;
      let resLines = [];
      let curLine = "";

      for (let n = 0; n < words.length; n++) {
        let word = words[n];
        if (ctx.measureText(word).width > maxWidth) {
          if (curLine.trim()) {
            resLines.push(curLine.trim());
            curLine = "";
          }
          let subWord = "";
          for (let c = 0; c < word.length; c++) {
            if (ctx.measureText(subWord + word[c]).width > maxWidth) {
              resLines.push(subWord);
              subWord = word[c];
            } else {
              subWord += word[c];
            }
          }
          if (subWord) curLine = subWord + " ";
          continue;
        }

        const testLine = curLine + word + " ";
        if (ctx.measureText(testLine).width > maxWidth && n > 0) {
          resLines.push(curLine.trim());
          curLine = word + " ";
        } else {
          curLine = testLine;
        }
      }
      if (curLine.trim()) resLines.push(curLine.trim());
      return resLines;
    };

    let lines = calculateLines(fontSize);
    let maxAllowedLines = isPaper && theme.ruled
      ? Math.floor((endLineY - startLineY) / activeLineGap)
      : Math.floor((endLineY - Math.round(180 * scaleFactor)) / currentLineHeight);

    // 🟢 Micro Dynamic Auto-Scale (Agar 2-4 extra lines merge hui hain, toh font 2-3px scale karke zero clipping karega)
    if (lines.length > maxAllowedLines && fontSize > 32) {
      fontSize = Math.max(32, fontSize - 3);
      activeLineGap = Math.max(50, lineGap - 4);
      currentLineHeight = isPaper && theme.ruled ? activeLineGap : fontSize + Math.round(18 * scaleFactor);
      lines = calculateLines(fontSize);
      maxAllowedLines = isPaper && theme.ruled
        ? Math.floor((endLineY - startLineY) / activeLineGap)
        : Math.floor((endLineY - Math.round(180 * scaleFactor)) / currentLineHeight);
    }

    const printableLines = lines.slice(0, maxAllowedLines);

    // 🔴 Draw Content
    ctx.fillStyle = primaryText;
    ctx.textAlign = "left";
    ctx.font = `${activeWeight} ${fontSize}px ${fontStack}`;

    if (isPaper) {
      ctx.globalCompositeOperation = "multiply";
      ctx.globalAlpha = 0.9;
      ctx.filter = "saturate(300%) contrast(120%) drop-shadow(1px 1px 0px rgba(0,0,0,0.15))";
    }

    printableLines.forEach((l, idx) => {
      let currentY;
      if (isPaper && theme.ruled) {
        currentY = startLineY + (idx + 1) * lineGap - Math.round(8 * scaleFactor);
      } else {
        currentY = Math.round(195 * scaleFactor) + idx * currentLineHeight + fontSize;
      }
      ctx.fillText(l.trim(), textPaddingLeft, currentY);
    });

    if (isPaper) {
      ctx.globalCompositeOperation = "source-over";
      ctx.filter = "none";
      ctx.globalAlpha = 1.0;
    }

    // ---------------- 4. CLEAN FOOTER ----------------
    const borderY = canvas.height - Math.round(38 * scaleFactor);

    if (isPaper) {
      ctx.font = `${activeWeight} ${Math.round(22 * scaleFactor)}px "${handwritingFont}", cursive, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillStyle = primaryText;

      if (totalSlides > 1 && slideNumber < totalSlides) {
        ctx.fillText(`~ क्रमशः अगले पन्ने पर (भाग ${slideNumber + 1}) 👉 ~`, canvas.width / 2, borderY);
      } else {
        ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
        ctx.font = `400 ${Math.round(20 * scaleFactor)}px "${handwritingFont}", cursive, sans-serif`;
        ctx.fillText("~ समाप्त | Useful Tools Zone ~", canvas.width / 2, borderY);
      }
    } else {
      const isDarkText =
        primaryText !== "#FFFFFF" &&
        primaryText !== "#F8FAFC" &&
        primaryText !== "#CCFBF1" &&
        primaryText !== "#FEF3C7";
      const frameMargin = Math.round(36 * scaleFactor);
      const digitalBorderY = canvas.height - frameMargin;

      if (totalSlides > 1 && slideNumber < totalSlides) {
        const ctaW = Math.round(580 * scaleFactor);
        const ctaH = Math.round(52 * scaleFactor);
        const ctaX = (canvas.width - ctaW) / 2;

        ctx.fillStyle = bgColor;
        ctx.fillRect(ctaX - 10, digitalBorderY - Math.round(26 * scaleFactor), ctaW + 20, ctaH);

        ctx.fillStyle = isDarkText ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.65)";
        ctx.beginPath();
        ctx.roundRect(ctaX, digitalBorderY - Math.round(26 * scaleFactor), ctaW, ctaH, Math.round(16 * scaleFactor));
        ctx.fill();

        ctx.strokeStyle = isDarkText ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = primaryText;
        ctx.font = `bold ${Math.round(22 * scaleFactor)}px system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(`👉 READ NEXT SLIDE FOR PART ${slideNumber + 1} 📲`, canvas.width / 2, digitalBorderY + Math.round(8 * scaleFactor));
      } else {
        const endText = "✦ USEFUL TOOLS ZONE ✦";
        const tagW = Math.round(380 * scaleFactor);
        const tagH = Math.round(44 * scaleFactor);
        const tagX = (canvas.width - tagW) / 2;

        ctx.fillStyle = bgColor;
        ctx.fillRect(tagX - 10, digitalBorderY - Math.round(22 * scaleFactor), tagW + 20, tagH);

        ctx.fillStyle = isDarkText ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.68)";
        ctx.beginPath();
        ctx.roundRect(tagX, digitalBorderY - Math.round(22 * scaleFactor), tagW, tagH, Math.round(14 * scaleFactor));
        ctx.fill();

        ctx.strokeStyle = isDarkText ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.75)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = primaryText;
        if (!isDarkText) {
          ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
          ctx.shadowBlur = 4;
        }
        ctx.font = `bold ${Math.round(18 * scaleFactor)}px system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(endText, canvas.width / 2, digitalBorderY + Math.round(6 * scaleFactor));
        ctx.shadowBlur = 0;
      }
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

  // 🟢 Theme & Handwriting States (Moved to top before useEffect)
  const [themeIndex, setThemeIndex] = useState(0);
  const [selectedSlideTheme, setSelectedSlideTheme] = useState(SLIDE_THEMES[0]);
  const [handwritingFont, setHandwritingFont] = useState("Kalam");
  const [penThickness, setPenThickness] = useState("thin");

// High-CTR Feature Toggles
  const DEFAULT_HOOKS = [
    "🚨 STOP SCROLLING! READ THIS 👇",
    "🚨 रुकिए! पहले इसे ध्यान से पढ़ें 👇",
    "💡 3 Harsh Truths Nobody Tells You About This:",
    "💡 3 कड़वे सच जो कोई नहीं बताता:",
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
    // 🟢 PERMANENT FIX: If a Paper/Diary theme is active, completely skip Unicode bolding.
    // This ensures handwriting fonts (Kalam, Caveat) render perfectly on Slide 1.
    if (selectedSlideTheme?.isPaper) return text;

    return text.replace(/[A-Za-z0-9]/g, (char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d400 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d41a + code - 97);
      if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7ce + code - 48);
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
    cleanInput = cleanInput.replace(/⏸️\s*\(Hold to read \/ स्क्रीन रोक कर पढ़ें\)/g, "");
    cleanInput = cleanInput.replace(new RegExp(toUnicodeBold("(Hold to read / स्क्रीन रोक कर पढ़ें)")), "g");
    cleanInput = cleanInput.replace(/\u200B{10,}\n\.\.\.Read More/g, "");
    cleanInput = cleanInput.replace(/\[\d+\/\d+\]\n?/g, "");
    cleanInput = cleanInput.trim();

    if (enableBoldKeywords) {
      cleanInput = cleanInput.replace(/\b[A-Z0-9]{2,}\b/g, (match) =>
        toUnicodeBold(match)
      );
    }

// 🟢 SMART PLATFORM & THEME CHUNKER LIMIT ENGINE
    const platformCap = currentPlatformObj.limit;
    const userLimit = Math.min(Number(customLimit) || platformCap, platformCap);

    let effectiveLimit = userLimit;

    if (viewMode === "png_slides") {
      if (selectedPlatform === "pinterest") {
        // 🟢 Pinterest 2:3 Ultra-HD Pin: 850 Chars capacity minimizes total slides
        effectiveLimit = 850;
      } else if (selectedSlideTheme?.isPaper) {
        // 🟢 Paper Mode (9:16 Full HD): 1150 Chars capacity fills all 24-26 lines completely
        effectiveLimit = 1150;
      } else if (selectedPlatform === "twitter") {
        effectiveLimit = Math.min(userLimit, 280);
      } else if (["instagram", "threads", "linkedin"].includes(selectedPlatform)) {
        effectiveLimit = Math.min(userLimit, 500);
      } else {
        // 🟢 Digital 9:16 Full HD colors remain at 700 chars
        effectiveLimit = userLimit; 
      }
    }

    // 🟢 Greedy Sentence & Word Splitter (Packs every slide fully from Slide 1)
    const tokens = cleanInput.split(/\s+/);
    let currentChunk = "";
    let rawChunks = [];

    tokens.forEach((token) => {
      if ((currentChunk + " " + token).trim().length <= effectiveLimit) {
        currentChunk += (currentChunk ? " " : "") + token;
      } else {
        if (currentChunk.trim()) rawChunks.push(currentChunk.trim());
        currentChunk = token;
      }
    });
    if (currentChunk.trim()) rawChunks.push(currentChunk.trim());

    // 🟢 SMART SPILL AUTO-ABSORB ENGINE: 
    // Agar aakhiri slide par sirf 3-6 line ka chhota text (<= 400 chars) bacha ho,
    // toh use nayi slide banane ke bajay pichli slide me hi merge kar le.
    if (rawChunks.length > 1) {
      const lastChunk = rawChunks[rawChunks.length - 1];
      const prevChunk = rawChunks[rawChunks.length - 2];

      const isTailShort = lastChunk.length <= 400;
      const canSafelyAbsorb = (prevChunk + " " + lastChunk).length <= (effectiveLimit * 1.25);

      if (isTailShort || canSafelyAbsorb) {
        const tail = rawChunks.pop();
        rawChunks[rawChunks.length - 1] = `${prevChunk}\n\n${tail}`.trim();
      }
    }

    const total = rawChunks.length;

// 3. Final Formatting (NO Hold Trigger on Last Slide!)
    const finalChunks = rawChunks.map((chunk, index) => {
      let result = chunk;
      const isPaper = selectedSlideTheme?.isPaper;

      // Primary Attention Hook ONLY on Slide 1
      if (index === 0 && selectedHook && selectedHook !== "none") {
        let activeHook = selectedHook;
        
        if (isPaper) {
          // 🟢 Paper Mode: Pure Hindi Only (Removes all English Hooks)
          if (activeHook.includes("STOP SCROLLING") || activeHook.includes("रुकिए!")) activeHook = "🚨 रुकिए! पहले इसे ध्यान से पढ़ें 👇";
          else if (activeHook.includes("3 Harsh Truths") || activeHook.includes("कड़वे सच")) activeHook = "💡 3 कड़वे सच जो कोई नहीं बताता:";
          else if (activeHook.includes("Save This") || activeHook.includes("डिलीट")) activeHook = "🔥 डिलीट होने से पहले इसे सेव कर लें!";
          else if (activeHook.includes("STOP Immediately") || activeHook.includes("तुरंत रुकें")) activeHook = "👀 अगर आप यह कर रहे हैं, तो तुरंत रुकें:";
          else if (activeHook.includes("Secret Strategy") || activeHook.includes("राज़")) activeHook = "⚡ 30 सेकंड में खुला राज़:";
        } else {
          // 📱 Digital Mode: Pure English Only
          if (activeHook.includes("STOP SCROLLING") || activeHook.includes("रुकिए!")) activeHook = "🚨 STOP SCROLLING! READ THIS 👇";
          else if (activeHook.includes("3 Harsh Truths") || activeHook.includes("कड़वे सच")) activeHook = "💡 3 Harsh Truths Nobody Tells You About This:";
          else if (activeHook.includes("Save This") || activeHook.includes("डिलीट")) activeHook = "🔥 Save This Video Before It Gets Deleted!";
          else if (activeHook.includes("STOP Immediately") || activeHook.includes("तुरंत रुकें")) activeHook = "👀 If You Are Doing This, STOP Immediately:";
          else if (activeHook.includes("Secret Strategy") || activeHook.includes("राज़")) activeHook = "⚡ The Secret Strategy Revealed in 30 Seconds:";
        }
        
        result = `${toUnicodeBold(activeHook)}\n\n${result}`;
      }

      // 🔴 Hold Trigger ONLY on Intermediate Slides (NOT on Last Slide!)
      if (enableHoldToRead && index < total - 1) {
        // 🟢 Paper Mode gets Pure Hindi, Digital gets Pure English
        const holdText = isPaper 
          ? "⏸️ (स्क्रीन रोक कर पढ़ें)" 
          : "⏸️ (Hold screen to pause & read full text)";
        
        result += `\n\n${toUnicodeBold(holdText)}`;
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
    selectedSlideTheme,
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
 


  // 🟢 1. Dedicated Paper Themes Switcher (Cycles only 5 Paper Themes)
  const handleNextPaperTheme = () => {
    const paperThemes = SLIDE_THEMES.filter((t) => t.isPaper);
    const currentPaperIdx = paperThemes.findIndex((t) => t.id === selectedSlideTheme.id);
    const nextIdx = (currentPaperIdx + 1) % paperThemes.length;
    const targetTheme = paperThemes[nextIdx];
    const realIdx = SLIDE_THEMES.findIndex((t) => t.id === targetTheme.id);
    
    setThemeIndex(realIdx);
    setSelectedSlideTheme(targetTheme);

    if (chunks.length > 0) {
      handleGeneratePngSlides(targetTheme);
    }
  };

  // 🟢 2. Dedicated Digital Solid Colors Switcher (Cycles 15 Pro Colors)
  const handleNextDigitalTheme = () => {
    const digitalThemes = SLIDE_THEMES.filter((t) => !t.isPaper);
    const currentDigitalIdx = digitalThemes.findIndex((t) => t.id === selectedSlideTheme.id);
    const nextIdx = currentDigitalIdx === -1 ? 0 : (currentDigitalIdx + 1) % digitalThemes.length;
    const targetTheme = digitalThemes[nextIdx];
    const realIdx = SLIDE_THEMES.findIndex((t) => t.id === targetTheme.id);

    setThemeIndex(realIdx);
    setSelectedSlideTheme(targetTheme);

    if (chunks.length > 0) {
      handleGeneratePngSlides(targetTheme);
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

// 🟢 ULTRA-FAST PARALLEL PNG GENERATOR (Promise.all Engine - 10x Faster on Mobile)
  const handleGeneratePngSlides = async (targetTheme) => {
    if (chunks.length === 0 && !mediaFile) return;
    setIsProcessing(true);

    const activeTheme =
      targetTheme && typeof targetTheme === "object" && targetTheme.color
        ? targetTheme
        : selectedSlideTheme;

    pngSlides.forEach((s) => URL.revokeObjectURL(s.url));
    setPngSlides([]);

    if (activeTheme?.isPaper) {
      await ensureHandwritingFonts(handwritingFont);
    }

    const totalSlidesCount = chunks.length;

    // ⚡ Parallel Async Generation: All slides process concurrently without blocking
    const slidePromises = chunks.map(async (chunk, idx) => {
      const res = await generatePngSlideBlob(
        chunk,
        idx + 1,
        totalSlidesCount,
        activeTheme,
        selectedPlatform,
        handwritingFont,
        penThickness
      );
      return {
        index: idx + 1,
        text: chunk,
        blob: res.blob,
        url: res.url,
      };
    });

    const slides = await Promise.all(slidePromises);

    setPngSlides(slides);
    setIsProcessing(false);

    setTimeout(() => {
      const resultsSection = document.getElementById("pngResultsArea");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

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

  // 🟢 1-Click Sequential Direct Downloader (Mobile & PC Both)
  const handleDownloadAll = () => {
    const cleanTopic = inputText.trim().split(/\s+/)[0]?.replace(/[^a-zA-Z0-9]/g, "") || "Post";
    const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const timeStamp = Math.floor(Date.now() / 1000).toString().slice(-4);
    const baseName = `UTZ_${cleanTopic}_${dateStamp}_${timeStamp}`;

    const filesToDownload = [];

    if (mediaFile) {
      const ext = mediaFile.name.split(".").pop() || "jpg";
      filesToDownload.push({ blob: mediaFile, name: `${baseName}_Media.${ext}` });
    }

    pngSlides.forEach((slide) => {
      filesToDownload.push({ blob: slide.blob, name: `${baseName}_Slide_${slide.index}.png` });
    });

    if (filesToDownload.length === 0) return;

    filesToDownload.forEach((item, idx) => {
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(item.blob);
        link.download = item.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, idx * 300); // 300ms delay ensures mobile browser queue saves every slide without skipping
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
          <div className="text-center space-y-2.5 max-w-2xl mx-auto animate-fadeIn">
            {/* 🔥 WORLD'S 1ST FLAGSHIP BADGE PILL */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/50 shadow-xs select-none">
              <span>🔥</span> WORLD&apos;S 1ST VIRAL SLIDES MAKER
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              Chunk Text for {currentPlatformName} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 font-extrabold">
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

              {/* 🟢 DE-CLUTTERED PLATFORM & CAPACITY CONTROLS */}
              <div className="p-4 bg-gradient-to-br from-slate-50 to-indigo-50/40 dark:from-gray-950 dark:to-indigo-950/20 border border-slate-200/80 dark:border-gray-800 rounded-2xl shadow-xs space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <span>🎯</span> Target Platform & Capacity Setup
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800">
                    Max Limit: {currentPlatformObj.limit} Chars
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Platform Dropdown with Brand Highlights */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">
                      Choose Social Media Platform:
                    </label>
                    <div className="relative">
                      <select
                        value={selectedPlatform}
                        onChange={(e) =>
                          handlePlatformDropdownChange(e.target.value)
                        }
                        className="w-full pl-3.5 pr-8 py-2.5 bg-white dark:bg-gray-900 border-2 border-indigo-200/80 dark:border-indigo-900/60 focus:border-indigo-500 rounded-xl text-xs font-bold text-slate-900 dark:text-white outline-none cursor-pointer shadow-xs transition-all appearance-none"
                      >
                        {Object.keys(PLATFORM_LIMITS).map((key) => (
                          <option key={key} value={key} className="py-1">
                            {PLATFORM_LIMITS[key].icon} {PLATFORM_LIMITS[key].name}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                        ▼
                      </span>
                    </div>
                  </div>

                  {/* Character Limit Input with Visual Feedback */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">
                        Active Limit (Chars / Slide):
                      </label>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        (Default: {currentPlatformObj.limit})
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        value={customLimit}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const maxAllowed = currentPlatformObj.limit;
                          if (val > maxAllowed) {
                            setCustomLimit(maxAllowed);
                          } else {
                            setCustomLimit(e.target.value);
                          }
                        }}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-800 focus:border-indigo-500 rounded-xl text-xs font-black text-indigo-600 dark:text-indigo-400 outline-none shadow-xs transition-all"
                        min="50"
                        max={currentPlatformObj.limit}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] font-black text-slate-400 uppercase">
                        Chars
                      </span>
                    </div>
                  </div>
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
              <div className="p-4 bg-slate-100/90 dark:bg-gray-900/80 rounded-2xl border border-slate-200 dark:border-gray-800 space-y-4">
                
                {/* TOP ROW: Attach Media & Generate Button (Signature Blue-Indigo-Violet Theme) */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label className="cursor-pointer text-xs font-bold bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 hover:border-indigo-500 px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-xs">
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

                  {chunks.length > 0 && (
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => handleGeneratePngSlides(selectedSlideTheme)}
                      className="relative group overflow-hidden px-6 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 text-white rounded-xl text-xs font-black shadow-md hover:shadow-indigo-500/25 border border-indigo-400/30 outline-none transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-50 shrink-0 isolate"
                    >
                      <span className="absolute -inset-full top-0 block w-1/2 h-full bg-white/15 transform -skew-x-12 group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out pointer-events-none"></span>

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

                {/* 🟢 DEDICATED THEME CONTROLS (Harmonious Dual-Card Layout) */}
                <div className="w-full flex flex-col gap-2.5">
                  
                  {/* 1. 📜 DEDICATED PAPER & DIARY THEMES */}
                  <div className="p-2.5 bg-white dark:bg-gray-950 border border-slate-200/90 dark:border-gray-800 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
                    
                    {/* Paper Switch Button (Clean Dark Slate-Indigo with Amber Gold Accent) */}
                    <button
                      type="button"
                      onClick={handleNextPaperTheme}
                      className="relative group flex items-center gap-2.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-black dark:hover:bg-gray-900 text-white rounded-xl text-xs font-black border border-amber-500/40 hover:border-amber-400 shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
                      title="Click to switch next Paper Theme"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 text-sm group-hover:scale-110 transition-transform">
                        📖
                      </span>

                      <div className="text-left">
                        <span className="text-[9px] uppercase tracking-wider text-amber-400 font-extrabold block leading-none mb-0.5">
                          Click here to Switch ⚡
                        </span>
                        <span className="text-xs font-bold text-white block leading-none">
                          {selectedSlideTheme?.isPaper ? selectedSlideTheme.name : "Paper Theme (5 Modes)"}
                        </span>
                      </div>

                      <span className="text-amber-400 group-hover:rotate-180 transition-transform duration-300 text-xs ml-1">
                        🔄
                      </span>
                    </button>

                    {/* 5 Direct Paper Swatches */}
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-gray-900/80 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-gray-800">
                      <span className="text-[10px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider pr-1">
                        📜 Paper Themes:
                      </span>
                      
                      {SLIDE_THEMES.filter((t) => t.isPaper).map((theme) => {
                        const realIdx = SLIDE_THEMES.findIndex((t) => t.id === theme.id);
                        const isActive = selectedSlideTheme.id === theme.id;
                        return (
                          <button
                            key={theme.id}
                            type="button"
                            onClick={() => handleSelectTheme(theme, realIdx)}
                            className={`w-6 h-6 rounded-full transition-all duration-200 cursor-pointer relative shrink-0 border border-slate-300 dark:border-gray-700 shadow-xs ${
                              isActive
                                ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 scale-115 z-10 shadow-sm"
                                : "hover:scale-110 opacity-85 hover:opacity-100"
                            }`}
                            style={{ backgroundColor: theme.color }}
                            title={`${theme.name} (Click/Touch to select)`}
                          >
                            {isActive && (
                              <span
                                className="absolute inset-0 flex items-center justify-center text-[10px] font-black"
                                style={{ color: theme.textColor || "#000000" }}
                              >
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. 🎨 DIGITAL SOLID PRO THEMES */}
                  <div className="p-2.5 bg-white dark:bg-gray-950 border border-slate-200/90 dark:border-gray-800 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
                    
                    {/* Solid Colors Switch Button (Clean Dark Slate-Indigo with Violet Accent) */}
                    <button
                      type="button"
                      onClick={handleNextDigitalTheme}
                      className="relative group flex items-center gap-2.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-black dark:hover:bg-gray-900 text-white rounded-xl text-xs font-black border border-indigo-500/40 hover:border-indigo-400 shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
                      title="Click to switch next Solid Color"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm group-hover:scale-110 transition-transform">
                        🎨
                      </span>

                      <div className="text-left">
                        <span className="text-[9px] uppercase tracking-wider text-indigo-400 font-extrabold block leading-none mb-0.5">
                          Click here to Switch ⚡
                        </span>
                        <span className="text-xs font-bold text-white block leading-none">
                          {!selectedSlideTheme?.isPaper ? selectedSlideTheme.name : "Solid Colors (15 Pro)"}
                        </span>
                      </div>

                      <span className="text-indigo-400 group-hover:rotate-180 transition-transform duration-300 text-xs ml-1">
                        🔄
                      </span>
                    </button>

                    {/* 5-Dot Paginated Solid Swatches */}
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-gray-900/80 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-gray-800">
                      <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider pr-1">
                        🎨 Solid Colors:
                      </span>

                      {(() => {
                        const digitalThemes = SLIDE_THEMES.filter((t) => !t.isPaper);
                        const digitalCurrentIdx = digitalThemes.findIndex((t) => t.id === selectedSlideTheme.id);
                        const safeIdx = digitalCurrentIdx >= 0 ? digitalCurrentIdx : 0;
                        const pageSize = 5;
                        const pageStart = Math.floor(safeIdx / pageSize) * pageSize;
                        const currentWindow = digitalThemes.slice(pageStart, pageStart + pageSize);

                        return currentWindow.map((theme) => {
                          const realIdx = SLIDE_THEMES.findIndex((t) => t.id === theme.id);
                          const isActive = selectedSlideTheme.id === theme.id;
                          return (
                            <button
                              key={theme.id}
                              type="button"
                              onClick={() => handleSelectTheme(theme, realIdx)}
                              className={`w-6 h-6 rounded-full transition-all duration-200 cursor-pointer relative shrink-0 border border-slate-300 dark:border-gray-700 shadow-xs ${
                                isActive
                                  ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 scale-115 z-10 shadow-sm"
                                  : "opacity-85 hover:opacity-100 hover:scale-110"
                              }`}
                              style={{ backgroundColor: theme.color }}
                              title={`${theme.name} (Click to select)`}
                            >
                              {isActive && (
                                <span
                                  className="absolute inset-0 flex items-center justify-center text-[10px] font-black drop-shadow-md"
                                  style={{ color: theme.textColor || "#ffffff" }}
                                >
                                  ✓
                                </span>
                              )}
                            </button>
                          );
                        });
                      })()}

                      {/* Page Counter Badge */}
                      <span className="text-[9px] font-bold text-slate-400 px-1 select-none">
                        {(() => {
                          const digitalThemes = SLIDE_THEMES.filter((t) => !t.isPaper);
                          const digitalCurrentIdx = digitalThemes.findIndex((t) => t.id === selectedSlideTheme.id);
                          const safeIdx = digitalCurrentIdx >= 0 ? digitalCurrentIdx : 0;
                          return `${Math.floor(safeIdx / 5) + 1}/${Math.ceil(digitalThemes.length / 5)}`;
                        })()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ✍️ HANDWRITING STYLES & PEN INK THICKNESS CONTROLS */}
                {selectedSlideTheme?.isPaper && (
                  <div className="flex flex-wrap items-center gap-2.5 px-3 py-1.5 bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/60 rounded-2xl shadow-xs animate-fadeIn">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black text-amber-900 dark:text-amber-200 uppercase tracking-wider whitespace-nowrap">
                        ✍️ Pen:
                      </span>
                      <select
                        value={handwritingFont}
                        onChange={(e) => {
                          setHandwritingFont(e.target.value);
                          if (chunks.length > 0) {
                            setTimeout(() => handleGeneratePngSlides(selectedSlideTheme), 50);
                          }
                        }}
                        className="bg-white dark:bg-gray-900 border border-amber-300 dark:border-amber-700 text-xs font-bold text-amber-950 dark:text-amber-100 rounded-xl px-2 py-1 outline-none cursor-pointer"
                      >
                        <option value="Kalam">📖 Kalam (Natural Diary)</option>
                        <option value="Caveat">✒️ Caveat (Cursive Pen)</option>
                        <option value="Dekko">✏️ Dekko (Clean Print)</option>
                        <option value="Tillana">🖋️ Tillana (Artistic Ink)</option>
                        <option value="Amita">📜 Amita (Calligraphy)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5 border-l border-amber-300/80 dark:border-amber-800/60 pl-2">
                      <span className="text-[10px] font-black text-amber-900 dark:text-amber-200 uppercase tracking-wider whitespace-nowrap">
                        🖊️ Ink:
                      </span>
                      <select
                        value={penThickness}
                        onChange={(e) => {
                          setPenThickness(e.target.value);
                          if (chunks.length > 0) {
                            setTimeout(() => handleGeneratePngSlides(selectedSlideTheme), 50);
                          }
                        }}
                        className="bg-white dark:bg-gray-900 border border-amber-300 dark:border-amber-700 text-xs font-bold text-amber-950 dark:text-amber-100 rounded-xl px-2 py-1 outline-none cursor-pointer"
                      >
                        <option value="thin">Thin Ballpoint (स्वाभाविक पतली - Default)</option>
                        <option value="medium">Medium Gel Pen (मध्यम)</option>
                        <option value="dark">Dark / Bold Pen (गहरी लिखावट)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* VISUAL ATTACHED MEDIA PREVIEW TILE */}
                {mediaPreviewUrl && (
                  <div className="flex items-center gap-3 p-2.5 bg-white dark:bg-gray-950 rounded-2xl border border-emerald-500/40 shadow-sm relative animate-fadeIn max-w-sm">
                    <div className="w-14 h-14 bg-black rounded-lg overflow-hidden shrink-0 border border-slate-300 dark:border-gray-800">
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

                          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto shrink-0">
                            {/* 1. Share Button (Mobile Only) */}
                            {isMobile && (
                              <button
                                type="button"
                                onClick={handleShareAll}
                                className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                              >
                                <span>📲</span>
                                <span>Share via App</span>
                              </button>
                            )}

                            {/* 2. Direct Sequential Download Button (Mobile & PC Both) */}
                            <button
                              type="button"
                              onClick={handleDownloadAll}
                              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                            >
                              <span>📥</span>
                              <span>
                                {isMobile
                                  ? "Download All (Serial)"
                                  : "Download All Slides (UTZ)"}
                              </span>
                            </button>
                          </div>
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

          {/* 🟢 QUICK PLATFORM PRESETS (Anti-Clutter, Spaced & Brand Themed) */}
          <div className="w-full max-w-4xl mx-auto mt-8 text-left space-y-3.5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>⚡</span> Supported Social Media Presets:
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold hidden sm:inline">
                Click any preset to instant switch & auto-format
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
              {[
                {
                  key: "whatsapp",
                  slug: "whatsapp-status-formatter",
                  label: "WhatsApp",
                  icon: "💬",
                  color: "text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40",
                },
                {
                  key: "pinterest",
                  slug: "pinterest-carousel-generator",
                  label: "Pinterest",
                  icon: "📌",
                  color: "text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 bg-rose-50/70 dark:bg-rose-950/40",
                },
                {
                  key: "twitter",
                  slug: "twitter-thread-generator",
                  label: "Twitter / X",
                  icon: "🐦",
                  color: "text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800 bg-sky-50/70 dark:bg-sky-950/40",
                },
                {
                  key: "threads",
                  slug: "threads-post-generator",
                  label: "Threads",
                  icon: "🧵",
                  color: "text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800 bg-purple-50/70 dark:bg-purple-950/40",
                },
                {
                  key: "instagram",
                  slug: "instagram-reels-text-hooks",
                  label: "Instagram",
                  icon: "📸",
                  color: "text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-800 bg-pink-50/70 dark:bg-pink-950/40",
                },
                {
                  key: "linkedin",
                  slug: "linkedin-post-splitter",
                  label: "LinkedIn",
                  icon: "💼",
                  color: "text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800 bg-blue-50/70 dark:bg-blue-950/40",
                },
                {
                  key: "telegram",
                  slug: "telegram-message-chunker",
                  label: "Telegram",
                  icon: "✈️",
                  color: "text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/40",
                },
              ].map((item) => {
                const isSelected = selectedPlatform === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handlePlatformDropdownChange(item.key)}
                    className={`py-2.5 px-3 rounded-2xl border-2 text-xs font-black transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shadow-xs ${
                      isSelected
                        ? "bg-white dark:bg-gray-900 border-indigo-600 text-indigo-600 dark:text-white ring-2 ring-indigo-500/30 shadow-md scale-102"
                        : `${item.color} hover:scale-102 opacity-90 hover:opacity-100`
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
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

{/* 📖 SMART STEP-BY-STEP USER GUIDE */}
<div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
  <div className="space-y-1">
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
        Quick User Guide
      </span>
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/40">
        📝 Pure Text ➔ 🖼️ HD PNG Slides & 🎬 Video Storyboards
      </span>
    </div>
    <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
      How to Split Long Text & Turn It into Viral PNG Slides
    </h3>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
    {/* STEP 1 */}
    <div className="p-4 bg-slate-50 dark:bg-black/40 border border-slate-200/70 dark:border-white/5 rounded-2xl flex flex-col justify-between space-y-3">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
            1
          </span>
          <span className="text-lg">📋</span>
        </div>
        <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs">
          Add Content & Choose Platform
        </h4>
        <div className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 space-y-1.5">
          <p>
            • <strong>Text Mode:</strong> Simply paste your long text or article into the box.
          </p>
          <p>
            • <strong>Photo / Video Mode:</strong> Click the <strong>&quot;Attach Photo / Video&quot;</strong> button or paste media directly.
          </p>
          <p>
            Then select your target social network (<strong>WhatsApp, X, Threads, Reels, LinkedIn</strong>) or set a custom character limit.
          </p>
        </div>
      </div>
      <div className="pt-2 border-t border-slate-200/50 dark:border-white/5 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
        💡 Tip: Select your preferred mode from the top radio toggle.
      </div>
    </div>

    {/* STEP 2 */}
    <div className="p-4 bg-slate-50 dark:bg-black/40 border border-slate-200/70 dark:border-white/5 rounded-2xl flex flex-col justify-between space-y-3">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
            2
          </span>
          <span className="text-lg">🎨</span>
        </div>
        <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs">
          Set Hooks, Triggers & Theme
        </h4>
        <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
          Pick an attention-grabbing hook for Slide 1, enable <strong>Hold Screen to Read</strong> for storyboards, and pick your favorite background color from the 20+ color palette.
        </p>
      </div>
      <div className="pt-2 border-t border-slate-200/50 dark:border-white/5 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
        🎨 Tip: Click color circles to live-preview new background themes.
      </div>
    </div>

    {/* STEP 3 */}
    <div className="p-4 bg-slate-50 dark:bg-black/40 border border-slate-200/70 dark:border-white/5 rounded-2xl flex flex-col justify-between space-y-3">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="w-7 h-7 rounded-xl bg-pink-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
            3
          </span>
          <span className="text-lg">🚀</span>
        </div>
        <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs">
          Generate PNG Slides & Share
        </h4>
        <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
          Click <strong>Generate PNG Slides</strong> to turn your content into high-definition 9:16 vertical cards. Use <strong>1-Click Multi-Export</strong> to download on PC or share directly to mobile apps.
        </p>
      </div>
      <div className="pt-2 border-t border-slate-200/50 dark:border-white/5 text-[10px] font-semibold text-pink-600 dark:text-pink-400">
        ⚡ Tip: Use <em>Serial Copy</em> if you only need raw text parts.
      </div>
    </div>
  </div>
</div>


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
