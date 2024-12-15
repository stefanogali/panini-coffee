/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: process.env.PROTOCOL || "http",
				hostname: process.env.HOSTNAME || "localhost",
				port: process.env.HOSTNAMEPORT || "", // Fallback to an empty string if no port
				pathname: process.env.IMAGE_PATHNAME || "/**",
			},
		],
	},
};

export default nextConfig;
