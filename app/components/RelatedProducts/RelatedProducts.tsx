import { SingleProduct } from "@/app/product/[slug]/page";
import ProductCard from "../ProductCard/ProductCad";
import Button from "../Button/Button";
import Link from "next/link";

export default function RelatedProducts({ products }: { products: SingleProduct[] }) {
	const relatedProducts = products.map((product) => {
		const { name, slug, short_description: shortdescription, images: image } = product;
		return { name, slug, shortdescription, mainProductImage: image[0].src };
	});
	// console.log("relatedProduct", relatedProducts);

	return relatedProducts.length > 0 ? (
		<div className="mt-36">
			<h2 className="font-bold mb-7">Related Products</h2>
			<div className="flex gap-5">
				{relatedProducts.map((relatedProduct) => {
					console.log("relatedProduct", relatedProduct);
					return (
						<div key={relatedProduct.slug} className="basis-1/3 shrink-1 text-background">
							<ProductCard src={relatedProduct.mainProductImage} alt="yo yo" width={172} height={280}>
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
								<Link href={`/product/${relatedProduct.slug}`} replace>
									<Button className="border-[3px] border-background uppercase">Look Product</Button>
								</Link>
							</ProductCard>
						</div>
					);
				})}
			</div>
		</div>
	) : null;
}
