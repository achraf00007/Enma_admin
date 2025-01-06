/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
          {
            hostname: "res.cloudinary.com",
          },
        ],
    }
};

export default nextConfig;

