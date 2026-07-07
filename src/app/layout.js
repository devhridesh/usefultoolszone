import { ThemeProvider } from '../components/ThemeProvider';
import './globals.css'; 
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {/* यह वही काम करेगा जो आपकी स्क्रिप्ट करती है */}
        <GoogleAnalytics gaId="G-G3YFNH41P3" /> 
      </body>
    </html>
  );
}