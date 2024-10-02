"use client";
import { useState } from "react";
import Button from "../Button/Button";
import ProductCard from "../ProductCard/ProductCad";
import { SingleProduct } from "@/app/product/[slug]/page";
import { Attributes } from "@/app/product/[slug]/page";
import { Categories } from "@/app/product/[slug]/page";

type ProductOverviewProps = {
	product: SingleProduct;
};

const ProductCategories = ({ productCategories }: { productCategories: Categories[] }) => {
	return (
		productCategories.length > 1 && (
			<ul className="flex mb-5 [&>li:last-child>span]:hidden">
				{productCategories.map((item) => {
					if (item.name !== "Uncategorised") {
						return (
							<li key={item.slug}>
								{item.name}
								<span> -&nbsp;</span>
							</li>
						);
					}
				})}
			</ul>
		)
	);
};

const WeightSelector = ({ productAttributes, setSelectValue }: { productAttributes: Attributes; setSelectValue: (arg: string) => void }) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectValue(event.target.value);
	};

	return (
		<div className="mb-5">
			<label htmlFor="weight-options">
				<h6 className="uppercase font-bold mb-2.5">Weight</h6>
			</label>
			<select id="weight-options" name="weight-options" className="bg-transparent pl-3 pr-16 py-2.5 border-[1px] border-white focus:outline-none" onChange={handleChange}>
				{productAttributes.options.map((item) => {
					return (
						<option value={item} key={item}>
							{item}
						</option>
					);
				})}
			</select>
		</div>
	);
};

const QuantitySelector = ({ setSelectValue }: { setSelectValue: (arg: string) => void }) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectValue(event.target.value);
	};
	return (
		<div>
			<label htmlFor="quantity">
				<h6 className="uppercase font-bold mb-2.5">Quantity</h6>
			</label>
			<select id="quantity" name="quantity" className="bg-transparent pl-3 pr-16 py-2.5 border-[1px] border-white focus:outline-none" onChange={handleChange}>
				{[...Array(10)].map((_, index) => (
					<option key={index + 1} value={index + 1}>
						{index + 1}
					</option>
				))}
			</select>
		</div>
	);
};

export default function ProductOverview({ product }: ProductOverviewProps) {
	const [weight, setWeight] = useState("500gr");
	const [quantity, setQuantity] = useState("1");

	const selectWeightHandler = (weight: string) => {
		setWeight(weight);
	};

	const selectQuantityHandler = (quantity: string) => {
		setQuantity(quantity);
	};

	const clickHandler = () => {
		console.log("weight", weight);
		console.log("quantity", quantity);
		console.log("send to cart");
	};
	return (
		<div className="grid grid-cols-2 gap-x-48">
			<ProductCard src={product.images[0]?.src} width={285} height={470} alt={product.images[0]?.alt} />
			<div>
				<h1 className="font-bold text-[40px] mb-5">{product.name}</h1>
				{product.type === "variable" && <h5 className="mb-5 font-medium" dangerouslySetInnerHTML={{ __html: product.price_html }}></h5>}
				<p className="mb-5">{product.short_description.replace(/<\/?p>/g, "")}</p>
				<ProductCategories productCategories={product.categories} />
				{product.attributes.length > 0 && <WeightSelector productAttributes={product.attributes[0]} setSelectValue={selectWeightHandler} />}
				<QuantitySelector setSelectValue={selectQuantityHandler} />
				<Button className="text-uppercase border-[3px] uppercase" onClick={clickHandler}>
					Add to Cart
				</Button>
			</div>
		</div>
	);
}
