import Slider from "../Slider/Slider";
import { getWPJSON } from "@/app/utils";

export type SliderProduct = {
	title: string;
	slug: string;
	short_description: string;
	image: string;
};

export default async function HomeSlider() {
	const products: SliderProduct[] = await getWPJSON("wp-json/custom/v1/products");
	// console.log(products);
	return (
		<section className="pt-36">
			<div className="centered-content">
				<h2 className="text-center font-bold">Choose from our products</h2>
				<h3 className="text-center font-bold text-oliveGreen">Recently added products</h3>
				<Slider productsSpecs={products} spaceBetween={50} slidesPerView={3} />
			</div>
		</section>
	);
}
