import { Metadata } from "next";
import { connectWCApi } from "../utils";
import AllProducts from "../components/AllProducts/AllProducts";

const woocommerceConnection = connectWCApi();

export const metadata: Metadata = {
	title: "Panini Coffee | Shop page for Next.JS & WordPress template",
	description:
		"High-performance ecommerce store built with Next.js and Wordpress as headless CMS with Woocommerce API integration. Clone or fork this template to build your own ecommerce store.",
};

export default async function Page({
	searchParams,
}: {
	searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
	const perPage = 4;
	const params = await searchParams;
	const page = params?.page || 1;
	const category = params?.category || "";

	let products: { data: SingleProduct[] } | undefined;

	try {
		products = await woocommerceConnection.get(
			`products?per_page=${perPage}&page=${page}&category=${category}`
		);
	} catch (error) {
		return (
			<div className="container px-5">
				<h2>Oops, there was an error on retriving the products. Please try again shortly</h2>
			</div>
		);
	}

	if (products) {
		return <AllProducts products={products.data} />;
	}

	return null;
}
