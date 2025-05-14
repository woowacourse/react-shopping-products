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

export interface ProductsInfo {
	content: Product[];
	[key: string]: unknown;
}

export type SortingType = "asc" | "desc";
export type filterType = "식료품" | "패션잡화";
