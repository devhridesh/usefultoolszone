'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function AdBanner({ dataAdSlot, dataAdFormat = 'auto', fullWidthResponsive = true }) {
  const pathname = usePathname();
  const adRef = useRef(null);
  const [isOnline, setIsOnline] = useState(true);

  // 1. Online / Offline Status Detector Hook
  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 2. AdSense Script Trigger Engine
  useEffect(() => {
    // Agar device offline hai ya SSR rendering hai, toh execution roko
    if (typeof window === 'undefined' || !isOnline) return;

    // 500ms safe buffer taaki responsive layouts properly render ho jayein
    const timer = setTimeout(() => {
      try {
        if (!window.adsbygoogle) return;

        const adElement = adRef.current;
        if (!adElement) return;

        // 🛡️ 1. Visibility Check: CSS display:none ya 0px width check
        const computedStyle = window.getComputedStyle(adElement);
        const isHidden = computedStyle.display === 'none' || adElement.offsetWidth === 0;

        // 🛡️ 2. Duplication Check: React re-renders/Hydration guard
        const isAlreadyProcessed = adElement.hasAttribute('data-adsbygoogle-status');

        if (!isHidden && !isAlreadyProcessed) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.warn('AdSense shield safely caught a sizing mismatch:', err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, dataAdSlot, isOnline]); // 👈 isOnline add hone se net aate hi ad auto-reload ho jayega

  return (
    <div className="w-full text-center my-4 overflow-hidden min-h-[90px]">
      {isOnline ? (
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Apna Publisher ID yahan verify karein
          data-ad-slot={dataAdSlot}
          data-ad-format={dataAdFormat}
          data-full-width-responsive={fullWidthResponsive.toString()}
        />
      ) : (
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400 select-none">
          ⚡ Offline Compression Active — Internet disconnect hone par live ads paused hain. Net connect hote hi Sync ho jayega.
        </div>
      )}
    </div>
  );
}