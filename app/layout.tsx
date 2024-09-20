import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Jost } from "next/font/google";
import { getWPJSON } from "./utils";
import Header from "./components/Header/Header";
import "./globals.css";

// const geistSans = localFont({
// 	src: "./fonts/GeistVF.woff",
// 	variable: "--font-geist-sans",
// 	weight: "100 900",
// });
// const geistMono = localFont({
// 	src: "./fonts/GeistMonoVF.woff",
// 	variable: "--font-geist-mono",
// 	weight: "100 900",
// });

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

type Logo = {
	logo_url: string;
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const logo: Logo = await getWPJSON("wp-json/custom/v1/logo");

	return (
		<html lang="en">
			<body className={`${jost.className}  antialiased`}>
				<Header logoUrl={logo.logo_url} />
				{children}
			</body>
		</html>
	);
}
