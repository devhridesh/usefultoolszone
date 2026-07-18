'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AdBanner({ dataAdSlot, dataAdFormat = 'auto', fullWidthResponsive = true }) {
  const pathname = usePathname();
  const adRef = useRef(null); // 🎯 सीधे <ins> टैग को ट्रैक करने के लिए रेफ

  useEffect(() => {
    if (typeof window === 'undefined' || !window.adsbygoogle) return;

    // 500ms का सेफ़ बफ़र ताकि रिस्पॉन्सिव लेआउट्स पूरी तरह पेंट हो जाएँ
    const timer = setTimeout(() => {
      try {
        const adElement = adRef.current;
        if (!adElement) return;

        // 🛡️ 1. विज़िबिलिटी चेक: क्या यह CSS में hidden या display:none है?
        const computedStyle = window.getComputedStyle(adElement);
        const isHidden = computedStyle.display === 'none' || adElement.offsetWidth === 0;
        
        // 🛡️ 2. डुप्लिकेशन चेक: क्या Next.js Hydration की वजह से यह स्लॉट पहले ही प्रोसेस हो चुका है?
        const isAlreadyProcessed = adElement.hasAttribute('data-adsbygoogle-status');

        // 🔥 ट्रिगर केवल तब होगा जब स्लॉट पूरी तरह विज़िबल हो और पहले से प्रोसेस न हुआ हो
        if (!isHidden && !isAlreadyProcessed) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        // अगर डेवलपमेंट मोड में कोई छोटा-मोटा ग्लिच आए भी, तो यह एरर ऐप को क्रैश नहीं होने देगा
        console.warn('AdSense shield safely caught a sizing mismatch:', err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, dataAdSlot]);

  return (
    <div className="w-full text-center my-4 overflow-hidden min-h-[90px]">
      <ins
        ref={adRef} // ✨ रेफ को सीधे पैरेंट से हटाकर यहाँ ins टैग पर लॉक कर दिया
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // 👈 यहाँ अपना असली पब्लिशर आईडी चेक कर लेना भाई
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}