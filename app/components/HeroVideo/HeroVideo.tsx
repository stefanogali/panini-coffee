"use client";

import { useRef } from "react";
import { useIsIntersecting } from "@/app/hooks/useIsIntersecting";
import { extractLastSegmentUrl } from "@/app/utils";
import Link from "next/link";
import Button from "../Button/Button";

type HomeVideoProps = {
	url: string;
	heroContent: string;
	buttonLabel: string;
	buttonLink: string;
};

const observerOptions = {
	rootMargin: "0px",
	threshold: 0,
};

export default function HeroVideo({ url, heroContent, buttonLabel, buttonLink }: HomeVideoProps) {
	const sectionRef = useRef(null);
	const isIntersected = useIsIntersecting(observerOptions, sectionRef);

	return (
		<section className="hero-video">
			<div className="h-svh max-h-[1024px] relative">
				<video loop autoPlay muted className="h-full w-full object-cover relative">
					<source src={url} type="video/mp4" />
					{/* <source src="movie.ogg" type="video/ogg"> */}
					Your browser does not support the video tag.
				</video>
				<div
					className={`container px-5 absolute bottom-0 left-0 right-0 reveal ${
						isIntersected ? "visible" : ""
					}`}
					ref={sectionRef}>
					<div className="mb-8 sm:mb-40 md:max-w-[50%]">
						<h1 className="text-white font-bold mb-heading-margin-bottom text-4xl md:text-5xl">
							{heroContent}
						</h1>
						<h4>
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
							laudantium
						</h4>
						<Link href={extractLastSegmentUrl(buttonLink)}>
							<Button className="font-medium border-[3px] border-olive-green bg-olive-green">
								{buttonLabel}
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
