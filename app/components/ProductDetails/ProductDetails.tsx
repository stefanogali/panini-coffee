"use client";
import { Reviews } from "@/app/product/[slug]/page";
import { useState } from "react";
import { Button } from "../Button/Button";

type ProductDetailsProp = {
	description: string;
	reviews: Reviews[];
};
export default function ProductDetails({ description, reviews }: ProductDetailsProp) {
	const [selected, setSelected] = useState("description" || "");

	const content = selected === "description" ? description.replace(/<\/?p>/g, "") : reviews;

	const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const target = event.target as HTMLButtonElement;
		setSelected(target.value);
	};

	console.log("review", reviews);

	return (
		<>
			<div className="flex">
				<Button onClick={clickHandler} className={`border-0 border-t-2 border-white uppercase ${selected === "description" && "bg-[#ababab]"}`} value="description">
					Description
				</Button>
				<Button onClick={clickHandler} className={`border-0 border-t-2 border-white uppercase ${selected === "review" && "bg-[#ababab]"}`} value="review">
					Review
				</Button>
			</div>
			<div className="mt-7">
				{selected === "description" ? (
					<p dangerouslySetInnerHTML={{ __html: content }}></p>
				) : (
					reviews.map((review) => {
						return (
							<>
								<p>- Reviewed by {review.reviewer}</p>
								<p dangerouslySetInnerHTML={{ __html: review.review.replace(/<\/?p>/g, "") }}></p>
							</>
						);
					})
				)}
			</div>
		</>
	);
}
