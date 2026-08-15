'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function AdBanner({
  dataAdSlot,
  dataAdFormat = 'auto',
  fullWidthResponsive = true,
}) {
  const pathname = usePathname();
  const adRef = useRef(null);
  const [isOnline, setIsOnline] = useState(true);

  // 🔴 ADSENSE LIVE SWITCH:
  // Jab tak real AdSense approve na ho, ise false hi rakhein.
  // false hone par koi broken iframe ya sad smiley 100% render NAHI hoga.
  const IS_ADSENSE_LIVE = false; 
  const PUBLISHER_ID = 'ca-pub-XXXXXXXXXXXXXXXX';

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

  useEffect(() => {
    // Agar ads live nahi hain, dummy ID hai, ya offline hai toh AdSense script bilkul mat chalao
    if (!IS_ADSENSE_LIVE || PUBLISHER_ID.includes('XXXX') || typeof window === 'undefined' || !isOnline) {
      return;
    }

    const timer = setTimeout(() => {
      try {
        if (!window.adsbygoogle) return;
        const adElement = adRef.current;
        if (!adElement) return;

        const isHidden = window.getComputedStyle(adElement).display === 'none' || adElement.offsetWidth === 0;
        const isAlreadyProcessed = adElement.hasAttribute('data-adsbygoogle-status');

        if (!isHidden && !isAlreadyProcessed) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.warn('AdSense shield:', err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, dataAdSlot, isOnline, IS_ADSENSE_LIVE]);

  // 🛡️ AGAR ADS LIVE NAHI HAIN: Clean Native Placeholder Box (No Broken Iframes)
  if (!IS_ADSENSE_LIVE || PUBLISHER_ID.includes('XXXX')) {
    return (
      <div className="w-full h-full min-h-[350px] flex flex-col items-center justify-center p-4 rounded-xl select-none">
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-white/5 border border-blue-500/20 dark:border-white/10 flex items-center justify-center text-xs mb-2">
          ⚡
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Sponsor Zone
        </span>
        <span className="text-[9px] text-slate-400/60 dark:text-slate-600 mt-1">
          Reserved Space
        </span>
      </div>
    );
  }

  // 🚀 JAB ADSENSE LIVE HO JAYE TAB YEH CHALEGA
  return (
    <div className="w-full text-center overflow-hidden flex items-center justify-center">
      {isOnline ? (
        <ins
          ref={adRef}
          className="adsbygoogle w-full block"
          style={{ display: 'block' }}
          data-ad-client={PUBLISHER_ID}
          data-ad-slot={dataAdSlot}
          data-ad-format={dataAdFormat}
          data-full-width-responsive={fullWidthResponsive.toString()}
        />
      ) : (
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400 select-none">
          ⚡ Offline Mode Active
        </div>
      )}
    </div>
  );
}