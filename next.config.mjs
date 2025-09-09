/** @type {import('next').NextConfig} */
// Ensure server-side date formatting uses IST (Asia/Kolkata)
process.env.TZ = "Asia/Kolkata";

const nextConfig = {
  experimental: {
    serverComponentsHmrCache: false, // Disable for fresh auth/appointment data
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;
