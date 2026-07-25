"use client";

/**
 * @file Navbar.jsx
 * @description High-performance, fully responsive Navigation Bar featuring an
 * iLovePDF-style 3-Column Wide Mega Menu Dropdown, Mobile Drawer, Theme Switcher,
 * and category-wise grouping for Video, PDF, Image, and ⚡ Pro Level Utilities.
 */

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ThemeSwitcher from "./ui/ThemeSwitcher.jsx";

// ==========================================
// TOOL CATEGORIES & NAV DATA CONFIGURATION
// ==========================================

/**
 * ⚡ PRO LEVEL UTILITIES
 * Multi-step, high-impact workflow tools and advanced generators.
 */
/**
 * ⚡ PRO LEVEL UTILITIES
 */
const proLevelTools = [
  {
    id: "social-text-chunker",
    name: "Social Media Text Chunker",
    link: "/social-media-text-chunker",
    icon: "✍️",
    desc: "Split long posts & scripts into viral, platform-ready chunks with high-CTR attention hooks.",
    badge: "PRO",
  },
];

/**
 * 🎬 VIDEO UTILITIES
 * Client-side zero-quality loss video processing tools.
 */
const videoTools = [
  {
    id: "video-compressor",
    name: "Video Compressor",
    link: "/compressor",
    icon: "📉",
    desc: "Compress video size locally inside browser sandbox.",
    badge: "LOCAL",
  },
  {
    id: "video-splitter",
    name: "Smart Video Splitter",
    link: "/video-splitter",
    icon: "✂️",
    desc: "Split long videos for WhatsApp Status & Instagram Reels.",
    badge: "FAST",
  },
  {
    id: "youtube-extractor",
    name: "YouTube Extractor",
    link: "/youtube-thumbnail-and-metadata-extractor",
    icon: "📸",
    desc: "Extract HD thumbnails & video metadata in 1-click.",
    badge: "HD",
  },
];

/**
 * 📄 DOCUMENT & PDF UTILITIES
 * Offline local PDF merge and compression utilities.
 */
const pdfTools = [
  {
    id: "merge-compress-pdf",
    name: "Merge & Compress PDF",
    link: "/merge-images-compress-pdf-at-one-place",
    icon: "📄",
    desc: "Merge & compress images and PDFs into a single file.",
    badge: "FREE",
  },
];

/**
 * 🖼️ GRAPHIC & IMAGE UTILITIES
 * Bulk image compression and formatting tools.
 */
const imageTools = [
  {
    id: "batch-image-compressor",
    name: "Batch Image Compressor",
    link: "/image-compressor",
    icon: "🖼️",
    desc: "Compress multiple images offline in bulk without quality loss.",
    badge: "BULK",
  },
];

// ==========================================
// MAIN NAVBAR COMPONENT
// ==========================================

export default function Navbar() {
  // ------------------------------------------
  // STATE MANAGEMENT
  // ------------------------------------------
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  // Ref for Outside Click Handling
  const dropdownRef = useRef(null);

  // ------------------------------------------
  // EVENT LISTENERS (CLICK OUTSIDE, ESCAPE KEY, RESIZE)
  // ------------------------------------------

  // Close dropdown on click outside or ESC key press
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsToolsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsToolsOpen(false);
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Auto-close mobile drawer when switching to desktop screen
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 640) {
        setIsOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ------------------------------------------
  // HELPER FUNCTIONS
  // ------------------------------------------
  const closeAllMenus = () => {
    setIsToolsOpen(false);
    setIsOpen(false);
  };

  return (
    <nav
      aria-label="Main Navigation"
      className="w-full bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-slate-200/50 dark:border-white/5 transition-colors duration-300"
    >
      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* ========================================== */}
          {/* LOGO ZONE                                  */}
          {/* ========================================== */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              onClick={closeAllMenus}
              className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2 cursor-pointer group"
            >
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-2.5 py-1 rounded-lg text-sm font-bold shadow-sm group-hover:scale-105 transition-transform duration-200">
                UTZ
              </span>
              <span className="hidden sm:inline-block">
                Useful Tools Zone
              </span>
            </Link>
          </div>

          {/* ========================================== */}
          {/* NAV ITEMS & ACTIONS                        */}
          {/* ========================================== */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* HOME LINK */}
            <Link
              href="/"
              onClick={closeAllMenus}
              className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>

            {/* iLovePDF-STYLE WIDE MEGA MENU DROPDOWN */}
            <div
              className="relative group py-5"
              ref={dropdownRef}
            >
              {/* DROPDOWN TOGGLE BUTTON */}
              <button
                type="button"
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                aria-expanded={isToolsOpen}
                className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors focus:outline-none cursor-pointer"
              >
                <span>All Tools</span>
                <span
                  className={`text-[9px] transition-transform duration-200 block pt-0.5 ${
                    isToolsOpen
                      ? "rotate-180 text-blue-500"
                      : "group-hover:rotate-180"
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* 3-COLUMN MEGA MENU GRID CONTAINER */}
              <div
                className={`absolute right-0 top-full w-[90vw] sm:w-[680px] md:w-[750px] bg-white dark:bg-[#0d0d14] rounded-3xl shadow-2xl ring-1 ring-slate-200/60 dark:ring-white/10 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-150 z-50 ${
                  isToolsOpen ? "grid" : "hidden group-hover:grid"
                }`}
              >
               {/* ------------------------------------------ */}
                {/* COLUMN 1: PRO LEVEL & VIDEO UTILITIES       */}
                {/* ------------------------------------------ */}
                <div className="space-y-5">
                  
                  {/* ⚡ PRO LEVEL UTILITIES SECTION */}
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 pb-1.5 border-b border-slate-100 dark:border-white/5 mb-2.5 select-none flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <span>⚡</span> Pro Level Utilities
                      </span>
                      <span className="text-[8px] bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 px-1.5 py-0.5 rounded-full font-extrabold">
                        FEATURED
                      </span>
                    </div>

                    <div className="space-y-1">
                      {proLevelTools.map((tool) => (
                        <Link
                          key={tool.id}
                          href={tool.link}
                          onClick={closeAllMenus}
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 transition-all group/item"
                        >
                          <span className="text-base mt-0.5 group-hover/item:scale-110 transition-transform">
                            {tool.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-black text-slate-900 dark:text-white group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors flex items-center justify-between">
                              <span>{tool.name}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight mt-0.5">
                              {tool.desc}
                            </div>
                          </div>
                        </Link>
                      ))}

                      {/* 🚀 AND MANY MORE PRO TOOLS LINK */}
                      <div className="pt-2 mt-1 border-t border-slate-100 dark:border-white/5">
                        <Link
                          href="/?tab=pro"
                          onClick={closeAllMenus}
                          className="inline-flex items-center gap-1 text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline px-2 py-0.5 rounded-lg transition-all"
                        >
                          <span>& many more Pro Tools</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div> {/* 👈 Yahan ek </div> missing tha jo ab add ho gaya hai */}

                  {/* 🎬 VIDEO UTILITIES SECTION */}
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-500 dark:text-blue-400 pb-1.5 border-b border-slate-100 dark:border-white/5 mb-2.5 select-none flex items-center gap-1">
                      <span>🎬</span> Video Utilities
                    </div>

                    <div className="space-y-1">
                      {videoTools.map((tool) => (
                        <Link
                          key={tool.id}
                          href={tool.link}
                          onClick={closeAllMenus}
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-50/70 dark:hover:bg-blue-950/40 transition-all group/item"
                        >
                          <span className="text-base mt-0.5 group-hover/item:scale-110 transition-transform">
                            {tool.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                              {tool.name}
                            </div>
                            <div className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight mt-0.5">
                              {tool.desc}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                </div>

                {/* ------------------------------------------ */}
                {/* COLUMN 2: DOCUMENT & PDF UTILITIES         */}
                {/* ------------------------------------------ */}
                <div className="space-y-5">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 dark:text-emerald-400 pb-1.5 border-b border-slate-100 dark:border-white/5 mb-2.5 select-none flex items-center gap-1">
                      <span>📄</span> PDF Utilities
                    </div>

                    <div className="space-y-1">
                      {pdfTools.map((tool) => (
                        <Link
                          key={tool.id}
                          href={tool.link}
                          onClick={closeAllMenus}
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 transition-all group/item"
                        >
                          <span className="text-base mt-0.5 group-hover/item:scale-110 transition-transform">
                            {tool.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-900 dark:text-white group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 transition-colors">
                              {tool.name}
                            </div>
                            <div className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight mt-0.5">
                              {tool.desc}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ------------------------------------------ */}
                {/* COLUMN 3: GRAPHIC & IMAGE UTILITIES        */}
                {/* ------------------------------------------ */}
                <div className="space-y-5">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-amber-500 dark:text-amber-400 pb-1.5 border-b border-slate-100 dark:border-white/5 mb-2.5 select-none flex items-center gap-1">
                      <span>🖼️</span> Image Utilities
                    </div>

                    <div className="space-y-1">
                      {imageTools.map((tool) => (
                        <Link
                          key={tool.id}
                          href={tool.link}
                          onClick={closeAllMenus}
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-50/70 dark:hover:bg-amber-950/40 transition-all group/item"
                        >
                          <span className="text-base mt-0.5 group-hover/item:scale-110 transition-transform">
                            {tool.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-900 dark:text-white group-hover/item:text-amber-600 dark:group-hover/item:text-amber-400 transition-colors">
                              {tool.name}
                            </div>
                            <div className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight mt-0.5">
                              {tool.desc}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* DIVIDER */}
            <span className="h-4 w-[1px] bg-slate-200 dark:bg-white/10" />

            {/* THEME SWITCHER */}
            <ThemeSwitcher />

            {/* MOBILE HAMBURGER TOGGLE BUTTON */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5 focus:outline-none cursor-pointer"
            >
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>

          </div>
        </div>
      </div>
{/* ========================================== */}
      {/* MOBILE DRAWER NAVIGATION                   */}
      {/* ========================================== */}
      {isOpen && (
        <div className="bg-white dark:bg-[#0a0a0a] border-t border-slate-200 dark:border-white/5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top duration-200 sm:hidden">
          <div className="px-4 pt-3 pb-6 space-y-4 text-left">
            
            {/* MOBILE HOME LINK */}
            <Link
              href="/"
              onClick={closeAllMenus}
              className="block px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-slate-800 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
            >
              🏠 Home
            </Link>

            {/* ⚡ PRO LEVEL UTILITIES SECTION */}
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 pt-2 pb-1 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                <span>⚡ Pro Level Utilities</span>
                <span className="text-[8px] bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 px-1.5 py-0.5 rounded-full font-bold">
                  HOT
                </span>
              </div>
              <div className="mt-1 space-y-1">
                {proLevelTools.map((t) => (
                  <Link
                    key={t.id}
                    href={t.link}
                    onClick={closeAllMenus}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-800 dark:text-gray-200 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 rounded-lg transition-colors"
                  >
                    <span>{t.icon}</span>
                    <span>{t.name}</span>
                  </Link>
                ))}

                {/* 🚀 MOBILE AND MANY MORE LINK */}
                <div className="pt-1.5 mt-1 border-t border-slate-100 dark:border-white/5 px-3">
                  <Link
                    href="/?tab=pro"
                    onClick={closeAllMenus}
                    className="inline-flex items-center gap-1 text-xs font-black text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <span>& many more Pro Tools</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 🎬 VIDEO UTILITIES SECTION */}
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-blue-500 pt-2 pb-1 border-b border-slate-100 dark:border-white/5">
                🎬 Video Utilities
              </div>
              <div className="mt-1 space-y-1">
                {videoTools.map((t) => (
                  <Link
                    key={t.id}
                    href={t.link}
                    onClick={closeAllMenus}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-800 dark:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 rounded-lg transition-colors"
                  >
                    <span>{t.icon}</span>
                    <span>{t.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 📄 PDF & IMAGE UTILITIES SECTION */}
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 pt-2 pb-1 border-b border-slate-100 dark:border-white/5">
                📄 PDF & Image Utilities
              </div>
              <div className="mt-1 space-y-1">
                {pdfTools.concat(imageTools).map((t) => (
                  <Link
                    key={t.id}
                    href={t.link}
                    onClick={closeAllMenus}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-800 dark:text-gray-200 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 rounded-lg transition-colors"
                  >
                    <span>{t.icon}</span>
                    <span>{t.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* MOBILE DRAWER FOOTER INFO */}
            <div className="pt-3 border-t border-slate-100 dark:border-white/5 text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium">
              Useful Tools Zone • 100% Client-Side Privacy
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}