"use client";

import { useState, useRef } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Link from "next/link";
import Button from "../Button/Button";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

type SliderProps = {
	productsSpecs: FeaturedProduct[];
} & SwiperProps;

export default function Slider(props: SliderProps) {
	const [renderSwiper, setRenderSwiper] = useState(false);
	const { productsSpecs, ...sliderProps } = props;

	const swiperRef = useRef<SwiperType | null>(null);

	const handlePrev = () => {
		if (swiperRef.current) {
			swiperRef.current.slidePrev();
		}
	};

	const handleNext = () => {
		if (swiperRef.current) {
			swiperRef.current.slideNext();
		}
	};

	return (
		<div className="text-background mt-10 relative">
			<Swiper
				{...sliderProps}
				onAfterInit={() => setRenderSwiper(true)}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}>
				{renderSwiper &&
					productsSpecs.map((product, index) => (
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
								<Link className="mt-auto" href={`/product/${product.slug}`}>
									<Button className="border-[3px] border-background uppercase">Look Product</Button>
								</Link>
							</ProductCard>
						</SwiperSlide>
					))}
			</Swiper>
			<Button
				onClick={handlePrev}
				className="arrow-left arrow text-oliveGreen absolute left-[-20px] top-[50%] translate-y-[-50%] z-10 mt-0 !p-2.5 font-medium border-2 border-oliveGreen rounded-full drop-shadow-lg">
				<span className="font-bold">&larr;</span>
			</Button>
			<Button
				onClick={handleNext}
				className="arrow-right arrow text-oliveGreen absolute right-[-20px] top-[50%] translate-y-[-50%] z-10 mt-0 !p-2.5 font-medium border-2 border-oliveGreen rounded-full drop-shadow-lg">
				<span className="font-bold">&rarr;</span>
			</Button>
		</div>
	);
}
