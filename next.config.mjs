/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export", // Outputs a Single-Page Application (SPA).
  // distDir: "./dist", // Changes the build output directory to `./dist/`.
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "https://ciocio97.github.io" : "",
  },
};

export default nextConfig;
