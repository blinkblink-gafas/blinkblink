/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Placeholder remote pattern for product imagery — update once real CDN/domain is confirmed.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Mock product images are local SVGs (public/products/) drawn in the same
    // style as Hero/CategoryCard, so next/image needs to be allowed to
    // optimize local SVGs. Safe here because these are our own static files,
    // never user-uploaded content.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
