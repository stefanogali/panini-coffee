import { connectWCApi } from "../utils";
import AllProducts from "../components/AllProducts/AllProducts";

const woocommerceConnection = connectWCApi();

export default async function Page({
	searchParams,
}: {
	searchParams?: { [key: string]: number | undefined };
}) {
	const perPage = 4;
	const offset = searchParams?.from || 0;

	let products: { data: SingleProduct[] } | undefined;

	try {
		products = await woocommerceConnection.get(`products?per_page=${perPage}&offset=${offset}`);
	} catch (error) {
		return <h2>Oops, there was an error on retriving the products. Please try again shortly</h2>;
	}

	if (products) {
		return (
			<AllProducts
				products={products.data}
				perPage={perPage}
				isAvailableProducts={products.data.length > 0}
			/>
		);
	}

	return null;
}
