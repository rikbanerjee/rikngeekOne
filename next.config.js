/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
    ],
  },
  // Optimize for Vercel
  swcMinify: true,
  // Serve the standalone operating manual (public/working-with-rik.html) at a clean URL
  async rewrites() {
    return [{ source: '/working-with-rik', destination: '/working-with-rik.html' }]
  },
}

module.exports = nextConfig

