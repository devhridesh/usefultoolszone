'use client';

import { useState, useRef, useEffect } from 'react'; 
import useVideoCompressor from '../hooks/useVideoCompressor';
import NoSleep from 'nosleep.js'; // 🎯 अल्टीमेट वेक लॉक ब्रह्मास्त्र

export default function CompressorContainer({ initialSize }) {
  const { 
    compressVideo, 
    isCompressing, 
    progress, 
    statusText, 
    compressedBlob 
  } = useVideoCompressor();

  const [targetSize, setTargetSize] = useState(initialSize || "10"); 
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  
  // 🎯 NoSleep रेफरेंस
  const noSleepRef = useRef(null);

  // 1. NoSleep को इनिशियलाइज़ करें
  useEffect(() => {
    noSleepRef.current = new NoSleep();
    return () => {
      if (noSleepRef.current) noSleepRef.current.disable();
    };
  }, []);

  // 2. जब कम्प्रेशन पूरा हो जाए, तो लॉक हटा दें
  useEffect(() => {
    if (!isCompressing && noSleepRef.current) {
      noSleepRef.current.disable();
      console.log("NoSleep Lock Disabled 🔓");
    }
  }, [isCompressing]);

  // 3. ऑटो-स्क्रॉलिंग इंजन (आपके स्क्रीनशॉट के परफेक्ट व्यू के लिए)
  useEffect(() => {
    if (isCompressing && containerRef.current) {
      const headerOffset = 80; 
      const elementPosition = containerRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [isCompressing]);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const MAX_SIZE_MB = 1024;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`File size too large! Please select a file under ${MAX_SIZE_MB}MB.`);
      if (noSleepRef.current) noSleepRef.current.disable(); // एरर पर लॉक हटाएं
      return;
    }

    await compressVideo(file, parseFloat(targetSize));
  };

  // ✅ यह रहा आपका गायब हुआ डाउनलोड फंक्शन!
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
    <div 
      ref={containerRef}
      className="w-full max-w-2xl mx-auto p-5 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md dark:shadow-lg text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 flex flex-col justify-between transition-all duration-300 min-h-[420px]"
    >
      
      {/* 📊 Title Container */}
      <h2 className="text-xl sm:text-2xl font-bold mb-5 text-center text-blue-600 dark:text-blue-400">
        Video Compressor {isCompressing && <span className="text-gray-700 dark:text-white ml-2 text-lg sm:text-xl font-extrabold animate-pulse">({progress}%)</span>}
      </h2>

      {/* 🎛️ Input Mode Layout */}
      {!isCompressing && !compressedBlob && (
        <div className="space-y-5 w-full flex-1 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center bg-gray-50 dark:bg-gray-800/60 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Target Size:</label>
              <input 
                type="number" 
                value={targetSize}
                onChange={(e) => setTargetSize(e.target.value)}
                className="w-20 px-3 py-1.5 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-600 rounded-lg text-center font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm"
                min="1"
                max="500"
              />
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">MB</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Presets:</label>
              <select 
                onChange={(e) => {
                  if (e.target.value) setTargetSize(e.target.value);
                }}
                className="px-3 py-1.5 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Select a Preset</option>
                <option value="15">WhatsApp Status/Message (15 MB)</option>
                <option value="24">Gmail Attachment (24 MB)</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 text-left space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              🚀 Why Choose Our Tool?
            </h4>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1.5 list-none">
              <li>🔒 <strong>100% Safe & Private:</strong> Your video is processed purely on-device via local WebAssembly infrastructure.</li>
              <li>⚡ <strong>Pure Fast & Offline:</strong> Runs completely isolated within your browser memory sandbox.</li>
            </ul>
          </div>

          {/* 🔥 100% Guaranteed Wake Lock Injection */}
          <div 
            className="text-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-black/20 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer flex flex-col justify-center items-center min-h-[120px]" 
            onClick={() => {
              
              // 🚀 गैलरी खुलने से ठीक पहले लॉक एक्टिवेट करें!
              if (noSleepRef.current) {
                noSleepRef.current.enable();
                console.log("NoSleep Video Trick Started! 📱");
              }

              // 🛡️ सेफ्टी नेट: अगर यूज़र गैलरी खोलकर बिना फाइल चुने 'Cancel' कर दे
              const handleFocus = () => {
                window.removeEventListener('focus', handleFocus);
                setTimeout(() => {
                  if (!fileInputRef.current?.files?.length && !isCompressing) {
                    if (noSleepRef.current) noSleepRef.current.disable();
                  }
                }, 1000);
              };
              window.addEventListener('focus', handleFocus);

              fileInputRef.current.click();
            }}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="video/*" />
            <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-sm shadow-blue-500/20">
              Select Video to Start
            </button>
            <p className="mt-3 text-gray-400 text-xs">MP4, WebM, MOV, MKV supported (Up to 1 GB)</p>
          </div>
        </div>
      )}

      {/* ⏳ ACTIVE COMPRESSION LAYER */}
      {isCompressing && (
        <div className="w-full flex-1 flex flex-col justify-between space-y-5 animate-fadeIn min-h-[340px]">
          
          <div className="space-y-3.5 w-full">
            <div className="flex justify-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 shadow-sm">
                Target Configuration: <span className="font-bold text-gray-900 dark:text-white ml-1">{targetSize} MB</span>
              </span>
            </div>

            <div className="text-center min-h-[40px] flex items-center justify-center px-2">
              <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-medium leading-relaxed animate-pulse">
                {statusText}
              </p>
            </div>
            
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-3.5 rounded-full overflow-hidden p-0.5 border border-gray-200 dark:border-gray-700 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.4)]" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* 📱 HIGH-REVENUE DYNAMIC AD BANNER ZONE */}
          <div className="w-full flex-1 min-h-[220px] sm:min-h-[260px] p-4 bg-gray-50 dark:bg-gray-950/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center space-y-2 transition-all duration-500 animate-slideUp">
            <span className="text-[10px] font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase bg-blue-500/10 px-2 py-0.5 rounded shadow-sm animate-bounce">
              🎯 SPONSORED ADVERTISEMENT AREA 🎯
            </span>
            <p className="text-[11px] text-gray-400 max-w-xs leading-relaxed">
              Please wait while our local secure framework processes frames. Place your AdSense/Adsterra layout responsive code here to unlock extreme vertical CTR rates.
            </p>
          </div>
        </div>
      )}

      {/* 🏆 Result Output Mode */}
      {compressedBlob && !isCompressing && (
        <div className="text-center py-6 space-y-5 flex-1 flex flex-col justify-center items-center">
          <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center text-green-500 text-xl shadow-md animate-bounce">✓</div>
          <h3 className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400">Compression Complete!</h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full max-w-sm mx-auto">
            <button type="button" onClick={downloadFile} className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all active:scale-95 shadow-md shadow-green-500/10">
              Download Compressed Video
            </button>
            <button type="button" onClick={() => window.location.reload()} className="text-gray-400 hover:text-gray-600 dark:hover:text-white underline text-xs py-1 transition-all">
              Compress Another
            </button>
          </div>
        </div>
      )}

    </div>
  );
}