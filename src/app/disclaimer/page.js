'use client';

import React, { useEffect } from 'react';

export default function Disclaimer() {
  useEffect(() => {
    document.title = "Disclaimer - Useful Tools Zone";
  }, []);

  const handleBack = () => {
    window.location.href = '/compress';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08080c] text-slate-800 dark:text-gray-300 p-4 md:p-12 transition-colors duration-300 flex items-center justify-center pt-20">
      <div className="max-w-3xl w-full bg-white dark:bg-[#11111a] p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200/60 dark:border-white/[0.04] space-y-6">
        
        <div className="border-b border-gray-100 dark:border-gray-800/60 pb-4 text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-950 dark:text-white">Disclaimer</h1>
          <p className="text-xs text-blue-500 font-bold uppercase mt-1">Legal and Liability Notices</p>
        </div>

        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 italic">
          Please read this disclaimer carefully before using any service provided by Useful Tools Zone.
        </p>

        <h3 className="text-md font-bold text-slate-950 dark:text-white">1. As-Is Service Provision</h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          The compression tools and web utilities on this platform are provided on an "as-is" and "as-available" basis without any warranties of any kind. While our software works at premium operational metrics, we do not guarantee that the tool will be 100% error-free or that compression ratios will meet specific personal expectations for every individual media file.
        </p>

        <h3 className="text-md font-bold text-slate-950 dark:text-white">2. No Liability for File Handling</h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Because Useful Tools Zone processes all videos locally within your browser sandbox, we do not have access to your data. We are not responsible or liable for any accidental loss of original files, browser crashes during processing, or unexpected device shutdowns caused by intensive hardware encoding tasks. Users are highly recommended to keep backups of their original media.
        </p>

        <h3 className="text-md font-bold text-slate-950 dark:text-white">3. Advertising Content</h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          This website displays advertisements from third-party networks like Google AdSense. Useful Tools Zone does not explicitly endorse or guarantee the products, claims, or services offered in these automated advertisement blocks.
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