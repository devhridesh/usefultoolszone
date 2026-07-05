import CompressorPageContent from "@/components/CompressorPageContent";

export default async function SizePage({ params }) {
  const { size } = await params;
  const targetSize = size.replace(/[^0-9]/g, '');

  return <CompressorPageContent initialSize={targetSize} />;
}