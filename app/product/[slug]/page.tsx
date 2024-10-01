import { connectWCApi } from "@/app/utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import Button from "@/app/components/Button/Button";
import ProductDetails from "@/app/components/ProductDetails/ProductDetails";

type SingleProduct = {
	id: number;
	slug: string;
	name: string;
	type: string;
	price_html: string;
	short_description: string;
	reviews_allowed: boolean;
	description: string;
	attributes: [{ id: number; name: string; variation: boolean; options: string[] }];
	categories: [
		{
			id: number;
			name: string;
			slug: string;
		}
	];
	images: [
		{
			id: number;
			src: string;
			alt: string;
		}
	];
};

export type Reviews = {
	id: number;
	product_id: number;
	review: string;
	reviewer: string;
};

const woocommerceConnection = connectWCApi();

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
	const products: { data: SingleProduct[] } = await woocommerceConnection.get("products");

	return products.data.map((product) => {
		// console.log(product);
		return { slug: product.slug, id: product.id };
	});
}

export default async function Page({ params }: { params: { slug: string } }) {
	const products: { data: SingleProduct[] } = await woocommerceConnection.get("products");

	const { slug } = params;

	const singleProduct = products.data.filter((item) => {
		return item.slug === slug;
	});

	if (singleProduct.length === 0) {
		return notFound();
	}

	const [product] = singleProduct;
	const reviews: { data: Reviews[] } = await woocommerceConnection.get("products/reviews");
	// console.log(reviews);
	const singleProductReviews = reviews.data.filter((item) => {
		return item.product_id === product.id;
	});

	// console.log(singleProductReviews);
	// console.dir(product, { depth: null });
	return (
		<div className="centered-content pt-7">
			<div className="grid grid-cols-2 gap-x-48">
				<div className="flex items-center justify-center py-14 px-28 rounded-[20px] bg-gradient-to-br from-white to-[#B9B9B9]">
					<Image src={product.images[0]?.src} width={285} height={470} alt={product.images[0]?.alt} />
				</div>
				<div>
					<h1 className="font-bold text-[40px]">{product.name}</h1>
					{product.type === "variable" && <div dangerouslySetInnerHTML={{ __html: product.price_html }}></div>}
					<p>{product.short_description.replace(/<\/?p>/g, "")}</p>
					{product.categories.length > 1 && (
						<ul className="flex [&>li:last-child>span]:hidden">
							{product.categories.map((item) => {
								if (item.name !== "Uncategorised") {
									return (
										<li key={item.slug}>
											{item.name}
											<span> -&nbsp;</span>
										</li>
									);
								}
							})}
						</ul>
					)}
					{product.attributes.length > 0 && (
						<div>
							<label htmlFor="weight-options" className="">
								Select Weight
							</label>
							<select id="weight-options" name="weight-options" className="">
								{product.attributes[0].options.map((item) => {
									return (
										<option value={item} key={item}>
											{item}
										</option>
									);
								})}
							</select>
						</div>
					)}
					<label htmlFor="quantity" className="">
						Select Quantity
					</label>
					<select id="quantity" name="quantity" className="">
						{[...Array(10)].map((_, index) => (
							<option key={index + 1} value={index + 1}>
								{index + 1}
							</option>
						))}
					</select>
					<Button className="text-uppercase border-[3px]">Add to Cart</Button>
				</div>
			</div>
			<div>
				<ProductDetails description={product.description} reviews={singleProductReviews} />
			</div>
		</div>
	);
}
