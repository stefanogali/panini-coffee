import ProductCard from "../ProductCard/ProductCard";
import Button from "../Button/Button";
import Link from "next/link";

export default function RelatedProducts({ products }: { products: SingleProduct[] }) {
	const relatedProducts = products.map((product) => {
		const { name, slug, short_description: shortdescription, images: image } = product;
		return { name, slug, shortdescription, mainProductImage: image[0].src };
	});

	return relatedProducts.length > 0 ? (
		<section className="mt-section-vertical md:mt-section-vertical-lg">
			<h2 className="font-bold mb-7">Related Products</h2>
			<div className="flex flex-wrap gap-5 items-stretch">
				{relatedProducts.map((relatedProduct) => {
					return (
						<div
							key={relatedProduct.slug}
							className="md:basis-[calc(50%-10px)] lg:basis-[calc(33.33%-((20px*2)/3))] shrink-1 text-background flex">
							<ProductCard
								src={relatedProduct.mainProductImage}
								alt="Related product"
								width={172}
								height={280}
								imageClassName="w-full max-w-[100px] h-auto drop-shadow-xl">
								<h4 className="font-bold my-7">{relatedProduct.name}</h4>
								<p
									className="text-center"
									dangerouslySetInnerHTML={{
										__html:
											relatedProduct.shortdescription
												.replace(/<\/?p>/g, "")
												.split(" ")
												.slice(0, 16)
												.join(" ") + "...",
									}}></p>
								<Link className="mt-auto" href={`/product/${relatedProduct.slug}`} replace>
									<Button className="border-[3px] border-background uppercase">Look Product</Button>
								</Link>
							</ProductCard>
						</div>
					);
				})}
			</div>
		</section>
	) : null;
}
