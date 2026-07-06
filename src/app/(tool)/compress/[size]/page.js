import CompressorPageContent from "@/components/CompressorPageContent";

export async function generateMetadata({ params }) {
  const p = await params;
  const size = p?.size || '';
  
  // Logic: साइज नंबर निकालना या प्लेटफॉर्म के हिसाब से फिक्स करना
  let targetSize = size.replace(/[^0-9]/g, '');
  if (size === 'whatsapp') targetSize = "16";
  if (size === 'gmail') targetSize = "25";

  return {
    title: `Compress Video to ${targetSize}MB Online | Fast & Private | Useful Tools Zone`,
    description: `Need to compress your video to ${targetSize}MB? Shrink your MP4, WebM, or MOV files to exactly ${targetSize}MB instantly in your browser. 100% private, no server uploads.`,
    alternates: {
      canonical: `https://usefultoolszone.com/compress/${size}`,
    },
  };
}

export default async function Page({ params }) {
  const p = await params;
  const size = p?.size;

  if (!size) return <div>Page not found</div>;

  // Logic: targetSize और Platform label तैयार करना
  let targetSize = size.replace(/[^0-9]/g, '');
  let platformLabel = "Video"; 

  if (size === 'whatsapp') {
    targetSize = "16";
    platformLabel = "WhatsApp";
  } else if (size === 'gmail') {
    targetSize = "25";
    platformLabel = "Gmail";
  }

  // अब हम 'platform' prop भेज रहे हैं, जो H1 टैग को बदल देगा
  return <CompressorPageContent initialSize={targetSize} platform={platformLabel} />;
}