import { Category } from "../AllProducts/AllProducts";

import Link from "next/link";

type ProductCategoriesProps = {
	categories: Category[];
	currentCategory: string | null;
};

export default function ProductCategories({ categories, currentCategory }: ProductCategoriesProps) {
	return (
		<ul className="flex gap-6 mb-10">
			<li>
				<Link href="/shop">
					<h4 className={`cursor-pointer${!currentCategory ? " text-orange" : ""}`}>Shop all</h4>
				</Link>
			</li>
			{categories?.map((category) => {
				return category.slug !== "uncategorised" ? (
					<li key={category.slug}>
						<Link href={`/shop?category=${category.id}`}>
							<h4
								className={`cursor-pointer${
									currentCategory === category.id.toString() ? " text-orange" : ""
								}`}>
								{category.name.charAt(0).toUpperCase() + category.name.slice(1)}
							</h4>
						</Link>
					</li>
				) : null;
			})}
		</ul>
	);
}
