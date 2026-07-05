'use client';

import { useCallback } from 'react';

export default function DropZone({ onFileSelect }) {
  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const onFileChange = useCallback((e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  return (
    <div 
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="group relative flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-3xl p-10 bg-slate-50/50 dark:bg-black/20 transition-all duration-300 cursor-pointer"
    >
      <input 
        type="file" 
        accept="video/*" 
        onChange={onFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
      />
      
      {/* क्लाउड/वीडियो अपलोड आइकॉन */}
      <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300">
        📥
      </div>

      <h3 className="text-sm font-bold text-slate-800 dark:text-neutral-200 mb-1">
        Click to upload or drag and drop video file here
      </h3>
      <p className="text-xs text-slate-400 dark:text-neutral-500">
        MP4, WebM, MOV up to 500MB
      </p>

      <button className="mt-5 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
        Choose Video to Start
      </button>
    </div>
  );
}