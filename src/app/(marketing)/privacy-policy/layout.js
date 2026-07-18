// src/app/(marketing)/layout.js
import React from 'react';
import Navbar from "@/components/Navbar";

export default function MarketingLayout({ children }) {
  return (
    <>
      {/* 🚀 यह लाइन आपके पांचों पेजों पर हैमबर्गर और 'All Tools' ड्रॉपडाउन इनेबल कर देगी */}
      <Navbar />
      
      {/* इसके अंदर आपके about, contact, terms आदि के पेज रेंडर होंगे */}
      {children}
    </>
  );
}