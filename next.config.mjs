// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configured to allow Next.js to optimize images from these specific domains.
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
    ],
  },

  // Custom webpack configuration to fix a build issue with a Genkit dependency.
  webpack: (config, { isServer }) => {
    if (isServer) {
      // The 'handlebars' library, a dependency of Genkit, uses a feature not
      // supported by webpack by default. This alias directs webpack to use a
      // CommonJS build of the library which is compatible.
      config.resolve.alias = {
        ...config.resolve.alias,
        'handlebars': 'handlebars/dist/cjs/handlebars.js',
      };
    }
    return config;
  },
};

export default nextConfig;
