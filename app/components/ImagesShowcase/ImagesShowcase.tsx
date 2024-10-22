"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";
import { useIsIntersecting } from "@/app/hooks/useIsIntersecting";
import { extractLastSegmentUrl } from "@/app/utils";
import Button from "../Button/Button";
import Link from "next/link";

type ImagesShowcaseProps = {
	title: string;
	buttonLabel: string;
	buttonLink: string;
	images: Image[];
};

const observerOptions = {
	rootMargin: "0px",
	threshold: 0.3,
};

export default function ImagesShowcase({
	title,
	buttonLabel,
	buttonLink,
	images,
}: ImagesShowcaseProps) {
	const sectionRef = useRef(null);
	const isIntersected = useIsIntersecting(observerOptions, sectionRef);

	return (
		<section className="pt-20 md:pt-36">
			<div ref={sectionRef}>
				<div className="grid grid-cols-2 lg:grid-cols-3">
					{images.map((image, index) => {
						const delayClass = `delay-${index * 200}`;
						const isLastTwo = index >= images.length - 1;
						const colSpanClass = isLastTwo ? "col-span-2 md:col-span-1" : "";
						return (
							<Fragment key={image.id}>
								{index === 4 && (
									<div
										className={`py-7 max-h-[700px] ${colSpanClass} bg-white text-background px-12 text-center flex flex-col items-center justify-center reveal md:py-0 lg:aspect-square 2xl:aspect-auto ${delayClass} ${
											isIntersected ? "visible" : ""
										}`}>
										<h2 className="font-bold">{title}</h2>

										<Link href={extractLastSegmentUrl(buttonLink)}>
											<Button className="text-background border-background border-[3px]">
												{buttonLabel}
											</Button>
										</Link>
									</div>
								)}
								<div className={`max-h-[700px] lg:aspect-square 2xl:aspect-auto ${colSpanClass}`}>
									<Image
										className={`w-full h-full object-cover reveal ${
											index + 1 === images.length ? "delay-1000" : delayClass
										} ${isIntersected ? "visible" : ""}`}
										src={image.url}
										width={image.width}
										height={image.height}
										alt="Picture of the author"
									/>
								</div>
							</Fragment>
						);
					})}
				</div>
			</div>
		</section>
	);
}
