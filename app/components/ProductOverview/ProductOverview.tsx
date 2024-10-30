"use client";
import { useState } from "react";
import Button from "../Button/Button";
import ProductCard from "../ProductCard/ProductCard";

type ProductOverviewProps = {
	product: SingleProduct;
	variations: Variations[];
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

const WeightSelector = ({
	productAttributes,
	variations,
	quantity,
	setSelectValue,
	setPrice,
}: {
	productAttributes: Attributes;
	variations: Variations[];
	quantity: number;
	setSelectValue: (arg: string) => void;
	setPrice: (arg: number) => void;
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const [productrVariation] = variations.filter((variation) => {
			return variation.name === event.target.value;
		});
		setPrice(parseInt(productrVariation.price) * quantity);
		setSelectValue(event.target.value);
	};

	return (
		<div className="mb-5">
			<label htmlFor="weight-options">
				<h6 className="uppercase font-bold mb-2.5">Weight</h6>
			</label>
			<select
				id="weight-options"
				name="weight-options"
				className="bg-transparent pl-3 pr-16 py-2.5 border-[1px] border-white focus:outline-none"
				onChange={handleChange}>
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

const QuantitySelector = ({
	setSelectValue,
	variations,
	weight,
	unitPrice,
	setPrice,
}: {
	setSelectValue: (arg: number) => void;
	variations: Variations[];
	weight: string;
	unitPrice?: string;
	setPrice: (arg: number) => void;
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (variations.length > 0) {
			const [productrVariation] = variations.filter((variation) => {
				return variation.name === weight;
			});
			setPrice(parseInt(productrVariation.price) * parseInt(event.target.value));
		} else {
			setPrice(parseInt(unitPrice!) * parseInt(event.target.value));
		}

		setSelectValue(parseInt(event.target.value));
	};
	return (
		<div className="mb-5">
			<label htmlFor="quantity">
				<h6 className="uppercase font-bold mb-2.5">Quantity</h6>
			</label>
			<select
				id="quantity"
				name="quantity"
				className="bg-transparent pl-3 pr-16 py-2.5 border-[1px] border-white focus:outline-none"
				onChange={handleChange}>
				{[...Array(10)].map((_, index) => (
					<option key={index + 1} value={index + 1}>
						{index + 1}
					</option>
				))}
			</select>
		</div>
	);
};

export default function ProductOverview({ product, variations }: ProductOverviewProps) {
	const [initialWeight] = variations.filter((variation) => {
		return variation.menu_order === 1;
	});
	const [weight, setWeight] = useState(initialWeight?.name || "");
	const [quantity, setQuantity] = useState(1);
	const [price, setPrice] = useState(parseInt(product.price));

	const selectWeightHandler = (weight: string) => {
		setWeight(weight);
	};

	const selectQuantityHandler = (quantity: number) => {
		setQuantity(quantity);
	};

	const setPriceHandler = (price: number) => {
		setPrice(price);
	};

	const clickHandler = () => {
		console.log("weight", weight);
		console.log("quantity", quantity);
		console.log("send to cart");
		alert("Add to cart");
	};

	return (
		<section className="grid md:gap-x-6 lg:gap-x-24 lg:grid-cols-2 xl:gap-x-48">
			<ProductCard
				src={product.images[0]?.src}
				width={285}
				height={470}
				alt={product.images[0]?.alt}
				imageClassName="w-full h-auto drop-shadow-xl max-w-[60%]"
			/>
			<div className="mt-5 mb:mt-0">
				<h1 className="font-bold text-[40px] mb-5">{product.name}</h1>
				{product.type === "variable" && (
					<h5
						className="mb-5 font-medium"
						dangerouslySetInnerHTML={{ __html: product.price_html }}></h5>
				)}
				<p className="mb-5">{product.short_description.replace(/<\/?p>/g, "")}</p>
				<ProductCategories productCategories={product.categories} />
				{product.attributes.length > 0 && product.type === "variable" && (
					<WeightSelector
						productAttributes={product.attributes[0]}
						variations={variations}
						quantity={quantity}
						setSelectValue={selectWeightHandler}
						setPrice={setPriceHandler}
					/>
				)}
				<QuantitySelector
					setSelectValue={selectQuantityHandler}
					weight={weight}
					{...(product.type !== "variable" && { unitPrice: product.price })}
					variations={variations}
					setPrice={setPrice}
				/>
				<h4 className="font-bold">£{price}</h4>
				<Button className="text-uppercase border-[3px] uppercase" onClick={clickHandler}>
					Add to Cart
				</Button>
			</div>
		</section>
	);
}
