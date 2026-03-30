import type { NextConfig } from 'next';

const nextConfig: NextConfig = {

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
