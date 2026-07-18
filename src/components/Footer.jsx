'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#060609] px-4 mt-auto">
      <div className="max-w-5xl mx-auto py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <div>
          <span className="font-black text-slate-900 dark:text-white">Useful Tools Zone</span>
          <p className="text-[11px] text-slate-400 mt-0.5">© 2026 Operational Sandbox Hub.</p>
        </div>
        
        {/* ✅ सभी 05 पेज जो अब हर रूट पर कंसिस्टेंट रहेंगे */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 font-bold uppercase tracking-wider text-[10px] text-slate-500 dark:text-gray-400">
          <Link href="/about" className="hover:text-blue-500 transition-colors">About Us</Link>
          <Link href="/privacy-policy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-blue-500 transition-colors">Terms & Conditions</Link>
          <Link href="/disclaimer" className="hover:text-blue-500 transition-colors">Disclaimer</Link>
          <Link href="/contact" className="hover:text-blue-500 transition-colors">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}