import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/polls',
        destination: '/dashboard/polls',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/auth/login',
        permanent: true,
      },
      {
        source: '/register',
        destination: '/auth/register',
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: '/dashboard/dashboard',
        permanent: true,
      },
    ]
  },
  /* config options here */
};

export default nextConfig;
