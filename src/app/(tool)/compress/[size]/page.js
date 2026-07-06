import CompressorPageContent from "@/components/CompressorPageContent";

export async function generateMetadata({ params }) {
  const p = await params;
  const size = p?.size || '';

  let targetSize = size.replace(/[^0-9]/g, '');
  if (size === 'whatsapp') targetSize = "16";
  if (size === 'gmail') targetSize = "25";

  return {
    title: `Compress Video to ${targetSize}MB Online | Fast & Private | Useful Tools Zone`,
    description: `Need to compress your video to ${targetSize}MB? Shrink your MP4, WebM, or MOV files to exactly ${targetSize}MB instantly in your browser. 100% private, no server uploads.`,
    alternates: {
      canonical: `https://usefultoolszone.com/compress`,
    },
  };
}

// FIX: यहाँ 'export default' का इस्तेमाल किया है
export default async function Page({ params }) {
  const p = await params;
  const size = p?.size;

  if (!size) {
    return <div>Page not found</div>;
  }

  let targetSize = size.replace(/[^0-9]/g, '');
  if (size === 'whatsapp') targetSize = "16";
  if (size === 'gmail') targetSize = "25";

  return <CompressorPageContent initialSize={targetSize} />;
}