"use client";

import { useState, useRef, ReactElement } from "react";
import { Pagination } from "swiper/modules";
import Button from "../Button/Button";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

type SliderProps = {
	components: ReactElement[];
	pagination: boolean;
} & SwiperProps;

export default function Slider(props: SliderProps) {
	const [renderSwiper, setRenderSwiper] = useState(false);
	const { components, pagination, ...sliderProps } = props;

	const swiperRef = useRef<SwiperType | null>(null);

	const paginationConfig = () => {
		const paginationObj = {
			...(pagination
				? {
						pagination: {
							clickable: true,
						},
						modules: [Pagination],
				  }
				: {}),
		};
		return paginationObj;
	};

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
		<div className="">
			<Swiper
				{...sliderProps}
				{...paginationConfig()}
				onAfterInit={() => setRenderSwiper(true)}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}>
				{renderSwiper &&
					components.map((component, index) => <SwiperSlide key={index}>{component}</SwiperSlide>)}
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
