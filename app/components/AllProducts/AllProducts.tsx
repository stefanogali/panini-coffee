"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "../ProductCard/ProductCad";
import Button from "../Button/Button";

type AllProductsProps = {
	products: SingleProduct[];
	perPage: number;
	isAvailableProducts: boolean;
};

export default function AllProducts({ products, perPage, isAvailableProducts }: AllProductsProps) {
	const [offset, setOffset] = useState(perPage);
	const [renderProducts, setRenderProducts] = useState(products);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const clickHandler = () => {
		if (isAvailableProducts) {
			router.push(`/shop?from=${offset}`, { scroll: false });
			setOffset((prev) => prev + perPage);
			setLoading(true);
		}
		return;
	};

	useEffect(() => {
		setLoading(false);
		setRenderProducts((prev) => {
			const prevIds = prev.map((previousProduct) => previousProduct.id);

			const filteredProducts = products.filter((product) => {
				return !prevIds.includes(product.id);
			});
			return [...prev, ...filteredProducts];
		});
	}, [products]);
	// console.log("offset", offset);
	// console.log("renderedProduct", renderProducts);

	console.log("loading", loading);

	return (
		<div className="centered-content">
			<div className="grid grid-cols-4 gap-4">
				{renderProducts.map((product) => {
					return (
						<ProductCard
							key={product.id}
							width={100}
							height={170}
							src={product.images[0]?.src}
							alt={product.images[0]?.alt}>
							{product.name}
						</ProductCard>
					);
				})}
			</div>
			<div className="flex justify-center">
				<Button onClick={clickHandler} className="border-[3px] mx-auto uppercase">
					Load more
				</Button>
			</div>
		</div>
	);
}
