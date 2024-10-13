import { connectWCApi } from "../utils";
import AllProducts from "../components/AllProducts/AllProducts";

const woocommerceConnection = connectWCApi();

export default async function Page({
	searchParams,
}: {
	searchParams?: { [key: string]: string | undefined };
}) {
	const perPage = 4;
	const page = searchParams?.page || 1;
	const category = searchParams?.category || "";
	// console.log("category", category);

	let products: { data: SingleProduct[] } | undefined;

	try {
		products = await woocommerceConnection.get(
			`products?per_page=${perPage}&page=${page}&category=${category}`
		);
		// console.log("called");
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
