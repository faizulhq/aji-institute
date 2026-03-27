import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ['*.trycloudflare.com'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://faizulhq10.pythonanywhere.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
