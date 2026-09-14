import { Suspense } from "react";
import SmartYoutubeCardContent from "./SmartYoutubeCardContent";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const vid = params?.v;

  if (!vid) {
    return {
      title: "Smart YouTube Card & Direct App Opener | Useful Tools Zone",
      description: "Generate full-title preview cards and open YouTube links directly in app.",
    };
  }

  try {
    const res = await fetch(
      `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${vid}`
    );
    const data = await res.json();
    const fullTitle = data.title || "Watch Video in YouTube App";

    return {
      title: fullTitle,
      description: `🔴 ${data.author_name || "YouTube"} • Tap to watch directly in YouTube App`,
      openGraph: {
        title: fullTitle,
        description: `▶ Tap to open full video directly inside YouTube native app`,
        images: [
          {
            url: `https://img.youtube.com/vi/${vid}/hqdefault.jpg`,
            width: 1200,
            height: 630,
            alt: fullTitle,
          },
        ],
      },
    };
  } catch (e) {
    return {
      title: "Watch in YouTube App",
    };
  }
}

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const vid = params?.v;

  return (
    <>
      {/* मिली-सेकंड इंस्टेंट रीडायरेक्ट: React लोड होने से पहले ही सीधे YouTube App खोलेगा */}
      {vid && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var v = "${vid}";
                var ua = navigator.userAgent || "";
                var isAndroid = /android/i.test(ua);
                var isIOS = /iPad|iPhone|iPod/.test(ua);
                
                if (isAndroid) {
                  window.location.replace("intent://www.youtube.com/watch?v=" + v + "#Intent;package=com.google.android.youtube;scheme=https;end");
                } else if (isIOS) {
                  window.location.replace("vnd.youtube://watch?v=" + v);
                  setTimeout(function() {
                    window.location.replace("https://www.youtube.com/watch?v=" + v);
                  }, 300);
                } else {
                  window.location.replace("https://www.youtube.com/watch?v=" + v);
                }
              })();
            `,
          }}
        />
      )}
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#060609] text-slate-400 text-xs font-bold animate-pulse">
            Opening YouTube App...
          </div>
        }
      >
        <SmartYoutubeCardContent />
      </Suspense>
    </>
  );
}