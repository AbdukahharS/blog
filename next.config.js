/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.neowin.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
    ],
  },
}

module.exports = nextConfig
