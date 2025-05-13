export interface Product {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	category: string;
}

export type SortingType = "ASC" | "DESC";
