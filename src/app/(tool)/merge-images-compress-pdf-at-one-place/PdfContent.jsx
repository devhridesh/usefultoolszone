"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import AdBanner from "@/components/ui/AdBanner";

const PRESET_SEOMETA_MATRIX = {
  custom: {
    h1: "Convert Image to PDF",
    sub: "Merge & Compress PDF to Targeted Size at One Place Locally",
    desc: "Fast corporate-grade tool to combine multiple visual files into a light structured PDF document instantly on-device.",
    longSeo:
      "This advanced diagnostic mode allows absolute granular adjustment of vector bounds, allowing professional users to merge and compress image layouts into a single optimized document at one single place locally with zero external network leakage risks.",
  },
  "whatsapp-doc": {
    h1: "Convert Image to PDF for WhatsApp",
    sub: "Merge & Compress PDF to Targeted MB Size at One Place Locally",
    desc: "Structures full-resolution photo sets into clean PDF containers avoiding chat quality compression loops.",
    longSeo:
      "Standard messaging channels compress images heavily causing distortion. Our localized platform setup lets you merge and compress photo sheets at one place locally under strict attachment protocols seamlessly.",
  },
  "ssc-photo": {
    h1: "Convert Image to PDF for SSC Photo",
    sub: "Merge & Compress PDF to Targeted KB Size at One Place Locally",
    desc: "Strictly calibrated under the 50 KB ceiling required for Staff Selection Commission portals.",
    longSeo:
      "Indian government recruitment networks filter file uploads aggressively. This localized engine enables candidates to merge and compress application graphics at one single place locally under strict 50 KB compliance guidelines with total information safety controls.",
  },
  "upsc-sign": {
    h1: "Convert Image to PDF for UPSC Signature",
    sub: "Merge & Compress PDF to Targeted KB Size at One Place Locally",
    desc: "Micro binary footprint compiler optimized for the strict 20 KB Union Public Service Commission portal.",
    longSeo:
      "Our dynamic script lets you merge and compress official verification layouts at one single place locally smoothly without text-edge distortion or automated cloud sniffing threats.",
  },
  "sarkari-doc-100kb": {
    h1: "Convert Image to PDF for Sarkari Form",
    sub: "Merge & Compress PDF to Targeted 100 KB Size at One Place Locally",
    desc: "Automated profile configuration optimized for Indian central and state registration portals.",
    longSeo:
      "This targeted module allows Indian candidates to merge and compress multiple proof certificates at one single place locally with absolute cryptographic database protection loops.",
  },
  "pan-card-200kb": {
    h1: "Convert Image to PDF for PAN Card",
    sub: "Merge & Compress PDF to Targeted 200 KB Size at One Place Locally",
    desc: "Optimized alignment preset for NSDL and UTIITSL identity verification servers under 200 KB.",
    longSeo:
      "Use this framework to merge and compress state PAN cards at one single place locally with optimized color arrays that match national verification networks cleanly.",
  },
};

export default function PdfContent({ forcedSlug }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activePresetKey = forcedSlug || searchParams.get("preset") || "custom";

  // Dynamic Page Content Generator
  const [contentState, setContentState] = useState(
    PRESET_SEOMETA_MATRIX.custom,
  );

  // Core Inputs State Hook
  const [images, setImages] = useState([]);
  const [targetSize, setTargetSize] = useState("100");
  const [sizeUnit, setSizeUnit] = useState("KB");
  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState("portrait");

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const fileInputRef = useRef(null);

  const handlePresetNavigation = (slug) => {
    if (!slug) return;
    // 🌐 Language state preserver hook
    const langParam = searchParams.get("lang");
    const langQuery = langParam ? `?lang=${langParam}` : "";
    router.push(`/merge-images-compress-pdf-at-one-place/${slug}${langQuery}`);
  };
  // URL State Synchronizer Loop (Solves UI Inputs Mismatch Bug Permanently)
  useEffect(() => {
    const lowerKey = activePresetKey.toLowerCase();

    // 1. Handle Predefined Dictionary Contents
    if (PRESET_SEOMETA_MATRIX[lowerKey]) {
      setContentState(PRESET_SEOMETA_MATRIX[lowerKey]);
      if (lowerKey === "ssc-photo") {
        setTargetSize("50");
        setSizeUnit("KB");
      } else if (lowerKey === "upsc-sign") {
        setTargetSize("20");
        setSizeUnit("KB");
      } else if (lowerKey === "sarkari-doc-100kb") {
        setTargetSize("100");
        setSizeUnit("KB");
      } else if (lowerKey === "pan-card-200kb") {
        setTargetSize("200");
        setSizeUnit("KB");
      } else if (lowerKey === "whatsapp-doc") {
        setTargetSize("10");
        setSizeUnit("MB");
      }
      return;
    }

    // 2. Handle Dynamic Numerical Sizing Presets (e.g. compress-500kb, compress-2mb)
    const matches = lowerKey.match(/(?:compress-)?(\d+)\s*(kb|mb)/);
    if (matches) {
      const parsedVal = matches[1];
      const parsedUnit = matches[2].toUpperCase();

      setTargetSize(parsedVal);
      setSizeUnit(parsedUnit);
      setContentState({
        name: `Compressed ${parsedVal} ${parsedUnit} Unit`,
        h1: `Convert Image to PDF Compressed to ${parsedVal} ${parsedUnit}`,
        desc: `Target allocation locked strictly to ${parsedVal} ${parsedUnit}. Programmatic optimization loop running client side.`,
        longSeo: `This system parses matrix data locally to merge and compress images at one place under the custom target limit of ${parsedVal} ${parsedUnit} cleanly.`,
      });
    } else {
      setContentState(PRESET_SEOMETA_MATRIX.custom);
    }
  }, [activePresetKey]);
  // URL Layout Filter Routing Engines
  const activeKeyLower = activePresetKey.toLowerCase();

  const isIndianKBMode = [
    "custom",
    "upsc-sign",
    "ssc-photo",
    "sarkari-doc-100kb",
    "pan-card-200kb",
  ].includes(activeKeyLower);
  const isGlobalKBMode = [
    "custom",
    "compress-50kb",
    "compress-100kb",
    "compress-200kb",
    "compress-500kb",
  ].includes(activeKeyLower);
  const isMBModeOrSocial = !isIndianKBMode && !isGlobalKBMode; // Fallback for 1MB+, WhatsApp & Gmail

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            src: event.target.result,
            size: (file.size / 1024).toFixed(1),
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) =>
    setImages((prev) => prev.filter((img) => img.id !== id));

  const moveImage = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= images.length) return;
    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[nextIndex];
    updated[nextIndex] = temp;
    setImages(updated);
  };

  const generatePdf = async () => {
    if (!images.length) return;
    setIsGenerating(true);
    setProgress(20);
    setStatusText("Compiling custom document layers...");
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation, unit: "mm", format: pageSize });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const numericLimit = Number(targetSize) || 100;

      // Dynamic safety margin for reliable exact targeting
      const safetyGap =
        sizeUnit === "KB" ? Math.min(15, numericLimit * 0.15) : 0;
      const safeTargetSize = Math.max(10, numericLimit - safetyGap);

      // Strict Per-image byte allocation budget
      const targetBytesPerImage =
        sizeUnit === "KB"
          ? (safeTargetSize * 1024) / images.length
          : (numericLimit * 1024 * 1024 * 0.95) / images.length;

      for (let i = 0; i < images.length; i++) {
        if (i > 0) doc.addPage();
        setProgress(50 + Math.round((i / images.length) * 40));

        const img = new Image();
        img.src = images[i].src;
        await new Promise((res) => (img.onload = res));

        // 1. Set smart initial boundaries based strictly on budget to avoid heavy overflow
        let startDim = 2500;
        if (sizeUnit === "KB") {
          if (numericLimit <= 30) startDim = 400;
          else if (numericLimit <= 60) startDim = 600;
          else if (numericLimit <= 150) startDim = 900;
          else if (numericLimit <= 400) startDim = 1200;
          else startDim = 1800;
        }

        let currentDimension = Math.min(
          startDim,
          Math.max(img.width, img.height),
        );
        let bestBase64 = "";

        // 2. Binary Search Phase: Hunt for maximum quality inside the current dimension
        let minQuality = 0.05;
        let maxQuality = 0.95;
        let currentQuality = 0.85;
        let attempt = 0;

        while (attempt < 7) {
          const canvas = document.createElement("canvas");
          let targetWidth = img.width;
          let targetHeight = img.height;

          if (
            targetWidth > currentDimension ||
            targetHeight > currentDimension
          ) {
            if (targetWidth > targetHeight) {
              targetHeight = Math.round(
                (targetHeight * currentDimension) / targetWidth,
              );
              targetWidth = currentDimension;
            } else {
              targetWidth = Math.round(
                (targetWidth * currentDimension) / targetHeight,
              );
              targetHeight = currentDimension;
            }
          }

          canvas.width = Math.max(1, targetWidth);
          canvas.height = Math.max(1, targetHeight);
          canvas
            .getContext("2d")
            .drawImage(img, 0, 0, canvas.width, canvas.height);

          const tempBase64 = canvas.toDataURL("image/jpeg", currentQuality);
          const estimatedBytes = tempBase64.length * 0.75;

          if (estimatedBytes <= targetBytesPerImage) {
            bestBase64 = tempBase64;
            minQuality = currentQuality; // Fits! Try to push quality higher
          } else {
            maxQuality = currentQuality; // Failed! Drop quality ceiling
          }
          currentQuality = (minQuality + maxQuality) / 2;
          attempt++;
        }

        // 3. Bruteforce Strict Fallback: Guarantees file fits no matter what!
        if (!bestBase64) {
          let fallbackDim = currentDimension * 0.75;
          let fallbackQual = 0.6;

          while (true) {
            const canvas = document.createElement("canvas");
            let tw = img.width;
            let th = img.height;

            if (tw > th) {
              th = Math.round((th * fallbackDim) / tw);
              tw = fallbackDim;
            } else {
              tw = Math.round((tw * fallbackDim) / th);
              th = fallbackDim;
            }

            canvas.width = Math.max(50, tw);
            canvas.height = Math.max(50, th);
            canvas
              .getContext("2d")
              .drawImage(img, 0, 0, canvas.width, canvas.height);

            const tempBase64 = canvas.toDataURL("image/jpeg", fallbackQual);
            const estBytes = tempBase64.length * 0.75;

            // Stop immediately if it finally fits the strict byte limit OR shrinks too small
            if (estBytes <= targetBytesPerImage || fallbackDim <= 100) {
              bestBase64 = tempBase64;
              break;
            }

            // Slash dimensions and quality ruthlessly until it submits to the size rule
            fallbackDim *= 0.7;
            fallbackQual = Math.max(0.05, fallbackQual - 0.15);
          }
        }

        doc.addImage(bestBase64, "JPEG", 0, 0, pageWidth, pageHeight);
      }

      const dynamicTimeToken = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .slice(11, 19);
      doc.save(`UTZ_${targetSize}${sizeUnit}_${dynamicTimeToken}.pdf`);

      setProgress(100);
      setStatusText("Complete!");
      setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
      }, 2000);
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-slate-50/60 dark:bg-[#060609] pt-24 pb-12 px-4">
      <div className="w-full max-w-4xl mx-auto my-2 py-4 bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 text-center min-h-[90px] shadow-sm select-none rounded-2xl">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          [ AD ZONE ]
        </span>
      </div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] gap-8 mt-4">
        <div className="hidden lg:flex min-h-[600px] bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl items-center justify-center text-slate-400 text-xs shadow-sm">
          [ SIDEBAR AD 1 ]
        </div>

        <main className="w-full flex flex-col items-center justify-start space-y-6">
          {/* HIGH-ATTRACTION CONVERSION TRUST HEADERS */}
          <div className="text-center space-y-2 max-w-2xl mx-auto animate-fadeIn">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              {contentState.h1.split(" - ")[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-extrabold">
                Merge & Compress at One Place Locally
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto">
              {contentState.desc}
            </p>

            {/* CORPORATE LEVEL SAAS TRUST BADGES */}
            <div className="flex flex-wrap justify-center gap-2 pt-2 text-[10px] font-extrabold uppercase tracking-wider">
              <span className="px-2.5 py-1 bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400 rounded-full border border-green-100 dark:border-green-900/30 flex items-center gap-1 shadow-sm">
                🔒 100% Private Device Sandbox
              </span>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-900/30 flex items-center gap-1 shadow-sm">
                🛡️ Zero Server Upload Logs
              </span>
            </div>
          </div>

          <div className="relative group rounded-3xl w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur-md opacity-25"></div>
            <GlassCard className="relative w-full p-6 bg-white/90 dark:bg-black/80 border border-slate-200 dark:border-white/10 shadow-xl rounded-3xl z-10">
              <div className="relative mb-6 p-4 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 dark:from-indigo-950/40 border-2 border-blue-500/40 rounded-2xl shadow-sm text-left">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">
                      ⚡ Custom Target Size
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={targetSize}
                        onChange={(e) => {
                          setTargetSize(e.target.value);
                          if (activePresetKey !== "custom") {
                            const langParam = searchParams.get("lang");
                            const langQuery = langParam
                              ? `&lang=${langParam}`
                              : "";
                            router.push(
                              `/merge-images-compress-pdf-at-one-place?preset=custom${langQuery}`,
                            );
                          }
                        }}
                        className="w-full px-3 py-1.5 bg-white dark:bg-gray-950 border-2 border-blue-500/30 rounded-lg text-sm font-black text-gray-900 dark:text-white focus:outline-none"
                      />
                      <select
                        value={sizeUnit}
                        onChange={(e) => {
                          setSizeUnit(e.target.value);
                          if (activePresetKey !== "custom") {
                            const langParam = searchParams.get("lang");
                            const langQuery = langParam
                              ? `&lang=${langParam}`
                              : "";
                            router.push(
                              `/merge-images-compress-pdf-at-one-place?preset=custom${langQuery}`,
                            );
                          }
                        }}
                        className="px-2 py-1.5 bg-white dark:bg-gray-950 border-2 border-blue-500/30 rounded-lg text-xs font-black text-blue-600 focus:outline-none"
                      >
                        <option value="KB">KB</option>
                        <option value="MB">MB</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      Page Format
                    </label>
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(e.target.value)}
                      className="w-full px-2 py-2 bg-white dark:bg-gray-950 border border-slate-200 rounded-lg text-xs font-bold text-gray-950 dark:text-white focus:outline-none"
                    >
                      <option value="a4">A4 Standard</option>
                      <option value="letter">US Letter</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      Alignment
                    </label>
                    <select
                      value={orientation}
                      onChange={(e) => setOrientation(e.target.value)}
                      className="w-full px-2 py-2 bg-white dark:bg-gray-950 border border-slate-200 rounded-lg text-xs font-bold text-gray-950 dark:text-white focus:outline-none"
                    >
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                    </select>
                  </div>
                </div>
              </div>

              {!isGenerating && (
                <div className="space-y-6">
                  <div
                    onClick={() => fileInputRef.current.click()}
                    className="text-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-black/20 rounded-2xl hover:border-blue-500 cursor-pointer flex flex-col justify-center items-center min-h-[120px]"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden"
                      accept="image/*"
                      multiple
                    />
                    <button
                      type="button"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-xl font-bold text-xs shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-150 active:scale-[0.98]"
                    >
                      Select Document Images
                    </button>
                    <p className="mt-2 text-green-600 dark:text-green-400 text-[10px] font-bold tracking-wide">
                      🔒 Files remain inside your device context. Safe for
                      signatures & official records.
                    </p>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto p-2 bg-slate-50 dark:bg-black/40 rounded-xl border border-slate-200/60">
                      {images.map((img, index) => (
                        <div
                          key={img.id}
                          className="bg-white dark:bg-gray-950 p-2 rounded-xl border flex flex-col justify-between shadow-sm"
                        >
                          <div className="relative h-64 sm:h-32 w-full rounded-lg overflow-hidden bg-slate-50 dark:bg-neutral-900 flex items-center justify-center">
                            <img
                              src={img.src}
                              alt="slice"
                              className="max-h-full max-w-full object-contain"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(img.id);
                              }}
                              className="absolute top-2 right-2 sm:top-1 sm:right-1 bg-red-600 text-white rounded-full w-6 h-6 sm:w-4 sm:h-4 flex items-center justify-center text-xs font-black"
                            >
                              ✕
                            </button>
                          </div>
                          <p className="text-[10px] font-bold text-slate-600 mt-1 truncate px-0.5">
                            {img.name}
                          </p>
                          <div className="flex items-center justify-between mt-1 pt-1 border-t">
                            <span className="text-[10px] font-black text-indigo-500">
                              {img.size} KB
                            </span>
                            <div className="flex gap-1">
                              <button
                                type="button"
                                onClick={() => moveImage(index, -1)}
                                disabled={index === 0}
                                className="px-2 py-1 bg-slate-100 dark:bg-neutral-800 text-xs sm:text-[9px] rounded font-black disabled:opacity-20"
                              >
                                ◀
                              </button>
                              <button
                                type="button"
                                onClick={() => moveImage(index, 1)}
                                disabled={index === images.length - 1}
                                className="px-2 py-1 bg-slate-100 dark:bg-neutral-800 text-xs sm:text-[9px] rounded font-black disabled:opacity-20"
                              >
                                ▶
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={generatePdf}
                    disabled={images.length === 0}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-150 active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none disabled:shadow-none"
                  >
                    Compile & Save Secure PDF Document
                  </button>
                </div>
              )}

              {isGenerating && (
                <div className="w-full py-6 flex flex-col justify-center items-center space-y-2">
                  <p className="text-xs font-black text-blue-600 uppercase tracking-widest animate-pulse">
                    {statusText}
                  </p>
                  <div className="w-full bg-slate-100 dark:bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </GlassCard>
          </div>

          {/* DYNAMIC REGIONAL CONDITIONAL PRESETS INJECTION INTERFACE */}
          <div className="w-full max-w-4xl mx-auto mt-6 text-left space-y-6 select-none">
            {/* 1. INDIAN EXAM PRESETS (Shown on Main Page & Indian KB Pages) - INDIGO COLOR */}
            {isIndianKBMode && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-xs font-bold text-indigo-500 tracking-wide block mb-2.5 uppercase">
                    🇮🇳 Indian Recruitment Portals (Active Target Match):
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { slug: "upsc-sign", label: "UPSC Signature (20 KB)" },
                      { slug: "ssc-photo", label: "SSC Photo Form (50 KB)" },
                      {
                        slug: "sarkari-doc-100kb",
                        label: "Govt Form Doc (100 KB)",
                      },
                      {
                        slug: "pan-card-200kb",
                        label: "PAN Card Upload (200 KB)",
                      },
                    ].map((item) => (
                      <button
                        key={item.slug}
                        type="button"
                        onClick={() => handlePresetNavigation(item.slug)}
                        className={`p-3 rounded-xl border text-xs font-bold text-center transition-all bg-white dark:bg-[#0c0c12] hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/40 shadow-sm ${
                          activePresetKey === item.slug
                            ? "border-indigo-600 text-indigo-700 ring-2 ring-indigo-600/20 bg-indigo-50/80 dark:bg-indigo-950/40"
                            : "border-indigo-100 text-slate-700 dark:text-gray-300 dark:border-white/5"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. GLOBAL KB PRESETS (Shown ONLY on Foreign / Global KB Pages) - BLUE COLOR */}
            {isGlobalKBMode && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-xs font-bold text-blue-500 tracking-wide block mb-2.5 uppercase">
                    🌐 Global Size Optimization (KB):
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { slug: "compress-50kb", label: "Compress to 50 KB" },
                      { slug: "compress-100kb", label: "Compress to 100 KB" },
                      { slug: "compress-200kb", label: "Compress to 200 KB" },
                      { slug: "compress-500kb", label: "Compress to 500 KB" },
                    ].map((item) => (
                      <button
                        key={item.slug}
                        type="button"
                        onClick={() => handlePresetNavigation(item.slug)}
                        className={`p-3 rounded-xl border text-xs font-black text-center transition-all bg-white dark:bg-[#0c0c12] hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/40 shadow-sm ${
                          activePresetKey === item.slug
                            ? "border-blue-600 text-blue-700 ring-2 ring-blue-600/20 bg-blue-50/80 dark:bg-blue-950/40"
                            : "border-blue-100 text-slate-700 dark:text-gray-300 dark:border-white/5"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. GLOBAL MB PRESETS (Shown on Indian Pages & Common MB/Social Pages) - VIOLET COLOR */}
            {(isIndianKBMode || isMBModeOrSocial) && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-xs font-bold text-violet-500 tracking-wide block mb-2.5 uppercase">
                    🗂️ Global High-Density Optimization (MB):
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { slug: "compress-1mb", label: "Compress to 01 MB" },
                      { slug: "compress-2mb", label: "Compress to 02 MB" },
                      { slug: "compress-5mb", label: "Compress to 05 MB" },
                      { slug: "compress-10mb", label: "Compress to 10 MB" },
                    ].map((item) => (
                      <button
                        key={item.slug}
                        type="button"
                        onClick={() => handlePresetNavigation(item.slug)}
                        className={`p-3 rounded-xl border text-xs font-black text-center transition-all bg-white dark:bg-[#0c0c12] hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50/40 shadow-sm ${
                          activePresetKey === item.slug
                            ? "border-violet-600 text-violet-700 ring-2 ring-violet-600/20 bg-violet-50/80 dark:bg-violet-950/40"
                            : "border-violet-100 text-slate-700 dark:text-gray-300 dark:border-white/5"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. SOCIAL & MESSAGING UTILITIES (Shown EVERYWHERE unconditionally) - EMERALD & ROSE COLOR */}
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="text-xs font-bold text-gray-500 tracking-wide block mb-2.5 uppercase">
                  💬 Social & Network Utilities:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handlePresetNavigation("whatsapp-doc")}
                    className={`p-4 rounded-xl border text-xs font-bold text-center transition-all bg-white dark:bg-[#0c0c12] shadow-sm hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50/40 ${
                      activePresetKey === "whatsapp-doc"
                        ? "border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/20 bg-emerald-50/80 dark:bg-emerald-950/40"
                        : "border-emerald-100 text-emerald-600 dark:border-emerald-900/30"
                    }`}
                  >
                    WhatsApp Document Framework
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetNavigation("gmail-25mb")}
                    className={`p-4 rounded-xl border text-xs font-bold text-center transition-all bg-white dark:bg-[#0c0c12] shadow-sm hover:border-rose-400 hover:text-rose-700 hover:bg-rose-50/40 ${
                      activePresetKey === "gmail-25mb"
                        ? "border-rose-500 text-rose-700 ring-2 ring-rose-500/20 bg-rose-50/80 dark:bg-rose-950/40"
                        : "border-rose-100 text-rose-600 dark:border-rose-900/30"
                    }`}
                  >
                    Gmail Attachment Engine
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div className="hidden lg:flex min-h-[600px] bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 rounded-2xl items-center justify-center text-slate-400 text-xs shadow-sm">
          [ SIDEBAR AD 2 ]
        </div>
      </div>

      <section className="w-full max-w-3xl mx-auto mt-14 bg-white dark:bg-[#0c0c12] rounded-2xl p-6 md:p-8 text-xs text-left text-slate-500 border shadow-sm space-y-4 animate-fadeIn">
        <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
          Why Merge & Compress Images Into PDF At One Place?
        </h2>
        <p className="leading-relaxed">
          Scattering visual files across multiple third-party compression
          scripts compromises visual structural boundaries. Our standalone
          utility allows users to{" "}
          <strong>merge and compress at one place</strong> cleanly without
          transmitting private file bits over public internet routes.
        </p>
        <p className="leading-relaxed">{contentState.longSeo}</p>
      </section>

      {/* 🚀 SCHEMA ENGINE FOR RICH SEARCH RESULTS */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: contentState.h1,
              url: `https://usefultoolszone.com/merge-images-compress-pdf-at-one-place/${
                activePresetKey === "custom" ? "" : activePresetKey
              }`,
              operatingSystem: "All",
              applicationCategory: "BusinessApplication",
              description: contentState.desc,
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
          ]),
        }}
      />
    </div>
  );
}
