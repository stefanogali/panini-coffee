"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "../ProductCard/ProductCad";
import ProductCategories from "../ProductCategories/ProductCategories";
import SettingsWheel from "@/app/icons/SettingsWheel";
import Button from "../Button/Button";

type AllProductsProps = {
	products: SingleProduct[];
};

export default function AllProducts({ products }: AllProductsProps) {
	// console.dir(products, { depth: null });
	const availableCategories = Array.from(
		new Set(
			products.flatMap((product) =>
				product.categories
					.map((category) => {
						if (category.slug !== "uncategorised") {
							return category.slug;
						}
						return null;
					})
					.filter((category) => category !== null)
			)
		)
	);

	// console.log(availableCategories);
	const params = useSearchParams();

	// console.log("params", params.get("page"));
	const currentPage = params.get("page");
	const router = useRouter();
	const [renderedProducts, setRenderedProducts] = useState(products);
	const [loading, setLoading] = useState(true);

	const clickHandler = () => {
		if (products.length > 0) {
			router.push(`/shop?page=${parseInt(currentPage!) + 1 || 2}`, { scroll: false });
			setLoading(true);
			return;
		}
	};

	useEffect(() => {
		setLoading(false);
		setRenderedProducts((prev) => {
			const prevIds = prev.map((previousProduct) => previousProduct.id);

			const filteredProducts = products.filter((product) => {
				return !prevIds.includes(product.id);
			});
			return [...prev, ...filteredProducts];
		});
	}, [products]);

	return (
		<div className="container px-5">
			<ProductCategories categories={availableCategories} />
			<div className="grid grid-cols-4 gap-4">
				{renderedProducts.map((product) => {
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
			{products.length > 0 && (
				<div className="flex justify-center">
					<Button
						onClick={clickHandler}
						className="border-[3px] mx-auto uppercase flex items-center">
						Load more {loading && <SettingsWheel className="ml-2.5 w-6 h-auto animate-spinWheel" />}
					</Button>
				</div>
			)}
		</div>
	);
}
