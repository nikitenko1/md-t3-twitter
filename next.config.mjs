/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.twimg.com",
        port: "",
        // pathname:"/sticky/**"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        // pathname:"/sticky/**"
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",

        port: "",
      },
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

export default config;
