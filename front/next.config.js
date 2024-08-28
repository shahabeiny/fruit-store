/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: process.env.API_URL,
  }, images: {
    remotePatterns: [
     
      {
        protocol: "https",
        hostname: "api-fruitstore.liara.run",
      },
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
