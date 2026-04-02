import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export untuk deploy ke cPanel (upload ke public_html)
  output: 'export',

  // Setiap halaman mendapat folder + index.html tersendiri
  // mis: /tentang → out/tentang/index.html
  trailingSlash: true,

  // Gambar tidak dioptimasi (diperlukan di non-Vercel / static hosting)
  images: {
    unoptimized: true,
  },

  allowedDevOrigins: ['*.trycloudflare.com'],
  // rewrites() dihapus: tidak didukung output 'export'
  // API dipanggil langsung ke https://api.aji-institute.com/api dari client
};

export default nextConfig;
