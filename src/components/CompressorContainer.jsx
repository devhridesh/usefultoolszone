'use client';

import { useState, useRef } from 'react';
import useVideoCompressor from '../hooks/useVideoCompressor';

export default function CompressorContainer({ initialSize }) {
  // Use custom video compressor hook capabilities
  const { 
    compressVideo, 
    isCompressing, 
    progress, 
    statusText, 
    compressedBlob 
  } = useVideoCompressor();

  // Component states for file handling and target configuration
  const [targetSize, setTargetSize] = useState(initialSize || "10"); 
  const [originalSize, setOriginalSize] = useState(0); 
  const fileInputRef = useRef(null);

  /**
   * Handles the selection of a video file from input and runs validations
   */
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. File size upper limit check (1024MB limit for browser environment stability)
    const MAX_SIZE_MB = 1024;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`File size too large! Please select a file under ${MAX_SIZE_MB}MB.`);
      return;
    }

    // 🎯 2. PRE-COMPRESSION SAFETY NET: Demanded target size validation
    // Target size ko MB se Bytes me mathematically convert karke check kar rahe hain
    const demandedSizeInBytes = parseFloat(targetSize) * 1024 * 1024;
    if (file.size <= demandedSizeInBytes) {
      alert("Invalid Operation: Please upload a video larger than the demanded size.");
      return; // Process ko yahi rok dega taaki time waste na ho
    }

    // Save original file state size to compare after processing completes
    setOriginalSize(file.size);

    // Run the core WASM client-side video compression process smoothly
    await compressVideo(file, parseFloat(targetSize));
  };

  /**
   * Validates output results and handles download generation steps
   */
  const downloadFile = () => {
    if (!compressedBlob) return;

    // 🛑 3. POST-COMPRESSION SAFETY NET
    // Check if compression resulted in a bloated file (WhatsApp video boundary cases)
    if (compressedBlob.size >= originalSize) {
      alert("This video is already highly optimized. Further compression is not possible without bloating the file size.");
      return; // Download triggers ko block kar dega
    }

    // Create unique client URL space for local media transfer
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${Date.now()}.mp4`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl shadow-lg text-white border border-gray-700">
      
      {/* 📊 CORE HEADING LAYER: Live percentage glows right beside heading title */}
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
        Video Compressor {isCompressing && (
          <span className="text-white ml-2 text-xl font-extrabold animate-pulse">
            ({progress}%)
          </span>
        )}
      </h2>

      {/* 🎛️ INPUT STAGE CONTAINER (Visible only before compression starts) */}
      {!isCompressing && !compressedBlob && (
        <div className="space-y-6 w-full">
          
          {/* Preset Rules Configuration Horizontal Dashboard Grid */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center bg-gray-800/60 p-4 rounded-xl border border-gray-700">
            
            {/* Manual target size value configuration interface */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-300">
                Target Size:
              </label>
              <input 
                type="number" 
                value={targetSize}
                onChange={(e) => setTargetSize(e.target.value)}
                className="w-20 px-3 py-1.5 bg-gray-950 border border-gray-600 rounded-lg text-center font-bold text-white focus:outline-none focus:border-blue-500 text-sm"
                min="1"
                max="500"
              />
              <span className="text-sm font-bold text-gray-400">MB</span>
            </div>

            {/* Smart Presets Shortcut dropdown mechanism */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-300">
                Presets:
              </label>
              <select 
                onChange={(e) => {
                  if (e.target.value) setTargetSize(e.target.value);
                }}
                className="px-3 py-1.5 bg-gray-950 border border-gray-600 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="">Select a Preset</option>
                <option value="15">WhatsApp Status (15 MB)</option>
                <option value="24">Gmail Attachment (24 MB)</option>
              </select>
            </div>
          </div>

          {/* 💡 Client Side Core Advantages Checklist Layout Block */}
          <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 text-left space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              🚀 Why Choose Our Tool?
            </h4>
            <ul className="text-xs text-gray-400 space-y-1.5 list-disc list-inside">
              <li>
                <strong className="text-gray-300">100% Safe & Private:</strong> Your video is never uploaded to the internet. Everything stays safe inside your own phone or computer.
              </li>
              <li>
                <strong className="text-gray-300">Best Quality Always:</strong> Our smart system makes the file size small but keeps the video clear, clean, and beautiful.
              </li>
              <li>
                <strong className="text-gray-300">Super Fast & Offline:</strong> The compression happens right inside this browser window without saving your data anywhere.
              </li>
            </ul>
          </div>

          {/* Interactive Dashed Dropzone and selection area layout box */}
          <div className="text-center p-10 border-2 border-dashed border-slate-700 bg-black/20 rounded-xl transition-all duration-300 hover:border-blue-500 hover:bg-blue-900/20 hover:shadow-[inset_0_2px_10px_rgba(59,130,246,0.1)] cursor-pointer">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              className="hidden" 
              accept="video/*" 
            />
            <button 
              type="button"
              onClick={() => fileInputRef.current.click()} 
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Select Video to Start
            </button>
            <p className="mt-4 text-gray-400 text-sm">
              MP4, WebM, MOV, .MKV supported (Up to 1 GB)
            </p>
          </div>
        </div>
      )}

      {/* ⏳ PROGRESS DISPLAY BAR CONTROLLER (Active during processing pipeline) */}
      {isCompressing && (
        <div className="w-full space-y-4">
          
          {/* ✅ LIVE DYNAMIC BADGE AREA: Tracking real configuration limits */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Target Configuration: <span className="font-bold text-white">{targetSize} MB</span>
            </span>
          </div>

          {/* Status feedback messaging dashboard track */}
          <div className="text-center mb-3">
            <span className="text-gray-300 text-sm font-medium leading-relaxed">
              {statusText}
            </span>
          </div>
          
          {/* Visual core progress progress track container */}
          <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* 🏆 COMPRESSION OUTPUT COMPLETE RESULT ACTIONS LAYER */}
      {compressedBlob && !isCompressing && (
        <div className="text-center p-6">
          <h3 className="text-xl font-semibold mb-4 text-green-400">
            Compression Complete!
          </h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              type="button"
              onClick={downloadFile} 
              className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-bold text-lg transition-all"
            >
              Download Compressed Video
            </button>
            <button 
              type="button"
              onClick={() => window.location.reload()} 
              className="text-gray-400 hover:text-white underline text-sm transition-all"
            >
              Compress Another
            </button>
          </div>
        </div>
      )}

    </div>
  );
}