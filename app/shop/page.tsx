import { connectWCApi } from "../utils";

const woocommerceConnection = connectWCApi();

export default async function Page({
	searchParams,
}: {
	searchParams?: { [key: string]: number | undefined };
}) {
	const perPage = 3;
	const offset = searchParams?.from || 0;

	let products: { data: SingleProduct[] } | undefined;

	try {
		products = await woocommerceConnection.get(`products?per_page=${perPage}&offset=${offset}`);
	} catch (error) {}

	if (products && products.data.length) {
		console.dir(products.data, { depth: null });
	}

	return <h1>Params: {searchParams?.from}</h1>;
}
