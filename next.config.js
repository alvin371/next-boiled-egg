

const path = require('path');

const nextConfig = {
  swcMinify: true,
  eslint: {
    dirs: ['src'],
  },
  output: "standalone",
  // eslint-disable-next-line no-unused-vars
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    return config;
  }
};

// Configuration object tells the next-pwa plugin
const withPWA = require("next-pwa")({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});

module.exports = withPWA(nextConfig);