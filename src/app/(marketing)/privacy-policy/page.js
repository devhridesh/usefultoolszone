'use client';

import React, { useEffect } from 'react';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = "Privacy Policy - ClipShrink Utility Hub";
  }, []);

  // Foolproof Page Redirect Handler
  const handleBack = () => {
    window.location.href = '/compress';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:from-[#0a0a0a] dark:to-[#111111] dark:bg-black text-slate-800 dark:text-gray-200 p-6 md:p-12 transition-colors duration-300 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white dark:bg-[#111111] p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200 dark:border-white/5 space-y-6">
        
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mt-1">Last Updated: July 2026</p>
        </div>

        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-500">1. Our 100% Local Video Processing Promise</h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            At ClipShrink, we care deeply about your privacy. Unlike other online websites, <strong>we never upload your videos to any server or the internet</strong>. The entire video compression process happens completely inside your own web browser. Your data never leaves your device.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-500">2. What Data We Collect</h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Because everything works locally on your device, we do not collect, view, or store your video files. We have zero access to your personal files.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-500">3. Google AdSense Ads and Cookies</h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            We use Google AdSense to show clean advertisements on our website to support our free utility tool. Google uses cookies to serve ads to users based on their visit to our site.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-500">4. Contact Our Support</h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            If you have any questions about this super safe Privacy Policy, please feel free to reach out to us via our official contact form.
          </p>
        </section>

        {/* ✅ FOOLPROOF BACK BUTTON: अब यह तुरंत और हर हाल में काम करेगा */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800 text-center">
          <button 
            onClick={handleBack} 
            className="text-sm font-bold text-blue-500 hover:underline bg-transparent border-none cursor-pointer"
          >
            ← Back to Video Compressor
          </button>
        </div>

      </div>
    </div>
  );
}