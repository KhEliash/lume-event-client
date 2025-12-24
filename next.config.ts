/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
  reactCompiler: true,

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // adjust as needed
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
