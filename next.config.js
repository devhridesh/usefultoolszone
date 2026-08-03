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
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
