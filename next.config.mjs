/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "redmaq.vercel.app", // tu dominio de producción
        port: "",
        pathname: "/**", // permite todas las rutas
      },
      {
        protocol: "http",
        hostname: "localhost", // para desarrollo local
        port: "3000",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    appDir: true, // habilita carpeta app/
  },
};

export default nextConfig;