'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 🚀 1. सही राउटर हुक इम्पॉर्ट किया

export default function PrivacyPolicyPage() {
  const router = useRouter(); // 🚀 2. हुक को इनिशियलाइज किया

  useEffect(() => {
    document.title = "Privacy Policy - Useful Tools Zone";
  }, []);

  // 🚀 3. पुराने window.location.href को बदलकर सेफ बैक नेविगेशन लॉजिक लगाया
  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back(); // ठीक पिछले पेज पर वापस जाने के लिए जहाँ से यूजर आया था
    } else {
      router.push('/'); // सेफ बैकअप: सीधे मास्टर होमपेज पर भेजने के लिए
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:from-[#0a0a0a] dark:to-[#111111] dark:bg-black text-slate-800 dark:text-gray-200 p-6 md:p-12 transition-colors duration-300 flex items-center justify-center pt-20">
      <div className="max-w-3xl w-full bg-white dark:bg-[#111111] p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200 dark:border-white/5 space-y-6">
        
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mt-1">Last Updated: July 2026</p>
        </div>

        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-500">1. Our 100% Local Data & Media Processing Promise</h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            At <strong>Useful Tools Zone</strong>, we care deeply about your privacy. Unlike traditional web platforms, <strong>we never upload your files, documents, images, or videos to any server or across the internet</strong>. The entire computing, optimization, and processing workflow happens 100% locally inside your own web browser sandbox. Your data never leaves your device context.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-500">2. What Data We Collect</h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Because all structural utilities operate natively on your device, we do not collect, view, log, or store your personal files or media assets. We have zero access to your information, ensuring an absolute database-free environment.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-500">3. Google AdSense Ads and Cookies</h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            We use Google AdSense to show clean advertisements on our website to support our free web utility ecosystem. Google uses cookies to serve ads to users based on their interactions and visits to our site.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-500">4. Contact Our Support</h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            If you have any questions or require clarifications about this super safe, serverless Privacy Policy, please feel free to reach out to us via our official contact form.
          </p>
        </section>

        {/* ✅ FOOLPROOF BACK BUTTON: अब यह तुरंत और हर हाल में काम करेगा */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800 text-center">
          <button 
            type="button"
            onClick={handleBack} 
            className="text-sm font-bold text-blue-500 hover:underline bg-transparent border-none cursor-pointer"
          >
            ← Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}