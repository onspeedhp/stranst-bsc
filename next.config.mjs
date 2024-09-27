import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/tonconnect-manifest.json',
        destination: '/api/manifest',
      },
    ];
  },
};


export default withSentryConfig(nextConfig, {
  org: "chungtu",
  project: "javascript-nextjs",

  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: false,
});
