"use client";

import { useRef } from "react";
import Link from "next/link";
import { useIsIntersecting } from "@/app/hooks/useIsIntersecting";
import Button from "../Button/Button";
import Image from "next/image";

const observerOptions = {
	rootMargin: "0px",
	threshold: 0.4,
};

export default function FeaturedProductHome({ product }: { product: ShortDescriptionProduct }) {
	const sectionRef = useRef(null);
	const isIntersected = useIsIntersecting(observerOptions, sectionRef);

	return (
		<section
			className="bg-white mt-20 md:mt-36 bg-[url('images/logo-waves.svg')] bg-cover bg-center bg-no-repeat"
			ref={sectionRef}>
			<div
				className={`container px-5 flex flex-col-reverse md:flex-row items-center py-20 reveal ${
					isIntersected ? "visible" : ""
				}`}>
				<div className="text-background md:pr-20">
					<h2 className="font-bold mb-10">{product.title}</h2>
					<p>{product.short_description}</p>
					<Link className="mt-auto" href={`/product/${product.slug}`}>
						<Button className="border-[3px] border-background uppercase">Look Product</Button>
					</Link>
				</div>
				<div>
					<Image
						src={product.image.url}
						width={product.image.width}
						height={product.image.height}
						alt={product.image.alt}
						className="max-w-[180px] mb-7 md:mb-0 mb:max-w-56 drop-shadow-xl"
					/>
				</div>
			</div>
		</section>
	);
}
