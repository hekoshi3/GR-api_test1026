import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['192.168.24.43', '192.168.24.204'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.oneme.ru',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
