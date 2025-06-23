// next.config.js

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  // This is configured correctly and should be kept.
  // It allows Next.js to optimize images from these specific domains.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      // You can add your Firebase Storage URL here later if needed
      // e.g., { protocol: 'https', hostname: 'firebasestorage.googleapis.com' }
    ],
  },

  // The 'devServer' option is not a valid Next.js config property and should be removed.
  // The options to ignore TypeScript and ESLint errors have been removed
  // as it is a best practice to fix these errors rather than ignore them during a build.
};

export default nextConfig;