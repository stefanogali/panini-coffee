import { Suspense } from "react";
import Slider from "../Slider/Slider";
import { getWPJSON } from "@/app/utils";
import ProductCard from "../ProductCard/ProductCard";
import Link from "next/link";
import Button from "../Button/Button";

export default async function HomeSlider() {
	const products: ShortDescriptionProduct[] = await getWPJSON("wp-json/custom/v1/products");

	// console.dir(products, { depth: null });

	const SliderIntroText = () => {
		return (
			<>
				<h2 className="text-center font-bold text-white">Choose from our products</h2>
				<h3 className="text-center font-bold text-oliveGreen mb-10">Recently added products</h3>
			</>
		);
	};

	const SliderContent = products.map((product, index) => {
		return (
			<ProductCard
				key={index}
				src={product.image.url}
				alt={product.image.alt}
				width={product.image.width}
				height={product.image.height}
				imageClassName="w-full max-w-[100px] h-full max-h-[170px] drop-shadow-xl"
				className="text-center">
				<>
					<h4 className="font-bold my-7">{product.title}</h4>
					<p className="text-center">
						{product.short_description.split(" ").slice(0, 16).join(" ") + "..."}
					</p>
					<Link className="mt-auto" href={`/product/${product.slug}`}>
						<Button className="border-[3px] border-background uppercase">Look Product</Button>
					</Link>
				</>
			</ProductCard>
		);
	});
	return (
		<section className="pt-section-vertical md:pt-section-vertical-lg">
			<div className="container px-5">
				<Suspense fallback={<></>}>
					<div className="text-background relative">
						<Slider
							spaceBetween={20}
							// slidesPerView={1}
							navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
							breakpoints={{
								640: {
									slidesPerView: 1,
								},
								768: {
									slidesPerView: 2,
								},
								1024: {
									slidesPerView: 3,
								},
								1280: {
									slidesPerView: 4,
								},
							}}
							grabCursor={true}
							loop={true}
							effect={"fade"}
							introText={SliderIntroText()}
							components={SliderContent}
							useObserver={true}
						/>
					</div>
				</Suspense>
			</div>
		</section>
	);
}
