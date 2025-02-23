/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Ensure it's correctly set if using the app directory
  },
  //   images: {
  //     remotePatterns: [
  //       { protocol: 'https', hostname: 'example.com', pathname: '/**' },
  //     ],
  //   },
};

export default nextConfig;
