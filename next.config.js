/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.neowin.com' }],
  },
}

module.exports = nextConfig
