/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Allow images from any domain
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
