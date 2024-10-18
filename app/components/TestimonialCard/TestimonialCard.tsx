import { Testimonial } from "../TestimonialSlider/TestimonialSlider";
import Image from "next/image";

export default function TestimonialCard({ image, title, content, status }: Testimonial) {
	return (
		<div className="max-w-[80%] mx-auto text-center">
			<Image
				className="mx-auto mb-7"
				src={image.url}
				width={image.width}
				height={image.height}
				alt={image.alt}
			/>
			<h4 className="mb-5">{content}</h4>
			<h4 className="mb-5 font-bold">{title}</h4>
			<p className="pb-7">{status}</p>
		</div>
	);
}
