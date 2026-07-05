'use client';

import { useState } from 'react';
import ThemeSwitcher from './ui/ThemeSwitcher.jsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/compress" className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-2.5 py-1 rounded-lg text-sm font-bold shadow-sm">
                CS
              </span>
              Useful Tools Zone <span className="text-xs text-blue-500 font-semibold hidden sm:inline"></span>
            </a>
          </div>

          {/* DESKTOP VIEW: Links with upgraded Terms & Conditions */}
          <div className="hidden lg:flex items-center gap-5">
            <a href="/compress" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Home
            </a>
            <a href="/about" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              About Us
            </a>
            <a href="/privacy-policy" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            {/* ✅ Changed to Terms & Conditions */}
            <a href="/terms" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Terms & Conditions
            </a>
            <a href="/disclaimer" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Disclaimer
            </a>
            <a href="/contact" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Contact Us
            </a>
            
            {/* Divider Line */}
            <span className="h-4 w-[1px] bg-slate-200 dark:bg-white/10" />
            
            {/* Dark Mode Moon/Sun Switcher */}
            <ThemeSwitcher />
          </div>

          {/* MOBILE VIEW Toggle Button */}
          <div className="flex items-center lg:hidden gap-4">
            <ThemeSwitcher />
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER: Click karne par saare pages mobile screen par smoothly dikhenge */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0a0a0a] border-t border-slate-200 dark:border-white/5 animate-in slide-in-from-top duration-200">
          <div className="px-3 pt-2 pb-5 space-y-1 text-center">
            <a href="/compress" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-bold uppercase text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
              Home
            </a>
            <a href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-bold uppercase text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
              About Us
            </a>
            <a href="/privacy-policy" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-bold uppercase text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
              Privacy Policy
            </a>
            {/* ✅ Changed to Terms & Conditions */}
            <a href="/terms" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-bold uppercase text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
              Terms & Conditions
            </a>
            <a href="/disclaimer" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-bold uppercase text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
              Disclaimer
            </a>
            <a href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-bold uppercase text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}