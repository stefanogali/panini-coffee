import { Suspense } from "react";
import Slider from "../Slider/Slider";
import { getWPJSON } from "@/app/utils";
import ProductCard from "../ProductCard/ProductCard";
import Link from "next/link";
import Button from "../Button/Button";

export default async function HomeSlider() {
	const products: FeaturedProduct[] = await getWPJSON("wp-json/custom/v1/products");

	const SliderContent = products.map((product, index) => {
		return (
			<ProductCard
				key={index}
				src={product.image.url}
				alt={product.image.alt}
				width={product.image.width}
				height={product.image.height}
				className="w-full max-w-[100px] h-full max-h-[170px] drop-shadow-xl">
				<h4 className="font-bold my-7">{product.title}</h4>
				<p className="text-center">
					{product.short_description.split(" ").slice(0, 16).join(" ") + "..."}
				</p>
				<Link className="mt-auto" href={`/product/${product.slug}`}>
					<Button className="border-[3px] border-background uppercase">Look Product</Button>
				</Link>
			</ProductCard>
		);
	});
	return (
		<section className="pt-36">
			<div className="container px-5">
				<h2 className="text-center font-bold">Choose from our products</h2>
				<h3 className="text-center font-bold text-oliveGreen">Recently added products</h3>
				<Suspense fallback={<></>}>
					<div className="text-background mt-10 relative">
						<Slider
							spaceBetween={20}
							slidesPerView={4}
							navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
							grabCursor={true}
							loop={true}
							effect={"fade"}
							components={SliderContent}
						/>
					</div>
				</Suspense>
			</div>
		</section>
	);
}
