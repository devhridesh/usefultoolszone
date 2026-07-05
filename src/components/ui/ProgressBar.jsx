export default function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-slate-200 dark:bg-neutral-800 rounded-full h-2.5 overflow-hidden border border-slate-300/50 dark:border-white/5">
      <div 
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}