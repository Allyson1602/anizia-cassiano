/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    emailService: "service_tp9wl5b",
    emailTemplate: "template_i4xoejz",
    emailKey: "VnZhMAwkARsxc-pEj"
  },
  output: 'export',
  assetPrefix: './',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
