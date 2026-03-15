import type { NextConfig } from "next";
import packageJson from "./package.json";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
      APP_NAME: packageJson.name,
      APP_VERSION: packageJson.version,
    },
    async rewrites() {
      return [
        {
          source: "/api/v1/:path*",
          destination: `${process.env.BACKEND_URL}/api/v1/:path*`,
        },
      ];
    },
  reactCompiler: true,
};

export default nextConfig;
