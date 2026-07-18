"use client";

import { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

let globalFFmpeg = null;
let globalFFmpegLoaded = false;
let globalFFmpegLoading = false;

export default function useVideoCompressor() {
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [compressedBlob, setCompressedBlob] = useState(null); // 🌟 यह लाइन वापस जोड़ दें
  const [isStuck, setIsStuck] = useState(false);
  const [isTechnicalFreeze, setIsTechnicalFreeze] = useState(false);
  const workerRef = useRef(null);
  // 🎯 DUAL FREEZE DETECTOR TIMER (Network vs Technical)
  useEffect(() => {
    let networkTimer = null;
    let technicalTimer = null;

    if (isCompressing && progress < 100) {
      // Case A: Engine download window timeout
      if (globalFFmpegLoading && !globalFFmpegLoaded) {
        networkTimer = setTimeout(() => {
          setIsStuck(true);
          setStatusText(
            "Network Issue: Engine download taking too long. Please check your connection! 🌐",
          );
        }, 15000);
      }

      // Case B: Engine ready but processing pipeline gets throttled
      if (globalFFmpegLoaded) {
        technicalTimer = setTimeout(() => {
          setIsTechnicalFreeze(true);
          setStatusText(
            "Technical Pause: Engine ready but rendering loop encountered a browser block. ⚙️",
          );
        }, 15000);
      }
    } else {
      setIsStuck(false);
      setIsTechnicalFreeze(false);
    }

    return () => {
      if (networkTimer) clearTimeout(networkTimer);
      if (technicalTimer) clearTimeout(technicalTimer);
    };
  }, [progress, isCompressing, globalFFmpegLoading, globalFFmpegLoaded]);

  const wakeLockRef = useRef(null);

  // 🚀 OPTIMIZED BACKGROUND PRE-LOADER (With 500ms safe delay)
  useEffect(() => {
    const preFetchEngine = async () => {
      if (typeof window === "undefined") return;

      if (!globalFFmpeg) {
        globalFFmpeg = new FFmpeg();
      }

      if (!globalFFmpegLoaded && !globalFFmpegLoading) {
        globalFFmpegLoading = true;
        const baseURL =
          "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd";
        try {
          await globalFFmpeg.load({
            coreURL: await toBlobURL(
              `${baseURL}/ffmpeg-core.js`,
              "text/javascript",
            ),
            wasmURL: await toBlobURL(
              `${baseURL}/ffmpeg-core.wasm`,
              "application/wasm",
            ),
          });
          globalFFmpegLoaded = true;
          localStorage.setItem("utz_engine_cached", "true");
          console.log(
            "Useful Tools Zone: Core Engine pre-loaded silently in background! ⚡",
          );
        } catch (error) {
          console.error("Background Engine Pre-load Bypassed:", error);
        } finally {
          globalFFmpegLoading = false;
        }
      }
    };

    // ⏱️ Safe delay taaki page ka CSS/HTML pehle perfectly render ho jaye
    const timer = setTimeout(preFetchEngine, 500);
    return () => clearTimeout(timer);
  }, []);

  // 🎯 Safe Dynamic Multi-Request Core Engine
  const acquireWakeLock = async () => {
    if ("wakeLock" in navigator) {
      if (document.visibilityState !== "visible") {
        console.log("Wake Lock skipped: Page not visible.");
        return;
      }

      try {
        if (wakeLockRef.current) {
          await wakeLockRef.current.release().catch(() => null);
          wakeLockRef.current = null;
        }
        wakeLockRef.current = await navigator.wakeLock.request("screen");
        console.log("Wake Lock Refreshed and Pinned Successfully! 📱");
      } catch (err) {
        console.error(
          "Mobile security wake lock bypass alert (Normal behavior):",
          err,
        );
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
      if (document.visibilityState === "visible" && isCompressing) {
        await acquireWakeLock();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isCompressing]);

  useEffect(() => {
    const supportsWebCodecs =
      typeof VideoEncoder !== "undefined" &&
      typeof MediaStreamTrackProcessor !== "undefined";

    if (supportsWebCodecs) {
      workerRef.current = new Worker("/ffmpeg-worker.js?t=" + Date.now(), {
        type: "module",
      });

      workerRef.current.onmessage = (e) => {
        const { type, progress, blob, status, error } = e.data;
        if (type === "PROGRESS") setProgress(progress);
        if (type === "STATUS") setStatusText(status);
        if (type === "COMPLETE") {
          setCompressedBlob(blob);
          setIsCompressing(false);
          setStatusText("Done!");
          setProgress(100);
        }
        if (type === "ERROR") {
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
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve({
          durationSeconds: video.duration,
          width: video.videoWidth,
          height: video.videoHeight,
        });
      };
      video.src = URL.createObjectURL(file);
    });
  };

  // ⚡ CUSTOM LIVE PROGRESS FETCHER: Shows download speed during the initial engine download
  const loadBlobWithProgress = async (url, type, isWasm) => {
    const response = await fetch(url);
    const contentLength = response.headers.get("content-length");
    const total = contentLength
      ? parseInt(contentLength, 10)
      : isWasm
        ? 31457280
        : 0;
    let loaded = 0;

    if (!response.body) {
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    }

    const reader = response.body.getReader();
    const chunks = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      loaded += value.length;

      if (isWasm && total) {
        const percent = Math.min(Math.round((loaded / total) * 100), 100);
        setProgress(Math.floor(percent * 0.15)); // Allocates 0-15% of the progress bar to download
        setStatusText(
          `Downloading Core Engine: ${percent}% (Only ~9MB setup) ⏳`,
        );
      }
    }

    const blob = new Blob(chunks, { type });
    return URL.createObjectURL(blob);
  };

  const compressVideo = async (
    file,
    requestedSizeMB,
    isUltrafast = false,
    fpsParam = "recommended",
  ) => {
    let targetSizeMB = Math.max(1, requestedSizeMB - 1);





    setIsCompressing(true);
    setProgress(0);
    setCompressedBlob(null);

    let dynamicWakeInterval = null;

    try {
      await acquireWakeLock();

      dynamicWakeInterval = setInterval(async () => {
        await acquireWakeLock();
      }, 5000);

      const { durationSeconds, width, height } = await getVideoMetadata(file);
      const useHardwareMode = false;

      if (useHardwareMode) {
        setStatusText("Extracting frames (Hardware Mode)...");
        const video = document.createElement("video");
        video.src = URL.createObjectURL(file);
        video.muted = true;
        video.playsInline = true;

        video.onloadedmetadata = async () => {
          let dynamicMultiplier = 0.95;
          dynamicMultiplier = Math.max(0.9, Math.min(dynamicMultiplier, 1.15));

          const targetBits = targetSizeMB * dynamicMultiplier * 1024 * 1024 * 8;
          const bitrateBps = Math.round(targetBits / durationSeconds);

          workerRef.current.postMessage({
            type: "START",
            config: { width, height, bitrateBps },
          });

          const stream = video.captureStream
            ? video.captureStream()
            : video.mozCaptureStream();
          const videoTrack = stream.getVideoTracks()[0];
          const trackProcessor = new MediaStreamTrackProcessor({
            track: videoTrack,
          });
          const reader = trackProcessor.readable.getReader();

          video.play();
          let frameCount = 0;
          const expectedTotalFrames = durationSeconds * 30;

          while (true) {
            const { done, value: frame } = await reader.read();
            if (done) break;

            frameCount++;
            const calculatedProgress = Math.min(
              Math.round((frameCount / expectedTotalFrames) * 95),
              99,
            );

            if (frameCount % 30 === 0) {
              await acquireWakeLock();
            }

            workerRef.current.postMessage(
              {
                type: "FRAME",
                frame,
                config: { progressHint: calculatedProgress },
              },
              [frame],
            );
          }

          workerRef.current.postMessage({ type: "FINISH" });
        };
      } else {
        if (!globalFFmpeg) {
          globalFFmpeg = new FFmpeg();
        }
        const ffmpeg = globalFFmpeg;
        // 🎯 SharedArrayBuffer check karke core-mt ya normal select karein
        const hasThreads = typeof SharedArrayBuffer !== "undefined";
        const baseURL = hasThreads
          ? "https://cdn.jsdelivr.net/npm/@ffmpeg/core-mt@0.12.6/dist/umd"
          : "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd";

        if (!globalFFmpegLoaded) {
          if (!globalFFmpegLoading) {
            globalFFmpegLoading = true;
            setStatusText("Optimizing Engine for your Device Hardware...");
            try {
              await ffmpeg.load({
                coreURL: await toBlobURL(
                  `${baseURL}/ffmpeg-core.js`,
                  "text/javascript",
                ),
                wasmURL: await toBlobURL(
                  `${baseURL}/ffmpeg-core.wasm`,
                  "application/wasm",
                ),
                // Agar multi-thread supported hai toh hi worker file ko load karein
                ...(hasThreads
                  ? {
                      workerURL: await toBlobURL(
                        `${baseURL}/ffmpeg-core.worker.js`,
                        "text/javascript",
                      ),
                    }
                  : {}),
              });
              globalFFmpegLoaded = true;

              // 🎯 टोकन जनरेशन एक्टिव रखा है ताकि आपका टॉप रिबन डिटेक्ट कर सके
              localStorage.setItem("utz_engine_cached", "true");

              setStatusText(
                "Core engine has been downloaded for next quick compression! 🚀",
              );
              await new Promise((r) => setTimeout(r, 2500));
            } catch (error) {
              console.error("FFmpeg Load Error:", error);
              setStatusText("Engine blocked! Check console.");
            } finally {
              globalFFmpegLoading = false;
            }
          }
        } else {
          setStatusText(
            "Launching Cached Core Engine... Super Fast Mode Active! ⚡",
          );
          await new Promise((r) => setTimeout(r, 1200));
        }

        while (globalFFmpegLoading) {
          await new Promise((r) => setTimeout(r, 205));
        }

        // 🎯 RESET PROGRESS TO ZERO BEFORE EVERY FRESH RUN
        setProgress(0);

        ffmpeg.off("progress");
        let lastRenderedPct = 0; // State memory track karne ke liye

        ffmpeg.on("progress", ({ progress: p }) => {
          const pct = Math.min(Math.max(0, Math.round(p * 100)), 100);

          // Dynamic step check: Saste phones par render frequency auto-drop ho jayegi
          if (pct >= lastRenderedPct + progressStep || pct === 100) {
            setProgress(() => pct);
            lastRenderedPct = pct;
          }

          // Prevent mobile battery throttling during encoding blocks
          if (pct % 5 === 0) {
            acquireWakeLock();
          }

          if (pct < 15) {
            setStatusText(
              "Initializing frames... Video encoding is a heavy CPU process, hang tight! 🧠",
            );
          } else if (pct >= 15 && pct < 45) {
            setStatusText(
              "Compressing... Did you know? Compression runs 100% offline inside your browser sandbox. Your data is 100% private! 🔒",
            );
          } else if (pct >= 45 && pct < 75) {
            setStatusText(
              "Compressing... Crunching pixels & optimizing bitrates to maintain maximum video quality... 🎯",
            );
          } else if (pct >= 75 && pct < 100) {
            setStatusText(
              "Almost there! Wrapping up the final video container structures... 🎬",
            );
          }
        });

        await ffmpeg.writeFile("input.mp4", await fetchFile(file));
        let scaleArgs = [];
        const isVertical = height > width;
        const maxDimension = isVertical ? height : width;

        const estimatedKbps = Math.round(
          (requestedSizeMB * 0.92 * 8 * 1024) / durationSeconds,
        );
        let targetMaxDimension = 1920;
        let audioBitrate = "128k";

        if (estimatedKbps < 900) {
          targetMaxDimension = 854;
          audioBitrate = "48k";
        } else if (estimatedKbps < 2400) {
          targetMaxDimension = 1280;
          audioBitrate = "64k";
        } else {
          targetMaxDimension = 1920;
          audioBitrate = "128k";
        }

        if (maxDimension > targetMaxDimension) {
          if (isVertical) {
            scaleArgs = ["-vf", `scale=-2:${targetMaxDimension}`];
          } else {
            scaleArgs = ["-vf", `scale=${targetMaxDimension}:-2`];
          }
        }

        // 🎯 MULTI-TIER TUNING ENGINE: Maps explicit dashboard requests perfectly
        let dynamicFPS = 30;
        let dynamicProfile = "baseline";

        if (fpsParam === "recommended") {
          dynamicProfile = "baseline"; // Super fast execution tracking
          if (estimatedKbps < 900) {
            dynamicFPS = 24; // Auto protect low targets from pixel distortion
          } else {
            dynamicFPS = 30;
          }
        } else {
          dynamicFPS = parseInt(fpsParam) || 30;
          dynamicProfile = "main"; // Ultra HD layout distribution tracking
        }

        // 🎯 ULTIMATE PROGRESSIVE HEADROOM ENGINE (Optimized to fill up closer to target size)
        let safetyFactor = 0.94;

        if (requestedSizeMB <= 16) {
          safetyFactor = 0.92; // 10MB demand will now perfectly target ~9.2MB output ceiling
        } else if (requestedSizeMB <= 50) {
          safetyFactor = 0.94; // 30MB/50MB presets get premium headroom allocation
        } else if (requestedSizeMB <= 100) {
          safetyFactor = 0.95;
        } else {
          safetyFactor = 0.96;
        }

        // Re-assigning target size with high-efficiency scaling
        targetSizeMB = requestedSizeMB * safetyFactor;

        // 🎵 DYNAMIC AUDIO & VIDEO BITRATE HEURISTICS MATRIX (Stage-Wise Mobile Optimization Tiers)
        let audioArgs = ["-c:a", "copy"];
        let audioBitrateForCalc = 128000;

        if (requestedSizeMB <= 16) {
          // 📱 10MB / 16MB Mobile & WhatsApp Target Optimization Tiers
          if (durationSeconds <= 90) {
            // Stage 1: Short clips (< 1.5 mins) - Keep clean 96k stereo audio
            audioArgs = ["-c:a", "aac", "-b:a", "96k"];
            audioBitrateForCalc = 96000;
          } else if (durationSeconds <= 300) {
            // Stage 2: Medium clips (up to 5 mins) - Step down to 48k stereo
            audioArgs = ["-c:a", "aac", "-b:a", "48k"];
            audioBitrateForCalc = 48000;
          } else if (durationSeconds <= 720) {
            // Stage 3: Long clips (up to 12 mins) - Step down to 32k Mono to free up pixel budget
            audioArgs = ["-c:a", "aac", "-b:a", "32k", "-ac", "1"];
            audioBitrateForCalc = 32000;
          } else {
            // Stage 4: 🚨 ULTRA-LONG CLIPS (> 12 mins) - Absolute last resort 16k Mono
            // This aggressively rescues the video bitrate budget to keep mobile pixels sharp!
            audioArgs = ["-c:a", "aac", "-b:a", "16k", "-ac", "1"];
            audioBitrateForCalc = 16000;
          }
        } else if (requestedSizeMB <= 50) {
          // 25MB / 40MB / 50MB Medium Presets
          if (durationSeconds < 600) {
            audioArgs = ["-c:a", "copy"];
            audioBitrateForCalc = 128000;
          } else if (durationSeconds <= 1200) {
            audioArgs = ["-c:a", "aac", "-b:a", "96k"];
            audioBitrateForCalc = 96000;
          } else {
            audioArgs = ["-c:a", "aac", "-b:a", "64k"];
            audioBitrateForCalc = 64000;
          }
        } else {
          // 95MB / 100MB / 200MB Premium Budgets
          if (durationSeconds < 1800) {
            audioArgs = ["-c:a", "copy"];
            audioBitrateForCalc = 128000;
          } else {
            audioArgs = ["-c:a", "aac", "-b:a", "128k"];
            audioBitrateForCalc = 128000;
          }
        }
        if (requestedSizeMB <= 16) {
          // 📱 10MB / 16MB Mobile & WhatsApp Target Optimization Tiers
          if (durationSeconds <= 90) {
            // Stage 1: Short clips (< 1.5 mins) - Keep clean 96k stereo audio
            audioArgs = ["-c:a", "aac", "-b:a", "96k"];
            audioBitrateForCalc = 96000;
          } else if (durationSeconds <= 300) {
            // Stage 2: Medium clips (up to 5 mins) - Step down to 48k stereo
            audioArgs = ["-c:a", "aac", "-b:a", "48k"];
            audioBitrateForCalc = 48000;
          } else if (durationSeconds <= 720) {
            // Stage 3: Long clips (up to 12 mins) - Step down to 32k Mono to free up pixel budget
            audioArgs = ["-c:a", "aac", "-b:a", "32k", "-ac", "1"];
            audioBitrateForCalc = 32000;
          } else {
            // Stage 4: Ultra-long clips (> 12 mins) - Last resort 16k Mono to keep pixels sharp
            audioArgs = ["-c:a", "aac", "-b:a", "16k", "-ac", "1"];
            audioBitrateForCalc = 16000;
          }
        } else if (requestedSizeMB <= 50) {
          // 💎 25MB / 30MB / 50MB Medium Presets (Keeps rich audio since video has enough bits)
          if (durationSeconds < 600) {
            audioArgs = ["-c:a", "copy"];
            audioBitrateForCalc = 128000;
          } else if (durationSeconds <= 1200) {
            audioArgs = ["-c:a", "aac", "-b:a", "96k"];
            audioBitrateForCalc = 96000;
          } else {
            audioArgs = ["-c:a", "aac", "-b:a", "64k"];
            audioBitrateForCalc = 64000;
          }
        } else {
          // 🚀 95MB / 100MB / 200+ Premium High Budgets
          if (durationSeconds < 1800) {
            audioArgs = ["-c:a", "copy"];
            audioBitrateForCalc = 128000;
          } else {
            audioArgs = ["-c:a", "aac", "-b:a", "128k"];
            audioBitrateForCalc = 128000;
          }
        }

        const systemThreads =
          typeof navigator !== "undefined"
            ? navigator.hardwareConcurrency || 4
            : 4;
        // 📱 Dynamic Device Profiling Matrix
        const isMobile =
          typeof navigator !== "undefined" &&
          /Mobi|Android|iPhone/i.test(navigator.userAgent);

        // Cheaper phones (<=4 cores) par threads cap karenge taaki thermal freeze na ho
 const safeThreads = isMobile ? (systemThreads <= 4 ? 2 : 4) : Math.min(systemThreads, 4); // 👈 PC ke 12 threads ko safe 4 cores par cap kar diya

        // Saste phones par GOP multiplier badha denge taaki CPU load 40% tak kam ho jaye
        const gopMultiplier = isMobile ? (systemThreads <= 4 ? 4 : 3) : 2;

        // Cheap devices par UI re-renders aggressively drop karenge
        const progressStep = isMobile ? (systemThreads <= 4 ? 5 : 3) : 1;

        let currentBitrateMultiplier = 1.0;
        let finalData = null;

        for (let attempt = 1; attempt <= 2; attempt++) {
          setStatusText(`Compressing video: Cycle ${attempt}/2...`);
          await acquireWakeLock();

          try {
            await ffmpeg.deleteFile("output.mp4");
          } catch (e) {}

          // Math Tuning: Subtract audio bits from target size budget
          const totalBits =
            targetSizeMB * currentBitrateMultiplier * 1024 * 1024 * 8;
          const totalAudioBits = audioBitrateForCalc * durationSeconds;
          let calculatedVideoBitrate =
            (totalBits - totalAudioBits) / durationSeconds;

          if (calculatedVideoBitrate < 16000) calculatedVideoBitrate = 16000;
          const bitrateString = `${Math.round(calculatedVideoBitrate / 1000)}k`;

          await ffmpeg.exec([
            "-y",
            "-i",
            "input.mp4",
            "-vcodec",
            "libx264",
            "-preset",
            isUltrafast ? "ultrafast" : "veryfast",
            "-tune",
            "fastdecode,ssim",

            ...(isUltrafast ? ["-x264opts", "no-mbtree=1:subq=2:me=dia"] : []),

            "-threads",
            String(safeThreads), // 👈 Cheap phone par automatic 2 cores cap ho jayenge
            "-pix_fmt",
            "yuv420p",
            "-movflags",
            "+faststart",
            "-sws_flags",
            "fast_bilinear",
            "-r",
            String(dynamicFPS),
            "-g",
            String(dynamicFPS * gopMultiplier), // 👈 Cheap devices par GOP frames load drastically kam kar dega
            "-profile:v",
            dynamicProfile,

            // 🎯 STRICT TARGET ENFORCEMENT BOUNDARIES
            "-b:v",
            bitrateString,
            "-maxrate",
            bitrateString,
            "-bufsize",
            `${Math.round(calculatedVideoBitrate / 500)}k`,

            ...scaleArgs,
            ...audioArgs,

            "-dn",
            "output.mp4",
          ]);

          const data = await ffmpeg.readFile("output.mp4");
          const actualSizeMB = data.length / (1024 * 1024);

          if (
            actualSizeMB < requestedSizeMB &&
            actualSizeMB >= requestedSizeMB * 0.86
          ) {
            finalData = data;
            break;
          }

          if (attempt === 1) {
            finalData = data;
          } else if (attempt === 2) {
            if (actualSizeMB < requestedSizeMB) {
              finalData = data;
            } else {
              const prevSize = finalData
                ? finalData.length / (1024 * 1024)
                : 9999;
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

        const outputData = finalData || (await ffmpeg.readFile("output.mp4"));
        setCompressedBlob(new Blob([outputData], { type: "video/mp4" }));
        setStatusText("Done!");
        setProgress(100);
      }
    } catch (err) {
      console.error("Compression Execution Error:", err);
      setStatusText("Compression failed!");
    } finally {
      // 🧼 INSTANT BROWSER VIRTUAL RAM PURGE
      if (globalFFmpeg && globalFFmpegLoaded) {
        try {
          await globalFFmpeg.deleteFile("input.mp4").catch(() => null);
          await globalFFmpeg.deleteFile("output.mp4").catch(() => null);
          console.log("Browser virtual memory cleared successfully! 🧼");
        } catch (e) {
          console.log("Memory already free or skipped:", e);
        }
      }

      if (dynamicWakeInterval) {
        clearInterval(dynamicWakeInterval);
      }
      setIsCompressing(false);
    }
  };

  return {
    compressVideo,
    isCompressing,
    progress,
    statusText,
    compressedBlob,
    acquireWakeLock,
    isStuck,
    setIsStuck,
    isTechnicalFreeze,
    setIsTechnicalFreeze,
  };
}
