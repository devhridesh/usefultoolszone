"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function GlobalTranslationBar() {
  const [currentLang, setCurrentLang] = useState("en");
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Initialize Google Global Translate Function
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element"
        );
      }
    };

    // 2. Safe Dynamic Script Injection Guard
    if (!document.getElementById("google-translate-script")) {
      const addScript = document.createElement("script");
      addScript.id = "google-translate-script";
      addScript.setAttribute(
        "src",
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);
    }

    // 3. Sync Language via URL search params seamlessly
    const urlLang = searchParams.get("lang")?.toLowerCase() || "en";
    setCurrentLang(urlLang);

    // 4. Core Polling Engine: Protects from alphabetical Abkhaz default on fresh load
    const checkAndTranslate = setInterval(() => {
      const googleSelect = document.querySelector(".goog-te-combo");
      if (googleSelect) {
        const optionExists = googleSelect.querySelector(`option[value="${urlLang}"]`);
        if (optionExists) {
          if (googleSelect.value !== urlLang) {
            googleSelect.value = urlLang;
            googleSelect.dispatchEvent(new Event("change"));
          }
          clearInterval(checkAndTranslate);
        }
      }
    }, 100);

    return () => clearInterval(checkAndTranslate);
  }, [searchParams]);

  // ⚡ ZERO-RELOAD DYNAMIC SPA DISPATCHER ENGINE WITH ANTI-ABKHAZ RETRY BUFFER
  const handleLanguageChange = (langCode) => {
    setCurrentLang(langCode);

    // Update URL query parameters silently without forcing full page reload
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("lang", langCode);
    window.history.pushState({}, "", nextUrl.toString());

    // Manage client localization cookie architecture securely
    const hostname = window.location.hostname;
    if (langCode === "en") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname}`;
    } else {
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=${hostname}`;
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
    }

    // 🔄 Smart Safe Dispatcher: Loops safely until Google injects the correct options
    let attempts = 0;
    const triggerTranslation = () => {
      const googleSelect = document.querySelector(".goog-te-combo");
      if (googleSelect) {
        // चेक करें कि क्या वाकई टारगेट लैंग्वेज का ऑप्शन आ चुका है
        const optionExists = googleSelect.querySelector(`option[value="${langCode}"]`);
        
        if (optionExists) {
          googleSelect.value = langCode;
          googleSelect.dispatchEvent(new Event("change"));
        } else if (attempts < 20) {
          // अगर अभी तक ऑप्शन रेंडर नहीं हुआ, तो डिफ़ॉल्ट पर भागने के बजाय 50ms बाद दोबारा चेक करे
          attempts++;
          setTimeout(triggerTranslation, 50);
        }
      } else if (attempts < 20) {
        attempts++;
        setTimeout(triggerTranslation, 50);
      }
    };

    triggerTranslation();
  };

  return (
    <>
      {/* 🌐 GLOBAL HIGH-STABILITY FIXED LANGUAGE SELECTION RIBBON */}
      <div className="w-full text-center py-2.5 bg-white dark:bg-[#0c0c12] border-b border-slate-200/60 dark:border-white/5 text-xs font-semibold text-slate-500 dark:text-gray-400 shadow-sm sticky top-16 z-40">
        <span className="notranslate text-gray-400 dark:text-gray-500 mr-2">
          🌐 Country Languages:
        </span>
        <button
          onClick={() => handleLanguageChange("en")}
          className={`mx-1.5 underline transition-all cursor-pointer ${currentLang === "en" ? "text-blue-600 dark:text-blue-400 font-extrabold" : "hover:text-blue-500"}`}
        >
          English
        </button>{" "}
        |
        <button
          onClick={() => handleLanguageChange("es")}
          className={`mx-1.5 underline transition-all cursor-pointer ${currentLang === "es" ? "text-blue-600 dark:text-blue-400 font-extrabold" : "hover:text-blue-500"}`}
        >
          Español
        </button>{" "}
        |
        <button
          onClick={() => handleLanguageChange("pt")}
          className={`mx-1.5 underline transition-all cursor-pointer ${currentLang === "pt" ? "text-blue-600 dark:text-blue-400 font-extrabold" : "hover:text-blue-500"}`}
        >
          Português
        </button>{" "}
        |
        <button
          onClick={() => handleLanguageChange("hi")}
          className={`mx-1.5 underline transition-all cursor-pointer ${currentLang === "hi" ? "text-blue-600 dark:text-blue-400 font-extrabold" : "hover:text-blue-500"}`}
        >
          हिन्दी
        </button>
      </div>

      {/* 🎯 Safe Anchor Node (Hidden off-screen) */}
      <div
        id="google_translate_element"
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          opacity: 0,
        }}
      ></div>
    </>
  );
}