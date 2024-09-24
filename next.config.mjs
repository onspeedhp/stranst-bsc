/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/tonconnect-manifest.json',
        destination: '/api/manifest',
      },
    ];
  },
};

export default nextConfig;
