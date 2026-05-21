/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  images: {
    remotePatterns: [
      // Development (local Flask)
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/api/v1/send_image/**',
      },

      // Production (Flask behind Nginx)
      {
        protocol: 'https',
        hostname: 'surrealadventures.co.ke',
        pathname: '/api/v1/send_image/**',
      },
      {
        protocol: 'https',
        hostname: 'www.surrealadventures.co.ke',
        pathname: '/api/v1/send_image/**',
      },
    ],
  },

  async rewrites() {
          const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:5000';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};
;

export default nextConfig;
