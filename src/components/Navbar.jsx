'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ThemeSwitcher from './ui/ThemeSwitcher.jsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false); // 🟢 अनकमेंट करके स्टेट एक्टिव की
  const dropdownRef = useRef(null); // 🟢 अनकमेंट करके रेफरेंस एक्टिव किया

  const videoTools = [
    { name: "Video Compressor", link: "/compressor", icon: "🎥", desc: "Reduce video size locally" }, // 🟢 राउट /compress से /compressor किया
    { name: "Smart Video Splitter", link: "/video-splitter", icon: "✂️", desc: "Split for WhatsApp & Reels" }
  ];

  const pdfTools = [
    { name: "PDF Utility Converter", link: "/pdf-utility", icon: "📄", desc: "Merge & compress images locally" }
  ];

  // 🟢 आउटसाइड क्लिक हैंडलर को पूरी तरह एक्टिव किया
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-slate-200/50 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* 🏢 LOGO ZONE */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2 cursor-pointer">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-2.5 py-1 rounded-lg text-sm font-bold shadow-sm">UTZ</span>
              Useful Tools Zone
            </Link>
          </div>

          {/* 🌐 NAV ITEMS */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            <Link href="/" className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
              Home
            </Link>

            {/* 🎯 'ALL TOOLS' DROPDOWN CONTROLLER */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300 hover:text-blue-500 transition-colors focus:outline-none"
              >
                All Tools
                <span className={`text-[9px] transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {isToolsOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#0d0d14] rounded-2xl shadow-xl ring-1 ring-slate-200/50 dark:ring-white/5 p-3 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-gray-500 px-2.5 pb-1 border-b border-slate-100 dark:border-white/5 mb-1">
                    Utilities Menu
                  </div>
                  {/* 🟢 toolsList की जगह दोनों टूल्स ऐरे को मिलाकर डायनेमिक मैप किया */}
                  {[...videoTools, ...pdfTools].map((tool, idx) => (
                    <Link
                      key={idx}
                      href={tool.link}
                      onClick={() => setIsToolsOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group"
                    >
                      <span className="text-lg">{tool.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{tool.name}</div>
                        <div className="text-[10px] text-slate-400 dark:text-gray-500 mt-0.5">{tool.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* DIVIDER */}
            <span className="h-4 w-[1px] bg-slate-200 dark:bg-white/10" />
            
            {/* 🌙 THEME SWITCHER WIDGET */}
            <ThemeSwitcher />

            {/* 📱 MOBILE HAMBURGER BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5 focus:outline-none"
            >
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 📱 MOBILE DRAWER MODULE */}
      {isOpen && (
        <div className="bg-white dark:bg-[#0a0a0a] border-t border-slate-200 dark:border-white/5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top duration-200">
          <div className="px-3 pt-2 pb-5 space-y-1 text-center">
            
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-xl text-sm font-bold uppercase text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
              Home
            </Link>

            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 pt-4 pb-1 border-b border-slate-100 dark:border-white/5 mx-4">
              Legal & Support Pages
            </div>
            
            <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-bold uppercase text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">About Us</Link>
            <Link href="/privacy-policy" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-bold uppercase text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">Privacy Policy</Link>
            <Link href="/terms" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-bold uppercase text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">Terms & Conditions</Link>
            <Link href="/disclaimer" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-bold uppercase text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">Disclaimer</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-bold uppercase text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
}