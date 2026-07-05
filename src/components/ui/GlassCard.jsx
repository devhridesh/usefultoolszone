export default function GlassCard({ children, className = "" }) {
  return (
    // 'backdrop-blur-2xl' और 'border-white/10' ही इसे प्रीमियम लुक देते हैं
    <div className={`relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-white/60 dark:bg-black/40 border border-slate-200/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-6 md:p-8 transition-all duration-300 ${className}`}>
      
      {/* बैकग्राउंड में एक बहुत ही हल्का और प्रीमियम ग्लोइंग इफ़ेक्ट (Neon Gradient) */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* असली कंटेंट इसके अंदर रेंडर होगा */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}