export async function generateMetadata({ params }) {
  const p = await params;
  const slug = p?.slug || "";
  const formattedTitle = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  const targetUrl = `https://usefultoolszone.com/social-media-text-chunker/${slug}`;

  const metaDesc = `⚡ Split long text into attention-grabbing ${formattedTitle} posts! Inject high-CTR viral hook presets, create custom hooks & auto-bold key phrases instantly.`;

  return {
    title: `${formattedTitle} - Long Text Chunker | Useful Tools Zone`,
    description: metaDesc,
    alternates: {
      canonical: targetUrl,
    },
    openGraph: {
      title: `${formattedTitle} - Long Text Chunker | Useful Tools Zone`,
      description: metaDesc,
      url: targetUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${formattedTitle} - Long Text Chunker | Useful Tools Zone`,
      description: metaDesc,
    },
  };
}