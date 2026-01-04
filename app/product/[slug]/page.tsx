import { Metadata } from "next";
import { connectWCApi } from "@/app/utils";
import { notFound } from "next/navigation";
import ProductOverview from "@/app/components/ProductOverview/ProductOverview";
import ProductDetails from "@/app/components/ProductDetails/ProductDetails";
import RelatedProducts from "@/app/components/RelatedProducts/RelatedProducts";

export const metadata: Metadata = {
	title: "Panini Coffee | Single product page for Next.JS & WordPress template",
	description:
		"High-performance ecommerce store built with Next.js and Wordpress as headless CMS with Woocommerce API integration. Clone or fork this template to build your own ecommerce store.",
};

const woocommerceConnection = connectWCApi();

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
	try {
		const response = await woocommerceConnection.get("products");
		const products = Array.isArray(response) ? response : response?.data || [];

		return products.map((product: SingleProduct) => {
			return { slug: product.slug, id: product.id };
		});
	} catch (error) {
		console.error("Error generating static params:", error);
		// Return empty array on error - pages will be generated on-demand
		return [];
	}
}

// to do: refactor
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	let products: { data: SingleProduct[] } = { data: [] };
	let reviews: { data: Reviews[] } = { data: [] };
	let singleProduct = [];
	let variations: Variations[] = [];
	let relatedProducts: { data: SingleProduct[] } = { data: [] };

	try {
		[products, reviews] = await Promise.all([
			woocommerceConnection.get("products", {
				per_page: 100, //max number of products to retrieve on each call. Adjust this number based on the number of products you have
			}),
			woocommerceConnection.get("products/reviews"),
		]);
	} catch (error) {
		return (
			<div className="container px-5">
				<h2>Oops, there was an error on retriving the product. Please try again shortly</h2>
			</div>
		);
	}

	singleProduct = products.data.filter((item) => {
		return item.slug === slug;
	});

	// not found page if product do not exists
	if (singleProduct.length === 0) {
		return notFound();
	}

	// get data for specific product
	const [product] = singleProduct;

	const singleProductReviews = reviews.data.filter((item) => {
		return item.product_id === product.id;
	});
	const variationIds = product.variations;

	try {
		const totalVariations = variationIds.map((id: number) =>
			woocommerceConnection.get(`products/${product.id}/variations/${id}`)
		);
		const resolvedVariations = await Promise.all(totalVariations);
		variations = resolvedVariations.map((response) => response.data);
		relatedProducts = await woocommerceConnection.get("products", {
			include: product.related_ids.slice(0, 3).join(","),
		});
	} catch (eroor) {
		return (
			<div className="container px-5">
				<h2>Oops, there was an error on retriving the product. Please try again shortly</h2>
			</div>
		);
	}

	return (
		<>
			<ProductOverview product={product} variations={variations} />
			<ProductDetails description={product.description} reviews={singleProductReviews} />
			<RelatedProducts products={relatedProducts.data} />
		</>
	);
}
