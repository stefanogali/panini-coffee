"use client";
import { useState } from "react";
import Button from "../Button/Button";

type ProductDetailsProp = {
	description: string;
	reviews: Reviews[];
};
export default function ProductDetails({ description, reviews }: ProductDetailsProp) {
	const [selected, setSelected] = useState("description");

	const content = selected === "description" ? description.replace(/<\/?p>/g, "") : reviews;

	const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const target = event.target as HTMLButtonElement;
		setSelected(target.value);
	};

	return (
		<section className="mt-20 md:mt-36">
			<div className="flex">
				<Button
					onClick={clickHandler}
					className={`border-0 border-t-2 border-white uppercase ${
						selected === "description" && "bg-[#ababab]"
					}`}
					value="description">
					Description
				</Button>
				<Button
					onClick={clickHandler}
					className={`border-0 border-t-2 border-white uppercase ${
						selected === "review" && "bg-[#ababab]"
					}`}
					value="review">
					Review
				</Button>
			</div>
			<div className="mt-7">
				{selected === "description" ? (
					<p dangerouslySetInnerHTML={{ __html: content }}></p>
				) : reviews.length > 0 ? (
					reviews.map((review) => {
						return (
							<>
								<p>- Reviewed by {review.reviewer}</p>
								<p dangerouslySetInnerHTML={{ __html: review.review.replace(/<\/?p>/g, "") }}></p>
							</>
						);
					})
				) : (
					<p>There are no reviews yet.</p>
				)}
			</div>
		</section>
	);
}
