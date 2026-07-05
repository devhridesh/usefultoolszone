import CompressorContainer from "@/components/CompressorContainer";

// 🤖 Google के लिए डायनामिक SEO (SEO Powerhouse)
export async function generateMetadata({ params }) {
  const size = params.size; // URL से मिला '15mb' या '20mb'
  return {
    title: `Compress Video to ${size} - Fast, Private & Free | Useful Tools Zone`,
    description: `Need to compress video to ${size}? Use our private, browser-based tool to reduce your video size to ${size} instantly without uploading.`,
    keywords: [
      `compress video to ${size}`,
      `reduce video to ${size}`,
      `video size reducer ${size}`,
      "online video compressor"
    ],
    alternates: {
      canonical: `https://usefultoolszone.com/compress/${size}`,
    }
  };
}

// 🛠️ पेज का लॉजिक
export default function SizePage({ params }) {
  // '15mb' string से '15' नंबर निकाल रहे हैं
  const targetSize = params.size.replace(/[^0-9]/g, '');

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Compress Video to {params.size}
        </h1>
        {/* टूल में साइज पास कर रहे हैं ताकि वो ऑटो-सेट हो जाए */}
        <CompressorContainer initialSize={targetSize} />
      </div>
    </main>
  );
}