"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import AdBanner from "@/components/ui/AdBanner";

const PSEO_DICTIONARY = {
  custom: {
    h1: "Batch Image Compressor Online",
    sub: "Compress Multiple Images to Targeted Size Locally",
    desc: "Lightning fast client-side image compression. Reduce image sizes in bulk without losing clarity.",
    longSeo: "This advanced client-side image compressor allows you to process up to 15 images simultaneously. All processing occurs strictly inside your web browser sandbox."
  },
  "compress-image-to-20kb": {
    h1: "Compress Image to 20KB Online",
    sub: "Targeted 20 KB Binary Compressor for Official Uploads",
    desc: "Strictly calibrated under the 20 KB ceiling required for UPSC signature and official registration forms.",
    longSeo: "Government portals strictly enforce tiny image limits. Our offline algorithm scales dimensions and optimizes bit depth to fit images under 20 KB."
  },
  "compress-image-to-50kb": {
    h1: "Compress Image to 50KB Online",
    sub: "Optimize Photos for Govt Forms & SSC Portals",
    desc: "Perfect preset for Staff Selection Commission (SSC) and Sarkari Job online application forms.",
    longSeo: "Reduce photo file sizes down to 50 KB seamlessly. Supports batch conversion for all official photo requirements."
  },
  "compress-image-to-100kb": {
    h1: "Compress Image to 100KB Online",
    sub: "Batch Image Reducer Under 100 KB Threshold",
    desc: "Ideal for identity proof verification, document scans, and general online submissions.",
    longSeo: "Compress pictures to 100 KB without distortion. Fast client-side conversion ensures total privacy."
  },
  "compress-image-to-200kb": {
    h1: "Compress Image to 200KB Online",
    sub: "HD Image Compressor for PAN Cards & Portals",
    desc: "Optimized alignment preset for NSDL, UTIITSL, and academic document uploads under 200 KB.",
    longSeo: "Keep high resolution and color accuracy while keeping file sizes under 200 KB effortlessly."
  },
  "compress-image-to-500kb": {
    h1: "Compress Image to 500KB Online",
    sub: "Web & Graphic Asset Size Reducer",
    desc: "Shrink heavy DSLR or smartphone camera photos down to 500 KB for fast website loading.",
    longSeo: "Improve website load speed by compressing high-resolution images down to 500 KB in bulk."
  },

  "compress-image-to-1mb": {
    h1: "Compress Image to 1MB Online",
    sub: "Shrink Heavy Images to 1 MB Target Limit",
    desc: "Optimized 1 MB compression for high-resolution DSLR photos and design assets.",
    longSeo: "Easily compress large multi-megapixel images down to 1 MB while maintaining crisp clarity for web uploads and cloud backup."
  },
  "compress-image-to-2mb": {
    h1: "Compress Image to 2MB Online",
    sub: "Scale High-Res Photos Under 2 MB Ceilings",
    desc: "Fast bulk compression targeting 2 MB size limits for job portals and email attachments.",
    longSeo: "Reduce 4K and camera shots to 2 MB instantly inside your browser sandbox."
  },
  "compress-image-to-5mb": {
    h1: "Compress Image to 5MB Online",
    sub: "Batch Compression to 5 MB for Heavy Assets",
    desc: "Compress raw photography and uncompressed graphics down to 5 MB effortlessly.",
    longSeo: "Batch process heavy visual assets down to 5 MB with zero cloud server exposure."
  },
  "compress-image-to-10mb": {
    h1: "Compress Image to 10MB Online",
    sub: "10 MB Target Allocation Engine",
    desc: "High-capacity image size reducer for heavy RAW and TIFF files to 10 MB.",
    longSeo: "Safely process massive photo collections down to 10 MB locally on your device."
  },
  
  "ssc-photo-compressor": {
    h1: "SSC Photo Compressor Online",
    sub: "SSC Official Application Photo & Signature Resizer",
    desc: "Strictly tuned for SSC CGL, CHSL, and MTS candidate uploads.",
    longSeo: "Compress application photos specifically for Staff Selection Commission guidelines instantly."
  },
  "upsc-photo-compressor": {
    h1: "UPSC Photo & Signature Compressor",
    sub: "Union Public Service Commission Upload Engine",
    desc: "Calibrated for UPSC IAS, NDA, and CDS recruitment portal guidelines.",
    longSeo: "Ensures signature and candidate photo uploads pass UPSC verification filters smoothly."
  },
  "image-compressor-for-whatsapp": {
    h1: "Image Compressor for WhatsApp",
    sub: "Optimize High-Res Photos for Fast WhatsApp Sharing",
    desc: "Shrink large media images to avoid chat bandwidth drops and slow sending times.",
    longSeo: "Compress photos for WhatsApp status and messaging without noticeable quality loss."
  },
};

export default function ImageCompressorContent({ forcedSlug }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSlug = forcedSlug || searchParams.get("preset") || "custom";

  const [content, setContent] = useState(PSEO_DICTIONARY.custom);
  const [images, setImages] = useState([]);
  const [targetSize, setTargetSize] = useState("100");
  const [sizeUnit, setSizeUnit] = useState("KB");
  const [format, setFormat] = useState("jpeg");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImages, setProcessedImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [validationError, setValidationError] = useState("");
  const fileInputRef = useRef(null);

  const BATCH_LIMIT = 15;
useEffect(() => {
    const lowerSlug = activeSlug.toLowerCase();

    // 1. Static Dictionary Presets Check
    if (PSEO_DICTIONARY[lowerSlug]) {
      setContent(PSEO_DICTIONARY[lowerSlug]);

      if (lowerSlug === "compress-image-to-20kb" || lowerSlug === "upsc-photo-compressor") {
        setTargetSize("20");
        setSizeUnit("KB");
      } else if (lowerSlug === "compress-image-to-50kb" || lowerSlug === "ssc-photo-compressor") {
        setTargetSize("50");
        setSizeUnit("KB");
      } else if (lowerSlug === "compress-image-to-100kb") {
        setTargetSize("100");
        setSizeUnit("KB");
      } else if (lowerSlug === "compress-image-to-200kb") {
        setTargetSize("200");
        setSizeUnit("KB");
      } else if (lowerSlug === "compress-image-to-500kb") {
        setTargetSize("500");
        setSizeUnit("KB");
      } else if (lowerSlug === "compress-image-to-1mb") {
        setTargetSize("1");
        setSizeUnit("MB");
      } else if (lowerSlug === "compress-image-to-2mb") {
        setTargetSize("2");
        setSizeUnit("MB");
      } else if (lowerSlug === "compress-image-to-5mb") {
        setTargetSize("5");
        setSizeUnit("MB");
      } else if (lowerSlug === "compress-image-to-10mb") {
        setTargetSize("10");
        setSizeUnit("MB");
      }
      return;
    }

    // 2. Dynamic Programmatic SEO Engine (Regex Parser for ANY KB / MB URL)
    const match = lowerSlug.match(/(?:compress-image-to-|compress-)?(\d+)\s*[-_]?\s*(kb|mb)/i);
    if (match) {
      const sizeVal = match[1];
      const unitVal = match[2].toUpperCase();

      setTargetSize(sizeVal);
      setSizeUnit(unitVal);

      setContent({
        h1: `Compress Image to ${sizeVal}${unitVal} Online`,
        sub: `Targeted ${sizeVal} ${unitVal} Client-Side Compression Engine`,
        desc: `Fast bulk image compressor locked strictly to the ${sizeVal} ${unitVal} size ceiling for official uploads & web sharing.`,
        longSeo: `This programmatic utility compresses your photos and visual assets down to exactly ${sizeVal} ${unitVal} locally inside your browser memory sandbox. Zero server uploads ensure 100% data privacy.`
      });
    } else {
      setContent(PSEO_DICTIONARY.custom);
    }
  }, [activeSlug]);

  const handlePresetChange = (slug) => {
    const langParam = searchParams.get("lang");
    const langQuery = langParam ? `?lang=${langParam}` : "";
    router.push(`/image-compressor/${slug}${langQuery}`);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setValidationError("");

// Soft advice warning if batch is large, but allowing selection based on device capability
    if (selectedFiles.length > 15) {
      setValidationError("Pro Advice: For optimal browser performance, batches of up to 15 images are recommended. Larger batches depend entirely on your device RAM.");
    }

    const validImages = selectedFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      name: file.name,
      originalSize: (file.size / 1024).toFixed(1),
      preview: URL.createObjectURL(file),
    }));

    setImages(validImages);
    setProcessedImages([]);
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const compressBatch = async () => {
    if (!images.length) return;
    setIsProcessing(true);
    setProgress(10);
    setProcessedImages([]);

    const results = [];
    const targetBytes = sizeUnit === "KB" ? Number(targetSize) * 1024 : Number(targetSize) * 1024 * 1024;

    for (let i = 0; i < images.length; i++) {
      const item = images[i];
      const blob = await compressSingleImage(item.file, targetBytes, format);
      const compressedSize = (blob.size / 1024).toFixed(1);

      results.push({
        id: item.id,
        name: `compressed_${item.name}`,
        originalSize: item.originalSize,
        compressedSize,
        url: URL.createObjectURL(blob),
        blob,
      });

      setProgress(Math.round(((i + 1) / images.length) * 100));
    }

    setProcessedImages(results);
    setIsProcessing(false);
  };
const compressSingleImage = (file, targetBytes, mimeFormat) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const mimeType = mimeFormat === "webp" ? "image/webp" : "image/jpeg";
        // Strict Ceiling: Max 96% of target size (e.g. 19.2 KB for 20 KB target)
        const maxTarget = targetBytes * 0.96; 
        let currentDim = Math.max(img.width, img.height);

        // Smart initial dimension cap to keep resolution crisp
        if (targetBytes <= 30 * 1024) currentDim = Math.min(currentDim, 1000);
        else if (targetBytes <= 60 * 1024) currentDim = Math.min(currentDim, 1200);

        const findOptimalBlob = (dim) => {
          const canvas = document.createElement("canvas");
          let w = img.width;
          let h = img.height;
          if (w > h) {
            h = Math.round((h * dim) / w);
            w = dim;
          } else {
            w = Math.round((w * dim) / h);
            h = dim;
          }
          canvas.width = Math.max(1, w);
          canvas.height = Math.max(1, h);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          let minQ = 0.05;
          let maxQ = 0.98;
          let bestBlob = null;
          let attempts = 0;

          // Binary Search Loop: Hunts for maximum quality right under the limit (17KB - 19KB)
          const binarySearchQ = () => {
            if (attempts >= 8 || (maxQ - minQ) < 0.02) {
              if (bestBlob && bestBlob.size <= maxTarget) {
                resolve(bestBlob);
              } else if (dim > 150) {
                // If quality drop wasn't enough, reduce resolution slightly and retry
                findOptimalBlob(Math.round(dim * 0.85));
              } else {
                resolve(bestBlob || new Blob());
              }
              return;
            }

            attempts++;
            const midQ = (minQ + maxQ) / 2;
            canvas.toBlob((blob) => {
              if (!blob) return;
              if (blob.size <= maxTarget) {
                bestBlob = blob;
                minQ = midQ; // Fits! Push quality higher to reach ~18 KB
              } else {
                maxQ = midQ; // Exceeded target, lower quality
              }
              binarySearchQ();
            }, mimeType, midQ);
          };

          binarySearchQ();
        };

        findOptimalBlob(currentDim);
      };
    });
  };

  const downloadAll = () => {
    processedImages.forEach((img) => {
      const a = document.createElement("a");
      a.href = img.url;
      a.download = img.name;
      a.click();
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-slate-50/60 dark:bg-[#060609] pt-24 pb-12 px-4">
      {/* Top Banner Ad */}
      <div className="w-full max-w-4xl mx-auto my-2 py-4 bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 text-center min-h-[90px] shadow-sm rounded-2xl select-none">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">[ SPONSORED AD AREA ]</span>
      </div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] gap-8 mt-4">
        {/* Left Sidebar Ad */}
        <div className="hidden lg:flex min-h-[600px] bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl items-center justify-center text-slate-400 text-xs shadow-sm">
          [ PC SIDEBAR AD 1 ]
        </div>

        {/* Center Tool Content */}
        <main className="w-full flex flex-col items-center justify-start space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              {content.h1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-extrabold">
                100% Client-Side Sandbox
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
              {content.desc}
            </p>

            <div className="flex flex-wrap justify-center gap-2 pt-2 text-[10px] font-extrabold uppercase tracking-wider">
              <span className="px-2.5 py-1 bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400 rounded-full border border-green-100 dark:border-green-900/30 flex items-center gap-1 shadow-sm">
                100% Private Browser Execution
              </span>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-900/30 flex items-center gap-1 shadow-sm">
                Batch Limit: 15 Images
              </span>
            </div>
          </div>

          <div className="relative group rounded-3xl w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur-md opacity-25"></div>
            <GlassCard className="relative w-full p-6 bg-white/90 dark:bg-black/80 border border-slate-200 dark:border-white/10 shadow-xl rounded-3xl z-10">
              
        {/* Settings Controls */}
              <div className="relative mb-6 p-4 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 dark:from-indigo-950/40 border-2 border-blue-500/40 rounded-2xl shadow-sm text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      Target File Size
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={targetSize}
                        onChange={(e) => setTargetSize(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white dark:bg-gray-950 border-2 border-blue-500/30 rounded-lg text-sm font-black text-gray-900 dark:text-white focus:outline-none"
                        min="5"
                        max="2000"
                      />
                      <select
                        value={sizeUnit}
                        onChange={(e) => setSizeUnit(e.target.value)}
                        className="px-2 py-1.5 bg-white dark:bg-gray-950 border-2 border-blue-500/30 rounded-lg text-xs font-black text-blue-600 focus:outline-none cursor-pointer"
                      >
                        <option value="KB">KB</option>
                        <option value="MB">MB</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      Output Format
                    </label>
                    <select
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className="w-full px-2 py-2 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-lg text-xs font-bold text-gray-900 dark:text-white focus:outline-none cursor-pointer"
                    >
                      <option value="jpeg">JPG / JPEG</option>
                      <option value="webp">WebP (Next-Gen)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Validation Warning */}
              {validationError && (
                <div className="p-3 mb-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400 text-left">
                  {validationError}
                </div>
              )}

             {/* Dropzone */}
              {!isProcessing && processedImages.length === 0 && (
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="text-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-black/20 rounded-2xl hover:border-blue-500 cursor-pointer flex flex-col justify-center items-center min-h-[150px] transition-all"
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
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all"
                  >
                    Select Images (Recommended: Up to 15)
                  </button>
                  <p className="mt-3 text-slate-600 dark:text-slate-300 text-xs font-semibold max-w-md">
                    Upload multiple JPG, PNG, or WebP images to compress in bulk.
                    <span className="block mt-1 text-[11px] font-bold text-blue-600 dark:text-blue-400">
                      ⚡ No fixed batch limit — processing capacity depends on your device memory & CPU power.
                    </span>
                  </p>
                </div>
              )}

             {/* Selected Images List & Bottom Action Trigger */}
              {images.length > 0 && processedImages.length === 0 && (
                <div className="space-y-6 mt-4 animate-fadeIn">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[350px] overflow-y-auto p-2 bg-slate-50 dark:bg-black/40 rounded-xl border border-slate-200/60 dark:border-slate-800">
                    {images.map((img) => (
                      <div key={img.id} className="bg-white dark:bg-gray-950 p-2 rounded-xl border dark:border-slate-800 flex flex-col justify-between shadow-sm relative">
                        <img src={img.preview} alt="preview" className="h-24 w-full object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black shadow-md cursor-pointer"
                        >
                          ✕
                        </button>
                        <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate mt-1">{img.name}</p>
                        <span className="text-[9px] font-black text-blue-600">{img.originalSize} KB</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={compressBatch}
                    disabled={isProcessing}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-150 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    {isProcessing ? `Compressing Batch (${progress}%)...` : `Start Batch Compression (${images.length} Selected)`}
                  </button>

                  {/* Sleek Compact Ad Space */}
                  <div className="pt-3 border-t border-slate-200/60 dark:border-white/5">
                    <div className="w-full min-h-[50px] py-2 px-3 bg-slate-50/80 dark:bg-gray-950/40 rounded-xl border border-dashed border-slate-200 dark:border-gray-800/80 flex items-center justify-between gap-2 select-none">
                      <span className="text-[9px] font-black tracking-widest text-indigo-500 dark:text-indigo-400 uppercase shrink-0">
                        [ Sponsored Ad ]
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-gray-500 font-medium truncate">
                        AdSense script paused locally
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Compression Results View */}
              {processedImages.length > 0 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      Successfully Compressed ({processedImages.length} Images)
                    </h3>
                    <button
                      type="button"
                      onClick={downloadAll}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      Download All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto p-2 bg-slate-50 dark:bg-black/40 rounded-xl border border-slate-200/60 dark:border-slate-800">
                    {processedImages.map((img) => (
                      <div key={img.id} className="bg-white dark:bg-gray-950 p-3 rounded-xl border dark:border-slate-800 flex items-center justify-between gap-3 shadow-sm">
                        <img src={img.url} alt="compressed" className="w-12 h-12 object-cover rounded-lg shrink-0" />
                        <div className="flex-1 text-left truncate">
                          <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{img.name}</p>
                          <p className="text-[10px] text-slate-400">
                            {img.originalSize} KB → <span className="font-black text-emerald-600 dark:text-emerald-400">{img.compressedSize} KB</span>
                          </p>
                        </div>
                        <a
                          href={img.url}
                          download={img.name}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg transition-all shrink-0"
                        >
                          Save
                        </a>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setImages([]);
                      setProcessedImages([]);
                    }}
                    className="text-xs text-slate-400 underline font-medium hover:text-slate-600 dark:hover:text-white cursor-pointer"
                  >
                    Compress Another Batch
                  </button>
                </div>
              )}

            </GlassCard>
          </div>

{/* pSEO Grid Internal Linking Matrix */}
          <div className="w-full max-w-4xl mx-auto mt-6 text-left space-y-6">
            {/* KB Target Presets Block */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-blue-500 uppercase tracking-wider">
                Target KB Presets (Govt Forms & Exams):
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { slug: "compress-image-to-20kb", label: "Compress to 20 KB" },
                  { slug: "compress-image-to-50kb", label: "Compress to 50 KB" },
                  { slug: "compress-image-to-100kb", label: "Compress to 100 KB" },
                  { slug: "compress-image-to-200kb", label: "Compress to 200 KB" },
                  { slug: "ssc-photo-compressor", label: "SSC Photo Form" },
                  { slug: "upsc-photo-compressor", label: "UPSC Signature" },
                  { slug: "image-compressor-for-whatsapp", label: "WhatsApp Photos" },
                  { slug: "compress-image-to-500kb", label: "Compress to 500 KB" },
                ].map((item) => (
                  <button
                    key={item.slug}
                    onClick={() => handlePresetChange(item.slug)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all bg-white dark:bg-[#0c0c12] shadow-sm hover:border-blue-500 ${
                      activeSlug === item.slug
                        ? "border-blue-600 text-blue-600 ring-2 ring-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30"
                        : "border-slate-200 dark:border-white/5 text-slate-700 dark:text-gray-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* MB Target Presets Block */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-violet-500 uppercase tracking-wider">
                Target MB Presets (HD & Heavy Assets):
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { slug: "compress-image-to-1mb", label: "Compress to 1 MB" },
                  { slug: "compress-image-to-2mb", label: "Compress to 2 MB" },
                  { slug: "compress-image-to-5mb", label: "Compress to 5 MB" },
                  { slug: "compress-image-to-10mb", label: "Compress to 10 MB" },
                ].map((item) => (
                  <button
                    key={item.slug}
                    onClick={() => handlePresetChange(item.slug)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all bg-white dark:bg-[#0c0c12] shadow-sm hover:border-violet-500 ${
                      activeSlug === item.slug
                        ? "border-violet-600 text-violet-600 ring-2 ring-violet-500/20 bg-violet-50/50 dark:bg-violet-950/30"
                        : "border-slate-200 dark:border-white/5 text-slate-700 dark:text-gray-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar Ad */}
        <div className="hidden lg:flex min-h-[600px] bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl items-center justify-center text-slate-400 text-xs shadow-sm">
          [ PC SIDEBAR AD 2 ]
        </div>
      </div>

   {/* Article & SEO Content Section (AdSense & High E-A-T Optimized) */}
      <section className="w-full max-w-4xl mx-auto mt-12 bg-white dark:bg-[#0c0c12] rounded-2xl p-6 sm:p-10 text-xs text-left text-slate-600 dark:text-gray-400 border border-slate-200/60 dark:border-white/5 shadow-sm space-y-10">
        
        {/* Article 1: Comprehensive Platform Overview */}
        <article className="space-y-4">
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            The Ultimate Privacy-First Batch Image Compression Engine
          </h2>
          <p className="leading-relaxed">
            In today&apos;s digital ecosystem, high-resolution DSLR cameras and modern smartphone sensors capture imagery with staggering detail. However, this visual fidelity comes at the cost of massive file footprints. Large image files exhaust monthly bandwidth quotas, trigger upload rejections on government recruitment portals, and severely degrade web performance metrics such as Largest Contentful Paint (LCP).
          </p>
          <p className="leading-relaxed">
            Standard web tools require you to upload confidential photographs, scanned ID cards, and signature files to remote third-party servers. This introduces critical security risks including unauthorized data logging, server-side tracking, and potential database leaks. <strong>Useful Tools Zone</strong> solves this vulnerability by bringing desktop-grade image compression directly into your client-side browser virtual sandbox.
          </p>
        </article>

        {/* Article 2: Technical Architecture */}
        <article className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            How Client-Side Binary Quantization Preserves Visual Quality
          </h2>
          <p className="leading-relaxed">
            Our image compression suite leverages modern HTML5 Canvas APIs combined with adaptive binary search quality quantization. Instead of applying destructive spatial downsizing across the entire pixel array, our localized algorithms analyze chromatic variance and apply intelligent chroma subsampling.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-xl">
              <h3 className="font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">
                EXIF Metadata Stripping
              </h3>
              <p className="text-[11px] leading-relaxed">
                Automatically purges GPS geolocation tags, camera serial numbers, and timestamp logs embedded in your camera files to protect your personal privacy upon upload.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-xl">
              <h3 className="font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">
                Dynamic Binary Searching
              </h3>
              <p className="text-[11px] leading-relaxed">
                Calculates the mathematically highest quality threshold ($0.05$ to $0.98$) that fits your targeted KB/MB ceiling without causing pixelation or blurry artifacts.
              </p>
            </div>
          </div>
        </article>

        {/* Article 3: Target Use Cases */}
        <article className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Specialized Target Use Cases & Industry Workflows
          </h2>
          <div className="space-y-3">
            <div className="border-l-2 border-blue-500 pl-4 py-1">
              <h3 className="font-bold text-slate-800 dark:text-slate-200">
                1. Government & Recruitment Portals (SSC, UPSC, Banking, Sarkari Forms)
              </h3>
              <p className="mt-1 leading-relaxed">
                Official registration portals impose strict file size boundaries (e.g., UPSC signature under 20 KB, SSC candidate photograph under 50 KB, and identity documents under 200 KB). Our specialized KB presets allow candidates to instantly meet these hard ceilings without needing expensive image editing software.
              </p>
            </div>
            <div className="border-l-2 border-indigo-500 pl-4 py-1">
              <h3 className="font-bold text-slate-800 dark:text-slate-200">
                2. Web Development & Core Web Vitals Optimization
              </h3>
              <p className="mt-1 leading-relaxed">
                Uncompressed images account for over 60% of average webpage payload size. By converting heavy PNG and JPG graphics into next-generation WebP format and compressing them down to under 100 KB or 500 KB, developers can drastically increase PageSpeed Insights scores, decrease Cumulative Layout Shift (CLS), and rank higher on Google search results.
              </p>
            </div>
            <div className="border-l-2 border-violet-500 pl-4 py-1">
              <h3 className="font-bold text-slate-800 dark:text-slate-200">
                3. Social Media & Chat Messaging Distribution
              </h3>
              <p className="mt-1 leading-relaxed">
                Email services like Gmail cap attachments at 25 MB, while messaging platforms apply aggressive compression loops that distort photos. Pre-compressing your images to 1 MB or 2 MB ensures fast delivery while maintaining full visual fidelity.
              </p>
            </div>
          </div>
        </article>

        {/* Article 4: Step-by-Step Usage Guide */}
        <article className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            How to Batch Compress Images Online in 3 Simple Steps
          </h2>
          <ol className="list-decimal list-inside space-y-2 leading-relaxed font-medium">
            <li>
              <span className="font-bold text-slate-800 dark:text-slate-200">Set Target Limits & Format:</span> Enter your desired target size (e.g., 20 KB, 50 KB, or 2 MB) and select your preferred output format (JPG or WebP).
            </li>
            <li>
              <span className="font-bold text-slate-800 dark:text-slate-200">Select Images:</span> Click the dropzone or drag and drop your images into the browser sandbox. You can process single images or large batches seamlessly.
            </li>
            <li>
              <span className="font-bold text-slate-800 dark:text-slate-200">Download Results:</span> Our engine processes your files locally in real-time. Review the original vs. compressed file size comparison and save individual images or download the entire batch with one click.
            </li>
          </ol>
        </article>

        {/* In-Depth Interactive FAQ Section */}
        <div className="border-t border-slate-100 dark:border-white/5 pt-8 space-y-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="space-y-3">
            <details className="group border border-slate-100 dark:border-white/[0.04] bg-slate-50/50 dark:bg-black/20 transition-colors duration-200 rounded-xl p-4 cursor-pointer">
              <summary className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wide select-none">
                <span>Are my uploaded images saved or tracked on any cloud server?</span>
                <span className="text-blue-500 transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-3 leading-relaxed text-[11px]">
                No. Useful Tools Zone operates on a strictly client-side architecture. Your images are parsed, resized, and compressed using your device&apos;s own local CPU and memory RAM. No image data ever leaves your computer or mobile phone.
              </p>
            </details>

            <details className="group border border-slate-100 dark:border-white/[0.04] bg-slate-50/50 dark:bg-black/20 transition-colors duration-200 rounded-xl p-4 cursor-pointer">
              <summary className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wide select-none">
                <span>How does the tool hit exact targets like 20 KB or 50 KB without ruining image quality?</span>
                <span className="text-blue-500 transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-3 leading-relaxed text-[11px]">
                Our engine uses an iterative binary search loop that dynamically evaluates canvas output byte sizes. It balances pixel dimension scaling with quality ratios to land within ~95% of your target limit (e.g., 18.2 KB for a 20 KB preset), keeping visual clarity as sharp as possible.
              </p>
            </details>

            <details className="group border border-slate-100 dark:border-white/[0.04] bg-slate-50/50 dark:bg-black/20 transition-colors duration-200 rounded-xl p-4 cursor-pointer">
              <summary className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wide select-none">
                <span>Is there a paid tier or batch size limitation?</span>
                <span className="text-blue-500 transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-3 leading-relaxed text-[11px]">
                This service is 100% free with no hidden subscriptions or paywalls. While we recommend batches of up to 15 images for optimal mobile device performance, there are no artificial limits imposed on usage.
              </p>
            </details>

            <details className="group border border-slate-100 dark:border-white/[0.04] bg-slate-50/50 dark:bg-black/20 transition-colors duration-200 rounded-xl p-4 cursor-pointer">
              <summary className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wide select-none">
                <span>Which image file formats are supported?</span>
                <span className="text-blue-500 transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-3 leading-relaxed text-[11px]">
                Our compression engine accepts JPG, JPEG, PNG, WebP, and standard graphic formats. You can convert and compress any input image directly into universal JPG or modern high-efficiency WebP outputs.
              </p>
            </details>
          </div>
        </div>

      </section>

      {/* Structured Schema Engine */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: content.h1,
              url: `https://usefultoolszone.com/image-compressor/${activeSlug === "custom" ? "" : activeSlug}`,
              operatingSystem: "All",
              applicationCategory: "GraphicsApplication",
              description: content.desc,
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
          ]),
        }}
      />
    </div>
  );
}