/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'storage.googleapis.com',
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
