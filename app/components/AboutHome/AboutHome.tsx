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
		<div className="mr-28">
			<h2 className="mb-12 font-bold">{title}</h2>
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
		<section className={`container px-5 pt-36 reveal ${isIntersected ? "visible" : ""}`}>
			<div className={`grid gap-5 grid-cols-2`} ref={sectionRef}>
				<TextContent
					title={title}
					content={content}
					buttonLabel={buttonLabel}
					buttonLink={extractLastSegmentUrl(buttonLink)}
				/>
				<div className={`grid gap-5 grid-cols-2`}>
					<Card cards={cardContent || []} />
				</div>
			</div>
		</section>
	);
}
