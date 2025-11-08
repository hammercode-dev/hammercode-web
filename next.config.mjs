import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "lms-be-development.hammercode.org",
      },
      {
        protocol: "http",
        port: "8000",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
      },
    ],
    // // Disable private IP check for development (allows localhost)
    // dangerouslyAllowSVG: true,
    // unoptimized: process.env.NODE_ENV === "development",
  },
  trailingSlash: true,
  // Disable hostname resolution to private IPs check in development
  // experimental: {
  //   allowedHostsForFetch: process.env.NODE_ENV === "development"
  //     ? ["localhost", "127.0.0.1", "::1"]
  //     : undefined,
  // },
};

export default withNextIntl(nextConfig);
