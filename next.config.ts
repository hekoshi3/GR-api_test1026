import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
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
