import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/games",
        destination: "/GamesCode",
        permanent: true,
      },
      {
        source: "/games/:path*",
        destination: "/GamesCode/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
