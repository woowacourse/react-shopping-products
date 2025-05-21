export const CATEGORY = Object.freeze(["전체", "패션잡화", "식료품"]);
export const SORT_OPTION = Object.freeze(["낮은 가격순", "높은 가격순"]);

type Category = (typeof CATEGORY)[number];
type SortOption = (typeof SORT_OPTION)[number];

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
}

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

interface Error {
  isError: boolean;
  errorMessage: string;
}

export type { Product, Category, SortOption, CartItem, Error };
