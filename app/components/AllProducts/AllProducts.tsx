"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "../ProductCard/ProductCard";
import ProductCategories from "../ProductCategories/ProductCategories";
import SettingsWheel from "@/app/icons/SettingsWheel";
import Button from "../Button/Button";

export type Category = {
	id: number;
	name: string;
	slug: string;
};

type AllProductsProps = {
	products: SingleProduct[];
};

export default function AllProducts({ products }: AllProductsProps) {
	// console.dir(products, { depth: null });
	const availableCategories = useMemo(() => {
		const uniqueSlugs = new Set<string>();
		const uniqueCategories: Category[] = [];

		products.forEach((product) => {
			product.categories.forEach((category) => {
				if (!uniqueSlugs.has(category.slug)) {
					uniqueSlugs.add(category.slug);
					uniqueCategories.push(category);
				}
			});
		});

		return uniqueCategories;
	}, [products]);

	// console.log("availableCategories", availableCategories);

	const params = useSearchParams();
	const currentPage = params.get("page");
	const currentCategory = params.get("category");
	const router = useRouter();
	const [renderedProducts, setRenderedProducts] = useState(products);
	const [loading, setLoading] = useState(true);
	const [productCategories, setProductCategories] = useState(availableCategories);

	const clickHandler = () => {
		if (products.length > 0) {
			router.push(
				`/shop?page=${parseInt(currentPage!) + 1 || 2}${
					currentCategory ? `&category=${currentCategory}` : ""
				}`,
				{
					scroll: false,
				}
			);
			setLoading(true);
			return;
		}
	};

	useEffect(() => {
		setLoading(false);
		if (products.length > 0) setProductCategories(availableCategories);

		if (!currentPage) {
			setRenderedProducts(products);
			return;
		}
		setRenderedProducts((prev) => {
			const prevIds = prev.map((previousProduct) => previousProduct.id);

			const filteredProducts = products.filter((product) => {
				return !prevIds.includes(product.id);
			});
			return [...prev, ...filteredProducts];
		});
	}, [products, currentPage, availableCategories]);

	// console.log(renderedProducts);

	return (
		<div className="container px-5">
			<ProductCategories categories={productCategories} currentCategory={currentCategory} />
			<div className="grid grid-cols-4 gap-4">
				{renderedProducts.map((product) => {
					return (
						<ProductCard
							key={product.id}
							width={100}
							height={170}
							src={product.images[0]?.src}
							alt={product.images[0]?.alt}
							imageClassName="w-auto max-h-[140px] mb-5 drop-shadow-lg"
							className="text-center">
							<h4 className="font-bold mb-7">{product.name}</h4>
							<p>
								{product.short_description
									.replace(/<\/?p>/g, "")
									.split(" ")
									.slice(0, 16)
									.join(" ") + "..."}
							</p>
							<Link className="mt-auto" href={`/product/${product.slug}`}>
								<Button className="border-[3px] border-background uppercase">Look Product</Button>
							</Link>
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
