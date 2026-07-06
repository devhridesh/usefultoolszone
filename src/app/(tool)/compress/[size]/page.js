import CompressorPageContent from "@/components/CompressorPageContent";

// SEO के लिए Metadata generate करें
export async function generateMetadata({ params }) {
  const { size } = await params;
  const targetSize = size.replace(/[^0-9]/g, ''); // 20mb -> 20

  return {
    title: `Compress Video to ${targetSize}MB Online | Fast & Private | Useful Tools Zone`,
    description: `Need to compress your video to ${targetSize}MB? Shrink your MP4, WebM, or MOV files to exactly ${targetSize}MB instantly in your browser. 100% private, no server uploads.`,
    alternates: {
      canonical: `https://usefultoolszone.com/compress`, // यहाँ अपनी main tool URL दें
    },
  };
}

export default async function SizePage({ params }) {
  const { size } = await params;
  const targetSize = size.replace(/[^0-9]/g, '');

  return <CompressorPageContent initialSize={targetSize} />;
}