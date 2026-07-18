'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 🚀 1. सही राउटर हुक इम्पॉर्ट किया

export default function Disclaimer() {
  const router = useRouter(); // 🚀 2. हुक को इनिशियलाइज किया

  useEffect(() => {
    document.title = "Disclaimer - Useful Tools Zone";
  }, []);

  // 🚀 3. पुराने window.location.href को बदलकर सेफ बैक नेविगेशन लॉजिक लगाया
  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back(); // थिक पिछले पेज पर वापस जाने के लिए जहाँ से यूजर आया था
    } else {
      router.push('/'); // सेफ बैकअप: सीधे मास्टर होमपेज पर भेजने के लिए
    }
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

        {/* 🆕 अपग्रेडेड सेक्शन: अब यह सिर्फ कंप्रेसर नहीं बल्कि स्प्लिटर और बाकी टूल्स को भी कवर करता है */}
        <h3 className="text-md font-bold text-slate-950 dark:text-white">1. As-Is Service Provision</h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          The compression tools, video splitters, and other frontend web utilities on this platform are provided on an "as-is" and "as-available" basis without any warranties of any kind. While our serverless software operates at high premium metrics, we do not guarantee that the tools will be 100% error-free or that processing outputs (like exact split counts or compression ratios) will always meet specific personal requirements for every unique media file.
        </p>

        <h3 className="text-md font-bold text-slate-950 dark:text-white">2. No Liability for Local File Handling</h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Because Useful Tools Zone processes all videos and media locally within your browser sandbox, we have zero access to your data. Consequently, we are not responsible or liable for any accidental corruption of original files, browser crashes during heavy client-side rendering, or unexpected device shutdowns caused by intensive hardware encoding or multi-part splitting tasks. Users are highly advised to maintain backups of their original media.
        </p>

        <h3 className="text-md font-bold text-slate-950 dark:text-white">3. Advertising Content</h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          This website displays advertisements from third-party networks like Google AdSense to sustain its free operations. Useful Tools Zone does not explicitly endorse or guarantee the products, claims, or services offered in these automated advertisement blocks.
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