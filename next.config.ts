import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "github.com",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }

    if (isServer) {
      config.externals = [...(config.externals || []), "monaco-editor"];
    }

    return config;
  },
  transpilePackages: ["monaco-editor"],
};

export default nextConfig;
