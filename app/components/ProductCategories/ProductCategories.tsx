type ProductCategoriesProps = {
	categories: string[];
};

export default function ProductCategories({ categories }: ProductCategoriesProps) {
	return (
		<ul>
			{categories.map((category) => {
				return <li key={category}>{category}</li>;
			})}
		</ul>
	);
}
