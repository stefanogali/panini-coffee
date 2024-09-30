type PageMeta<T> = {
    id: number;
    slug: string,
    acf_field_groups: T[];
};

type FieldGroup<F> = {
    field_group: string;
    fields: F;
}

type Image = {
	id: number;
	url: string;
	alt: string;
    width: number;
    height: number
}