export const metadata = {
  title: "Smart YouTube Card & App Opener | 100% Free | Useful Tools Zone",
  description:
    "Generate full-title preview cards and direct YouTube app-opener links. Fixes truncated title issues and opens links directly inside the YouTube native app without in-app browser barriers.",
  keywords: [
    "youtube app opener",
    "open youtube link in app",
    "smart link generator youtube",
    "full title youtube preview card",
    "youtube direct link opener",
    "social media youtube preview card"
  ],
  alternates: {
    canonical: "https://usefultoolszone.com/smart-youtube-card-opener",
  },
  openGraph: {
    title: "Smart YouTube Card & App Opener | Useful Tools Zone",
    description:
      "Show 100% full titles without truncation and open videos directly inside the YouTube app.",
    url: "https://usefultoolszone.com/smart-youtube-card-opener",
    siteName: "Useful Tools Zone",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart YouTube Card & Direct App Opener",
    description:
      "Full title preview cards and direct app opening links for YouTube videos.",
  },
};

export default function SmartYoutubeCardLayout({ children }) {
  return <>{children}</>;
}