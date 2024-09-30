import { connectWCApi } from "@/app/utils";
import { notFound } from "next/navigation";

type SingleProductData = {
	data: [
		{
			id: number;
			slug: string;
			name: string;
		}
	];
};

const woocommerceConnection = connectWCApi();

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
	const products: SingleProductData = await woocommerceConnection.get("products");

	return products.data.map((product) => {
		// console.log(product);
		return { slug: product.slug, id: product.id };
	});
}

export default async function Page({ params }: { params: { slug: string } }) {
	const products: SingleProductData = await woocommerceConnection.get("products");
	// console.log("products", products);

	const { slug } = params;

	const singleProduct = products.data.filter((item) => {
		return item.slug === slug;
	});

	if (singleProduct.length === 0) {
		return notFound();
	}

	const [productObject] = singleProduct;
	// console.log(productObject);
	return <p>{productObject.name}</p>;
}
