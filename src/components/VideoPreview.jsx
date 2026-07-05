'use client';

export default function VideoPreview({ original, compressed }) {
  if (!compressed) return null;

  const downloadUrl = URL.createObjectURL(compressed);
  const sizeMB = (compressed.size / (1024 * 1024)).toFixed(2);

  return (
    <div className="w-full p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200/50 dark:border-white/5 space-y-4 animate-in fade-in zoom-in duration-300">
      <div className="text-center space-y-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Compression Complete!</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Target achieved: {sizeMB} MB
        </p>
      </div>

      {/* वीडियो प्रीव्यू प्लेयर */}
      <video 
        src={downloadUrl} 
        controls 
        className="w-full rounded-xl border border-slate-200 dark:border-white/10"
      />

      {/* डाउनलोड बटन */}
      <a 
        href={downloadUrl} 
        download={`compressed_${original?.name || 'video.mp4'}`}
        className="block w-full py-3 bg-green-600 hover:bg-green-700 text-white text-center font-bold rounded-xl transition-all shadow-lg shadow-green-500/20 active:scale-[0.98]"
      >
        Download Compressed Video
      </a>
      
      <button 
        onClick={() => window.location.reload()}
        className="block w-full py-2 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs underline transition-all"
      >
        Compress Another Video
      </button>
    </div>
  );
}