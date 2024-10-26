"use client";

import { useRef } from "react";
import Button from "../Button/Button";
import Image from "next/image";
import Link from "next/link";
import { extractLastSegmentUrl } from "@/app/utils";
import { useIsIntersecting } from "@/app/hooks/useIsIntersecting";

type AboutCard = {
	icon: Image;
	content: string;
};

type AboutHomeProps = {
	title: string;
	content: string;
	buttonLabel: string;
	buttonLink: string;
	cardContent?: AboutCard[];
};

const TextContent = ({ title, content, buttonLabel, buttonLink }: AboutHomeProps) => {
	const formattedContent = content.replace(/\r\n/g, "<br />");
	return (
		<div className="mb-7 lg:mb-0 lg:pr-half-container-padding-right lg:basis-1/2">
			<h2 className="mb-heading-margin-bottom font-bold">{title}</h2>
			<p dangerouslySetInnerHTML={{ __html: formattedContent }}></p>
			<Link href={buttonLink}>
				<Button className="border-oliveGreen border-[3px]">{buttonLabel}</Button>
			</Link>
		</div>
	);
};

const Card = ({ cards }: { cards: AboutCard[] }) => {
	return cards.map((card) => {
		return (
			<div className="flex items-start" key={card.icon.id}>
				<Image
					src={card.icon.url}
					alt={card.icon.alt}
					width={50}
					height={50}
					// blurDataURL="data:..." automatically provided
					// placeholder="blur" // Optional blur-up while loading
				/>
				<p className="pl-5">{card.content}</p>
			</div>
		);
	});
};

const observerOptions = {
	rootMargin: "0px",
	threshold: 0.5,
};
export default function AboutHome({
	title,
	content,
	buttonLabel,
	buttonLink,
	cardContent,
}: AboutHomeProps) {
	const sectionRef = useRef(null);
	const isIntersected = useIsIntersecting(observerOptions, sectionRef);

	return (
		<section
			className={`container px-5 pt-section-vertical md:pt-section-vertical-lg reveal ${
				isIntersected ? "visible" : ""
			}`}>
			<div className={`flex flex-col lg:flex-row`} ref={sectionRef}>
				<TextContent
					title={title}
					content={content}
					buttonLabel={buttonLabel}
					buttonLink={extractLastSegmentUrl(buttonLink)}
				/>
				<div className={`lg:basis-1/2 grid grid-cols-1 sm:grid-cols-2 gap-y-5 sm:gap-x-5`}>
					<Card cards={cardContent || []} />
				</div>
			</div>
		</section>
	);
}
