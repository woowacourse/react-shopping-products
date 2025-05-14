export interface Product {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	category: string;
}

export interface CartProduct {
	id: number;
	quantity: number;
	products: Product;
}

export type SortingType = "ASC" | "DESC";
export type filterType = "식료품" | "패션잡화";
