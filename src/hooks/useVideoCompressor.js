'use client';

import { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

// ग्लोबल वैरिएबल्स: ये पूरे सेशन में इंजन को सिर्फ एक बार डाउनलोड होने देंगे
// ग्लोबल वैरिएबल्स: ये पूरे सेशन में इंजन को सिर्फ एक बार डाउनलोड होने देंगे
let globalFFmpeg = null;
let globalFFmpegLoaded = false;
let globalFFmpegLoading = false; // डबल क्लिक लॉक रोकने के लिए कवच

export default function useVideoCompressor() {
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [compressedBlob, setCompressedBlob] = useState(null);
  const workerRef = useRef(null);

  useEffect(() => {
    // 1. Check browser codec support first
    const supportsWebCodecs = typeof VideoEncoder !== 'undefined' && typeof MediaStreamTrackProcessor !== 'undefined';
    
    if (supportsWebCodecs) {
      // 2. Cache-Busting URL: Forces Chrome to destroy old thread and load fresh worker instantly
      workerRef.current = new Worker('/ffmpeg-worker.js?t=' + Date.now(), { type: 'module' });
      
      workerRef.current.onmessage = (e) => {
        const { type, progress, blob, status, error } = e.data;
        if (type === 'PROGRESS') setProgress(progress);
        if (type === 'STATUS') setStatusText(status);
        if (type === 'COMPLETE') {
          setCompressedBlob(blob);
          setIsCompressing(false);
          setStatusText('Done!');
          setProgress(100);
        }
        if (type === 'ERROR') {
          console.error("Hardware Worker Error:", error);
          setStatusText("Hardware mode failed! Please try again.");
          setIsCompressing(false);
        }
      };
    }

    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, []);

  const getVideoMetadata = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve({ 
          durationSeconds: video.duration, 
          width: video.videoWidth, 
          height: video.videoHeight 
        });
      };
      video.src = URL.createObjectURL(file);
    });
  };

const compressVideo = async (file, requestedSizeMB) => {

    const targetSizeMB = Math.max(1, requestedSizeMB - 1); 

    setIsCompressing(true);
    setProgress(0);
    setCompressedBlob(null);

    // Screen active rakhne ke liye variable
    let wakeLock = null;

    try {
      // Mobile screen ko compression ke dauran chalu rakhne ke liye
      if ('wakeLock' in navigator) {
        wakeLock = await navigator.wakeLock.request('screen').catch(() => null);
      }

      const { durationSeconds, width, height } = await getVideoMetadata(file);
      const supportsWebCodecs = typeof VideoEncoder !== 'undefined' && typeof MediaStreamTrackProcessor !== 'undefined';
      // DYNAMIC ROUTING: Hardware GPU is blocked only for tight squeezes (< 22MB)
const forceSoftware = false;
const useHardwareMode = false; // Bypass broken hardware worker and force precision software engine
      
if (useHardwareMode) {
        // ========================================================
        // PLAN A: HARDWARE MODE (Automatically scales for 22MB, 25MB, 26MB, 30MB, etc.)
        // ========================================================
        setStatusText('Extracting frames (Hardware Mode)...');
        
        const video = document.createElement('video');
        video.src = URL.createObjectURL(file);
        video.muted = true;
        video.playsInline = true;

        video.onloadedmetadata = async () => {
          
           
          let dynamicMultiplier = 0.95;
          
          // Clamp it to prevent extreme values (stays between 0.90 and 1.15)
          dynamicMultiplier = Math.max(0.90, Math.min(dynamicMultiplier, 1.15));

          const targetBits = (targetSizeMB * dynamicMultiplier) * 1024 * 1024 * 8;
          const bitrateBps = Math.round(targetBits / durationSeconds);

          workerRef.current.postMessage({
            type: 'START',
            config: { width, height, bitrateBps }
          });
          
          const stream = video.captureStream ? video.captureStream() : video.mozCaptureStream();
          const videoTrack = stream.getVideoTracks()[0];
          const trackProcessor = new MediaStreamTrackProcessor({ track: videoTrack });
          const reader = trackProcessor.readable.getReader();

          video.play();
          let frameCount = 0;
          const expectedTotalFrames = durationSeconds * 30; 

          while (true) {
            const { done, value: frame } = await reader.read();
            if (done) break;

            frameCount++;
            const calculatedProgress = Math.min(Math.round((frameCount / expectedTotalFrames) * 95), 99);

            workerRef.current.postMessage({
              type: 'FRAME',
              frame,
              config: { progressHint: calculatedProgress }
            }, [frame]); 
          }

          workerRef.current.postMessage({ type: 'FINISH' });
        };
      } else {

       
  
     // ========================================================
        // PLAN B: CDN PRECISION ENGINE (Online High Stability Mode with Pro UX Messages)
        // ========================================================
        
        // 1. Single Global Instance (ताकि मल्टीपल क्लिक्स थ्रेड लॉक न करें)
        if (!globalFFmpeg) {
          globalFFmpeg = new FFmpeg();
        }
        const ffmpeg = globalFFmpeg;
        
        const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd'; 
        
        // 2. Load Core with dynamic retention messages (First Launch vs Instant Cached Launch)
        if (!globalFFmpegLoaded) {
          if (!globalFFmpegLoading) {
            globalFFmpegLoading = true;
            // Keval fresh/first-time user ko hi ye downloading message dikhega
            setStatusText("Downloading & Optimizing Precision Core Engine... (First launch takes a few seconds to configure setup, subsequent uses will be instant!) ⚙️");
            try {
              await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
              });
              globalFFmpegLoaded = true;
              
              // Success notice with sufficient reading time buffer (2.5 seconds hold)
              setStatusText("Core engine has been downloaded for next quick compression! 🚀");
              await new Promise(r => setTimeout(r, 2500));
            } catch (error) {
              console.error("FFmpeg Load Error:", error);
              setStatusText("Engine blocked! Check console.");
            } finally {
              globalFFmpegLoading = false;
            }
          }
        } else {
          // Returning users ko direct message bina script download wait ke
          setStatusText("Launching Cached Core Engine... Super Fast Mode Active! ⚡");
          await new Promise(r => setTimeout(r, 1200));
        }

        // Wait Lock: Agar engine backend me ready ho raha hai toh code ko safe hold rakhega
        while (globalFFmpegLoading) {
          await new Promise(r => setTimeout(r, 200));
        }

        // 3. Pro UX Progress Watcher (Clean isolated grammar style layout)
     // 3. Pro UX Progress Watcher (Pure Clean Sentences - No mixed numbers)
        ffmpeg.off('progress'); 
        ffmpeg.on('progress', ({ progress: p }) => {
          setTimeout(() => {
            const pct = Math.round(p * 100);
            setProgress(pct); // यह बैकएंड में प्रोग्रेस बार को चलाता रहेगा
            
            // अब टेक्स्ट बिल्कुल साफ रहेगा, कोई ग्रामर नहीं टूटेगी
            if (pct < 15) {
              setStatusText("Initializing frames... Video encoding is a heavy CPU process, hang tight! 🧠");
            } else if (pct >= 15 && pct < 45) {
              setStatusText("Compressing... Did you know? Compression runs 100% offline inside your browser sandbox. Your data is 100% private! 🔒");
            } else if (pct >= 45 && pct < 75) {
              setStatusText("Compressing... Crunching pixels & optimizing bitrates to maintain maximum video quality... 🎯");
            } else if (pct >= 75 && pct < 100) {
              setStatusText("Almost there! Wrapping up the final video container structures... 🎬");
            }
          }, 0);
        });

        await ffmpeg.writeFile('input.mp4', await fetchFile(file));
        // 2. TRUE DYNAMIC RESOLUTION SCALING (Bitrate & Duration Driven - No Hardcoded File Sizes!)
        let scaleArgs = [];
        const isVertical = height > width;
        const maxDimension = isVertical ? height : width;

        // Video Length (Duration) aur Target ke hisab se exact per-second Bitrate capability nikali
        const estimatedKbps = Math.round((requestedSizeMB * 0.92 * 8 * 1024) / durationSeconds);
        
        let targetMaxDimension = 1920; 
        let audioBitrate = '128k';

        if (estimatedKbps < 900) {
          targetMaxDimension = 854;   // Ultra low bitrate -> 480p (Quality aur size dono control me)
          audioBitrate = '48k';
        } else if (estimatedKbps < 2400) {
          targetMaxDimension = 1280;  // Medium bitrate -> 720p HD (WhatsApp/Email standard)
          audioBitrate = '64k';
        } else {
          targetMaxDimension = 1920;  // High bitrate -> 1080p Full HD (Khaayi hui line wapas aa gayi!)
          audioBitrate = '128k';
        }
        
        if (maxDimension > targetMaxDimension) {
          if (isVertical) {
            scaleArgs = ['-vf', `scale=-2:${targetMaxDimension}`]; 
          } else {
            scaleArgs = ['-vf', `scale=${targetMaxDimension}:-2`]; 
          }
        }

        // 3. FULLY PROPORTIONAL DYNAMIC FEEDBACK LOOP (Zero Hardcoded MB Margins!)
        const targetSizeMB = requestedSizeMB * 0.93; // Target humesha requested cap ka 93% rahega (Fully Proportional)
        let currentBitrateMultiplier = 1.0;
        let success = false;
        let finalData = null;

        for (let attempt = 1; attempt <= 2; attempt++) {
          setStatusText(`Compressing video: Cycle ${attempt}/2...`);
          
          try {
            await ffmpeg.deleteFile('output.mp4');
          } catch (e) {}
          
          const totalBits = (targetSizeMB * currentBitrateMultiplier) * 8;
          const bitrateKbps = Math.round((totalBits * 1024) / durationSeconds);
          const bitrateString = `${bitrateKbps}k`;

          await ffmpeg.exec([
            '-y', '-i', 'input.mp4',
            '-vcodec', 'libx264',
            '-preset', 'ultrafast',
            '-pix_fmt', 'yuv420p',
            '-movflags', '+faststart',
            '-b:v', bitrateString, 
            ...scaleArgs,
            '-acodec', 'aac', 
            '-b:a', audioBitrate, 
            'output.mp4'
          ]);

          const data = await ffmpeg.readFile('output.mp4');
          const actualSizeMB = data.length / (1024 * 1024);

          console.log(`[CYCLE ${attempt} END] Actual: ${actualSizeMB}MB, Requested Limit: ${requestedSizeMB}MB`);

          // Pure Percentage Guard: File strictly limit ke niche ho aur kam-se-kam 86% target achieve kare
          if (actualSizeMB < requestedSizeMB && actualSizeMB >= requestedSizeMB * 0.86) {
            finalData = data;
            success = true;
            break;
          }

          if (attempt === 1) {
            finalData = data;
          } else if (attempt === 2) {
            // Absolute Boundary Shield: Cycle 2 ke baad har haal me wahi chunega jo limit ke strictly niche ho
            if (actualSizeMB < requestedSizeMB) {
              finalData = data;
            } else {
              const prevSize = finalData ? finalData.length / (1024 * 1024) : 9999;
              if (actualSizeMB < prevSize) finalData = data;
            }
            break;
          }

          // Smart Proportional Feedback Loop: Bina kisi hardcoded margin ke automatic adjustment
          const correctionRatio = targetSizeMB / actualSizeMB;
          if (actualSizeMB >= requestedSizeMB) {
            currentBitrateMultiplier *= correctionRatio * 0.92; // overshoot hone par 8% safety drop
          } else {
            currentBitrateMultiplier *= correctionRatio;
          }
        }
//yaha tak change karna hai...

const outputData = finalData || await ffmpeg.readFile('output.mp4');
        setCompressedBlob(new Blob([outputData], { type: 'video/mp4' }));
        setStatusText('Done!');
        setProgress(100);

        // 1. Success hone par screen wake lock ko release karein
        if (wakeLock) {
          await wakeLock.release().catch(() => null);
          wakeLock = null;
        }
        setIsCompressing(false);
      } // यह 'else' ब्लॉक को बंद करता है
    } catch (err) {
      console.error("Compression Execution Error:", err);
      setStatusText("Compression failed!");

      // 2. Error aane par bhi screen wake lock release karein taaki battery waste na ho
      if (wakeLock) {
        await wakeLock.release().catch(() => null);
        wakeLock = null;
      }
      setIsCompressing(false);
    }
  };

  return { compressVideo, isCompressing, progress, statusText, compressedBlob };
}