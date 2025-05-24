export interface Product {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	category: string;
	quantity: number;
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

export const FILTER_OPTIONS = [
	{ value: "", label: "전체" },
	{ value: "식료품", label: "식료품" },
	{ value: "패션잡화", label: "패션잡화" },
] as const;

export const SORT_OPTIONS = [
	{ value: "asc", label: "낮은 가격순" },
	{ value: "desc", label: "높은 가격순" },
] as const;

export type FilterType = (typeof FILTER_OPTIONS)[number]["value"];
export type SortType = (typeof SORT_OPTIONS)[number]["value"];
