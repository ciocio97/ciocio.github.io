/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export", // SSG
  distDir: "build",
  trailingSlash: true, // GitHub Pages에서 index.html 찾을 수 있도록 설정
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "https://ciocio97.github.io" : "",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
