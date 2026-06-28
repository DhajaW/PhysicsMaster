/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/si',
      },
    ];
  },
};

export default nextConfig;
