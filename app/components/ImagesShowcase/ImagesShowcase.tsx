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
	threshold: 0.5,
};

export default function ImagesShowcase({
	title,
	buttonLabel,
	buttonLink,
	images,
}: ImagesShowcaseProps) {
	const sectionRef = useRef(null);
	const isIntersected = useIsIntersecting(observerOptions, sectionRef);

	console.log("isIntersected", isIntersected);

	return (
		<section className="pt-36" ref={sectionRef}>
			<div className="grid grid-cols-3">
				{images.map((image, index) => {
					const delayClass = `delay-${index * 200}`;
					return (
						<Fragment key={image.id}>
							{index === 4 && (
								<div
									className={`aspect-square 2xl:aspect-auto max-h-[700px] bg-white text-background px-12 text-center flex flex-col items-center justify-center reveal ${delayClass} ${
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
							<div className="aspect-square 2xl:aspect-auto max-h-[700px]">
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
		</section>
	);
}
