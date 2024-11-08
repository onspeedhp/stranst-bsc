import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
};

export default withSentryConfig(nextConfig, {
  org: 'chungtu',
  project: 'javascript-nextjs',

  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: false,
});
