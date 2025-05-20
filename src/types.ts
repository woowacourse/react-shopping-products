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
	product: Product;
}

export interface CartInfo {
	id: number;
	quantity: number;
}

export interface Info {
	content: Product[];
	[key: string]: unknown;
}

export type sortingType = "asc" | "desc";
export type filterType = "" | "식료품" | "패션잡화";
