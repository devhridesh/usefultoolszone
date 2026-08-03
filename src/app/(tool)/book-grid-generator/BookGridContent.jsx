"use client";

import React, { useState } from "react";
import Link from "next/link";

// Simple GlassCard Container Component
const GlassCard = ({ children, className = "", style = {} }) => (
  <div
    className={`backdrop-blur-md rounded-3xl ${className}`}
    style={style}
  >
    {children}
  </div>
);

// 👑 Royal & Light Book-Reader Color Presets
const PRESET_PALETTES = [
  { id: "vintage_paper", name: "📜 Vintage Paper", bg1: "#FBF8F1", bg2: "#F0EABE", text: "#2C221E", accent: "#D97706", isDark: false },
  { id: "ivory_silk", name: "🦚 Ivory Silk", bg1: "#FAF9F6", bg2: "#EAE5D9", text: "#1C1917", accent: "#78350F", isDark: false },
  { id: "champagne_luxe", name: "🍾 Champagne Luxe", bg1: "#FAF6F0", bg2: "#EEDCC5", text: "#382A1C", accent: "#B45309", isDark: false },
  { id: "insta_pastel", name: "🌸 Insta Pastel", bg1: "#FAF5FF", bg2: "#F3E8FF", text: "#4C1D95", accent: "#EC4899", isDark: false },
  { id: "sage_sanctuary", name: "🍃 Sage Sanctuary", bg1: "#F3F6F3", bg2: "#DDE5DD", text: "#1C2B20", accent: "#059669", isDark: false },
  { id: "lavender_linen", name: "🪻 Lavender Linen", bg1: "#F8F5FF", bg2: "#E4DAFF", text: "#2D1B4E", accent: "#7C3AED", isDark: false },
  { id: "golden_hour", name: "🌅 Golden Hour", bg1: "#1A120B", bg2: "#3C2A21", text: "#FDE047", accent: "#EAB308", isDark: true },
  { id: "emerald_moody", name: "🌲 Emerald Moody", bg1: "#032219", bg2: "#0A3A2C", text: "#ECFDF5", accent: "#10B981", isDark: true },
  { id: "velvet_burgundy", name: "🍷 Velvet Burgundy", bg1: "#1C0A10", bg2: "#3B121F", text: "#FFF1F2", accent: "#F43F5E", isDark: true },
  { id: "celestial_navy", name: "🌌 Celestial Navy", bg1: "#0A1128", bg2: "#101D42", text: "#F8FAFC", accent: "#38BDF8", isDark: true },
  { id: "obsidian_gold", name: "👑 Obsidian Gold", bg1: "#0D0D11", bg2: "#191825", text: "#FACC15", accent: "#EAB308", isDark: true },
  { id: "rosewood_classic", name: "🪵 Rosewood Leather", bg1: "#211512", bg2: "#38241F", text: "#FDF8F6", accent: "#D97706", isDark: true },
];

// Quick Title Preset Chips
const TITLE_PRESETS = [
  "🔥 My Top Reads",
  "📚 2026 Reading List",
  "💡 Books That Changed My Life",
  "⭐ All-Time Favorites",
  "🎯 Must-Read Recommendations",
];

export default function BookGridContent({ initialTitle }) {
  // 1. Grid & Books State
  const [books, setBooks] = useState(() =>
    Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      title: "",
      author: "",
      cover: "",
      isbn: "",
      rating: 5,
    }))
  );
  const [activeSlot, setActiveSlot] = useState(null);

  // 2. Selfie / Profile State
  const [hasSelfie, setHasSelfie] = useState(true);
  const [profileName, setProfileName] = useState("Reader's Vault");
  const [profileHandle, setProfileHandle] = useState("@bookworm");
  const [selfieSrc, setSelfieSrc] = useState(null);
  const [selfieShape, setSelfieShape] = useState("circle");

  // 3. Card Title & Aesthetics (pSEO Initial Title + Fallback)
  const [cardTitle, setCardTitle] = useState(
    initialTitle || "MY TOP READS OF THE YEAR"
  );
  const [selectedPreset, setSelectedPreset] = useState(PRESET_PALETTES[0]);
  const [enableDiagonalWatermark, setEnableDiagonalWatermark] = useState(true);

  // 4. Search & Custom URL States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [pendingUrl, setPendingUrl] = useState("");
  const [showReplaceConfirm, setShowReplaceConfirm] = useState(false);

  // --- HANDLERS ---
  const handleSelfieUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelfieSrc(URL.createObjectURL(file));
    }
  };

  const assignBookToSlot = (bookData) => {
    if (activeSlot === null) return;
    setBooks((prev) =>
      prev.map((slot) =>
        slot.id === activeSlot
          ? {
              ...slot,
              title: bookData.title || "",
              author: bookData.author || "",
              cover: bookData.cover || "",
              isbn: bookData.isbn || "",
            }
          : slot
      )
    );
    setActiveSlot(null);
    setSearchQuery("");
    setSearchResults([]);
    setShowReplaceConfirm(false);
    setPendingUrl("");
  };

  const handleCustomCoverUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && activeSlot !== null) {
      assignBookToSlot({
        title: "Custom Cover",
        author: "Uploaded Photo",
        cover: URL.createObjectURL(file),
        isbn: "",
      });
    }
  };

  const handleApplyCustomUrl = () => {
    if (!customUrl || !customUrl.trim()) return;
    let url = customUrl.trim();

    if (url.startsWith("http") && !url.includes("wsrv.nl")) {
      url = `https://wsrv.nl/?url=${encodeURIComponent(url)}`;
    }

    const activeBook = books.find((b) => b.id === activeSlot);
    if (activeBook && activeBook.cover) {
      setPendingUrl(url);
      setShowReplaceConfirm(true);
    } else {
      assignBookToSlot({
        title: "Custom Link",
        author: "Web Image",
        cover: url,
        isbn: "",
      });
      setCustomUrl("");
    }
  };

  const confirmReplaceCover = () => {
    if (pendingUrl) {
      assignBookToSlot({
        title: "Custom Link",
        author: "Web Image",
        cover: pendingUrl,
        isbn: "",
      });
      setCustomUrl("");
    }
  };

  const cancelReplaceCover = () => {
    setPendingUrl("");
    setShowReplaceConfirm(false);
  };

  const handleClearCurrentSlot = () => {
    if (activeSlot === null) return;
    setBooks((prev) =>
      prev.map((slot) =>
        slot.id === activeSlot
          ? { ...slot, title: "", author: "", cover: "", isbn: "", rating: 5 }
          : slot
      )
    );
    setActiveSlot(null);
    setShowReplaceConfirm(false);
  };

  const handleClearAllSlots = () => {
    setBooks(
      Array.from({ length: 9 }, (_, i) => ({
        id: i + 1,
        title: "",
        author: "",
        cover: "",
        isbn: "",
        rating: 5,
      }))
    );
  };

  const handleSearchBook = async (query) => {
    if (!query || !query.trim()) return;
    setIsSearching(true);
    setSearchResults([]);

    try {
      const cleanQuery = query.trim();
      const cleanedIsbn = cleanQuery.replace(/[\s-]/g, "");
      const isIsbn = /^[0-9\-]{10,13}$/.test(cleanedIsbn);

      const googleUrl = isIsbn
        ? `https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanedIsbn}`
        : `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(cleanQuery)}&maxResults=10`;

      const res = await fetch(googleUrl);
      const data = await res.json();

      if (data.items && data.items.length > 0) {
        const formatted = data.items.map((item) => {
          const info = item.volumeInfo;
          const isbnObj = info.industryIdentifiers?.find(
            (id) => id.type === "ISBN_13" || id.type === "ISBN_10"
          );
          const isbn = isbnObj ? isbnObj.identifier : "";

          let googleCover =
            info.imageLinks?.extraLarge ||
            info.imageLinks?.large ||
            info.imageLinks?.medium ||
            info.imageLinks?.thumbnail ||
            info.imageLinks?.smallThumbnail ||
            "";

          if (googleCover) {
            googleCover = googleCover
              .replace("http://", "https://")
              .replace("&edge=curl", "");
          }

          let finalCover = "";
          if (isbn) {
            finalCover = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
          } else if (googleCover) {
            finalCover = `https://wsrv.nl/?url=${encodeURIComponent(googleCover)}`;
          } else {
            finalCover = "https://via.placeholder.com/150x220?text=No+Cover";
          }

          return {
            title: info.title || "Unknown Title",
            author: info.authors ? info.authors.join(", ") : "Unknown Author",
            cover: finalCover,
            isbn: isbn,
          };
        });

        if (formatted.length > 0) {
          setSearchResults(formatted);
          setIsSearching(false);
          return;
        }
      }

      const olUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(cleanQuery)}&limit=10`;
      const olRes = await fetch(olUrl);
      const olData = await olRes.json();

      if (olData.docs && olData.docs.length > 0) {
        const formatted = olData.docs
          .filter((doc) => doc.cover_i || doc.isbn?.[0])
          .map((doc) => ({
            title: doc.title || "Unknown Title",
            author: doc.author_name
              ? doc.author_name.join(", ")
              : "Unknown Author",
            cover: doc.cover_i
              ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
              : `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-L.jpg`,
            isbn: doc.isbn ? doc.isbn[0] : "",
          }));

        if (formatted.length > 0) {
          setSearchResults(formatted);
          setIsSearching(false);
          return;
        }
      }

      setSearchResults([]);
    } catch (err) {
      console.error("Search API Error:", err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleExportPNG = async () => {
    const activeBooks = books.filter((item) => item.cover || item.title);
    const count = activeBooks.length || 1;

    let cols = 3;
    if (count === 1) cols = 1;
    else if (count === 2 || count === 4) cols = 2;
    else cols = 3;

    const rows = Math.ceil(count / cols);
    const cellW = cols === 1 ? 420 : cols === 2 ? 380 : 270;
    const cellH = cols === 1 ? 540 : cols === 2 ? 480 : 340;
    const gap = 30;
    const topPadding = 90;
    const footerHeight = 130;

    const gridHeight = rows * cellH + (rows - 1) * gap;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 1080;
    canvas.height = topPadding + gridHeight + footerHeight + 70;

    const bg1 = selectedPreset?.bg1 || "#090A0F";
    const bg2 = selectedPreset?.bg2 || "#171923";

    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, bg1);
    grad.addColorStop(1, bg2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const isDarkTheme = selectedPreset?.isDark ?? true;
    const primaryTextColor = isDarkTheme ? "#FFFFFF" : "#1C1917";
    const subTextColor = isDarkTheme
      ? "rgba(255, 255, 255, 0.8)"
      : "rgba(28, 25, 23, 0.75)";
    const cardBgColor = isDarkTheme
      ? "rgba(255, 255, 255, 0.06)"
      : "rgba(0, 0, 0, 0.04)";
    const cardBorderColor = isDarkTheme
      ? "rgba(255, 255, 255, 0.12)"
      : "rgba(0, 0, 0, 0.08)";

    if (cardTitle) {
      ctx.textAlign = "center";
      ctx.fillStyle = primaryTextColor;
      ctx.font = "900 32px system-ui, sans-serif";
      ctx.fillText(cardTitle.toUpperCase(), canvas.width / 2, 55);
    }

    if (enableDiagonalWatermark) {
      ctx.save();
      ctx.rotate((-15 * Math.PI) / 180);
      ctx.font = "600 16px system-ui, sans-serif";
      ctx.fillStyle = isDarkTheme
        ? "rgba(255, 255, 255, 0.045)"
        : "rgba(0, 0, 0, 0.04)";

      const watermarkText = "USEFULTOOLSZONE.COM • BOOK VAULT";
      const stepX = 450;
      const stepY = 110;

      for (let y = -600; y < canvas.height + 800; y += stepY) {
        const offsetX = (Math.floor(y / stepY) % 2) * 160;
        for (let x = -600; x < canvas.width + 800; x += stepX) {
          ctx.fillText(watermarkText, x + offsetX, y);
        }
      }
      ctx.restore();
    }

    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / cols);
      const itemsInThisRow =
        row === rows - 1 && count % cols !== 0 ? count % cols : cols;
      const colInRow = i % cols;

      const rowWidth = itemsInThisRow * cellW + (itemsInThisRow - 1) * gap;
      const rowStartX = (canvas.width - rowWidth) / 2;

      const x = rowStartX + colInRow * (cellW + gap);
      const y = topPadding + row * (cellH + gap);

      ctx.fillStyle = cardBgColor;
      ctx.strokeStyle = cardBorderColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(x, y, cellW, cellH, 18);
      ctx.fill();
      ctx.stroke();

      const item = activeBooks[i] || { rating: 5 };
      if (item && item.cover) {
        try {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = item.cover;
          await new Promise((res) => (img.onload = res));

          const padding = 16;
          const starSpace = 42;
          const targetX = x + padding;
          const targetY = y + padding;
          const targetW = cellW - padding * 2;
          const targetH = cellH - padding * 2 - starSpace;

          const imgAspect = img.width / img.height;
          const targetAspect = targetW / targetH;

          let drawW = targetW;
          let drawH = targetH;
          let drawX = targetX;
          let drawY = targetY;

          if (imgAspect > targetAspect) {
            drawH = targetW / imgAspect;
            drawY = targetY + (targetH - drawH) / 2;
          } else {
            drawW = targetH * imgAspect;
            drawX = targetX + (targetW - drawW) / 2;
          }

          ctx.save();
          ctx.beginPath();
          ctx.roundRect(targetX, targetY, targetW, targetH, 12);
          ctx.clip();
          ctx.drawImage(img, drawX, drawY, drawW, drawH);
          ctx.restore();
        } catch (e) {
          console.error("Cover render failed:", e);
        }
      }

      ctx.fillStyle = "#F59E0B";
      const fontSize = cols === 1 ? 26 : cols === 2 ? 22 : 18;
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(
        "★".repeat(item ? item.rating || 5 : 5),
        x + cellW / 2,
        y + cellH - 18
      );
    }

    const footerY = canvas.height - footerHeight - 20;
    const footerWidth = Math.min(960, canvas.width - 80);
    const footerX = (canvas.width - footerWidth) / 2;

    if (hasSelfie) {
      ctx.fillStyle = isDarkTheme
        ? "rgba(0, 0, 0, 0.55)"
        : "rgba(255, 255, 255, 0.65)";
      ctx.beginPath();
      ctx.roundRect(footerX, footerY, footerWidth, 120, 24);
      ctx.fill();

      if (selfieSrc) {
        try {
          const profileImg = new Image();
          profileImg.crossOrigin = "anonymous";
          profileImg.src = selfieSrc;
          await new Promise((res) => (profileImg.onload = res));

          ctx.save();
          const px = footerX + 20;
          const py = footerY + 10;
          const pSize = 100;

          if (selfieShape === "circle") {
            ctx.beginPath();
            ctx.arc(px + pSize / 2, py + pSize / 2, pSize / 2, 0, Math.PI * 2);
            ctx.clip();
          } else if (selfieShape === "hexagon") {
            ctx.beginPath();
            const cx = px + pSize / 2;
            const cy = py + pSize / 2;
            const r = pSize / 2;
            for (let h = 0; h < 6; h++) {
              const angle = (Math.PI / 3) * h;
              const hx = cx + r * Math.cos(angle);
              const hy = cy + r * Math.sin(angle);
              if (h === 0) ctx.moveTo(hx, hy);
              else ctx.lineTo(hx, hy);
            }
            ctx.closePath();
            ctx.clip();
          } else {
            ctx.beginPath();
            ctx.roundRect(px, py, pSize, pSize, 20);
            ctx.clip();
          }
          ctx.drawImage(profileImg, px, py, pSize, pSize);
          ctx.restore();
        } catch (e) {}
      }

      ctx.textAlign = "left";
      ctx.fillStyle = primaryTextColor;
      ctx.font = "bold 28px system-ui, sans-serif";
      ctx.fillText(profileName, footerX + 140, footerY + 50);

      ctx.fillStyle = subTextColor;
      ctx.font = "bold 19px system-ui, sans-serif";
      ctx.fillText(
        `${profileHandle} • usefultoolszone.com/book-grid-generator`,
        footerX + 140,
        footerY + 86
      );
    } else {
      ctx.textAlign = "center";
      ctx.fillStyle = primaryTextColor;
      ctx.font = "bold 24px system-ui, sans-serif";
      ctx.fillText(
        "MY READING LIST • usefultoolszone.com/book-grid-generator",
        canvas.width / 2,
        footerY + 65
      );
    }

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `UTZ_Book_Grid_${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-slate-50/60 dark:bg-[#060609] pt-24 pb-12 px-4">
      <div className="max-w-6xl w-full mx-auto space-y-8">
        
        {/* Page Header (Dynamic H1 for pSEO) */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            {initialTitle ? `${initialTitle} Grid` : "Visual Book Grid Generator"} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-extrabold">
              {initialTitle ? "Instant 3x3 Cover Auto-Fetch & Card Maker" : "Instant Cover Auto-Fetch & Custom Cards"}
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {initialTitle
              ? `Create and download custom 3x3 book grid cards for ${initialTitle.toLowerCase()}.`
              : "Scan ISBN or search titles to generate 3x3 social media book grids."}
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: CONTROLS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Profile & Card Type */}
            <GlassCard className="p-5 space-y-5 bg-white/90 dark:bg-black/80 border border-slate-200 dark:border-white/10 rounded-3xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                1. Profile & Card Type
              </h3>
              <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setHasSelfie(true)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    hasSelfie
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  With Selfie
                </button>
                <button
                  type="button"
                  onClick={() => setHasSelfie(false)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    !hasSelfie
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  No Selfie (Clean)
                </button>
              </div>

              {hasSelfie && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="px-3 py-2 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="@handle"
                      value={profileHandle}
                      onChange={(e) => setProfileHandle(e.target.value)}
                      className="px-3 py-2 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                      Profile Photo Shape:
                    </label>
                    <div className="flex gap-2">
                      {[
                        { id: "circle", label: "● Circle" },
                        { id: "rounded", label: "▢ Rounded Square" },
                        { id: "hexagon", label: "⬢ Hexagon" },
                      ].map((shape) => (
                        <button
                          key={shape.id}
                          type="button"
                          onClick={() => setSelfieShape(shape.id)}
                          className={`flex-1 py-1.5 text-xs font-extrabold rounded-lg border transition-all cursor-pointer ${
                            selfieShape === shape.id
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                              : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400"
                          }`}
                        >
                          {shape.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="block w-full text-center py-2.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                    Upload Profile Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleSelfieUpload}
                    />
                  </label>
                </div>
              )}

              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Card Main Heading / Overall Caption:
                </label>
                <input
                  type="text"
                  placeholder="e.g., My Top 5 Favorite Books..."
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {TITLE_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCardTitle(preset)}
                      className="px-2.5 py-1 bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-slate-600 dark:text-slate-300 hover:text-blue-600 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-extrabold transition cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* 2. Premium Background Themes */}
            <GlassCard className="p-5 space-y-4 bg-white/90 dark:bg-black/80 border border-slate-200 dark:border-white/10 rounded-3xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                2. Premium Background Themes
              </h3>
              <div className="flex flex-wrap gap-4 justify-start items-start pt-2">
                {PRESET_PALETTES.map((palette) => (
                  <div
                    key={palette.id}
                    className="flex flex-col items-center gap-1.5 w-14"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedPreset(palette)}
                      className={`w-10 h-10 rounded-full transition-all duration-200 cursor-pointer ${
                        selectedPreset.id === palette.id
                          ? "ring-4 ring-blue-500 scale-110 shadow-lg"
                          : "ring-1 ring-slate-300 dark:ring-slate-700 hover:scale-105"
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${palette.bg1}, ${palette.bg2})`,
                      }}
                      title={palette.name}
                    />
                    <span className="text-[9px] font-bold text-slate-600 dark:text-slate-400 text-center leading-tight">
                      {palette.name}
                    </span>
                  </div>
                ))}
              </div>

              <label className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableDiagonalWatermark}
                  onChange={(e) => setEnableDiagonalWatermark(e.target.checked)}
                  className="rounded text-blue-600"
                />
                <span>Enable Diagonal Anti-Crop Watermark</span>
              </label>
            </GlassCard>
          </div>

          {/* RIGHT COLUMN: LIVE PREVIEW & DOWNLOAD */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Apps Theme Info Banner */}
            <div className="w-full py-3 px-4 bg-gradient-to-r from-blue-50/90 via-indigo-50/90 to-purple-50/90 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 border border-blue-200/80 dark:border-blue-800/50 rounded-2xl flex items-center justify-between gap-2 shadow-sm text-center sm:text-left">
              <div className="flex items-center gap-2">
                <span className="text-base">✨</span>
                <p className="text-xs font-bold text-blue-900 dark:text-blue-200">
                  <span className="font-black text-blue-600 dark:text-blue-400">
                    Flexible Grid Active:
                  </span>{" "}
                  You can generate a full card with 1 to 9 books!
                </p>
              </div>
              <button
                type="button"
                onClick={handleClearAllSlots}
                className="px-3 py-1 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 text-[10px] font-bold rounded-xl transition cursor-pointer whitespace-nowrap"
              >
                🧹 Clear All Slots
              </button>
            </div>

            {/* Live Card Preview */}
            <GlassCard
              className="p-6 border rounded-3xl relative overflow-hidden transition-all duration-300 shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${selectedPreset.bg1}, ${selectedPreset.bg2})`,
                borderColor: selectedPreset.isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.12)",
                color: selectedPreset.isDark ? "#FFFFFF" : "#1C1917",
              }}
            >
              <div
                className="flex items-center justify-between border-b pb-3 mb-4"
                style={{ borderColor: selectedPreset.isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }}
              >
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: selectedPreset.accent }}>
                  Live Card Preview (3x3 Grid)
                </span>
                <span className="text-[10px] font-bold opacity-70">
                  Click any slot to edit or add cover
                </span>
              </div>

              {cardTitle && (
                <div className="text-center pb-3">
                  <h2
                    className="text-base sm:text-lg font-black uppercase tracking-wider"
                    style={{ color: selectedPreset.isDark ? "#FFFFFF" : "#1C1917" }}
                  >
                    {cardTitle}
                  </h2>
                </div>
              )}

              {/* 3x3 Grid Slots Container */}
              <div className="grid grid-cols-3 gap-3 aspect-[4/5] w-full">
                {books.map((slot) => (
                  <div
                    key={slot.id}
                    onClick={() => setActiveSlot(slot.id)}
                    className={`relative rounded-2xl flex flex-col items-center justify-center p-1.5 text-center cursor-pointer transition-all overflow-hidden group border-2 border-dashed ${
                      selectedPreset.isDark
                        ? "bg-white/5 border-white/20 hover:border-blue-400 text-white"
                        : "bg-white border-slate-300 hover:border-blue-600 text-slate-900 shadow-sm"
                    }`}
                  >
                    {slot.cover ? (
                      <div className="w-full h-full flex items-center justify-center p-1 relative">
                        <img
                          src={slot.cover}
                          alt={slot.title || `Slot ${slot.id}`}
                          crossOrigin="anonymous"
                          referrerPolicy="no-referrer"
                          className="max-w-full max-h-full object-contain rounded-lg shadow-md transition-transform duration-200 group-hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150x220?text=No+Cover";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <span
                          className={`text-2xl font-black block transition-transform group-hover:scale-125 ${
                            selectedPreset.isDark ? "text-slate-200" : "text-slate-800"
                          }`}
                        >
                          +
                        </span>
                        <span
                          className={`text-[11px] font-extrabold block tracking-wide ${
                            selectedPreset.isDark ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          Slot {slot.id}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer Preview inside Live Card */}
              <div
                className="mt-6 pt-4 border-t flex items-center justify-between"
                style={{ borderColor: selectedPreset.isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }}
              >
                {hasSelfie ? (
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-20 h-20 bg-slate-800 overflow-hidden border-2 border-white/40 flex items-center justify-center text-sm font-bold shadow-lg shrink-0 ${
                        selfieShape === "circle"
                          ? "rounded-full"
                          : selfieShape === "hexagon"
                          ? "[clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]"
                          : "rounded-2xl"
                      }`}
                    >
                      {selfieSrc ? (
                        <img src={selfieSrc} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs font-black text-slate-300">Photo</span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4
                        className="text-base font-black leading-tight tracking-wide"
                        style={{ color: selectedPreset.isDark ? "#FFFFFF" : "#1C1917" }}
                      >
                        {profileName}
                      </h4>
                      <p
                        className="text-xs font-bold tracking-wide"
                        style={{ color: selectedPreset.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(28, 25, 23, 0.8)" }}
                      >
                        {profileHandle} •{" "}
                        <span style={{ color: selectedPreset.accent }} className="font-black">
                          usefultoolszone.com/book-grid-generator
                        </span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-full text-center text-xs sm:text-sm font-extrabold tracking-wider"
                    style={{ color: selectedPreset.isDark ? "#FFFFFF" : "#1C1917" }}
                  >
                    MY READING TIER LIST •{" "}
                    <span style={{ color: selectedPreset.accent }} className="font-black">
                      usefultoolszone.com/book-grid-generator
                    </span>
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Download Button */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleExportPNG}
                className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-sm rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-98 cursor-pointer flex flex-col items-center justify-center gap-0.5"
              >
                <span>📥 Download HD Book Card (PNG)</span>
                <span className="text-[10px] font-bold text-blue-100/90 tracking-wide">
                  Generate custom cards with 1 to 9 books (Max 09 Books)
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 🚀 pSEO Internal Linking Footer Section */}
        <div className="pt-12 border-t border-slate-200 dark:border-slate-800 text-center space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
            Popular Book Grid Templates
          </h3>
          <div className="flex flex-wrap gap-2 justify-center text-xs font-bold">
            <Link
              href="/book-grid-generator/top-self-help-books"
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-300 hover:text-blue-600 rounded-xl border border-slate-200 dark:border-slate-800 transition"
            >
              📚 Top Self Help Books
            </Link>
            <Link
              href="/book-grid-generator/best-fiction-books-2026"
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-300 hover:text-blue-600 rounded-xl border border-slate-200 dark:border-slate-800 transition"
            >
              ✨ Best Fiction 2026
            </Link>
            <Link
              href="/book-grid-generator/books-by-colleen-hoover"
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-300 hover:text-blue-600 rounded-xl border border-slate-200 dark:border-slate-800 transition"
            >
              💖 Colleen Hoover Books
            </Link>
            <Link
              href="/book-grid-generator/naval-ravikant-recommendations"
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-300 hover:text-blue-600 rounded-xl border border-slate-200 dark:border-slate-800 transition"
            >
              🧠 Naval Ravikant List
            </Link>
            <Link
              href="/book-grid-generator/best-sci-fi-novels"
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-300 hover:text-blue-600 rounded-xl border border-slate-200 dark:border-slate-800 transition"
            >
              🚀 Best Sci-Fi Novels
            </Link>
          </div>
        </div>

        {/* Modal Dialog for Editing Slot # */}
        {activeSlot !== null && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0c0c12] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  Editing Slot #{activeSlot}
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveSlot(null)}
                  className="text-slate-400 hover:text-red-500 font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Option 1: Search Online Databases */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  1. Search Book Cover
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type Book Name or ISBN..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSearchBook(searchQuery)
                    }
                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl text-xs font-bold text-slate-900 dark:text-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleSearchBook(searchQuery)}
                    className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-blue-700 transition"
                  >
                    {isSearching ? "..." : "Search"}
                  </button>
                </div>
              </div>

              {isSearching && (
                <p className="text-xs text-blue-600 text-center py-2 font-bold animate-pulse">
                  🔍 Searching book databases...
                </p>
              )}

              {!isSearching && searchResults.length > 0 && (
                <div className="max-h-48 overflow-y-auto space-y-2 border border-slate-100 dark:border-slate-800 rounded-xl p-2 bg-slate-50/50 dark:bg-slate-950/50">
                  {searchResults.map((res, idx) => (
                    <div
                      key={idx}
                      onClick={() => assignBookToSlot(res)}
                      className="flex items-center gap-3 p-2 hover:bg-white dark:hover:bg-slate-900 rounded-xl cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition"
                    >
                      <img
                        src={res.cover}
                        alt={res.title}
                        className="w-10 h-14 object-cover rounded bg-slate-100 dark:bg-slate-800"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150x220?text=No+Cover";
                        }}
                      />
                      <div className="text-left flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {res.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate">
                          {res.author}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="relative flex items-center justify-center my-1">
                <div className="border-t border-slate-200 dark:border-slate-800 w-full"></div>
                <span className="bg-white dark:bg-[#0c0c12] px-3 text-[10px] font-extrabold text-slate-400 uppercase">
                  OR
                </span>
              </div>

              {/* Option 2: Direct Link or Upload */}
              <div className="space-y-3">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  2. Indian Books (Amazon/Flipkart) & Custom Cover
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Paste Image URL from Web..."
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleApplyCustomUrl()
                    }
                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCustomUrl}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer transition shadow-md whitespace-nowrap active:scale-95"
                  >
                    Apply
                  </button>
                </div>

                {showReplaceConfirm && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700/60 rounded-2xl space-y-3 animate-in fade-in zoom-in-95 duration-150">
                    <p className="text-xs font-black text-amber-900 dark:text-amber-200">
                      ⚠️ Are you sure you want to replace the current cover?
                    </p>
                    <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-xl border border-amber-200 dark:border-amber-800">
                      <img
                        src={books.find((b) => b.id === activeSlot)?.cover}
                        alt="Current Cover"
                        className="w-12 h-16 object-cover rounded-lg shadow-sm shrink-0"
                      />
                      <div className="flex-1 overflow-hidden">
                        <span className="text-[9px] font-extrabold text-slate-400 uppercase block">
                          Existing Cover Photo
                        </span>
                        <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">
                          {books.find((b) => b.id === activeSlot)?.cover}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end pt-1">
                      <button
                        type="button"
                        onClick={cancelReplaceCover}
                        className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={confirmReplaceCover}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition shadow-md cursor-pointer"
                      >
                        Yes, Replace Link
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP-BY-STEP GUIDANCE BOX */}
                <div className="p-3.5 bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 rounded-2xl space-y-2.5 my-2 text-left shadow-sm">
                  <p className="text-[11px] font-black text-blue-950 dark:text-blue-200 flex items-center gap-1.5 uppercase tracking-wide">
                    💡 How to copy correct book cover photo link:
                  </p>
                  <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900/60 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-black text-blue-700 dark:text-blue-300">
                      <span>🖥️</span> <span>For PC / Laptop Users:</span>
                    </div>
                    <ol className="text-[11px] font-bold text-slate-700 dark:text-slate-300 space-y-1 list-decimal list-inside pl-1">
                      <li>Search for the book cover on <b>Google Images, Amazon, or Flipkart</b>.</li>
                      <li><b>Right-click</b> directly on the book cover photo.</li>
                      <li>Click on <code className="bg-blue-100 dark:bg-blue-900/80 text-blue-900 dark:text-blue-100 font-extrabold px-1.5 py-0.5 rounded text-[10px]">Copy image address</code> (or <i>Copy Image Link</i>).</li>
                    </ol>
                  </div>
                  <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900/60 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-black text-blue-700 dark:text-blue-300">
                      <span>📱</span> <span>For Mobile Users:</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 pl-1">
                      <b>Press & hold (long-press)</b> on the book cover photo &rarr; tap <code className="bg-blue-100 dark:bg-blue-900/80 text-blue-900 dark:text-blue-100 font-extrabold px-1.5 py-0.5 rounded text-[10px]">Copy image link / address</code>.
                    </p>
                  </div>
                  <p className="text-[10px] font-bold text-amber-800 dark:text-amber-300 pt-1 border-t border-blue-200/60 dark:border-blue-800/60 flex items-start gap-1">
                    <span className="shrink-0">⚠️</span>
                    <span><b>Common Mistake:</b> Do NOT copy the URL from your browser's top address bar or Share button.</span>
                  </p>
                </div>

                <label className="block w-full text-center py-2.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer transition mt-2">
                  📁 Or Select Photo From Device
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCustomCoverUpload}
                  />
                </label>
              </div>

              {/* Option 3: Clear Current Slot */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={handleClearCurrentSlot}
                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl border border-red-200 dark:border-red-800/50 transition cursor-pointer"
                >
                  Clear This Slot
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}