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

  // Custom webpack configuration to fix build issues.
  webpack: (config, { isServer }) => {
    // Fix for Genkit 'handlebars' dependency issue.
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'handlebars': 'handlebars/dist/cjs/handlebars.js',
      };
    }
    
    // Fix for Supabase 'ws' dependency issue.
    // The 'ws' module is a server-side WebSocket library that shouldn't be bundled for the client.
    config.externals.push('ws');

    return config;
  },
};

module.exports = nextConfig;
