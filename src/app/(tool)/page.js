import React from 'react';
import Link from 'next/link'; // 🚀 नो-फ्लिकर और सुपरफास्ट राउटिंग के लिए
import GlassCard from "@/components/ui/GlassCard";
import AdBanner from "@/components/ui/AdBanner"; // 🟢 टॉप और साइड विज्ञापनों के लिए इम्पोर्ट किया

// 🌐 PREMIUM ROOT SEO METADATA (Google Bot Friendly Architecture)
export const metadata = {
  title: "Useful Tools Zone | 100% Private Next-Gen Serverless Utilities",
  description: "Free 100% private client-side web utilities. Compress & split videos, merge & compress PDFs, optimize images, and access next-gen serverless tools directly inside your browser sandbox with zero uploads.",
  keywords: [
    "useful tools zone",
    "private local browser tools",
    "pdf merge and compress local",
    "video compressor offline",
    "smart video splitter online",
    "image converter resizer",
    "zero upload media encoder",
    "serverless privacy utility hub"
  ],
  metadataBase: new URL("https://usefultoolszone.com"),
  alternates: {
    canonical: "https://usefultoolszone.com",
  },
  openGraph: {
    title: "Useful Tools Zone | 100% Private Serverless Utility Hub",
    description: "Free 100% private client-side web utilities. Compress & split videos, merge & compress PDFs, optimize images, and access next-gen serverless tools directly inside your browser sandbox with zero uploads.",
    url: "https://usefultoolszone.com",
    siteName: "Useful Tools Zone",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Useful Tools Zone | 100% Private Serverless Utility Hub",
    description: "Free 100% private client-side web utilities. Compress & split videos, merge & compress PDFs, optimize images, and access next-gen tools natively.",
  },
};
export default async function MasterHomepage({ searchParams }) {
  // Parsing structural incoming URL parameters safely for crawlable tab filters
  const params = await searchParams;
  const activeTab = params?.tab || "all";

  // Dynamic UI Header content dictionary based on selected tab state (Added Image Hub Support)
  const headerContent = {
    all: {
      sub: "Next-Gen Serverless Utilities at One Place Locally",
      desc: "Professional grade media optimization tools executing 100% client-side inside a secure isolated sandbox."
    },
    video: {
      sub: "Compress & Split Videos at One Place Locally",
      desc: "High-performance browser client encoders to optimize and slash video footprints with zero data leakage."
    },
    pdf: {
      sub: "Merge Images & Compress PDF at One Place Locally",
      desc: "Convert multiple document sheets and graphic logs into clean, highly compressed PDF files instantly."
    },
    image: {
      sub: "Optimize, Resize & Convert Images Locally",
      desc: "Natively transform graphic assets, scale layouts, and convert next-gen formats with zero privacy compromise."
    }
  };

  const currentHeader = headerContent[activeTab] || headerContent.all;

  // आपके सभी टूल्स की ऑल-राउंडर लिस्ट
  const tools = [
    {
      title: "Compress Videos Locally",
      description: "Compress video size instantly with zero quality loss. Works 100% offline inside your browser sandbox for absolute privacy.",
      link: "/compressor",
      badge: "100% Private",
      badgeColor: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
      btnText: "Launch Compressor",
      icon: "📉",
      category: "video"
    },
    {
      title: "Smart Video Splitter",
      description: "Split long videos into perfect parts for WhatsApp Status & Reels without breaking your voice flow or losing content continuity.",
      link: "/video-splitter",
      badge: "Zero Voice Cuts",
      badgeColor: "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400",
      btnText: "Launch Splitter",
      icon: "✂️",
      category: "video"
    },
    {
      title: "Merge Images & Compress PDF",
      description: "Convert and compress multiple graphic layouts into a highly optimized PDF document instantly at One Place Locally.",
      link: "/merge-images-compress-pdf-at-one-place", 
      badge: "Serverless Engine",
      badgeColor: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400",
      btnText: "Launch Converter",
      icon: "📄",
      category: "pdf"
    },
 
  ];

  const filteredTools = tools.filter(
    (tool) => activeTab === "all" || tool.category === activeTab
  );

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-slate-50/60 dark:bg-[#060609] pt-24 pb-12">
      
      {/* 🏢 ENTERPRISE 3-COLUMN RESPONSIVE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl mx-auto items-start px-4 flex-1">
        
        {/* 🗺️ LEFT SIDE PC AD */}
        <div className="hidden lg:flex lg:col-span-2 min-h-[600px] sticky top-24 bg-white dark:bg-[#0c0c12] border border-dashed border-slate-200 dark:border-white/5 rounded-2xl flex-col items-center justify-center text-center p-2 shadow-sm">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">[ PC SIDEBAR AD 1 <br /> Skyscraper ]</span>
          <div className="mt-4 w-full">
            <AdBanner dataAdSlot="HOMEPAGE_SIDE_LEFT" dataAdFormat="vertical" />
          </div>
        </div>
        {/* 🎯 CENTER MAIN CONTENT MODULE */}
        <main className="col-span-1 lg:col-span-8 w-full flex flex-col items-center justify-start space-y-8">
       {/* हेडर सेक्शन - Dynamic and Context Aware Heading */}
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-2 animate-fadeIn">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              Useful Tools Zone <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-extrabold text-2xl sm:text-3xl block mt-1.5">
                {currentHeader.sub}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto font-medium">
              {currentHeader.desc}
            </p>
            
            {/* 🌟 PREMIUM PILL HIGH-LIGHTING BADGES (Exact Clone of Tool Toggles) */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3 select-none">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/70 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/40 shadow-sm transition-all duration-200">
                <span>🔒</span> Your data never leaves your device
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/70 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800/40 shadow-sm transition-all duration-200">
                <span>🛡️</span> No uploads, no limits
              </span>
            </div>
          </div>

          {/* 🔘 TRUSTED TAB FILTER BAR */}
          <div className="w-full flex justify-start sm:justify-center items-center gap-2 border-b border-slate-200 dark:border-white/5 pb-2.5 overflow-x-auto no-scrollbar scroll-smooth">
            {[
              { id: "all", label: "All Tools" },
              { id: "video", label: "Video Utilities" },
              { id: "pdf", label: "PDF Utilities" }
            ].map((tab) => (
              <Link
                key={tab.id}
                href={`?tab=${tab.id}`}
                scroll={false}
                className={`px-5 py-2 text-[10px] sm:text-xs font-bold rounded-xl tracking-wider uppercase whitespace-nowrap transition-all duration-150 ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 dark:bg-[#0c0c12] dark:text-slate-400 dark:border-white/5"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          {/* टूल्स लिस्टिंग ग्रिड - Re-injecting Neon Glow and Logo Gradient Sync */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-stretch mb-16 pt-2">
            {filteredTools.map((tool, index) => (
              <div key={index} className="relative group transition-all duration-300 hover:-translate-y-1 rounded-3xl flex">
                
                {/* 🌟 NEON GLOW BACKDROP LAYER (Logo Color Matched) */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-15 group-hover:opacity-35 transition duration-300"></div>
                
                <GlassCard className="relative w-full p-5 z-10 border border-slate-200/60 dark:border-white/5 shadow-sm bg-white dark:bg-[#0c0c12] rounded-3xl flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-2xl">
                        {tool.icon}
                      </div>
                      <span className={`px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md ${tool.badgeColor}`}>
                        {tool.badge}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                        {tool.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5">
                    {/* Brand matching dynamic gradient button layout */}
                    <Link href={tool.link} className="block w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-center font-bold text-xs rounded-xl shadow-sm transition-all duration-150 active:scale-[0.98]">
                      {tool.btnText}
                    </Link>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
          
          {/* 📱 ONLY MOBILE AD ZONE */}
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

          {/* 🚀 HIGH-AUTHORITY E-A-T pSEO & USER SUPPORT HUB */}
          <div className="w-full border-t border-slate-200/60 dark:border-white/5 pt-10 notranslate text-left space-y-8 max-w-3xl">
            
            <section className="space-y-3">
              <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                Why Useful Tools Zone is Redefining Web Utilities
              </h2>
              <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">
                Most conventional web platforms require users to transmit confidential or large multimedia files directly to remote cloud servers, exposing private data to potential extraction and strict server side caps. Useful Tools Zone completely bypasses this security threat by introducing customized client-side sandbox architectures. By deploying pre-compiled WebAssembly binaries that compute directly inside your browser virtual memory RAM, your source files remain 100% untouched and secure.
              </p>
            </section>

            {/* विजुअल हाइलाइट्स ग्रिड */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-[#0c0c12] border border-slate-200/60 dark:border-white/5 rounded-xl shadow-sm">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wide mb-1">🔒 100% Cryptographic Privacy</h4>
                <p className="text-[11px] text-slate-500 dark:text-gray-400 leading-relaxed">Every optimization tool runs locally within an isolated client stack. Zero tracking hooks, zero cloud processing endpoints, absolute integrity.</p>
              </div>
              <div className="p-4 bg-white dark:bg-[#0c0c12] border border-slate-200/60 dark:border-white/5 rounded-xl shadow-sm">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wide mb-1">⚡ Ultra Bandwidth Allocation</h4>
                <p className="text-[11px] text-slate-500 dark:text-gray-400 leading-relaxed">Since files are parsed locally, you completely eliminate server waiting loops. No data caps, no registration walls, zero bandwidth friction.</p>
              </div>
            </div>

            {/* यूजर हेल्प और सामान्य प्रश्न */}
            <section className="bg-white dark:bg-[#0c0c12] border border-slate-200/60 dark:border-white/5 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-4">Frequently Asked Questions & Support Hub</h3>
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

        {/* 🗺️ RIGHT SIDE PC AD */}
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