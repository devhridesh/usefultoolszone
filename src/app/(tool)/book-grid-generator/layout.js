export const metadata = {
  title: "Visual Book Grid & 3x3 Tier List Generator | Useful Tools Zone",
  description:
    "Create aesthetic 3x3 book grid tier lists, scan ISBN barcodes, extract book covers automatically, customize selfie shapes (Star, Circle, Square), and export high-res PNG cards locally with zero server uploads.",
  keywords: [
    "book grid generator",
    "3x3 book tier list",
    "bookstagram collage maker",
    "isbn book cover extractor",
    "visual reading goal tracker",
  ],
  alternates: {
    canonical: "https://usefultoolszone.com/book-grid-generator",
  },
  openGraph: {
    title: "Visual Book Grid & Tier List Generator | Useful Tools Zone",
    description:
      "Generate Instagram-ready 3x3 book grids with custom cover themes, selfie branding shapes, and instant local exports.",
    url: "https://usefultoolszone.com/book-grid-generator",
    siteName: "Useful Tools Zone",
    type: "website",
  },
};

export default function BookGridGeneratorLayout({ children }) {
  return <>{children}</>;
}