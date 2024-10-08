import { connectWCApi } from "@/app/utils";
import { notFound } from "next/navigation";
import ProductOverview from "@/app/components/ProductOverview/ProductOverview";
import ProductDetails from "@/app/components/ProductDetails/ProductDetails";
import RelatedProducts from "@/app/components/RelatedProducts/RelatedProducts";

const woocommerceConnection = connectWCApi();

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
	const products: { data: SingleProduct[] } = await woocommerceConnection.get("products");

	return products.data.map((product) => {
		// console.log(product);
		return { slug: product.slug, id: product.id };
	});
}

// to do: add calls into try catch block
export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = params;

	const products: { data: SingleProduct[] } = await woocommerceConnection.get("products");
	const reviews: { data: Reviews[] } = await woocommerceConnection.get("products/reviews");

	const singleProduct = products.data.filter((item) => {
		return item.slug === slug;
	});

	// not found page if product do not exists
	if (singleProduct.length === 0) {
		return notFound();
	}
	// get data for specific product
	const [product] = singleProduct;

	const variationIds = product.variations;
	const variationPromises = variationIds.map((id: number) =>
		woocommerceConnection.get(`products/${product.id}/variations/${id}`)
	);
	const variationResponses = await Promise.all(variationPromises);
	const variations: Variations[] = variationResponses.map((response) => response.data);
	// const variations = await woocommerceConnection.get(`products/${product.id}/variations`);

	//  get related products
	const relatedProducts: { data: SingleProduct[] } = await woocommerceConnection.get("products", {
		include: product.related_ids.slice(0, 3).join(","),
	});

	// get review for product
	const singleProductReviews = reviews.data.filter((item) => {
		return item.product_id === product.id;
	});

	// console.dir(variations, { depth: null });

	// console.dir(product, { depth: null });
	// console.log(singleProductReviews);
	// console.dir(product, { depth: null });
	return (
		<>
			<ProductOverview product={product} variations={variations} />
			<ProductDetails description={product.description} reviews={singleProductReviews} />
			<RelatedProducts products={relatedProducts.data} />
		</>
	);
}
