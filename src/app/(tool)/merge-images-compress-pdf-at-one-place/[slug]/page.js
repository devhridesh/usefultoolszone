import PdfContent from "../PdfContent";

function parseSlugData(slug) {
  if (!slug) return { title: 'Image to PDF Converter', sizeVal: '100', unit: 'KB', portal: 'Global' };
  const lower = slug.toLowerCase();
  
  if (lower.includes('whatsapp')) {
    return { title: 'WhatsApp Document Framework', sizeVal: '10', unit: 'MB', portal: 'WhatsApp Pipelines' };
  }
  
  const indianMatrix = {
    'ssc-photo': { title: 'SSC Registration Application Photo Form', sizeVal: '50', unit: 'KB', portal: 'Staff Selection Commission Portal' },
    'upsc-sign': { title: 'UPSC Government Verification Signature', sizeVal: '20', unit: 'KB', portal: 'Union Public Service Commission Interface' },
    'sarkari-doc-100kb': { title: 'Sarkari Form Document Upload Ledger', sizeVal: '100', unit: 'KB', portal: 'Central & State Recruitment Systems' },
    'pan-card-200kb': { title: 'National Identity PAN Card Verification Certificate', sizeVal: '200', unit: 'KB', portal: 'NSDL Income Tax Gateways' }
  };
  if (indianMatrix[lower]) return indianMatrix[lower];
  
  const sizeMatch = lower.match(/(\d+)\s*(kb|mb)/);
  if (sizeMatch) {
    const val = sizeMatch[1];
    const unit = sizeMatch[2].toUpperCase();
    return { title: `Compressed PDF to ${val} ${unit} Target Tier`, sizeVal: val, unit: unit, portal: 'Universal Validation Systems' };
  }
  return { title: `${slug.toUpperCase().replace('-', ' ')} Context Mode`, sizeVal: '100', unit: 'KB', portal: 'Universal Web Layouts' };
}

export default async function Page({ params }) {
  const p = await params;
  return <PdfContent forcedSlug={p?.slug} />;
}
export async function generateMetadata({ params }) {
  const p = await params;
  const slug = p?.slug || '';
  const seo = parseSlugData(slug);
  const targetUrl = `https://usefultoolszone.com/merge-images-compress-pdf-at-one-place/${slug}`;

  return {
    title: `⚡ Convert Image to ${seo.title} | Useful Tools Zone`,
    description: `✨ Merge Images & Compress PDF at One Place Locally tailored specifically for ${seo.portal} criteria. Hard-compile visual profiles into a strict ${seo.sizeVal} ${seo.unit} allocation footprint under a 100% private sandbox.`,
    alternates: { /* ... */ },
    openGraph: {
      title: `⚡ Convert Image to ${seo.title} - Free Offline`,
      description: `✨ Need to submit documents to ${seo.portal}? Merge Images & Compress PDF at One Place Locally under the official size threshold instantly.`,
      url: targetUrl,
      type: "website"
    }
  };
}