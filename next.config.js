/** @type {import('next').NextConfig} */
const nextConfig = {
  // ⚡ Trailing Slash Disabled (Clean URLs)
  trailingSlash: false,

  // 🚀 1. 301 Permanent Redirects for Tool Migrations
  async redirects() {
    return [
      // -------------------------------------------------------------
      // Tool 1: Social Media Text Chunker -> Post Chunker Migration
      // -------------------------------------------------------------
      {
        source: '/social-media-text-chunker',
        destination: '/social-media-post-chunker',
        permanent: true,
      },
      {
        source: '/social-media-text-chunker/:slug*',
        destination: '/social-media-post-chunker/:slug*',
        permanent: true,
      },

      // -------------------------------------------------------------
      // Tool 2: Legacy Video Compressor URLs (/compress & /compressor) -> /video-compressor
      // -------------------------------------------------------------
      {
        source: '/compressor',
        destination: '/video-compressor',
        permanent: true,
      },
      {
        source: '/compressor/:slug*',
        destination: '/video-compressor/:slug*',
        permanent: true,
      },
      {
        source: '/compress',
        destination: '/video-compressor',
        permanent: true,
      },
      {
        source: '/compress/:slug*',
        destination: '/video-compressor/:slug*',
        permanent: true,
      },

      // -------------------------------------------------------------
      // Tool 3: YouTube Uncut Title & Card Booster Migrations
      // -------------------------------------------------------------
      {
        source: '/smart-youtube-card-opener',
        destination: '/youtube-uncut-title-card-booster',
        permanent: true,
      },
      {
        source: '/smart-youtube-card-opener/:slug*',
        destination: '/youtube-uncut-title-card-booster/:slug*',
        permanent: true,
      },
      {
        source: '/youtube-uncut-title-expander',
        destination: '/youtube-uncut-title-card-booster',
        permanent: true,
      },
      {
        source: '/youtube-uncut-title-expander/:slug*',
        destination: '/youtube-uncut-title-card-booster/:slug*',
        permanent: true,
      },
    ];
  },

  // 🔒 2. Security & SharedArrayBuffer Headers (Required for Local WASM Video & Media Processing)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "useful-tools-zone",
  project: "usefultoolszone-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors.
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      removeDebugLogging: true,
    },
  },
});