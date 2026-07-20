'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 🚀 1. सही राउटर हुक इम्पॉर्ट किया

export default function AboutUs() {
  const router = useRouter(); // 🚀 2. हुक को इनिशियलाइज किया (इससे एडिटर में कलर डिम नहीं होगा)

  useEffect(() => {
    document.title = "About Us - Useful Tools Zone"; // ✅ नए ब्रांड नाम के अनुसार टाइटल अपडेट किया
  }, []);

  // 🚀 3. पुराने window.location.href को बदलकर सेफ बैक नेвиगेशन लॉजिक लगाया
  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back(); // ठीक पिछले पेज पर वापस जाने के लिए जहाँ से यूजर आया था
    } else {
      router.push('/'); // सेफ बैकअप: सीधे मास्टर होमपेज पर भेजने के लिए
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08080c] text-slate-800 dark:text-gray-300 p-4 md:p-12 transition-colors duration-300 flex items-center justify-center pt-20">
      <div className="max-w-3xl w-full bg-white dark:bg-[#11111a] p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200/60 dark:border-white/[0.04] space-y-6">
        
        <div className="border-b border-gray-100 dark:border-gray-800/60 pb-4 text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-950 dark:text-white">About Us</h1>
          <p className="text-xs text-blue-500 font-bold uppercase mt-1">The Story Behind Next-Gen Serverless Utilities</p>
        </div>

        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Welcome to <strong>Useful Tools Zone</strong>, a premier destination for next-generation web utilities. We are a small team of passionate developers who believe that the internet should be fast, free, and above all, **private**.
        </p>

        <h3 className="text-md font-bold text-slate-950 dark:text-white">Why did we build this?</h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Most traditional online utility suites force users to upload their private documents, personal media, and sensitive records to remote cloud servers. This workflow is slow, consumes internet bandwidth, and introduces data leakage risks. We built this platform to eliminate that compromise by providing a **100% local processing engine** that runs entirely inside your secure browser virtual sandbox.
        </p>

        <h3 className="text-md font-bold text-slate-950 dark:text-white">Our Core Infrastructure Philosophy</h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Useful Tools Zone operates as a highly optimized **Multi-Tool Utility Hub**. Whether you are adjusting matrix layouts, optimizing high-density documentation files, managing asset bundles, or processing high-fidelity media frameworks—everything happens strictly client-side. Built entirely around a zero-data-collection philosophy, our system guarantees that your digital footprints never leave your local device context.
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