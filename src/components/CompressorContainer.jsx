'use client';

import { useState, useRef } from 'react';
import useVideoCompressor from '../hooks/useVideoCompressor';

export default function CompressorContainer({ initialSize }) {
const { compressVideo, isCompressing, progress, statusText, compressedBlob } = useVideoCompressor();
const [targetSize, setTargetSize] = useState(initialSize || "10"); // Live size record karne ke liye
  const fileInputRef = useRef(null);

const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. File size limit (500MB limit for browser safety)
    const MAX_SIZE_MB = 1024;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`File size too large! Please select a file under ${MAX_SIZE_MB}MB.`);
      return;
    }

    // ✅ FIX: यहाँ पुराना 'const targetSize = ...' वाला कोड पूरी तरह हटा दिया गया है
    // अब यह सीधे स्क्रीन पर दिख रहे लाइव 'targetSize' (15 MB) को इंजन में भेजेगा
    await compressVideo(file, parseFloat(targetSize));
  };

  const downloadFile = () => {
    if (!compressedBlob) return;
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${Date.now()}.mp4`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl shadow-lg text-white border border-gray-700">
      
      {/* UPDATE 1: प्रतिशत अब सीधे "Video Compressor" हेडिंग के बगल में ब्रैकेट में चमकेगा */}
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
        Video Compressor {isCompressing && <span className="text-white ml-2 text-xl font-extrabold animate-pulse">({progress}%)</span>}
      </h2>
{/* Input Area */}
      {!isCompressing && !compressedBlob && (
        <div className="space-y-6 w-full">
          {/* Pi7 Style Manual Input & Presets Dropdown Layout */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center bg-gray-800/60 p-4 rounded-xl border border-gray-700">
            
            {/* Manual Size Input */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-300">Target Size:</label>
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

            {/* Smart Presets Selector */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-300">Presets:</label>
              <select 
                onChange={(e) => {
                  if (e.target.value) setTargetSize(e.target.value);
                }}
                className="px-3 py-1.5 bg-gray-950 border border-gray-600 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Select a Preset</option>
                <option value="15">WhatsApp Status (15 MB)</option>
                <option value="24">Gmail Attachment (24 MB)</option>
              </select>
            </div>
          </div>

          {/* 💡 Core App Advantages: Super Simple English for All Users */}
          <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 text-left space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              🚀 Why Choose Our Tool?
            </h4>
            <ul className="text-xs text-gray-400 space-y-1.5 list-disc list-inside">
              <li><strong className="text-gray-300">100% Safe & Private:</strong> Your video is never uploaded to the internet. Everything stays safe inside your own phone or computer.</li>
              <li><strong className="text-gray-300">Best Quality Always:</strong> Our smart system makes the file size small but keeps the video clear, clean, and beautiful.</li>
              <li><strong className="text-gray-300">Super Fast & Offline:</strong> The compression happens right inside this browser window without saving your data anywhere.</li>
            </ul>
          </div>

          {/* Browse & Click Box */}
<div className="text-center p-10 border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-black/20 rounded-xl transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-[inset_0_2px_10px_rgba(59,130,246,0.1)] cursor-pointer">            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              className="hidden" 
              accept="video/*" 
            />
            <button 
              onClick={() => fileInputRef.current.click()} 
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
            >
              Select Video to Start
            </button>
            <p className="mt-4 text-gray-400 text-sm">MP4, WebM, MOV .MKV supported (Up to 1 GB)</p>
          </div>
        </div>
      )}

    {/* Progress Area */}
      {isCompressing && (
        <div className="w-full space-y-4">
          
          {/* ✅ LIVE DYNAMIC BADGE: यह कम्प्रेशन के दौरान यूजर का चुना हुआ सही साइज लाइव दिखाएगा */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Target Configuration: <span className="font-bold text-white">{targetSize} MB</span>
            </span>
          </div>

          {/* Status text perfectly centered without text corruption */}
          <div className="text-center mb-3">
            <span className="text-gray-300 text-sm font-medium leading-relaxed">{statusText}</span>
          </div>
          
          <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] active:scale-95" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Result Area */}
      {compressedBlob && !isCompressing && (
        <div className="text-center p-6">
          <h3 className="text-xl font-semibold mb-4 text-green-400">Compression Complete!</h3>
          <button 
            onClick={downloadFile} 
            className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-bold text-lg mr-4"
          >
            Download Compressed Video
          </button>
          <button 
            onClick={() => window.location.reload()} 
            className="text-gray-400 hover:text-white underline"
          >
            Compress Another
          </button>
        </div>
      )}
    </div>
  );
}