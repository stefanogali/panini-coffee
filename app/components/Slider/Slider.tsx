"use client";

import { SliderProduct } from "../HomeSlider/HomeSlider";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";

// Import Swiper styles
import "swiper/css";

type SliderProps = {
	productsSpecs: SliderProduct[];
} & SwiperProps;
export default function Slider(props: SliderProps) {
	const { productsSpecs, children, ...sliderProps } = props;
	return (
		<Swiper {...sliderProps}>
			{productsSpecs.map((product, index) => (
				<SwiperSlide key={index}>
					{/* Render your product details here */}
					{product.title}
				</SwiperSlide>
			))}
			{children}
		</Swiper>
	);
}
