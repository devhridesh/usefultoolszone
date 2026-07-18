'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 🚀 सही राउटर हुक इम्पॉर्ट किया

export default function ContactUs() {
  const router = useRouter(); // 🚀 हुक को इनिशियलाइज किया

  // Page Title set karne ke liye
  useEffect(() => {
    document.title = "Contact Us - Useful Tools Zone"; // नए ब्रांड नाम के अनुसार टाइटल सेट किया
  }, []);

  // Form States[cite: 2]
  const [name, setName] = useState(''); //[cite: 2]
  const [email, setEmail] = useState(''); //[cite: 2]
  const [message, setMessage] = useState(''); //[cite: 2]
  const [botField, setBotField] = useState(''); // 🍯 Honeypot Field[cite: 2]
  const [formLoadTime, setFormLoadTime] = useState(0); // ⏱️ Time Tracking State[cite: 2]
  const [isSubmitted, setIsSubmitted] = useState(false); //[cite: 2]

  // Form load hote hi time note karein[cite: 2]
  useEffect(() => {
    setFormLoadTime(Date.now()); //[cite: 2]
  }, []); //[cite: 2]

  const handleSubmit = (e) => {
    e.preventDefault(); //[cite: 2]

    // ⏱️ Calculate Time Difference (Seconds mein)[cite: 2]
    const timeTaken = (Date.now() - formLoadTime) / 1000; //[cite: 2]

    // 🛑 CYBER SECURITY SHIELD:[cite: 2]
    // Check 1: Agar honeypot field bhari hai -> BOT![cite: 2]
    // Check 2: Agar form 4 second se pehle submit hua -> ADVANCED FAST BOT![cite: 2]
    if (botField !== '' || timeTaken < 4) { //[cite: 2]
      console.log('Advanced Bot Blocked Safely!'); //[cite: 2]
      setIsSubmitted(true); // Bot ko fake success screen dikhao taaki wo bar-bar attack na kare[cite: 2]
      return; //[cite: 2]
    } //[cite: 2]

    // ✅ Real Human Success State[cite: 2]
    setIsSubmitted(true); //[cite: 2]
  };

  // 🚀 पुराने window.location.href को बदलकर सेफ बैक नेविगेशन लॉजिक लगाया
  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back(); // ठीक पिछले पेज पर वापस जाने के लिए जहाँ से यूजर आया था
    } else {
      router.push('/'); // सेफ बैकअप: सीधे मास्टर होमपेज पर भेजने के लिए
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:from-[#0a0a0a] dark:to-[#111111] dark:bg-black text-slate-800 dark:text-gray-200 p-6 md:p-12 flex items-center justify-center transition-colors duration-300 pt-20">
      <div className="max-w-md w-full bg-white dark:bg-[#111111] p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-white/5 space-y-6">
                 
        {/* Header[cite: 2] */}
        <div className="text-center border-b border-gray-100 dark:border-gray-800 pb-4"> {/*[cite: 2] */}
          <div className="text-4xl mb-2">✉️</div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Contact Us</h1> {/*[cite: 2] */}
          <p className="text-xs text-gray-500 mt-1">Drop a message, we reply within 24 hours</p> {/*[cite: 2] */}
        </div>

        {isSubmitted ? (
          /* Success Screen[cite: 2] */
          <div className="text-center py-6 space-y-4 animate-in fade-in duration-300"> {/*[cite: 2] */}
            <div className="text-4xl text-green-500">✅</div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">Thank You!</h3> {/*[cite: 2] */}
            <p className="text-xs text-gray-500">Your message has been sent safely. Our team will look into it.</p> {/*[cite: 2] */}
            <button 
              onClick={handleBack}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              Go Back
            </button>
          </div>
        ) : (
          /* Real Form Layout[cite: 2] */
          <form onSubmit={handleSubmit} className="space-y-4"> {/*[cite: 2] */}
                         
            {/* 🍯 HONEYPOT HIDDEN INPUT: Humans can't see it, bots will fill it[cite: 2] */}
            <input 
              type="text"
              name="website_source_hp"
              value={botField} //[cite: 2]
              onChange={(e) => setBotField(e.target.value)} //[cite: 2]
              style={{ display: 'none' }} //[cite: 2]
              tabIndex="-1" //[cite: 2]
              autoComplete="off" //[cite: 2]
            />

            {/* Name Field[cite: 2] */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Your Name</label>
              <input 
                type="text" 
                required //[cite: 2]
                value={name} //[cite: 2]
                onChange={(e) => setName(e.target.value)} //[cite: 2]
                placeholder="John Doe" //[cite: 2]
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-black border border-slate-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white"
              />
            </div>

            {/* Email Field[cite: 2] */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
              <input 
                type="email" 
                required //[cite: 2]
                value={email} //[cite: 2]
                onChange={(e) => setEmail(e.target.value)} //[cite: 2]
                placeholder="yourname@gmail.com" //[cite: 2]
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-black border border-slate-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white"
              />
            </div>

            {/* Message Field[cite: 2] */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Your Message</label>
              <textarea 
                rows="4" //[cite: 2]
                required //[cite: 2]
                value={message} //[cite: 2]
                onChange={(e) => setMessage(e.target.value)} //[cite: 2]
                placeholder="How can we help you?" //[cite: 2]
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-black border border-slate-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white resize-none" //[cite: 2]
              ></textarea>
            </div>

            {/* Submit Button[cite: 2] */}
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-[0.98]"
            >
              Send Secure Message
            </button>
          </form>
        )}

        {/* Updated Back Link Text */}
        {!isSubmitted && ( //[cite: 2]
          <div className="pt-2 text-center border-t border-gray-100 dark:border-gray-800"> {/*[cite: 2] */}
            <button 
              onClick={handleBack} 
              className="text-xs font-bold text-blue-500 hover:underline bg-transparent border-none cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}