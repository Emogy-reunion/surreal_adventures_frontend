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
        pathname: '/api/send_image/**',
      },

      // Production (Flask behind Nginx)
      {
        protocol: 'https',
        hostname: '#',
        pathname: '/api/send_image/**',
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
