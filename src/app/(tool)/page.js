import React from 'react';
import Link from 'next/link'; // 🚀 नो-फ्लिकर और सुपरफास्ट राउटिंग के लिए
import GlassCard from "@/components/ui/GlassCard";
import AdBanner from "@/components/ui/AdBanner"; // 🟢 टॉप और साइड विज्ञापनों के लिए इम्पोर्ट किया

// 🌐 PREMIUM ROOT SEO METADATA (Google Bot Friendly Architecture)
export const metadata = {
  title: "Useful Tools Zone | 100% Private Next-Gen Serverless Utilities",
  description: "Access professional-grade media optimization tools executing 100% client-side. Compress and split videos locally inside your browser sandbox with absolute privacy.",
  keywords: [
    "free web utilities",
    "local video compressor",
    "smart video splitter online",
    "private browser sandbox tools",
    "zero upload media encoder"
  ],
  alternates: {
    canonical: "https://usefultoolszone.com",
  },
};


export default function MasterHomepage() {
  // आपके सभी टूल्स की डायनेमिक लिस्ट
  const tools = [
    {
      title: "Compress Videos Locally",
      description: "Reduce video size instantly with zero quality loss. Works 100% offline inside your browser sandbox for absolute privacy.",
      link: "/compressor",
      badge: "100% Private",
      badgeColor: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
      btnText: "Launch Compressor",
      icon: "📉"
    },
    {
      title: "Smart Video Splitter",
      description: "Split long videos into perfect parts for WhatsApp Status & Reels without breaking your voice flow or losing content continuity.",
      link: "/video-splitter",
      badge: "Zero Voice Cuts",
      badgeColor: "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400",
      btnText: "Launch Splitter",
      icon: "✂️"
    }
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-slate-50 dark:bg-[#060609] pt-24 pb-12">
      
   
      {/* 🏢 2. ENTERPRISE 3-COLUMN RESPONSIVE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl mx-auto items-start px-4 flex-1">
        
        {/* 🗺️ LEFT SIDE PC AD: डेस्कटॉप पर खाली जगह घेरता है, मोबाइल पर खुद हाइड हो जाता है */}
        <div className="hidden lg:flex lg:col-span-2 min-h-[600px] sticky top-24 bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl flex-col items-center justify-center text-center p-2 shadow-sm">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">[ PC SIDEBAR AD 1 <br /> Skyscraper ]</span>
          <div className="mt-4 w-full">
            <AdBanner dataAdSlot="HOMEPAGE_SIDE_LEFT" dataAdFormat="vertical" />
          </div>
        </div>

        {/* 🎯 CENTER MAIN CONTENT MODULE */}
        <main className="col-span-1 lg:col-span-8 w-full flex flex-col items-center justify-start">
          
          {/* हेडर सेक्शन */}
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Useful Tools Zone <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
                Next-Gen Serverless Utilities
              </span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Professional grade media optimization tools that execute 100% client-side. 
              <span className="block mt-1 font-bold text-slate-800 dark:text-slate-200">
                Your data never leaves your device. No uploads, no limits.
              </span>
            </p>
          </div>

          {/* टूल्स लिस्टिंग ग्रिड */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-stretch mb-16">
            {tools.map((tool, index) => (
              <div key={index} className="relative group transition-all duration-500 hover:-translate-y-1 rounded-3xl flex">
                {/* होवर करने पर आने वाला ग्लो इफ़ेक्ट */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur opacity-0 group-hover:opacity-15 transition duration-500"></div>
                
                {/* GlassCard का रियूज़ */}
                <GlassCard className="relative w-full p-6 z-10 ring-1 ring-slate-200/50 dark:ring-white/5 shadow-md flex flex-col justify-between bg-white/60 dark:bg-black/40">
                  <div className="space-y-4">
                    {/* आइकॉन और बैज */}
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{tool.icon}</span>
                      <span className={`px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full border border-slate-100 dark:border-white/5 ${tool.badgeColor}`}>
                        {tool.badge}
                      </span>
                    </div>

                    {/* टाइटल और डिस्क्रिप्शन */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  {/* एक्शन बटन */}
                  <div className="pt-6">
                    <Link href={tool.link} className="block w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-center font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.98]">
                      {tool.btnText}
                    </Link>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
          
{/* 📱 ONLY MOBILE AD ZONE - FIXED */}
<div className="block lg:hidden w-full max-w-md mx-auto mb-10 px-4 animate-fadeIn">
  <div className="w-full min-h-[120px] bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center text-slate-400 text-[10px] font-bold p-4 text-center shadow-sm select-none">
    <span className="uppercase tracking-widest text-indigo-500/80 font-bold mb-1">
      [ Sponsored Mobile Content Zone ]
    </span>
    <p className="text-[11px] text-gray-400 dark:text-gray-500 max-w-xs leading-relaxed font-medium mt-1">
      Mobile banner script optimized. Error iframe hidden safely in local dev.
    </p>
  </div>
</div>

          {/* 🚀 3. HIGH-AUTHORITY E-A-T pSEO & USER SUPPORT HUB (AdSense Booster Shield) */}
          <div className="w-full border-t border-slate-200/60 dark:border-white/5 pt-10 notranslate text-left space-y-8 max-w-3xl">
            
            <section className="space-y-3">
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Why Useful Tools Zone is Redefining Web Utilities
              </h2>
              <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">
                Most conventional web platforms require users to transmit confidential or large multimedia files directly to remote cloud servers, exposing private data to potential extraction and strict server side caps. Useful Tools Zone completely bypasses this security threat by introducing customized client-side sandbox architectures. By deploying pre-compiled WebAssembly binaries that compute directly inside your browser virtual memory RAM, your source files remain 100% untouched and secure.
              </p>
            </section>

            {/* विजुअल हाइलाइट्स ग्रिड */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-[#0c0c12] border border-slate-200/60 dark:border-white/5 rounded-xl shadow-sm">
                <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">🔒 100% Cryptographic Privacy</h4>
                <p className="text-[11px] text-slate-500 dark:text-gray-400 leading-relaxed">Every optimization tool runs locally within an isolated client stack. Zero tracking hooks, zero cloud processing endpoints, absolute integrity.</p>
              </div>
              <div className="p-4 bg-white dark:bg-[#0c0c12] border border-slate-200/60 dark:border-white/5 rounded-xl shadow-sm">
                <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">⚡ Ultra Bandwidth Allocation</h4>
                <p className="text-[11px] text-slate-500 dark:text-gray-400 leading-relaxed">Since files are parsed locally, you completely eliminate server waiting loops. No data caps, no registration walls, zero bandwidth friction.</p>
              </div>
            </div>

            {/* यूजर हेल्प और सामान्य प्रश्न */}
            <section className="bg-white dark:bg-[#0c0c12] border border-slate-200/60 dark:border-white/5 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mb-4">Frequently Asked Questions & Support Hub</h3>
              <div className="space-y-4 text-xs">
                <div className="border-b border-slate-100 dark:border-white/5 pb-3">
                  <h4 className="font-bold text-slate-800 dark:text-gray-200 mb-1">Q: How do these serverless utilities function completely offline?</h4>
                  <p className="text-slate-500 dark:text-gray-400 leading-relaxed">Our infrastructure utilizes advanced browser client-caching scripts. Once the initial lightweight binaries load into your environment, they communicate directly with your device CPU, removing external dependency completely.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-gray-200 mb-1">Q: Are there any hidden pricing models or premium tiers?</h4>
                  <p className="text-slate-500 dark:text-gray-400 leading-relaxed">No. Because Useful Tools Zone shifts the operational compute cost back onto the local device instead of running expensive centralized server arrays, we provide our platform entirely free supported strictly by clean, native ad structures.</p>
                </div>
              </div>
            </section>

            {/* 🛑 BOTTOM AD SPACE BLOCK */}
            <div className="w-full min-h-[90px] bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-xl flex flex-col items-center justify-center text-slate-400 text-[10px] font-bold p-2 text-center shadow-sm mt-6">
              <span className="uppercase tracking-widest text-slate-400 mb-1">[ Bottom Leaderboard Ad Space ]</span>
              <AdBanner dataAdSlot="HOMEPAGE_BOTTOM_LEADERBOARD" />
            </div>

          </div>
        </main>

        {/* 🗺️ RIGHT SIDE PC AD: डेस्कटॉप पर खाली जगह घेरता है, मोबाइल पर खुद हाइड हो जाता है */}
        <div className="hidden lg:flex lg:col-span-2 min-h-[600px] sticky top-24 bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl flex-col items-center justify-center text-center p-2 shadow-sm">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">[ PC SIDEBAR AD 2 <br /> Skyscraper ]</span>
          <div className="mt-4 w-full">
            <AdBanner dataAdSlot="HOMEPAGE_SIDE_RIGHT" dataAdFormat="vertical" />
          </div>
        </div>

      </div>
    </div>
  );
}