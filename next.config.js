/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.substack.com", "analytics.twitter.com"],
  },
};

module.exports = nextConfig;
