'use client';

import { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let globalFFmpeg = null;
let globalFFmpegLoaded = false;
let globalFFmpegLoading = false; 

export default function useVideoCompressor() {
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [compressedBlob, setCompressedBlob] = useState(null);
  const workerRef = useRef(null);
  const wakeLockRef = useRef(null);

  // 🎯 Dynamic Multi-Request Core Engine for Mobile Devices
  const acquireWakeLock = async () => {
    if ('wakeLock' in navigator) {
      try {
        // Purane lock lease ko clear karke fresh handle request bhejenge taaki mobile system refresh hota rahe
        if (wakeLockRef.current) {
          await wakeLockRef.current.release().catch(() => null);
          wakeLockRef.current = null;
        }
        wakeLockRef.current = await navigator.wakeLock.request('screen');
        console.log("Wake Lock Refreshed and Pinned Successfully! 📱");
      } catch (err) {
        console.error("Mobile security wake lock bypass alert:", err);
      }
    }
  };

  const releaseWakeLock = async () => {
    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        console.log("Wake Lock Released Safely! 🔓");
      } catch (err) {
        console.error("Wake Lock Release Error:", err);
      }
    }
  };

  useEffect(() => {
    if (!isCompressing) {
      releaseWakeLock();
    }
  }, [isCompressing]);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && isCompressing) {
        await acquireWakeLock();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isCompressing]);

  useEffect(() => {
    const supportsWebCodecs = typeof VideoEncoder !== 'undefined' && typeof MediaStreamTrackProcessor !== 'undefined';
    
    if (supportsWebCodecs) {
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

    // 🎯 Loop Engine Layer: Har thodi der me wake lock request fire karne wala interval anchor
    let dynamicWakeInterval = null;

    try {
      // 1. Initial trigger active kiya user-click synchronization ke sath
      await acquireWakeLock();

      // 2. Multi-Request Loop: Compression period ke dauran har 5 second me continuous refresh request bhejega
      dynamicWakeInterval = setInterval(async () => {
        await acquireWakeLock();
      }, 5000);

      const { durationSeconds, width, height } = await getVideoMetadata(file);
      const useHardwareMode = false; 
      
      if (useHardwareMode) {
        setStatusText('Extracting frames (Hardware Mode)...');
        const video = document.createElement('video');
        video.src = URL.createObjectURL(file);
        video.muted = true;
        video.playsInline = true;

        video.onloadedmetadata = async () => {
          let dynamicMultiplier = 0.95;
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

            // Periodically ping during dense hardware frames processing loop
            if (frameCount % 30 === 0) {
              await acquireWakeLock();
            }

            workerRef.current.postMessage({
              type: 'FRAME',
              frame,
              config: { progressHint: calculatedProgress }
            }, [frame]); 
          }

          workerRef.current.postMessage({ type: 'FINISH' });
        };
      } else {
        if (!globalFFmpeg) {
          globalFFmpeg = new FFmpeg();
        }
        const ffmpeg = globalFFmpeg;
        const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd'; 
        
        if (!globalFFmpegLoaded) {
          if (!globalFFmpegLoading) {
            globalFFmpegLoading = true;
            setStatusText("Downloading & Optimizing Precision Core Engine... (First launch takes a few seconds to configure setup, subsequent uses will be instant!) ⚙️");
            try {
              await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
              });
              globalFFmpegLoaded = true;
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
          setStatusText("Launching Cached Core Engine... Super Fast Mode Active! ⚡");
          await new Promise(r => setTimeout(r, 1200));
        }

        while (globalFFmpegLoading) {
          await new Promise(r => setTimeout(r, 200));
        }

        ffmpeg.off('progress'); 
        ffmpeg.on('progress', ({ progress: p }) => {
          setTimeout(async () => {
            const pct = Math.round(p * 100);
            setProgress(pct); 
            
            // 🎯 Progress-Driven Multiple Requests: Compression ratios ke hisab se har 4% par fresh token override fire hoga
            if (pct % 4 === 0) {
              await acquireWakeLock();
            }
            
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
        let scaleArgs = [];
        const isVertical = height > width;
        const maxDimension = isVertical ? height : width;

        const estimatedKbps = Math.round((requestedSizeMB * 0.92 * 8 * 1024) / durationSeconds);
        let targetMaxDimension = 1920; 
        let audioBitrate = '128k';

        if (estimatedKbps < 900) {
          targetMaxDimension = 854;   
          audioBitrate = '48k';
        } else if (estimatedKbps < 2400) {
          targetMaxDimension = 1280;  
          audioBitrate = '64k';
        } else {
          targetMaxDimension = 1920;  
          audioBitrate = '128k';
        }
        
        if (maxDimension > targetMaxDimension) {
          if (isVertical) {
            scaleArgs = ['-vf', `scale=-2:${targetMaxDimension}`]; 
          } else {
            scaleArgs = ['-vf', `scale=${targetMaxDimension}:-2`]; 
          }
        }

        const targetSizeMB = requestedSizeMB * 0.93; 
        let currentBitrateMultiplier = 1.0;
        let finalData = null;

        for (let attempt = 1; attempt <= 2; attempt++) {
          setStatusText(`Compressing video: Cycle ${attempt}/2...`);
          
          // Cycle transitions ke beech me bhi ek baar screen lock push karenge
          await acquireWakeLock();

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

          if (actualSizeMB < requestedSizeMB && actualSizeMB >= requestedSizeMB * 0.86) {
            finalData = data;
            break;
          }

          if (attempt === 1) {
            finalData = data;
          } else if (attempt === 2) {
            if (actualSizeMB < requestedSizeMB) {
              finalData = data;
            } else {
              const prevSize = finalData ? finalData.length / (1024 * 1024) : 9999;
              if (actualSizeMB < prevSize) finalData = data;
            }
            break;
          }

          const correctionRatio = targetSizeMB / actualSizeMB;
          if (actualSizeMB >= requestedSizeMB) {
            currentBitrateMultiplier *= correctionRatio * 0.92; 
          } else {
            currentBitrateMultiplier *= correctionRatio;
          }
        }

        const outputData = finalData || await ffmpeg.readFile('output.mp4');
        setCompressedBlob(new Blob([outputData], { type: 'video/mp4' }));
        setStatusText('Done!');
        setProgress(100);
      }
    } catch (err) {
      console.error("Compression Execution Error:", err);
      setStatusText("Compression failed!");
    } finally {
      // 🔓 Cleanup Setup: Interval ko destroy karenge aur final lease handle release karenge
      if (dynamicWakeInterval) {
        clearInterval(dynamicWakeInterval);
      }
      setIsCompressing(false);
    }
  };

  return { compressVideo, isCompressing, progress, statusText, compressedBlob, acquireWakeLock };
}