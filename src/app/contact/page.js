'use client';

import React, { useState, useEffect } from 'react';

export default function ContactUs() {
  // Page Title set karne ke liye
  useEffect(() => {
    document.title = "Contact Us - ClipShrink Utility Hub";
  }, []);

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [botField, setBotField] = useState(''); // 🍯 1. Honeypot Field
  const [formLoadTime, setFormLoadTime] = useState(0); // ⏱️ 2. Time Tracking State
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form load hote hi time note karein
  useEffect(() => {
    setFormLoadTime(Date.now());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ⏱️ Calculate Time Difference (Seconds mein)
    const timeTaken = (Date.now() - formLoadTime) / 1000;

    // 🛑 CYBER SECURITY SHIELD:
    // Check 1: Agar honeypot field bhari hai -> BOT!
    // Check 2: Agar form 4 second se pehle submit hua -> ADVANCED FAST BOT!
    if (botField !== '' || timeTaken < 4) {
      console.log('Advanced Bot Blocked Safely!');
      setIsSubmitted(true); // Bot ko fake success screen dikhao taaki wo bar-bar attack na kare
      return;
    }

    // ✅ Real Human Success State
    setIsSubmitted(true);
  };

  // Foolproof Page Redirect Handler
  const handleBack = () => {
    window.location.href = '/compress';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:from-[#0a0a0a] dark:to-[#111111] dark:bg-black text-slate-800 dark:text-gray-200 p-6 md:p-12 flex items-center justify-center transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-[#111111] p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-white/5 space-y-6">
        
        {/* Header */}
        <div className="text-center border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="text-4xl mb-2">✉️</div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Contact Us</h1>
          <p className="text-xs text-gray-500 mt-1">Drop a message, we reply within 24 hours</p>
        </div>

        {isSubmitted ? (
          /* Success Screen */
          <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
            <div className="text-4xl text-green-500">✅</div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">Thank You!</h3>
            <p className="text-xs text-gray-500">Your message has been sent safely. Our team will look into it.</p>
            <button 
              onClick={handleBack}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              Go Back to Dashboard
            </button>
          </div>
        ) : (
          /* Real Form Layout */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* 🍯 HONEYPOT HIDDEN INPUT: Humans can't see it, bots will fill it */}
            <input 
              type="text"
              name="website_source_hp"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              style={{ display: 'none' }}
              tabIndex="-1"
              autoComplete="off"
            />

            {/* Name Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Your Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-black border border-slate-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@gmail.com"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-black border border-slate-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Your Message</label>
              <textarea 
                rows="4"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-black border border-slate-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-[0.98]"
            >
              Send Secure Message
            </button>
          </form>
        )}

        {/* Foolproof Back Navigation Trigger */}
        {!isSubmitted && (
          <div className="pt-2 text-center border-t border-gray-100 dark:border-gray-800">
            <button 
              onClick={handleBack} 
              className="text-xs font-bold text-blue-500 hover:underline bg-transparent border-none cursor-pointer"
            >
              ← Back to Video Compressor
            </button>
          </div>
        )}

      </div>
    </div>
  );
}