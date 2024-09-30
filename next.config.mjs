/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: process.env.PROTOCOL,
				hostname: process.env.HOSTNAME,
				port: "8888",
				pathname: process.env.IMAGE_PATHNAME,
			},
		],
	},
};

export default nextConfig;
