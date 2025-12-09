// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // adjust as needed
    },
  },
};

module.exports = nextConfig;
