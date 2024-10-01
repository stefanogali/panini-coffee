/** @type {import('next').NextConfig} */

const nextConfig = {
	// reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: process.env.PROTOCOL,
				hostname: process.env.HOSTNAME,
				port: process.env.HOSTNAMEPORT,
				pathname: process.env.IMAGE_PATHNAME,
			},
		],
	},
};

export default nextConfig;
