'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 🚀 1. सही राउटर हुक इम्पॉर्ट किया

export default function TermsAndConditions() {
  const router = useRouter(); // 🚀 2. हुक को इनिशियलाइज किया

  useEffect(() => {
    document.title = "Terms & Conditions - Useful Tools Zone";
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
          <h1 className="text-3xl font-black text-slate-950 dark:text-white">Terms & Conditions</h1>
          <p className="text-xs text-blue-500 font-bold uppercase mt-1">Rules of Engagement and Usage</p>
        </div>

        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          By accessing and utilizing the Useful Tools Zone platform, you accept and agree to comply with the following operational terms and service regulations.
        </p>

        {/* 🆕 अपग्रेडेड सेक्शन: अब यह पूरे मल्टी-टूल इकोसिस्टम को कवर करता है */}
        <h3 className="text-md font-bold text-slate-950 dark:text-white">1. Permitted Use</h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          You are allowed to use the serverless web utilities provided on this platform—including the local video compressor, smart video splitters, and any future added tools—for both personal and legitimate business use. You agree not to attempt to breach our frontend shell, modify the core web assemblies, or inject malicious file scripts into our local browser memory pipeline.
        </p>

        <h3 className="text-md font-bold text-slate-950 dark:text-white">2. Intellectual Property</h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          The user interface layout, design aesthetics, branding assets, custom React wrappers, and codebase of Useful Tools Zone are the exclusive property of our brand. Copying or clones of this layout for commercial redistribution without consent is strictly prohibited.
        </p>

        <h3 className="text-md font-bold text-slate-950 dark:text-white">3. Service Modifications & Ad Support</h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          We reserve the right to upgrade, pause, or tweak any feature, tool parameters, or file constraints on this platform at any time without prior notice. Our services will remain free to the public as long as supported by automated ad banners.
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