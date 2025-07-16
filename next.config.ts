import createNextIntlPlugin from "next-intl/plugin";
import withPWA from "next-pwa";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const baseConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const combinedConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(withNextIntl(baseConfig));

export default combinedConfig;
