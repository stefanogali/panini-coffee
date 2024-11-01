import { Suspense } from "react";
import { getWPJSON } from "@/app/utils";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import Slider from "../Slider/Slider";

export type Testimonial = {
	id?: number;
	title: string;
	content: string;
	status: string;
	image: Image;
};

export default async function TestimonialSlider() {
	const testimonials: Testimonial[] = await getWPJSON("wp-json/custom/v1/testimonials", []);

	const SliderIntroText = (
		<>
			<h2 className="font-bold mb-7 text-center">Our Testimonials</h2>
		</>
	);

	const SliderContent = testimonials.map((testimonial) => {
		return (
			<TestimonialCard
				key={testimonial.id}
				id={testimonial.id}
				image={testimonial.image}
				title={testimonial.title}
				content={testimonial.content}
				status={testimonial.status}
			/>
		);
	});

	return (
		<section className="pt-section-vertical md:pt-section-vertical-lg">
			<div className="container px-5">
				<Suspense fallback={<></>}>
					<div className="text-white relative">
						<Slider
							spaceBetween={20}
							slidesPerView={1}
							navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
							grabCursor={true}
							loop={true}
							effect={"fade"}
							introText={SliderIntroText}
							components={SliderContent}
							pagination={true}
						/>
					</div>
				</Suspense>
			</div>
		</section>
	);
}
