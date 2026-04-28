import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/docs/Quick-start",
        destination: "/docs/quick-start",
        permanent: true,
      },
      {
        source: "/docs/Limits",
        destination: "/docs/limits",
        permanent: true,
      },
      {
        source: "/docs/Record-types",
        destination: "/docs/record-types",
        permanent: true,
      },
      {
        source: "/docs/Support",
        destination: "/docs/support",
        permanent: true,
      },
      {
        source: "/docs/NSdelegation",
        destination: "/docs/nsdelegation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
