'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // हाइड्रेशन एरर रोकने के लिए (जब तक क्लाइंट लोड न हो, कुछ रेंडर न करें)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-9 h-9"></div>;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-black/10 text-xl transition-all hover:scale-105 active:scale-95"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}