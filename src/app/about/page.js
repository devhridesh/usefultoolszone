'use client';

import React, { useEffect } from 'react';

export default function AboutUs() {
  useEffect(() => {
    document.title = "About Us - ClipShrink Utility Hub";
  }, []);

  const handleBack = () => {
    window.location.href = '/compress';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08080c] text-slate-800 dark:text-gray-300 p-4 md:p-12 transition-colors duration-300 flex items-center justify-center pt-20">
      <div className="max-w-3xl w-full bg-white dark:bg-[#11111a] p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200/60 dark:border-white/[0.04] space-y-6">
        
        <div className="border-b border-gray-100 dark:border-gray-800/60 pb-4 text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-950 dark:text-white">About Us</h1>
          <p className="text-xs text-blue-500 font-bold uppercase mt-1">The Story Behind Serverless Tools</p>
        </div>

        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Welcome to <strong>Useful Tools Zone</strong>, a premier destination for next-generation web utilities. We are a small team of passionate developers who believe that the internet should be fast, free, and above all, **private**.
        </p>

        <h3 className="text-md font-bold text-slate-950 dark:text-white">Why did we build this?</h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Most online video compressors force users to upload their private, personal videos to a cloud server. This is slow, eats up internet data, and risks your private moments. We saw this problem and decided to change it by introducing a **100% local processing engine** that runs directly inside your web browser.
        </p>

        <h3 className="text-md font-bold text-slate-950 dark:text-white">Our Future Vision</h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          While we are starting with our breakthrough video compression tool, Useful Tools Zone is rapidly evolving into a comprehensive **Multi-Tool Utility Hub**. In the coming months, we will launch high-speed audio converters, secure PDF kits, and advanced image layout controllers—all built on our trusted serverless, zero-data-collection philosophy.
        </p>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-800/60 text-center">
          <button onClick={handleBack} className="text-sm font-bold text-blue-500 hover:underline bg-transparent border-none cursor-pointer">
            ← Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}