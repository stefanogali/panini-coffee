"use client";

import { SliderProduct } from "../HomeSlider/HomeSlider";
import ProductCard from "../ProductCard/ProductCad";
import Link from "next/link";
import Button from "../Button/Button";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";

// Import Swiper styles
import "swiper/css";

type SliderProps = {
	productsSpecs: SliderProduct[];
} & SwiperProps;
export default function Slider(props: SliderProps) {
	const { productsSpecs, children, ...sliderProps } = props;
	return (
		<div className="text-background mt-10">
			<Swiper {...sliderProps}>
				{productsSpecs.map((product, index) => (
					<SwiperSlide key={index}>
						<ProductCard
							src={product.image.url}
							alt={product.image.alt}
							width={product.image.width}
							height={product.image.height}
							className="w-full max-w-[100px] h-full max-h-[170px] drop-shadow-xl">
							<h4 className="font-bold my-7">{product.title}</h4>
							<p className="text-center">
								{product.short_description.split(" ").slice(0, 16).join(" ") + "..."}
							</p>
							<Link className="mt-auto" href={`/product/${product.slug}`} replace>
								<Button className="border-[3px] border-background uppercase">Look Product</Button>
							</Link>
						</ProductCard>
					</SwiperSlide>
				))}
				{children}
			</Swiper>
		</div>
	);
}
