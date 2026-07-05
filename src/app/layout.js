import { ThemeProvider } from '../components/ThemeProvider';
import './globals.css'; // पक्का करें कि आपकी CSS फाइल इंपोर्टेड है

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}