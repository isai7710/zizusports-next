/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**", // allows images from all paths in Cloudinary
      },
    ],
  },
};

export default nextConfig;
