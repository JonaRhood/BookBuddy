import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openlibrary.org',
        port: '',
        pathname: '/**',
      },
    ]
  },
};

export default nextConfig;
