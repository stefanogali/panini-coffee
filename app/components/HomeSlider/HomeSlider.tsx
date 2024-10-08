import { Suspense } from "react";
import Slider from "../Slider/Slider";
import { getWPJSON } from "@/app/utils";

export default async function HomeSlider() {
	const products: FeaturedProduct[] = await getWPJSON("wp-json/custom/v1/products");
	// console.log(products);
	return (
		<section className="pt-36">
			<div className="centered-content">
				<h2 className="text-center font-bold">Choose from our products</h2>
				<h3 className="text-center font-bold text-oliveGreen">Recently added products</h3>
				<Suspense fallback={<></>}>
					<Slider
						productsSpecs={products}
						spaceBetween={20}
						slidesPerView={4}
						navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
						grabCursor={true}
						loop={true}
						effect={"fade"}
					/>
				</Suspense>
			</div>
		</section>
	);
}
