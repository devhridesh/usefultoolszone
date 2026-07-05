// public/ffmpeg-worker.js
// Strict Native Vanilla JS - No bare imports to prevent public-folder crashes!

let encoder = null;
let encodedChunks = [];

self.onmessage = async (e) => {
  const { type, config, frame } = e.data;

  // ==========================================
  // HARDWARE MODE (WEBCODECS ENCODER)
  // ==========================================
  if (type === 'START') {
    encodedChunks = [];
    self.postMessage({ type: 'STATUS', status: 'Initializing Hardware Encoder...' });

    try {
      encoder = new VideoEncoder({
        output: (chunk) => {
          const buffer = new ArrayBuffer(chunk.byteLength);
          chunk.copyTo(buffer);
          encodedChunks.push(buffer);
        },
        error: (err) => self.postMessage({ type: 'ERROR', error: 'Encoder error: ' + err.message })
      });

 encoder.configure({
        codec: 'avc1.42e034', 
        width: config.width,
        height: config.height,
        bitrate: config.bitrateBps,
        bitrateMode: 'constant', 
        latencyMode: 'realtime', // <--- यह लाइन GPU के क्वालिटी लॉक को तोड़कर सख्त लिमिट लागू करेगी
        hardwareAcceleration: 'prefer-hardware' 
      });
      
      self.postMessage({ type: 'STATUS', status: 'Hardware Encoding Started...' });
    } catch (err) {
      self.postMessage({ type: 'ERROR', error: 'Hardware config failed: ' + err.message });
    }
  }

  if (type === 'FRAME') {
    try {
      if (encoder && encoder.state === 'configured') {
        encoder.encode(frame);
        self.postMessage({ type: 'PROGRESS', progress: config.progressHint });
      }
    } catch (err) {
      self.postMessage({ type: 'ERROR', error: 'Frame stream error: ' + err.message });
    } finally {
      if (frame) {
        frame.close(); // Memory leak and stall prevention guaranteed!
      }
    }
  }

  if (type === 'FINISH') {
    try {
      self.postMessage({ type: 'STATUS', status: 'Finalizing file container...' });
      if (encoder) {
        await encoder.flush();
        encoder.close();
      }
      const compressedBlob = new Blob(encodedChunks, { type: 'video/mp4' });
      self.postMessage({ type: 'COMPLETE', blob: compressedBlob });
    } catch (err) {
      self.postMessage({ type: 'ERROR', error: 'Flush failed: ' + err.message });
    }
  }
};