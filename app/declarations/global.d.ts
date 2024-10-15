type PageMeta<T> = {
    id: number;
    slug: string,
    acf_field_groups: T[];
    featured_product?: FeaturedProduct
};

type FieldGroup<F> = {
    field_group: string;
    fields: F;
}

// PRODUCT
type Image = {
	id: number;
	url: string;
	alt: string;
    width: number;
    height: number
}

type FeaturedProduct = {
	title: string;
	slug: string;
	short_description: string;
	image: Image;
};

type Variations = {
	id: number;
	price: string;
	stock_status: string;
	menu_order: number;
	name: string;
};

type Reviews = {
	id: number;
	product_id: number;
	review: string;
	reviewer: string;
};

type SingleProduct = {
	id: number;
	slug: string;
	name: string;
	type: string;
	price: string;
	price_html: string;
	short_description: string;
	related_ids: number[];
	reviews_allowed: boolean;
	description: string;
	attributes: Attributes[];
	categories: Categories[];
	variations: number[];
	featured: boolean;
	images: [
		{
			id: number;
			src: string;
			alt: string;
		}
	];
};

type Categories = {
	id: number;
	name: string;
	slug: string;
}

type Attributes = {
	id: number;
	name: string;
	variation: boolean;
	options: string[];
};