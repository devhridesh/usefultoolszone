'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="light" // 🎯 यहाँ "system" हटाकर "light" कर दिया है
      enableSystem={false} // 🔒 यह फोन की थीम को वेबसाइट पर हावी होने से रोकेगा
    >
      {children}
    </NextThemesProvider>
  );
}